const {Favorite, Product} = require("../models")

class FavoriteController{
    static async addFavorite(req, res, next){
        try {
            const {productId} = req.body
            
            const getFavorite = await Favorite.findOne({where:{productId, userId:req.user.id}})
            if (getFavorite) {
                throw {name:"Badrequest", status:400, message:"This product has been added"}
            }else{
                const data = await Favorite.create({
                    userId:req.user.id,
                    productId:productId
                })
    
                res.status(201).json({
                    message:"added favorite product successfuly",
                    data
                })
                
            }

        } catch (error) {
            next(error)
        }
    }

    static async deleteFavorite(req, res, next){
        try {

            const {productId} = req.body

            const getFavorite = await Favorite.findOne({where:{productId, userId:req.user.id}})
            if (!getFavorite) {
                throw {name:"NotFound", status:404, message:"Favorite product not found"}
            }else{
                await Favorite.destroy({where:{productId, userId:req.user.id}})
                res.status(200).json("success delete favoriteProduct")
            }
        } catch (error) {
            next(error)
        }
    }

    static async getFavoriteData(req, res, next){
        try {

            const {id} = req.params
            const data = await Favorite.findOne({where:{productId:id, userId:req.user.id}})
            if(!data){
                throw{name:"NotFound", status:404, message:"favorite not found"}
            }
            res.status(200).json(data)
            
        } catch (error) {
            next(error)
        }
    }

    static async getFavoriteProduct(req, res, next){
        try {
            const data = await Favorite.findAll({
                where:{userId:req.user.id},
                include:{model:Product}
            })

            res.status(200).json(data)

        } catch (error) {
            next(error)
            
        }
    }
}

module.exports = FavoriteController