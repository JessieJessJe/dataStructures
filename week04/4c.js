const db = require("./module");
const { Client } = require('pg');

// Connect to the AWS RDS Postgres database
const client = new Client(db.db_credentials);
client.connect();

// Sample SQL statement to query the entire contents of a table: 
var thisQuery = "SELECT * FROM aalocations;"

client.query(thisQuery, (err, res) => {
    console.log(err, res.rows);
    console.log("Row count: %d",res.rows.length);
    client.end();
});
