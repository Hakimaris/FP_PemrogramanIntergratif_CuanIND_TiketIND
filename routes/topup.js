const { Router } = require('express');
const jwt = require('jsonwebtoken');
const db = require('../db');
const router = Router();

router.post('/', async(req, res) => {
    // res.send("sudah topup")
    const { duid, token } = req.body;
    let userid;
    jwt.verify(token, 'buatdebug', (err, response) => {
        console.log(response);
        if (err) {
            return res.status(408).send("salah token");
        }
        userid = response;
    })
    const query1 = await db.promise().query(`UPDATE user SET user_money = user_money+ ${duid} WHERE user_id = ${userid.id};`);
    const query2 = await db.promise().query(`INSERT INTO item (item_id, item_name, item_value, item_stock, item_actor) VALUES (NULL, 'Top Up', ${duid}, '1', ${userid.id});`);
    const query3 = await db.promise().query(`SELECT item_id FROM item WHERE item_actor=${userid.id} AND item_value=${duid} ORDER BY item_id DESC LIMIT 1;`);
    let hasilQuery = query3[0][0];
    const query4 = await db.promise().query(`INSERT INTO history (history_id, history_user, history_item, history_quantity) VALUES (NULL, ${userid.id}, ${hasilQuery.item_id}, 1);`);
    res.status(200).send("Top Up berhasil")
});

module.exports = router;