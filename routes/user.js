const { Router } = require('express');
const jwt = require('jsonwebtoken');
const db = require('../db');
const router = Router();

router.get('/history', async (req, res) => {
    const queryresult = await db.promise().query('select * from item');
    res.status(200).send(queryresult[0]);
})

router.post('/login', (req, res) => {
    const queryresult = await db.promise().query('select * from user where user_umber=${apaya}');
});

router.post('/register', async (req, res) => {
    const queryresult = await db.promise().query('select * from ');
    res.status(200).send(queryresult[0]);
})

module.exports = router;