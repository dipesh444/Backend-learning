CREATE DATABASE IF NOT EXISTS google;

USE google;

CREATE TABLE employess(
EmployeeId INT PRIMARY KEY,
FirstNAME VARCHAR(20),
LastName VARCHAR(20),
Age INT,
Salary DECIMAL
);

INSERT INTO employess(EmployeeId,FirstNAME,LastName,Age,Salary) VALUES (1,"DIPESH","PATIL",26,100000);

SELECT * FROM employess;