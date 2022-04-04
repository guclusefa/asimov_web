-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: mysql-asimov.alwaysdata.net
-- Generation Time: Apr 01, 2022 at 07:19 PM
-- Server version: 10.6.5-MariaDB
-- PHP Version: 7.4.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `asimov_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `Classes`
--

CREATE TABLE `Classes` (
  `classe_id` int(11) NOT NULL,
  `classe_libelle` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Classes`
--

INSERT INTO `Classes` (`classe_id`, `classe_libelle`) VALUES
(1, '6eme'),
(2, '5eme'),
(3, '4eme'),
(4, '3eme'),
(5, '2nd'),
(6, '1ere'),
(7, 'Terminale');

-- --------------------------------------------------------

--
-- Table structure for table `Cursus`
--

CREATE TABLE `Cursus` (
  `cursus_id` int(11) NOT NULL,
  `cursus_anneeScolaire` year(4) NOT NULL,
  `cursus_libelle` varchar(10) NOT NULL,
  `cursus_idClasse` int(11) NOT NULL,
  `cursus_idProfPrincipale` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Cursus`
--

INSERT INTO `Cursus` (`cursus_id`, `cursus_anneeScolaire`, `cursus_libelle`, `cursus_idClasse`, `cursus_idProfPrincipale`) VALUES
(43, 2022, 'A', 1, 31),
(44, 2020, 'A', 1, 31),
(45, 2022, 'A', 1, 48),
(46, 2020, 'A', 2, 35),
(47, 2021, 'A', 2, 31),
(48, 2020, 'A', 2, 31),
(49, 2021, 'A', 2, 35),
(50, 2022, 'A', 2, 31),
(51, 2020, 'A', 2, 31),
(52, 2020, 'A', 1, 31),
(53, 2021, 'A', 1, 31),
(54, 2022, 'A', 1, 35),
(55, 2021, 'A', 1, 35);

-- --------------------------------------------------------

--
-- Table structure for table `Cursus_Eleves`
--

CREATE TABLE `Cursus_Eleves` (
  `cursus_eleve_id` int(11) NOT NULL,
  `cursus_eleve_idCursus` int(11) NOT NULL,
  `cursus_eleve_idEleve` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Cursus_Eleves`
--

INSERT INTO `Cursus_Eleves` (`cursus_eleve_id`, `cursus_eleve_idCursus`, `cursus_eleve_idEleve`) VALUES
(81, 43, 32),
(82, 43, 33),
(83, 43, 34),
(84, 44, 36),
(85, 45, 36),
(86, 46, 32),
(87, 46, 39),
(88, 47, 36),
(89, 48, 39),
(90, 49, 39),
(91, 50, 37),
(92, 51, 37),
(93, 52, 32),
(94, 53, 32),
(95, 54, 38),
(96, 55, 32);

-- --------------------------------------------------------

--
-- Table structure for table `Cursus_Profs`
--

CREATE TABLE `Cursus_Profs` (
  `cursus_prof_id` int(11) NOT NULL,
  `cursus_prof_idCursus` int(11) NOT NULL,
  `cursus_prof_idProf` int(11) NOT NULL,
  `cursus_prof_idMatiere` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Cursus_Profs`
--

INSERT INTO `Cursus_Profs` (`cursus_prof_id`, `cursus_prof_idCursus`, `cursus_prof_idProf`, `cursus_prof_idMatiere`) VALUES
(119, 43, 31, 1),
(120, 43, 30, 3),
(121, 43, 29, 4),
(122, 43, 31, 5),
(123, 48, 48, 1),
(124, 49, 48, 1),
(125, 50, 31, 1),
(126, 51, 31, 1),
(127, 52, 31, 1),
(128, 53, 31, 1),
(129, 54, 35, 5),
(130, 55, 35, 5);

-- --------------------------------------------------------

--
-- Table structure for table `Evaluations`
--

CREATE TABLE `Evaluations` (
  `eval_id` int(11) NOT NULL,
  `eval_desc` varchar(200) NOT NULL,
  `eval_trimestre` int(11) NOT NULL,
  `eval_date` date NOT NULL,
  `eval_idCursus` int(11) NOT NULL,
  `eval_idProf` int(11) NOT NULL,
  `eval_idMatiere` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Evaluations`
--

INSERT INTO `Evaluations` (`eval_id`, `eval_desc`, `eval_trimestre`, `eval_date`, `eval_idCursus`, `eval_idProf`, `eval_idMatiere`) VALUES
(45, 'DS 1', 1, '2022-03-25', 43, 31, 1),
(46, 'DS 1', 2, '2022-03-25', 43, 31, 1),
(47, 'DS 1', 3, '2022-03-25', 43, 31, 1),
(48, 'DS 1', 1, '2022-03-25', 43, 30, 3),
(49, 'DS 1', 2, '2022-03-25', 43, 30, 3),
(50, 'DS 1', 3, '2022-03-25', 43, 30, 3),
(51, 'DS 1', 1, '2022-03-25', 43, 29, 4),
(52, 'DS 1', 2, '2022-03-25', 43, 29, 4),
(53, 'DS 1', 3, '2022-03-25', 43, 29, 4),
(54, 'DS 1', 1, '2022-03-25', 43, 31, 5),
(55, 'DS 1', 2, '2022-03-25', 43, 31, 5),
(56, 'DS 1', 3, '2022-03-25', 43, 31, 5);

-- --------------------------------------------------------

--
-- Table structure for table `Matieres`
--

CREATE TABLE `Matieres` (
  `matiere_id` int(11) NOT NULL,
  `matiere_libelle` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Matieres`
--

INSERT INTO `Matieres` (`matiere_id`, `matiere_libelle`) VALUES
(1, 'Mathématiques'),
(3, 'Anglais'),
(4, 'Français'),
(5, 'Physique-Chimie'),
(6, 'SVT'),
(7, 'Sport'),
(8, 'Technologie'),
(14, '         '),
(15, '                fdfsdf');

-- --------------------------------------------------------

--
-- Table structure for table `Notes`
--

CREATE TABLE `Notes` (
  `note_id` int(11) NOT NULL,
  `note_valeur` double DEFAULT NULL,
  `note_idEval` int(11) NOT NULL,
  `note_idEleve` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Notes`
--

INSERT INTO `Notes` (`note_id`, `note_valeur`, `note_idEval`, `note_idEleve`) VALUES
(174, 80, 46, 32),
(175, NULL, 46, 33),
(176, 50, 46, 34),
(177, 75, 47, 32),
(178, 80, 47, 33),
(179, 90, 47, 34),
(180, NULL, 50, 32),
(181, NULL, 50, 33),
(182, NULL, 50, 34),
(183, 88.52, 49, 32),
(184, 55.23, 49, 33),
(185, 12.23, 49, 34),
(186, 10, 48, 32),
(187, 100, 48, 33),
(188, 52.23, 48, 34),
(189, 53.23, 51, 32),
(190, NULL, 51, 33),
(191, NULL, 51, 34),
(192, 58.12, 52, 32),
(193, 95.5, 52, 33),
(194, 12.25, 52, 34),
(195, 100, 53, 32),
(196, 52, 53, 33),
(197, 15.25, 53, 34),
(198, NULL, 54, 32),
(199, NULL, 54, 33),
(200, NULL, 54, 34),
(201, 100, 55, 32),
(202, 100, 55, 33),
(203, 0, 55, 34),
(204, 90, 56, 32),
(205, 95.5, 56, 33),
(206, 99.99, 56, 34),
(210, 98.56, 45, 32),
(211, 65, 45, 33),
(212, 78, 45, 34);

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE `Users` (
  `user_id` int(11) NOT NULL,
  `user_nom` varchar(200) NOT NULL,
  `user_prenom` varchar(200) NOT NULL,
  `user_mdp` varchar(200) NOT NULL,
  `user_dateNaissance` date NOT NULL,
  `user_sexe` char(1) NOT NULL,
  `user_tel` varchar(200) NOT NULL,
  `user_mail` varchar(200) NOT NULL,
  `user_isProf` tinyint(1) NOT NULL DEFAULT 0,
  `user_isProviseur` tinyint(1) NOT NULL DEFAULT 0,
  `user_isAdministration` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Users`
--

INSERT INTO `Users` (`user_id`, `user_nom`, `user_prenom`, `user_mdp`, `user_dateNaissance`, `user_sexe`, `user_tel`, `user_mail`, `user_isProf`, `user_isProviseur`, `user_isAdministration`) VALUES
(22, 'GUCLU', 'Sefa', '123', '2022-03-30', 'M', '0626211507', 'sefagucluu@gmail.com', 1, 1, 1),
(29, 'ROUMANET', 'David', '28/10/2004', '1974-10-28', 'M', '06 12 15 45 12', 'davidroumanet@gmail.com', 1, 0, 0),
(30, 'LAGACHE', 'Francois', '24/03/1982', '1982-03-24', 'M', '06 26 55 12 45', 'ozohff@gmail.com', 1, 0, 0),
(31, 'CARDONA', 'Laurent', '123', '1965-04-29', 'F', '06 26 15 45 78', 'fsdfsdfsdkfjshd@gmail.com', 1, 0, 0),
(32, 'BENAISSA', 'Ilian', '23/03/2022', '2022-03-09', 'F', '06 26 21 15 07', 'sefaaguclu@gmail.com', 0, 0, 0),
(33, 'HILALI', 'Yanis', '123', '2022-03-30', 'F', ' ', 'f@gmail.com', 0, 0, 0),
(34, 'JESAISPAS', 'Ugo', '23/03/2022', '2022-03-23', 'M', '0626211507', 'test@gmail.com', 0, 0, 0),
(35, 'GUCLU', 'sefa', '20/04/2022', '2022-04-20', 'M', '06 26 21 15 07', 'sefaguclu@gmail.com', 1, 0, 0),
(36, 'GUCLU', 'sefa', '20/04/2022', '2022-04-20', 'M', '06 26 21 15 07', 'sefaguclu@gmail.com', 0, 0, 0),
(37, 'GUCLU', 'sefa', '27/04/2022', '2022-04-27', 'M', '0626211507', 'sefaguclu@gmail.com', 0, 0, 0),
(38, 'GUCLU', 'sefa', '21/04/2022', '2022-04-21', 'M', '06 26 21 15 07', 'sefaguclu@gmail.com', 0, 0, 0),
(39, 'GUCLU', 'sefa', '28/04/2022', '2022-04-28', 'M', '0626211507', 'sefaguclu@gmail.com', 0, 0, 0),
(40, 'GUCLU', 'sefa', '28/04/2022', '2022-04-28', 'M', '0626211507', 'sefaguclu@gmail.com', 0, 0, 0),
(41, 'GUCLUfsdfsdfsdfsfsf', 'sefa', '28/04/2022', '2022-04-28', 'M', '0626211507', 'sefaguclu@gmail.com', 0, 0, 0),
(42, 'GUCLU', 'sefa', '28/04/2022', '2022-04-28', 'M', '06 26 21 15 07', 'sefaguclu@gmail.com', 0, 0, 0),
(43, 'GUCLU', 'sefa', '21/04/2022', '2022-04-21', 'F', '0626211507', 'sefaguclu@gmail.com', 0, 0, 0),
(44, 'GUCLU', 'sefa', '15/04/2022', '2022-04-15', 'M', '06 26 21 15 07', 'sefaguclu@gmail.com', 0, 0, 0),
(45, 'GUCLU', 'sefa', '15/04/2022', '2022-04-15', 'M', '06 26 21 15 07', 'sefaguclu@gmail.com', 0, 0, 0),
(46, 'GUCLU', 'sefa', '01/04/2022', '2022-04-01', 'M', '06 26 21 15 07', 'sefaguclu@gmail.com', 0, 0, 0),
(47, 'GUCLU', 'sefa', '20/04/2022', '2022-04-20', 'M', '', 'sefaguclu@gmail.com', 0, 0, 0),
(48, 'GUCLU', 'sefa', '28/04/2022', '2022-04-28', 'M', '06 26 21 15 07', 'sefaguclu@gmail.com', 1, 0, 0),
(49, 'GUCLU', 'sefa', '28/04/2022', '2022-04-28', 'M', '06 26 21 15 07', 'sefaguclu@gmaildfgdfgdfgdgd.comgdfgdfg', 1, 0, 0),
(50, 'GUCLU', 'sefa', '28/04/2022', '2022-04-28', 'M', '06 26 21 15 07', 'dqsdqdq@gdfjksfhjhfsd', 1, 0, 0),
(51, 'GUCLU', 'sefa', '28/04/2022', '2022-04-28', 'M', '06 26 21 15 07', 'dqsdqdq@gdfjksfhjhfsd.ckhcsdcom', 1, 0, 0),
(52, 'GUCLU', 'sefa', '04/05/2022', '2022-05-04', 'M', '06 26 21 15 07', 'sefaguclu@gmail.com', 1, 0, 0),
(53, 'GUCLU', 'sefa', '04/05/2022', '2022-05-04', 'M', '06 26 21 15 07', 'sfsdfsdfefaguclsdfsdfsdfu@gmail.comffjk', 1, 0, 0),
(55, 'ADMIN', 'ADMIN', '123', '2022-04-06', 'F', '', 'admin@gmail.com', 0, 0, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Classes`
--
ALTER TABLE `Classes`
  ADD PRIMARY KEY (`classe_id`);

--
-- Indexes for table `Cursus`
--
ALTER TABLE `Cursus`
  ADD PRIMARY KEY (`cursus_id`),
  ADD KEY `cursus_idClasse` (`cursus_idClasse`),
  ADD KEY `cursus_idProfPrincipale` (`cursus_idProfPrincipale`);

--
-- Indexes for table `Cursus_Eleves`
--
ALTER TABLE `Cursus_Eleves`
  ADD PRIMARY KEY (`cursus_eleve_id`),
  ADD KEY `participation_idEleve` (`cursus_eleve_idEleve`),
  ADD KEY `participation_idCursus` (`cursus_eleve_idCursus`);

--
-- Indexes for table `Cursus_Profs`
--
ALTER TABLE `Cursus_Profs`
  ADD PRIMARY KEY (`cursus_prof_id`),
  ADD KEY `cursus_prof_idProf` (`cursus_prof_idProf`),
  ADD KEY `cursus_prof_idMatiere` (`cursus_prof_idMatiere`),
  ADD KEY `cursus_prof_idCursus` (`cursus_prof_idCursus`);

--
-- Indexes for table `Evaluations`
--
ALTER TABLE `Evaluations`
  ADD PRIMARY KEY (`eval_id`),
  ADD KEY `eval_idProf` (`eval_idProf`),
  ADD KEY `eval_idMatiere` (`eval_idMatiere`),
  ADD KEY `eval_idCursus` (`eval_idCursus`);

--
-- Indexes for table `Matieres`
--
ALTER TABLE `Matieres`
  ADD PRIMARY KEY (`matiere_id`);

--
-- Indexes for table `Notes`
--
ALTER TABLE `Notes`
  ADD PRIMARY KEY (`note_id`),
  ADD KEY `note_idEleve` (`note_idEleve`),
  ADD KEY `note_idEval` (`note_idEval`);

--
-- Indexes for table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Classes`
--
ALTER TABLE `Classes`
  MODIFY `classe_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `Cursus`
--
ALTER TABLE `Cursus`
  MODIFY `cursus_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT for table `Cursus_Eleves`
--
ALTER TABLE `Cursus_Eleves`
  MODIFY `cursus_eleve_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=97;

--
-- AUTO_INCREMENT for table `Cursus_Profs`
--
ALTER TABLE `Cursus_Profs`
  MODIFY `cursus_prof_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=131;

--
-- AUTO_INCREMENT for table `Evaluations`
--
ALTER TABLE `Evaluations`
  MODIFY `eval_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT for table `Matieres`
--
ALTER TABLE `Matieres`
  MODIFY `matiere_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `Notes`
--
ALTER TABLE `Notes`
  MODIFY `note_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=213;

--
-- AUTO_INCREMENT for table `Users`
--
ALTER TABLE `Users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Cursus`
--
ALTER TABLE `Cursus`
  ADD CONSTRAINT `Cursus_ibfk_1` FOREIGN KEY (`cursus_idClasse`) REFERENCES `Classes` (`classe_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Cursus_ibfk_2` FOREIGN KEY (`cursus_idProfPrincipale`) REFERENCES `Users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Cursus_Eleves`
--
ALTER TABLE `Cursus_Eleves`
  ADD CONSTRAINT `Cursus_Eleves_ibfk_1` FOREIGN KEY (`cursus_eleve_idCursus`) REFERENCES `Cursus` (`cursus_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Cursus_Eleves_ibfk_2` FOREIGN KEY (`cursus_eleve_idEleve`) REFERENCES `Users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Cursus_Profs`
--
ALTER TABLE `Cursus_Profs`
  ADD CONSTRAINT `Cursus_Profs_ibfk_1` FOREIGN KEY (`cursus_prof_idCursus`) REFERENCES `Cursus` (`cursus_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Cursus_Profs_ibfk_2` FOREIGN KEY (`cursus_prof_idMatiere`) REFERENCES `Matieres` (`matiere_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Cursus_Profs_ibfk_3` FOREIGN KEY (`cursus_prof_idProf`) REFERENCES `Users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Evaluations`
--
ALTER TABLE `Evaluations`
  ADD CONSTRAINT `Evaluations_ibfk_1` FOREIGN KEY (`eval_idCursus`) REFERENCES `Cursus` (`cursus_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Evaluations_ibfk_2` FOREIGN KEY (`eval_idMatiere`) REFERENCES `Matieres` (`matiere_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Evaluations_ibfk_3` FOREIGN KEY (`eval_idProf`) REFERENCES `Users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Notes`
--
ALTER TABLE `Notes`
  ADD CONSTRAINT `Notes_ibfk_2` FOREIGN KEY (`note_idEleve`) REFERENCES `Users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Notes_ibfk_3` FOREIGN KEY (`note_idEval`) REFERENCES `Evaluations` (`eval_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
