require('dotenv').config();

const { Router } = require('express');
const jwt = require('jsonwebtoken');
const db = require('../db');
const router = Router();

router.post('/',(req, res) => {
    const {barang,kuantitas,token} = req.body
    res.send("sudah topup")
});

module.exports = router;

