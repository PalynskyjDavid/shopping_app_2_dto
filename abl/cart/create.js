const Cart = require("../../schema/CartSchema");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/shopping_app_db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

async function CreateAbl(req, res) {
    try {
        //res.body._id = new mongoose.mongo.ObjectId();
        const cart = new Cart({ ...req.body });

        const newCart = await cart.save();

        // console.log(cart);
        // console.log(newCart)

        // if (!newCart) {
        //     return res.status(400).send({ error:'`${newCart}`' });
        // }

        res.json(newCart);
    } catch (e) {
        res.status(400).send({ error: "Validation failed.", details: e.message });
    }
}

module.exports = CreateAbl;
