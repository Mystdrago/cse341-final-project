const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'RPG Api',
        description: 'An RPG Api'
    },
    host: 'localhost:3002',
    schemes: ['http', 'https']
};

const outputFile = './swagger.json';
const endpointsFile = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFile, doc);