USE inbrico;
SET NAMES utf8 ;


DROP TABLE IF EXISTS `building_queue`;

 SET character_set_client = utf8mb4 ;
CREATE TABLE `building_queue` (
  `player_id` int(11) NOT NULL,
  `tile_id` int(11) NOT NULL,
  `build` int(11) NOT NULL,
  `level` int(11) NOT NULL,
  `complete` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `queued` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `start` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`player_id`,`tile_id`,`level`,`queued`,`complete`,`build`,`start`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


LOCK TABLES `building_queue` WRITE;

UNLOCK TABLES;


