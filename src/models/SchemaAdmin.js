const { Schema, model } = require('mongoose');

const Admin = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
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

const modelAdmin = model('Admin', Admin)

module.exports = modelAdmin