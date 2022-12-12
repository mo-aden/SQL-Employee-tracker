//Imports
const inquirer = require("inquirer");
const fs = require("fs");
const path = require("path");
const db = require("./lib/dbConnection");
const { query } = require("./lib/dbConnection");
const { validateHeaderName } = require("http");

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
          "Update Employee Role",
          "Exit the application",
        ],
      },
    ])
    .then(({ userOption }) => {
      userOption == "View All Departments" && viewAllDepartments();
      userOption == "Add Department" && addNewDepartment();
      userOption == "View All Roles" && viewAllRoles();
      userOption == "Add New Role" && addNewRole();
      userOption == "View All Employees" && viewAllEmployees();
      userOption == "Add New Employee" && addNewEmployee();
      userOption == "Exit the application" && Exit();
      userOption == "Update Employee Role " && updateEmployeRole();
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
    const choices = results.map((dept) => {
      return {
        name: dept.name,
        value: dept.id,
      };
    });

    // console.table(results);

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
          type: "list",
          name: "deptID",
          message: "What department does the new role belong?",
          choices,
        },
      ])
      .then(({ newRole, roleSalary, deptID }) => {
        const query = `INSERT INTO role(title, salary, department_id) VALUES("${newRole}", ${roleSalary}, ${deptID})`;

        db.query(query, (err2, results2) => {
          if (err2) throw err2;
          // console.table(results2);
          viewAllRoles();
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
  db.query(`SELECT id, title FROM role`, (roleErr, roleResult) => {
    if (roleErr) throw roleErr;
    const roleChoices = roleResult.map((role) => {
      return {
        name: role.title,
        value: role.id,
      };
    });

    //manager Query
    db.query(`SELECT id, CONCAT(first_name, " ", last_name) AS name FROM employee WHERE manager_id IS NULL;`, (managerErr, managerResult) => {
      if (managerErr) throw managerErr;
      const managerChoices = managerResult.map((manager) => {
        return {
          name: manager.name,
          value: manager.id,
        };
      });
      managerChoices.push({ name: "No Manager", value: null });
      inquirer
        .prompt([
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
            type: "list",
            name: "roleID",
            message: "What's the role of the new employee?",
            choices: roleChoices,
          },
          {
            type: "list",
            name: "managerID",
            message: "Who is the manager of the new employee?",
            choices: managerChoices,
          },
        ])
        .then(({ firstName, lastName, roleID, managerID }) => {
          console.log(firstName, lastName, roleID, managerID);

          const query = `INSERT INTO employee(first_name,last_name,role_id, manager_id ) 
           VALUES   
           ("${firstName}", "${lastName}", ${roleID}, ${managerID ? managerID : "NULL"})`;

          db.query(query, (err, results) => {
            if (err) throw err;

            // console.table(results);
            // init();
            viewAllEmployees();
          });
        });
    });
  });
}

//update existing employee Role
function updateEmployeRole() {
  console.log(`fUNCT CALLED !`);
  db.query(`SELECT id FROM role`, (req, roleResults) => {
    console.log(res);
    const updateChoices = roleResults.map((role) => role.id);

    db.query(`SELECT CONCAT(first_name, " ", last_name) AS name FROM employee`, (req, empResults) => {
      const employeName = empResults.map((empName) => empName.name);

      inquirer
        .prompt([
          {
            type: "input",
            name: "employee_name",
            message: "What the name of the employee to update",
            choices: employeName,
          },
        ])
        .then(({ employee_name }) => {
          console.log(employee_name);
          console.log(updateChoices, employeName);
        });
    });
  });
  viewAllEmployees();
}

function Exit() {
  process.exit();
}

//initialize the starter questions
init();
