const db = require("../models");
const User = db.masterUser;
const Customer = db.masterCustomer;
const { hashPassword, compareHash } = require("../bycrpt");
const transporter = require("../helper/userTransporter");
const {
  createToken,
  createTokenForgotPassword,
  payload,
} = require("../helper/generateToken");

module.exports.signUp = async (req, res) => {
  const {Username, Email, Password, Confirm_Password, PMKU, Name, Phone_Number, Role_ID} = req.body
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
        Email:Email,
      },
    });
    if (check_email) {
      return res.status(404).send("Email already registered.");
    }

    // check is password and confirm password is a match
    if (Password !== Confirm_Password) {
      return res.status(404).send("Password doesn't match.");
    }

    const createCustomer = await Customer.create(
      {
        Company_Name: "",
        Company_Type: "",
        PMKU: PMKU,
        Email: "",
        Address: "",
        Phone_Number: "",
        NIB: "",
        createdAt: new Date(),
        updatedAt: new Date()
      },{ fields: ['PMKU'] });

    const user = await User.create({
      Role_ID: Role_ID,
      Customer_ID: createCustomer.id,
      Username: Username,
      Name: Name,
      Password: hashPassword(Password),
      Phone_Number: Phone_Number,
      Email: Email,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    res.status(200).send(user);
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
      return res.status(404).send("Invalid Password", check_user.password);
    }

    const dataToken = {
      ID: check_user.id,
    };

    const dataPayload = {
      ID: check_user.id,
      Username: check_user.Username,
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
module.exports.verifyToken = async (req,res) => {
  try{
    res.status(200).send(req.dataToken)
  }
  catch (error){
    res.status(500).send({ message: error.message });
  }
}

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

    const token = createTokenForgotPassword(check_email.id);
    console.log(token);

    await transporter.sendMail({
      from: "'TBS' <terminalbookingsystem1@gmail.com>",
      to: check_email.Email,
      subject: "Reset Password Confirmation",
      html: `
      <h1 style="text-align: center;">Reset Your Password</h1>
      <p>We have received your request to reset the password for your account</p>
      <a href='http://localhost:3000/api/auth/user/verify-resetpassword/${token}'>Click here to set new password</a>
      `,
    });
    res.status(200).send("Email has been sent to reset your password");
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

module.exports.userVerifyResetPassword = async (req, res) => {
  const token = req.params.token;

  try {
    try {
      const ID_User = payload(token);
      return res.status(200).send(ID_User);
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

module.exports.userSetNewPassword = async (req, res) => {
  const { password, ID_User, confirm_password } = req.body;
  try {
      if (password !== confirm_password) {
          return res.status(400).send("Password and confirm password doesn't match");
      }

      // 1. Verify userId
      const CHECK_USER = await User.findOne({
        where: {
          id: ID_User
        }
      });

      if (!CHECK_USER) {
          return res.status(404).send("Account is not found");
      }

      const hashedPassword = hashPassword(password);

      // 2. Update Password
      const update = await User.update({
        Password: password,
        updatedAt: new Date()
      }, {
        where: {
          id : ID_User
        }
      })
      

      res.status(200).send("Password Has Been Changed");
  } catch (error) {
      return res.status(500).send("Internal service Error");
  }
};
