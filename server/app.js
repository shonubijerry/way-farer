import Express from 'express';
import cors from 'cors';
import debug from 'debug';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import swaggerUI from 'swagger-ui-express';
import swaggerSpec from './config/swagger';
import routes from './routes/index';

/**
* @fileOverview - application entry point
* @requires - express
* @requires - body-parser
* @requires - dotenv
* @requires - cors
* @requires - ./routes
* @exports - app.js
* */

dotenv.config();

// declare constants
const app = new Express();
const port = process.env.PORT || 3000;

// declare middleware
app.use(bodyParser.urlencoded({
  extended: false,
}));
app.use(bodyParser.json());

// 3rd party middleware
app.use(cors('*'));

// use swagger-Ui-express for your app documentation endpoint
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

routes(app);

// listen to app port
app.listen(port, debug('app/debug')(`App listening on port ${port}`));

export default app;
