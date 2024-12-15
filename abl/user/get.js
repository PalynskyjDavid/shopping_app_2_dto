//const mongoose = require("mongoose");
const User = require("../../schema/UserSchema.js");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/shopping_app_db")
//mongoose.connect("mongodb://localhost/shopping_app_db")


async function GetAbl(req, res) {
    try {
        const body = req.query.name ? req.query : req.body;
        const name = body.name;

        if (!name) {
            return res.status(400).send({ error: "Name parameter is required." });
        }

        const user = await User.find({ userName: name })
        //console.log(user);

        if (user.length === 0) {
            return res.status(400).send({ error: `User with name '${name}' doesn't exist.` });
        }

        res.json(user);

    } catch (e) {
        res.status(500).send({ error: "Internal server error", details: e.message });
    }
}

module.exports = GetAbl;