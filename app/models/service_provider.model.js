const mongoose = require("mongoose");

const ServiceProvider = mongoose.model(
  "ServiceProvider",
  new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    expertise: String,
    profileImage: String,
    experience: Number,
    availability: String,
    contact: String,
    location: String,
  })
);

module.exports = ServiceProvider;
