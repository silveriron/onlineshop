const db = require('../data/database');
const bcrypt = require('bcrypt')

const signup = async (email, password, name, address) => {
    const hashedPassword = await bcrypt.hash(password, 14)
    await db.getDb().collection('member').insertOne({
        email,
        password: hashedPassword,
        name,
        address
    })
}

const checkAlreadySignup = async (email) => {
    const AlreadyEmail = await db.getDb().collection('member').findOne({email: email})
    return AlreadyEmail
}

const login = async (email, password) => {
    const user = await db.getDb().collection('member').findOne({email})
    if (!user) {
        return "email error"
    }

    const checkPassword = await bcrypt.compare(password, user.password)
    if (!checkPassword) {
        return "Password error"
    }

    return "login"
}

module.exports = {
    signup: signup,
    checkAlreadySignup: checkAlreadySignup,
    login: login,
}