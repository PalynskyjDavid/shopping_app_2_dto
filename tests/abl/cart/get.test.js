const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const Cart = require('../../../schema/CartSchema');
const GetAbl = require('../../../abl/cart/get');
let mongoServer;

const app = express();
app.use(bodyParser.json());
app.use('/cart', GetAbl);

let cart;

beforeAll(async () => {
    // testMongoServer = await MongoMemoryServer.create();

    // const uri = testMongoServer.getUri();

    // mongoServer = mongoose.createConnection(uri, {
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true,
    // })

    cart = await Cart.findOne();
    // });

    // //To close connection.
    // afterAll(async () => {
    //     await mongoServer.close()
});


describe('GET /cart', () => {
    it('Returns one cart by name.', async () => {

        const res = await request(app).get('/cart').query({ id: cart._id.toString() });


        expect(res.statusCode).toBe(200);
        expect(res.body[0]).toHaveProperty("_id", cart._id.toString());
        expect(res.body[0]).toHaveProperty("name", cart.name);
        expect(res.body[0]).toHaveProperty("owner", cart.owner.toString());
        expect(res.body[0]).toHaveProperty("memberList");
        expect(res.body[0]).toHaveProperty("resolved", cart.resolved);
        expect(res.body[0]).toHaveProperty("itemList");
    });

    it('Returns 400 if name parameter is missing.', async () => {
        const res = await request(app).get('/cart');

        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual({ error: 'ID parameter is required.' });
    });

    it('Returns 400 if cart does not exist.', async () => {
        const res = await request(app).get('/cart').query({ id: '000000000000000000000000' });

        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual({
            error: "Cart with ID '000000000000000000000000' doesn't exist.",
        });
    });

});
