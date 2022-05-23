-- -------------------------------------------------------------------------------------------
-- Schemas -----------------------------------------------------------------------------------
-- -------------------------------------------------------------------------------------------
CREATE DATABASE `sfy_dev` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `sfy_dev`;

-- -------------------------------------------------------------------------------------------
-- Tables ------------------------------------------------------------------------------------
-- -------------------------------------------------------------------------------------------

CREATE TABLE `sfy_dev`.`User` (
  `Id` char(36) NOT NULL DEFAULT (UUID()),
  `Name` mediumtext NOT NULL,
  `Email` varchar(320) NOT NULL,
  `Password` mediumtext NOT NULL,
  `CreatedBy` char(36) DEFAULT NULL,
  `CreatedOn` datetime NOT NULL DEFAULT (utc_timestamp()),
  `ModifiedBy` char(36) DEFAULT NULL,
  `ModifiedOn` datetime DEFAULT (utc_timestamp()),
  PRIMARY KEY (`Email`),
  UNIQUE KEY `uk_User_Id` (`Id`),
  CONSTRAINT `fk_user_id_user_createdby_id` FOREIGN KEY (`CreatedBy`) REFERENCES `User` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_user_id_user_modifiedby_id` FOREIGN KEY (`ModifiedBy`) REFERENCES `User` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TABLE `sfy_dev`.`UserSession` (
  `Id` char(36) NOT NULL,
  `UserId` char(36) NOT NULL,
  `LoggedInOn` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `LoggedOutOn` datetime DEFAULT NULL,
  PRIMARY KEY (`Id`),
  CONSTRAINT `fk_UserSession_UserId_User_Id` FOREIGN KEY (`UserId`) REFERENCES `User` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TABLE `sfy_dev`.`File` (
  `Id` char(36) NOT NULL DEFAULT (UUID()),
  `Name` text NOT NULL,
  `Type` int NOT NULL,
  `CreatedBy` char(36) NOT NULL,
  `CreatedOn` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`),
  CONSTRAINT `fk_File_CreatedBy_User_Id` FOREIGN KEY (`CreatedBy`) REFERENCES `User` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE `sfy_dev`.`FileShare` (
  `Id` char(36) NOT NULL DEFAULT (UUID()),
  `Code` char(6) NOT NULL,
  `FileId` char(36) NOT NULL,
  `SharedOn` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Code`),
  UNIQUE KEY `uk_FileShare_Id` (`Id`),
  UNIQUE KEY `uk_FileShare_FileId` (`FileId`),
  CONSTRAINT `fk_FileShare_FileId_File_Id` FOREIGN KEY (`FileId`) REFERENCES `File` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE
);

-- -------------------------------------------------------------------------------------------
-- Procs -------------------------------------------------------------------------------------
-- -------------------------------------------------------------------------------------------


DROP PROCEDURE IF EXISTS `sfy_dev`.`udsp_UserSession_Create`;

DELIMITER $$
CREATE PROCEDURE `sfy_dev`.`udsp_UserSession_Create`(
 	var_EmailAddress varchar(320),
	var_Password mediumtext
)
BEGIN
	DECLARE error_AccessDenied CONDITION FOR SQLSTATE '28000'; 
	DECLARE var_SessionId VARCHAR(36);
	DECLARE var_UserId VARCHAR(36);
 	
	SET var_EmailAddress = TRIM(IFNULL(var_EmailAddress, ''));
 	SET var_Password = TRIM(IFNULL(var_Password, ''));
 	
 	IF(NOT(var_EmailAddress = '' OR var_Password = '')) THEN
		SELECT Id into var_UserId FROM User 
 	 	WHERE `Email`= var_EmailAddress 
 	 	AND `Password`= SHA2(var_Password, 256);
 	END IF;
 	
 	SET var_UserId = TRIM(IFNULL(var_UserId, ''));
 	
 	IF(var_UserId = '') THEN
		SIGNAL error_AccessDenied
		SET MESSAGE_TEXT = 'User does not exists', MYSQL_ERRNO = 1045;
	END IF;
 	
	SET var_SessionId = UUID();
	
	UPDATE `UserSession` SET `LoggedOutOn`= CURRENT_TIMESTAMP
	WHERE `UserId` = var_UserId;

	INSERT INTO `UserSession`
	(`Id`, `UserId`)
	VALUES
	(var_SessionId, var_UserId);
 	
 	SELECT var_SessionId AS SessionId, var_UserId AS UserId;
END $$
DELIMITER ;


DROP PROCEDURE IF EXISTS `sfy_dev`.`udsp_Files_Retrieve`;

DELIMITER $$
CREATE PROCEDURE `sfy_dev`.`udsp_Files_Retrieve`(
  var_Type int,
  var_Offset int,
  var_Size int
)
BEGIN 

	SET var_Type = IFNULL(var_Type, -1);
	SET var_Offset = IFNULL(var_Offset, 0);
	SET var_Size = IFNULL(var_Size, 10);
 	
 	SELECT `F`.`Id`, `Name`, `Code` FROM `File` as `F`
    LEFT JOIN `FileShare` as `FS` ON `F`.`Id` = `FS`.`FileId`
    WHERE (var_Type = -1 OR `F`.`Type` = var_Type)
    ORDER BY `CreatedOn` DESC
    LIMIT var_Size OFFSET var_Offset;

  SELECT COUNT(*) AS `Count` FROM `File` WHERE (var_Type = -1 OR `Type` = var_Type);

END $$
DELIMITER ;

-- -------------------------------------------------------------------------------------------
-- Seed Data ---------------------------------------------------------------------------------
-- -------------------------------------------------------------------------------------------


INSERT INTO `sfy_dev`.`User`
(`Id`, `Name`, `Email`, `Password`)
VALUES
(UUID(), "System User", "system@sfy.com", SHA2("san", 256));


