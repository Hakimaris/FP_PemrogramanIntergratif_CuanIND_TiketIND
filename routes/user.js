const { Router } = require('express');
const jwt = require('jsonwebtoken');
const db = require('../db');
const router = Router();

router.get('/history', (req, res) => {
    res.send("sudah dpt history")
});

router.post('/login', (req, res) => {
    res.send("sudah dpt login")
});

router.get('/db', async (req, res) => {
    const queryresult = await db.promise().query('select * from ');
    res.status(200).send(queryresult[0]);
})

module.exports = router;