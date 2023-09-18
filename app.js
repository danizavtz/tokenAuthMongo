require('dotenv').config()
const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const { expressjwt } = require('express-jwt');

const app = express();
app.disable('x-powered-by');
app.use('/secure', expressjwt({ secret: process.env.SECRET, algorithms: ['HS256'] }));
app.use(cors({ credentials: true, origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== 'test') {
  app.use(logger('dev'));
}
app.use(require('./server/index'));

module.exports = app;