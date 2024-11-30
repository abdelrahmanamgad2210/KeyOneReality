const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String },
    department: { type: String },
    division: { type: String, enum: ['Holiday Homes', 'Property Management', 'Design Solution', 'Brokerage'] },
    profilePicture: { type: String }, // URL for uploaded image
});

const User = model("users", UserSchema);

module.exports = User;
