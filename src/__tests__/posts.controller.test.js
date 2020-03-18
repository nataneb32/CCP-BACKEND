const mongoose = require('mongoose')
const Post = require('../models/SchemaPost')
const Admin = require('../models/SchemaAdmin')
const postsController = require('../controllers/postsController')
const { MongoMemoryServer } = require('mongodb-memory-server')

describe('Posts controller', () => {
    
    beforeAll(async () => {
        const mongod = new MongoMemoryServer();
        const uri = await mongod.getUri();

        await mongoose.connect(uri,{
                useNewUrlParser: true,
                useUnifiedTopology: true
        })

        
    })

    beforeEach(async () => {
        await mongoose.connection.dropDatabase()
    });

    afterAll(async () => {
        await mongoose.connection.close()
    });

    
    describe('store', () => {
        it('should create a Post',async () => {
            const admin = await Admin.create({username: "user",name: "Usuario",password: "pass"})
            const req = {}

            req.body = {
                title: "Titulo",
                description: "Descrição",
                author: admin.name,
                id: admin._id
            }
            const res = {}

            res.status = () => res
            res.json = jest.fn()
            res.send = jest.fn()

            await postsController.store(req,res)
            const list = await Post.find({}).lean()
            expect(list).toEqual([expect.objectContaining({title:"Titulo",description: "Descrição"})])
        })
    })
    
})
