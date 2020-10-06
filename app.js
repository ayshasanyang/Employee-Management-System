const mysql = require('mysql');
const inquirer = require('inquirer');
const { printTable } = require('console-table-printer');
const figlet = require('figlet');
const logo = require("asciiart-logo");
const connection = require('./config/connection');

console.log(
  logo({
      name: 'Employee Tracker',
      font: 'standard',
      lineChars: 30,
      padding: 2,
      margin: 3,
      borderColor: 'aqua',
      logoColor: 'white',
      textColor: 'teal',
  })
  .emptyLine()
  .right("@aysha v1.0")
  .render()
);

  connection.connect(function(err) {
    if (err) throw err;
    start();
  
  });
  function start() {
    inquirer
      .prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update employee role",
          "Delete department",
          "Exit"
        ]
      })
    .then(function(answer) {
        if (answer.action === 'View all departments') {
            viewDepartments();
        } else if (answer.action === 'View all roles') {
            viewRoles();
        } else if (answer.action === 'View all employees') {
            viewEmployees();
        } else if (answer.action === 'Add a department') {
            addDepartment();
        } else if (answer.action === 'Add a role') {
            addRole();
        } else if (answer.action === 'Add an employee') {
            addEmployee();
        } else if (answer.action === 'Update employee role') {
            updateRole();
        } else if (answer.action === 'Delete department') {
            deleteDepartment();
        }
        else if (answer.action === 'Exit') {
            connection.end();
        }
    })
    }

  // Add data to department 
  addDepartment = () => {
    inquirer.prompt([
      {
        name: "department",
        type: "input",
        message: "What department would you like to add?"
      }
    ]).then(function(answer) {
      connection.query(`INSERT INTO department (name) VALUES ('${answer.department}')`, (err, res) => {
        if (err) throw err;
        console.log("1 new department added: " + answer.department);
        start();
      }) 
    })
  };
 
  // Add data to roles 
function addRole() {
  connection.query('SELECT * FROM department', function (err, res) {
    if (err) throw (err);
    inquirer
      .prompt([{
        name: "title",
        type: "input",
        message: "What is the title of the new role?",
      },
      {
        name: "salary",
        type: "input",
        message: "What is the salary of the new role?",
      },
      {
        name: "departmentName",
        type: "list",
       
        message: "Which department does this role fall under?",
        choices: function () {
          var choicesArray = [];
          res.forEach(res => {
            choicesArray.push(
              res.name
            );
          })
          return choicesArray;
        }
      }
      ])
   
      .then(function (answer) {
        const department = answer.departmentName;
        connection.query('SELECT * FROM DEPARTMENT', function (err, res) {

          if (err) throw (err);
          let filteredDept = res.filter(function (res) {
            return res.name == department;
          }
          )
          let id = filteredDept[0].id;
          let query = "INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)";
          let values = [answer.title, parseInt(answer.salary), id]
          console.log(values);
          connection.query(query, values,
            function (err, res, fields) {
              console.log(`You have added this role: ${(values[0]).toUpperCase()}.`)
            })
          start();
        })
      })
  })
}

// Add data to employee 
function addEmployee() {
  connection.query('SELECT * FROM roles', function (err, result) {
    if (err) throw (err);
    inquirer
      .prompt([{
        name: "firstName",
        type: "input",
        message: "What is the employee's first name?",
      },
      {
        name: "lastName",
        type: "input",
        message: "What is the employee's last name?",
      },
      {
        name: "roleName",
        type: "list",
        message: "What role does the employee have?",
        choices: function () {
          rolesArray = [];
          result.forEach(result => {
            rolesArray.push(
              result.title
            );
          })
          return rolesArray;
        }
      }
      ]) 

      .then(function (answer) {
        console.log(answer);
        const role = answer.roleName;
        connection.query('SELECT * FROM roles', function (err, res) {
          if (err) throw (err);
          let filteredRole = res.filter(function (res) {
            return res.title == role;
          })
          let roleId = filteredRole[0].id;
          connection.query("SELECT * FROM employee", function (err, res) {
            inquirer
              .prompt([
                {
                  name: "manager",
                  type: "list",
                  message: "Who is your manager?",
                  choices: function () {
                    managersArray = []
                    res.forEach(res => {
                      managersArray.push(
                        res.last_name)

                    })
                    return managersArray;
                  }
                }
              ]).then(function (managerAnswer) {
                const manager = managerAnswer.manager;
                connection.query('SELECT * FROM employee', function (err, res) {
                  if (err) throw (err);
                  let filteredManager = res.filter(function (res) {
                    return res.last_name == manager;
                  })
                  let managerId = filteredManager[0].id;
                  console.log(managerAnswer);
                  let query = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)";
                  let values = [answer.firstName, answer.lastName, roleId, managerId]
                  console.log(values);
                  connection.query(query, values,
                    function (err, res, fields) {
                      console.log(`You have added this employee: ${(values[0]).toUpperCase()}.`)
                    })
                  viewEmployees();
                })
              })
          })
        })
      })
  })
}



// This shows all the information in roles table 
viewRoles = () => {
  connection.query("SELECT roles.*, department.name FROM roles LEFT JOIN department ON department.id = roles.department_id", (err, res) => {
    if (err) throw err;
    figlet('Roles', (err, result) => {
      console.log(err || result);
    });

    printTable(res);
    start();
  });
};
// This shows all the information in department table 
  viewDepartments = () => {
    connection.query("SELECT * FROM department", (err, res) => {
      if (err) throw err;
      figlet('Department', (err, result) => {
        console.log(err || result);
      });
  
      printTable(res);
      start();
    });
  };

 // This shows all the information in employee table 
  viewEmployees = () => {
    connection.query("SELECT employee.first_name, employee.last_name, roles.title AS \"role\", managers.first_name AS \"manager\" FROM employee LEFT JOIN roles ON employee.role_id = roles.id LEFT JOIN employee managers ON employee.manager_id = managers.id GROUP BY employee.id",(err, res) => {
      if (err) throw err;
      figlet('Employees', (err, result) => {
        console.log(err || result);
      });
    
      printTable(res);
      start();
    });
  };
  
  // update employee role 
  function updateRole(){
    connection.query("SELECT first_name, last_name, id FROM employee",
    function(err,res){
      let employees = res.map(employee => ({name: employee.first_name + " " + employee.last_name, value: employee.id}))
      inquirer
      .prompt([
        {
          type: "list",
          name: "employeeName",
          message: "Which employee's role would you like to update?", 
          choices: employees
        },
        {
          type: "input",
          name: "role",
          message: "What is your new role?"
        }
      ])
      .then (function(res){
        connection.query(`UPDATE employee SET role_id = ${res.role} WHERE id = ${res.employeeName}`,
        function (err, res){
          console.log(res);
          start()
        }
        );
      })
    }
    )
    }


  deleteDepartment = () => {
    let departments = [];
    for (var i = 0; i < departmen_id.length; i++) {
      departments.push(Object(department_id[i]));
    }
  
    inquirer.prompt([
      {
        name: "deleteDepartment",
        type: "list",
        message: "Select a department to delete",
        choices: function() {
          var choiceArray = [];
          for (var i = 0; i < departmentOptions.length; i++) {
            choiceArray.push(departmentOptions[i])
          }
          return choiceArray;
        }
      }
    ]).then(answer => {
      for (i = 0; i < departmentOptions.length; i++) {
        if (answer.deleteDepartment === departmentOptions[i].name) {
          newChoice = departmentOptions[i].id
          connection.query(`DELETE FROM department Where id = ${newChoice}`), (err, res) => {
            if (err) throw err;
          };
          console.log("Department: " + answer.deleteDepartment + " Deleted Succesfully");
        }
      }
      start();
    })
  };

  
  // Roles table information----