# Employee-Management-System

## Description
Employee Tracker is a node.js application that use MySQL Workbench

## Connecting to Database 

```javascript
const connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: 'your password',
	database:  'employees_DB'
});

```

## Installation
```
npm install
   mysql
   inquirer
   figlet
   console-table-printer
   asciiart-logo

```

### Screenshot - Showing Node command line interface
- View departments, roles and employees.
- Add departments, roles and employees.

![Employee Tracker](images/employeetracker1.png )

![Employee Tracker](images/employeetracker.gif )

## Technologies Used
The following technologies and tools were used:
- JavaScript
- Node.js
- MySQL Workbench
