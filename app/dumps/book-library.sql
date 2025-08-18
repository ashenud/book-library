-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: book_library
-- ------------------------------------------------------
-- Server version	8.0.43-0ubuntu0.24.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `books`
--

DROP TABLE IF EXISTS `books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `books` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `author` varchar(255) NOT NULL,
  `year` int NOT NULL,
  `library_id` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `library_id` (`library_id`),
  CONSTRAINT `books_ibfk_1` FOREIGN KEY (`library_id`) REFERENCES `libraries` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `books`
--

LOCK TABLES `books` WRITE;
/*!40000 ALTER TABLE `books` DISABLE KEYS */;
INSERT INTO `books` VALUES (1,'Decumbo','Dan Brown',2014,9,'2025-08-18 12:48:45','2025-08-18 12:48:45'),(2,'Mollitia Arguo Consectetur','Jane Austen',2021,2,'2025-08-18 12:48:45','2025-08-18 12:48:45'),(3,'Corrupti','J.K. Rowling',2009,10,'2025-08-18 12:48:45','2025-08-18 12:48:45'),(4,'Averto','Leo Tolstoy',2008,8,'2025-08-18 12:48:45','2025-08-18 12:48:45'),(5,'Vociferor','Ernest Hemingway',2005,1,'2025-08-18 12:48:45','2025-08-18 12:48:45'),(6,'Tardus Quaerat Degenero','Stephen King',2014,2,'2025-08-18 12:48:45','2025-08-18 12:48:45'),(7,'Bos','Agatha Christie',2019,3,'2025-08-18 12:48:45','2025-08-18 12:48:45'),(8,'Cuius Toties','Jane Austen',2014,7,'2025-08-18 12:48:45','2025-08-18 12:48:45'),(9,'Maxime Theologus Via','Jane Austen',2019,2,'2025-08-18 12:48:45','2025-08-18 12:48:45'),(10,'Suasoria','J.K. Rowling',2015,1,'2025-08-18 12:48:45','2025-08-18 12:48:45'),(11,'Adeptio','Agatha Christie',2011,6,'2025-08-18 12:48:45','2025-08-18 12:48:45'),(12,'Voluptatum','George R.R. Martin',2016,9,'2025-08-18 12:48:45','2025-08-18 12:48:45'),(13,'Admoneo Defaeco Facilis','Mark Twain',2013,10,'2025-08-18 12:48:45','2025-08-18 12:48:45'),(14,'Tero','J.K. Rowling',2014,1,'2025-08-18 12:48:45','2025-08-18 12:48:45'),(15,'Ars','Ernest Hemingway',2009,4,'2025-08-18 12:48:45','2025-08-18 12:48:45'),(16,'Concedo Deprimo','Leo Tolstoy',2017,6,'2025-08-18 12:48:45','2025-08-18 12:48:45'),(17,'Calcar Comprehendo Compono','George R.R. Martin',2006,3,'2025-08-18 12:48:45','2025-08-18 12:48:45'),(18,'Vulariter Summa','Stephen King',2008,4,'2025-08-18 12:48:45','2025-08-18 12:48:45'),(19,'Abundans','Jane Austen',2005,10,'2025-08-18 12:48:45','2025-08-18 12:48:45'),(20,'Blanditiis','Ernest Hemingway',2018,1,'2025-08-18 12:48:45','2025-08-18 12:48:45'),(21,'Sopor Amicitia Tandem','Mark Twain',2020,3,'2025-08-18 12:48:45','2025-08-18 12:48:45'),(22,'Charisma In Baiulus','Jane Austen',2014,4,'2025-08-18 12:48:45','2025-08-18 12:48:45'),(23,'Optio','Suzanne Collins',2006,3,'2025-08-18 12:48:45','2025-08-18 12:48:45'),(24,'Tolero Uterque Dolor','Stephen King',2021,2,'2025-08-18 12:48:45','2025-08-18 12:48:45'),(25,'Alioqui Uredo','Agatha Christie',2001,7,'2025-08-18 12:48:45','2025-08-18 12:48:45'),(26,'Compello Vulgivagus Volubilis','Leo Tolstoy',2015,2,'2025-08-18 12:48:45','2025-08-18 12:48:45'),(27,'Facilis Avaritia Talio','J.K. Rowling',2014,1,'2025-08-18 12:48:45','2025-08-18 12:48:45'),(28,'Adeptio','Suzanne Collins',2019,7,'2025-08-18 12:48:45','2025-08-18 12:48:45'),(29,'Vapulus','Mark Twain',2008,6,'2025-08-18 12:48:45','2025-08-18 12:48:45'),(30,'Amo Aeger','J.K. Rowling',2010,4,'2025-08-18 12:48:45','2025-08-18 12:48:45'),(31,'Ubi Virga','Mark Twain',2013,2,'2025-08-18 12:48:45','2025-08-18 12:48:45'),(32,'Adfectus Tam','Mark Twain',2016,9,'2025-08-18 12:48:45','2025-08-18 12:48:45'),(33,'Coniuratio Acer Delinquo','Stephen King',2008,2,'2025-08-18 12:48:45','2025-08-18 12:48:45'),(34,'Aspernatur Arma','Mark Twain',2015,8,'2025-08-18 12:48:45','2025-08-18 12:48:45'),(35,'Accedo Amor Coaegresco','J.K. Rowling',2002,2,'2025-08-18 12:48:45','2025-08-18 12:48:45'),(36,'Cattus','Mark Twain',2010,8,'2025-08-18 12:48:45','2025-08-18 12:48:45'),(37,'Volo','Stephen King',2008,2,'2025-08-18 12:48:45','2025-08-18 12:48:45'),(38,'Harum','J.K. Rowling',2021,2,'2025-08-18 12:48:45','2025-08-18 12:48:45'),(39,'Tremo Degenero','Jane Austen',2008,8,'2025-08-18 12:48:45','2025-08-18 12:48:45'),(40,'Facilis Vado','Ernest Hemingway',2019,1,'2025-08-18 12:48:45','2025-08-18 12:48:45'),(41,'Accommodo','J.K. Rowling',2012,2,'2025-08-18 12:48:45','2025-08-18 12:48:45'),(42,'Trepide Teneo','George R.R. Martin',2009,2,'2025-08-18 12:48:45','2025-08-18 12:48:45'),(43,'Una Eveniet','George R.R. Martin',2009,2,'2025-08-18 12:48:45','2025-08-18 12:48:45'),(44,'Cenaculum','Suzanne Collins',2006,7,'2025-08-18 12:48:45','2025-08-18 12:48:45'),(45,'Arcus','Ernest Hemingway',2003,6,'2025-08-18 12:48:45','2025-08-18 12:48:45'),(46,'At','Dan Brown',2009,6,'2025-08-18 12:48:45','2025-08-18 12:48:45'),(47,'Ara','George R.R. Martin',2004,5,'2025-08-18 12:48:45','2025-08-18 12:48:45'),(48,'Usus Condico Tego','George R.R. Martin',2021,8,'2025-08-18 12:48:45','2025-08-18 12:48:45'),(49,'Textus Aperte','Stephen King',2015,4,'2025-08-18 12:48:45','2025-08-18 12:48:45'),(50,'Canonicus Tricesimus','Leo Tolstoy',2014,1,'2025-08-18 12:48:45','2025-08-18 12:48:45'),(51,'Explicabo Conculco','J.K. Rowling',2018,6,'2025-08-18 12:48:45','2025-08-18 12:48:45'),(52,'Condico Absum','Suzanne Collins',2007,1,'2025-08-18 12:48:45','2025-08-18 12:48:45'),(53,'Vito Accusantium Arbitro','J.K. Rowling',2015,2,'2025-08-18 12:48:45','2025-08-18 12:48:45'),(54,'Nisi','Dan Brown',2005,2,'2025-08-18 12:48:45','2025-08-18 12:48:45'),(55,'Theatrum','J.K. Rowling',2005,8,'2025-08-18 12:48:45','2025-08-18 12:48:45'),(56,'Thema Contego Quae','J.K. Rowling',2009,10,'2025-08-18 12:48:45','2025-08-18 12:48:45'),(57,'Solutio','Mark Twain',2004,7,'2025-08-18 12:48:45','2025-08-18 12:48:45'),(58,'Audeo','Mark Twain',2011,6,'2025-08-18 12:48:45','2025-08-18 12:48:45'),(59,'Sortitus','J.K. Rowling',2012,5,'2025-08-18 12:48:45','2025-08-18 12:48:45'),(60,'Eaque Tondeo Subvenio','George R.R. Martin',2019,1,'2025-08-18 12:48:45','2025-08-18 12:48:45'),(61,'Trans Aperio Arceo','Ernest Hemingway',2012,10,'2025-08-18 12:48:45','2025-08-18 12:48:45'),(62,'Vito','J.K. Rowling',2008,3,'2025-08-18 12:48:45','2025-08-18 12:48:45'),(63,'Alius','Dan Brown',2018,7,'2025-08-18 12:48:45','2025-08-18 12:48:45'),(64,'Alveus Valetudo Excepturi','J.K. Rowling',2019,4,'2025-08-18 12:48:45','2025-08-18 12:48:45'),(65,'Vesica','Agatha Christie',2014,1,'2025-08-18 12:48:45','2025-08-18 12:48:45'),(66,'Doloribus Odit Abundans','George R.R. Martin',2014,1,'2025-08-18 12:48:45','2025-08-18 12:48:45'),(67,'Comedo','Jane Austen',2019,10,'2025-08-18 12:48:45','2025-08-18 12:48:45'),(68,'Ducimus Thalassinus Terreo','George R.R. Martin',2021,10,'2025-08-18 12:48:45','2025-08-18 12:48:45'),(69,'Tergeo','Suzanne Collins',2014,8,'2025-08-18 12:48:45','2025-08-18 12:48:45'),(70,'Tabgo Auctus Sit','Dan Brown',2014,6,'2025-08-18 12:48:45','2025-08-18 12:48:45'),(71,'Curo Benevolentia Constans','George R.R. Martin',2018,3,'2025-08-18 12:48:45','2025-08-18 12:48:45'),(72,'Cognatus Adsum','George R.R. Martin',2019,9,'2025-08-18 12:48:45','2025-08-18 12:48:45'),(73,'Quibusdam Tepidus Vita','Suzanne Collins',2000,7,'2025-08-18 12:48:45','2025-08-18 12:48:45'),(74,'Solium Amiculum','Dan Brown',2018,3,'2025-08-18 12:48:45','2025-08-18 12:48:45'),(75,'Solus Vestigium Animadverto','Stephen King',2004,9,'2025-08-18 12:48:45','2025-08-18 12:48:45'),(76,'Clamo Utilis','Leo Tolstoy',2012,4,'2025-08-18 12:48:45','2025-08-18 12:48:45'),(77,'Iure','George R.R. Martin',2015,6,'2025-08-18 12:48:45','2025-08-18 12:48:45'),(78,'Accommodo','Leo Tolstoy',2006,4,'2025-08-18 12:48:45','2025-08-18 12:48:45'),(79,'Capio Strues','Ernest Hemingway',2012,10,'2025-08-18 12:48:45','2025-08-18 12:48:45'),(80,'Damnatio','Stephen King',2014,9,'2025-08-18 12:48:45','2025-08-18 12:48:45'),(81,'Arguo','Jane Austen',2020,3,'2025-08-18 12:48:45','2025-08-18 12:48:45'),(82,'Ventus','Ernest Hemingway',2020,10,'2025-08-18 12:48:45','2025-08-18 12:48:45'),(83,'Catena','Agatha Christie',2010,6,'2025-08-18 12:48:45','2025-08-18 12:48:45'),(84,'Vomica Voveo','Agatha Christie',2013,10,'2025-08-18 12:48:45','2025-08-18 12:48:45'),(85,'Adulescens Acies','George R.R. Martin',2000,3,'2025-08-18 12:48:45','2025-08-18 12:48:45'),(86,'Denuncio','Agatha Christie',2002,10,'2025-08-18 12:48:45','2025-08-18 12:48:45'),(87,'Atrocitas','Jane Austen',2009,9,'2025-08-18 12:48:45','2025-08-18 12:48:45'),(88,'Confugo','Jane Austen',2012,6,'2025-08-18 12:48:45','2025-08-18 12:48:45'),(89,'Culpo Carpo','Suzanne Collins',2008,7,'2025-08-18 12:48:45','2025-08-18 12:48:45'),(90,'Ulciscor Attero','Agatha Christie',2012,9,'2025-08-18 12:48:45','2025-08-18 12:48:45'),(91,'Appello','Stephen King',2006,10,'2025-08-18 12:48:45','2025-08-18 12:48:45'),(92,'Eligendi Tenetur Cursus','Ernest Hemingway',2001,3,'2025-08-18 12:48:45','2025-08-18 12:48:45'),(93,'Ad Aufero','Stephen King',2020,5,'2025-08-18 12:48:45','2025-08-18 12:48:45'),(94,'Tubineus Adopto Vulgaris','Jane Austen',2017,6,'2025-08-18 12:48:45','2025-08-18 12:48:45'),(95,'Cur Vinculum','J.K. Rowling',2017,2,'2025-08-18 12:48:45','2025-08-18 12:48:45'),(96,'Vallum Adaugeo','Jane Austen',2014,8,'2025-08-18 12:48:45','2025-08-18 12:48:45'),(97,'Usus Dens Accusamus','Agatha Christie',2007,3,'2025-08-18 12:48:45','2025-08-18 12:48:45'),(98,'Cotidie','George R.R. Martin',2007,8,'2025-08-18 12:48:45','2025-08-18 12:48:45'),(99,'Usitas','J.K. Rowling',2003,10,'2025-08-18 12:48:45','2025-08-18 12:48:45'),(100,'Delibero Volubilis Conventus','Stephen King',2008,7,'2025-08-18 12:48:45','2025-08-18 12:48:45');
/*!40000 ALTER TABLE `books` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `libraries`
--

DROP TABLE IF EXISTS `libraries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `libraries` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `latitude` decimal(10,6) NOT NULL,
  `longitude` decimal(10,6) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `libraries`
--

LOCK TABLES `libraries` WRITE;
/*!40000 ALTER TABLE `libraries` DISABLE KEYS */;
INSERT INTO `libraries` VALUES (1,'City Library',6.886500,79.954500,'2025-08-18 12:48:45','2025-08-18 12:48:45'),(2,'Neighborhood Library',6.884500,79.953000,'2025-08-18 12:48:45','2025-08-18 12:48:45'),(3,'Town Library',6.935000,79.990000,'2025-08-18 12:48:45','2025-08-18 12:48:45'),(4,'Village Library',6.945000,80.010000,'2025-08-18 12:48:45','2025-08-18 12:48:45'),(5,'Central Library',7.020000,80.060000,'2025-08-18 12:48:45','2025-08-18 12:48:45'),(6,'District Library',7.050000,80.080000,'2025-08-18 12:48:45','2025-08-18 12:48:45'),(7,'Local Library',6.800000,80.200000,'2025-08-18 12:48:45','2025-08-18 12:48:45'),(8,'Remote Library',6.750000,80.150000,'2025-08-18 12:48:45','2025-08-18 12:48:45'),(9,'Far Town Library',6.700000,80.250000,'2025-08-18 12:48:45','2025-08-18 12:48:45'),(10,'Far Village Library',6.650000,80.300000,'2025-08-18 12:48:45','2025-08-18 12:48:45');
/*!40000 ALTER TABLE `libraries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_books`
--

DROP TABLE IF EXISTS `user_books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_books` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `book_id` int DEFAULT NULL,
  `status` enum('read','reviewed','wishlist','purchased') NOT NULL,
  `review_text` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_books_book_id_user_id_unique` (`user_id`,`book_id`),
  KEY `book_id` (`book_id`),
  CONSTRAINT `user_books_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_books_ibfk_2` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_books`
--

LOCK TABLES `user_books` WRITE;
/*!40000 ALTER TABLE `user_books` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_books` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `role` enum('admin','user') NOT NULL DEFAULT 'user',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Admin User','admin@example.com','$2a$10$Mw.qB9gS98R8I0s2MtRb6uT6tI.h5aa66N5XjvUkMmodIrpuSEYKq','+353 87 123 4567','Dublin, Ireland','admin','2025-08-18 12:48:45','2025-08-18 12:48:45'),(2,'User One','user1@example.com','$2a$10$Mw.qB9gS98R8I0s2MtRb6uT6tI.h5aa66N5XjvUkMmodIrpuSEYKq','+353 86 234 5678','Cork, Ireland','user','2025-08-18 12:48:45','2025-08-18 12:48:45'),(3,'User Two','user2@example.com','$2a$10$Mw.qB9gS98R8I0s2MtRb6uT6tI.h5aa66N5XjvUkMmodIrpuSEYKq','+353 85 345 6789','Galway, Ireland','user','2025-08-18 12:48:45','2025-08-18 12:48:45'),(4,'User Three','user3@example.com','$2a$10$Mw.qB9gS98R8I0s2MtRb6uT6tI.h5aa66N5XjvUkMmodIrpuSEYKq','+353 83 456 7890','Limerick, Ireland','user','2025-08-18 12:48:45','2025-08-18 12:48:45'),(5,'User Four','user4@example.com','$2a$10$Mw.qB9gS98R8I0s2MtRb6uT6tI.h5aa66N5XjvUkMmodIrpuSEYKq','+353 82 567 8901','Waterford, Ireland','user','2025-08-18 12:48:45','2025-08-18 12:48:45'),(6,'User Five','user5@example.com','$2a$10$Mw.qB9gS98R8I0s2MtRb6uT6tI.h5aa66N5XjvUkMmodIrpuSEYKq','+353 81 678 9012','Kilkenny, Ireland','user','2025-08-18 12:48:45','2025-08-18 12:48:45');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'book_library'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-08-18 18:19:24
