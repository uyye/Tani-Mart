const { Op } = require("sequelize")
const {Product, Presale} = require("../models")
const dayjs = require("dayjs")
const cloudinary =  require("cloudinary").v2

cloudinary.config({
    cloud_name:process.env.CLODINARYCLOUDNAME,
    api_key:process.env.CLODINARYAPIKEY,
    api_secret:process.env.CLODINARYAPISECRET
})

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

    static async getSellerProduct(req, res, next){
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

            const data = await Product.findByPk(id,{
                include:Presale
            })
            res.status(200).json(data)
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async addProduct(req, res, next){
        try {
            let createProduct
    
            let {name, category, description, price, stock, productStatus, discount, startDate, endDate}= req.body
            
            if(!req.file){
                throw{name:"BadRequest", status:400, message:"image file require"}
            }

            let base64 = Buffer.from(req.file.buffer).toString("base64")

            let dataUrl = `data:${req.file.mimetype};base64,${base64}`

            const response = await cloudinary.uploader.upload(dataUrl)
            const image = response.secure_url
            

            const discountPrice = price - (discount / 100 * price)        

            
            
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

    static async updateProduct(req, res, next) {
        try {
            const { id } = req.params;
            const { name, category, description, price, stock, productStatus, discount, startDate, endDate } = req.body;
    
            const product = await Product.findByPk(id);
            if (!product) {
                throw { name: "NotFound", status: 404, message: "Product not found" };
            }
    
            let image = product.image;

            if (req.file) {
                let base64 = Buffer.from(req.file.buffer).toString("base64");
                let dataUrl = `data:${req.file.mimetype};base64,${base64}`;
                const response = await cloudinary.uploader.upload(dataUrl);
                image = response.secure_url;
            }
    
            const discountPrice = price - (discount / 100 * price);
    
            // Jika produk berstatus "presale", perbarui atau buat data presale
            if (productStatus === "presale") {
                const updatedStartDate = startDate || dayjs(product.startDate).toISOString();
                const updatedEndDate = endDate || dayjs(updatedStartDate).add(1, "day").toISOString();
    
                await Presale.upsert({
                    productId: product.id,
                    startDate: updatedStartDate,
                    endDate: updatedEndDate,
                    price: discountPrice,
                    discount: discount,
                });
            } else {
                await Presale.destroy({ where: { productId: product.id } });
            }
    
            await product.update({
                name,
                image,
                category,
                description,
                price,
                stock,
                productStatus,
            });
    
            const result = {
                message: "Product updated successfully",
                product: {
                    id: product.id,
                    name: product.name,
                    image: product.image,
                },
            };
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
    

    // static async updateProduct(req, res, next){
    //     try {
    //         const {id} = req.params

    //         const { name, image, category, description, price, stock}= req.body
    //         const [rowsUpdated, [updatedProduct]] = await Product.update({name, image, category, description, price, stock, authorId:req.user.id},
    //             {
    //                 where:{id:id},
    //                 returning:true
    //             }
    //         )

    //         if (rowsUpdated === 0) {
    //             throw {name:"BadRequest", status:400, message:"updated failed"}
    //         }

    //         res.status(200).json({
    //             message:"succes update product",
    //             product:{
    //                 name:updatedProduct.name,
    //                 image:updatedProduct.image,
    //                 category:updatedProduct.category,
    //                 description:updatedProduct.description,
    //                 price:updatedProduct.price,
    //                 stock:updatedProduct.stock
    //             }
    //         })
            
    //     } catch (error) {
    //         console.log(error);
    //         next(error)
    //     }
    // }

    static async deleteProduct(req, res, next){
        try {
            const {id} = req.params
                        
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