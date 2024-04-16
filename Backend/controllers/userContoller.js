const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
//env config
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_ID, // replace with your email
    pass: process.env.EMAIL_PASSWORD, // replace with your email password
  },
});

function sendVerificationEmail(admin) {
  const verificationLink = `${process.env.API_BASE_URL}/user/verify/${admin.verificationToken}`;

  const mailOptions = {
    from: process.env.EMAIL_ID,
    to: admin.email,
    subject: "Email Verification",
    text: `Click the following link to verify your email: ${verificationLink}`,
    html: `<p>Click the following link to verify your email: <a href="${verificationLink}">${verificationLink}</a></p>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    }
    // else {
    //   console.log('Email sent: ' + info.response);
    // }
  });
}

exports.verifyTokenController = async (req, res) => {
  try {
    const token = req.params.token;

    const admin = await userModel.findOne({ verificationToken: token });

    if (!admin) {
      return res.status(404).json({ error: "Invalid verification token" });
    }

    admin.isVerified = true;
    admin.verificationToken = undefined;

    await admin.save();

    res
      .status(200)
      .json({ message: "Email verification successful. You can now log in." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//create user register user
exports.registerController = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    //validation
    if (!username || !email || !password) {
      return res.status(400).send({
        success: false,
        message: "Please Fill all fields",
      });
    }
    //exisiting user
    const exisitingUser = await userModel.findOne({ email });
    if (exisitingUser) {
      return res.status(401).send({
        success: false,
        message: "user already exisits",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate a verification token (for simplicity, using a random string here)
    const verificationToken = Math.random().toString(36).substring(7);

    //save new user
    const user = new userModel({
      username,
      email,
      password: hashedPassword,
      verificationToken: verificationToken,
    });
    const savedUser = await user.save();

    sendVerificationEmail(savedUser);

    return res.status(201).send({
      success: true,
      message: "New User Created",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error In Register callback",
      success: false,
      error,
    });
  }
};

// get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find({});
    return res.status(200).send({
      userCount: users.length,
      success: true,
      message: "all users data",
      users,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Get ALl Users",
      error,
    });
  }
};

//login
exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(401).send({
        success: false,
        message: "Please provide email or password",
      });
    }
    const user = await userModel.findOne({ email });
    if (user === null) {
      return res.status(200).send({
        success: false,
        error: "regErr",
        message: "email is not registerd",
      });
    }
    //password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({
        success: false,
        error: "LogErr",
        message: "Invlid username or password",
      });
    }
    if (!user.isVerified) {
      return res.status(200).send({
        success: false,
        error: "emailErr",
        messgae: "Verify Your email address...",
        user,
      });
    }
    return res.status(200).send({
      success: true,
      error: "noErr",
      messgae: "login successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Login Callcback",
      error,
    });
  }
};

exports.resetController = async (req, res) => {
  try {
    const { email, oldPassword, newPassword } = req.body;
    if (oldPassword === newPassword) {
      return res.status(401).send({
        success: false,
        message: "Your old and new password are same",
      });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(200).send({
        success: false,
        message: "email is not registerd",
      });
    }
    //password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(401).send({
        success: false,
        message: "Invlid username or password",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // user.password = newPassword;
    const updatedUser = await userModel.findOneAndUpdate(
      { email },
      { password: hashedPassword },
      { new: true }
    );

    return res.status(200).send({
      success: true,
      messgae: "Reset successfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Reset Callcback",
      error,
    });
  }
};
