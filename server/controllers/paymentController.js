const midtransClient = require("midtrans-client");
const {Payment, Order, User, OrderDetail, Product, Sequelize, Presale } = require("../models");
const { Op } = require("sequelize");


class PaymentController {
  static async payment(req, res, next) {
    const snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: process.env.MIDTRANSSERVERKEY,
    });

    const { orderId } = req.body;
    
    try {
      const orderData = await Order.findByPk(orderId, {
        include: {
          model: User,
          attributes: { exclude: ["password"]},
        },
      });

      if (!orderData) {
        throw { name: "NotFound",status: 404,message: "Order data not found"};
      }

      const orderDetails = await OrderDetail.findAll({
        where:{orderId},
        include:[{model:Product, include:[Presale]}]
      })

      for(const item of orderDetails){
        if(item.Product.productStatus === "presale" && item.Product.Presale){
          const now = new Date()
          if(new Date(item.Product.Presale.endDate) < now){
            throw { name: "BadRequest", status: 400, message: "Presale period has ended, payment failed" };
          }
        }
      }

      const parameter = {
        transaction_details: {
          order_id: `SIAFARM-${orderData.id}-${Date.now()}`,
          gross_amount: orderData.totalPrice,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          first_name: orderData.User.name.split(" ")[0],
          last_name: orderData.User.name.split(" ")[1] || "",
          phone: orderData.User.phoneNumber,
          email: orderData.User.email,
        },
        enabled_payments: [
          "credit_card",
          "bank_transfer",
          "gopay",
          "qris",
          "shopeepay",
          "ovo",
          "echannel", // Mandiri Bill Payment
          "bca_klikpay",
          "bri_epay",
          "danamon_online",
        ],
        qris: {
          acquirer: "gopay",
        },
        gopay: {
          enable_callback: true,
          callback_url: "https://your-callback-url.com",
        },
      };

      const token = await snap.createTransaction(parameter);
      res.status(200).json({ message: "Payment token created", token });
    } catch (error) {
      next(error);
    }
  }

  static async distributePayment(req, res, next) {
      const iris = new midtransClient.Iris({
          isProduction: false,
          apiKey: process.env.MIDTRANS_API_KEY
      });
  
      const { orderId } = req.body;
      
      try {
          const payments = await Payment.findAll({
              where: { orderId, status: "paid" },
          });
  
          if (!payments || payments.length === 0) {
              return next({
                  name: "NotFound",
                  status: 404,
                  message: "No pending payment for this order",
              });
          }
  
          let payoutRequests = [];
  
          for (const payment of payments) {
              const author = await User.findByPk(payment.authorId);
  
              if (!author || !author.bankAccountNumber) {
                  return next({
                      name: "BadRequest",
                      status: 400,
                      message: "Author bank detail not found",
                  });
              }
  
              payoutRequests.push({
                  beneficiary_name: author.name,
                  beneficiary_account: author.bankAccountNumber,
                  beneficiary_bank: author.bankName,
                  amount: payment.amount,
                  notes: `Payment for order #${payment.orderId}`,
                  email: author.email,
              });
          }
  
          const disbursementResponse = await iris.createPayouts({ payouts: payoutRequests });
  
          // Update status payment jika berhasil
          if (disbursementResponse && disbursementResponse.payouts) {
              for (const payout of disbursementResponse.payouts) {
                  await Payment.update(
                      { status: "completed" },
                      { where: { id: payout.paymentId } }
                  );
              }
          }
  
          res.status(200).json({
              message: "Payment distribution attempted",
              response: disbursementResponse,
          });
  
      } catch (error) {
          return next(error);
      }
  }
  

  static async midtransWebHook(req, res, next) {
    try {
      const notification = req.body;
      const { order_id, transaction_status } = notification;

      const order = await Order.findByPk(order_id, {
        include: [
          {
            model: OrderDetail,
            include: {
              model: Product,
            },
          },
          {
            model: Payment
          }
        ],
      });
      
      let newStatus

      if (!order)
        throw { name: "NotFound", status: 404, message: "Order not found" };

      if (
        transaction_status === "capture" ||
        transaction_status === "settlement"
      ) {
        newStatus = "paid";
        for (const item of order.OrderDetails) {
          item.Product.stock = item.Product.stock - item.quantity;
          await item.Product.save();
        }
      } else if (
        transaction_status === "deny" ||
        transaction_status === "cancel"
      ) {
        newStatus = "failed";
      } else if (transaction_status === "pending") {
        newStatus = "pending";
      }

      order.status = newStatus
      await order.save();
      
      if(order.Payments){
        for (const payment of order.Payments){
          payment.status = newStatus
          await payment.save()
        }
      }

      res.status(200).json({ message: "Payment status updated successfully" });
    } catch (error) {
      next(error);
    }
  }

  static async dailyStatistic(req, res, next){
    try{
      const now = new Date();
      const startOfToday = new Date(now.setHours(0,0,0,0));

      const startOfYesterday = new Date(startOfToday)
      startOfYesterday.setDate(startOfYesterday.getDate() - 1)
      const endOfYesterday = new Date(startOfToday)

      //dailySales
      const dailySales = (await Payment.sum("amount", {
        where:{createdAt:{[Op.gte]:startOfToday}, authorId:req.user.id, status:"paid"}
      })) || 0

      const yesterdaySales = (await Payment.sum("amount", {
        where:{
          createdAt:{
            [Op.gte]:startOfYesterday,
            [Op.lt]:endOfYesterday
          },
          status:"paid",
          authorId:req.user.id
        }
      })) || 0

      //dailyPercentage
      let dailyPercentage = 0
      if(yesterdaySales){
        dailyPercentage = ((dailySales - yesterdaySales)/ yesterdaySales) * 100
      }

      const result = {
        totalDailySales : dailySales,
        totalYesterdaySales : yesterdaySales,
        totalDailyPercentage : dailyPercentage.toFixed(2)
      }
      
      res.status(200).json(result)
    }catch(error){
      next(error)
    }
  }

  static async weeklyStatistic(req, res, next){
    try {
      const weekAgo = new Date()
      weekAgo.setDate(weekAgo.getDate() - 7)

      const twoWeekAgo = new Date(weekAgo)
      twoWeekAgo.setDate(twoWeekAgo.getDate()- 7)

      const weeklySales = (await Payment.sum("amount", {
        where:{
          createdAt:{[Op.gte]:weekAgo},
          authorId:req.user.id,
          status:"paid"
        }
      })) || 0

      const twoWeeklyAgoSales = (await Payment.sum("amount", {
        where:{
          createdAt:{
            [Op.gte]:twoWeekAgo,
            [Op.lt]:weekAgo
          },
          authorId:req.user.id,
          status:"paid"
        }
      })) || 0


      let weeklyPercentage = 0

      if(twoWeeklyAgoSales){
        weeklyPercentage = ((weeklySales - twoWeeklyAgoSales)/twoWeeklyAgoSales) * 100
      }

      const result = {
        totalWeeklySales : weeklySales,
        totalTwoWeeklySales : twoWeeklyAgoSales,
        totalWeeklyPercentage : weeklyPercentage.toFixed(2)
      }

      res.status(200).json(result)
    } catch (error) {
      next(error)
      
    }
  }

  static async montlyStatistic(req, res, next){
    try{

      const monthAgo = new Date()
      monthAgo.setMonth(monthAgo.getMonth() - 1)

      const twoMonthAgo = new Date(monthAgo)
      twoMonthAgo.setMonth(twoMonthAgo.getDate() - 1)

      //montlySales
      const montlySales = (await Payment.sum("amount", {
        where:{
          createdAt:{[Op.gte]:monthAgo},
          authorId:req.user.id,
          status:"paid"
        }
      })) || 0

      //twoMonthSales
      const twoMontlySales = (await Payment.sum("amount",{
        where:{
          createdAt:{
            [Op.gte]:twoMonthAgo,
            [Op.lt]:monthAgo
          },
          authorId:req.user.id,
          status:"paid"
        }
      })) || 0

      let montlyPercentage = 0
      if(twoMontlySales > 0){
        montlyPercentage = ((montlySales - twoMontlySales)/twoMontlySales) * 100
      }

      const result = {
        totalMonthlySales:montlySales,
        totalTwoMonthlySales:twoMontlySales,
        totalMonthlyPercentage: montlyPercentage.toFixed(2) 
      }

      res.status(200).json(result)
    }catch(error){
      next(error)
      
    }
  }

  static async buyerStatistic(req, res, next) {
    try {
      const now = new Date();
      const startOfToday = new Date(now.setHours(0, 0, 0, 0));
  
      const yesterday = new Date(startOfToday);
      yesterday.setDate(yesterday.getDate() - 1);
  
      const totalBuyerResult = await Payment.findOne({
        where: { authorId: req.user.id },
        include: { model: Order, attributes: [] },
        attributes: [
          [Sequelize.fn("COUNT", Sequelize.fn("DISTINCT", Sequelize.col("Order.userId"))), "totalBuyer"]
        ],
        raw: true
      }) || {};
  
      const dailyBuyerResult = await Payment.findOne({
        where: {
          authorId: req.user.id,
          createdAt: { [Op.gte]: startOfToday }
        },
        include: { model: Order, attributes: [] },
        attributes: [
          [Sequelize.fn("COUNT", Sequelize.fn("DISTINCT", Sequelize.col("Order.userId"))), "dailyBuyer"]
        ],
        raw: true
      }) || {};
  
      const yesterdayBuyerResult = await Payment.findOne({
        where: {
          authorId: req.user.id,
          createdAt: { [Op.between]: [yesterday, startOfToday] }
        },
        include: { model: Order, attributes: [] },
        attributes: [
          [Sequelize.fn("COUNT", Sequelize.fn("DISTINCT", Sequelize.col("Order.userId"))), "yesterdayBuyer"]
        ],
        raw: true
      }) || {};
  
      const totalBuyer = totalBuyerResult.totalBuyer || 0;
      const dailyBuyer = dailyBuyerResult.dailyBuyer || 0;
      const yesterdayBuyer = yesterdayBuyerResult.yesterdayBuyer || 0;
  
      let buyerPercentage = 0;
      if (yesterdayBuyer > 0) {
        buyerPercentage = ((dailyBuyer - yesterdayBuyer) / yesterdayBuyer) * 100;
        buyerPercentage = parseFloat(buyerPercentage.toFixed(2));
      }
  
      res.status(200).json({
        totalBuyer,
        dailyBuyer,
        yesterdayBuyer,
        buyerPercentage
      });
  
    } catch (error) {
      return next(error);
    }
  }

  //ADMIN

  static async dailyWithdraw(req, res, next){
    try {

      const now = new Date()
      
      const today = new Date(now.setHours(0,0,0,0))

      const yesterday = new Date(today)
      yesterday.setDate(yesterday.getDate() - 1)


      const dailyWithdraw = (await Payment.sum("amount", {
        where:{
          createdAt:{[Op.gte]:today},
          status:"paid"
        }
      })) || 0

      const yesterdayWithdraw = (await Payment.sum("amount", {
        where:{
          createdAt:{[Op.between]:[yesterday, today]},
          status:"paid"
        }
      })) || 0

      let percentage = 0
      if(yesterdayWithdraw > 0){
        percentage = ((dailyWithdraw - yesterdayWithdraw)  / yesterdayWithdraw) * 100
      }

      const result = {dailyWithdraw, yesterdayWithdraw, percentage:percentage.toFixed(2)}
      res.status(200).json(result)

    } catch (error) {
      next(error)
    }
  }

  static async adminCommission(req, res, next){
    try {
      const today = new Date()
      const startDay = new Date(today.setHours(0,0,0,0))

      const yesterday = new Date(startDay)
      yesterday.setDate(yesterday.getDate() - 1)

      const dailyCommission = (await Payment.sum("adminCommission",{
        where:{
          createdAt:{[Op.gte]:startDay},
          status:"paid"
        }
      })) || 0

      const yesterdayCommission = (await Payment.sum("adminCommission",{
        where:{
          createdAt:{[Op.between]:[yesterday, startDay]},
          status:"paid"
        }
      })) || 0

      let percentage = 0
      if (yesterdayCommission > 0) {
        percentage = ((dailyCommission - yesterdayCommission) / yesterdayCommission) * 100
      }

      const result = {
        dailyCommission,
        yesterdayCommission,
        percentage:parseInt(percentage).toFixed(2)
      }

      res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async adminChart(req, res, next) {
    try {
      const today = new Date();
      const weekAgo = new Date(today);
      weekAgo.setDate(weekAgo.getDate() - 7);
  
      const daysMap = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
  
      const weeklyData = await Payment.findAll({
        where: {
          createdAt: { [Op.gte]: weekAgo },
          status: "paid",
        },
        attributes: [
          [Sequelize.literal(`EXTRACT(DOW FROM DATE("createdAt" AT TIME ZONE 'Asia/Jakarta'))`), "date"],
          [Sequelize.fn("SUM", Sequelize.col("amount")), "totalWithdraw"],
          [Sequelize.fn("SUM", Sequelize.col("adminCommission")), "totalCommission"]
        ],
        group:[Sequelize.literal(`EXTRACT(DOW FROM DATE("createdAt" AT TIME ZONE 'Asia/Jakarta'))`)],
        raw: true
      });

      
  
      const result = weeklyData.map((payment) => ({
        name: daysMap[parseInt(payment.date) + 1],
        withdraw: parseInt(payment.totalWithdraw) || 0,
        commission: parseInt(payment.totalCommission) || 0
      }));
  
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
  
  
  
  
}

module.exports = PaymentController;
