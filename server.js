const path = require("path");
const fs = require("fs");
let mysql = require("mysql");
let inquirer = require("inquirer");
const connection = require("./connection.js");

function init() {
  console.log(
    "You have successfully logged into the Employee Management System!"
  );
  inquirer
    .prompt([
      {
        type: "list",
        name: "start",
        message: "What would you like to do?",
        choices: [
          {
            name: "View all departments",
            value: "VIEW_DEPARTMENTS",
          },
          {
            name: "View all roles",
            value: "VIEW_ROLES",
          },
          {
            name: "View all employees",
            value: "VIEW_EMPLOYEES",
          },
          {
            name: "Add a department",
            value: "ADD_DEPARTMENT",
          },
          {
            name: "Add a role",
            value: "ADD_ROLE",
          },
          {
            name: "Add an employee",
            value: "ADD_EMPLOYEE",
          },
          {
            name: "Update an employee role",
            value: "UPDATE_EMPLOYEE",
          },
        ],
      },
    ])
    .then(({ start }) => {
      if (start == "VIEW_DEPARTMENTS") {
        viewDepartments();
      }
      if (start == "VIEW_ROLES") {
        viewRoles();
      }
      if (start == "VIEW_EMPLOYEES") {
        viewEmployees();
      }
      if (start == "ADD_DEPARTMENT") {
        addDepartment();
      }
      if (start == "ADD_ROLE") {
        addRole();
      }
      if (start == "ADD_EMPLOYEE") {
        addEmployee();
      }
      if (start == "UPDATE_EMPLOYEE") {
        updateEmployee();
      }
    });
}

function viewDepartments() {
  console.log("Pulling all departments... \n");
  connection.query(
    "SELECT id AS `ID`, department AS `Department` FROM departments",
    function (err, res) {
      if (err) throw err;
      console.table(res);
      repeat();
    }
  );
}

function viewRoles() {
  console.log("Pulling all roles... \n");
  connection.query(
    "SELECT title AS `Title`, salary AS `Salary`, department_id AS `Department ID` FROM roles",
    function (err, res) {
      if (err) throw err;
      console.table(res);
      repeat();
    }
  );
}

function viewEmployees() {
  console.log("Pulling all employees... \n");
  connection.query(
    "SELECT first_name AS `First Name`, last_name AS `Last Name`, role_id AS `Role ID` FROM employees",
    function (err, res) {
      if (err) throw err;
      console.table(res);
      repeat();
    }
  );
}

function addDepartment() {
  connection.query("SELECT * FROM departments", function (err, res) {
    if (err) throw err;
    let departments = res.map((element) => {
      return element.id;
    });
    inquirer
      .prompt([
        {
          name: "department",
          type: "input",
          message: "What is the department called?",
        },
      ])
      .then(function (answer) {
        connection.query(
          "INSERT INTO departments SET ?",
          answer,
          function (err) {
            if (err) throw err;
            console.log(`${answer.department} was added to the database!`);
            repeat();
          }
        );
      });
  });
}

init();
