const { Router } = require('express');
const jwt = require('jsonwebtoken');
const db = require('../db');
const router = Router();

router.post('/topup', (req, res) => {
    res.send("sudah topup")
});

module.exports = router;