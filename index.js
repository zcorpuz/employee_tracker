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
};

const viewEmployees = () => {
    connection.query("SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id", (err, res) => {
        if (err) throw err;

        console.table(res);
        startApp();
    })
};

// const deptList = [];
// const employeeList = [];

// const init = async () => {
//     const startAnswer = await inquirer.prompt(startApp);
//     const { action } = startAnswer;

//     if(action === 'Add New Department') {
//         const deptAnswer = await inquirer.prompt(addDept);

//         const newDept = new Department (name);
//         deptList.push(newDept);
//     } else if (action === 'Add New Role') {
//         const roleAnswer = await inquirer.prompt(addRole);

//         const newRole = new Role (title, salary, deptId);
//     } else if (action === 'Add New Employee') {
//         const employeeAnswer = await inquirer.prompt(addEmployee);

//         const newEmployee = new Employee (firstName, lastName, roleId, managerId);
//         employeeList.push(newEmployee);
//     } else if (action === 'View List of Employees') {
//         //Add function so that user can view whole employee list. This would through console.table.
//     } else if (action === 'Update Employee') {
//         //Add function so that user can update employee
//     }
// };

// init();

