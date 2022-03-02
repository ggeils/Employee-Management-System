const path = require('path');
const fs = require('fs');
let mysql = require('mysql');
let inquirer = require("inquirer");
const connection = require('./connection.js');

function init() {
    console.log('You have successfully logged into the Employee Management System!')
    inquirer.prompt([{
      type: "list",
      name: "start",
      message: "What would you like to do?",
      choices: [
        {
            name: "View all departments",
            value: "VIEW_DEPARTMENTS"
    
        },
        {
            name: "View all roles",
            value: "VIEW_ROLES"
        },
        {
          name: "View all employees",
          value: "VIEW_EMPLOYEES"
        },
        {
            name: "Add a department",
            value: "ADD_DEPARTMENT"
        },
        {
            name: "Add a role",
            value: "ADD_ROLE"
        },
        {
          name: "Add an employee",
          value: "ADD_EMPLOYEE"
        },
        {
          name: "Update an employee role",
          value: "UPDATE_EMPLOYEE"
        },
  
      ]
    }]).then(({start}) => {
      if (start == "VIEW_DEPARTMENTS") {
          viewDepartments();
      }
      if (start == "VIEW_ROLES") {
          viewRoles();
      }
      if (start == "VIEW_EMPLOYEES") {
        viewEmployeees();
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
    })
  }

  init();