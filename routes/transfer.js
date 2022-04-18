require('dotenv').config();

const { Router } = require('express');
const jwt = require('jsonwebtoken');
const db = require('../db');
const router = Router();
const { authenticateToken, authenticateHeader } = require('../midelwer');

router.post('/', async(req, res) => {
    const { amount, token, target } = req.body;
    let userid;
    jwt.verify(token, process.env.sekrekkiy, (err, response) => {
        if (err) {
            return res.status(408).send("Salah token");
        }
        userid = response;
    })
    //BELUM SELESAI
    const query0 = await db.promise().query(`UPDATE user SET user_money = user_money- ${amount} WHERE user_number = ${userid.id};`);
    const query1 = await db.promise().query(`UPDATE user SET user_money = user_money+ ${amount} WHERE user_number = ${target};`);
    const query2 = await db.promise().query(`SELECT user_id FROM user WHERE user_number = ${target};`);
    let hasilQuery1 = query2[0][0];
    const query3 = await db.promise().query(`INSERT INTO item (item_id, item_name, item_value, item_stock, item_actor) VALUES (NULL, 'Transfer', ${amount}, '1', ${hasilQuery1.user_id});`);
    const query4 = await db.promise().query(`SELECT item_id FROM item WHERE item_actor=${hasilQuery1.user_id} AND item_value=${amount} ORDER BY item_id DESC LIMIT 1;`);
    let hasilQuery2 = query4[0][0];
    const query5 = await db.promise().query(`INSERT INTO history (history_id, history_user, history_item, history_quantity) VALUES (NULL, ${userid.id}, ${hasilQuery2.item_id}, 1);`);
    res.status(200).send("Transfer berhasil")
});

module.exports = router;