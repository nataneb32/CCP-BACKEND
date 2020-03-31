const postBase = require('../models/SchemaPost')
const adminBase = require('../models/SchemaAdmin')
const postService = require('../services/PostServices')

module.exports = {
  async index(req, res) {
    const data = await postBase.find()
    res.json(data)
  },
  async show(req, res) {
    let { title } = req.params
    title = title.replace(/_/g, ' ')
    const post = await postBase.findOne({ title })
    if (!post) res.status(404).json({ 'message': 'Post não encontrado' })

    res.json(post)
  },

  async store(req, res) {
    const { title, description, currentAdmin } = req.body;
    try{
      res.json(await postService.createPost({title, description,author: currentAdmin}))
    }catch(err){
      res.status(400).send(err.message)
    }
  }
}