const express = require('express');
const app = express();
const apiRouter = require('./routers/api-router');
const { handleCustomErrors, handlePsqlErrors, handleServerErrors } = require('./errors/errorhandler');
const cors = require('cors');

app.use(cors());

app.use(express.json());

app.use('/api', apiRouter);

app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(handleServerErrors);

app.all('/*', (req, res, next) => {
  res.status(404).send({ msg: 'Route not found' });
});

module.exports = app;
