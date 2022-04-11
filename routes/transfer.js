require('dotenv').config();

const { Router } = require('express');
const jwt = require('jsonwebtoken');
const db = require('../db');
const router = Router();
const { authenticateToken, authenticateHeader } = require('../middleware');

router.post('/', [authenticateToken,authenticateHeader], async (req, res) => {
    const { amount, number } = req.body;
    console.log(number);
    const fromUser = await db.promise().query(`SELECT * FROM user WHERE user_id=${req.response.id} LIMIT 1`);
    const result1 = fromUser[0][0];
    const targetUser = await db.promise().query(`SELECT * FROM user WHERE user_number=? LIMIT 1`, [number]);
    const result2 = targetUser[0][0];

    res.status(200).json({ result1, result2});
});

module.exports = router;