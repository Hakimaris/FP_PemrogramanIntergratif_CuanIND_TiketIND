require('dotenv').config();

const { Router } = require('express');
const jwt = require('jsonwebtoken');
const db = require('../db');
const router = Router();

router.post('/', (req, res) => {
    res.send("sudah topup")
});

// router.post('/', (req, res) => {
//     res.send("sudah topup")
// });

module.exports = router;

