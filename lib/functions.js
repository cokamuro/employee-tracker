//const { promises } = require('stream');
require('console.table');

const clearScreen = () => {
    const readline = require('readline')
    const blank = '\n'.repeat(process.stdout.rows)
    console.log(blank)
    readline.cursorTo(process.stdout, 0, 0)
    readline.clearScreenDown(process.stdout)
}

const queries = (db, enumQuery) => {
    let sql;
    switch (enumQuery) {
        //View all departments
        case (0): {
            console.log("---All departments---");
            sql = "select * from department order by name asc;";
            break;
        }
        //View all roles
        case (1): {
            console.log("---All roles---");
            sql = "select * from role order by title asc;";
            break;
        }
        //View all employees
        case (2): {
            console.log("---All employees---");
            sql = "select * from employee order by last_name asc, first_name asc;";
            break;
        }
    }
    db.query(sql, function (err, results) {
        if (err) return console.error(err);
        clearScreen()
        console.table(results);
    });
}

const insertDepartment = (db, name) => {
    const sql = "insert into department (name) values ('"+name+"')"
    db.query(sql);
}

const insertRole = (db, title, salary, department_id) => {
    const sql = "insert into role (title, salary, department_id) values ('"+title+"',"+salary+","+department_id+")"
    db.query(sql);
}

const insertEmployee = (db, first_name,last_name,role_id,manager_id) => {
    const sql = "insert into employee (first_name,last_name,role_id,manager_id) values ('"+first_name+"','"+last_name+"',"+role_id+","+manager_id+")"
    db.query(sql);
}

const returnRoleArray = (db) =>{
    return new Promise((resolve, reject) => {
        db.query("select title as name, id as value from role order by title asc",(err,results)=>{
            if(err){
                reject(err)
            }
            resolve(results)
        })
    });
}

const returnEmployeeArray = (db) =>{
    return new Promise((resolve, reject) => {
        db.query("select concat(first_name,' ',last_name) as name, id as value from employee order by name asc",(err,results)=>{
            if(err){
                reject(err)
            }
            resolve(results)
        })
    });
}

const returnDepartmentArray = (db) =>{
    return new Promise((resolve, reject) => {
        db.query("select name, id as value from department order by name asc",(err,results)=>{
            if(err){
                reject(err)
            }
            resolve(results)
        })
    });
}

module.exports = {
    queries,
    clearScreen,
    insertDepartment,
    insertRole,
    insertEmployee,
    returnDepartmentArray,
    returnRoleArray,
    returnEmployeeArray
};