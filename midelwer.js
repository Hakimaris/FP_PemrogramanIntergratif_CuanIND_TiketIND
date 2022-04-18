// const { Router } = require('express');
const jwt = require('jsonwebtoken');
// const db = require('../db');
// const router = Router();

function authenticateToken(req, res, next) {
    const AuthHeader = req.headers["authorization"];
    const token = AuthHeader && AuthHeader.split(' ')[1];

    if (token == null) {
        return res.status(401).json("Bearer Token Not Found");
    }

    jwt.verify(token, process.env.sekrekkiy, (err, response) => {
        if (err) return res.status(401).json("Invalid Token");
        req.response = response;
        next();
    })
}

function authenticateHeader(req, res, next) {
    // console.log("saya sedih :<");
    const header = req.get("content-type");
    if (header !== "application/json") {
        return res.status(401).json("Invalid header type. must include application/json");
    }
    next();
}

module.exports ={authenticateToken/*,authenticateHeader*/};

