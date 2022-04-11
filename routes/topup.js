require('dotenv').config();

const { Router } = require('express');
const jwt = require('jsonwebtoken');
const db = require('../db');
const router = Router();

router.post('/', async(req, res) => {
    // res.send("sudah topup")
    const { duid, token } = req.body;
    jwt.verify(token, 'buatdebug', (err, response) => {
        console.log(response);
    })
    const query = await db.promise().query(`update user_money from user set user_money=user_money+${duid} where user_id=1`);
});

module.exports = router;