const jwt = require("jsonwebtoken")
const key1 = 'tbs' 
const key2 = 'newPassword'

function createToken (data){
    return (
        jwt.sign(data, key1)
    )
}

function payload(token){
    return(
        jwt.verify(token, key1)
    )
}

function createTokenForgotPassword (data){
    return (
        jwt.sign(data,key2, {
            expiresIn: 1000*60*5
        })
    )
}

function payloadForgotPassword (token){
    return(
        jwt.verify(token,key2)
    )
}

module.exports = {
    createToken,
    payload,
    createTokenForgotPassword,
    payloadForgotPassword
}