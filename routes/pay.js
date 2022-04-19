require('dotenv').config();

const { Router } = require('express');
const jwt = require('jsonwebtoken');
const db = require('../db');
const { authenticateToken } = require('../midelwer');
const router = Router();

router.post('/',authenticateToken,async(req, res) => {
    const {notelp,idbarang} = req.body
    let resuld = req.response;
    // logic sql start here tq

    // logic sql ends here
    res.status(200).json("tiket dengan id barang " + idbarang); // BELOM KELAR
});

module.exports = router;

