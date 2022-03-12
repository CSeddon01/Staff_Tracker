// Dependencies used by this module
const cTable = require('console.table');
const inquirer = require('inquirer');
const mysql = require('mysql2');

//Creates connection to mysql 
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: "Ez2guess",
    database: 'employees'
  });

db.connect(function (err) {
  if (err) {
    throw err;
  }
  prompt();
});

console.table("-------------Employee Manager----------");
//Starting inquirer prompt for employee database

  inquirer.prompt([
    {
    name: "newQuery", 
    type: "list", 
    message: "What would you like to do??", 
    choices: ["View All Employees", "Add Employee", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department"],
    },
    
  ])
  .then(answers => {
    console.table('Anser:', answers.name);
  });


