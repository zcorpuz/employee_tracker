USE exmployeeDB

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
    ('Keziah', 'Sparrow', 1, 1);
    ('Dwayne', 'Johnson', 2, NULL);
    ('Richard', 'Hendricks', 3, 2);
    ('Phil', 'Knight', 4, NULL);
    ('Ron', 'Temple', 5, NULL);
    ('Janet', 'Peterson', 6, NULL);
    ('Dion', 'Mayer', 7, 3);
    ('Ashley', 'Rush', 8, NULL);