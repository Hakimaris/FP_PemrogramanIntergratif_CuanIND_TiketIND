const express = require('express');
const user_routes = require('./routes/user');
// const history_routes = require('./routes/history');
const pay_routes = require('./routes/pay');
const transfer_routes = require('./routes/transfer');
const topup_routes = require('./routes/topup');
// const jual_routes = require('./routes/jual');
const market_routes = require('./routes/market');
const market_profile_routes = require('./routes/market_profile');
// const tes = require('./routes/tes');
const app = express();
const db = require('./db');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/cuanind/user', user_routes);
// app.use('/cuanind/history', history_routes);
app.use('/tiketind/pay', pay_routes);
app.use('/cuanind/transfer', transfer_routes);
app.use('/cuanind/topup', topup_routes);
// app.use('/cuanind/tes', tes);
// app.use('/tiketind/jual', jual_routes);
app.use('/tiketind/market', market_routes);
app.use('/tiketind/profile', market_profile_routes);

app.listen(process.env.PORT || 3000, () => console.log('listening on port 3k'));
