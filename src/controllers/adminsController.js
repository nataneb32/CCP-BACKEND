const adminBase = require('../models/SchemaAdmin')
module.exports = {
  async index(req, res) {
    var names = []
    var i = 0
    const response = await adminBase.find()
    while (response[i]) {
      names.push({ "id": `${response[i]._id}`, "username": `${response[i].username}`, "name": `${response[i].name}` })
      i++;
    }
    res.json(names)
  },
  async store(req, res) {
    const {
      username,
      name,
      password
    } = req.body;

    const authusername = await adminBase.findOne({ username })
    if (!authusername) {
      adminBase.create({
        username,
        name,
        password
      })
      res.json({
        username,
        name,
        password
      })
    }
    res.send('Já existe esse username')
  }
}