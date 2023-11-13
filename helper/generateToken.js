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

module.exports = {
    createToken,
    payload
}