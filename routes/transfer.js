require('dotenv').config();

const { Router } = require('express');
const jwt = require('jsonwebtoken');
const db = require('../db');
const router = Router();
const { authenticateToken } = require('../midelwer');

router.post('/', authenticateToken,async(req, res) => {
    const { amount, target } = req.body;
    let resuld = req.response;

    const query0 = await db.promise().query(`UPDATE user SET user_money = user_money- ${amount} WHERE user_number = ${resuld.notelp};`);
    const query1 = await db.promise().query(`UPDATE user SET user_money = user_money+ ${amount} WHERE user_number = ${target};`);
    const query2 = await db.promise().query(`INSERT INTO receipt (receipt_id, receipt_send, receipt_receive, receipt_value) VALUES (NULL, ${resuld.notelp}, ${target}, ${amount});`);
    const query3 = await db.promise().query(`SELECT receipt_id FROM receipt WHERE receipt_send=${resuld.notelp} AND receipt_receive=${target} AND receipt_value=${amount} ORDER BY receipt_id DESC LIMIT 1;`);
    let hasilQuery3 = query3[0][0];
    const query4 = await db.promise().query(`INSERT INTO history (history_id, history_user, history_cat, history_receipt) VALUES (NULL, ${resuld.notelp}, 2, ${hasilQuery3.receipt_id});`);
    const query5 = await db.promise().query(`INSERT INTO history (history_id, history_user, history_cat, history_receipt) VALUES (NULL, ${target}, 1, ${hasilQuery3.receipt_id});`);
    res.status(200).json("Transfer berhasil")
});

module.exports = router;