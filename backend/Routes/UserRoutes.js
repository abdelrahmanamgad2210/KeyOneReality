const express = require("express");
const userController = require('../controller/UserController');
const router = express.Router();
const multer = require("multer");


// Configure Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Save files to 'uploads' folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname); // Unique file name
    },
});

const upload = multer({
    storage,
    limits: { fileSize: 2 * 1024 * 1024 }, // Limit file size to 2MB
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith("image/")) {
            cb(null, true);
        } else {
            cb(new Error("Only image files are allowed!"), false);
        }
    },
});

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

        const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });

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

// Route to create a user with file upload
router.post("/create", upload.single("profilePicture"), userController.createUser);

// Route to get all users
router.get("/", userController.getUsers);

// Route to get user by ID
router.get("/:id", userController.getUserById);

// Route to update user by ID
router.put("/:id", upload.single("profilePicture"), userController.updateUser);

// Route to delete user by ID
router.delete("/:id", userController.deleteUser);

module.exports = router;
