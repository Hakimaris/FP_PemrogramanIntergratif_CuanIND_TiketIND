# e-money-kelompok-5

## Anggota Kelompok 5

| Nama Lengkap             | NRP        |
| ------------------------ | ---------- |
| Nadine Haninta           | 5027201014 |
| Naufal Dhiya Ulhaq       | 5027201029 |
| Fatih Rian Hibatul Hakim | 5027201066 |

## Pre-requirement

1. NodeJS <br>
2. Database (MySQL) <br>
3. Modul Express <br>
4. Modul Json Web Token (JWT) <br>
5. Modul dotenv

## Disclaimer
> ❗ Temporary Error
> 
> Selebihnya, terkadang proses fetch data membutuhkan waktu yang cukup lama. Jadi mohon bersabar :"D

## Menu yang Tersedia
1. [Register](#register) <BR>
   a. [Contoh Penggunaan Register](#contoh-penggunaan-register) <br>
   b. [Dokumentasi Register](#dokumentasi-register) <br>
2. [Login](#login) <br>
   a. [Contoh Penggunaan Login](#contoh-penggunaan-login) <br>
   b. [Dokumentasi Login](#dokumentasi-login) <br>
3. [Top Up](#top-up) <br>
   a. [Contoh Penggunaan Top Up](#contoh-penggunaan-top-up) <br>
   b. [Dokumentasi Top Up](#dokumentasi-top-up) <br>
4. [Transfer](#transfer) <br>
   a. [Contoh Penggunaan Transfer](#contoh-penggunaan-transfer) <br>
   b. [Dokumentasi Transfer](#dokumentasi-transfer) <br>
   c. [Transfer ke E-money Lain](#contoh-penggunaan-transfer) <br>
      - [Buski Coins](#buski-coins)<br>
      - [KCN Pay](#kcn-pay)<br>
      - [Gallecoins](#gallecoins)<br>
      - [MoneyZ](#moneyz) <br>
      - [PayFresh](#payfresh)<br>
      - [PadPay](#padpay)<br>
      - [PayPhone](#payphone)<br>
      - [ECoin](#ecoin)<br>
      - [Talangin](#talangin)<br>
      - [PeacePay](#peacepay) <br>
5. [Pay](#pay) <br>
   a. [Contoh Penggunaan Pay](#contoh-penggunaan-pay) <br>
   b. [Dokumentasi Pay](#dokumentasi-pay) <br>
   c. [Pembayaran dengan E-money lain](#contoh-penggunaan-transfer) <br>
      - [Buski Coins](#buski-coins-1)<br>
      - [KCN Pay](#kcn-pay-1)<br>
      - [Gallecoins](#gallecoins-1)<br>
      - [MoneyZ](#moneyz-1) <br>
      - [PayFresh](#payfresh-1)<br>
      - [PadPay](#padpay-1)<br>
      - [PayPhone](#payphone-1)<br>
      - [ECoin](#ecoin-1)<br>
      - [Talangin](#talangin-1)<br>
      - [PeacePay](#peacepay-1) <br>

   
### Register

- Metode: POST
- Endpoint: `(.../cuanind/user/register)`
- Parameter: {`username`, `password`, `notelp`, `email`} <br>
  Syarat khusus: <br>
  Apabila nomor telepon (notelp) atau email sudah terdaftar, maka pengguna tidak dapat mendaftarkan akunnya.
  
#### Contoh Penggunaan Register
Pengguna diharuskan membuat akun baru dengan catatan bahwa apabila ada akun dengan nomor telepon atau email yang sudah terdaftar, pengguna tidak dapat membuat akun dengan data tersebut. Dicontohkan menggunakan info data dummy sebagai berikut,
```
{
  "username": "dummyAcc",
  "password": "dummyAcc",
  "notelp": 123321,
  "email": "dummy@mail.com"
}
```
Apabila proses registrasi berhasil, akan muncul tulisan
```
Akun telah dibuat, silahkan lakukan Login lalu topup
```
Jika proses registrasi gagal, akan muncul tulisan sebagai berikut,
```
nomor telpon atau email sudah dipakai
```

#### Dokumentasi Register
Apabila registrasi berhasil,
![Registrasi Berhasil](https://i.ibb.co/N6BMyss/cuanind-register.png)

### Login

- Metode: POST
- Endpoint: `(.../cuanind/user/login)`
- Parameter: {`notelp`, `password`} <br>
  Setelah login, pengguna/penguji API diharuskan untuk menyetel _environment_ dengan nilai variabel `token` sesuai dengan hasil output setelah upaya login berhasil.
  
#### Contoh Penggunaan Login
Pengguna diharuskan masuk menggunakan data akun yang telah dibuat. Dicontohkan dengan data akun dummy sebagai berikut,
```
{
  "notelp": 123321,
  "password": "dummyAcc"
}
```
Apabila proses login berhasil, akan muncul token JWT
```
{TOKEN_JWT_DARI_HASIL_LOGIN}
```
Jika proses login gagal, akan muncul tulisan sebagai berikut,
```
gagal login
```

#### Dokumentasi Login
Apabila login berhasil,
![Login Berhasil](https://i.ibb.co/1rn8HBk/cuanind-login.png) <br>

Proses Autentikasi di Postman,
![Autentikasi](https://i.ibb.co/YfZxvbh/cuanind-login2.png) <br>

### History

- Metode: GET
- Endpoint: `(.../cuanind/user/history)`
- Parameter: - <br>
  Di sini, pengguna dapat melihat pengeluaran serta top up yang telah dilakukan oleh user (yang sedang login).
  
#### Contoh Penggunaan History
Pengguna diharuskan masuk menggunakan data akun yang telah dibuat terlebih dahulu untuk menggunakan fungsi ini. Dicontohkan dengan data akun dummyAcc

#### Dokumentasi History
Apabila pengguna belum melakukan transaksi sama sekali di cuanIND,
![History](https://i.ibb.co/kGjfjLx/cuanind-history.png) <br>

Apabila dicontohkan pengguna telah melakukan top up di cuanIND,
![History Sesudah Top Up](https://i.ibb.co/J3vwy8k/cuanind-history-After-Top-Up.png) <br>

### Top Up

- Metode: POST **(Hanya admin yang diperbolehkan)**
- Endpoint: `(.../cuanind/topup)`
- Parameter: {`target`,`amount`} <br>
  Di sini, pengguna dapat melakukan pengisian dengan jumlah tertentu yang nanti hasilnya akan ditambahkan ke saldo pengguna.
  
#### Contoh Penggunaan Top Up
Fungsi ini hanya dibatasi oleh pengguna admin, dicontohkan dengan data sebagai berikut setelah login menggunakan data admin,
```
{
  "target": 123321,
  "amount": 300000
}
```
Apabila berhasil melakukan top up, akan muncul tulisan,
```
Top Up berhasil
```
Jika gagal melakukan top up karena pengguna bukan termasuk dalam admin, akan muncul tulisan,
```
Anda tidak memiliki akses untuk melakukan Top Up
```

#### Dokumentasi Top Up
Apabila pengguna yang melakukan Top Up memiliki hak akses di cuanIND,
![Admin](https://i.ibb.co/QCt6zKx/cuanind-topup-Admin.png) <br>

Apabila pengguna yang melakukan Top Up tidak memiliki hak akses di cuanIND,
![User](https://i.ibb.co/XjCQYJq/cuanind-topup-User.png) <br>

### Transfer

- Metode: POST
- Endpoint: `(.../cuanind/transfer)`
- Parameter: {`target`,`amount`} <br>
  Pengguna dapat melakukan transfer ke pemilik akun lain yang mana, transfer ini didasarkan pada nomor telepon dari target yang dituju.

#### Contoh Penggunaan Transfer
Fungsi ini hanya dibatasi oleh pengguna admin, dicontohkan dengan data sebagai berikut setelah login menggunakan data admin,
```
{
  "target": 1234567890,
  "amount": 10000
}
```
Apabila berhasil melakukan top up, akan muncul tulisan,
```
Transfer berhasil
```

#### Dokumentasi Transfer
Apabila transfer berhasil,
![Transfer Berhasil](https://i.ibb.co/xjpRMQh/cuanind-transfer.png) <br>

#### Transfer ke e-money lain

##### Buski Coins
- Metode: POST
- Endpoint: `(.../cuanind/transfer/buskicoins)`
- Parameter: {`target`,`amount`} <br>
  Pengguna dapat melakukan transfer ke pemilik akun lain yang mana, transfer ini didasarkan pada nomor telepon dari target yang dituju.

###### Contoh Penggunaan Transfer
Fungsi ini hanya dapat digunakan oleh siapa saja, dicontohkan dengan data sebagai berikut setelah login menggunakan data admin,
```
{
  "target": 1234567890,
  "amount": 10000
}
```
Apabila berhasil melakukan Transfer, akan muncul tulisan,
```
Berhasil Transfer ke E-money Buski Coins
```

#### KCN Pay
- Metode: POST
- Endpoint: `(.../cuanind/transfer/kcnpay)`
- Parameter: {`target`,`amount`} <br>
  Pengguna dapat melakukan transfer ke pemilik akun lain yang mana, transfer ini didasarkan pada nomor telepon dari target yang dituju.

###### Contoh Penggunaan Transfer
Fungsi ini dapat digunakan oleh siapa saja, dicontohkan dengan data sebagai berikut setelah login menggunakan data admin,
```
{
  "target": 1234567890,
  "amount": 10000
}
```
Apabila berhasil melakukan Transfer, akan muncul tulisan,
```
Berhasil Transfer ke E-money KCN Pay
```

#### Gallecoins
- Metode: POST
- Endpoint: `(.../cuanind/transfer/gallecoins)`
- Parameter: {`target`,`amount`} <br>
  Pengguna dapat melakukan transfer ke pemilik akun lain yang mana, transfer ini didasarkan pada nomor telepon dari target yang dituju.

###### Contoh Penggunaan Transfer
Fungsi ini dapat digunakan oleh siapa saja, dicontohkan dengan data sebagai berikut setelah login menggunakan data admin,
```
{
  "target": 1234567890,
  "amount": 10000
}
```
Apabila berhasil melakukan Transfer, akan muncul tulisan,
```
berhasil
```

#### MoneyZ
- Metode: POST
- Endpoint: `(.../cuanind/transfer/moneyz)`
- Parameter: {`target`,`amount`} <br>
  Pengguna dapat melakukan transfer ke pemilik akun lain yang mana, transfer ini didasarkan pada nomor telepon dari target yang dituju.

###### Contoh Penggunaan Transfer
Fungsi ini dapat digunakan oleh siapa saja, dicontohkan dengan data sebagai berikut setelah login menggunakan data admin,
```
{
  "target": 1234567890,
  "amount": 10000
}
```
Apabila berhasil melakukan Transfer, akan muncul tulisan,
```
Berhasil Transfer ke E-money MoneyZ
```

#### Payfresh
- Metode: POST
- Endpoint: `(.../cuanind/transfer/payfresh)`
- Parameter: {`target`,`amount`} <br>
  Pengguna dapat melakukan transfer ke pemilik akun lain yang mana, transfer ini didasarkan pada nomor telepon dari target yang dituju.

###### Contoh Penggunaan Transfer
Fungsi ini dapat digunakan oleh siapa saja, dicontohkan dengan data sebagai berikut setelah login menggunakan data admin,
```
{
  "target": 1234567890,
  "amount": 10000
}
```
Apabila berhasil melakukan Transfer, akan muncul tulisan,
```
Berhasil Transfer ke E-money PayFresh
```

#### PadPay
- Metode: POST
- Endpoint: `(.../cuanind/transfer/padpay)`
- Parameter: {`target`,`amount`} <br>
  Pengguna dapat melakukan transfer ke pemilik akun lain yang mana, transfer ini didasarkan pada nomor telepon dari target yang dituju.

###### Contoh Penggunaan Transfer
Fungsi ini dapat digunakan oleh siapa saja, dicontohkan dengan data sebagai berikut setelah login menggunakan data admin,
```
{
  "target": 1234567890,
  "amount": 10000
}
```
Apabila berhasil melakukan Transfer, akan muncul tulisan,
```
Berhasil Transfer ke E-money Padpay
```

#### PayPhone
- Metode: POST
- Endpoint: `(.../cuanind/transfer/payphone)`
- Parameter: {`target`,`amount`} <br>
  Pengguna dapat melakukan transfer ke pemilik akun lain yang mana, transfer ini didasarkan pada nomor telepon dari target yang dituju.

###### Contoh Penggunaan Transfer
Fungsi ini dapat digunakan oleh siapa saja, dicontohkan dengan data sebagai berikut setelah login menggunakan data admin,
```
{
  "target": 1234567890,
  "amount": 10000
}
```
Apabila berhasil melakukan Transfer, akan muncul tulisan,
```
Berhasil Transfer ke E-money PayPhone
```

#### Ecoin
- Metode: POST
- Endpoint: `(.../cuanind/transfer/ecoin10)`
- Parameter: {`target`,`amount`} <br>
  Pengguna dapat melakukan transfer ke pemilik akun lain yang mana, transfer ini didasarkan pada nomor telepon dari target yang dituju.

###### Contoh Penggunaan Transfer
Fungsi ini dapat digunakan oleh siapa saja, dicontohkan dengan data sebagai berikut setelah login menggunakan data admin,
```
{
  "target": 1234567890,
  "amount": 10000
}
```
Apabila berhasil melakukan Transfer, akan muncul tulisan,
```
berhasil
```

#### Talangin
- Metode: POST
- Endpoint: `(.../cuanind/transfer/talangin)`
- Parameter: {`target`,`amount`} <br>
  Pengguna dapat melakukan transfer ke pemilik akun lain yang mana, transfer ini didasarkan pada nomor telepon dari target yang dituju.

###### Contoh Penggunaan Transfer
Fungsi ini dapat digunakan oleh siapa saja, dicontohkan dengan data sebagai berikut setelah login menggunakan data admin,
```
{
  "target": 1234567890,
  "amount": 10000
}
```
Apabila berhasil melakukan Transfer, akan muncul tulisan,
```
berhasil
```

#### PeacePay
- Metode: POST
- Endpoint: `(.../cuanind/transfer/peacepay)`
- Parameter: {`target`,`amount`} <br>
  Pengguna dapat melakukan transfer ke pemilik akun lain yang mana, transfer ini didasarkan pada nomor telepon dari target yang dituju.

###### Contoh Penggunaan Transfer
Fungsi ini dapat digunakan oleh siapa saja, dicontohkan dengan data sebagai berikut setelah login menggunakan data admin,
```
{
  "target": 1234567890,
  "amount": 10000
}
```
Apabila berhasil melakukan Transfer, akan muncul tulisan,
```
berhasil
```




### Pay

- Metode: POST
- Endpoint: `(.../cuanind/pay)`
- Parameter: {`idbarang`, `jumlah`} <br>
  Pengguna dapat melakukan pembayaran di TiketIND


#### Contoh Penggunaan Pay
Untuk saat ini, barang di TiketIND hanya terbatas pada barang sebagai berikut,
|   idbarang  |               namabarang             | hargaBarang |
|-------------| -------------------------------------|-------------|
| 1           | Tiket SB08 (Gn. Anyar - Kenpark)     | 5000        |
| 2           | Tiket Angkot Sidoarjo - Purabaya     | 7000        |
| 3           | Tiket Bus Kencana (Surabaya - Gresik)| 10000       |

Sebagai contoh untuk pembelian tiket dengan idbarang = 1 sebanyak satu buah,
```
{
  "idbarang": 1,
  "jumlah": 1
}
```
Apabila berhasil melakukan pembayaran, akan muncul tulisan,
```
(namaBarang) + " sejumlah " + (jumlahYangDibeli) + " buah berhasil dibeli.
```

#### Dokumentasi Pay
Apabila pembayaran berhasil,
![Pembayaran Berhasil](https://i.ibb.co/d6rdnXd/cuanind-pay.png) <br>

#### Pembayaran dengan E-money Lain 
> (Belum di-push ke Server Public, menunggu hingga selesai semua)

##### Buski Coins
- Metode: POST
- Endpoint: `(.../tiketind/pay/buskicoins)`
- Parameter: {`idbarang`,`jumlah`, `username_buski`, `password_buski`} <br>
  Pengguna dapat melakukan pembayaran melalui Buski Coins.

###### Contoh Penggunaan Pay dengan Buski Coins
Fungsi ini hanya dapat digunakan oleh siapa saja, dicontohkan dengan data sebagai berikut,
```
{
  "idbarang": 1,
  "jumlah": 1,
  "username_buski": "test",
  "password_buski": "test2" 
  //Masih di local Ulhaq
}
```
Apabila berhasil melakukan Transfer, akan muncul tulisan,
```
(namaBarang) + " sejumlah " + (jumlahYangDibeli) + " buah berhasil dibeli.
//Masih di local Ulhaq
```

#### KCN Pay
- Metode: POST
- Endpoint: `(.../tiketind/pay/kcnpay)`
- Parameter: {`idbarang`,`jumlah`, `email_kcnpay`, `password_kcnpay`} <br>
  Pengguna dapat melakukan pembayaran melalui KCN Pay.

###### Contoh Penggunaan Pay dengan KCN Pay
Fungsi ini hanya dapat digunakan oleh siapa saja, dicontohkan dengan data sebagai berikut,
```
{
  "idbarang": 1,
  "jumlah": 1,
  "email_kcnpay": "test@mail.com",
  "password_kcnpay": "test" 
}
```
Apabila berhasil melakukan Transfer, akan muncul tulisan,
```
(namaBarang) + " sejumlah " + (jumlahYangDibeli) + " buah berhasil dibeli.
```

#### Gallecoins
- Metode: POST
- Endpoint: `(.../tiketind/pay/gallecoins)`
- Parameter: {`idbarang`,`jumlah`, `username_galle`, `password_galle`} <br>
  Pengguna dapat melakukan pembayaran melalui Gallecoins.

###### Contoh Penggunaan Pay dengan Gallecoins
Fungsi ini hanya dapat digunakan oleh siapa saja, dicontohkan dengan data sebagai berikut,
```
{
  "idbarang": 1,
  "jumlah": 1,
  "username_galle": "tes",
  "password_galle": "test" 
}
```
Apabila berhasil melakukan Transfer, akan muncul tulisan,
```
(namaBarang) + " sejumlah " + (jumlahYangDibeli) + " buah berhasil dibeli.
```

#### MoneyZ
- Metode: POST
- Endpoint: `(.../tiketind/pay/moneyz)`
- Parameter: {`idbarang`,`jumlah`, `phone_moneyz`, `password_moneyz`} <br>
  Pengguna dapat melakukan pembayaran melalui MoneyZ.

###### Contoh Penggunaan Pay dengan MoneyZ
Fungsi ini hanya dapat digunakan oleh siapa saja, dicontohkan dengan data sebagai berikut,
```
{
  "idbarang": 1,
  "jumlah": 1,
  "phone_monezy": "09876543210",
  "password_moneyz": "test" 
}
```
Apabila berhasil melakukan Transfer, akan muncul tulisan,
```
(namaBarang) + " sejumlah " + (jumlahYangDibeli) + " buah berhasil dibeli.
```

#### Payfresh
- Metode: POST
- Endpoint: `(.../tiketind/pay/payfresh)`
- Parameter: {`idbarang`,`jumlah`, `phone_moneyz`, `password_moneyz`} <br>
  Pengguna dapat melakukan pembayaran melalui Payfresh.

###### Contoh Penggunaan Pay dengan Payfresh
Fungsi ini hanya dapat digunakan oleh siapa saja, dicontohkan dengan data sebagai berikut,
```
{
  "idbarang": 1,
  "jumlah": 1,
  "email_payfresh": "test@mail.com",
  "password_payfresh": "test"
}
```
Apabila berhasil melakukan Transfer, akan muncul tulisan,
```
(namaBarang) + " sejumlah " + (jumlahYangDibeli) + " buah berhasil dibeli.
```

#### PadPay
- Metode: POST
- Endpoint: `(.../tiketind/pay/padpay)`
- Parameter: {`idbarang`,`jumlah`, `username_padpay`, `password_padpay`} <br>
  Pengguna dapat melakukan pembayaran melalui PadPay.

###### Contoh Penggunaan Pay dengan PadPay
Fungsi ini hanya dapat digunakan oleh siapa saja, dicontohkan dengan data sebagai berikut,
```
{
  "idbarang": 1,
  "jumlah": 1,
  "username_padpay": "test",
  "password_padpay": "test"
}
```
Apabila berhasil melakukan Transfer, akan muncul tulisan,
```
(namaBarang) + " sejumlah " + (jumlahYangDibeli) + " buah berhasil dibeli.
```

#### PayPhone
- Metode: POST
- Endpoint: `(.../tiketind/pay/payphone)`
- Parameter: {`idbarang`,`jumlah`, `notelp_payphone`, `password_payphone`} <br>
  Pengguna dapat melakukan pembayaran melalui PayPhone.

###### Contoh Penggunaan Pay dengan PayPhone
Fungsi ini hanya dapat digunakan oleh siapa saja, dicontohkan dengan data sebagai berikut,
```
{
  "idbarang": 1,
  "jumlah": 1,
  "notelp_payphone": "0987654321",
  "password_payphone": "test"
}
```
Apabila berhasil melakukan Transfer, akan muncul tulisan,
```
(namaBarang) + " sejumlah " + (jumlahYangDibeli) + " buah berhasil dibeli.
```

#### Ecoin
- Metode: POST
- Endpoint: `(.../tiketind/pay/ecoin10)`
- Parameter: {`idbarang`,`jumlah`, `notelp_ecoin`, `password_ecoin`} <br>
  Pengguna dapat melakukan pembayaran melalui ECoin

###### Contoh Penggunaan Pay dengan ECoin
Fungsi ini hanya dapat digunakan oleh siapa saja, dicontohkan dengan data sebagai berikut,
```
{
  "idbarang": 1,
  "jumlah": 1,
  "notelp_ecoin": "1",
  "password_ecoin": "test" 
}
```
Apabila berhasil melakukan Transfer, akan muncul tulisan,
```
(namaBarang) + " sejumlah " + (jumlahYangDibeli) + " buah berhasil dibeli.
```

#### Talangin
- Metode: POST
- Endpoint: `(.../tiketind/pay/talangin)`
- Parameter: {`idbarang`,`jumlah`, `email_talangin`, `password_talangin`} <br>
  Pengguna dapat melakukan pembayaran melalui Talangin.

###### Contoh Penggunaan Pay dengan Talangin
Fungsi ini hanya dapat digunakan oleh siapa saja, dicontohkan dengan data sebagai berikut,
```
{
  "idbarang": 1,
  "jumlah": 1,
  "email_talangin": "test@mail.com",
  "password_talangin": "test" 
}
```
Apabila berhasil melakukan Transfer, akan muncul tulisan,
```
(namaBarang) + " sejumlah " + (jumlahYangDibeli) + " buah berhasil dibeli.
```

#### PeacePay
- Metode: POST
- Endpoint: `(.../tiketind/pay/peacepay)`
- Parameter: {`target`,`amount`,`notelp_peacepay`, `password_peacepay`} <br>
  Pengguna dapat melakukan transfer ke pemilik akun lain yang mana, transfer ini didasarkan pada nomor telepon dari target yang dituju.

###### Contoh Penggunaan Pay dengan PeacePay
Fungsi ini dapat digunakan oleh siapa saja, dicontohkan dengan data sebagai berikut setelah login menggunakan data admin,
```
{
  "idbarang": 1,
  "jumlah": 1,
  "notelp_peacepay": "1",
  "password_peacepay": "test"
}
```
Apabila berhasil melakukan Transfer, akan muncul tulisan,
```
(namaBarang) + " sejumlah " + (jumlahYangDibeli) + " buah berhasil dibeli.
```
