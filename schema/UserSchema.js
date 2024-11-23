const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: false
    }
});

module.exports = mongoose.model("User", UserSchema)