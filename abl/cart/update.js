const Cart = require("../../schema/CartSchema");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/shopping_app_db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

async function UpdateAbl(req, res) {
    try {
        const body = req.query.id ? req.query : req.body;
        const id = body.id;

        //console.log(req);

        if (!id) {
            return res.status(400).send({ error: "ID parameter is required." });
        }

        //const updateFields = {};

        // if (req.body.name !== undefined) updateFields.name = body.name;
        // if (body.owner !== undefined) updateFields.owner = body.owner;
        // if (body.memberList !== undefined) updateFields.memberList = body.memberList;
        // if (body.resolved !== undefined) updateFields.resolved = body.resolved;
        // if (body.itemList !== undefined) updateFields.itemList = body.itemList;
        // console.log(updateFields)

        const updatedCart = await Cart.findByIdAndUpdate(
            id,
            { ...req.body },
            { new: true, runValidators: true }
        );

        if (!updatedCart) {
            return res.status(400).send({ error: `Cart with ID '${id}' doesn't exist.` });
        }

        res.json(updatedCart);
    } catch (e) {
        res.status(500).send({ error: "Internal server error", details: e.message });
    }
}

module.exports = UpdateAbl;
