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
    console.log(sql)
    db.query(sql,name);
}

const returnDepartmentArray = (db) => {
    db.query("select name, id from department order by name asc", function (err, results) {
        console.log("dept query", results);
        if (err) return console.error(err);
        return results;
    })
}

const convertArrayToChoices = (arr) => {
    console.log("catc",arr);
    
    let choices=[]
    for(let i=0;i<arr.length;i++){
        let choice;
        const element=arr[i];
        console.log(element)
        choice.name=element.name;
        choice.value=element.id;
        choices.push(choice);
    }
    return choices;
}

module.exports = {
    queries,
    clearScreen,
    insertDepartment,
    returnDepartmentArray,
    convertArrayToChoices,
};