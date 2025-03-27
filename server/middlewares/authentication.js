const { verifyToken } = require("../helpers/jwt")
const {User} = require("../models")

const authentication = async(req, res, next)=>{
    try {
        const {authorization} = req.headers
        if (!authorization) {
            throw{name:"Unauthorized", status:401, message:"invalid userName or password"}
        }

        const verify = verifyToken(authorization.split(" ")[1])
        if(!verify){
            throw{name:"Unauthorized", status:401, message:"invalid userName or password"}

        }

        const user = await User.findByPk(verify.id)
        if(!user){
            throw{name:"Unauthorized", status:401, message:"invalid userName or password"}
        }

        req.user = {
            id:user.id,
            role:user.role
        }

        next()
    } catch (error) {
        next(error)        
    }
}


module.exports = authentication