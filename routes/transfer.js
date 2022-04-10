const { Router } = require('express');
const jwt = require('jsonwebtoken');
const db = require('../db');
const router = Router();

router.post('/tp', (req, res) => {
    res.send("sudah ingin transfer")
});

module.exports = router;