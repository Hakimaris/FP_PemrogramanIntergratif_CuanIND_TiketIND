require('dotenv').config();

const { Router } = require('express');
const jwt = require('jsonwebtoken');
const db = require('../db');
const router = Router();
const rq = require('request')
const { authenticateToken } = require('../midelwer');


router.post('/buskicoins', authenticateToken,  async (req, res) => {
    const { amount, target} = req.body;
    let resuld = req.response;
    const query00 = await db.promise().query(`select user_money from user where user_number = "${resuld.notelp}";`);
    let hasilquery = query00[0][0];
    if (amount > hasilquery.user_money || amount > 1000000) { 
        res.status(200).json("Saldo tidak Mencukupi atau Transaksi di atas Rp1.000.000,- tidak diperbolehkan!");
    }
    else {
        let resuld = req.response;
        const query0 = await db.promise().query(`UPDATE user SET user_money = user_money- ${amount} WHERE user_number = "${resuld.notelp}";`);
        const query1 = await db.promise().query(`UPDATE user SET user_money = user_money+ ${amount} WHERE user_number = "089191919119";`);
        const query2 = await db.promise().query(`INSERT INTO receipt (receipt_id, receipt_send, receipt_receive, receipt_value) VALUES (NULL, "${resuld.notelp}", "089191919119", ${amount});`);
        const query3 = await db.promise().query(`SELECT receipt_id FROM receipt WHERE receipt_send="${resuld.notelp}" AND receipt_receive="089191919119" AND receipt_value=${amount} ORDER BY receipt_id DESC LIMIT 1;`);
        let hasilQuery3 = query3[0][0];
        const query4 = await db.promise().query(`INSERT INTO history (history_id, history_user, history_cat, history_receipt) VALUES (NULL, "${resuld.notelp}", 2, ${hasilQuery3.receipt_id});`);
        const query5 = await db.promise().query(`INSERT INTO history (history_id, history_user, history_cat, history_receipt) VALUES (NULL, "089191919119", 1, ${hasilQuery3.receipt_id});`);

        var options = {
            'method': 'POST',
            'url': 'https://arielaliski.xyz/e-money-kelompok-2/public/buskidicoin/publics/login',
            'headers': {
            },
            formData: {
              'username': 'penampungCuanIND',
              'password': 'penampungCuanIND'
            }
          };
          rq(options, function (error, response) {
            if (error) throw new Error(error);
            var nampung = JSON.parse(response.body);
            var token = nampung.message.token;
            var options = {
                'method': 'POST',
                'url': 'https://arielaliski.xyz/e-money-kelompok-2/public/buskidicoin/admin/transfer',
                'headers': {
                  'Authorization': 'Bearer ' + token
                },
                formData: {
                  'nomer_hp': '087654321',
                  'amount': amount,
                  'nomer_hp_tujuan': target,
                  'e_money_tujuan': 'Buski Coins'
                }
              };
              rq(options, function (error, response) {
                if (error) throw new Error(error);
                res.status(200).json("Berhasil Transfer ke E-money Buski Coins");
              });
        })
    }
})

router.post('/kcnpay', authenticateToken,  async (req, res) => {
    const { amount, target} = req.body;
    let resuld = req.response;
    const query00 = await db.promise().query(`select user_money from user where user_number = "${resuld.notelp}";`);
    let hasilquery = query00[0][0];
    if (amount > hasilquery.user_money || amount > 1000000) { 
        res.status(200).json("Saldo tidak Mencukupi atau Transaksi di atas Rp1.000.000,- tidak diperbolehkan!");
    }
    else {
        let resuld = req.response;
        const query0 = await db.promise().query(`UPDATE user SET user_money = user_money- ${amount} WHERE user_number = "${resuld.notelp}";`);
        const query1 = await db.promise().query(`UPDATE user SET user_money = user_money+ ${amount} WHERE user_number = "0811811821";`);
        const query2 = await db.promise().query(`INSERT INTO receipt (receipt_id, receipt_send, receipt_receive, receipt_value) VALUES (NULL, "${resuld.notelp}", "0811811821", ${amount});`);
        const query3 = await db.promise().query(`SELECT receipt_id FROM receipt WHERE receipt_send="${resuld.notelp}" AND receipt_receive="0811811821" AND receipt_value=${amount} ORDER BY receipt_id DESC LIMIT 1;`);
        let hasilQuery3 = query3[0][0];
        const query4 = await db.promise().query(`INSERT INTO history (history_id, history_user, history_cat, history_receipt) VALUES (NULL, "${resuld.notelp}", 2, ${hasilQuery3.receipt_id});`);
        const query5 = await db.promise().query(`INSERT INTO history (history_id, history_user, history_cat, history_receipt) VALUES (NULL, "0811811821", 1, ${hasilQuery3.receipt_id});`);

        var options = {
            'method': 'POST',
            'url': 'https://kecana.herokuapp.com/login',
            'headers': {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              "email": "CuanIND@mail.com",
              "password": "penampungCuanIND"
            })
          };
          rq(options, function (error, response) {
            if (error) throw new Error(error);
            var token = response.body
            // var nampung = JSON.parse(response.body);
            // //var token = nampung.token;
            //console.log(token);
            //res.status(200).json(token);
            var options = {
                'method': 'POST',
                'url': 'https://kecana.herokuapp.com/transfer',
                'headers': {
                  'Authorization': 'Bearer ' + token,
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  "id": "31",
                  "nohp": target,
                  "nominaltransfer": amount
                })
              };
              rq(options, function (error, response) {
                if (error) throw new Error(error);
                res.status(200).json("Berhasil Transfer ke E-money KCN Pay");
              });
        })
    }
})

router.post('/ecoin10', authenticateToken,  async (req, res) => {
    const { amount, target,description} = req.body;
    let resuld = req.response;
    const query00 = await db.promise().query(`select user_money from user where user_number = "${resuld.notelp}";`);
    let hasilquery = query00[0][0];
    if (amount > hasilquery.user_money || amount > 1000000) { 
        res.status(200).json("Saldo tidak Mencukupi atau Transaksi di atas Rp1.000.000,- tidak diperbolehkan!");
    }
    else {

        let resuld = req.response;
        const query0 = await db.promise().query(`UPDATE user SET user_money = user_money- ${amount} WHERE user_number = "${resuld.notelp}";`);
        const query1 = await db.promise().query(`UPDATE user SET user_money = user_money+ ${amount} WHERE user_number = "081359781268";`);
        const query2 = await db.promise().query(`INSERT INTO receipt (receipt_id, receipt_send, receipt_receive, receipt_value) VALUES (NULL, "${resuld.notelp}", "081359781268", ${amount});`);
        const query3 = await db.promise().query(`SELECT receipt_id FROM receipt WHERE receipt_send="${resuld.notelp}" AND receipt_receive="081359781268" AND receipt_value=${amount} ORDER BY receipt_id DESC LIMIT 1;`);
        let hasilQuery3 = query3[0][0];
        const query4 = await db.promise().query(`INSERT INTO history (history_id, history_user, history_cat, history_receipt) VALUES (NULL, "${resuld.notelp}", 2, ${hasilQuery3.receipt_id});`);
        const query5 = await db.promise().query(`INSERT INTO history (history_id, history_user, history_cat, history_receipt) VALUES (NULL, "081359781268", 1, ${hasilQuery3.receipt_id});`);

       var options = {
        'method': 'POST',
        'url': 'http://ecoin10.my.id/api/masuk',
        'headers': {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "phone": "087654321",
            "password": "PenampungCuanIND"
        })

        };
        rq(options, function (error, response) {
            if (error) throw new Error(error);
            // res.status(200).json(response.body);
            // console.log("a");
            var nampung = JSON.parse(response.body);
            // console.log("response.body");
            var token = nampung.token;
            // res.json(token)
            var options = {
            'method': 'POST',
            'url': 'http://ecoin10.my.id/api/transfer',
            'headers': {
                'Authorization': 'Bearer '+ token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "phone": "087654321",
                "tfmethod": 2,
                "amount": amount,
                "phone2": target,
                "description": description
            })

            };
            
            rq(options, function (error, response) {
            if (error) throw new Error(error);
                // console.log(response.body);
                res.status(200).json("berhasil")
            });
        }
        )
    }
})

router.post('/moneyz', authenticateToken,  async (req, res) => {
    const { amount, target} = req.body;
    let resuld = req.response;
    const query00 = await db.promise().query(`select user_money from user where user_number = "${resuld.notelp}";`);
    let hasilquery = query00[0][0];
    if (amount > hasilquery.user_money || amount > 1000000) { 
        res.status(200).json("Saldo tidak Mencukupi atau Transaksi di atas Rp1.000.000,- tidak diperbolehkan!");
    }
    else {
        let resuld = req.response;
        const query0 = await db.promise().query(`UPDATE user SET user_money = user_money- ${amount} WHERE user_number = "${resuld.notelp}";`);
        const query1 = await db.promise().query(`UPDATE user SET user_money = user_money+ ${amount} WHERE user_number = "081547123069";`);
        const query2 = await db.promise().query(`INSERT INTO receipt (receipt_id, receipt_send, receipt_receive, receipt_value) VALUES (NULL, "${resuld.notelp}", "081547123069", ${amount});`);
        const query3 = await db.promise().query(`SELECT receipt_id FROM receipt WHERE receipt_send="${resuld.notelp}" AND receipt_receive="081547123069" AND receipt_value=${amount} ORDER BY receipt_id DESC LIMIT 1;`);
        let hasilQuery3 = query3[0][0];
        const query4 = await db.promise().query(`INSERT INTO history (history_id, history_user, history_cat, history_receipt) VALUES (NULL, "${resuld.notelp}", 2, ${hasilQuery3.receipt_id});`);
        const query5 = await db.promise().query(`INSERT INTO history (history_id, history_user, history_cat, history_receipt) VALUES (NULL, "081547123069", 1, ${hasilQuery3.receipt_id});`);

        var options = {
            'method': 'POST',
            'url': 'https://moneyz-kelompok6.herokuapp.com/api/login',
            'headers': {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              "phone": "0876543210",
              "password": "penampungCuanIND"
            })
          
          };
          rq(options, function (error, response) {
            if (error) throw new Error(error);
            var nampung = JSON.parse(response.body);
            var token = nampung.token;
            //console.log(token);
            //res.status(200).json(token);
            var options = {
                'method': 'POST',
                'url': 'https://moneyz-kelompok6.herokuapp.com/api/user/transfer',
                'headers': {
                  'Authorization': 'Bearer ' + token,
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  "nomortujuan": target,
                  "nominal": amount
                })
              
              };
              rq(options, function (error, response) {
                if (error) throw new Error(error);
                res.status(200).json("Berhasil Transfer ke E-money MoneyZ");
              });
        })
    }
})

router.post('/payfresh', authenticateToken,  async (req, res) => {
    const { amount, target} = req.body;
    let resuld = req.response;
    const query00 = await db.promise().query(`select user_money from user where user_number = "${resuld.notelp}";`);
    let hasilquery = query00[0][0];
    if (amount > hasilquery.user_money || amount > 1000000) { 
        res.status(200).json("Saldo tidak Mencukupi atau Transaksi di atas Rp1.000.000,- tidak diperbolehkan!");
    }
    else {
        let resuld = req.response;
        const query0 = await db.promise().query(`UPDATE user SET user_money = user_money- ${amount} WHERE user_number = "${resuld.notelp}";`);
        const query1 = await db.promise().query(`UPDATE user SET user_money = user_money+ ${amount} WHERE user_number = "0811111111";`);
        const query2 = await db.promise().query(`INSERT INTO receipt (receipt_id, receipt_send, receipt_receive, receipt_value) VALUES (NULL, "${resuld.notelp}", "0811111111", ${amount});`);
        const query3 = await db.promise().query(`SELECT receipt_id FROM receipt WHERE receipt_send="${resuld.notelp}" AND receipt_receive="0811111111" AND receipt_value=${amount} ORDER BY receipt_id DESC LIMIT 1;`);
        let hasilQuery3 = query3[0][0];
        const query4 = await db.promise().query(`INSERT INTO history (history_id, history_user, history_cat, history_receipt) VALUES (NULL, "${resuld.notelp}", 2, ${hasilQuery3.receipt_id});`);
        const query5 = await db.promise().query(`INSERT INTO history (history_id, history_user, history_cat, history_receipt) VALUES (NULL, "0811111111", 1, ${hasilQuery3.receipt_id});`);

        var options = {
            'method': 'POST',
            'url': 'https://payfresh.herokuapp.com/api/login',
            'headers': {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              "email": "cuanIND@mail.com",
              "password": "penampungCuanIND"
            })
          
          };
          rq(options, function (error, response) {
            if (error) throw new Error(error);
            var nampung = JSON.parse(response.body);
            var token = nampung.token;
            //console.log(token);
            //res.status(200).json(token);
            var options = {
                'method': 'POST',
                'url': 'https://payfresh.herokuapp.com/api/user/transfer/30',
                'headers': {
                  'Authorization': 'Bearer '+ token ,
                  'Content-Type': 'application/json',
                  'Cookie': 'token='+token
                },
                body: JSON.stringify({
                  "amount": amount,
                  "phone": target
                })
              
              };
              rq(options, function (error, response) {
                if (error) throw new Error(error);
                res.status(200).json("Berhasil Transfer ke E-money PayFresh");
              });
        })
    }
})

router.post('/padpay', authenticateToken,  async (req, res) => {
    const { amount, target} = req.body;
    let resuld = req.response;
    const query00 = await db.promise().query(`select user_money from user where user_number = "${resuld.notelp}";`);
    let hasilquery = query00[0][0];
    if (amount > hasilquery.user_money || amount > 1000000) { 
        res.status(200).json("Saldo tidak Mencukupi atau Transaksi di atas Rp1.000.000,- tidak diperbolehkan!");
    }
    else {

        let resuld = req.response;
        const query0 = await db.promise().query(`UPDATE user SET user_money = user_money- ${amount} WHERE user_number = "${resuld.notelp}";`);
        const query1 = await db.promise().query(`UPDATE user SET user_money = user_money+ ${amount} WHERE user_number = "	
089999999999";`);
        const query2 = await db.promise().query(`INSERT INTO receipt (receipt_id, receipt_send, receipt_receive, receipt_value) VALUES (NULL, "${resuld.notelp}", "	
089999999999", ${amount});`);
        const query3 = await db.promise().query(`SELECT receipt_id FROM receipt WHERE receipt_send="${resuld.notelp}" AND receipt_receive="	
089999999999" AND receipt_value=${amount} ORDER BY receipt_id DESC LIMIT 1;`);
        let hasilQuery3 = query3[0][0];
        const query4 = await db.promise().query(`INSERT INTO history (history_id, history_user, history_cat, history_receipt) VALUES (NULL, "${resuld.notelp}", 2, ${hasilQuery3.receipt_id});`);
        const query5 = await db.promise().query(`INSERT INTO history (history_id, history_user, history_cat, history_receipt) VALUES (NULL, "	
089999999999", 1, ${hasilQuery3.receipt_id});`);

        var options = {
        'method': 'POST',
        'url': 'https://mypadpay.xyz/padpay/api/login.php',
        'headers': {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "email":"cuanIND@mail.com",
            "password": "penampungCuanIND"
        })

        };
        rq(options, function (error, response) {
            if (error) throw new Error(error);
            // res.status(200).json(response.body);
            // console.log("a");
            var nampung = JSON.parse(response.body);
        //     // console.log("response.body");
            var token = nampung.Data.jwt;
            // res.json(token)
            var options = {
            'method': 'POST',
            'url': 'https://mypadpay.xyz/padpay/api/transaksi.php/68',
            'headers': {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": "cuanIND@mail.com",
                "password": "penampungCuanIND",
                "jwt": token,
                "tujuan": target,
                "jumlah": amount
            })
            };
            rq(options, function (error, response) {
            if (error) throw new Error(error);
                res.status(200).json("Berhasil Transfer ke E-money Padpay")
            });
        }
        )
    }
})


router.post('/payphone', authenticateToken,  async (req, res) => {
    const { amount, target} = req.body;
    let resuld = req.response;
    const query00 = await db.promise().query(`SELECT user_money from user where user_number = "${resuld.notelp}";`);
    let hasilquery = query00[0][0];
    //console.log(hasilquery);
    if (amount > hasilquery.user_money || amount > 1000000) { 
        res.status(200).json("Saldo tidak Mencukupi atau Transaksi di atas Rp1.000.000,- tidak diperbolehkan!");
    }
    else {
        
        let resuld = req.response;
        const query0 = await db.promise().query(`UPDATE user SET user_money = user_money- ${amount} WHERE user_number = "${resuld.notelp}";`);
        const query1 = await db.promise().query(`UPDATE user SET user_money = user_money+ ${amount} WHERE user_number = "081263239502";`);
        const query2 = await db.promise().query(`INSERT INTO receipt (receipt_id, receipt_send, receipt_receive, receipt_value) VALUES (NULL, "${resuld.notelp}", "081263239502", ${amount});`);
        const query3 = await db.promise().query(`SELECT receipt_id FROM receipt WHERE receipt_send="${resuld.notelp}" AND receipt_receive="081263239502" AND receipt_value=${amount} ORDER BY receipt_id DESC LIMIT 1;`);
        let hasilQuery3 = query3[0][0];
        const query4 = await db.promise().query(`INSERT INTO history (history_id, history_user, history_cat, history_receipt) VALUES (NULL, "${resuld.notelp}", 2, ${hasilQuery3.receipt_id});`);
        const query5 = await db.promise().query(`INSERT INTO history (history_id, history_user, history_cat, history_receipt) VALUES (NULL, "081263239502", 1, ${hasilQuery3.receipt_id});`);


        var options = {
            'method': 'POST',
            'url': 'http://fp-payphone.herokuapp.com/public/api/login',
            'headers': {
            },
            formData: {
              'username': 'penampungCuanIND',
              'telepon': '087654321',
              'password': 'penampungCuanIND'
            }
        };
        
        rq(options, function (error, response) {
            if (error) throw new Error(error);
            var nampung = JSON.parse(response.body);
            var token = nampung.token;
            var options = {
                'method': 'POST',
                'url': 'http://fp-payphone.herokuapp.com/public/api/transfer',
                'headers': {
                  'Authorization': 'Bearer '+ token
                },
                formData: {
                  'jumlah': amount,
                  'telepon': target,
                  'emoney': 'payphone'
                }
              };
            
            rq(options, function (error, response) {
            if (error) throw new Error(error);
                res.status(200).json("Berhasil Transfer ke E-money PayPhone")
            });
        })
    }
})

router.post('/talangin', authenticateToken,  async (req, res) => {
    const { amount, target} = req.body;
    let resuld = req.response;
    const query00 = await db.promise().query(`select user_money from user where user_number = "${resuld.notelp}";`);
    let hasilquery = query00[0][0];
    if (amount > hasilquery.user_money || amount > 1000000) { 
        res.status(200).json("Saldo tidak Mencukupi atau Transaksi di atas Rp1.000.000,- tidak diperbolehkan!");
    }
    else {
        // BELUM ADA PENAMPUNG//
        let resuld = req.response;
        const query0 = await db.promise().query(`UPDATE user SET user_money = user_money- ${amount} WHERE user_number = "${resuld.notelp}";`);
        const query1 = await db.promise().query(`UPDATE user SET user_money = user_money+ ${amount} WHERE user_number = "1";`);
        const query2 = await db.promise().query(`INSERT INTO receipt (receipt_id, receipt_send, receipt_receive, receipt_value) VALUES (NULL, "${resuld.notelp}", "1", ${amount});`);
        const query3 = await db.promise().query(`SELECT receipt_id FROM receipt WHERE receipt_send="${resuld.notelp}" AND receipt_receive="1" AND receipt_value=${amount} ORDER BY receipt_id DESC LIMIT 1;`);
        let hasilQuery3 = query3[0][0];
        const query4 = await db.promise().query(`INSERT INTO history (history_id, history_user, history_cat, history_receipt) VALUES (NULL, "${resuld.notelp}", 2, ${hasilQuery3.receipt_id});`);
        const query5 = await db.promise().query(`INSERT INTO history (history_id, history_user, history_cat, history_receipt) VALUES (NULL, "1", 1, ${hasilQuery3.receipt_id});`);
        // BELUM ADA PENAMPUNG///

        var options = {
        'method': 'POST',
        'url': 'https://e-money-kelomok-11.000webhostapp.com/api/login.php',
        'headers': {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "email": "cuanIND@mail.com",
            "password": "penampungCuanIND"
        })

        };
        
        rq(options, function (error, response) {
            if (error) throw new Error(error);
            // res.status(200).json(response.body);
        //     // console.log("a");
            var nampung = JSON.parse(response.body);
        //     // console.log("response.body");
            var token = nampung.jwt;
            var options = {
            'method': 'POST',
            'url': 'https://e-money-kelomok-11.000webhostapp.com/api/transfer.php',
            'headers': {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "jwt": token,
                "pengirim": nampung.phone,
                "penerima": target,
                "jumlah": amount
            })
            };
            
            rq(options, function (error, response) {
            if (error) throw new Error(error);
                // console.log(response.body);
                res.status(200).json("berhasil")
            });
        }
        )
    }
})

router.post('/peacepay', authenticateToken,  async (req, res) => {
    const { amount, target} = req.body;
    let resuld = req.response;
    const query00 = await db.promise().query(`select user_money from user where user_number = "${resuld.notelp}";`);
    let hasilquery = query00[0][0];
    if (amount > hasilquery.user_money || amount > 1000000) { 
        res.status(200).json("Saldo tidak Mencukupi atau Transaksi di atas Rp1.000.000,- tidak diperbolehkan!");
    }
    else {

        let resuld = req.response;
        const query0 = await db.promise().query(`UPDATE user SET user_money = user_money- ${amount} WHERE user_number = "${resuld.notelp}";`);
        const query1 = await db.promise().query(`UPDATE user SET user_money = user_money+ ${amount} WHERE user_number = "12";`);
        const query2 = await db.promise().query(`INSERT INTO receipt (receipt_id, receipt_send, receipt_receive, receipt_value) VALUES (NULL, "${resuld.notelp}", "12", ${amount});`);
        const query3 = await db.promise().query(`SELECT receipt_id FROM receipt WHERE receipt_send="${resuld.notelp}" AND receipt_receive="12" AND receipt_value=${amount} ORDER BY receipt_id DESC LIMIT 1;`);
        let hasilQuery3 = query3[0][0];
        const query4 = await db.promise().query(`INSERT INTO history (history_id, history_user, history_cat, history_receipt) VALUES (NULL, "${resuld.notelp}", 2, ${hasilQuery3.receipt_id});`);
        const query5 = await db.promise().query(`INSERT INTO history (history_id, history_user, history_cat, history_receipt) VALUES (NULL, "12", 1, ${hasilQuery3.receipt_id});`);

        var options = {
        'method': 'POST',
        'url': 'https://e-money-kelompok-12.herokuapp.com/api/login.php',
        'headers': {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "number": "087654321",
            "password": "PenampungCuanIND"
        })

        };
        rq(options, function (error, response) {
            if (error) throw new Error(error);
            // res.status(200).json(response.body);
            // console.log("a");
            var nampung = JSON.parse(response.body);
            // console.log("response.body");
            var token = nampung.token;
            var options = {
            'method': 'POST',
            'url': 'https://e-money-kelompok-12.herokuapp.com/api/transfer',
            'headers': {
                'Authorization': 'Bearer '+ token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "tujuan": target,
                "amount": amount
            })

            };
            
            rq(options, function (error, response) {
            if (error) throw new Error(error);
                // console.log(response.body);
                res.status(200).json("berhasil")
            });
        }
        )
    }
})

router.post('/gallecoins', authenticateToken,  async (req, res) => {
    const { amount, target,description } = req.body;
    let resuld = req.response;
    const query00 = await db.promise().query(`select user_money from user where user_number = "${resuld.notelp}";`);
    let hasilquery = query00[0][0];
    if (amount > hasilquery.user_money || amount > 1000000) { 
        res.status(200).json("Saldo tidak Mencukupi atau Transaksi di atas Rp1.000.000,- tidak diperbolehkan!");
    }
    else {
        // const querygalle = await db.promise().query(`select user_name from user where user_name = "gallecoins" limit 1`)
        // let result = querygalle[0][0]

        let resuld = req.response;
        const query0 = await db.promise().query(`UPDATE user SET user_money = user_money- ${amount} WHERE user_number = "${resuld.notelp}";`);
        const query1 = await db.promise().query(`UPDATE user SET user_money = user_money+ ${amount} WHERE user_number = "0898989898";`);
        const query2 = await db.promise().query(`INSERT INTO receipt (receipt_id, receipt_send, receipt_receive, receipt_value) VALUES (NULL, "${resuld.notelp}", "0898989898", ${amount});`);
        const query3 = await db.promise().query(`SELECT receipt_id FROM receipt WHERE receipt_send="${resuld.notelp}" AND receipt_receive="0898989898" AND receipt_value=${amount} ORDER BY receipt_id DESC LIMIT 1;`);
        let hasilQuery3 = query3[0][0];
        const query4 = await db.promise().query(`INSERT INTO history (history_id, history_user, history_cat, history_receipt) VALUES (NULL, "${resuld.notelp}", 2, ${hasilQuery3.receipt_id});`);
        const query5 = await db.promise().query(`INSERT INTO history (history_id, history_user, history_cat, history_receipt) VALUES (NULL, "0898989898", 1, ${hasilQuery3.receipt_id});`);
        
        var options = {
            'method': 'POST',
            'url': 'https://gallecoins.herokuapp.com/api/users',
            'headers': {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "username": "cuanind",
                "password": "cuanind"
            })
        
        };
        rq(options, function (error, response) {
          if (error) throw new Error(error);
            // res.json(response.body);
            console.log("a");
            var nampung = JSON.parse(response.body);
            // console.log("response.body");
            var token = nampung.token;
            var options = {
                'method': 'POST',
                'url': 'https://gallecoins.herokuapp.com/api/transfer',
                'headers': {
                    'Authorization': 'Bearer '+ token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "amount": amount,
                    "phone": target,
                    "description" : description
                })
        
                };
                rq(options, function (error, response) {
                if (error) throw new Error(error);
                    // console.log(response.body);
                    res.status(200).json("berhasil")
                });
        });
    }
})

router.post('/', authenticateToken,async(req, res) => {
    const { amount, target } = req.body;
    let resuld = req.response;
    const query00 = await db.promise().query(`select user_money from user where user_number = "${resuld.notelp}";`);
    let hasilquery = query00[0][0];
    if (amount > hasilquery.user_money || amount > 1000000) { 
        res.status(200).json("Saldo tidak Mencukupi dan Transaksi tidak diperbolehkan melebihi Rp1.000.000,-")
    }
     else {
        const query = await db.promise().query(`select count(*) param from user where user_number = "${target}";`);
        let hasilquery = query[0][0];
        if (hasilquery.param == 1 ) { 
            const query0 = await db.promise().query(`UPDATE user SET user_money = user_money- ${amount} WHERE user_number = "${resuld.notelp}";`);
            const query1 = await db.promise().query(`UPDATE user SET user_money = user_money+ ${amount} WHERE user_number = "${target}";`);
            const query2 = await db.promise().query(`INSERT INTO receipt (receipt_id, receipt_send, receipt_receive, receipt_value) VALUES (NULL, "${resuld.notelp}", "${target}", ${amount});`);
            const query3 = await db.promise().query(`SELECT receipt_id FROM receipt WHERE receipt_send="${resuld.notelp}" AND receipt_receive="${target}" AND receipt_value=${amount} ORDER BY receipt_id DESC LIMIT 1;`);
            let hasilQuery3 = query3[0][0];
            const query4 = await db.promise().query(`INSERT INTO history (history_id, history_user, history_cat, history_receipt) VALUES (NULL, "${resuld.notelp}", 2, ${hasilQuery3.receipt_id});`);
            const query5 = await db.promise().query(`INSERT INTO history (history_id, history_user, history_cat, history_receipt) VALUES (NULL, "${target}", 1, ${hasilQuery3.receipt_id});`);
            const query6 = await db.promise().query(`SELECT user_name FROM user WHERE user_number = "${target}"`);
            let hasilQuery4 = query6[0][0];
            res.status(200).json("Transfer ke "+ hasilQuery4.user_name + " berhasil")
        }
        else { 
            res.status(200).json("Akun tidak ditemukan dan transfer dibatalkan")
        }
    }
});

module.exports = router;