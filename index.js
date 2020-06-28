// Require Constructor Classes from Lib folder
const Department = require("./lib/dept");
const Role = require("./lib/role");
const Employee = require("./lib/employee");
// Require Dependencies for Application
const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

const connection = mysql.createConnection({
    port: 3306,
    user: 'root',
    password: 'Finally08',
    database: 'employeeDB'
});

connection.connect(err => {
    if (err) throw err;
});

// Inquirer question prompt for the beginning of application
const startApp = () => {
    inquirer
        .prompt({
            name: "action",
            type: "rawlist",
            message: "What would you like to do?",
            choices: [
                "Add New Department",
                "Add New Role",
                "Add New Employee",
                "View List of Employees",
                "Update an Employee's Role"
            ]
        })
        .then(answers => {
            switch (answers.action) {
                case 'Add New Department':
                    addDept();
                    break;

                case 'Add New Role':
                    addRole();
                    break;

                case 'Add New Employee':
                    addEmployee();
                    break;

                case 'View List of Employees':
                    viewEmployees();
                    break;
                
                case "Update an Employee's Role":
                    updateEmployee();
                    break;
            }
        })
};

startApp();

// Add Department Inquirer Prompt
const addDept = () => {
    inquirer
        .prompt({
            name: "deptName",
            type: "input",
            message: "What is the name of the department that you would like to add?",
            validate: (answer) => {
                if (answer.length < 1) {
                    return 'Please enter a valid department name';
                }
                return true;
            },
        })
        .then(response => {
            connection.query("INSERT INTO department SET ?",
            {
                name: response.deptName
            }, 
            (err, res) => {
                if (err) throw err;
                console.log(`${response.deptName} added!`);
                startApp();
            });
        });
};

// Add Role Inquirer Prompt
const addRole = () => {
    inquirer
        .prompt([
            {
                name: "title",
                type: "input",
                message: "What is the title of the position you would like to add?",
                validate: (answer) => {
                    if (answer.length < 1) {
                        return 'Please enter a valid title';
                    }
                    return true;
                },
            },
            {
                name: "salary",
                type: "input",
                message: "What is the salary for this position?",
                validate: (answer) => {
                    if (answer.length < 1) {
                        return 'Please enter a valid salary';
                    }
                    return true;
                },
            },
            {
                name: "deptId",
                type: "input",
                message: "What is the department id for this title?",
                validate: (answer) => {
                    if (answer.length < 1) {
                        return 'Please enter a valid department id';
                    }
                    return true;
                }
            }
        ])
        .then(response => {
            connection.query("INSERT INTO role SET ?",
            {
                title: response.title,
                salary: parseInt(response.salary),
                department_id: parseInt(response.deptId)
            },
            (err, res) => {
                if (err) throw err;
                console.log(`${response.title} added!`);
                startApp();
            });
        });
};
     


// Add Employee Inquirer Prompt
const addEmployee = () => {
    inquirer
        .prompt([
            {
                name: "firstName",
                type: "input",
                message: "What is the employee's first name?",
                validate: (answer) => {
                    if (answer.length < 1) {
                        return 'Please enter a valid first name';
                    }
                    return true;
                },
            },
            {
                name: "lastName",
                type: "input",
                message: "What is the employee's last name?",
                validate: (answer) => {
                    if (answer.length < 1) {
                        return 'Please enter a valid last name';
                    }
                    return true;
                }
            },
            {
                name: "roleId",
                type: "input",
                message: "What is the employee's role id?",
                validate: (answer) => {
                    if (answer.length < 1) {
                        return 'Please enter a valid role id';
                    }
                    return true;
                },
            }
        ])
        .then(response => {
            connection.query("INSERT INTO employee SET ?",
            {
                first_name: response.firstName,
                last_name: response.lastName,
                role_id: parseInt(response.roleId)
            },
            (err, res) => {
                if (err) {
                    console.log('Invalid ID Number. Please try again.');
                    addEmployee();
                    return;
                }
                console.log(`${response.firstName} ${response.lastName} added!`);
                startApp();
            });
        });
};

const viewEmployees = () => {
    connection.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id", (err, res) => {
        if (err) throw err;

        console.table(res);
        startApp();
    })
};

const updateEmployee = () => {
    inquirer
        .prompt([
           { 
                name: "employeeId",
                type: "input",
                message: "What is the id number of the employee that you would like to change?",
                validate: (answer) => {
                    if (answer.length < 1) {
                        return 'Please enter a valid id number';
                    }
                    return true;
                },
            },
            { 
                name: "newRoleId",
                type: "input",
                message: "What is the new role id number for the employee?",
                validate: (answer) => {
                    if (answer.length < 1) {
                        return 'Please enter a valid id number';
                    }
                    return true;
                },
            },
        ])
        .then(response => {
            let targetEmployee = response.employeeId;
            let newRoleId = response.newRoleId;
            connection.query(`UPDATE employee SET role_id = ${newRoleId} WHERE id = ${targetEmployee}`,
            (err, res) => {
                if (err) {
                    console.log('Invalid ID Number. Please try again.');
                    updateEmployee();
                    return;
                }
                console.log(`Employee updated!`);
                startApp();
            });
        });
};

