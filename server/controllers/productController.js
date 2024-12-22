const { Op } = require("sequelize")
const {Product, Presale} = require("../models")
const dayjs = require("dayjs")

class ProductController{
    static async getProduct(req, res, next){
        try {
            const {page, sort, filter, search} = req.query
            let option = {where:{}, include:{model:Presale}}

            if(sort){
                option.order = [["createdAt", sort]]
            }

            if (filter) {
                option.where.category = {[Op.eq]:filter}
            }
            if(search){
                option.where.name = {[Op.iLike]:`%${search}%`}
            }
            if(page){
                option.limit = 10
                option.offset = (page - 1)*10
            }

            const data = await Product.findAll(option)
            res.status(200).json(data)
            
        } catch (error) {
            next(error)
        }
    }

    static async getAdminProduct(req, res, next){
        try {
            const data = await Product.findAll({where:{authorId:req.user.id}})
            res.status(200).json(data)
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async productById(req, res, next){
        try {
            const {id} = req.params
            if(!id){
                throw{name:"NotFound", status:404, message:`Product not found`}
            }

            const data = await Product.findByPk(id)
            res.status(200).json(data)
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async addProduct(req, res, next){
        try {
            let {name, image, category, description, price, stock, productStatus, discount, startDate, endDate}= req.body
            
            const discountPrice = price - (discount / 100 * price)        

            let createProduct 
            
            
            if(productStatus === "presale"){
                endDate = dayjs(startDate).add(1, "day").toISOString()
                createProduct = await Product.create({name, image, category, description, price, stock, productStatus, authorId:req.user.id})
                await Presale.create({
                    productId:createProduct.id,
                    startDate:startDate,
                    endDate:endDate,
                    price:discountPrice,
                    discount:discount
                })
            }else{
                createProduct = await Product.create({name, image, description, category, price, stock, productStatus, authorId:req.user.id})
            }
            
            const result = {
                message:"Product add successfully",
                product:{
                    id: createProduct.id,
                    name: createProduct.name
                }
            }
            res.status(201).json(result)
        } catch (error) {
            console.log(error);
            next(error)
            
        }
    }

    static async updateProduct(req, res, next){
        try {
            const {id} = req.params
            
            const productData = await Product.findByPk(id)
            if(productData.authorId !== req.user.id){
                throw {name:"Forbidden", status:403, message:"Access danied"}
            }

            const { name, image, category, description, price, stock}= req.body
            const [rowsUpdated, [updatedProduct]] = await Product.update({name, image, category, description, price, stock, authorId:req.user.id},
                {
                    where:{id:id},
                    returning:true
                }
            )

            if (rowsUpdated === 0) {
                throw {name:"BadRequest", status:400, message:"updated failed"}
            }

            res.status(200).json({
                message:"succes update product",
                product:{
                    name:updatedProduct.name,
                    image:updatedProduct.image,
                    category:updatedProduct.category,
                    description:updatedProduct.description,
                    price:updatedProduct.price,
                    stock:updatedProduct.stock
                }
            })
            
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async deleteProduct(req, res, next){
        try {
            const {id} = req.params

            const productData = await Product.findByPk(id)
            
            if(productData.authorId !== req.user.id){
                throw {name:"Forbidden", status:403, message:"Access danied"}
            }
            
            const deleteProduct = await Product.destroy({
                where:{
                    id:id
                }
            })
            
            res.status(200).json(deleteProduct)
        } catch (error) {
            console.log(error);
            next(error)
            
        }
    }

}

module.exports = ProductController