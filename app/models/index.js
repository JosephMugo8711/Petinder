const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");

// Include the new roles for "service provider", "pet owner", and "admin"
db.ROLES = ["user", "service provider", "pet owner", "admin"]; 

// Include the new models for "service_providers", "pet_owners", "pet", and "admin"
db.service_providers = require("./service_provider.model");
db.pet_owners = require("./pet_owner.model");
db.pet = require("./pet.model");
db.admin = require("./admin.model");

module.exports = db;
