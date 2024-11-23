
const Cart = require("../../schema/CartSchema.js");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/shopping_app_db")

async function ListAbl(req, res) {
    try {
        const carts = await Cart.find()
        //console.log(carts, "asdf");
        res.json(carts);
    } catch (e) {
        res.status(500).send(e);
    }
}

module.exports = ListAbl;