-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: mysql-asimov.alwaysdata.net
-- Generation Time: Mar 07, 2022 at 03:35 PM
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
  `cursus_anneeScolaire` date NOT NULL,
  `cursus_idClasse` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
(2, 'Histoire-Géographie'),
(3, 'Anglais'),
(4, 'Français'),
(5, 'Physique-Chimie'),
(6, 'SVT'),
(7, 'Sport'),
(8, 'Technologie'),
(9, 'Musique'),
(10, 'Art-Plastique');

-- --------------------------------------------------------

--
-- Table structure for table `Notes`
--

CREATE TABLE `Notes` (
  `note_id` int(11) NOT NULL,
  `note_valeur` int(11) NOT NULL,
  `note_date` date NOT NULL,
  `note_isAbsent` tinyint(1) NOT NULL,
  `note_idParticipation` int(11) NOT NULL,
  `note_idProf` int(11) NOT NULL,
  `note_idMatiere` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `ParticipationCursus`
--

CREATE TABLE `ParticipationCursus` (
  `participation_id` int(11) NOT NULL,
  `participation_idCursus` int(11) NOT NULL,
  `participation_idEleve` int(11) NOT NULL
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
  `usert_sexe` char(1) NOT NULL,
  `user_tel` varchar(200) NOT NULL,
  `user_mail` varchar(200) NOT NULL,
  `user_isProf` tinyint(1) NOT NULL,
  `user_isProfPrincipal` tinyint(1) NOT NULL,
  `user_isProviseur` tinyint(1) NOT NULL,
  `user_isAdministration` tinyint(1) NOT NULL,
  `user_idMatiere` int(11) NOT NULL
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
  ADD KEY `cursus_idClasse` (`cursus_idClasse`);

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
  ADD KEY `note_idProf` (`note_idProf`),
  ADD KEY `note_idParticipation` (`note_idParticipation`),
  ADD KEY `note_idMatiere` (`note_idMatiere`);

--
-- Indexes for table `ParticipationCursus`
--
ALTER TABLE `ParticipationCursus`
  ADD PRIMARY KEY (`participation_id`),
  ADD KEY `participation_idEleve` (`participation_idEleve`),
  ADD KEY `participation_idCursus` (`participation_idCursus`);

--
-- Indexes for table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`user_id`),
  ADD KEY `user_idMatiere` (`user_idMatiere`);

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
  MODIFY `cursus_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Matieres`
--
ALTER TABLE `Matieres`
  MODIFY `matiere_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `Notes`
--
ALTER TABLE `Notes`
  MODIFY `note_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ParticipationCursus`
--
ALTER TABLE `ParticipationCursus`
  MODIFY `participation_id` int(11) NOT NULL AUTO_INCREMENT;

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
  ADD CONSTRAINT `Cursus_ibfk_1` FOREIGN KEY (`cursus_idClasse`) REFERENCES `Classes` (`classe_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Notes`
--
ALTER TABLE `Notes`
  ADD CONSTRAINT `Notes_ibfk_1` FOREIGN KEY (`note_idMatiere`) REFERENCES `Matieres` (`matiere_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Notes_ibfk_2` FOREIGN KEY (`note_idParticipation`) REFERENCES `ParticipationCursus` (`participation_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Notes_ibfk_3` FOREIGN KEY (`note_idProf`) REFERENCES `Users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `ParticipationCursus`
--
ALTER TABLE `ParticipationCursus`
  ADD CONSTRAINT `ParticipationCursus_ibfk_1` FOREIGN KEY (`participation_idCursus`) REFERENCES `Cursus` (`cursus_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `ParticipationCursus_ibfk_2` FOREIGN KEY (`participation_idEleve`) REFERENCES `Users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Users`
--
ALTER TABLE `Users`
  ADD CONSTRAINT `Users_ibfk_1` FOREIGN KEY (`user_idMatiere`) REFERENCES `Matieres` (`matiere_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
