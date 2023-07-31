const mongoose = require("mongoose");

const PetOwner = mongoose.model(
  "PetOwner",
  new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    profileImage: String,
    contact: String,
    location: String,
  })
);

module.exports = PetOwner;
