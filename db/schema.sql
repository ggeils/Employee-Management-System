DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;
USE employee_db;

CREATE TABLE departments(
  id INTEGER(10) AUTO_INCREMENT NOT NULL,
  department VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE roles(
  id INTEGER(10) AUTO_INCREMENT NOT NULL,
  title VARCHAR(30) NOT NULL,
  salary decimal(9, 2) NOT NULL,
  department_id INTEGER (10) NOT NULL, 
  PRIMARY KEY (id) 
);

CREATE TABLE employees(
  id INTEGER(10) AUTO_INCREMENT NOT NULL,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INTEGER (11) NOT NULL,
  manager_id INTEGER(11),
  PRIMARY KEY (id)
);