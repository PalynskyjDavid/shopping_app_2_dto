const mongoose = require('mongoose');
const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const Cart = require('../../../schema/CartSchema');
const UpdateAbl = require('../../../abl/cart/update');

const app = express();
app.use(bodyParser.json());
app.use('/cart/update', UpdateAbl);



describe('PUT /cart/update', () => {
    let cart;

    beforeAll(async () => {
        cart = await Cart.create({
            name: "Original Cart Name",
            owner: new mongoose.Types.ObjectId(),
            memberList: [[new mongoose.Types.ObjectId()]],
            resolved: false,
            itemList: [{ name: "Original Item", resolved: false }],
        });
    });

    it('Updates a cart successfully', async () => {
        const updateData = {
            id: cart._id.toString(),
            name: "Updated Cart Name",
            resolved: true,
        };

        const res = await request(app).put('/cart/update').send(updateData);

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("_id", cart._id.toString());
        expect(res.body).toHaveProperty("name", "Updated Cart Name");
        expect(res.body).toHaveProperty("resolved", true);
    });

    it('Returns 400 if ID parameter is missing', async () => {
        const res = await request(app).put('/cart/update').send({ name: "Updated Cart Name" });

        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual({ error: "ID parameter is required." });
    });

    it('Returns 400 if cart does not exist', async () => {
        const res = await request(app).put('/cart/update').send({
            id: '000000000000000000000000',
            name: "Updated Cart Name",
        });

        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual({
            error: "Cart with ID '000000000000000000000000' doesn't exist.",
        });
    });
});
