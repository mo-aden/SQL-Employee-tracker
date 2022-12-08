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
        message: "Select one of the options below (use arrow keys)",
        choices: [
          "View All Departments",
          "Add Department",
          "View All Roles",
          "Add Role",
          "View All Employees",
          "Add an Employee",
          "Exit the application",
          "Update an Employee Role",
        ],
      },
    ])
    .then((response) => {
      console.log(response);

      response.userOption === "Exit the application" && Exit();
    });
};

function Exit() {
  console.log(`Application closed`);
  process.exit();
}

//initialize the starter questions
init();
