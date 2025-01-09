
USE college;

#create table
CREATE TABLE student(
rollno INT PRIMARY KEY,
name VARCHAR(50)
);


#insert data in table

INSERT INTO student (rollno,name) VALUES (1,"dipesh"),(2,"bhavesh");

#select data
SELECT * FROM student;

#delete table
DROP TABLE student;
