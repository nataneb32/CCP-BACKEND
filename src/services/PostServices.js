// Os services são usados para guardar as regras de negocio de interação com o banco de dados

const postBase = require('../models/SchemaPost')

module.exports = {
  async createPost({title,description,author}){
    const post = await postBase.create({
        title,
        description,
        author: author
      })
    return post.save()
  }
}