require('dotenv').config();

const { Router } = require('express');
const jwt = require('jsonwebtoken');
const db = require('../db');
const { authenticateToken } = require('../midelwer');
const router = Router();

router.get('/history', authenticateToken,async (req, res) => {
    // const { username, token, id } = req.body;
    let resuld = req.response;
    const query = await db.promise().query(`SELECT history.history_date as datetime, historycat.historycat_name as transaction, receipt.receipt_item as item, receipt.receipt_qty as sum, receipt.receipt_value as value, receipt.receipt_dec as description from history,receipt,historycat WHERE history.history_user = ${resuld.notelp} AND history.history_receipt = receipt.receipt_id AND historycat.historycat_id = history.history_receipt;`);
    res.status(200).json(query[0])
    // console.log("howek")
})

router.post('/login',async (req, res) => {
    const { password, notelp } = req.body;
    const queryresult = await db.promise().query(`select * from user where user_number='${notelp}' && user_password='${password}' limit 1`);
    const apaya = queryresult[0][0];
    // console.log(apaya);
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
        const queryresult1 = await db.promise().query(`INSERT INTO user (user_number, user_email, user_name, user_password, user_money) VALUES (${notelp}, "${email}", "${username}", "${password}", '0');`);
        res.status(200).json("Akun telah dibuat, silahkan lakukan Login lalu topup");
    }
    else {
        res.status(400).json("nomor telpon atau email sudah dipakai")
    }
})

module.exports = router;