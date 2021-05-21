-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 21, 2021 at 04:58 PM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 7.4.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `chicode`
--

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `batch` int(11) DEFAULT NULL,
  `migration_time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `name`, `batch`, `migration_time`) VALUES
(1, '20210416160554_seeds.js', 1, '2021-05-18 15:42:02'),
(2, '20210516141940_m_groupusers.js', 1, '2021-05-18 15:42:02'),
(3, '20210516144116_m_users.js', 1, '2021-05-18 15:42:04'),
(4, '20210519020259_m_colors.js', 2, '2021-05-19 02:03:26'),
(5, '20210519033521_m_wiretypes.js', 3, '2021-05-19 03:35:44'),
(7, '20210521013925_m_wires.js', 4, '2021-05-21 01:46:18');

-- --------------------------------------------------------

--
-- Table structure for table `migrations_lock`
--

CREATE TABLE `migrations_lock` (
  `index` int(10) UNSIGNED NOT NULL,
  `is_locked` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `migrations_lock`
--

INSERT INTO `migrations_lock` (`index`, `is_locked`) VALUES
(1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `m_colors`
--

CREATE TABLE `m_colors` (
  `Id` int(10) UNSIGNED NOT NULL,
  `Name` varchar(100) DEFAULT NULL,
  `Description` varchar(300) DEFAULT NULL,
  `Created` datetime(6) DEFAULT NULL,
  `CreatedBy` varchar(100) DEFAULT NULL,
  `Modified` datetime(6) DEFAULT NULL,
  `ModifiedBy` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `m_colors`
--

INSERT INTO `m_colors` (`Id`, `Name`, `Description`, `Created`, `CreatedBy`, `Modified`, `ModifiedBy`) VALUES
(1, 'Merah', 'Merah', '2021-05-19 10:26:54.000000', NULL, NULL, NULL),
(2, 'Kuning', 'Kuning\r\n', '2021-05-19 10:27:10.000000', NULL, NULL, NULL),
(3, 'Hijau', 'Hijau', '2021-05-19 10:27:20.000000', NULL, NULL, NULL),
(4, 'Biru', 'Biru', '2021-05-19 10:27:29.000000', NULL, NULL, NULL),
(5, 'Jingga', 'Jingga', '2021-05-19 10:27:39.000000', NULL, NULL, NULL),
(6, 'Oranye', 'Oranye', '2021-05-19 10:27:50.000000', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `m_groupusers`
--

CREATE TABLE `m_groupusers` (
  `Id` int(10) UNSIGNED NOT NULL,
  `GroupName` varchar(100) DEFAULT NULL,
  `Description` varchar(300) DEFAULT NULL,
  `Created` datetime(6) DEFAULT NULL,
  `CreatedBy` varchar(100) DEFAULT NULL,
  `Modified` datetime(6) DEFAULT NULL,
  `ModifiedBy` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `m_groupusers`
--

INSERT INTO `m_groupusers` (`Id`, `GroupName`, `Description`, `Created`, `CreatedBy`, `Modified`, `ModifiedBy`) VALUES
(1, 'Admin', 'Admin', NULL, NULL, NULL, NULL),
(2, 'Karyawan', 'Karyawan', NULL, NULL, NULL, NULL),
(3, 'Verifikator', 'Verifikator', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `m_users`
--

CREATE TABLE `m_users` (
  `Id` int(10) UNSIGNED NOT NULL,
  `M_Groupuser_Id` int(10) UNSIGNED DEFAULT NULL,
  `Username` varchar(100) DEFAULT NULL,
  `Password` varchar(50) DEFAULT NULL,
  `Photo` varchar(300) DEFAULT NULL,
  `IsLoggedIn` tinyint(1) DEFAULT NULL,
  `IsActive` tinyint(1) DEFAULT NULL,
  `Created` datetime(6) DEFAULT NULL,
  `CreatedBy` varchar(100) DEFAULT NULL,
  `Modified` datetime(6) DEFAULT NULL,
  `ModifiedBy` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `m_users`
--

INSERT INTO `m_users` (`Id`, `M_Groupuser_Id`, `Username`, `Password`, `Photo`, `IsLoggedIn`, `IsActive`, `Created`, `CreatedBy`, `Modified`, `ModifiedBy`) VALUES
(1, NULL, 'skywalker', 'b2534a8e66620d364f07f9b0b2ab2920', NULL, NULL, 1, NULL, NULL, NULL, NULL),
(2, 1, 'john', 'f01eeed856875f7f0ecf4287ea6cb4dd', 'assets/upload/users/2021_May_19_3c7532b37ef9bf4335d6074f78e10d33.png', 0, 1, NULL, NULL, NULL, NULL),
(3, 2, 'tomason', '91f40ba3e67ab8a601227f1c25e211b0', 'assets/upload/users/2021_May_19_8a5fdc2c013b8d68acc636fec2fb1707.png', 0, 1, NULL, NULL, NULL, NULL),
(4, 3, 'zuran', 'e1c24b913b37fca715470ccf6c10a51d', 'assets/upload/users/2021_May_21_04c08a2f7698d3b028f91e6ff03c34ba.png', 0, 1, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `m_wires`
--

CREATE TABLE `m_wires` (
  `Id` int(10) UNSIGNED NOT NULL,
  `M_Color_Id` int(10) UNSIGNED DEFAULT NULL,
  `M_Wiretype_Id` int(10) UNSIGNED DEFAULT NULL,
  `Name` varchar(100) DEFAULT NULL,
  `Length` int(11) DEFAULT NULL,
  `Bending` int(11) DEFAULT NULL,
  `Loss` int(11) DEFAULT NULL,
  `Status` int(11) DEFAULT NULL,
  `IsActive` tinyint(1) DEFAULT NULL,
  `Created` datetime(6) DEFAULT NULL,
  `CreatedBy` varchar(100) DEFAULT NULL,
  `Modified` datetime(6) DEFAULT NULL,
  `ModifiedBy` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `m_wires`
--

INSERT INTO `m_wires` (`Id`, `M_Color_Id`, `M_Wiretype_Id`, `Name`, `Length`, `Bending`, `Loss`, `Status`, `IsActive`, `Created`, `CreatedBy`, `Modified`, `ModifiedBy`) VALUES
(2, 1, 1, 'Kabel 1', 100, 10, 12, 2, 0, '2021-05-21 10:31:43.000000', 'skywalker', NULL, NULL),
(3, 2, 1, 'Kabel 2', 1000, 10, 12, 3, 0, '2021-05-21 11:26:15.000000', 'skywalker', NULL, NULL),
(4, 3, 1, 'Kabel 1', 100, 10, 12, 2, 0, '2021-05-21 11:27:24.000000', 'skywalker', NULL, NULL),
(5, 4, 1, 'Kabel 1', 100, 10, 12, 3, 0, '2021-05-21 11:35:41.000000', 'skywalker', NULL, NULL),
(6, 4, 2, 'Kabel 1', 100, 10, 12, 2, 1, '2021-05-21 21:52:49.000000', 'skywalker', NULL, NULL),
(7, 1, 12, 'Kabel 1', 100, 10, 12, 1, 0, '2021-05-21 21:55:50.000000', 'john', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `m_wiretypes`
--

CREATE TABLE `m_wiretypes` (
  `Id` int(10) UNSIGNED NOT NULL,
  `Name` varchar(100) DEFAULT NULL,
  `Description` varchar(300) DEFAULT NULL,
  `Created` datetime(6) DEFAULT NULL,
  `CreatedBy` varchar(100) DEFAULT NULL,
  `Modified` datetime(6) DEFAULT NULL,
  `ModifiedBy` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `m_wiretypes`
--

INSERT INTO `m_wiretypes` (`Id`, `Name`, `Description`, `Created`, `CreatedBy`, `Modified`, `ModifiedBy`) VALUES
(1, 'ME9-D4-PKL GE-1/1/1', 'ME9-D4-PKL GE-1/1/1', '2021-05-19 11:03:57.000000', NULL, NULL, NULL),
(2, 'ME9-D4-PKL GE-1/1/2', 'ME9-D4-PKL GE-1/1/2', '2021-05-19 19:02:56.000000', NULL, NULL, NULL),
(12, 'ME9-D4-PKL GE-1/1/3', 'ME9-D4-PKL GE-1/1/3', '2021-05-19 20:15:50.000000', NULL, NULL, NULL),
(13, 'ME9-D4-PKL GE-1/1/5', 'ME9-D4-PKL GE-1/1/5', '2021-05-19 20:15:51.000000', NULL, NULL, NULL),
(14, 'ME9-D4-PKL GE-1/1/18', 'ME9-D4-PKL GE-1/1/18', '2021-05-19 20:15:51.000000', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `seeds`
--

CREATE TABLE `seeds` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `time` datetime(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `seeds`
--

INSERT INTO `seeds` (`id`, `name`, `time`) VALUES
(1, 'Seed_20210517085435_defaultusers', '2021-05-18 22:42:12.000000');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `sid` varchar(255) NOT NULL,
  `sess` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`sess`)),
  `expired` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`sid`, `sess`, `expired`) VALUES
('61c00847-b6e1-438e-83cf-3e16bb897dcd', '{\"cookie\":{\"originalMaxAge\":7200000,\"expires\":\"2021-05-21T16:53:06.123Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"userlanguage\":null,\"language\":\"en\"}', '2021-05-21 16:53:06'),
('e889863d-8079-4f53-87b0-5d0a06ad920d', '{\"cookie\":{\"originalMaxAge\":7200000,\"expires\":\"2021-05-21T16:57:15.603Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"userlanguage\":\"id\",\"language\":\"en\",\"token\":\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6MiwiTV9Hcm91cHVzZXJfSWQiOjEsIlVzZXJuYW1lIjoiam9obiIsIlBhc3N3b3JkIjoiZjAxZWVlZDg1Njg3NWY3ZjBlY2Y0Mjg3ZWE2Y2I0ZGQiLCJQaG90byI6ImFzc2V0cy91cGxvYWQvdXNlcnMvMjAyMV9NYXlfMTlfM2M3NTMyYjM3ZWY5YmY0MzM1ZDYwNzRmNzhlMTBkMzMucG5nIiwiSXNMb2dnZWRJbiI6ZmFsc2UsIklzQWN0aXZlIjp0cnVlLCJDcmVhdGVkQnkiOm51bGwsIk1vZGlmaWVkIjpudWxsLCJNb2RpZmllZEJ5IjpudWxsLCJpYXQiOjE2MjE2MDg5Mzh9.WMskN5QO15dn7r__ENFR6nQ6ckCMo_9wSgsWLAJ2-p0\"}', '2021-05-21 16:57:15');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations_lock`
--
ALTER TABLE `migrations_lock`
  ADD PRIMARY KEY (`index`);

--
-- Indexes for table `m_colors`
--
ALTER TABLE `m_colors`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `m_groupusers`
--
ALTER TABLE `m_groupusers`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `m_users`
--
ALTER TABLE `m_users`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `m_users_m_groupuser_id_foreign` (`M_Groupuser_Id`);

--
-- Indexes for table `m_wires`
--
ALTER TABLE `m_wires`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `m_wires_m_color_id_foreign` (`M_Color_Id`),
  ADD KEY `m_wires_m_wiretype_id_foreign` (`M_Wiretype_Id`);

--
-- Indexes for table `m_wiretypes`
--
ALTER TABLE `m_wiretypes`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `seeds`
--
ALTER TABLE `seeds`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`sid`),
  ADD KEY `sessions_expired_index` (`expired`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `migrations_lock`
--
ALTER TABLE `migrations_lock`
  MODIFY `index` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `m_colors`
--
ALTER TABLE `m_colors`
  MODIFY `Id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `m_groupusers`
--
ALTER TABLE `m_groupusers`
  MODIFY `Id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `m_users`
--
ALTER TABLE `m_users`
  MODIFY `Id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `m_wires`
--
ALTER TABLE `m_wires`
  MODIFY `Id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `m_wiretypes`
--
ALTER TABLE `m_wiretypes`
  MODIFY `Id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `seeds`
--
ALTER TABLE `seeds`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `m_users`
--
ALTER TABLE `m_users`
  ADD CONSTRAINT `m_users_m_groupuser_id_foreign` FOREIGN KEY (`M_Groupuser_Id`) REFERENCES `m_groupusers` (`Id`) ON UPDATE CASCADE;

--
-- Constraints for table `m_wires`
--
ALTER TABLE `m_wires`
  ADD CONSTRAINT `m_wires_m_color_id_foreign` FOREIGN KEY (`M_Color_Id`) REFERENCES `m_colors` (`Id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `m_wires_m_wiretype_id_foreign` FOREIGN KEY (`M_Wiretype_Id`) REFERENCES `m_wiretypes` (`Id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
