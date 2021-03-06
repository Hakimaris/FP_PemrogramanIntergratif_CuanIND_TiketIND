const express = require('express');
const user_routes = require('./routes/user');
// const history_routes = require('./routes/history');
const pay_routes = require('./routes/pay');
const transfer_routes = require('./routes/transfer');
const topup_routes = require('./routes/topup');
const app = express();
const db = require('./db');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/cuanind/user', user_routes);
// app.use('/cuanind/history', history_routes);
app.use('/cuanind/pay', pay_routes);
app.use('/cuanind/transfer', transfer_routes);
app.use('/cuanind/topup', topup_routes);

app.listen(3000, () => console.log('listening on port 3k'));
