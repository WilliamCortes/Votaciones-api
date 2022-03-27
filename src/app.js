const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const routes = require('./routes');
const app = express();
app.name = 'API';

app.use(morgan('dev'));

app.use(cors());

app.use(express.json());

app.use('/api', routes);

app.use((err, req, res, next) => {
    let error = {};
    error.msg = err.msg || err;
    error.status = err.status || 500;
    console.log('Error: ', error);
    res.status(error.status).send(error.msg);
})

module.exports = app;