# Employee-Management-System

## Description
Employee Tracker is a node.js application that use MySQL Workbench

- [Description](#description)
- [Connect to Database](#connect-to-database )
- [Installation](#installation)
- [License](#license)
- [Technologies Used](#technologies-used)
- [Questions](#questions)
- [Author Info](#author-info)

## Connect to Database 

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

## License
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

### Screenshot - Showing Node command line interface
- View departments, roles and employees.
- Add departments, roles and employees.

![Employee Tracker](images/employeetracker1.png )

![Employee Tracker](images/employeetracker1.gif )

## Technologies Used
The following technologies and tools were used:
- JavaScript
- Node.js
- MySQL Workbench

## Questions
For any other questions, please send me an email at: isasanyang1986@yahoo.co.uk.
