//const mongoose = require("mongoose");
const Cart = require("../../schema/CartSchema.js");

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/shopping_app_db")

const shoppingAppDb = mongoose.createConnection('mongodb://localhost/shopping_app_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });


async function GetAbl(req, res) {
    try {
        const body = req.query.id ? req.query : req.body;
        const id = body.id;
        //console.log(id);
        if (!id) {
            return res.status(400).send({ error: "ID parameter is required." });
        }

        const cart = await Cart.find({ _id: id })
        //console.log(Cart);

        if (cart.length === 0) {
            return res.status(400).send({ error: `Cart with ID '${id}' doesn't exist.` });
        }

        res.json(cart);

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
// const CartDao = require("../../dao/Cart-dao.js");
// let dao = new CartDao(
//   path.join(__dirname, "..", "..", "storage", "Carts.json")
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
//       const CartId = body.Id;
//       const Cart = await dao.getCart(CartId);
//       if (!Cart) {
//         res
//           .status(400)
//           .send({ error: `Cart with Id '${CartId}' doesn't exist.` });
//       }
//       res.json(Cart);
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