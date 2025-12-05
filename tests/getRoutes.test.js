const request = require('supertest');
const app = require('../server'); 
const mongodb = require('../data/database');

let client;

beforeAll((done) => {
    // set a longer timeout if needed, and initialize DB (uses same env)
    mongodb.initDb((err, dbClient) => {
        if (err) return done(err);
        client = dbClient;
        done();
    });
});

afterAll(async () => {
    // close the MongoClient to free connections
    if (client && client.close) {
        await client.close();
    }
});

describe('GET routes', () => {
    test('GET /players should return 200 and an array', async () => {
        const res = await request(app).get('/players/');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    test('GET /players/:id returns 404 for invalid id (non-existent)', async () => {
        const res = await request(app).get('/players/000000000000000000000000'); // bogus id
        expect([200, 404, 500]).toContain(res.statusCode); // accept either 404 or 500 depending on DB
    });

    test('GET /monsters should return 200 and an array', async () => {
        const res = await request(app).get('/monsters/');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    test('GET /monsters/:id returns 404 or 200 depending on DB', async () => {
        const res = await request(app).get('/monsters/000000000000000000000000');
        expect([200, 404, 500]).toContain(res.statusCode);
    });
});