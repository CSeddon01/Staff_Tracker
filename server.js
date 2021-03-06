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
    choices: ["View All Employees", "Add Employee", "Update Employee Role", "View All Roles", "Add Role",  "View All Departments", "Add Department", "View Budget", "Update Manager", "Exit", new inquirer.Separator()],
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

      case "View Budget":
        viewBudget();
      break;

      case "Update Manager":
        updateManager();
      break;

      case "Exit":
        quitBD();
      break;
    }
  });

};

//View all employees
function viewAllEmployees() {
  db.query("SELECT employee.role_id, employee.first_name, employee.last_name, roles.title, roles.salary, employee.manager_id FROM employee JOIN roles ON employee.id = roles.id",  
  function (err, result) {
    if (err) throw err;
    console.log("----------Employee List----------");
    console.table(result)
    employeeDB();
  })
};
//View all roles
function viewAllRoles() {
  db.query("SELECT roles.id, roles.title, roles.salary, department.name AS department, department.id FROM roles JOIN department ON roles.id = department.id",  
  function (err, result) {
    if (err) throw err;
    console.log("----------Role List----------");
    console.table(result)
    employeeDB();
  })
};
//View all departments
function viewAllDepartments() {
  db.query("SELECT department.id, department.name AS department FROM department",  
  function (err, result) {
    if (err) throw err;
    console.log("----------Department List----------");
    console.table(result)
    employeeDB();
  })
};   
//Add new employee to database
function addEmployee() {
  
   inquirer.prompt([
     {
       name: "first_name",
       type: "input",
       message: "Enter first name of new employee:"
     }, 
     {
       name: "last_name", 
       type: "input", 
       message: "Enter last name of new employee:"
     }, 
     {
       name: "role_id", 
       type: "list", 
       message: "Select role of new employee: 1. Accountant, 2. Administrator 3. Sales 4. Customer Service 5. Legal", 
       choices: ["1", "2", "3", "4", "5"]
     },
     {
       name: "manager_id",
       type: "list",
       message: "Select manager id: ",
       choices: ["1", "2", "3", "4", "5"]
     },
   ]).then(function(answer) {
    db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${answer.first_name}', '${answer.last_name}', '${answer.role_id}', '${answer.manager_id}')`, (err, res) => {
      if (err) throw err;

      console.log("New employee added: " + answer.first_name + " " + answer.last_name);
      employeeDB();
    }) 
  })
};

//Add role 
function addRole() {
  inquirer.prompt([
    {
      name: "addRole",
      type: "input", 
      message: "What is the name of the role?"
    },
    {
      name: "addRoleSalary",
      type: "input", 
      message: "What is the salary of the role?"
    },
    {
      name: "addRoleDeptId",
      type: "input", 
      message: "What is the department ID of the role?"
    },
  ]).then(function(answer) {
    db.query(`INSERT INTO roles (title, salary, department_id) VALUES ('${answer.addRole}', '${answer.addRoleSalary}', '${answer.addRoleDeptId}')`, (err, res) => {
      if (err) throw err;
      console.log("New role added: " + answer.addRole + " " + answer.addRoleSalary);
      employeeDB();
    }) 
  })
};
//Add department
function addDepartment() {
  inquirer.prompt([
    {
      name: "addDept",
      type: "input",
      message: "What is the name of the department?"
    },
  ]).then(function(answer) {
    db.query(`INSERT INTO department (name) VALUES ('${answer.addDept}')`, (err, res) => {
      if (err) throw err;
      console.log("New department added: " + answer.addDept);
      employeeDB();
    }) 
  })
};
//Update employee role
function updateEmployeeRole() {
  db.query("SELECT * FROM employee", (err, res) => {
    if (err) throw err;
 
  inquirer.prompt([
   {
     name: "selectEmp",
     type: "list", 
     message: "Which employee would you like to update?",
     choices: res.map(res => res.role_id + " " + res.first_name + " " + res.last_name)
   },
  ]).then(employee => {
    let empId = employee.selectEmp.split('')[0];

    db.query("SELECT * FROM employee", (err, res) => {
      if (err) throw err;
      inquirer.prompt([
        {
          name: "newRole", 
          type: "list", 
          message: "What is the new role id:",
          choices: ["1", "2", "3", "4", "5"]
        },
      ]).then(newRole => {
        let roleId = newRole.newRole.split("")[0];
        console.log("New role changed to:" + roleId);
        db.query("UPDATE employee SET role_id = ? WHERE id = ?", [roleId, empId],
        (err, res) => {
          if (err) throw err;
        }
        );
        employeeDB();
      });
    });
});
})};
//Update employee manager
function updateManager() {
  db.query("SELECT * FROM employee", (err, res) => {
    if (err) throw err;
 
  inquirer.prompt([
   {
     name: "selectEmp",
     type: "list", 
     message: "Which employee would you like to update?",
     choices: res.map(res => res.role_id + " " + res.first_name + " " + res.last_name)
   },
  ]).then(employee => {
    let empdId = employee.selectEmp.split('')[0];

    db.query("SELECT * FROM employee", (err, res) => {
      if (err) throw err;
      inquirer.prompt([
        {
          name: "newManager", 
          type: "list", 
          message: "What is the new role id:",
          choices: ["1", "2", "3", "4", "5"]
        },
      ]).then(newManager => {
        let managerId = newManager.newManager.split("")[0];
        console.log("New manager role id changed to:" + managerId);
        db.query("UPDATE employee SET manager_id = ? WHERE id = ?", [managerId, empdId],
        (err, res) => {
          if (err) throw err;
        }
        );
        employeeDB();
      });
    });
});
})};

//function to view budget 
function viewBudget() {
  db.query("SELECT SUM(salary) FROM roles",  
  function (err, result) {
    if (err) throw err;
    console.log("----------Department Budget----------");
    console.table(result)
    employeeDB();
  })
};   

//function to exit database   
function quitBD() {
  console.log("Bye");
  db.end();
};