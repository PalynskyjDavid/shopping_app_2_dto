const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const User = require('../../../schema/UserSchema');
const ListAbl = require('../../../abl/user/list');

let mongoServer;

const app = express();
app.use(bodyParser.json());
app.use('/user/list', ListAbl);


// beforeAll(async () => {
//     testMongoServer = await MongoMemoryServer.create();

//     const uri = testMongoServer.getUri();

//     mongoServer = mongoose.createConnection(uri, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//     })
// });

// afterAll(async () => {
//     await mongoServer.close()
// });

// afterEach(async () => {
//     await User.deleteMany({});
// });

describe('LIST /user', () => {
    it('Returns list of all users.', async () => {

        // const userNames = ['Tata', 'Pepa', 'Franta'];
        // for ( const userName of userNames) {
        //     const user = new User({ userName });
        //     await user.save();    
        // }
            
        const res = await request(app).get('/user/list');

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual([
            { _id: expect.any(String), userName: 'Mama', __v: 0 },
            { _id: expect.any(String), userName: 'Tata', __v: 0 },
            { _id: expect.any(String), userName: 'Pepa', __v: 0 },
            { _id: expect.any(String), userName: 'Franta', __v: 0 },
            { _id: expect.any(String), userName: 'Honza', __v: 0 }
        ]);
    });

    it('Handles internal server errors.', async () => {
        jest.spyOn(User, 'find').mockImplementationOnce(() => {
            throw new Error('Internal error');
        });

        const res = await request(app).get('/user/list');

        expect(res.statusCode).toBe(500);
    });
});
