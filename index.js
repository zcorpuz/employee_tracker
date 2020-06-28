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
const startApp = {
    name: "action",
    type: "rawlist",
    message: "What would you like to do?",
    choices: [
        "Add New Department",
        "Add New Role",
        "Add New Employee",
        "View List of Employees",
        "Update Employee"
    ]
};

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
};

// Add Role Inquirer Prompt
const addRole = () => {
    inquirer
        .prompt({
            name: "title",
            type: "input",
            message: "What is the title of the position you would like to add?",
            validate: (answer) => {
                if (answer.length < 1) {
                    return 'Please enter a valid title';
                }
                return true;
            },
            name: "salary",
            type: "input",
            message: "What is the salary for this position?",
            validate: (answer) => {
                if (answer.length < 1) {
                    return 'Please enter a valid salary';
                }
                return true;
            },
            name: "deptId",
            type: "input",
            message: "What is the department id for this title?",
            validate: (answer) => {
                if (answer.length < 1) {
                    return 'Please enter a valid department id';
                }
                return true;
            },
        })
};

// Add Employee Inquirer Prompt
const addEmployee = () => {
    inquirer
        .prompt({
            name: "firstName",
            type: "input",
            message: "What is the employee's first name?",
            validate: (answer) => {
                if (answer.length < 1) {
                    return 'Please enter a valid first name';
                }
                return true;
            },
            name: "lastName",
            type: "input",
            message: "What is the employee's last name?",
            validate: (answer) => {
                if (answer.length < 1) {
                    return 'Please enter a valid last name';
                }
                return true;
            },
            name: "roleId",
            type: "input",
            message: "What is the employee's role id?",
            validate: (answer) => {
                if (answer.length < 1) {
                    return 'Please enter a valid role id';
                }
                return true;
            },
        })
};

const init = async () => {
    const startAnswer = await inquirer.prompt(startApp);
    const { action } = startAnswer;

    if(action === 'Add New Department') {
        addDept();
    } else if (action === 'Add New Role') {
        addRole();
    } else if (action === 'Add New Employee') {
        addEmployee();
    } else if (action === 'View List of Employees') {
        //Add function so that user can view whole employee list. This would through console.table.
    } else if (action === 'Update Employee') {
        //Add function so that user can update employee
    }
};

init();

