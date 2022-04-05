-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: mysql-asimov.alwaysdata.net
-- Generation Time: Apr 05, 2022 at 11:24 AM
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

-- --------------------------------------------------------

--
-- Table structure for table `Cursus_Eleves`
--

CREATE TABLE `Cursus_Eleves` (
  `cursus_eleve_id` int(11) NOT NULL,
  `cursus_eleve_idCursus` int(11) NOT NULL,
  `cursus_eleve_idEleve` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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

-- --------------------------------------------------------

--
-- Table structure for table `Matieres`
--

CREATE TABLE `Matieres` (
  `matiere_id` int(11) NOT NULL,
  `matiere_libelle` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
  MODIFY `classe_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Cursus`
--
ALTER TABLE `Cursus`
  MODIFY `cursus_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Cursus_Eleves`
--
ALTER TABLE `Cursus_Eleves`
  MODIFY `cursus_eleve_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Cursus_Profs`
--
ALTER TABLE `Cursus_Profs`
  MODIFY `cursus_prof_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Evaluations`
--
ALTER TABLE `Evaluations`
  MODIFY `eval_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Matieres`
--
ALTER TABLE `Matieres`
  MODIFY `matiere_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Notes`
--
ALTER TABLE `Notes`
  MODIFY `note_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Users`
--
ALTER TABLE `Users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT;

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
