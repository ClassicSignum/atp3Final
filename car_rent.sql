-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 10, 2019 at 02:05 PM
-- Server version: 10.1.35-MariaDB
-- PHP Version: 7.2.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `car_rent`
--

-- --------------------------------------------------------

--
-- Table structure for table `blog`
--

CREATE TABLE `blog` (
  `id` int(20) NOT NULL,
  `usermail` varchar(50) DEFAULT NULL,
  `blog` varchar(1000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `blog`
--

INSERT INTO `blog` (`id`, `usermail`, `blog`) VALUES
(2, 'c2@gmail.com', 'order to make the students proficient in the course. For example: Case analysis and presentation are integral parts of the majority of the Business School classes. Case analysis helps the students to build the analytical ability and class presentation are the best way t');

-- --------------------------------------------------------

--
-- Table structure for table `carinfo`
--

CREATE TABLE `carinfo` (
  `id` int(20) NOT NULL,
  `type` varchar(20) DEFAULT NULL,
  `cost` varchar(30) DEFAULT NULL,
  `cartitle` varchar(70) DEFAULT NULL,
  `picture` varchar(70) DEFAULT NULL,
  `status` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `carinfo`
--

INSERT INTO `carinfo` (`id`, `type`, `cost`, `cartitle`, `picture`, `status`) VALUES
(12, 'Private car', '12345', 'gery car', 'gery car', 'available'),
(13, 'Private car', '12345', 'red car', 'red car', 'available'),
(14, 'Private car', '12354', 'ash car', 'ash car', 'available'),
(15, 'Microbus', '20000', 'blueish micro', 'blueish micro', 'available'),
(16, 'Pick-up', '12345', 'pickup van', 'pickup van', 'available');

-- --------------------------------------------------------

--
-- Table structure for table `rentalhistory`
--

CREATE TABLE `rentalhistory` (
  `id` int(20) NOT NULL,
  `usermail` varchar(50) DEFAULT NULL,
  `cartitle` varchar(70) DEFAULT NULL,
  `datefrom` varchar(3000) DEFAULT NULL,
  `dateto` varchar(2000) DEFAULT NULL,
  `rentday` varchar(20) DEFAULT NULL,
  `totalrent` varchar(20) DEFAULT NULL,
  `payment` varchar(30) DEFAULT NULL,
  `status` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `rentalhistory`
--

INSERT INTO `rentalhistory` (`id`, `usermail`, `cartitle`, `datefrom`, `dateto`, `rentday`, `totalrent`, `payment`, `status`) VALUES
(4, 'c@gmail.com', 'ash car', 'Sun Nov 10 2019 06:00:00 GMT+0600 (Bangladesh Standard Time)', 'Tue Nov 12 2019 06:00:00 GMT+0600 (Bangladesh Standard Time)', '2', '24708', 'cash-on-delivary', 'pending'),
(5, 'c2@gmail.com', 'blueish micro', 'Tue Nov 12 2019 06:00:00 GMT+0600 (Bangladesh Standard Time)', 'Sat Nov 16 2019 06:00:00 GMT+0600 (Bangladesh Standard Time)', '4', '80000', 'cash-on-delivary', 'successful');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(20) NOT NULL,
  `usermail` varchar(50) DEFAULT NULL,
  `password` varchar(60) DEFAULT NULL,
  `usertype` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `usermail`, `password`, `usertype`) VALUES
(1, 'admin@email.com', 'admin', 'admin'),
(3, 'c@gmail.com', 'cvcvcv1', 'customer'),
(4, 'c2@gmail.com', 'cvcvcv2', 'customer');

-- --------------------------------------------------------

--
-- Table structure for table `userinfo`
--

CREATE TABLE `userinfo` (
  `id` int(20) NOT NULL,
  `usermail` varchar(50) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  `firstname` varchar(50) DEFAULT NULL,
  `lastname` varchar(50) DEFAULT NULL,
  `usertype` varchar(20) DEFAULT NULL,
  `phoneno` varchar(20) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `status` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `userinfo`
--

INSERT INTO `userinfo` (`id`, `usermail`, `password`, `firstname`, `lastname`, `usertype`, `phoneno`, `address`, `status`) VALUES
(4, 'admin@email.com', 'admin', 'af', 'al', 'admin', '232323', 'mirpur', 'permitted'),
(7, 'c@gmail.com', 'cvcvcv1', 'cf', 'cl', 'customer', '0123654', 'cadd', 'permitted'),
(8, 'c2@gmail.com', 'cvcvcv2', 'cf2', 'cl2', 'customer', '012121', 'c2 address', 'permitted');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `blog`
--
ALTER TABLE `blog`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `carinfo`
--
ALTER TABLE `carinfo`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `rentalhistory`
--
ALTER TABLE `rentalhistory`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `userinfo`
--
ALTER TABLE `userinfo`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `blog`
--
ALTER TABLE `blog`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `carinfo`
--
ALTER TABLE `carinfo`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `rentalhistory`
--
ALTER TABLE `rentalhistory`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `userinfo`
--
ALTER TABLE `userinfo`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
