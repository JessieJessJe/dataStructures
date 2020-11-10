const db = require("./module");
const { Client } = require('pg');

// Connect to the AWS RDS Postgres database
const client = new Client(db.db_credentials);
client.connect();

var getAndWriteData = function() {
    
    // Make request to the Particle API to get sensor values
    request(device_url, function(error, response, body) {
        
        // Store sensor value(s) in a variable
        var sv = JSON.parse(body).result;
        
        // Connect to the AWS RDS Postgres database
        const client = new Client(db_credentials);
        client.connect();

        // Construct a SQL statement to insert sensor values into a table
        const cQuery = `CREATE TABLE sensor ( 
                    id SERIAL PRIMARY KEY,
                    temp DOUBLE PRECISION,
                    humi DOUBLE PRECISION,
                    time TIMESTAMP DEFAULT current_timestamp);`;
        console.log(thisQuery); // for debugging

        // Connect to the AWS RDS Postgres database and insert a new row of sensor values
        client.query(thisQuery, (err, res) => {
            console.log(err, res);
            client.end();
        });
    });
};

// write a new row of sensor data every five minutes
setInterval(getAndWriteData, 60000);
                    
