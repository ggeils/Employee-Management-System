const path = require("path");
const fs = require("fs");
let mysql = require("mysql");
let inquirer = require("inquirer");
const connection = require("./connection.js");
const { title } = require("process");

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

function addRole() {
  connection.query("SELECT * FROM departments", function (err, res) {
    if (err) throw err;
    const departments = res.map((element) => {
      return element.id;
    });
    inquirer
      .prompt([
        {
          name: "title",
          type: "input",
          message: "What is the role called?",
        },
        {
          name: "salary",
          type: "input",
          message: "What is the role's base salary?",
        },
        {
          name: "department_id",
          type: "list",
          message: "What is the department ID?",
          choices: departments,
        },
      ])
      .then(function (answer) {
        connection.query("INSERT INTO roles SET ?", answer, function (err) {
          if (err) throw err;
          console.log(
            `The new role ${answer.title} was added successfully to the database!`
          );
          repeat();
        });
      });
  });
}

function addEmployee() {
  connection.query("SELECT id, title from roles", function (err, res) {
    if (err) throw err;
    const roles = res.map((element) => element.title);
    inquirer
      .prompt([
        {
          name: "first_name",
          type: "input",
          message: "What is the new employees first name?",
        },
        {
          name: "last_name",
          type: "input",
          message: "What is their last name?",
        },
        {
          name: "roles",
          type: "list",
          message: "What is their role in the company?",
          choices: roles,
        },
      ])
      .then((answers) => {
        let chosen_role = res.find((element) => {
          return element.title === answers.roles;
        });
        console.log(chosen_role.id);
        let new_employee = {
          first_name: answers.first_name,
          last_name: answers.last_name,
          role_id: chosen_role.id,
        };
        connection.query(
          "INSERT INTO employees SET ?",
          new_employee,
          (err, success) => {
            if (err) throw err;
            console.log(
              `The new employee ${new_employee.first_name} was added successfully to the company database!`
            );
            repeat();
          }
        );
      });
  });
}

function updateEmployee() {
  connection.query("Select * from employees", function (err, res) {
    if (err) throw err;
    let employee_names = res.map((element) => {
      return `${element.id}: ${element.first_name} ${element.last_name}`;
    });
    connection.query("SELECT title, id from roles", function (err, success) {
      if (err) throw err;
      let roles = success.map((element) => element.title);
      inquirer
        .prompt([
          {
            name: "which_employee",
            type: "list",
            message: "Which employee would you like to update?",
            choices: employee_names,
          },
          {
            name: "roles",
            type: "list",
            message: "What is their new role in the company?",
            choices: roles,
          },
        ])
        .then((answers) => {
          console.log(answers);
          let update_employee_id = answers.which_employee.split(":")[0];
          console.log(update_employee_id);
          let chosen_role = success.find((element) => {
            return element.title === answers.roles;
          });
          console.log(chosen_role.id);
          connection.query(
            "UPDATE employees SET role_id=? where id=?",
            [chosen_role.id, update_employee_id],
            function (err, res) {
              if (err) throw err;
              console.log(`Their role has been changed successfully!`);
              repeat();
            }
          );
        });
    });
  });
}

function repeat() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "continue",
        message: "Continue working on the database?",
        choices: [
          {
            name: "Yes",
            value: true,
          },
          {
            name: "No",
            value: false,
          },
        ],
      },
    ])
    .then(function (answers) {
      if (answers.continue) {
        init();
      } else {
        console.log(`You have finished working on the database.`);
        process.exit();
      }
    });
}

init();
