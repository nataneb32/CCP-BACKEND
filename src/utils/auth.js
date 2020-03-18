const jwt = require('jsonwebtoken')

module.exports = {
    createToken(params = {}){
        return jwt.sign(params, process.env.secret, {
            expiresIn: 86400
          })
    },
    verifyToken(token){
        return jwt.verify(token, process.env.secret)
    },
    decodeToken(token){
        return jwt.decode(token)
    }
}