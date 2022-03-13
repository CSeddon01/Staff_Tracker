-- Created information to seed the database

INSERT INTO department 
    (name)
VALUES        
    ("accounting"),
    ("administration"), 
    ("sales"), 
    ("customer_service"), 
    ("legal");

INSERT INTO roles 
    (title, salary, department_id)
VALUES 
    ("Accountant", 25000, 1 ),
    ("Admin", 25000, 2), 
    ("Sales", 45000, 3), 
    ("Support", 45000, 4), 
    ("Lawyer", 60000, 5); 

INSERT INTO employee 
    (first_name, last_name, role_id, manager_id)
VALUES 
    ("Christopher", "Cave", 4, null), 
    ("Michael", "Console", 5, 5), 
    ("Adam", "Chilly", 1, null), 
    ("John", "Scott", 2, null), 
    ("Johnson", "Book", 3, null), 
    ("Jessie", "Book", 4, 4);

