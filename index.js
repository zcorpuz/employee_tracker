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
    if (err) throw err
});

const startApp = () => {
    inquirer
        .prompt({
            name: "action",
            type: "rawlist",
            message: "What would you like to do?",
            choices: [
                "Add New Department",
                "Add New Employee",
                "View List of Employees",
                "Update Employee"
            ]
        });
}