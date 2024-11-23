const Cart = require("../../schema/CartSchema.js");
const User = require("../../schema/UserSchema.js");

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/shopping_app_db")

const findFirstUser = async () => {
    return await User.findOne({ userName: "Mama"})
}
let loggedInUser = null;
findFirstUser().then(user => {
    loggedInUser = user._id.toString();
    console.log(loggedInUser);
})


async function RemoveAbl(req, res) {
    try {
        const body = req.query.id ? req.query : req.body;
        const id = body.id;
        if (!id) {
            return res.status(400).send({ error: "ID parameter is required." });
        }

        const cartToRemove = await Cart.findOne({ _id: id });
        //console.log(cartToRemove);

        if (!cartToRemove) {
            return res.status(400).send({ error: `Cart with ID '${id}' doesn't exist.` });
        }

        if (cartToRemove.owner != loggedInUser) {
            return res.status(400).send({ error: `No premission to remove cart with ID '${id}'.` });
        }

        const cart = await Cart.deleteOne(cartToRemove)
        console.log(cart);

        if (cart.deletedCount === 0) {
            return res.status(500).send({ error: `Failed to delete cart with ID '${id}'.` });
        }

        res.json(cart);
    } catch (e) {
        res.status(500).send({ error: "Internal server error", details: e.message });
    }
}


module.exports = RemoveAbl;