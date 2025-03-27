const {Presale} = require("../models")

class PresaleController{

    static async addPresaleProduct(req, res, next){
        try {
            const {productId, startDate, endDate, price, stock} = req.body
            const createProduct = await  Presale.create({productId, startDate, endDate, price, stock})
            res.status(201).json({
                message:"Success added presale product",
                createProduct
            })
        } catch (error) {
            next(error)
        }
    }

}

module.exports = PresaleController