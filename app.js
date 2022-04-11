const express = require('express');
//const {requireAuth}=require ('./middleware');
const user_routes = require('./routes/user');
const history_routes = require('./routes/history');
const pay_routes = require('./routes/pay');
const transfer_routes = require('./routes/transfer');
const topup_routes = require('./routes/topup');
const app = express();
const db = require('./db');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/user', user_routes);
app.use('/api/history', history_routes);
app.use('/api/pay', pay_routes);
app.use('/api/transfer', transfer_routes);
app.use('/api/topup', topup_routes);

app.listen(3000, () => console.log('listening on port 3k'));
// app.get('*', checkUser);
