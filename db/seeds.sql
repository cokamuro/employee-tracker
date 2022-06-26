DELETE FROM employee;
DELETE FROM role;
DELETE FROM department;

INSERT INTO department (id,name)
VALUES (1,"R&D"),
       (2,"Admin"),
       (3,"HR");

INSERT INTO role (id, title, salary, department_id)
VALUES (1, "Software Engineer L4", 90000,1),
        (2, "Software Engineer L5", 120000,1),
        (3, "Software Engineer L6", 15000,1),
        (4, "Software Eng. Manager L7", 220000,1),
        (5, "CEO", 750000,2),
        (6, "CFO", 350000,2),
        (7, "CTO", 400000,2),
        (8, "HR Director", 750000,3),
        (9, "Benefits Coordinator", 350000,3);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (4,"Chris", "Okamuro", 7,null),
        (1,"Sela", "Okamuro", 4,4),
        (2,"Aiko", "Okamuro", 1,1),
        (3,"Skoshi", "Okamuro", 2,1),
        (5,"Karys", "Okamuro",8,null),
        (6,"Stella", "Okamuro", 9,5);
        


       
