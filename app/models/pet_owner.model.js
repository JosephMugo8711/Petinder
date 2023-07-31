const mongoose = require("mongoose");

const PetOwnerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  profileImage: String,
  contact: String,
  location: String,
  pets: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pet",
  }],
});

const PetOwner = mongoose.model("PetOwner", PetOwnerSchema);

module.exports = PetOwner;

