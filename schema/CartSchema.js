const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    memberList: [{
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User",
        required: true
    }],
    resolved: {
        type: Boolean,
        required: true
    },
    itemList: [
        {
            name: {
                type: String,
                required: true
            },
            resolved: {
                type: Boolean,
                required: true,
                default: false
            }
        }
    ]
});

module.exports = mongoose.model("Cart", CartSchema)