// Function for public access
exports.publicAccess = (req, res) => {
    res.status(200).send({ message: "Public access available!" });
  };
  
  // Function for logged-in users (any role)
  exports.loggedIn = (req, res) => {
    res.status(200).send({ message: "Logged-in user access available!" });
  };
  
  // Function for service provider users
  exports.serviceProvider = (req, res) => {
    res.status(200).send({ message: "Service provider access available!" });
  };
  
  // Function for admin users
  exports.admin = (req, res) => {
    res.status(200).send({ message: "Admin access available!" });
  };
  
  // Function for pet owner users
  exports.petOwner = (req, res) => {
    res.status(200).send({ message: "Pet owner access available!" });
  };
  