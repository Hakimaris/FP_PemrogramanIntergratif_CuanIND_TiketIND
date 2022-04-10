const { Router } = require('express');
const jwt = require('jsonwebtoken');
const db = require('../db');
const router = Router();

function authenticateToken(req, res, next) {
    const AuthHeader = req.headers["authorization"]
}

function ValidateToken(req, res, next) {
    // const ValidateToken
    console.log("saya sedih :<")
}

router.post('/tp', (req, res) => {
    res.send("sudah ingin transfer")
});

module.exports = router;