const express = require('express');
const path = require('path');
const router = require('./routes');

// create app
const app = express();

// middleware
const parser = require('body-parser');
const logger = require('morgan');

app.use(parser.json());
app.use(parser.urlencoded({extended: true}));
app.use(logger('dev'));

app.use(express.static(path.join(__dirname, '../client/dist')));
app.use('/api', router);
app.use('*', (req, res) => res.status(404).send('Not Found'));

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server Running, listening on port: ${port}`));