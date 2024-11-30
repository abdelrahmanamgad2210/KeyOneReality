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


// Route to create a user with file upload
router.post("/create", upload.single("profilePicture"), userController.createUser);

// Route to get all users
router.get("/", userController.getUsers);

// Route to get user by ID
router.get("/:id", userController.getUserById);

// Route to update user by ID
router.put("/:id", userController.updateUser);

// Route to delete user by ID
router.delete("/:id", userController.deleteUser);

module.exports = router;
