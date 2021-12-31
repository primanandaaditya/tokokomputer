-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Dec 31, 2021 at 08:53 AM
-- Server version: 5.7.31
-- PHP Version: 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tokokomputer`
--

DELIMITER $$
--
-- Procedures
--
DROP PROCEDURE IF EXISTS `SP_DeleteUser`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_DeleteUser` (IN `pid` INT)  NO SQL
UPDATE user set delflag = 1 where id = pid$$

DROP PROCEDURE IF EXISTS `SP_InsertUser`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_InsertUser` (IN `pnama` VARCHAR(100), IN `pemail` VARCHAR(100), IN `ppassword` VARCHAR(100), OUT `phasil` INT)  NO SQL
IF ((select count(nama) from user where email = pemail) > 0) THEN  
        set phasil = 0;   
    ELSE 
         INSERT INTO user (nama,email,password,delflag) VALUES (pnama,pemail,ppassword,0);
        set phasil = 1; 
    END IF$$

DROP PROCEDURE IF EXISTS `SP_Login`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_Login` (IN `pemail` VARCHAR(100), IN `ppassword` VARCHAR(100), OUT `phasil` INT)  NO SQL
if (SELECT COUNT(email) FROM user WHERE email = pemail  AND delflag = 0 ) > 0 THEN
	BEGIN
       SET phasil = 1;
       SELECT * FROM user WHERE email = pemail;
    END;
ELSE
	BEGIN
    	SET phasil = 0;
    END;
END IF$$

DROP PROCEDURE IF EXISTS `SP_SelectUser`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_SelectUser` ()  NO SQL
SELECT * FROM user
WHERE delflag = 0
ORDER by email$$

DROP PROCEDURE IF EXISTS `SP_SelectUser_ByEmail`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_SelectUser_ByEmail` (IN `pemail` VARCHAR(100))  NO SQL
SELECT * FROM user WHERE email = pemail$$

DROP PROCEDURE IF EXISTS `SP_UpdateUser`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_UpdateUser` (IN `pnama` VARCHAR(100), IN `pemail` VARCHAR(100), IN `pid` INT)  NO SQL
UPDATE user set nama=pnama, email = pemail where id = pid$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `delflag` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=20 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `email`, `password`, `nama`, `delflag`) VALUES
(12, 'nanda@gmail.com', '$2y$10$PUiriL9oMRfgdEQm8UUrmOJ30rN65UK9JBx9dQU4XIBlOUchp2tw.', 'Nanda', 0),
(11, 'prima@gmail.com', '$2y$10$yJvw0n3DDjHXgygd4eEDaeWn4ggV4a9L6fmGtbrDe4zMXG51vB8cW', 'Prima', 0),
(10, 'devara@gmail.com', '$2y$10$DllDy.YXYjSv0jCoJbja3.fcU/bZGDrLmVOfGXESZiIAP15SvUN1m', 'Devara', 0),
(13, 'putri@gmail.com', '$2y$10$qvTCyhp5.4qdJFUm/sPWEOYl3YC3urlm4RXW3W5kYIjuwx5ABthxe', 'Putri', 0),
(14, 'putra@gmail.com', '$2y$10$mQb92Xlyws.hcY1Oa8Un7eGkDNh7IV2MqxNRcl2lTO4n16zRl9gsm', 'Putra', 0),
(15, 'puri@gmail.com', '$2y$10$vndQ8lEL74N7UfwcCMqMwOizDj/stIi0rmkZla1wkDWIdFy/YqTFS', 'Puri', 0),
(16, 'puria@gmail.com', '$2y$10$Tr4cQ.o/y/wPJorKCDWVH.rp0f6ulzrWrUCxo6EC3fhGeUapexqTW', 'Puria', 0),
(17, 'puji@gmail.com', '$2y$10$dHsXLJj4S80APKlD04YSNet6WH38tbcFql0I0lTn7sb3AwZ.omA8y', 'Puji', 0),
(18, 'pujo@gmail.com', '$2y$10$j7cU1RIRP78jN/0CJKj79eOy0Km4oi7Twnr0YvQtKH9S7WjcvQMtu', 'Pujo', 0),
(19, 'dasa@gmail.com', '$2y$10$PorpJ5d1Kww88EBd66UgnuJj87jVamgfY1RzdZztWZuNWdw4Rq6Km', 'Dasa', 0);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
