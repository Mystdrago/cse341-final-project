const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'RPG Api',
        description: 'An RPG Api'
    },
    host: 'localhost:3002',
    schemes: ['http', 'https'],
    securityDefinitions: {
        GMToken: {
            type: 'apiKey',
            in: 'header',
            name: 'Authorization',
            description: 'GM token obtained from /login'
        }
    }
};

const outputFile = './swagger.json';
const endpointsFile = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFile, doc);