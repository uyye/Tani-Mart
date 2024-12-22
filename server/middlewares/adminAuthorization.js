async function adminAuthorization(req, res, next) {
    try {
       
        if(req.user.role === "user"){
            throw{name:"Forbidden", status:403, message:"Access danied. admins or saler only"}
        }else if(req.user.role === "admin"){
            next()
        }else if (req.user.role === "saler"){
            next()
        }
    } catch (error) {
        next(error)
        console.log(error);
        
    }

}

module.exports = adminAuthorization