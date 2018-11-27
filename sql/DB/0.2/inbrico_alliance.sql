
SET NAMES utf8 ;

DROP TABLE IF EXISTS `alliance`;

SET character_set_client = utf8mb4 ;
CREATE TABLE `alliance` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `name` text,
  `abbreviation` tinytext,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;


LOCK TABLES `alliance` WRITE;
INSERT INTO `alliance` VALUES (1,'First Alliance','*FA*'),(2,'Second Alliance','*SA*');
UNLOCK TABLES;

