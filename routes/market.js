require('dotenv').config();

const { Router } = require('express');
const jwt = require('jsonwebtoken');
const db = require('../db');
const router = Router();
const rq = require('request')
const { authenticateToken } = require('../midelwer');

router.get('', authenticateToken, async (req, res) => {
    const query0 = await db.promise().query(`Select item_id as "id barang", item_name as benda,item_value as harga,item_stock as stok FROM item`);
    let hasilQuery0 = query0[0]
    res.status(200).json(hasilQuery0);
})

router.get('/:cari', authenticateToken, async (req, res) => {
    var cari = req.params.cari;
    // console.log(cari);
    const query0 = await db.promise().query(`Select item_id as "id barang" ,item_name as benda,item_value as harga,item_stock as stok FROM item where item_name like '%${cari}%'`);
    let hasilQuery0 = query0[0]
    res.status(200).json(hasilQuery0);
})





module.exports = router;