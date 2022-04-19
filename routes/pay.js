require('dotenv').config();

const { Router } = require('express');
const jwt = require('jsonwebtoken');
const db = require('../db');
const { authenticateToken } = require('../midelwer');
const router = Router();

router.post('/',authenticateToken,async(req, res) => {
    const {idbarang,jumlah} = req.body
    let resuld = req.response;
    const query1 = await db.promise().query(`UPDATE item SET item_stock = item_stock-${jumlah} WHERE item_id = ${idbarang};`);
    const query2 = await db.promise().query(`SELECT item_value, item_name FROM item WHERE item_id=${idbarang} LIMIT 1;`);
    let hasilQuery = query2[0][0];
    const query = await db.promise().query(`UPDATE user SET user_money = user_money-${jumlah}*${hasilQuery.item_value} WHERE user_number = ${resuld.notelp};`)
    const query3 = await db.promise().query(`INSERT INTO receipt (receipt_id, receipt_send, receipt_item, receipt_qty, receipt_value, receipt_dec) VALUES (NULL, ${resuld.notelp}, ${idbarang}, ${jumlah}, ${jumlah}*${hasilQuery.item_value}, 'Pembelian ${jumlah} ${hasilQuery.item_name}');`);
    const query4 = await db.promise().query(`SELECT receipt_id FROM receipt WHERE receipt_send=${resuld.notelp} AND receipt_value=${jumlah}*${hasilQuery.item_value} ORDER BY receipt_id DESC LIMIT 1;`);
    let hasilQuery2 = query4[0][0];
    const query5 = await db.promise().query(`INSERT INTO history (history_id, history_user, history_cat, history_receipt) VALUES (NULL, ${resuld.notelp}, 4, ${hasilQuery2.receipt_id});`);
    res.status(200).json(hasilQuery.item_name + " sejumlah " + jumlah + " buah berhasil dibeli."); // BELOM KELAR
});


module.exports = router;

