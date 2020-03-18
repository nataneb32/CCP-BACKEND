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
    const { title, description, author, id } = req.body;
    const authauthor = await adminBase.find({ _id: id, name: author })
    if (!authauthor) {
      res.status(401).send("Author não é valido")
    }
    await postBase.create({
      title,
      description,
      author
    })
    res.json({ title, description, author })
  }
}