const {Cart, CartItem, Product} = require("../models")

class CartController{
    static async PostCart(req, res, next){
        try {
            const {productId, quantity} = req.body

            const product = await Product.findByPk(productId)
            if (!product) {
                throw{name:"NotFound", status:404, message:"Product not Found"}
            }

            if(product.stock < quantity){
                throw{name:"BadRequest", status:400, message:"Insufficient product stock"}
            }

            let cart = await Cart.findOne({where:{userId:req.user.id}})
            if(!cart){
              cart = await Cart.create({userId:req.user.id})
            }
            
            let cartItem = await CartItem.findOne({where:{cartId:cart.id, productId}})
            if(cartItem){
                cartItem.quantity += quantity
                await cartItem.save()
            }else{
                cartItem = await CartItem.create({cartId:cart.id, productId, quantity})
            }

            cartItem = await CartItem.findOne({
                where: { id: cartItem.id },
                include: { model: Product}
            });

            res.status(201).json({
                message:"Product successfully added to cart",
                cartItem
            })
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async getCartByUser(req, res, next){
        try {
            const data = await Cart.findOne({
                where:{userId:req.user.id},
                include:{
                    model:CartItem,
                    include:{model:Product}
                }
            })

            if (!data) {
                throw { name: "NotFound", status: 404, message: "Cart not found" };
            }
              
            res.status(200).json(data)
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async deleteCartItem(req, res, next){
        try {
            const {itemId} = req.body
            if(!itemId || isNaN(itemId)){
                throw{name:"BadRequest", status:400, message:"missing itemId"}
            }

            const cartItem = await CartItem.findOne({
                where:{id:itemId},
                include:{
                    model:Cart,
                    where:{userId:req.user.id}
                }
            })

            if(!cartItem){
                throw {name:"NotFound", status:404, message:`Item cart with id ${itemId} not found`}
            }

            await cartItem.destroy()
            res.status(200).json({
                message:"Cart item deleted successfully",
                cartId:itemId
            })
            
        } catch (error) {
            next(error)
            console.log(error);
        }
    }

}

module.exports = CartController