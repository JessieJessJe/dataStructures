## Week Four

#### Directory
* Assignment instruction [here](https://github.com/visualizedata/data-structures/blob/master/weekly_assignment_04.md)
* My solution in [4a.js](https://github.com/JessieJessJe/dataStructures/blob/master/week04/4a.js), [4b.js](https://github.com/JessieJessJe/dataStructures/blob/master/week04/4b.js). [4c.js](https://github.com/JessieJessJe/dataStructures/blob/master/week04/4c.js)

#### Database Model
![db model](https://github.com/JessieJessJe/dataStructures/blob/master/week04/data%20model.png)

#### The Process
* Prepare a `module.js` of credentials to get connected with the AWS RDS POSTGRESQL Database.
  ```javascript
  //module.js
  var db_credentials = new Object();
    db_credentials.user = 'jessie';
    db_credentials.host = 'ds2020.ccf1jkcus2qg.us-east-1.rds.amazonaws.com';
    db_credentials.database = 'aa';
    db_credentials.password = process.env.RDSPW;
    db_credentials.port = 5432;

  module.exports.db_credentials = db_credentials;
  ```
  To load the module in another `.js` file, insert the following so that the credentials can be accessed via `db.db_credentials`.
  ```javascript
   const db = require("./module");
  ```
  
* Connect to the PostgreSQL Database using `pg` npm package. 
   ```javascript
  const { Client } = require('pg');
  const client = new Client(db.db_credentials);
  client.connect();
  ```
  
* Conduct basic SQL operations, including create/delete tables, insert rows, and select rows, to move JSON data into the database. 
Specifically, each SQL operation will be stored in the js variable named `thisQuery`, which will then be passed through the connection from last step.

   **Create/Delete tables.** Full operation in [4a.js](https://github.com/JessieJessJe/dataStructures/blob/master/week04/4a.js)
  ```javascript
  // Sample SQL statement to create a table: 
  var thisQuery = "CREATE TABLE aalocations (address varchar(100), lat double precision, long double precision);";
  // Sample SQL statement to delete a table: 
  var thisQuery = "DROP TABLE aalocations;"; 
  ```
  
   **Insert Rows.** Full operation in [4b.js](https://github.com/JessieJessJe/dataStructures/blob/master/week04/4b.js)
  ```javascript
  // eg, thisQuery = INSERT INTO aalocations VALUES (E'351 E 74TH ST New York NY ', 40.7694194, -73.9555151);
  var thisQuery = "INSERT INTO aalocations VALUES (E'" + value.address + "', " + value.latlong.lat + ", " + value.latlong.lng + ");";
  ```
  
   **Select & Count Rows.** Full operation in [4c.js](https://github.com/JessieJessJe/dataStructures/blob/master/week04/4c.js)
  ```javascript
  var thisQuery = "SELECT * FROM aalocations;"
  ```
  
   Example of passing the query to the database:
  ```javascript
  client.query(thisQuery, (err, res) => {
    console.log(err, res.rows);
    console.log("Row count: %d",res.rows.length);
    client.end();
  ```
  
