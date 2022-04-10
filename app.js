const express = require('express');
const db = require('./db');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get('/', (req, res) => {
    res.status(200).send('pog');
})

app.get('/db', async (req, res) => {
    const queryresult = await db.promise().query('select * from user');
    res.status(200).send(queryresult[0]);
})

app.listen(3000, () => {
    console.log('dah konek ke 3000')
})
