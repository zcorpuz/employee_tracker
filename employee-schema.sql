CREATE database employeeDB;

USE employeeDB;

CREATE TABLE employee (
    id INT NOT NULL,
    first_name VARCHAR(30) NULL,
    last_name VARCHAR(30) NULL,
    role_id INT,
    manager_id INT,
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INT NOT NULL,
    title VARCHAR(30) NULL,
    salary DECIMAL(7,2) NULL,
    department_id INT,
    PRIMARY KEY (id)
);

CREATE TABLE department {
    id INT NOT NULL,
    name VARCHAR(30) NULL,
    PRIMARY KEY (id)
};

SELECT * FROM employee;
SELECT * FROM role;
SELECT * FROM department;