const { Router } = require('express')
const AdminController = require('./controllers/adminsController')
const PostController = require('./controllers/postsController')
const authVerify = require('./controllers/authVerify')
const routes = Router()

routes.get('/posts', PostController.index)
routes.post('/newpost', PostController.store)
routes.post('/newadmin', AdminController.store)
routes.get('/admin', AdminController.index)
routes.post('/auth', authVerify.index)
routes.post('/find', authVerify.store)
module.exports = routes;