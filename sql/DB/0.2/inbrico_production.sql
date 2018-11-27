USE inbrico;
-- MySQL dump 10.13  Distrib 8.0.13, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: inbrico
-- ------------------------------------------------------
-- Server version	8.0.13

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `production`
--

DROP TABLE IF EXISTS `production`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `production` (
  `build_id` int(11) NOT NULL,
  `level` tinyint(2) NOT NULL,
  `production` int(11) DEFAULT NULL,
  `workers` int(11) DEFAULT NULL,
  KEY `Type_idx` (`build_id`),
  CONSTRAINT `Type` FOREIGN KEY (`build_id`) REFERENCES `buildings` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `production`
--

LOCK TABLES `production` WRITE;
/*!40000 ALTER TABLE `production` DISABLE KEYS */;
INSERT INTO `production` VALUES (1,1,10,1),(1,2,11,2),(1,3,13,3),(1,4,16,4),(1,5,20,5),(1,6,25,6),(1,7,31,7),(1,8,38,8),(1,9,46,9),(1,10,55,10),(1,11,65,11),(1,12,76,12),(1,13,88,13),(1,14,101,14),(1,15,115,15),(1,16,130,16),(1,17,146,17),(1,18,163,18),(1,19,181,19),(1,20,200,20),(2,1,10,1),(2,2,11,2),(2,3,13,3),(2,4,16,4),(2,5,20,5),(2,6,25,6),(2,7,31,7),(2,8,38,8),(2,9,46,9),(2,10,55,10),(2,11,65,11),(2,12,76,12),(2,13,88,13),(2,14,101,14),(2,15,115,15),(2,16,130,16),(2,17,146,17),(2,18,163,18),(2,19,181,19),(2,20,200,20),(3,1,10,1),(3,2,11,2),(3,3,13,3),(3,4,16,4),(3,5,20,5),(3,6,25,6),(3,7,31,7),(3,8,38,8),(3,9,46,9),(3,10,55,10),(3,11,65,11),(3,12,76,12),(3,13,88,13),(3,14,101,14),(3,15,115,15),(3,16,130,16),(3,17,146,17),(3,18,163,18),(3,19,181,19),(3,20,200,20),(4,1,10,1),(4,2,11,2),(4,3,13,3),(4,4,16,4),(4,5,20,5),(4,6,25,6),(4,7,31,7),(4,8,38,8),(4,9,46,9),(4,10,55,10),(4,11,65,11),(4,12,76,12),(4,13,88,13),(4,14,101,14),(4,15,115,15),(4,16,130,16),(4,17,146,17),(4,18,163,18),(4,19,181,19),(4,20,200,20),(5,1,10,1),(5,2,11,2),(5,3,13,3),(5,4,16,4),(5,5,20,5),(5,6,25,6),(5,7,31,7),(5,8,38,8),(5,9,46,9),(5,10,55,10),(5,11,65,11),(5,12,76,12),(5,13,88,13),(5,14,101,14),(5,15,115,15),(5,16,130,16),(5,17,146,17),(5,18,163,18),(5,19,181,19),(5,20,200,20),(6,1,10,1),(6,2,11,2),(6,3,13,3),(6,4,16,4),(6,5,20,5),(6,6,25,6),(6,7,31,7),(6,8,38,8),(6,9,46,9),(6,10,55,10),(6,11,65,11),(6,12,76,12),(6,13,88,13),(6,14,101,14),(6,15,115,15),(6,16,130,16),(6,17,146,17),(6,18,163,18),(6,19,181,19),(6,20,200,20),(7,2,40,2),(7,1,20,1);
/*!40000 ALTER TABLE `production` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-11-25 16:01:21
