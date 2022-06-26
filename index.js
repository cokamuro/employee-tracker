const mysql = require('mysql2');
const { prompt } = require('inquirer');
const prompts = require('./lib/prompts.js');
const functions = require('./lib/functions.js');
const { async } = require('rxjs');
const { arrayBuffer } = require('stream/consumers');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'employeetracker'
    },
    console.log(`Connected to the employeetracker database.`)
);

// GIVEN a command-line application that accepts user input
// WHEN I start the application
// THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
// WHEN I choose to view all departments
// THEN I am presented with a formatted table showing department names and department ids
// WHEN I choose to view all roles
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database
// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database 

const init = () => {
    showMenu()
};

const prepMenu = async () => {
    //read departments 
    const arrDept= await functions.returnDepartmentArray(db) 
    //set department list into the choices for department on role question
    prompts.menu[4].choices=arrDept;
    //read roles
    const arrRole= await functions.returnRoleArray(db) 
    //set role list into the choices for department on employee question
    prompts.menu[7].choices=arrRole;
    //read list of employees
    const arrEmp= await functions.returnEmployeeArray(db) 
    //add option for no manager
    arrEmp.unshift({name: "(none)", value: null})
    //set manager list into the choices for department on employee question
    prompts.menu[8].choices=arrEmp;
}

const showMenu = async () => {
    await prepMenu()
    const data = await prompt(prompts.menu);
    console.log()
    if (data.menuSelection != -1) {
        menuHandler(data);
        //showMenu();
    } else {
        console.log("Exiting program");
        process.exit();
    }
}

const menuHandler = (data) => {
    const menuSelection=data.menuSelection;
    if (menuSelection < 10) {
        functions.queries(db, menuSelection);
    } else if (menuSelection < 20) {
        console.log(data)
        //add a department
        if (menuSelection == 10) {functions.insertDepartment(db, data.departmentName)};
        //add a role
        if (menuSelection == 11) {functions.insertRole(db, data.roleTitle, data.roleSalary, data.roleDepartment)};
        //add an employee            
        if (menuSelection == 12) {functions.insertEmployee(db, data.employeeFirst_name, data.employeeLast_name, data.employeeRole, data.employeeManager)};
    } else {
        functions.updates(db, menuSelection);
    }
};

init();