const express = require('express');
require('express-async-errors');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const cors = require('cors');

const logger = require('./helpers/logger');
const errorHandler = require('./helpers/error');

const index = require('./routes/index');
const tables = require('./routes/tables');
const users = require('./routes/users');

const app = express();
const port = process.env.PORT || 3000;

require('./helpers/constants');
require('./helpers/passport-jwt');
require('./helpers/email');

app.use(cors());
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cookieParser());
app.use(passport.initialize());

app.use(logger);

app.use('/', index);
app.use('/tables', tables);
app.use('/users', users);

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
