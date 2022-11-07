require('dotenv').config();

const { Router } = require('express');
const jwt = require('jsonwebtoken');
const db = require('../db');
const { authenticateToken } = require('../midelwer');
const rq = require('request')
const router = Router();

router.post('/payfresh',authenticateToken,async(req, res) => {
  const {idbarang, jumlah, email_payfresh, password_payfresh} = req.body
  let resuld = req.response;
  const query1 = await db.promise().query(`UPDATE item SET item_stock = item_stock-${jumlah} WHERE item_id = ${idbarang};`);
  const query2 = await db.promise().query(`SELECT item_value, item_name, item_user FROM item WHERE item_id=${idbarang} LIMIT 1;`);
  let hasilQuery = query2[0][0];
  const query3 = await db.promise().query(`INSERT INTO receipt (receipt_id, receipt_send, receipt_receive, receipt_item, receipt_qty, receipt_value, receipt_dec) VALUES (NULL, "${resuld.notelp}", "${hasilQuery.item_user}", ${idbarang}, ${jumlah}, ${jumlah}*${hasilQuery.item_value}, 'Pembelian ${jumlah} ${hasilQuery.item_name}');`);
  const query4 = await db.promise().query(`UPDATE user SET user_money = user_money- (${jumlah}*${hasilQuery.item_value}) WHERE user_number = "1";`);
  const query5 = await db.promise().query(`UPDATE user SET user_money = user_money+ (${jumlah}*${hasilQuery.item_value}) WHERE user_number = "${hasilQuery.item_user}";`);
  const query6 = await db.promise().query(`SELECT receipt_id FROM receipt WHERE receipt_send="${resuld.notelp}" AND receipt_receive="${hasilQuery.item_user}" AND receipt_value=${jumlah}*${hasilQuery.item_value} ORDER BY receipt_id DESC LIMIT 1;`);
  let hasilQuery6 = query6[0][0];
  const query7 = await db.promise().query(`INSERT INTO pesan (pesan_id, pesan_item, pesan_number, pesan_buyer) VALUES (NULL, ${idbarang}, ${jumlah}, "${resuld.notelp}");`);
  const query8 = await db.promise().query(`SELECT pesan_id FROM pesan WHERE pesan_item = ${idbarang} AND pesan_number=${jumlah} AND pesan_buyer="${resuld.notelp}" ORDER BY pesan_id DESC LIMIT 1;`);
  let hasilQuery8 = query8[0][0];
  const query9 = await db.promise().query(`INSERT INTO ticket (ticket_id, ticket_unique, ticket_pesan) VALUES (NULL, SUBSTRING(MD5(RAND()) FROM 1 FOR 15), ${hasilQuery8.pesan_id});`);
  const query10 = await db.promise().query(`INSERT INTO history (history_id, history_user, history_cat, history_receipt) VALUES (NULL, "${resuld.notelp}", 4, ${hasilQuery6.receipt_id});`);
  const query11 = await db.promise().query(`INSERT INTO history (history_id, history_user, history_cat, history_receipt) VALUES (NULL, "${hasilQuery.item_user}", 6, ${hasilQuery6.receipt_id});`);

  var value = jumlah*hasilQuery.item_value
  var options = {
    'method': 'POST',
    'url': 'https://payfresh.herokuapp.com/api/login',
    'headers': {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "email": email_payfresh,
      "password": password_payfresh
    })
  };
    rq(options, function (error, response) {
      if (error) throw new Error(error);
      var nampung = JSON.parse(response.body)
      var token = nampung.token
      var options = {
        'method': 'POST',
        'url': 'https://payfresh.herokuapp.com/api/user/transfer',
        'headers': {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "amount": value,
          "phone": "087654321"
        })
      
      };
        rq(options, function (error, response) {
          if (error) throw new Error(error);
          res.status(200).json(hasilQuery.item_name + " sejumlah " + jumlah + " buah berhasil dibeli.");
          });
    });
});

router.post('/payphone',authenticateToken,async(req, res) => {
  const {idbarang, jumlah, notelp_payphone, password_payphone} = req.body
  let resuld = req.response;
  const query1 = await db.promise().query(`UPDATE item SET item_stock = item_stock-${jumlah} WHERE item_id = ${idbarang};`);
  const query2 = await db.promise().query(`SELECT item_value, item_name, item_user FROM item WHERE item_id=${idbarang} LIMIT 1;`);
  let hasilQuery = query2[0][0];
  const query3 = await db.promise().query(`INSERT INTO receipt (receipt_id, receipt_send, receipt_receive, receipt_item, receipt_qty, receipt_value, receipt_dec) VALUES (NULL, "${resuld.notelp}", "${hasilQuery.item_user}", ${idbarang}, ${jumlah}, ${jumlah}*${hasilQuery.item_value}, 'Pembelian ${jumlah} ${hasilQuery.item_name}');`);
  const query4 = await db.promise().query(`UPDATE user SET user_money = user_money- (${jumlah}*${hasilQuery.item_value}) WHERE user_number = "1";`);
  const query5 = await db.promise().query(`UPDATE user SET user_money = user_money+ (${jumlah}*${hasilQuery.item_value}) WHERE user_number = "${hasilQuery.item_user}";`);
  const query6 = await db.promise().query(`SELECT receipt_id FROM receipt WHERE receipt_send="${resuld.notelp}" AND receipt_receive="${hasilQuery.item_user}" AND receipt_value=${jumlah}*${hasilQuery.item_value} ORDER BY receipt_id DESC LIMIT 1;`);
  let hasilQuery6 = query6[0][0];
  const query7 = await db.promise().query(`INSERT INTO pesan (pesan_id, pesan_item, pesan_number, pesan_buyer) VALUES (NULL, ${idbarang}, ${jumlah}, "${resuld.notelp}");`);
  const query8 = await db.promise().query(`SELECT pesan_id FROM pesan WHERE pesan_item = ${idbarang} AND pesan_number=${jumlah} AND pesan_buyer="${resuld.notelp}" ORDER BY pesan_id DESC LIMIT 1;`);
  let hasilQuery8 = query8[0][0];
  const query9 = await db.promise().query(`INSERT INTO ticket (ticket_id, ticket_unique, ticket_pesan) VALUES (NULL, SUBSTRING(MD5(RAND()) FROM 1 FOR 15), ${hasilQuery8.pesan_id});`);
  const query10 = await db.promise().query(`INSERT INTO history (history_id, history_user, history_cat, history_receipt) VALUES (NULL, "${resuld.notelp}", 4, ${hasilQuery6.receipt_id});`);
  const query11 = await db.promise().query(`INSERT INTO history (history_id, history_user, history_cat, history_receipt) VALUES (NULL, "${hasilQuery.item_user}", 6, ${hasilQuery6.receipt_id});`);

  var value = jumlah*hasilQuery.item_value
  var options = {
    'method': 'POST',
    'url': 'http://fp-payphone.herokuapp.com/public/api/login',
    'headers': {
    },
    formData: {
      'telepon': notelp_payphone,
      'password': password_payphone
    }
  };
    rq(options, function (error, response) {
      if (error) throw new Error(error);
      var nampung = JSON.parse(response.body)
      var token = nampung.token
      var options = {
        'method': 'POST',
        'url': 'http://fp-payphone.herokuapp.com/public/api/transfer',
        'headers': {
          'Authorization': 'Bearer ' + token
        },
        formData: {
          'telepon': '087654321',
          'jumlah': value,
          'emoney': 'payphone'
        }
      };
        rq(options, function (error, response) {
          if (error) throw new Error(error);
          res.status(200).json(hasilQuery.item_name + " sejumlah " + jumlah + " buah berhasil dibeli.");
          });
    });
});

router.post('/',authenticateToken,async(req, res) => {
    const {idbarang,jumlah} = req.body
    let resuld = req.response;
    const query1 = await db.promise().query(`UPDATE item SET item_stock = item_stock-${jumlah} WHERE item_id = ${idbarang};`);
    const query2 = await db.promise().query(`SELECT item_value, item_name FROM item WHERE item_id=${idbarang} LIMIT 1;`);
    let hasilQuery = query2[0][0];
    const query = await db.promise().query(`UPDATE user SET user_money = user_money-${jumlah}*${hasilQuery.item_value} WHERE user_number = ${resuld.notelp};`)
    const query3 = await db.promise().query(`INSERT INTO receipt (receipt_id, receipt_send, receipt_item, receipt_qty, receipt_value, receipt_dec) VALUES (NULL, ${resuld.notelp}, ${idbarang}, ${jumlah}, ${jumlah}*${hasilQuery.item_value}, 'Pembelian ${jumlah} ${hasilQuery.item_name}');`);
    const query4 = await db.promise().query(`SELECT receipt_id FROM receipt WHERE receipt_send=${resuld.notelp} AND receipt_value=${jumlah}*${hasilQuery.item_value} ORDER BY receipt_id DESC LIMIT 1;`);
    let hasilQuery2 = query4[0][0];
    const query5 = await db.promise().query(`INSERT INTO history (history_id, history_user, history_cat, history_receipt) VALUES (NULL, ${resuld.notelp}, 4, ${hasilQuery2.receipt_id});`);
    res.status(200).json(hasilQuery.item_name + " sejumlah " + jumlah + " buah berhasil dibeli."); // BELOM KELAR
});

router.post('/padpay',authenticateToken,async(req, res) => {
    const {idbarang, jumlah, username_padpay, password_padpay} = req.body
    let resuld = req.response;
    const query1 = await db.promise().query(`UPDATE item SET item_stock = item_stock-${jumlah} WHERE item_id = ${idbarang};`);
    const query2 = await db.promise().query(`SELECT item_value, item_name, item_user FROM item WHERE item_id=${idbarang} LIMIT 1;`);
    let hasilQuery = query2[0][0];
    const query3 = await db.promise().query(`INSERT INTO receipt (receipt_id, receipt_send, receipt_receive, receipt_item, receipt_qty, receipt_value, receipt_dec) VALUES (NULL, "${resuld.notelp}", "${hasilQuery.item_user}", ${idbarang}, ${jumlah}, ${jumlah}*${hasilQuery.item_value}, 'Pembelian ${jumlah} ${hasilQuery.item_name}');`);
    const query4 = await db.promise().query(`UPDATE user SET user_money = user_money- (${jumlah}*${hasilQuery.item_value}) WHERE user_number = "1";`);
    const query5 = await db.promise().query(`UPDATE user SET user_money = user_money+ (${jumlah}*${hasilQuery.item_value}) WHERE user_number = "${hasilQuery.item_user}";`);
    const query6 = await db.promise().query(`SELECT receipt_id FROM receipt WHERE receipt_send="${resuld.notelp}" AND receipt_receive="${hasilQuery.item_user}" AND receipt_value=${jumlah}*${hasilQuery.item_value} ORDER BY receipt_id DESC LIMIT 1;`);
    let hasilQuery6 = query6[0][0];
    const query7 = await db.promise().query(`INSERT INTO pesan (pesan_id, pesan_item, pesan_number, pesan_buyer) VALUES (NULL, ${idbarang}, ${jumlah}, "${resuld.notelp}");`);
    const query8 = await db.promise().query(`SELECT pesan_id FROM pesan WHERE pesan_item = ${idbarang} AND pesan_number=${jumlah} AND pesan_buyer="${resuld.notelp}" ORDER BY pesan_id DESC LIMIT 1;`);
    let hasilQuery8 = query8[0][0];
    const query9 = await db.promise().query(`INSERT INTO ticket (ticket_id, ticket_unique, ticket_pesan) VALUES (NULL, SUBSTRING(MD5(RAND()) FROM 1 FOR 15), ${hasilQuery8.pesan_id});`);
    const query10 = await db.promise().query(`INSERT INTO history (history_id, history_user, history_cat, history_receipt) VALUES (NULL, "${resuld.notelp}", 4, ${hasilQuery6.receipt_id});`);
    const query11 = await db.promise().query(`INSERT INTO history (history_id, history_user, history_cat, history_receipt) VALUES (NULL, "${hasilQuery.item_user}", 6, ${hasilQuery6.receipt_id});`);

    var value = jumlah*hasilQuery.item_value
    
    var options = {
        'method': 'POST',
        'url': 'https://mypadpay.xyz/padpay/api/login.php',
        'headers': {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "email":username_padpay,
            "password": password_padpay
        })

        };
        rq(options, function (error, response) {
            if (error) throw new Error(error);
            // res.status(200).json(response.body);
            // console.log(response.body);
            var nampung = JSON.parse(response.body);
        //     // console.log("response.body");
          var token = nampung.Data.jwt;
          var idorang = nampung.Data.id;
          // console.log(token)
          // console.log(idorang)
            var options = {
            'method': 'POST',
            'url': 'https://mypadpay.xyz/padpay/api/transaksi.php/' + idorang,
            'headers': {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": username_padpay,
                "password": password_padpay,
                "jwt": token,
                "tujuan": 087654321,
                "jumlah": value
            })
            };
            rq(options, function (error, response) {
            if (error) throw new Error(error);
                res.status(200).json(hasilQuery.item_name + " sejumlah " + jumlah + " buah berhasil dibeli.");
            });
        }
        )
});

router.post('/buskicoins',authenticateToken,async(req, res) => {
    const {idbarang, jumlah, username_buski, password_buski} = req.body
    let resuld = req.response;
    const query1 = await db.promise().query(`UPDATE item SET item_stock = item_stock-${jumlah} WHERE item_id = ${idbarang};`);
    const query2 = await db.promise().query(`SELECT item_value, item_name, item_user FROM item WHERE item_id=${idbarang} LIMIT 1;`);
    let hasilQuery = query2[0][0];
    const query3 = await db.promise().query(`INSERT INTO receipt (receipt_id, receipt_send, receipt_receive, receipt_item, receipt_qty, receipt_value, receipt_dec) VALUES (NULL, "${resuld.notelp}", "${hasilQuery.item_user}", ${idbarang}, ${jumlah}, ${jumlah}*${hasilQuery.item_value}, 'Pembelian ${jumlah} ${hasilQuery.item_name}');`);
    const query4 = await db.promise().query(`UPDATE user SET user_money = user_money- (${jumlah}*${hasilQuery.item_value}) WHERE user_number = "1";`);
    const query5 = await db.promise().query(`UPDATE user SET user_money = user_money+ (${jumlah}*${hasilQuery.item_value}) WHERE user_number = "${hasilQuery.item_user}";`);
    const query6 = await db.promise().query(`SELECT receipt_id FROM receipt WHERE receipt_send="${resuld.notelp}" AND receipt_receive="${hasilQuery.item_user}" AND receipt_value=${jumlah}*${hasilQuery.item_value} ORDER BY receipt_id DESC LIMIT 1;`);
    let hasilQuery6 = query6[0][0];
    const query7 = await db.promise().query(`INSERT INTO pesan (pesan_id, pesan_item, pesan_number, pesan_buyer) VALUES (NULL, ${idbarang}, ${jumlah}, "${resuld.notelp}");`);
    const query8 = await db.promise().query(`SELECT pesan_id FROM pesan WHERE pesan_item = ${idbarang} AND pesan_number=${jumlah} AND pesan_buyer="${resuld.notelp}" ORDER BY pesan_id DESC LIMIT 1;`);
    let hasilQuery8 = query8[0][0];
    const query9 = await db.promise().query(`INSERT INTO ticket (ticket_id, ticket_unique, ticket_pesan) VALUES (NULL, SUBSTRING(MD5(RAND()) FROM 1 FOR 15), ${hasilQuery8.pesan_id});`);
    const query10 = await db.promise().query(`INSERT INTO history (history_id, history_user, history_cat, history_receipt) VALUES (NULL, "${resuld.notelp}", 4, ${hasilQuery6.receipt_id});`);
    const query11 = await db.promise().query(`INSERT INTO history (history_id, history_user, history_cat, history_receipt) VALUES (NULL, "${hasilQuery.item_user}", 6, ${hasilQuery6.receipt_id});`);

    var value = jumlah*hasilQuery.item_value
    
    var options = {
        'method': 'POST',
        'url': 'https://arielaliski.xyz/e-money-kelompok-2/public/buskidicoin/publics/login',
        'headers': {
        },
        formData: {
          'username': username_buski,
          'password': password_buski
        }
      };
      rq(options, function (error, response) {
        if (error) throw new Error(error);
        var nampung = JSON.parse(response.body);
        var token = nampung.message.token;
        var notelp = nampung.message.data.nomer_hp;
        // res.status(200).json(notelp)
        var options = {
            'method': 'POST',
            'url': 'https://arielaliski.xyz/e-money-kelompok-2/public/buskidicoin/admin/transfer',
            'headers': {
              'Authorization': 'Bearer ' + token
            },
            formData: {
              'nomer_hp': notelp,
              'nomer_hp_tujuan': '087654321',
              'e_money_tujuan': 'Buski Coins',
              'amount': value,
              'deskripsi': 'Pembayaran Tiket Melewati TiketIND'
            }
          };
          rq(options, function (error, response) {
            if (error) throw new Error(error);
            // res.status(200).json(notelp)
            res.status(200).json(hasilQuery.item_name + " sejumlah " + jumlah + " buah berhasil dibeli.");
          }); 
      });
});

router.post('/gallecoins', authenticateToken,  async (req, res) => {
  const {idbarang, jumlah, username_galle, password_galle} = req.body
  let resuld = req.response;
  const query1 = await db.promise().query(`UPDATE item SET item_stock = item_stock-${jumlah} WHERE item_id = ${idbarang};`);
  const query2 = await db.promise().query(`SELECT item_value, item_name, item_user FROM item WHERE item_id=${idbarang} LIMIT 1;`);
  let hasilQuery = query2[0][0];
  const query3 = await db.promise().query(`INSERT INTO receipt (receipt_id, receipt_send, receipt_receive, receipt_item, receipt_qty, receipt_value, receipt_dec) VALUES (NULL, "${resuld.notelp}", "${hasilQuery.item_user}", ${idbarang}, ${jumlah}, ${jumlah}*${hasilQuery.item_value}, 'Pembelian ${jumlah} ${hasilQuery.item_name}');`);
  const query4 = await db.promise().query(`UPDATE user SET user_money = user_money- (${jumlah}*${hasilQuery.item_value}) WHERE user_number = "1";`);
  const query5 = await db.promise().query(`UPDATE user SET user_money = user_money+ (${jumlah}*${hasilQuery.item_value}) WHERE user_number = "${hasilQuery.item_user}";`);
  const query6 = await db.promise().query(`SELECT receipt_id FROM receipt WHERE receipt_send="${resuld.notelp}" AND receipt_receive="${hasilQuery.item_user}" AND receipt_value=${jumlah}*${hasilQuery.item_value} ORDER BY receipt_id DESC LIMIT 1;`);
  let hasilQuery6 = query6[0][0];
  const query7 = await db.promise().query(`INSERT INTO pesan (pesan_id, pesan_item, pesan_number, pesan_buyer) VALUES (NULL, ${idbarang}, ${jumlah}, "${resuld.notelp}");`);
  const query8 = await db.promise().query(`SELECT pesan_id FROM pesan WHERE pesan_item = ${idbarang} AND pesan_number=${jumlah} AND pesan_buyer="${resuld.notelp}" ORDER BY pesan_id DESC LIMIT 1;`);
  let hasilQuery8 = query8[0][0];
  const query9 = await db.promise().query(`INSERT INTO ticket (ticket_id, ticket_unique, ticket_pesan) VALUES (NULL, SUBSTRING(MD5(RAND()) FROM 1 FOR 15), ${hasilQuery8.pesan_id});`);
  const query10 = await db.promise().query(`INSERT INTO history (history_id, history_user, history_cat, history_receipt) VALUES (NULL, "${resuld.notelp}", 4, ${hasilQuery6.receipt_id});`);
  const query11 = await db.promise().query(`INSERT INTO history (history_id, history_user, history_cat, history_receipt) VALUES (NULL, "${hasilQuery.item_user}", 6, ${hasilQuery6.receipt_id});`);

  var value = jumlah*hasilQuery.item_value
  
  var options = {
            'method': 'POST',
            'url': 'https://gallecoins.herokuapp.com/api/users',
            'headers': {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "username": username_galle,
                "password": password_galle
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
                    "amount": value,
                    "phone": "087654321",
                    "description" : "Pembayaran Tiket Melewati TiketIND"
                })
        
                };
                rq(options, function (error, response) {
                if (error) throw new Error(error);
                    res.status(200).json(hasilQuery.item_name + " sejumlah " + jumlah + " buah berhasil dibeli.");
                });
        });
});

router.post('/moneyz', authenticateToken,  async (req, res) => {
  const {idbarang, jumlah, phone_moneyz, password_moneyz} = req.body
  let resuld = req.response;
  const query1 = await db.promise().query(`UPDATE item SET item_stock = item_stock-${jumlah} WHERE item_id = ${idbarang};`);
  const query2 = await db.promise().query(`SELECT item_value, item_name, item_user FROM item WHERE item_id=${idbarang} LIMIT 1;`);
  let hasilQuery = query2[0][0];
  const query3 = await db.promise().query(`INSERT INTO receipt (receipt_id, receipt_send, receipt_receive, receipt_item, receipt_qty, receipt_value, receipt_dec) VALUES (NULL, "${resuld.notelp}", "${hasilQuery.item_user}", ${idbarang}, ${jumlah}, ${jumlah}*${hasilQuery.item_value}, 'Pembelian ${jumlah} ${hasilQuery.item_name}');`);
  const query4 = await db.promise().query(`UPDATE user SET user_money = user_money- (${jumlah}*${hasilQuery.item_value}) WHERE user_number = "1";`);
  const query5 = await db.promise().query(`UPDATE user SET user_money = user_money+ (${jumlah}*${hasilQuery.item_value}) WHERE user_number = "${hasilQuery.item_user}";`);
  const query6 = await db.promise().query(`SELECT receipt_id FROM receipt WHERE receipt_send="${resuld.notelp}" AND receipt_receive="${hasilQuery.item_user}" AND receipt_value=${jumlah}*${hasilQuery.item_value} ORDER BY receipt_id DESC LIMIT 1;`);
  let hasilQuery6 = query6[0][0];
  const query7 = await db.promise().query(`INSERT INTO pesan (pesan_id, pesan_item, pesan_number, pesan_buyer) VALUES (NULL, ${idbarang}, ${jumlah}, "${resuld.notelp}");`);
  const query8 = await db.promise().query(`SELECT pesan_id FROM pesan WHERE pesan_item = ${idbarang} AND pesan_number=${jumlah} AND pesan_buyer="${resuld.notelp}" ORDER BY pesan_id DESC LIMIT 1;`);
  let hasilQuery8 = query8[0][0];
  const query9 = await db.promise().query(`INSERT INTO ticket (ticket_id, ticket_unique, ticket_pesan) VALUES (NULL, SUBSTRING(MD5(RAND()) FROM 1 FOR 15), ${hasilQuery8.pesan_id});`);
  const query10 = await db.promise().query(`INSERT INTO history (history_id, history_user, history_cat, history_receipt) VALUES (NULL, "${resuld.notelp}", 4, ${hasilQuery6.receipt_id});`);
  const query11 = await db.promise().query(`INSERT INTO history (history_id, history_user, history_cat, history_receipt) VALUES (NULL, "${hasilQuery.item_user}", 6, ${hasilQuery6.receipt_id});`);

  var value = jumlah*hasilQuery.item_value
  
  var options = {
            'method': 'POST',
            'url': 'https://moneyz-kelompok6.herokuapp.com/api/login',
            'headers': {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              "phone": phone_moneyz,
              "password": password_moneyz
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
                  "nomortujuan": "0876543210",
                  "nominal": value
                })
              
              };
              rq(options, function (error, response) {
                if (error) throw new Error(error);
                res.status(200).json(hasilQuery.item_name + " sejumlah " + jumlah + " buah berhasil dibeli.");
              });
        })
});

router.post('/kcnpay',authenticateToken,async(req, res) => {
    const {idbarang, jumlah, email_kcnpay, password_kcnpay} = req.body
    let resuld = req.response;
    const query1 = await db.promise().query(`UPDATE item SET item_stock = item_stock-${jumlah} WHERE item_id = ${idbarang};`);
    const query2 = await db.promise().query(`SELECT item_value, item_name, item_user FROM item WHERE item_id=${idbarang} LIMIT 1;`);
    let hasilQuery = query2[0][0];
    const query3 = await db.promise().query(`INSERT INTO receipt (receipt_id, receipt_send, receipt_receive, receipt_item, receipt_qty, receipt_value, receipt_dec) VALUES (NULL, "${resuld.notelp}", "${hasilQuery.item_user}", ${idbarang}, ${jumlah}, ${jumlah}*${hasilQuery.item_value}, 'Pembelian ${jumlah} ${hasilQuery.item_name}');`);
    const query4 = await db.promise().query(`UPDATE user SET user_money = user_money- (${jumlah}*${hasilQuery.item_value}) WHERE user_number = "1";`);
    const query5 = await db.promise().query(`UPDATE user SET user_money = user_money+ (${jumlah}*${hasilQuery.item_value}) WHERE user_number = "${hasilQuery.item_user}";`);
    const query6 = await db.promise().query(`SELECT receipt_id FROM receipt WHERE receipt_send="${resuld.notelp}" AND receipt_receive="${hasilQuery.item_user}" AND receipt_value=${jumlah}*${hasilQuery.item_value} ORDER BY receipt_id DESC LIMIT 1;`);
    let hasilQuery6 = query6[0][0];
    const query7 = await db.promise().query(`INSERT INTO pesan (pesan_id, pesan_item, pesan_number, pesan_buyer) VALUES (NULL, ${idbarang}, ${jumlah}, "${resuld.notelp}");`);
    const query8 = await db.promise().query(`SELECT pesan_id FROM pesan WHERE pesan_item = ${idbarang} AND pesan_number=${jumlah} AND pesan_buyer="${resuld.notelp}" ORDER BY pesan_id DESC LIMIT 1;`);
    let hasilQuery8 = query8[0][0];
    const query9 = await db.promise().query(`INSERT INTO ticket (ticket_id, ticket_unique, ticket_pesan) VALUES (NULL, SUBSTRING(MD5(RAND()) FROM 1 FOR 15), ${hasilQuery8.pesan_id});`);
    const query10 = await db.promise().query(`INSERT INTO history (history_id, history_user, history_cat, history_receipt) VALUES (NULL, "${resuld.notelp}", 4, ${hasilQuery6.receipt_id});`);
    const query11 = await db.promise().query(`INSERT INTO history (history_id, history_user, history_cat, history_receipt) VALUES (NULL, "${hasilQuery.item_user}", 6, ${hasilQuery6.receipt_id});`);

    var value = jumlah*hasilQuery.item_value
    // res.status(200).json(value)
    var options = {
        'method': 'POST',
        'url': 'https://kecana.herokuapp.com/login',
        'headers': {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "email": email_kcnpay,
          "password": password_kcnpay
        })
      
      };
      rq(options, function (error, response) {
        if (error) throw new Error(error);
        var token = response.body
        var options = {
            'method': 'GET',
            'url': 'https://kecana.herokuapp.com/Me',
            'headers': {
              'Authorization': 'Bearer ' + token
            }
          };
          rq(options, function (error, response) {
            if (error) throw new Error(error);
            var nampung = JSON.parse(response.body);
            var id = nampung.id;
            var options = {
                'method': 'POST',
                'url': 'https://kecana.herokuapp.com/transfer',
                'headers': {
                  'Authorization': 'Bearer ' + token,
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  "id": id,
                  "nohp": "087654321",
                  "nominaltransfer": value
                })
              };
              rq(options, function (error, response) {
                if (error) throw new Error(error);
                res.status(200).json(hasilQuery.item_name + " sejumlah " + jumlah + " buah berhasil dibeli.");
            });
          }); 
      });
});

router.post('/ecoin10',authenticateToken,async(req, res) => {
    const {idbarang, jumlah, notelp_ecoin, password_ecoin} = req.body
    let resuld = req.response;
    const query1 = await db.promise().query(`UPDATE item SET item_stock = item_stock-${jumlah} WHERE item_id = ${idbarang};`);
    const query2 = await db.promise().query(`SELECT item_value, item_name, item_user FROM item WHERE item_id=${idbarang} LIMIT 1;`);
    let hasilQuery = query2[0][0];
    const query3 = await db.promise().query(`INSERT INTO receipt (receipt_id, receipt_send, receipt_receive, receipt_item, receipt_qty, receipt_value, receipt_dec) VALUES (NULL, "${resuld.notelp}", "${hasilQuery.item_user}", ${idbarang}, ${jumlah}, ${jumlah}*${hasilQuery.item_value}, 'Pembelian ${jumlah} ${hasilQuery.item_name}');`);
    const query4 = await db.promise().query(`UPDATE user SET user_money = user_money- (${jumlah}*${hasilQuery.item_value}) WHERE user_number = "1";`);
    const query5 = await db.promise().query(`UPDATE user SET user_money = user_money+ (${jumlah}*${hasilQuery.item_value}) WHERE user_number = "${hasilQuery.item_user}";`);
    const query6 = await db.promise().query(`SELECT receipt_id FROM receipt WHERE receipt_send="${resuld.notelp}" AND receipt_receive="${hasilQuery.item_user}" AND receipt_value=${jumlah}*${hasilQuery.item_value} ORDER BY receipt_id DESC LIMIT 1;`);
    let hasilQuery6 = query6[0][0];
    const query7 = await db.promise().query(`INSERT INTO pesan (pesan_id, pesan_item, pesan_number, pesan_buyer) VALUES (NULL, ${idbarang}, ${jumlah}, "${resuld.notelp}");`);
    const query8 = await db.promise().query(`SELECT pesan_id FROM pesan WHERE pesan_item = ${idbarang} AND pesan_number=${jumlah} AND pesan_buyer="${resuld.notelp}" ORDER BY pesan_id DESC LIMIT 1;`);
    let hasilQuery8 = query8[0][0];
    const query9 = await db.promise().query(`INSERT INTO ticket (ticket_id, ticket_unique, ticket_pesan) VALUES (NULL, SUBSTRING(MD5(RAND()) FROM 1 FOR 15), ${hasilQuery8.pesan_id});`);
    const query10 = await db.promise().query(`INSERT INTO history (history_id, history_user, history_cat, history_receipt) VALUES (NULL, "${resuld.notelp}", 4, ${hasilQuery6.receipt_id});`);
    const query11 = await db.promise().query(`INSERT INTO history (history_id, history_user, history_cat, history_receipt) VALUES (NULL, "${hasilQuery.item_user}", 6, ${hasilQuery6.receipt_id});`);

    var value = jumlah*hasilQuery.item_value
    var options = {
        'method': 'POST',
        'url': 'http://ecoin10.my.id/api/masuk',
        'headers': {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "phone": notelp_ecoin,
          "password": password_ecoin
        })
      };
      rq(options, function (error, response) {
        if (error) throw new Error(error);
        var nampung = JSON.parse(response.body)
        var token = nampung.token
        // res.status(200).json(token)
        var options = {
            'method': 'POST',
            'url': 'http://ecoin10.my.id/api/transfer',
            'headers': {
              'Authorization': 'Bearer ' + token,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              "phone": notelp_ecoin,
              "password": password_ecoin,
              "amount": value,
              "phone2": "087654321",
              "description": "Pembelian " + jumlah + " " + hasilQuery.item_name
            })
          };
          rq(options, function (error, response) {
            if (error) throw new Error(error);
            res.status(200).json(hasilQuery.item_name + " sejumlah " + jumlah + " buah berhasil dibeli.");
          }); 
      });
});

router.post('/talangin',authenticateToken,async(req, res) => {
    const {idbarang, jumlah, email_talangin, password_talangin} = req.body
    let resuld = req.response;
    const query1 = await db.promise().query(`UPDATE item SET item_stock = item_stock-${jumlah} WHERE item_id = ${idbarang};`);
    const query2 = await db.promise().query(`SELECT item_value, item_name, item_user FROM item WHERE item_id=${idbarang} LIMIT 1;`);
    let hasilQuery = query2[0][0];
    const query3 = await db.promise().query(`INSERT INTO receipt (receipt_id, receipt_send, receipt_receive, receipt_item, receipt_qty, receipt_value, receipt_dec) VALUES (NULL, "${resuld.notelp}", "${hasilQuery.item_user}", ${idbarang}, ${jumlah}, ${jumlah}*${hasilQuery.item_value}, 'Pembelian ${jumlah} ${hasilQuery.item_name}');`);
    const query4 = await db.promise().query(`UPDATE user SET user_money = user_money- (${jumlah}*${hasilQuery.item_value}) WHERE user_number = "1";`);
    const query5 = await db.promise().query(`UPDATE user SET user_money = user_money+ (${jumlah}*${hasilQuery.item_value}) WHERE user_number = "${hasilQuery.item_user}";`);
    const query6 = await db.promise().query(`SELECT receipt_id FROM receipt WHERE receipt_send="${resuld.notelp}" AND receipt_receive="${hasilQuery.item_user}" AND receipt_value=${jumlah}*${hasilQuery.item_value} ORDER BY receipt_id DESC LIMIT 1;`);
    let hasilQuery6 = query6[0][0];
    const query7 = await db.promise().query(`INSERT INTO pesan (pesan_id, pesan_item, pesan_number, pesan_buyer) VALUES (NULL, ${idbarang}, ${jumlah}, "${resuld.notelp}");`);
    const query8 = await db.promise().query(`SELECT pesan_id FROM pesan WHERE pesan_item = ${idbarang} AND pesan_number=${jumlah} AND pesan_buyer="${resuld.notelp}" ORDER BY pesan_id DESC LIMIT 1;`);
    let hasilQuery8 = query8[0][0];
    const query9 = await db.promise().query(`INSERT INTO ticket (ticket_id, ticket_unique, ticket_pesan) VALUES (NULL, SUBSTRING(MD5(RAND()) FROM 1 FOR 15), ${hasilQuery8.pesan_id});`);
    const query10 = await db.promise().query(`INSERT INTO history (history_id, history_user, history_cat, history_receipt) VALUES (NULL, "${resuld.notelp}", 4, ${hasilQuery6.receipt_id});`);
    const query11 = await db.promise().query(`INSERT INTO history (history_id, history_user, history_cat, history_receipt) VALUES (NULL, "${hasilQuery.item_user}", 6, ${hasilQuery6.receipt_id});`);

    var value = jumlah*hasilQuery.item_value
    var options = {
        'method': 'POST',
        'url': 'https://e-money-kelomok-11.000webhostapp.com/api/login.php',
        'headers': {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "email": email_talangin,
          "password": password_talangin
        })
      };
      rq(options, function (error, response) {
        if (error) throw new Error(error);
        var nampung = JSON.parse(response.body)
        var token = nampung.jwt
        var options = {
            'method': 'POST',
            'url': 'https://e-money-kelomok-11.000webhostapp.com/api/get_user.php',
            'headers': {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              "email": email_talangin,
              "jwt": token
            })
          
          };
          rq(options, function (error, response) {
            if (error) throw new Error(error);
            var nampung = JSON.parse(response.body)
            var notelp_talangin = nampung.data[0].phone
            // res.status(200).json(notelp_talangin)
            var options = {
                'method': 'POST',
                'url': 'https://e-money-kelomok-11.000webhostapp.com/api/transfer.php',
                'headers': {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  "jwt": token,
                  "pengirim": notelp_talangin,
                  "penerima": "087654321",
                  "jumlah": value
                })
              };
              rq(options, function (error, response) {
                if (error) throw new Error(error);
                res.status(200).json(hasilQuery.item_name + " sejumlah " + jumlah + " buah berhasil dibeli.");
                });// res.status(200).json(token)
            });
      });
});

router.post('/peacepay',authenticateToken,async(req, res) => {
    const {idbarang, jumlah, notelp_peacepay, password_peacepay} = req.body
    let resuld = req.response;
    const query1 = await db.promise().query(`UPDATE item SET item_stock = item_stock-${jumlah} WHERE item_id = ${idbarang};`);
    const query2 = await db.promise().query(`SELECT item_value, item_name, item_user FROM item WHERE item_id=${idbarang} LIMIT 1;`);
    let hasilQuery = query2[0][0];
    const query3 = await db.promise().query(`INSERT INTO receipt (receipt_id, receipt_send, receipt_receive, receipt_item, receipt_qty, receipt_value, receipt_dec) VALUES (NULL, "${resuld.notelp}", "${hasilQuery.item_user}", ${idbarang}, ${jumlah}, ${jumlah}*${hasilQuery.item_value}, 'Pembelian ${jumlah} ${hasilQuery.item_name}');`);
    const query4 = await db.promise().query(`UPDATE user SET user_money = user_money- (${jumlah}*${hasilQuery.item_value}) WHERE user_number = "1";`);
    const query5 = await db.promise().query(`UPDATE user SET user_money = user_money+ (${jumlah}*${hasilQuery.item_value}) WHERE user_number = "${hasilQuery.item_user}";`);
    const query6 = await db.promise().query(`SELECT receipt_id FROM receipt WHERE receipt_send="${resuld.notelp}" AND receipt_receive="${hasilQuery.item_user}" AND receipt_value=${jumlah}*${hasilQuery.item_value} ORDER BY receipt_id DESC LIMIT 1;`);
    let hasilQuery6 = query6[0][0];
    const query7 = await db.promise().query(`INSERT INTO pesan (pesan_id, pesan_item, pesan_number, pesan_buyer) VALUES (NULL, ${idbarang}, ${jumlah}, "${resuld.notelp}");`);
    const query8 = await db.promise().query(`SELECT pesan_id FROM pesan WHERE pesan_item = ${idbarang} AND pesan_number=${jumlah} AND pesan_buyer="${resuld.notelp}" ORDER BY pesan_id DESC LIMIT 1;`);
    let hasilQuery8 = query8[0][0];
    const query9 = await db.promise().query(`INSERT INTO ticket (ticket_id, ticket_unique, ticket_pesan) VALUES (NULL, SUBSTRING(MD5(RAND()) FROM 1 FOR 15), ${hasilQuery8.pesan_id});`);
    const query10 = await db.promise().query(`INSERT INTO history (history_id, history_user, history_cat, history_receipt) VALUES (NULL, "${resuld.notelp}", 4, ${hasilQuery6.receipt_id});`);
    const query11 = await db.promise().query(`INSERT INTO history (history_id, history_user, history_cat, history_receipt) VALUES (NULL, "${hasilQuery.item_user}", 6, ${hasilQuery6.receipt_id});`);

    var value = jumlah*hasilQuery.item_value
    var options = {
        'method': 'POST',
        'url': 'https://e-money-kelompok-12.herokuapp.com/api/login',
        'headers': {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "number": notelp_peacepay,
          "password": password_peacepay
        })
      
      };
      rq(options, function (error, response) {
        if (error) throw new Error(error);
        var nampung = JSON.parse(response.body)
        var token = nampung.token
        var options = {
            'method': 'POST',
            'url': 'https://e-money-kelompok-12.herokuapp.com/api/transfer',
            'headers': {
              'Authorization': 'Bearer '+token,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              "tujuan": "087654321",
              "amount": value
            })
          };
          rq(options, function (error, response) {
            if (error) throw new Error(error);
            res.status(200).json(hasilQuery.item_name + " sejumlah " + jumlah + " buah berhasil dibeli.");
            });
      });
});

module.exports = router;