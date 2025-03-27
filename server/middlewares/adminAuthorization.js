const {Product} = require("../models/")

async function adminAuthorization(req, res, next) {
    try {
       
        const product = await Product.findOne({where:{authorId:req.user.id}})

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
    } catch (error) {
        next(error)        
    }

}

module.exports = adminAuthorization