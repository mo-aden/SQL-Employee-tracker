--Static inputs

INSERT INTO department(name) 
VALUES 
("Accounting"),
("Mathematics"),
("Software engineering");

INSERT INTO role(title,salary, department_id ) 
VALUES 
("Account Manager", 86000, 1),
("Mathematics Manager", 89000,2),
("Software engineering Manager", 104000, 3),
("Accountant", 82000, 1),
("Mathematician", 85000,2),
("Software Engineer", 102000, 3);

INSERT INTO employee(first_name,last_name,role_id, manager_id ) 
VALUES 
("Justin", "Moore", 1, null),
("Mo", "Aden", 2, null),
("Steven", "Philips", 3, null),
("John", "Doe", 4, 1),
("Jane", "Doe", 5, 2),
("Steven", "Messi", 6, 3);
