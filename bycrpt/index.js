const bcrypt = require('bcrypt')

const hashPassword = (password) => {
    let salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt)
}

const compareHash = (password, hash) => {
    return bcrypt.compareSync(password, hash)
}

module.exports = {
    hashPassword,
    compareHash
}