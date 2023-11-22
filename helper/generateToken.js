const jwt = require("jsonwebtoken")
const key = 'tbs' 

function createToken (data){
    return (
        jwt.sign(data, key)
    )
}

function payload (token){
    return(
        jwt.verify(token, key)
    )
}

function createTokenForgotPassword (data){
    return (
        jwt.sign(data,key)
    )
}

module.exports = {
    createToken,
    payload,
    createTokenForgotPassword
}