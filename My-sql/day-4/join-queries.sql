CREATE TABLE students (
id INT PRIMARY KEY,
name VARCHAR(50)
);

INSERT INTO students(id,name) VALUES
(101,"dipesh"),
(102,"bhavesh"),
(103,"devesh");

CREATE TABLE course (
id INT PRIMARY KEY,
caourse VARCHAR(50)
);

INSERT INTO course(id,caourse) VALUES
(102,"javascript"),
(105,"angular"),
(103,"python"),
(107,"node js");

# INNER join

SELECT * FROM students INNER JOIN course ON 
students.id = course.id;

# left join

SELECT * FROM students LEFT JOIN course ON 
students.id = course.id;

#right join

SELECT * FROM students RIGHT JOIN course ON 
students.id = course.id;

#FULL JOIN

SELECT * FROM students LEFT JOIN course ON 
students.id = course.id
UNION
SELECT * FROM students RIGHT JOIN course ON 
students.id = course.id;
