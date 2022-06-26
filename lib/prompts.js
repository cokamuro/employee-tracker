const menu = [
  {
    type: "list",
    message: "Select your task",
    choices: [
      { name: "View all departments", value: 0 },
      { name: "View all roles", value: 1 },
      { name: "View all employees", value: 2 },
      { name: "View employees by manager", value: 3 },
      { name: "View employees by department", value: 4 },
      { name: "View departmental total utilized budget", value: 5 },
      { name: "Add a department", value: 10 },
      { name: "Add a role", value: 11 },
      { name: "Add an employee", value: 12 },
      { name: "Update an employee's role", value: 20 },
      { name: "Update an employee's manager", value: 21 },
      { name: "Delete a department", value: 30 },
      { name: "Delete a role", value: 31 },
      { name: "Delete a employee", value: 32 },
      { name: 'Exit', value: -1 }],
    name: "menuSelection"
  },
  {
    type: "input",
    message: "What is the department name?",
    name: "departmentName",
    when: (answers) => answers.menuSelection == 10,
  },
  {
    type: "input",
    message: "What is the title of this role?",
    name: "roleTitle",
    when: (answers) => answers.menuSelection == 11
  },
  {
    type: "input",
    message: "What is this salary of this role?",
    name: "roleSalary",
    when: (answers) => answers.menuSelection == 11
  },
  {
    type: "list",
    message: "What is the department of this role?",
    choices: "",
    name: "roleDepartment",
    when: (answers) => answers.menuSelection == 11
  },
  {
    type: "input",
    message: "What is the first name of this employee?",
    name: "employeeFirst_name",
    when: (answers) => answers.menuSelection == 12
  },
  {
    type: "input",
    message: "What is the last name of this employee?",
    name: "employeeLast_name",
    when: (answers) => answers.menuSelection == 12
  },
  {
    type: "list",
    message: "What is this employee's role?",
    choices: "",
    name: "employeeRole",
    when: (answers) => answers.menuSelection == 12
  },
  {
    type: "list",
    message: "Who is this employee's manager?",
    choices: "",
    name: "employeeManager",
    when: (answers) => answers.menuSelection == 12
  },
  {
    type: "list",
    message: "Which employee do you want to update?",
    choices: "",
    name: "employeeToUpdate",
    when: (answers) => answers.menuSelection == 20
  },
  {
    type: "list",
    message: "What is this employee's new role?",
    choices: "",
    name: "employeeRole",
    when: (answers) => answers.menuSelection == 20
  },
  {
    type: "list",
    message: "Which manager's employees do you want listed?",
    choices: "",
    name: "selectedManager",
    when: (answers) => answers.menuSelection == 3
  },
  {
    type: "list",
    message: "Which department's employees do you want listed?",
    choices: "",
    name: "selectedDepartment",
    when: (answers) => answers.menuSelection == 4
  },
  {
    type: "list",
    message: "What department do you want to delete?",
    choices: "",
    name: "selectedDepartment",
    when: (answers) => answers.menuSelection == 30
  },
  {
    type: "list",
    message: "What role do you want to delete?",
    choices: "",
    name: "selectedRole",
    when: (answers) => answers.menuSelection == 31
  },
  {
    type: "list",
    message: "What employee do you want to delete?",
    choices: "",
    name: "selectedEmployee",
    when: (answers) => answers.menuSelection == 32
  },
  {
    type: "list",
    message: "What employee do you want to update?",
    choices: "",
    name: "employeeToUpdate",
    when: (answers) => answers.menuSelection == 21
  },
  {
    type: "list",
    message: "What manager do you want to set for this employee?",
    choices: "",
    name: "selectedManager",
    when: (answers) => answers.menuSelection == 21
  }

]

module.exports = {
  menu
}