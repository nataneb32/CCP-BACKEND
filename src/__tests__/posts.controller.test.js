const Post = require('../models/SchemaPost')
const Admin = require('../models/SchemaAdmin')
const postsController = require('../controllers/postsController')
const postService = require('../services/PostServices')

describe('Posts controller', () => {
    describe('store', () => {
        it('should call createPost',async () => {
            const admin = {username: "user",name: "Usuario",password: "pass",_id: "asdasdasdasd"}
            const req = {}
            postService.createPost = jest.fn(async post => post)
            req.body = {
                title: "Titulo",
                description: "Descrição",
                currentAdmin:{
                    name: admin.name,
                    _id: admin._id
                },
            }

            const res = {}

            res.status = () => res
            res.json = jest.fn()
            res.send = jest.fn()

            await postsController.store(req,res)
            expect(postService.createPost).toHaveBeenCalledWith({title: "Titulo",description: "Descrição",author: {name: admin.name,_id: admin._id}})
        })
    })    
})
