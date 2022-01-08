// =======================================
//              DATABASE
// =======================================
const User = require("../models/users");
const jwt = require("jsonwebtoken");
require("dotenv").config();
// for comparing password
const bcrypt = require("bcrypt");

// Create all Auth operations
// status errors refer: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
// Creating user (signup)
const createUser = async (req, res) => {
  // if there is no req.body, return error
  if (!req.body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a user",
    });
  }

  try {
    // first check if the username / email already exists
    // find the username
    const checkUsername = await User.findOne({
      username: req.body.username,
    });
    // find the email
    const checkEmail = await User.findOne({
      email: req.body.email,
    });

    if (checkUsername !== null) {
      return res.status(409).json({
        message: "username exists",
      });
    } else if (checkEmail !== null) {
      return res.status(409).json({ message: "email exists" });
    }
    // All good - create user
    else if (checkUsername === null && checkEmail === null) {
      //overwrite the user password with the hashed password, then pass that in to our database
      req.body.password = bcrypt.hashSync(
        req.body.password,
        bcrypt.genSaltSync(10)
      );
      
      const user = new User(req.body);
      await user.save();

      // somehow, if the new user doesn't exist, return error
      if (!user) {
        return res.status(400).json({ success: false, error: err });
      }

      // success!
      res.status(201).json({
        success: true,
        user: user._id,
        message: "User created!",
      });
    }
  } catch (err) {
    res.status(400).json({
      err,
      message: "User not created!",
    });
  }
};

// For getting user
const getUser = async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.params.username,
    });
    
    // if the user doesnt exist, throw error
    if (!user) {
      return res.status(404).json({ success: false, error: `User not found` });
    }
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    res.status(400).json({ success: false, error: err });
  }
};

// For deleting user
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.username);
    // remove the user
    await user.remove();
    // if the user doesnt exist, throw error
    if (!user) {
      return res.status(404).json({ success: false, error: `User not found` });
    }
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    res.status(400).json({ success: false, error: err });
  }
};

// For logging in
const loginUser = async (req, res) => {
  // if there is no req.body, return error
  if (!req.body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a valid user",
    });
  }

  try {
    const user = await User.findOne({ username: req.body.username });
    // if the user doesn't exist, return error
    if (!user) {
      return res.status(400).json({ success: false, error: err, message: "User doesn't exist" });
    }
    // user exists. Check if passwords match.
    if (bcrypt.compareSync(req.body.password, user.password)) {
      // success!
      const token = jwt.sign(
        { username: user.username, },
        process.env.SECRET,
        {
          expiresIn: process.env.JWT_maxAge,
        }
      );
      res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: process.env.maxAge,
        secure: true,
      });
      res.status(201).json({
        success: true,
        username: user.username,
        token: token,
        message: "Login success!",
      });

    } else {
      // wrong login information
      res.status(401).json({ success: false, error: err, message: "Wrong login information" });
    }
  } catch (err) {
    res.status(400).json({
      err,
      message: "Login failed!",
    });
  }
};

// for logging out
const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { httpOnly: true, maxAge: 1, secure: true });
    // success!
    res.status(201).json({
      success: true,
      message: "Logout success!",
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err });
  }
};

// export the modules - CRUD
// Read has 2 (for the index page--> showing all sessions, and for the show page--> show particular session)
module.exports = {
  createUser,
  deleteUser,
  loginUser,
  logout,
  getUser,
};
