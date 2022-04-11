require('dotenv').config();

const { Router } = require('express');
const jwt = require('jsonwebtoken');
const db = require('../db');
const router = Router();
const { authenticateToken, authenticateHeader } = require('../middleware');

router.post('/', [authenticateToken,authenticateHeader], async (req, res) => {
    // res.send("eek")
    const { amount, username } = req.body;
});

module.exports = router;