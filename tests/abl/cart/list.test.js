const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const Cart = require('../../../schema/CartSchema');
const ListAbl = require('../../../abl/cart/list');

const app = express();
app.use(bodyParser.json());
app.use('/cart/list', ListAbl);



describe('LIST /cart', () => {
    it('Returns list of all carts.', async () => {

        const res = await request(app).get('/cart/list');

        expect(res.statusCode).toBe(200);
        expect(res.body).toBeInstanceOf(Array);

        res.body.forEach(cart => {
            expect(cart).toHaveProperty("_id");
            expect(typeof cart._id).toBe("string");

            expect(cart).toHaveProperty("name");
            expect(typeof cart.name).toBe("string");

            expect(cart).toHaveProperty("owner");
            expect(typeof cart.owner).toBe("string");

            expect(cart).toHaveProperty("memberList");
            expect(cart.memberList).toBeInstanceOf(Array);

            cart.memberList.forEach(member => {
                expect(member).toBeInstanceOf(Array);
                member.forEach(memberId => {
                    expect(typeof memberId).toBe("string");
                });
            });

            expect(cart).toHaveProperty("resolved");
            expect(typeof cart.resolved).toBe("boolean");

            expect(cart).toHaveProperty("itemList");
            expect(cart.itemList).toBeInstanceOf(Array);

            cart.itemList.forEach(item => {
                expect(item).toHaveProperty("name");
                expect(typeof item.name).toBe("string");

                expect(item).toHaveProperty("resolved");
                expect(typeof item.resolved).toBe("boolean");

                expect(item).toHaveProperty("_id");
                expect(typeof item._id).toBe("string");
            });

            expect(cart).toHaveProperty("__v");
            expect(typeof cart.__v).toBe("number");
        });
    });

    it('Handles internal server errors.', async () => {
        jest.spyOn(Cart, 'find').mockImplementationOnce(() => {
            throw new Error('Internal error');
        });

        const res = await request(app).get('/cart/list');

        expect(res.statusCode).toBe(500);
    });
});
