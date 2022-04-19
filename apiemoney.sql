-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Apr 19, 2022 at 03:05 AM
-- Server version: 5.7.33
-- PHP Version: 7.4.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `apiemoney`
--

-- --------------------------------------------------------

--
-- Table structure for table `history`
--

CREATE TABLE `history` (
  `history_id` int(11) NOT NULL,
  `history_user` int(30) NOT NULL,
  `history_cat` int(11) NOT NULL,
  `history_receipt` int(11) NOT NULL,
  `history_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `history`
--

INSERT INTO `history` (`history_id`, `history_user`, `history_cat`, `history_receipt`, `history_date`) VALUES
(1, 123456789, 3, 1, '2022-04-19 09:56:19');

-- --------------------------------------------------------

--
-- Table structure for table `historycat`
--

CREATE TABLE `historycat` (
  `historycat_id` int(11) NOT NULL,
  `historycat_name` varchar(100) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `historycat`
--

INSERT INTO `historycat` (`historycat_id`, `historycat_name`) VALUES
(1, 'Transfer Masuk'),
(2, 'Transfer Keluar'),
(3, 'Top Up Saldo'),
(4, 'Pembelian TiketIND'),
(5, 'Pembayaran Tagihan Lain');

-- --------------------------------------------------------

--
-- Table structure for table `item`
--

CREATE TABLE `item` (
  `item_id` int(11) NOT NULL,
  `item_cat` int(11) NOT NULL,
  `item_name` varchar(100) COLLATE utf8_bin NOT NULL,
  `item_value` int(11) NOT NULL,
  `item_stock` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `item`
--

INSERT INTO `item` (`item_id`, `item_cat`, `item_name`, `item_value`, `item_stock`) VALUES
(1, 2, 'Tiket SB08 (Gn. Anyar - Kenpark)', 5000, 20),
(2, 3, 'Tiket Angkot Sidoarjo - Purabaya', 7000, 5),
(3, 1, 'Tiket Bus Kencana (Surabaya - Gresik)', 10000, 10);

-- --------------------------------------------------------

--
-- Table structure for table `itemcat`
--

CREATE TABLE `itemcat` (
  `itemcat_id` int(11) NOT NULL,
  `itemcat_name` varchar(100) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `itemcat`
--

INSERT INTO `itemcat` (`itemcat_id`, `itemcat_name`) VALUES
(1, 'Tiket Bus Kota (Non Suroboyo Bus)'),
(2, 'Tiket Suroboyo Bus'),
(3, 'Tiket Angkutan Kota (Angkot)');

-- --------------------------------------------------------

--
-- Table structure for table `receipt`
--

CREATE TABLE `receipt` (
  `receipt_id` int(11) NOT NULL,
  `receipt_send` int(30) NOT NULL,
  `receipt_receive` int(30) NOT NULL DEFAULT '1',
  `receipt_item` int(11) NOT NULL DEFAULT '0',
  `receipt_qty` int(11) NOT NULL DEFAULT '1',
  `receipt_value` int(11) NOT NULL,
  `receipt_dec` varchar(100) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `receipt`
--

INSERT INTO `receipt` (`receipt_id`, `receipt_send`, `receipt_receive`, `receipt_item`, `receipt_qty`, `receipt_value`, `receipt_dec`) VALUES
(1, 123456789, 1, 0, 1, 100000, 'Top Up via Admin');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_number` int(30) NOT NULL,
  `user_email` varchar(100) COLLATE utf8_bin NOT NULL,
  `user_name` varchar(100) COLLATE utf8_bin NOT NULL,
  `user_password` varchar(100) COLLATE utf8_bin NOT NULL,
  `user_money` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_number`, `user_email`, `user_name`, `user_password`, `user_money`) VALUES
(1, 'admin@mail.com', 'admin', 'admin', 0),
(123456789, 'user1@mail.com', 'user1', 'user1', 0),
(987654321, 'user2@mail.com', 'user2', 'user2', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `history`
--
ALTER TABLE `history`
  ADD PRIMARY KEY (`history_id`);

--
-- Indexes for table `historycat`
--
ALTER TABLE `historycat`
  ADD PRIMARY KEY (`historycat_id`);

--
-- Indexes for table `item`
--
ALTER TABLE `item`
  ADD PRIMARY KEY (`item_id`);

--
-- Indexes for table `itemcat`
--
ALTER TABLE `itemcat`
  ADD PRIMARY KEY (`itemcat_id`);

--
-- Indexes for table `receipt`
--
ALTER TABLE `receipt`
  ADD PRIMARY KEY (`receipt_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_number`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `history`
--
ALTER TABLE `history`
  MODIFY `history_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `historycat`
--
ALTER TABLE `historycat`
  MODIFY `historycat_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `item`
--
ALTER TABLE `item`
  MODIFY `item_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `itemcat`
--
ALTER TABLE `itemcat`
  MODIFY `itemcat_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `receipt`
--
ALTER TABLE `receipt`
  MODIFY `receipt_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
