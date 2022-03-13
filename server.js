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
  employeeDB();
});

console.table("-------------Employee Manager----------");
//Starting inquirer prompt for employee database

function employeeDB() {
  inquirer.prompt([
    {
    name: "newQuery", 
    type: "list", 
    message: "What would you like to do?", 
    choices: ["View All Employees", "Add Employee", "Update Employee Role", new inquirer.Separator(), "View All Roles", "Add Role",  new inquirer.Separator(), "View All Departments", "Add Department", "Exit"],
    },
    
  ])
  .then(answers => {
    switch('Answer:', answers.newQuery) {

      case 'View All Employees':
        viewAllEmployees();
      break;

      case "Add Employee":
        addEmployee();
      break;

      case "Update Employee Role":
        updateEmployeeRole();
      break;

      case "View All Roles":
        viewAllRoles();
      break;

      case "Add Role":
        addRole();
      break;

      case "View All Departments":
        viewAllDepartments();
      break;

      case "Add Department":
        addDepartment();
      break;

      case "Exit":
        console.log("Bye");
      break;
    }
  });

};

function viewAllEmployees() {
  db.query("SELECT * FROM employee",  
  function (err, result) {
    if (err) throw err;
    console.log("----------Employee List----------");
    console.table(result)
    employeeDB();
  })
}


   