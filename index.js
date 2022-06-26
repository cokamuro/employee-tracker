const mysql = require('mysql2');
const { prompt } = require('inquirer');
const prompts = require('./lib/prompts.js');
const functions = require('./lib/functions.js');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'employeetracker'
    },
);

const init = () => {
    //program starts here
    showMenu()
};

const prepMenu = async () => {
    //read departments 
    const arrDept = await functions.returnDepartmentArray(db);
    //set department list into the choices for questions with department selection
    prompts.menu[4].choices = arrDept;
    prompts.menu[12].choices = arrDept;
    prompts.menu[13].choices = arrDept;
    //read roles
    const arrRole = await functions.returnRoleArray(db);
    //set role list into the choices for questions with role selection
    prompts.menu[7].choices = arrRole;
    prompts.menu[10].choices = arrRole;
    prompts.menu[14].choices = arrRole;
    //read list of employees
    const arrEmp = await functions.returnEmployeeArray(db);
    let arrMgr = JSON.parse(JSON.stringify(arrEmp));
    arrMgr.unshift({ name: "(none)", value: null });
    //set manager list into the choices for questions with manager selection that can also be null
    prompts.menu[8].choices = arrMgr;
    prompts.menu[17].choices = arrMgr;
    //set employee list into the choices for questions with employee selection
    prompts.menu[9].choices = arrEmp;
    prompts.menu[15].choices = arrEmp;
    prompts.menu[16].choices = arrEmp;
    //read list of managers
    const arrManagers = await functions.returnManagerArray(db);
    //set manager list for question with manager selection
    prompts.menu[11].choices = arrManagers;
}

const showMenu = async () => {
    //call function to populate prompt choices
    await prepMenu()
    //present user with menu selections
    const data = await prompt(prompts.menu);
    if (data.menuSelection != -1) {
        //call menu handler function
        menuHandler(data);
        //re-display menu after last function completes
        showMenu();
    } else {
        //exit program
        console.log("Exiting program");
        process.exit();
    }
}

const menuHandler = (data) => {
    const menuSelection = data.menuSelection;
    if (menuSelection < 10) {
        //execute all queries using functions.queries
        functions.queries(db, data);
    } else if (menuSelection >= 10 && menuSelection < 20) {
        //add a department
        if (menuSelection == 10) { functions.insertDepartment(db, data.departmentName) };
        //add a role
        if (menuSelection == 11) { functions.insertRole(db, data.roleTitle, data.roleSalary, data.roleDepartment) };
        //add an employee            
        if (menuSelection == 12) { functions.insertEmployee(db, data.employeeFirst_name, data.employeeLast_name, data.employeeRole, data.employeeManager) };
    } else if (menuSelection >= 20 && menuSelection < 30) {
        //update an employee's role
        if (menuSelection == 20) { functions.updateEmployeeRoleId(db, data.employeeToUpdate, data.employeeRole) };
        //update an employee's manager
        if (menuSelection == 21) { functions.updateEmployeeManagerId(db, data.employeeToUpdate, data.selectedManager) };
    } else if (menuSelection >= 30 && menuSelection < 40) {
        //execute all deletes using functions.deletes
        //delete a department
        if (menuSelection == 30) { functions.deletes(db, menuSelection, data.selectedDepartment) };
        //delete a role
        if (menuSelection == 31) { functions.deletes(db, menuSelection, data.selectedRole) };
        //delete an employee
        if (menuSelection == 31) { functions.deletes(db, menuSelection, data.selectedEmployee) };
    };
};

init();