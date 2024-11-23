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

        // else {
        //     res.status(400).send({
        //         errorMessage: "valIdation of input failed",
        //         params: body,
        //         reason: ajv.errors,
        //     });
        //}
    } catch (e) {
        res.status(500).send({ error: "Internal server error", details: e.message });
    }
}


// const path = require("path");
// const Ajv = require("ajv").default;
// const UserDao = require("../../dao/user-dao.js");
// let dao = new UserDao(
//   path.join(__dirname, "..", "..", "storage", "users.json")
// );

// let schema = {
//   type: "object",
//   properties: {
//     Id: { type: "string" },
//   },
//   required: ["Id"],
// };

// async function GetAbl(req, res) {
//   try {
//     const ajv = new Ajv();
//     const body = req.query.Id ? req.query : req.body;
//     console.log(body);
//     const valId = ajv.validate(schema, body);
//     if (valId) {
//       const userId = body.Id;
//       const user = await dao.getUser(userId);
//       if (!user) {
//         res
//           .status(400)
//           .send({ error: `User with Id '${userId}' doesn't exist.` });
//       }
//       res.json(user);
//     } else {
//       res.status(400).send({
//         errorMessage: "valIdation of input failed",
//         params: body,
//         reason: ajv.errors,
//       });
//     }
//   } catch (e) {
//     res.status(500).send(e);
//   }
// }

module.exports = GetAbl;