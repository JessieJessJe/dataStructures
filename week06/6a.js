const { Client } = require('pg');
const db = require('./../week04/module');

// Connect to the AWS RDS Postgres database
const client = new Client(db.db_credentials);
client.connect();

// Sample SQL statement to query meetings on Monday that start on or after 7:00pm: 
var thisQuery = "SELECT address, lat, long FROM aalocations WHERE long >= -73.95 and long <= -73.94;";

client.query(thisQuery, (err, res) => {
    if (err) {throw err}
    else {
        console.log(res.rows);
        client.end();
    }
});