const db = require("../models");
const User = db.masterUser;
const Customer = db.masterCustomer;
const Role = db.roleManagement
const { hashPassword, compareHash } = require("../bycrpt");
const transporter = require("../helper/userTransporter");
const {
  createToken,
  createTokenForgotPassword,
  payload,
  payloadForgotPassword
} = require("../helper/generateToken");

module.exports.signUp = async (req, res) => {
  const {
    Username,
    Email,
    Password,
    Confirm_Password,
    PMKU,
    Name,
    Phone_Number,
    Role_ID,
  } = req.body;
  try {
    
    // check username is unique
    const check_username = await User.findOne({
      where: {
        Username: Username,
      },
    });
    if (check_username) {
      return res.status(404).send("Username already registered.");
    }

    // check email is unique
    const check_email = await User.findOne({
      where: {
        Email: Email,
      },
    });
    if (check_email) {
      return res.status(404).send("Email already registered.");
    }

    // check is password and confirm password is a match
    if (Password !== Confirm_Password) {
      return res.status(404).send("Password doesn't match.");
    }

    const check_PMKU = await Customer.findOne({
      attributes: ['id'],
      where: {
        PMKU: PMKU
      }
    })

    if(!check_PMKU){
      res.status(404).send("PKMU Number Does Not Exist!")
    }
    console.log(check_PMKU);

    console.log(Role_ID, Username, Name, Password, Phone_Number, Email, new Date());

    const createUser = await User.create({
      Role_ID: Role_ID,
      Customer_ID: check_PMKU.id,
      Username: Username,
      Name: Name,
      Password:hashPassword(Password),
      Phone_Number:Phone_Number,
      Email: Email,
      createdAt:new Date(),
      updatedAt:new Date()
    })

    res.status(200).send(createUser);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports.login = async (req, res) => {
  const { Username, Password } = req.body;
  try {
    // validate user on database
    const check_user = await User.findOne({
      where: {
        Username: Username,
      },
    });
    if (!check_user) {
      return res.status(404).send("Username not registered");
    }

    // if user existed, validate password
    const isValid = compareHash(Password, check_user.Password);
    if (!isValid) {
      return res.status(404).send("Invalid Password");
    }

    const dataToken = {
      ID: check_user.id,
    };

    const dataPayload = {
      ID: check_user.id,
      Username: check_user.Username,
      Role_ID: check_user.Role_ID
    };

    const token = createToken(dataToken);

    res.status(200).send({
      token: token,
      payload: dataPayload,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// token verify
module.exports.verifyToken = async (req, res) => {
  try {
    res.status(200).send(req.dataToken);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// forgot password
module.exports.sendResetToken = async (req, res) => {
  const { Email } = req.body;
  try {
    const check_email = await User.findOne({
      where: {
        Email: Email,
      },
    });

    if (!check_email) {
      return res.status(404).send("Email is not registered");
    }

    const token = createTokenForgotPassword({ id: check_email.id });
    console.log(token);

    await transporter.sendMail({
      from: "'TBS' <terminalbookingsystem1@gmail.com>",
      to: check_email.Email,
      subject: "Reset Password Confirmation",
      html: `
      <h1 style="text-align: center;">Reset Your Password</h1>
      <p>We have received your request to reset the password for your account</p>
      <a href='http://localhost:3006/newPassword?token=${token}'>Click here to set new password</a>
      `,
    });
    res.status(200).send("Email has been sent to reset your password");
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

module.exports.userSetNewPassword = async (req, res) => {
  const {password, confirm_password} = req.body
  
  try {
    const {authorization} = req.headers;
    const ID_User = payloadForgotPassword(authorization.split(' ').pop())

    if (password !== confirm_password) {
      return res.status(404).send("Password and confirm password doesn't match");
    }

    // 1. Verify userId
    const CHECK_USER = await User.findOne({
      where: {
        id: ID_User.id,
      },
    });

    if (!CHECK_USER) {
      return res.status(404).send("Account is not found");
    }

    const hashedPassword = hashPassword(password);

    // 2. Update Password
    const update = await User.update(
      {
        Password: hashedPassword,
        updatedAt: new Date(),
      },
      {
        where: {
          id: ID_User.id,
        },
      }
    );
    res.status(200).send("Password Has Been Changed");
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

module.exports.viewProfile = async (req,res) => {
  const id = req.params.id
  try{
    const response = await User.findOne({
      attributes: ['Name', 'Username', 'Phone_Number', 'Email'],
      include: [
        {
          model: Customer,
          attributes: ['Company_Name', 'Company_Type', 'PMKU', 'Email', 'Address', 'NIB']
        }         
      ],
      where: {
        id: id
      }
    })

    const dataPayload = {
      Name: response.Name,
      Username: response.Username,
      Phone_Number: response.Phone_Number,
      Email: response.Email,
      Company_Name: response.masterCustomer.Company_Name,
      Company_Type: response.masterCustomer.Company_Type,
      PMKU: response.masterCustomer.PMKU,
      CusEmail: response.masterCustomer.Email,
      Address: response.masterCustomer.Address,
      NIB: response.masterCustomer.NIB
    }

    res.status(200).send(dataPayload)
  }
  catch(error){
    return res.status(500).send({ message: error.message });
  }
}

module.exports.changePassword = async (req,res) => {
  const {OldPassword,NewPassword,ConfirmNewPassword, ID_User} = req.body
  console.log(OldPassword, NewPassword, ConfirmNewPassword, ID_User);
  try{
    const check_old_pass = await User.findOne({
      where: {
        id: ID_User
      }
    })
    console.log(check_old_pass.Password);
    const isValid = compareHash(OldPassword, check_old_pass.Password);
    console.log(isValid);

    if(!isValid){
      return res.status(404).send("Old Password Not Match!");
    }

    if(NewPassword!== ConfirmNewPassword){
      return res.status(400).send("New Password & Confirm Password Does Not Match!")
    }

    const response = await User.update({
      Password: hashPassword(NewPassword),
      updatedAt: new Date()
    },{
      where: {
        id: ID_User
      }
    })

    res.status(200).send("")
  }
  catch(error){
    return res.status(500).send({ message: error.message });
  }
}
