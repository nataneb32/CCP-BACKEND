const UserController = require('../controllers/userController')
const UserServices = require('../services/UserServices')

describe('Posts controller', () => {
    describe('store', () => {
        it('should call createUser',async () => {

            UserServices.createUser = jest.fn(async user => user)
            const req = {
                body: {
                    username: 'username',
                    password: 'password',
                    name: 'name'
                }
            }

            const res = {}

            res.status = () => res
            res.json = jest.fn()
            res.send = jest.fn()

            await UserController.store(req,res)
            expect(UserServices.createUser).toHaveBeenCalledWith({username: 'username',password: 'password',name: 'name'})
        })
    })    
})
