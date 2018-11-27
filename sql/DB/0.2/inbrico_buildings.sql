USE inbrico;
DROP TABLE IF EXISTS `buildings`;

SET character_set_client = utf8mb4 ;
CREATE TABLE `buildings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` tinytext,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

LOCK TABLES `buildings` WRITE;
INSERT INTO `buildings` VALUES (1,'Sawmill'),(2,'Windmill'),(4,'Iron mine'),(3,'Stone quary'),(5,'City'),(6,'Harbor'),(7,'Base');
UNLOCK TABLES;
