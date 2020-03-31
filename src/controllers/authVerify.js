const adminBase = require('../models/SchemaAdmin');
const authUtils = require('../utils/auth')

module.exports = {
  async index(req, res, next) {
    try {
      if(!req.headers['authorization']) throw Error("Auth token não foi encontrado.")
      const token = req.headers['authorization'].replace("Bearer ",'');
      if(req.body == null) req.body = {}
      const {_id} = authUtils.verifyToken(token) //decodifica o token, se ele não for valido throw a error
      
      const admin = await adminBase.findById(_id)

      if(!admin) throw Error("Token invalido!")
      admin.password = null
      req.body.current = admin
      next()
    } catch (error) {
      return res.status(401).send(error.message)
    }
  },

  async store(req, res) {
    try{
      const { username, password } = req.body;
      const response = await adminBase.findOne({ username })

      if (!response) throw Error("Nome ou/e senha invalido.")
      if(response.password !== password) throw Error("Nome ou/e senha invalido.")
      res.json({ username: response.username, name: response.name, token: authUtils.createToken({ _id: response._id }) })
    }catch(err){
      res.status(500).send(err.message)
    }
  }

}