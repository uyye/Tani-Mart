const { Op } = require("sequelize");
const {Order, Product, OrderDetail, User, Payment, Presale, sequelize, Sequelize} = require("../models")
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
                const product = await Product.findByPk(item.id, {
                    include:[{model:Presale, require:false}]
                });

                if(!product){
                    throw{name:"NotFound", status:404, message:"product not found" }
                }

                let itemPrice = product.price
                if(product.productStatus === "presale" && product.Presale){
                    const now = new Date()
                    if(new Date(product.Presale.endDate) < now){
                        throw{ name: "BadRequest", status: 400, message: "Presale period has ended"}
                    }
                    itemPrice = product.Presale.price
                }

                const itemTotalPrice = itemPrice * item.quantity
                totalPrice += itemTotalPrice

                const commissionRate = product.commissionRate || 10
                
                const authorPayment = (itemTotalPrice * (100 - commissionRate)) / 100

                await OrderDetail.create(
                    {
                    orderId: newOrder.id,
                    productId: product.id,
                    quantity: item.quantity,
                    price: itemPrice,
                    subTotal: itemTotalPrice,
                    authorId:product.authorId
                    },
                    {transaction}
                );

                await Payment.create(
                    {
                        orderId:newOrder.id,
                        authorId:product.authorId,
                        amount:authorPayment,
                        status:"pending",
                        adminCommission:itemTotalPrice - authorPayment
                    },
                    {transaction}
                )
            }

            newOrder.totalPrice = totalPrice
            await newOrder.save({transaction})
            await transaction.commit()

            res.status(201).json({message:"Order created successfuly", newOrder})

        } catch (error) {
            if(transaction) await transaction.rollback()
            next(error)
        }
    }

    static async getOrder(req, res, next){
        try {
            const data = await Order.findAll({
                where:{userId:req.user.id},
                include:{
                    model:User,
                    attributes:{exclude:["password"]}
                },
                order:[["createdAt", "desc"]]
            })
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async getOrderDetail(req, res, next){
        try {
            const {id} = req.params
            if(!id){
                throw{name:"NotFound", status:400, message:"No ID order"}
            }
            const data =await Order.findOne({
                where:{id:id},
                include:[
                    {
                        model:OrderDetail,
                        attributes:["id", "quantity", "subTotal", "price"],
                        include:{
                            model:Product,
                            attributes:["image", "name"],
                            include:{
                                model:User,
                                attributes:["name"]
                            }
                        }
                    },
                    {model:User, attributes:["name"]}
                ],
                attributes:["id","addressShiping","phoneNumber", "status", "totalPrice", "createdAt"]
            })

            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }

    //seller

    static async getOrderSeller(req, res, next){
        try {

            const data = await Order.findAll({
                include:[
                    {
                        model:OrderDetail,
                        attributes:[],
                        where:{authorId:req.user.id},
                    },
                    {model:User, attributes:["name"]}
                ],
                order:[["createdAt", "DESC"]]
            })

            res.status(200).json(data)            
        } catch (error) {
            next(error)
        }
    }

    static async getOrderAdmin(req, res, next){
        try {
            const data = await Order.findAll({
                include:User
            })
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async getOrderDetailSeller(req, res, next){
        try {
            const {id} = req.params

            const data = await OrderDetail.findAll({
                where:{orderId:id, authorId:req.user.id},
                include:[
                    {model:Product, attributes:["name"]},
                    {model:Order,include:User}
                ]
            })            
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async orderStatistic(req, res, next){
        try {

            const data = await Order.count({
                distink:true,
                col:"userId",
                include:[
                    {
                        model:OrderDetail,
                        where:{authorId:req.user.id}
                    },
                ]
            })
            res.status(200).json(data)
        } catch (error) {
            next(error)
            
        }
    }

    static async topOrder(req, res, next){
        try {
            const data = await OrderDetail.findAll({
                where:{authorId:req.user.id},
                include:{
                    model:Product,
                    attributes:[],
                    include:{model:User, attributes:[]}
                },
                attributes:[
                    [Sequelize.col("Product.id"), "productId"],
                    [Sequelize.col("Product.name"), "productName"],
                    [Sequelize.col("Product.image"), "productImage"],
                    [Sequelize.col("Product.price"), "productPrice"],
                    [Sequelize.col("Product.User.name"), "author"],
                    [Sequelize.fn("SUM", Sequelize.col("quantity")), "totalQuantityOrder"]
                ],
                group:["Product.id","Product.name", "Product.image, Product.price", "Product.User.name" ],
                order:[[Sequelize.fn("SUM", Sequelize.col("quantity")), "desc"]],
                limit:5
            })

            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }

    //admin
    static async dailyOrder(req, res, next){
        try {
            const now = new Date()
            const today = new Date(now.setHours(0,0,0,0))
            const yesterday = new Date(today)
            yesterday.setDate(yesterday.getDate()-1)

            const dailyOrder = await Order.count({
                where:{
                    createdAt:{[Op.gte]:today}
                }
            })

            const yesterdayOrder = await Order.count({
                where:{
                    createdAt:{[Op.between]:[yesterday, today]}
                }
            })

            let percentage = 0
            if (yesterdayOrder > 0) {
                percentage = ((dailyOrder - yesterdayOrder) / yesterdayOrder) * 100
            }

            const result = {
                dailyOrder, yesterdayOrder, percentage : percentage.toFixed(2)
            }
            
            res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }

    static async allTopOrder(req, res, next) {
        try {
            const data = await OrderDetail.findAll({
                include: {
                    model: Product,
                    attributes: [],
                    include: {
                        model: User,
                        attributes: []
                    }
                },
                attributes: [
                    [Sequelize.col("Product.id"), "id"],
                    [Sequelize.col("Product.name"), "name"],
                    [Sequelize.col("Product.price"), "price"],
                    [Sequelize.col("Product.image"), "image"],
                    [Sequelize.col("Product.User.name"), "author"],
                    [Sequelize.fn("SUM", Sequelize.col("quantity")), "totalQuantityOrder"]
                ],
                group: [
                    "Product.id", 
                    "Product.name", 
                    "Product.price", 
                    "Product.image", 
                    "Product.User.name"
                ],
                order: [[Sequelize.fn("SUM", Sequelize.col("quantity")), "DESC"]],
                limit: 5
            });
    
            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    }
    

    static async getOrderAdmin(req, res, next){
        try {
            const data = await Order.findAll({
                include:[
                    {model:User, attributes:["name"]},
                    {
                        model:OrderDetail,
                        attributes:[],
                        include:{ model:Product, attributes:[]}
                    }

                ],
                attributes:[
                    "id",
                    "totalPrice",
                    "status",
                    "createdAt",
                    [Sequelize.fn("COUNT", Sequelize.fn("DISTINCT", Sequelize.col("OrderDetails.productId"))), "totalItem"]
                ],
                group:["Order.id", "User.id"],
                order:[["createdAt", "DESC"]]
            })
            
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }
    
}

module.exports = OrderController