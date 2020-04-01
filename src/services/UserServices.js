const Users = require('../models/SchemaUser')

module.exports = {
    async createUser({username,password,name}){
        return await Users.create({username,password,name})
    },
    async getUsers(query = {}) {
        return await Users.find(query)
    }
}