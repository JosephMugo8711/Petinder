const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../models');
const User = db.user;
const Role = db.role;
const config = require('../config/auth.config');

// auth.controller.js
// auth.controller.js

exports.signup = async (req, res) => {
    const { fullname, username, email, password, roles } = req.body;
  
    try {
      // Check if the username and email are not already in use
      const usernameExists = await User.findOne({ username });
      if (usernameExists) {
        return res.status(400).send({ message: "Failed! Username is already in use!" });
      }
  
      const emailExists = await User.findOne({ email });
      if (emailExists) {
        return res.status(400).send({ message: "Failed! Email is already in use!" });
      }
  
      // Find corresponding Role documents based on role names
      const foundRoles = await Role.find({ name: { $in: roles } });
  
      // Create a new user with role ObjectIds
      const user = new User({
        fullname,
        username,
        email,
        password: bcrypt.hashSync(password, 8),
        roles: foundRoles.map((role) => role._id),
      });
  
      // Save the user to the database
      await user.save();
  
      res.status(201).send({ message: "User registered successfully!" });
    } catch (err) {
      res.status(500).send({ message: err.message || "An error occurred while signing up." });
    }
  };
  exports.signin = async (req, res) => {
    const { username, password } = req.body;
  
    try {
      // Check if the username exists in the database
      const user = await User.findOne({ username }).populate('roles'); // Add .populate('roles')
  
      if (!user) {
        return res.status(404).send({ message: 'User not found!' });
      }
  
      // Compare the password with the hashed password in the database
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).send({ message: 'Invalid password!' });
      }
  
      // Generate a JWT token
      const token = jwt.sign({ id: user.id }, 'your-secret-key', { expiresIn: 86400 }); // 24 hours validity
  
      // Map roles to their names without encryption
      const roles = user.roles.map((role) => role.name); // Use role.name to get the names
  
      // Return user information along with the token and roles
      res.status(200).send({
        id: user.id,
        fullname: user.fullname,
        username: user.username,
        email: user.email,
        roles: roles,
        accessToken: token,
      });
    } catch (err) {
      res.status(500).send({ message: err.message || 'An error occurred while logging in.' });
    }
  };
// Function to handle User logout (signout)
exports.signout = async (req, res) => {
  try {
    // Clear the token from the session
    delete req.session.token;

    res.status(200).send({ message: 'Logout successful!' });
  } catch (err) {
    res.status(500).send({ message: err.message || 'An error occurred while logging out.' });
  }
};
