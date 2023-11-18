const db = require("../models");
const User = db.masterUser;
const Customer = db.masterCustomer;
const { hashPassword, compareHash } = require("../bycrpt");
const {createToken} = require("../helper/generateToken")

module.exports.signUp = async (req, res) => {
  try {
    // check username is unique
    const check_username = await User.findOne({
      where: {
        Username: req.body.Username,
      },
    });
    if (check_username) {
      return res.status(400).send("Username already registered.");
    }

    // check email is unique
    const check_email = await User.findOne({
      where: {
        Email: req.body.Email,
      },
    });
    if (check_email) {
      return res.status(400).send("Email already registered.");
    }

    // check is password and confirm password is a match
    if (req.body.Password !== req.body.Confirm_Password) {
      return res.status(404).send(`Password doesn't match.`);
    }

    const createCustomer = await Customer.create({
        Company_Name: "",
        Company_Type: "",
        PMKU: req.body.PMKU,
        Email: "",
        Address: "",
        Phone_Number: "",
        NIB: "",
        createdAt: new Date(),
        updatedAt: new Date()
    },{ fields: ['PMKU'] });

    const user = await User.create({
        Customer_ID: createCustomer.id,
        Username: req.body.Username,
        Name: req.body.Name,
        Password: hashPassword(req.body.Password),
        Phone_Number: req.body.Phone_Number,
        Email: req.body.Email,
        Role_ID: req.body.Role_ID,
        createdAt: new Date(),
        updatedAt: new Date()
    })

    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports.login = async (req,res) => {
    const {Username, Password} = req.body
    try{
        // validate user on database
        const check_user = await User.findOne({
            where: {
                Username : Username
            }
        })
        if(!check_user){
            return res.status(404).send('Username not registered')
        }

        // if user existed, validate password
        const isValid = compareHash(Password, check_user.Password)
        if(!isValid){
            return res.status(404).send("Invalid Password", check_user.password)
        }

        const dataToken = {
            ID: check_user.id,
            Role_ID: check_user.Role_ID,
            Customer_ID: check_user.Customer_ID,
            User_Name: check_user.Username
        }

        const dataPayload = {
            ID : check_user.id,
            Username: check_user.Username
        }

        const token = createToken(dataToken)

        res.status(200).send({
            token : token,
            payload: dataPayload
        })
    }
    catch (error) {
        res.status(500).send({message: error.message})
    }
}

// refresh token

// forgot password
