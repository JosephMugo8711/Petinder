const mongoose = require("mongoose");

const PetSchema = new mongoose.Schema({
  petId: {
    type: Number,
    required: true,
    unique: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  breed: String,
  images: String,
  video: String,
  age: Number,
  color: String,
});

const Pet = mongoose.model("Pet", PetSchema);

module.exports = Pet;
