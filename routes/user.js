require('dotenv').config();

const { Router } = require('express');
const jwt = require('jsonwebtoken');
const db = require('../db');
const { authenticateToken } = require('../midelwer');
const router = Router();

router.get('/history', authenticateToken,async (req, res) => {
    // const { username, token, id } = req.body;
    let resuld = req.response.notelp;
    const query = await db.promise().query(`SELECT * from history WHERE history_user = ${resuld};`);

    res.status(200).json(query[0])
    // console.log("howek")
})

router.post('/login',async (req, res) => {
    const { password, notelp } = req.body;
    const queryresult = await db.promise().query(`select * from user where user_number='${notelp}' && user_password='${password}' limit 1`);
    const apaya = queryresult[0][0];
    console.log(apaya);
    if (apaya == undefined) {
        res.status(400).json("gagal login")
    }
    else {
        const isitoken = {
            nama: apaya.user_name,
            notelp: apaya.user_number
        }
        const token = jwt.sign(isitoken, process.env.sekrekkiy, { expiresIn: '24h' })
        res.status(200).json(token);
    }
});

router.post('/register', async (req, res) => {
    const { username, password, notelp, email } = req.body;
    
    const queryresult2 = await db.promise().query(`select count(*) param from user where user_number = "${notelp}" or user_email = "${email}"`);
    let hasilquery = queryresult2[0][0];
    // console.log(hasilquery.param);
    if (hasilquery.param == 0 ) { 
        // console.log("haha")
        const queryresult1 = await db.promise().query(`INSERT INTO user (user_id, user_email, user_name, user_password, user_number, user_money) VALUES (NULL, "${email}", "${username}", "${password}", "${notelp}", '0');`);
        res.status(200).json("Karakter telah dibuat");
    }
    else {
        res.status(400).json("nomor telpon atau email sudah dipakai")
    }
})

module.exports = router;