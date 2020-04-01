const { Schema, model } = require('mongoose');

const User = new Schema({
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

const modelUser = model('User', User)

module.exports = modelUser