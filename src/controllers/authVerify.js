const adminBase = require('../models/SchemaAdmin');
const jwt = require('jsonwebtoken')

const authconfig = require('./auth.json')

function generateToken(params = {}) {
  return jwt.sign(params, authconfig.secret, {
    expiresIn: 86400
  })
}

module.exports = {
  async index(req, res) {
    const { username, password } = req.body;
    const auth = await adminBase.findOne({ username, password })
    if (!auth) {
      res.json({
        username,
        password,
        auth: false
      })
    }
    res.json({
      _id: auth._id,
      username,
      password,
      auth: true
    })
  },
  async store(req, res) {
    const { _id, username, password } = req.body;
    const response = await adminBase.findOne({ _id })
    if (!response) {
      return res.send('Erro')
    } else {
      res.json({ response, token: generateToken({ id: _id }) })
    }


  }
}