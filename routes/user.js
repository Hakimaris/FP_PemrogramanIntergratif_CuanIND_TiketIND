const { Router } = require('express');
const jwt = require('jsonwebtoken');
const db = require('../db');
const router = Router();

router.get('/history', async (req, res) => {
    const { username, token, id } = req.body;
    let userid;
    jwt.verify(token, 'buatdebug', (err, response) => {
        // console.log(response);
        if (err) {
            return res.status(408).send("salah token");
        }
        userid = response;
    })
    const query = await db.promise().query(`select user SET user_money = user_money+ ${duid} WHERE user_id = ${userid.id};`);
    res.status(200).send("udah terupdate")
})

router.post('/login',async (req, res) => {
    const { username, password, notelp } = req.body;
    const queryresult = await db.promise().query(`select * from user where user_number='${notelp}' && user_password='${password}' && user_name='${username}' limit 1`);
    const apaya = queryresult[0][0];
    if (apaya == undefined) {
        res.status(400).send("gagal login")
    }
    const isitoken = { 
        nama: apaya.user_name, 
        id: apaya.user_id,
    } 
    const token = jwt.sign(isitoken, 'buatdebug', { expiresIn: '24h' })
    // res.send("Berhasil login")
    res.status(200).json(token);
});

router.post('/register', async (req, res) => {
    const { username, password, notelp, email } = req.body;
    const queryresult = await db.promise().query(`INSERT INTO user (user_id, user_email, user_name, user_password, user_number, user_money) VALUES (NULL, "${email}", "${username}", "${password}", "${notelp}", '0');`);
    res.status(200).send("Karakter dibuat");
})

module.exports = router;