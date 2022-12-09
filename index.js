//Imports
const inquirer = require("inquirer");
const fs = require("fs");
const path = require("path");
const db = require("./lib/dbConnection");
const { query } = require("./lib/dbConnection");

const init = function () {
  inquirer
    .prompt([
      {
        type: "list",
        name: "userOption",
        message: "Select one of the options below (use arrow keys)",
        choices: [
          "View All Departments",
          "Add Department",
          "View All Roles",
          "Add New Role",
          "View All Employees",
          "Add New Employee",
          "Update an Employee Role",
          "Exit the application",
        ],
      },
    ])
    .then(({ userOption }) => {
      userOption === "View All Departments" && viewAllDepartments();
      userOption === "Add Department" && addNewDepartment();
      userOption === "View All Roles" && viewAllRoles();
      userOption === "Add New Role" && addNewRole();
      userOption === "View All Employees" && viewAllEmployees();
      userOption === "Add New Employee" && addNewEmployee();
      userOption === "Exit the application" && Exit();
    });
};

//Display all the dept already created
function viewAllDepartments() {
  const query = `SELECT * FROM department`;
  db.query(query, (err, results) => {
    if (err) {
      throw err;
    }
    console.table(results);
    init();
  });
}

//adds new dept to the db
function addNewDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "newDepartment",
        message: "What department would you like to add?",
      },
    ])
    .then(({ newDepartment }) => {
      console.log(newDepartment);

      const query = `INSERT INTO department(name) VALUES ("${newDepartment}")`;

      db.query(query, (err, results) => {
        if (err) {
          throw err;
        }
        console.table(results);
        init();
      });
    });
}

//Displays all the roles
function viewAllRoles() {
  // const query = `SELECT * FROM role`;
  const query = `SELECT role.id, role.title, role.salary, department.name AS 'department_name' FROM role 
LEFT JOIN department ON department.id = role.department_id;`;

  db.query(query, (err, results) => {
    if (err) {
      throw err;
    }
    console.table(results);
    init();
  });
}

//Adds new Roles
function addNewRole() {
  db.query("SELECT * FROM department", (err, results) => {
    if (err) throw err;

    inquirer
      .prompt([
        {
          type: "input",
          name: "newRole",
          message: "What new role would you like to add?",
        },
        {
          type: "input",
          name: "roleSalary",
          message: "What is the salary for the new role?",
        },
        {
          type: "input",
          name: "roleDepartment",
          message: "What department does the new role belong?",
        },
      ])
      .then(({ newRole, roleSalary, roleDepartment }) => {
        const deptID = results.find((department) => department.name === roleDepartment);
        console.log(deptID);

        const query = `INSERT INTO role(title, salary, department_id) VALUES("${newRole}", ${roleSalary}, ${deptID})`;

        db.query(query, (err, results) => {
          // console.table(results);
          init();
        });
      });
  });
}

function viewAllEmployees() {
  const query = `SELECT * FROM employee`;

  db.query(query, (err, results) => {
    if (err) {
      throw err;
    }
    console.table(results);
    init();
  });
}

function addNewEmployee() {
  inquirer.prompt([
    {
      type: "input",
      name: "firstName",
      message: "What's the first name of the new employee?",
    },
    {
      type: "input",
      name: "lastName",
      message: "What's the last name of the new employee?",
    },
    {
      type: "input",
      name: "roleID",
      message: "What's the role id of the new employee?",
    },
    {
      type: "input",
      name: "managerID",
      message: "What's the id of the manager of the new employee?",
    },
  ]);
}

function Exit() {
  process.exit();
}

//initialize the starter questions
init();
