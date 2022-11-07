require('dotenv').config();

const { Router } = require('express');
const jwt = require('jsonwebtoken');
const db = require('../db');
const { authenticateToken } = require('../midelwer');
const router = Router();

router.post('/login',async (req, res) => {
    const { notelp, password } = req.body;
    const queryresult = await db.promise().query(`select * from market_user where market_user_number='${notelp}' && market_password='${password}' limit 1`);
    const apaya = queryresult[0][0];
    // console.log(apaya);
    if (apaya == undefined) {
        res.status(400).json("Gagal login")
    }
    else {
        const isitoken = {
            nama: apaya.market_username,
            notelp: apaya.market_user_number
        }
        const token = jwt.sign(isitoken, process.env.sekrekkiy, { expiresIn: '24h' })
        res.status(200).send(token);
    }
});

router.post('/register', async (req, res) => {
    const { username, password, notelp, email } = req.body;
    const queryresult1 = await db.promise().query(`select count(*) param from user where user_number = "${notelp}" or user_email = "${email}"`);
    let hasilquery = queryresult1[0][0];
    const queryresult2 = await db.promise().query(`select count(*) param from market_user where market_username='${username}' or market_user_number='${notelp}' `);
    let hasilquery2 = queryresult2[0][0];
    // console.log(hasilquery.param);
    if (hasilquery.param == 0 && hasilquery2.param == 0) { 
        // console.log("haha")
        const queryresult1 = await db.promise().query(`INSERT INTO market_user (market_user_number, market_username, market_password) VALUES ("${notelp}", "${username}", "${password}");`);
        const queryresult2 = await db.promise().query(`INSERT INTO user (user_number, user_name, user_password, user_email) VALUES ("${notelp}", "${username}", "${password}", "${email}");`);
        res.status(200).json("Akun telah dibuat, selamat datang di TiketIND");
    }
    else {
        res.status(400).json("Nama Pengguna, Email, dan Nomor Telepon sudah dipakai, apabila sudah memiliki akun di TiketIND, secara otomatis akan terdaftar dalam CuanIND :)\nJika ingin memulai menjual - setelah memiliki akun di CuanIND, bisa melalui endpoint TiketIND/profile/startselling (post: username dan password) [Soon] setelah melakukan login dari CuanIND")
    }
})

router.post('/startselling', authenticateToken, async (req, res) => {
    const {username, password} = req.body;
    const queryresult2 = await db.promise().query(`select count(*) param from market_user where market_username='${username}' or market_user_number='${resuld.notelp}' `);
    let hasilquery2 = queryresult2[0][0];
    // console.log(hasilquery.param);
    if (hasilquery2.param == 0) { 
        // console.log("haha")
        const queryresult1 = await db.promise().query(`INSERT INTO market_user (market_user_number, market_username, market_password) VALUES ("${resuld.notelp}", "${username}", "${password}");`);
        res.status(200).json("Akun di TiketIND telah dibuat, selamat datang di TiketIND!");
    }
    else {
        res.status(400).json("Nama Pengguna sudah dipakai")
    }
})

router.post('/dagangan', authenticateToken, async (req, res) => {
    const { namaBarang, harga, stok, kategoribarang } = req.body;
    const isiJWT = req.response;
    const query = await db.promise().query(`INSERT INTO item (item_cat,item_name,item_value,item_stock,item_user) VALUES (${kategoribarang}, "${namaBarang}", ${harga}, ${stok},"${isiJWT.notelp}")`)//logic buat masukin barang baru pls helb
    // if (err) throw err; 
    res.status(200).json("Tiket telah ditambahkan")
    // BELOM DI TES
})

router.get('/cektiket', authenticateToken, async (req, res) => {
    var darijwt = req.response;
    const query0 = await db.promise().query(`SELECT ticket_unique, item_name, pesan_date from ticket,pesan, item where ticket.ticket_pesan = pesan.pesan_id and pesan_buyer = '${darijwt.notelp}' and pesan_item = item_id`)
    res.status(200).json(query0[0])
})

router.get('/dagangan', authenticateToken, async (req, res) => {
    // const { namaBarang, harga, stok, kategoribarang } = req.body;
    const isiJWT = req.response;
    const query = await db.promise().query(`Select item_id as "id barang" ,item_name as benda,item_value as harga,item_stock as stok FROM item where item_user = "${isiJWT.notelp}"`)
    if (query[0]==null) res.status(203).json("belum ada barang yang dijual"); 
    else res.status(200).json(query[0])
    // BELOM DI TES
})

module.exports = router;