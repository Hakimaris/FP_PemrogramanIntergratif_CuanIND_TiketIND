const { Router } = require('express');
const jwt = require('jsonwebtoken');
const db = require('../db');
const router = Router();

router.post('/', async(req, res) => {
    // res.send("sudah topup")
    const { duid, token, id } = req.body;
    let userid;
    jwt.verify(token, 'buatdebug', (err, response) => {
        // console.log(response);
        if (err) {
            return res.status(408).send("salah token");
        }
        userid = response;
    })
    const query = await db.promise().query(`UPDATE user SET user_money = user_money+ ${duid} WHERE user_id = ${userid.id};`);
    res.status(200).send("udah terupdate")
});

module.exports = router;