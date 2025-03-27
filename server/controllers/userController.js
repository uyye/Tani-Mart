const { compare } = require("../helpers/bcrypt")
const { signToken } = require("../helpers/jwt")
const {User} = require("../models")

class UserController{

    static async register(req, res, next){
        try {
            const {name, password, address, phoneNumber, role, bankName, bankAccountNumber} = req.body
            let create;
            

            if(role === "seller"){
                create = await User.create({name, password, address, phoneNumber, role, bankName, bankAccountNumber})
            }else if(role !== "seller"){
                create = await User.create({name, password, address, phoneNumber, role})
            }

            
            const result = {
                message:"User registeres successfully",
                user:{
                    id:create.id,
                    name:create.name,
                    phoneNumber:create.phoneNumber
                }
            }
            res.status(201).json(result)
        } catch (error) {
            next(error)
        }
    } 
    
    static async login (req, res, next){
        try {
            const {name, password} = req.body
            if(!name || !password){
                throw {name:"BadRequest", status:400, message:"request body required!"}
            }

            const user = await User.findOne({where:{name}})
            if(!user){
                throw{name:"Unauthorized", status:401, message:"invalid name or password"}
            }

            const comparePassword = compare(password, user.password)
            if(!comparePassword){
                throw{name:"Unauthorized", status:401, message:"invalid name or password"}
            }

            const accessToken =signToken({id:user.id, role:user.role})
            const result = {
                message:"Login successfully",
                token: accessToken,
                user:{
                    id:user.id,
                    name:user.name,
                    role:user.role
                }
            }
            
            res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }

    static async updateUserAddres(req, res, next){
        try {
            const {address} = req.body
            const updateData = await User.update({address},{where:{id:req.user.id}})
            res.status(200).json("update userAddress successfully")
            
        } catch (error) {
            next(error)
            
        }
    }

    static async getUser(req, res, next){
        try {
            const data = await User.findOne({where:{id:req.user.id}})
            if(!data){
                throw{name:"NotFound", status:404, message:"user not found"}
            }
            res.status(200).json(data)            
        } catch (error) {
            next(error)
        }
    }

    static async getDetailUser(req, res, next){
        
        try {
            const {id} = req.params
            
            const data = await User.findByPk(id)
            if(!data){
                throw{name:"NotFound", status:404, message:"User ID not found"}
            }            
            res.status(200).json(data)
        } catch (error) {
            next(error)
            
        }
    }

    static async deleteUser(req, res, next){
        try {
            const {id} = req.params
            if (!id) {
                throw{name:"BadRequest", status:400, message:"request id required"}
            }

            const data = await User.findByPk(id)
            if(!data){
                throw{name:"NotFound", status:404, message:"User not found"}
            }

            await data.destroy()
            res.status(200).json({message:"User deleted successfully"})
        } catch (error) {
            next(error)
        }
    }

    //admin
    static async getDataUsers(req, res, next){
        try {

            const data = await User.findAll({
                attributes:{exclude:["password"]}
            })
            res.status(200).json(data)
            
        } catch (error) {
            next(error)
        }
    }
}

module.exports = UserController