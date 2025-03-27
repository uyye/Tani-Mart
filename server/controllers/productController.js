const { Op } = require("sequelize")
const {Product, Presale, User} = require("../models")
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
            const {page, filter, search} = req.query
            let option = {
                where:{permission:"sale"},
                include:[{model:Presale}, {model:User, attributes:["name"]}],
                order:[["createdAt", "desc"]]
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
            const {filter, search} = req.query
            
            const option = {
                where:{
                    authorId:req.user.id,
                ...(filter && {category:filter}),
                ...(search && {name:{[Op.iLike]:`%${search}%`}})
                },
                order: [['createdAt', 'DESC']]
            }
            
            const data = await Product.findAll(option)
            res.status(200).json(data)
        } catch (error) {
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
                include:[
                            {model:Presale},
                            {model:User, attributes:{exclude:["password"]}}
                        ]
            })
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async addProduct(req, res, next) {
    try {
        if (!req.file) {
            throw { name: "BadRequest", status: 400, message: "image file required" };
        }

        let { name, category, description, price, stock, productStatus, discount, startDate, endDate } = req.body;

        // Validasi angka
        if (isNaN(price) || isNaN(stock) || price <= 0 || stock < 0) {
            throw { name: "BadRequest", status: 400, message: "Invalid price or stock" };
        }

        if (productStatus === "presale" && (isNaN(discount) || discount < 0 || discount > 100)) {
            throw { name: "BadRequest", status: 400, message: "Invalid discount value" };
        }

        // Upload gambar ke Cloudinary
        let base64 = Buffer.from(req.file.buffer).toString("base64");
        let dataUrl = `data:${req.file.mimetype};base64,${base64}`;
        const response = await cloudinary.uploader.upload(dataUrl);
        const image = response.secure_url;

        let discountPrice = price;
        if (productStatus === "presale") {
            discountPrice = price - (discount / 100 * price);
        }

        // Jika `endDate` tidak diberikan, set default 7 hari dari `startDate`
        if (productStatus === "presale" && !endDate) {
            endDate = dayjs(startDate).add(7, "day").toISOString();
        }

        // Insert ke tabel Product
        let createProduct = await Product.create({
            name, image, category, description, price, stock, productStatus, authorId: req.user.id
        });

        // Insert ke tabel Presale jika statusnya presale
        if (productStatus === "presale") {
            await Presale.create({
                productId: createProduct.id,
                startDate: startDate,
                endDate: endDate,
                price: discountPrice,
                discount: discount
            });
        }

        res.status(201).json({
            message: "Product added successfully",
            product: {
                id: createProduct.id,
                name: createProduct.name
            }
        });
    } catch (error) {
        next(error);
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
            next(error);
        }
    }
    

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
            next(error)
            
        }
    }

    static async sellerRequestProduct(req, res, next){
        try {
            const data = await Product.findAll({
                where:{permission:"waiting", authorId:req.user.id}
            })
            
            
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }


    //admin
    static async getPresaleProduct(req, res, next){
        try {
            const data = await Presale.findAll({
                include:[{model:Product}]
            })

            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async productApprove(req, res, next) {
        try {
            const { productId } = req.body;
            const product = await Product.findByPk(productId);
    
            if (!product) {
                throw { name: "NotFound", status: 404, message: "Product Not Found" };
            }
    
            if (product.permission !== "waiting") {
                throw { name: "BadRequest", status: 400, message: "Product is already on sale" };
            }
    
            product.permission = "sale";
            await product.save();
    
            res.status(200).json({ message: "Success", product });
        } catch (error) {
            next(error);
        }
    }

    static async adminRequestProduct(req, res, next){
        try {
            const product = await Product.findAll({
                where:{permission:"waiting"},
                order:[["createdAt", "desc"]]
            })
            res.status(200).json(product)
        } catch (error) {
            next(error)
        }
    }

}

module.exports = ProductController