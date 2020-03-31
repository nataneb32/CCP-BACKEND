const postBase = require('../models/SchemaPost')
const adminBase = require('../models/SchemaAdmin')

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
    const { title, description } = req.body;
    try{
      const post = await postBase.create({
        title,
        description,
        author: req.body.current.name
      })
      res.json({ 
        title: post.title,
        description: post.description,
        author: post.author
      })
    }catch(err){
      res.send(err.message)
    }
  }
}