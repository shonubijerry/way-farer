import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  swagger: '2.0',
  info: {
    description: 'WayFarer is a public bus transportation booking server.',
    version: '1.0.0',
    title: 'WAY FARER',
    termsOfService: 'http://swagger.io/terms/',
    contact: {
      email: 'shonubijerry@gmail.com',
    },
    license: {
      name: 'MIT',
      url: 'https://opensource.org/licenses/MIT',
    },
  },
  // host: 'way-farer-shonubi.herokuapp.com', // the host or url of the app
  host: 'localhost:8300', // the host or url of the app
  basePath: '/api/v1', // the basepath of your endpoint
  tags: [{
    name: 'auth',
  }, {
    name: 'user',
  }, {
    name: 'admin',
  }],
  schemes: ['https', 'http'],
  consumes: ['application/json', 'application/x-www-form-urlencoded'],
  produces: ['application/json'],
  securityDefinitions: {
    Bearer: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
    },
  },
};

// options for the swagger docs
const options = {
  // import swaggerDefinitions
  swaggerDefinition,
  // path to the API docs
  apis: ['./docs/**/*.yaml'],
};
// initialize swagger-jsdoc
module.exports = swaggerJSDoc(options);
