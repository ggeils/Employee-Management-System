USE employee_db;

INSERT INTO departments (id, department) VALUES ("1", "Management");
INSERT INTO departments (id, department) VALUES ("2", "Developer");
INSERT INTO departments (id, department) VALUES ("3", "Marketing");

INSERT INTO roles (id, title, salary, department_id) VALUES ("1", "Supervisor", "150000", "1");
INSERT INTO roles (id, title, salary, department_id) VALUES ("2", "Mid-Level Developer", "120000", "2");
INSERT INTO roles (id, title, salary, department_id) VALUES ("3", "Marketing Intern", "30000", "3");

INSERT INTO employees (id, first_name, last_name, role_id, manager_id) VALUES ("1", "Mark", "Zuckerburg", "1", NULL);
INSERT INTO employees (id, first_name, last_name, role_id, manager_id) VALUES ("2", "George", "Geils", "1", "1");
INSERT INTO employees (id, first_name, last_name, role_id, manager_id) VALUES ("3", "Bob", "Smith", "2", "4");