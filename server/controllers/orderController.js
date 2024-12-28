const {Order, Product, OrderDetail, User, Payment, sequelize} = require("../models")
const midtransClient = require('midtrans-client');

class OrderController{
    static async orderProduct(req, res, next){
        let transaction
        let totalPrice = 0
        const {products, phoneNumber, addressShiping} = req.body

        try {
            transaction = await sequelize.transaction()
            const newOrder = await Order.create({
                userId:req.user.id,
                totalPrice:0,
                status:"pending",
                phoneNumber:phoneNumber,
                addressShiping:addressShiping
            },
            {transaction}
        );

            for(const item of products){
                const product = await Product.findByPk(item.id)
                if(!product){
                    throw{name:"NotFound", status:404, message:"product not found" }
                }

                const itemTotalPrice = product.price * item.quantity
                totalPrice += itemTotalPrice

                const commissionRate = product.commissionRate || 10
                const authorPayment = (itemTotalPrice * (100 - commissionRate)) / 100

                await OrderDetail.create(
                    {
                    orderId: newOrder.id,
                    productId: product.id,
                    quantity: item.quantity,
                    price: product.price,
                    subTotal: product.price * item.quantity,
                    authorId:product.authorId
                    },
                    {transaction}
                );

                await Payment.create(
                    {
                        orderId:newOrder.id,
                        authorId:product.authorId,
                        amount:authorPayment,
                        status:"pending"
                    },
                    {transaction}
                )
            }

            newOrder.totalPrice = totalPrice
            await newOrder.save(({transaction}))
            await transaction.commit()

            res.status(201).json({message:"Order created successfuly", newOrder})

        } catch (error) {
            next(error)
            if(transaction) await transaction.rollback()
            console.log(error);
        }
    }

    static async getOrder(req, res, next){
        try {
            const data = await Order.findAll({
                where:{userId:req.user.id},
                include:{
                    model:User,
                    attributes:{exclude:["password"]}
                }
            })
            res.status(200).json(data)
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async getOrderDetail(req, res, next){
        try {
            const {id} = req.params
            const data =await Order.findOne({
                where:{id},
                include:[
                    {
                        model:OrderDetail,
                        include:{
                            model:Product,
                            include:{
                                model:User,
                                attributes:{exclude:["password"]}
                            }
                        }
                    },
                    {
                        model:User,
                        attributes:{exclude:["password"]}
                    }
                ]
            })

            res.status(200).json(data)
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async getOrderAdmin(req, res, next){
        try {

            const data = await Order.findAll({
                include:[
                    {
                        model:OrderDetail,
                        where:{authorId:req.user.id},
                    },
                    {
                        model:User
                    }
                    
                ]
            })

            res.status(200).json(data)            
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async getOrderDetailAdmin(req, res, next){
        console.log("Masuk detail ADMIN");
        try {
            
            const {id} = req.params
            const data = await OrderDetail.findAll({
                where:{orderId:id, authorId:req.user.id},
                include:[{model:Product},{model:Order,include:User}]
            })
            console.log(data, ">>>>>>>>>>");
            
            res.status(200).json(data)
            
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async payment(req, res, next){
        let snap = new midtransClient.Snap({
            isProduction : false,
            serverKey : process.env.MIDTRANSSERVERKEY
        });

        const {orderId} = req.body
        const orderData = await Order.findByPk(orderId, {
            include:{
                model:User,
                attributes:{exclude:["password"]}
            }
        })   
        
        if (!orderData) {
            throw{name:"NotFound", status:404, message:"Order data not found"}
        }

        
        try {
            let parameter = {
                "transaction_details": {
                    "order_id": `SIAFARM-${orderData.id}-${Date.now()}`,
                    "gross_amount": orderData.totalPrice
                },
                "credit_card":{
                    "secure" : true
                },
                "customer_details": {
                    "first_name": orderData.User.name.split(" ")[0],
                    "last_name": orderData.User.name.split(" ")[1] || "",
                    "phone": orderData.phoneNumber
                }
            };

            const token = await snap.createTransaction(parameter)            
            res.status(200).json(token)
            
        } catch (error) {
            console.log(error);
            
        }
    }
}

module.exports = OrderController