const { Schema, model } = require('mongoose');

const newAdmin = new Schema({
  username: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

module.exports = model('admins', newAdmin)