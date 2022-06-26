  const menu = [
    {
        type: "list",
        message: "Select your task",
        choices: [
          { name: "View all departments", value: 0 },
          { name: "View all roles", value: 1 },
          { name: "View all employees", value: 2 },
          { name: "Add a department", value: 10 },
          { name: "Add a role", value: 11 },
          { name: "Add an employee", value: 12 },
          { name: "Update an employee role", value: 20 },
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
}
]

module.exports = { 
    menu
 }