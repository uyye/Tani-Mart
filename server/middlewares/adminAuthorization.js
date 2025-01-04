const {Product} = require("../models/")

async function adminAuthorization(req, res, next) {
    try {
       
        const {id} = req.params

        const product = await Product.findByPk(id)

        if(req.user.role === "admin"){
            next()
        }else if(req.user.role === "seller"){
            if(req.user.id === product.authorId){
                next()
            }else{
                throw{name:"Forbidden", status:403, message:"Access danied."}
            }
        }else{
            throw{name:"Forbidden", status:403, message:"Access danied. admins or saler only"}
        }

        // if(req.user.role === "user"){
        //     throw{name:"Forbidden", status:403, message:"Access danied. admins or saler only"}
        // }else if(req.user.role === "admin"){
        //     next()
        // }else if (req.user.role === "seller"){
        //     next()
        // }
    } catch (error) {
        next(error)
        console.log(error);
        
    }

}

module.exports = adminAuthorization