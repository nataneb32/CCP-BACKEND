const postBase = require('../models/SchemaPost');
const adminBase = require('../models/SchemaNewAdmin')
module.exports = {
  async index(req, res) {
    const data = await postBase.find()
    res.json(data)
  },

  async store(req, res) {
    const { title, description, author, id } = req.body;
    const authauthor = await adminBase.find({ _id: id, name: author })
    if (!authauthor) {
      res.send('Erro')
    }
    await postBase.create({
      title,
      description,
      author
    })
    res.json({ title, description, author })
  }
}