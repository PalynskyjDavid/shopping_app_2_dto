const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const Cart = require('../../../schema/CartSchema');
const CreateAbl = require('../../../abl/cart/create');

const app = express();
app.use(bodyParser.json());
app.use('/cart/create', CreateAbl);

cart = {
    name: 'Naradi',
    owner: '674cc4c7549657c8b3ad0037',
    memberList: [
        [
            '674b5bc1cdfd1326e7e39605',
            '674b5bc1cdfd1326e7e39606',
            '674b5bc1cdfd1326e7e39607',
            '674b5bc1cdfd1326e7e39608'
        ]
    ],
    resolved: false,
    itemList: [
        {
            name: 'Šrubokrut',
            resolved: false,
            _id: '674b5bc1cdfd1326e7e39612'
        },
        { name: 'Šrub', resolved: false, _id: '674b5bc1cdfd1326e7e39613' }
    ]
}


//Z nějakého důvodu se objekty přepisují.
// const { name, ...cartNoName } = cart;
// const { owner, resolved, ...cartNoOwnerResolved } = cart;

const cartNoName = JSON.parse(JSON.stringify(cart));
delete cartNoName["name"]

const cartNoOwnerResolved = JSON.parse(JSON.stringify(cart));
delete cartNoOwnerResolved["owner"]
delete cartNoOwnerResolved.resolved



describe('PUT /cart/create', () => {
    it('Creates one cart.', async () => {

        const res = await request(app).put('/cart/create').send(cart);

        expect(res.statusCode).toBe(200);
        //expect(res.body[0]).toHaveProperty("_id");
        expect(res.body).toHaveProperty("name", cart.name);
        expect(res.body).toHaveProperty("owner", cart.owner.toString());
        expect(res.body).toHaveProperty("memberList");
        expect(res.body).toHaveProperty("resolved", cart.resolved);
        expect(res.body).toHaveProperty("itemList");
    });

    multiError = {
        "error": "Validation failed.",
        "details": "Cart validation failed: resolved: Path `resolved` is required., owner: Path `owner` is required."
    }
    signleError = {
        "error": "Validation failed.",
        "details": "Cart validation failed: name: Path `name` is required."
    }


    it('Returns 400 if name parameter is missing.', async () => {
        const res = await request(app).put('/cart/create').send(cartNoName);

        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual(signleError);
    });

    it('Returns 400 if owner and resolved parameters are missing.', async () => {
        const res = await request(app).put('/cart/create').send(cartNoOwnerResolved);

        expect(res.statusCode).toBe(400);
        expect(res.body.error).toEqual(
            "Validation failed."
        );
        expect(res.body.details).toEqual(
            "Cart validation failed: resolved: Path `resolved` is required., owner: Path `owner` is required."
        );
    });

    // //Nevím jak nastavit status na 500
    // it('Handles internal server errors.', async () => {
    //     jest.spyOn(Cart, 'find').mockImplementationOnce(() => {
    //         throw new Error('Internal error');
    //     });

    //     const res = await request(app).get('/cart/create').send(cart);

    //     //Tady to vrací 200
    //     expect(res.statusCode).toBe(200);
    //     expect(res.body).toEqual({
    //         error: 'Internal server error',
    //         details: 'Internal error',
    //     });
    // });
});
