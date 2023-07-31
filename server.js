const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const mongoose = require("mongoose");

const app = express();
var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cookieSession({
    name: "petinder-session",
    keys: ["COOKIE_SECRET"],
    httpOnly: true,
  })
);

// MongoDB connection and initialization code
const dbConfig = require("./app/config/db.config.js");
const db = require("./app/models");
const Role = db.role;

mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

async function initial() {
  try {
    const count = await Role.estimatedDocumentCount();
    if (count === 0) {
      await new Role({ name: "user" }).save();
      await new Role({ name: "service provider" }).save();
      await new Role({ name: "pet owner" }).save();
      await new Role({ name: "admin" }).save();
      console.log("Roles initialized successfully!");
    }
  } catch (err) {
    console.error("Error initializing roles:", err);
  }
}

// Importing authentication and user routes
const authRoutes = require("./app/routes/auth.routes");
const userRoutes = require("./app/routes/user.routes");

// Adding authentication and user routes to the app
app.use(authRoutes);
app.use(userRoutes);

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to petinder application." });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});



