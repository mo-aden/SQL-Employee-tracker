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
          "Add Role",
          "View All Employees",
          "Add an Employee",
          "Update an Employee Role",
          "Exit the application",
        ],
      },
    ])
    .then(({ userOption }) => {
      console.log(userOption);
      userOption === "View All Departments" && viewAllDepartments();
      userOption === "Add Department" && addNewDepartment();
      userOption === "View All Employees" && viewAllEmployees();
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

function Exit() {
  process.exit();
}

//initialize the starter questions
init();
