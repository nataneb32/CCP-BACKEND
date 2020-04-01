const UserServices = require('../services/UserServices')

module.exports = {
    async index(req, res){
        try{
            const {query} = req.body
            res.json(await UserServices.getUsers(query))
        }catch(err){
            res.send(err.message)
        }
    },
    async store(req, res){
        try{
            const {username,password,name} = req.body
            res.json(await UserServices.createUser({username,password,name}))
        }catch(err){
            res.send(err.message)
        }
    }
}