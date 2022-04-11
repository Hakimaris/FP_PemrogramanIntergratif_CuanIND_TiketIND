const { Router } = require('express');
const jwt = require('jsonwebtoken');
const db = require('../db');
const router = Router();

router.post('/', async(req, res) => {
    // res.send("sudah topup")
<<<<<<< HEAD
    const {token} = req.body;
=======
    const { duid, token, id } = req.body;
    let userid;
>>>>>>> ada570606291ec7d72efaeb7f3630c4bbc219481
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