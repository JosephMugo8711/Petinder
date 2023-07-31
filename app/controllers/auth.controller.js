const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../models');
const User = db.user;
const Role = db.role;

// Function to create a new User (signup)
exports.signup = async (req, res) => {
  const { fullname, username, email, password, role } = req.body;

  try {
    // Check if the username or email already exists in the database
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).send({ message: 'Username or email already exists!' });
    }

    // Hash the password before saving to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Get the role ID from the database based on the role name
    let userRole;
    if (role) {
      userRole = await Role.findOne({ name: role });
    } else {
      // If no role is specified, set the role to 'user' by default
      userRole = await Role.findOne({ name: 'user' });
    }

    // Create a new User object and save it to the database
    const newUser = new User({
      fullname,
      username,
      email,
      password: hashedPassword,
      roles: [userRole._id], // Assign the userRole to the user
    });

    await newUser.save();

    res.status(201).send({ message: 'User registered successfully!' });
  } catch (err) {
    res.status(500).send({ message: err.message || 'An error occurred while creating the user.' });
  }
};

// Function to handle User login (signin)
exports.signin = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the username exists in the database
    const user = await User.findOne({ username });
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

    // Set the token as a cookie (assuming you are using cookie-session)
    req.session.token = token;

    // Return user information along with the token
    res.status(200).send({
      id: user.id,
      fullname: user.fullname,
      username: user.username,
      email: user.email,
      roles: user.roles,
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
