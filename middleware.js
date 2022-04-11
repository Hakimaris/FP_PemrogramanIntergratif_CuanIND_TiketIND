const { Router } = require('express');
const jwt = require('jsonwebtoken');
const db = require('../db');
const router = Router();

function authenticateToken(req, res, next) {
    const AuthHeader = req.headers["authorization"];
}

function ValidateToken(req, res, next) {
    // const ValidateToken
    console.log("saya sedih :<");
}

// const checkUser(req, res, next) => {
//     const token = req.cookies.jwt;
//     if (token) {
//         jwt.verify(token, 'namaTokennyaApa?', async(err, decodedToken) => {
//             if (err) {
//                 console.log(err.message);
//                 res.local.user = null;
//                 next();
//             } else {
//                 console.log(decodedToken);
//                 let user = await User.findById(decodedToken.id);
//                 res.local.user = user;
//                 next();
//             }
//         })
//     }
//     else {
//         res.local.user = null;
//         next();
//     }
// }

router.post('/tp', (req, res) => {
    res.send("sudah ingin transfer")
});

module.exports = router;
// module.exports = {requireAuth, checkUser}