const mongoose = require('mongoose')
const Post = require('../models/SchemaPost')
const Admin = require('../models/SchemaAdmin')
const postsController = require('../controllers/postsController')

describe('Posts controller', () => {
    
    beforeAll(async () => {
        if(!process.env.MONGO_URL)
            throw Error("O banco de dados na memoria não foi carregado.")
        await mongoose.connect(process.env.MONGO_URL,{
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
