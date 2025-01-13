SELECT * FROM student;

#students marks find but vo avg sai above ho


SELECT full_name, rollno FROM student WHERE marks > (SELECT AVG(marks) from student);


#find even roll no 
# apply condition IN

SELECT full_name , rollno FROM student WHERE rollno IN (SELECT rollno from student WHERE rollno % 2 = 0);

# FROM
# find the marks from students of delhi
SELECT MAX(marks) FROM (SELECT * FROM student WHERE city = "delhi") as temp;