const { Router } = require('express');
const jwt = require('jsonwebtoken');
const db = require('../db');
const { authenticateToken } = require('../midelwer');
const router = Router();

router.post('/', authenticateToken,async(req, res) => {
    // res.send("sudah topup")
    const { amount } = req.body;
    let resuld = req.response
    const query1 = await db.promise().query(`UPDATE user SET user_money = user_money+ ${amount} WHERE user_number = ${resuld.notelp};`);
    const query2 = await db.promise().query(`INSERT INTO receipt (receipt_id, receipt_receive, receipt_item, receipt_value, receipt_dec) VALUES (NULL, ${resuld.notelp}, 0, ${amount},'Top Up via Admin');`);
    const query3 = await db.promise().query(`SELECT receipt_id FROM receipt WHERE (receipt_receive=${resuld.notelp} OR receipt_send =${resuld.notelp}) AND receipt_value=${amount} ORDER BY receipt_id DESC LIMIT 1;`);
    let hasilQuery = query3[0][0];
    const query4 = await db.promise().query(`INSERT INTO history (history_id, history_user, history_cat, history_receipt) VALUES (NULL, ${resuld.notelp}, 3, ${hasilQuery.receipt_id});`);
    // const query5 = await db.promise().query(`INSERT INTO history (history_id, history_user, history_cat, history_receipt) VALUES (NULL, 1, 3, ${hasilQuery.receipt_id});`);
    res.status(200).json("Top Up berhasil")
});

module.exports = router;