const {Favorite, Product} = require("../models")

class FavoriteController{
    static async addFavorite(req, res, next){
        try {
            const {productId} = req.body

            console.log(productId, "PPPPPPPPPPPPPP");
            
            const data = await Favorite.create({
                userId:req.user.id,
                productId:productId
            })

            res.status(201).json({
                message:"added favorite product successfuly",
                data
            })
            
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async deleteFavorite(req, res, next){
        try {

            const {productId} = req.body

            console.log(productId, "NUMBER KAH");
            
            await Favorite.destroy({where:{productId}})
            res.status(200).json("success delete favoriteProduct")
            
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async getFavoriteData(req, res, next){
        try {

            const {id} = req.params
            const data = await Favorite.findOne({where:{productId:id}})

            res.status(200).json(data)
            
        } catch (error) {
            console.log(error);
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
            console.log(error);
            next(error)
            
        }
    }
}

module.exports = FavoriteController