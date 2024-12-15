const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const Cart = require('../../../schema/CartSchema');
const RemoveAbl = require('../../../abl/cart/remove');

const app = express();
app.use(bodyParser.json());
app.use('/cart/remove', RemoveAbl);

let cart;
let cart2;

beforeAll(async () => {
    cart = await Cart.findOne();
    cart2 = await Cart.findOne({ name: "Sladkosti"})
});


describe('DELETE /cart', () => {
    it('Removes one cart by id.', async () => {

        //const res = await request(app).get('/cart').query({ id: cart._id.toString() });
        const res = await request(app).delete("/cart/remove").query({ id: cart._id.toString() });

        expect(res.statusCode).toBe(200);
    });

    it('Returns 400 if id parameter is missing.', async () => {
        const res = await request(app).delete("/cart/remove");

        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual({ error: 'ID parameter is required.' });
    });

    it('Returns 400 if cart does not exist.', async () => {
        const res = await request(app).delete("/cart/remove").query({ id: "000000000000000000000000" });

        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual({
            error: "Cart with ID '000000000000000000000000' doesn't exist.",
        });
    });

    it('Returns 400 if you do not have permission to remove it.', async () => {
        const res = await request(app).delete("/cart/remove").query({ id: cart2._id.toString() });

        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual({
            error: `No premission to remove cart with ID '${cart2._id.toString()}'.`,
        });
    });

});
