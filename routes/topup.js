require('dotenv').config();

const { Router } = require('express');
const jwt = require('jsonwebtoken');
const db = require('../db');
const router = Router();

router.post('/', async(req, res) => {
    const { duid, token, id} = req.body;
    jwt.verify(token, 'buatdebug', (err, response) => {
        console.log(response);
    })
    const query = await db.promise().query(`UPDATE user SET user_money = user_money+ ${duid} WHERE user.user_id = 1;`);
});

module.exports = router;