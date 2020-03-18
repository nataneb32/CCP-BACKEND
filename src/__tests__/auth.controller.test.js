const mongoose = require('mongoose')
const Post = require('../models/SchemaPost')
const Admin = require('../models/SchemaAdmin')
const authVerify = require('../controllers/authVerify')
const authUtils = require('../utils/auth')
const { MongoMemoryServer } = require('mongodb-memory-server')



 
describe('Auth Verify', () => {
    
    beforeAll(async () => {
        const mongod = new MongoMemoryServer();
        const uri = await mongod.getUri();

        await mongoose.connect(uri ,{
                useNewUrlParser: true,
                useUnifiedTopology: true
        })
        
    })

    beforeEach(async () => {
        await mongoose.connection.dropDatabase()
        jest.clearAllMocks()
    });

    afterAll(async () => {
        await mongoose.connection.close()
    });

    
    describe('store', () => {
        it('should create a valid token',async done => {
            const admin = await Admin.create({username: "user",name: "Usuario",password: "pass"})
            const req = {}

            process.env.secret = "s3cr3t"

            req.body = {
                username: admin.username,
                password: admin.password
            }

            const res = {}

            res.status = () => res
            res.json = jest.fn(json => {
                expect(authUtils.verifyToken).not.toThrow(json.token)
                const decode = authUtils.verifyToken(json.token)
                expect(decode._id.toString()).toEqual(admin._id.toString())
            })
            res.send = jest.fn(() => done())

            await authVerify.store(req,res)
            expect(res.json).toHaveBeenCalled()
            expect(res.send).not.toHaveBeenCalled()
            done()

            
        },10000)
        it('shouldnt create a valid token, because its a invalid password',async done => {
            const admin = await Admin.create({username: "user",name: "Usuario",password: "pass"})
            const req = {}

            process.env.secret = "s3cr3t"

            req.body = {
                username: admin.username,
                password: "shitpassword"
            }

            const res = {}

            res.status = () => res
            res.json = jest.fn()
            res.send = jest.fn()

            await authVerify.store(req,res)
            expect(res.send).toHaveBeenCalled()
            expect(res.json).not.toHaveBeenCalled()
            done()
        })
    })
    
    describe('index', () => {
        
        it('should validate',async done => {
            const admin = await Admin.create({username: "user",name: "Usuario",password: "pass"})
            const req = {}

            process.env.secret = "s3cr3t"
            req.headers = []
            req.headers['authorization'] = authUtils.createToken({_id: admin._id})

            const res = {}

            res.status = () => res
            res.json = jest.fn(() => done())
            res.send = jest.fn(() => {
            })

            const next = jest.fn(async (req,res) => {
                expect(req.body.admin).toBeTruthy()
                done()
            })

            await authVerify.index(req, res, next)
            expect(res.send).not.toHaveBeenCalled()
        },10000)
        
        it('should not validate a invalid token',async () => {
            const admin = await Admin.create({username: "user",name: "Usuario",password: "pass"})
            const req = {}

            process.env.secret = "s3cr3t"
            req.headers = []
            req.headers['authorization'] = "wrong_token"

            const res = {}

            res.status = () => res
            res.json = jest.fn()
            res.send = jest.fn()

            const next = jest.fn()

            await authVerify.index(req, res, next)
            expect(next).not.toHaveBeenCalled()
        })
    })
})
