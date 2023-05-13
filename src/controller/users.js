const UsersModel = require('../models/users')

const createUser = async (req, res) => {
    const { body } = req

    try {
        // excecte sql query
        await UsersModel.createNewUser(body)
        return res.status(201).json({
            message: 'CREATE new user success',
            data: body
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Server Error',
            serverMessage: error,
        })
    }
}
module.exports = {
    createUser
}