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

      userOption === "View All Employees" && viewAllEmployees();
      userOption === "Exit the application" && Exit();
    });
};

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
