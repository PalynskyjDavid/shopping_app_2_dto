// const path = require("path");
// const Ajv = require("ajv").default;
// const UserDao = require("../../dao/user-dao");
// let dao = new UserDao(
//   path.join(__dirname, "..", "..", "storage", "users.json")
// );

// let schema = {
//   type: "object",
//   properties: {},
//   required: [],
// };
const User = require("../../schema/UserSchema.js");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/shopping_app_db")

async function ListAbl(req, res) {
    try {
        const users = await User.find()
        //console.log(users, "asdf");
        res.json(users);
    } catch (e) {
        res.status(500).send(e);
    }
}

module.exports = ListAbl;