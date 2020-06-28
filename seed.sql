USE employeeDB;

INSERT INTO department(name)
VALUES ('Sales'),('Engineering'),('Finance'),('Legal');

INSERT INTO role(title, salary, department_id)
VALUES
    ('Account Manager', 100000, 1),
    ('Sales Executive', 75000, 1),
    ('Lead Engineer', 150000, 2),
    ('Software Engineer', 110000, 2),
    ('Financial Analyst', 85000, 3),
    ('Accountant', 70000, 3),
    ('Counsel', 180000, 4),
    ('Law Clerk', 45000, 4);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES
    ('Keziah', 'Sparrow', 1, NULL),
    ('Dwayne', 'Johnson', 2, 1),
    ('Richard', 'Hendricks', 3, NULL),
    ('Phil', 'Knight', 4, 3),
    ('Ron', 'Temple', 5, NULL),
    ('Janet', 'Peterson', 6, NULL),
    ('Dion', 'Mayer', 7, NULL),
    ('Ashley', 'Rush', 8, 7);