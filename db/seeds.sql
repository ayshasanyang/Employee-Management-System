USE employees_DB;

INSERT INTO department
    (name)
VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');

INSERT INTO roles
    (title, salary, department_id)
VALUES
    ('Sales Lead', 100000, 1),
    ('Sales Person', 60000, 1),
    ('Lead Engineer', 150000, 2),
    ('Software Engineer', 100000, 2),
    ('Account Manager', 160000, 3),
    ('Accountant', 120000, 3),
    ('Legal Team Lead', 250000, 4),
    ('Lawyer', 190000, 4);

    INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Karina','Smith', 1,  NULL),
    ('Jake','Scott', 2, 1 ),
    ('Isatou','Sanyang', 3,  NULL),
    ('Kristina','Ross', 4, 2 ),
    ('Sherwin','Gill', 5, NULL ),
    ('Yulin', 'Collins',6, 3),
    ('Muha', 'Sabz',7, NULL),
    ('Martha', 'Garcia',8, 4 );
    