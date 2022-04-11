require('dotenv').config();

const { Router } = require('express');
const jwt = require('jsonwebtoken');
const db = require('../db');
const router = Router();

router.post('/', async(req, res) => {
    const { duid, token, id} = req.body;
    jwt.verify(token, 'buatdebug', (err, response) => {
        var userID = decoded.id;
        console.log(response + userID);
    })
    // const decoded = jwt.verify(token, 'buatdebug');  
    // var userId = decoded.id  
    // res.status(200).json(userId);
    const query = await db.promise().query(`UPDATE user SET user_money = user_money+ ${duid} WHERE user.user_id = 1;`);
});

module.exports = router;