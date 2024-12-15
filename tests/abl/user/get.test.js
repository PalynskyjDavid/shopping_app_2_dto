const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const User = require('../../../schema/UserSchema');
const GetAbl = require('../../../abl/user/get');
let mongoServer;

const app = express();
app.use(bodyParser.json());
app.use('/user', GetAbl);


// beforeAll(async () => {
//     mongoServer = await MongoMemoryServer.create();
//     const mongoUri = mongoServer.getUri();
    
//     await mongoose.connect(mongoUri, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//     });
// });

// //To close connection.
// afterAll(async () => {
//     await mongoServer.close()
//     //Disconnect : Runs .close() on all connections in parallel.
//     //await mongoose.disconnect();
// });

//To remove testing database.
// afterEach(async () => {
//     await mongoose.connection.db.dropDatabase();
//     //This should remove all users from db.
//     //await User.deleteMany({});
// });

describe('GET /user', () => {
    it('Returns one user by name.', async () => {
        //Uncomment if not using setUp.js / turned on backend (npm run devStart) for mock data.
        const userName = 'Tata';
        // const user = new User({ userName });
        // await user.save();

        const res = await request(app).get('/user').query({ name: userName });

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual([
            { _id: expect.any(String), userName: 'Tata', __v: 0 }
        ]);
    });

    it('Returns 400 if name parameter is missing.', async () => {
        const res = await request(app).get('/user');

        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual({ error: 'Name parameter is required.' });
    });

    it('Returns 400 if user does not exist.', async () => {
        const res = await request(app).get('/user').query({ name: 'Unknown' });

        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual({
            error: "User with name 'Unknown' doesn't exist.",
        });
    });

    it('Handles internal server errors.', async () => {
        jest.spyOn(User, 'find').mockImplementationOnce(() => {
            throw new Error('Internal error');
        });

        const res = await request(app).get('/user').query({ name: 'Tata' });

        expect(res.statusCode).toBe(500);
        expect(res.body).toEqual({
            error: 'Internal server error',
            details: 'Internal error',
        });
    });
});
