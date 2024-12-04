const User = require("../models/User"); // Correct relative path




// Controller to create a new user
const createUser = async (req, res) => {
    try {
        const { name, email, phoneNumber, department, division } = req.body;
        const profilePicture = req.file ? req.file.path : null;

        if (!name || !email || !division) {
            return res.status(400).json({ error: "Name, email, and division are required." });
        }

        const user = await User.create({
            name,
            email,
            phoneNumber,
            department,
            division,
            profilePicture,
        });

        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};






// get all users
const getUsers = async (req, res) => {
    try{
        const users = await User.find();
        res.status(200).json(users);
    }
    catch(error){
        res.status(500).json({ error: error.message });
    }
};





//get users by id
const getUserById = async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
  
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      res.status(200).json(user);
    } catch (error) {
      if (error.name === "CastError") {
        return res.status(400).json({ error: "Invalid user ID format" });
      }
      res.status(500).json({ error: error.message });
    }
  };
  



//update user
const updateUser = async (req, res) => {
  try {
      const { name, email, phoneNumber, department, division } = req.body;

      const updates = {};
      if (name) updates.name = name;
      if (email) updates.email = email;
      if (phoneNumber) updates.phoneNumber = phoneNumber;
      if (department) updates.department = department;
      if (division) updates.division = division;
      if (req.file) updates.profilePicture = req.file.path; // Handle file upload

      if (Object.keys(updates).length === 0) {
          return res.status(400).json({ error: "No valid fields provided for update" });
      }

      const user = await User.findByIdAndUpdate(req.params.id, updates, {
          new: true,
          runValidators: true,
      });

      if (!user) {
          return res.status(404).json({ error: "User not found" });
      }

      res.status(200).json(user);
  } catch (error) {
      if (error.name === "CastError") {
          return res.status(400).json({ error: "Invalid user ID format" });
      }
      res.status(500).json({ error: error.message });
  }
};



//delete User
const deleteUser = async(req,res) => {
    try{
        const user = await User.findByIdAndDelete(req.params.id);
        if(!user){
            return res.status(404).json({error: "User not found"});
        }
        res.status(200).json({ message: "User successfully deleted", user });
    }
    catch(error){
        if (error.name === "CastError") {
            return res.status(400).json({ error: "Invalid user ID format" });
          }
          res.status(500).json({ error: error.message });
    }
};
module.exports = {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
  };
