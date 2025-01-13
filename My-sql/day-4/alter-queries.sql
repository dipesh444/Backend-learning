USE amityuniversity;

SELECT * FROM student;

# adding a new column
ALTER TABLE student
ADD COLUMN subject VARCHAR(50);

ALTER TABLE student
ADD COLUMN shift VARCHAR(50),
ADD COLUMN phone_number VARCHAR(50);

ALTER TABLE student
ADD COLUMN subject VARCHAR(50) NOT NULL DEFAULT "Web devlopment";

#droping a new colum
ALTER TABLE student
DROP COLUMN subject;

#renaming table

ALTER TABLE student
RENAME TO student_table;
SELECT * FROM student_table;

ALTER TABLE student_table
RENAME TO student;

SELECT * FROM student;


# renaming a column
ALTER TABLE student
CHANGE name full_name VARCHAR(100);

# modifying column
ALTER TABLE student
MODIFY COLUMN marks INT;


#practice question
DELETE FROM  student WHERE marks < 80;

ALTER TABLE student
DROP COLUMN shift,
DROP COLUMN phone_number;







