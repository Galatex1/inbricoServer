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
-- Table structure for table `costs`
--

DROP TABLE IF EXISTS `costs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `costs` (
  `build_id` int(11) NOT NULL,
  `level` int(11) NOT NULL,
  `wood` int(11) DEFAULT NULL,
  `stone` int(11) DEFAULT NULL,
  `iron` int(11) DEFAULT NULL,
  `gold` int(11) DEFAULT NULL,
  `time` time DEFAULT NULL,
  PRIMARY KEY (`build_id`,`level`),
  CONSTRAINT `Buildings` FOREIGN KEY (`build_id`) REFERENCES `buildings` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `costs`
--

LOCK TABLES `costs` WRITE;
/*!40000 ALTER TABLE `costs` DISABLE KEYS */;
INSERT INTO `costs` VALUES (1,1,100,50,70,0,'00:01:00'),(1,2,220,100,150,120,'00:01:45'),(1,3,280,160,230,210,'00:02:53'),(1,4,380,210,300,290,'00:04:34'),(1,5,600,310,450,410,'00:07:06'),(1,6,880,470,680,620,'00:10:53'),(1,7,1260,680,980,910,'00:16:35'),(1,8,1860,990,1430,1320,'00:25:08'),(1,9,2740,1460,2110,1940,'00:37:57'),(1,10,4000,2140,3090,2850,'00:57:10'),(1,11,5860,3130,4520,4170,'01:26:00'),(1,12,8600,4590,6630,6110,'02:09:15'),(1,13,12600,6730,9720,8960,'03:14:07'),(1,14,18460,9860,14240,13130,'04:51:26'),(1,15,27060,14450,20870,19240,'07:17:24'),(1,16,39660,21180,30590,28200,'10:56:20'),(1,17,58120,31040,44830,41330,'16:24:46'),(1,18,85180,45490,65700,60570,'24:37:24'),(1,19,124840,66670,96290,88770,'36:56:20'),(1,20,182960,97710,141120,130100,'55:24:45'),(2,1,100,50,70,80,'00:01:00'),(2,2,220,100,150,120,'00:01:45'),(2,3,280,160,230,210,'00:02:53'),(2,4,380,210,300,290,'00:04:34'),(2,5,600,310,450,410,'00:07:06'),(2,6,880,470,680,620,'00:10:53'),(2,7,1260,680,980,910,'00:16:35'),(2,8,1860,990,1430,1320,'00:25:08'),(2,9,2740,1460,2110,1940,'00:37:57'),(2,10,4000,2140,3090,2850,'00:57:10'),(2,11,5860,3130,4520,4170,'01:26:00'),(2,12,8600,4590,6630,6110,'02:09:15'),(2,13,12600,6730,9720,8960,'03:14:07'),(2,14,18460,9860,14240,13130,'04:51:26'),(2,15,27060,14450,20870,19240,'07:17:24'),(2,16,39660,21180,30590,28200,'10:56:20'),(2,17,58120,31040,44830,41330,'16:24:46'),(2,18,85180,45490,65700,60570,'24:37:24'),(2,19,124840,66670,96290,88770,'36:56:20'),(2,20,182960,97710,141120,130100,'55:24:45'),(3,1,100,50,70,80,'00:01:00'),(3,2,220,100,150,120,'00:01:45'),(3,3,280,160,230,210,'00:02:53'),(3,4,380,210,300,290,'00:04:34'),(3,5,600,310,450,410,'00:07:06'),(3,6,880,470,680,620,'00:10:53'),(3,7,1260,680,980,910,'00:16:35'),(3,8,1860,990,1430,1320,'00:25:08'),(3,9,2740,1460,2110,1940,'00:37:57'),(3,10,4000,2140,3090,2850,'00:57:10'),(3,11,5860,3130,4520,4170,'01:26:00'),(3,12,8600,4590,6630,6110,'02:09:15'),(3,13,12600,6730,9720,8960,'03:14:07'),(3,14,18460,9860,14240,13130,'04:51:26'),(3,15,27060,14450,20870,19240,'07:17:24'),(3,16,39660,21180,30590,28200,'10:56:20'),(3,17,58120,31040,44830,41330,'16:24:46'),(3,18,85180,45490,65700,60570,'24:37:24'),(3,19,124840,66670,96290,88770,'36:56:20'),(3,20,182960,97710,141120,130100,'55:24:45'),(4,1,100,50,70,80,'00:01:00'),(4,2,220,100,150,120,'00:01:45'),(4,3,280,160,230,210,'00:02:53'),(4,4,380,210,300,290,'00:04:34'),(4,5,600,310,450,410,'00:07:06'),(4,6,880,470,680,620,'00:10:53'),(4,7,1260,680,980,910,'00:16:35'),(4,8,1860,990,1430,1320,'00:25:08'),(4,9,2740,1460,2110,1940,'00:37:57'),(4,10,4000,2140,3090,2850,'00:57:10'),(4,11,5860,3130,4520,4170,'01:26:00'),(4,12,8600,4590,6630,6110,'02:09:15'),(4,13,12600,6730,9720,8960,'03:14:07'),(4,14,18460,9860,14240,13130,'04:51:26'),(4,15,27060,14450,20870,19240,'07:17:24'),(4,16,39660,21180,30590,28200,'10:56:20'),(4,17,58120,31040,44830,41330,'16:24:46'),(4,18,85180,45490,65700,60570,'24:37:24'),(4,19,124840,66670,96290,88770,'36:56:20'),(4,20,182960,97710,141120,130100,'55:24:45'),(5,1,100,50,70,80,'00:01:00'),(5,2,220,100,150,120,'00:01:45'),(5,3,280,160,230,210,'00:02:53'),(5,4,380,210,300,290,'00:04:34'),(5,5,600,310,450,410,'00:07:06'),(5,6,880,470,680,620,'00:10:53'),(5,7,1260,680,980,910,'00:16:35'),(5,8,1860,990,1430,1320,'00:25:08'),(5,9,2740,1460,2110,1940,'00:37:57'),(5,10,4000,2140,3090,2850,'00:57:10'),(5,11,5860,3130,4520,4170,'01:26:00'),(5,12,8600,4590,6630,6110,'02:09:15'),(5,13,12600,6730,9720,8960,'03:14:07'),(5,14,18460,9860,14240,13130,'04:51:26'),(5,15,27060,14450,20870,19240,'07:17:24'),(5,16,39660,21180,30590,28200,'10:56:20'),(5,17,58120,31040,44830,41330,'16:24:46'),(5,18,85180,45490,65700,60570,'24:37:24'),(5,19,124840,66670,96290,88770,'36:56:20'),(5,20,182960,97710,141120,130100,'55:24:45'),(6,1,100,50,70,80,'00:01:00'),(6,2,220,100,150,120,'00:01:45'),(6,3,280,160,230,210,'00:02:53'),(6,4,380,210,300,290,'00:04:34'),(6,5,600,310,450,410,'00:07:06'),(6,6,880,470,680,620,'00:10:53'),(6,7,1260,680,980,910,'00:16:35'),(6,8,1860,990,1430,1320,'00:25:08'),(6,9,2740,1460,2110,1940,'00:37:57'),(6,10,4000,2140,3090,2850,'00:57:10'),(6,11,5860,3130,4520,4170,'01:26:00'),(6,12,8600,4590,6630,6110,'02:09:15'),(6,13,12600,6730,9720,8960,'03:14:07'),(6,14,18460,9860,14240,13130,'04:51:26'),(6,15,27060,14450,20870,19240,'07:17:24'),(6,16,39660,21180,30590,28200,'10:56:20'),(6,17,58120,31040,44830,41330,'16:24:46'),(6,18,85180,45490,65700,60570,'24:37:24'),(6,19,124840,66670,96290,88770,'36:56:20'),(6,20,182960,97710,141120,130100,'55:24:45'),(7,2,600,550,800,1000,'00:10:59');
/*!40000 ALTER TABLE `costs` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-11-25 16:01:20