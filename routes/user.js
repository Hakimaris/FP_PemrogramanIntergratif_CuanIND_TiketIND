require('dotenv').config();

const { Router } = require('express');
const jwt = require('jsonwebtoken');
const db = require('../db');
const router = Router();

router.get('/history', async (req, res) => {
    const queryresult = await db.promise().query('select * from item');
    res.status(200).send(queryresult[0]);
})

router.post('/login',async (req, res) => {
    const { username, password, notelp } = req.body;
    const queryresult = await db.promise().query(`select * from user where user_number='${notelp}' limit 1`);
    const apaya = queryresult[0][0];
    if (apaya == undefined) {
        res.status(400).send("gagal login")
    }
    const isitoken = { 
        nama: apaya.user_name, 
        id: apaya.user_id,
    } 
    const token = jwt.sign(isitoken,'buatdebug',{expiresIn: '24h'})
    res.status(200).json(token);
});

router.post('/register', async (req, res) => {
    const queryresult = await db.promise().query('select * from ');
    res.status(200).send(queryresult[0]);
})

module.exports = router;