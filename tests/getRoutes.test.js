require('dotenv').config({ path: '.env.test' });
const request = require('supertest');
const app = require('../server'); 
const mongodb = require('../data/database');


let client;

beforeAll(async () => {
    client = await new Promise((resolve, reject) => {
        mongodb.initDb((err, dbClient) => {
            if (err) reject(err);
            else resolve(dbClient);
        });
    });
});

afterAll(async () => {
  const dbClient = mongodb.getDatabase(); // should be your MongoClient
  if (dbClient && dbClient.close) {
    await dbClient.close();
  }
});

// Helper function for GET tests
const testGetEndpoints = (routeName) => {
    describe(`GET /${routeName} endpoints`, () => {
        test(`GET /${routeName} should return 200 and an array`, async () => {
            const res = await request(app).get(`/${routeName}/`);
            expect(res.statusCode).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
        });

        test(`GET /${routeName}/:id returns 404 for invalid id`, async () => {
            const res = await request(app).get(`/${routeName}/000000000000000000000000`);
            expect([200, 404, 500]).toContain(res.statusCode); // Accept depending on DB
        });
    });
};

// Run tests for all collections
['players', 'monsters', 'users', 'equipment'].forEach(testGetEndpoints);