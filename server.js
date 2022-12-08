//Imports
const inquirer = require("inquirer");
const fs = require("fs");
const path = require("path");

const init = function () {
  inquirer
    .prompt([
      {
        type: "list",
        name: "userOption",
        message: "Select an action from the options below (use arrow keys)",
        choices: [
          "View All Employees",
          "Add an Employee",
          "Update an Employee Role",
          "View All Roles",
          "Add Role",
          "View All Departments",
          "Add Department",
          "Exit",
        ],
      },
    ])
    .then((response) => {
      console.log(response);
    });
};

//initialize the starter questions
init();
