const midtransClient = require("midtrans-client");
const {Order, User, OrderDetail, Product} = require("../models");

class PaymentController{
    static async payment(req, res, next){

        const snap = new midtransClient.Snap({
            isProduction:false,
            serverKey:process.env.MIDTRANSSERVERKEY
        })

        const {orderId} = req.body;

        try {
            const orderData = await Order.findByPk(orderId, {
                include:{
                    model:User,
                    attributes:{
                        exclude:["password"]
                    }
                }
            })

            if(!orderData){
                throw {name:"NotFound", status:404, message:"Order data not found"}
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
                  phone: orderData.phoneNumber,
                },
              };

              const token = await snap.createTransaction(parameter);
              res.status(200).json({ message: "Payment token created", token })
        } catch (error) {
            next(error)
            console.log(error);
        }
    }

    static async midtransWebHook(req, res, next){
        try {
            const notification = req.body
            const {order_id, transaction_status} = notification

            const order = await Order.findByPk(order_id,{
                include:[
                    {
                        model:OrderDetail,
                        include:{
                            model:Product
                        }
                    }
                ]
            })

            if(!order)throw{name:"NotFound", status:404, message:"Order not found"}

            console.log(order, "BEFORE");
            
            if (transaction_status === "capture" || transaction_status === "settlemen") {
                order.status = "paid"
                for(const item of order.OrderDetails){
                    item.Product.stock = item.Product.stock - item.quantity
                    await item.Product.save()
                }
            }else if(transaction_status === "deny" || transaction_status === "cancel"){
                order.status = "failed"
            }else if(transaction_status === "pending"){
                order.status = "pending"
            }

            await order.save()
            console.log(order, "AFTER");
            
            res.status(200).json({message:"payment status updated successfully"})
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async distributePayment(req, res, next){
        const iris = new midtransClient.Iris({
            isProduction:false,
            serverKey:process.env.MIDTRANSSERVERKEY,
            clientKer:process.env.MIDTRANSCLIENTKEY
        })

        const {orderId} = req.body
        try {
            const payments = await Payment.findAll({where:{orderId, status:"pending"}})
            
            if(payments.length === 0){
                throw {name:"NotFound", status:404, message:"No pending payment for this order"}
            }

            for(const payment of payments){
                const author = await User.findByPk(payment.authorId)

                if(!author || !author.bankAccountNumber){
                    throw {name:"BadRequest", status:400, message:"Author bank detail not found"}
                }

                const disbursementRequest = {
                    bank:author.bankName,
                    account:author.bankAccountNumber,
                    amount:payment.amount,
                    notes:`Payment for order #${payment.orderId}`
                }
                
                const disbursementResponse = await iris.createDisbursement(disbursementRequest)

                if(disbursementResponse.status === "COMPLETED"){
                    await Payment.update(
                        {status:"completes"},
                        {where:{id:payment.id}}
                    )
                }
            }
            res.status(200).json({message:"Payment distributed successfully"})
            
        } catch (error) {
            console.log(error);
            next(error)
        }
    }
}

module.exports = PaymentController