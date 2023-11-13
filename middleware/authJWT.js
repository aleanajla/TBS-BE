const db = require("../models");
const User = db.masterUser;
const {payload} = require("../helper/generateToken.js")

const authentication = async (req,res,next) => {
    try{
        const {authorization} = req.headers;
        const readPayload = payload(authorization)

        const foundUser = await User.findByPk(readPayload.id)

        if(!foundUser){
            res.status(404).send("User not found")
        }

        req.dataToken = {
            id: foundUser.id,
            Role_ID: foundUser.Role_ID,
            Customer_ID: foundUser.Customer_ID,
            Username: foundUser.Username
        }

        next();
    }
    catch (err) {
        res.send(err)
    }
}

module.exports = {
    authentication
};
