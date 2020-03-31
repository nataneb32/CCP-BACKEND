const { Schema, model } = require('mongoose');

const postSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Admin'
  }
})

module.exports = model('posts', postSchema);