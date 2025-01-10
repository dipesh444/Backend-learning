CREATE DATABASE IF NOT EXISTS amityuniversity;

USE amityuniversity;

SET SQL_SAFE_UPDATES = 0; 

CREATE TABLE STUDENT (
rollno INT PRIMARY KEY,
name VARCHAR(20),
marks INT NOT NULL,
grade VARCHAR(20),
city VARCHAR(20)
);

INSERT INTO STUDENT (rollno, name, marks, grade, city) VALUES
(1, 'Aman Sharma', 85, 'A', 'Delhi'),
(2, 'Priya Verma', 92, 'A', 'Mumbai'),
(3, 'Rahul Mehta', 76, 'B', 'Chennai'),
(4, 'Anjali Gupta', 88, 'A', 'Kolkata'),
(5, 'Rohit Singh', 63, 'C', 'Jaipur'),
(6, 'Neha Kapoor', 95, 'A', 'Pune'),
(7, 'Arjun Reddy', 70, 'B', 'Hyderabad'),
(8, 'Kriti Jain', 81, 'A', 'Ahmedabad'),
(9, 'Vikram Malhotra', 55, 'D', 'Bangalore'),
(10, 'Sneha Roy', 89, 'A', 'Lucknow');

# to fetch all data from student table
SELECT * FROM STUDENT;

# to fetch specific column  data from student table
SELECT rollno, name FROM STUDENT;

# to fetch distinct value form specific column 
SELECT DISTINCT grade FROM STUDENT;

# fetch data bsed on condition
SELECT * FROM STUDENT WHERE marks >= 80;

SELECT * FROM STUDENT WHERE grade = "A";

#limit gives you specific limit data
SELECT * FROM STUDENT LIMIT 5;

SELECT * FROM STUDENT 
WHERE marks > 90 AND city = "Mumbai";

SELECT * FROM STUDENT 
WHERE marks < 80 OR city = "Mumbai";

# check for added value and give data
SELECT * FROM STUDENT 
WHERE city IN("Mumbai","Delhi","GURgaon");

SELECT * FROM STUDENT 
WHERE marks BETWEEN 80 AND 90;



SELECT * FROM STUDENT 
ORDER BY marks DESC;

SELECT * FROM STUDENT 
ORDER BY marks ASC LIMIT 3;

SELECT * FROM STUDENT 
ORDER BY grade ASC;

SELECT AVG(marks) AS Student_Avg_Marks FROM STUDENT;

SELECT SUM(marks) AS Student_Sum_Marks FROM STUDENT;

SELECT COUNT(*) AS Student_Count FROM STUDENT;


SELECT city FROM STUDENT GROUP BY city;
SELECT city, AVG(marks) AS avg_marks  FROM STUDENT GROUP BY city;

SELECT city, AVG(marks) AS avg_marks FROM STUDENT GROUP BY city ORDER BY  city ASC;

CREATE TABLE payment (
    customer_id INT PRIMARY KEY,
    customer VARCHAR(255),
    mode VARCHAR(50),
    city VARCHAR(100)
);

INSERT INTO payment (customer_id, customer, mode, city) VALUES
(101, 'Olivia Barrett', 'Netbanking', 'Portland'),
(102, 'Ethan Sinclair', 'Credit Card', 'Miami'),
(103, 'Maya Hernandez', 'Credit Card', 'Seattle'),
(104, 'Liam Donovan', 'Netbanking', 'Denver'),
(105, 'Sophia Nguyen', 'Credit Card', 'New Orleans'),
(106, 'Caleb Foster', 'Debit Card', 'Minneapolis'),
(107, 'Ava Patel', 'Debit Card', 'Phoenix'),
(108, 'Lucas Carter', 'Netbanking', 'Boston'),
(109, 'Isabella Martinez', 'Netbanking', 'Nashville'),
(110, 'Jackson Brooks', 'Credit Card', 'Boston');


SELECT mode, COUNT(mode) FROM payment GROUP BY mode;
SELECT mode,customer, COUNT(mode) FROM payment GROUP BY mode,customer;


SELECT city, COUNT(*) AS student_count FROM
STUDENT  GROUP BY city 
HAVING MAX(marks) > 90;



-- update query

UPDATE STUDENT SET grade = "F" WHERE grade = 'A';

UPDATE STUDENT SET marks = marks +1;

CREATE TABLE departments (
    dept_id INT PRIMARY KEY,
    dept_name VARCHAR(100)
);

INSERT INTO departments (dept_id, dept_name) VALUES
(1, 'HR'),
(2, 'IT'),
(3, 'Finance');


CREATE TABLE employees (
    emp_id INT PRIMARY KEY,
    emp_name VARCHAR(100),
    dept_id INT,
    FOREIGN KEY (dept_id) REFERENCES departments(dept_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);


INSERT INTO employees (emp_id, emp_name, dept_id) VALUES
(101, 'Alice', 1),
(102, 'Bob', 2),
(103, 'Charlie', 3);