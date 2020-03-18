const { Router } = require('express')
const AdminController = require('./controllers/adminsController')
const PostController = require('./controllers/postsController')
const authVerify = require('./controllers/authVerify')
const routes = Router()

routes.post('/auth', authVerify.store)
routes.use(authVerify.index)
routes.get('/admin', AdminController.index)
routes.get('/posts', PostController.index)
routes.get('/post/:title', PostController.show)
routes.post('/newpost', PostController.store)
routes.post('/newadmin', AdminController.store)


module.exports = routes;