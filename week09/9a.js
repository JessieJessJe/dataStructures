const db = require("./module");
const { Client } = require('pg');

// Connect to the AWS RDS Postgres database
const client = new Client(db.db_credentials);
client.connect();


        // Construct a SQL statement to insert sensor values into a table
        const cQuery = `CREATE TABLE sensor ( 
                    id SERIAL PRIMARY KEY,
                    temp DOUBLE PRECISION,
                    humi DOUBLE PRECISION,
                    time TIMESTAMP DEFAULT current_timestamp);`;
        console.log(cQuery); // for debugging

        // Connect to the AWS RDS Postgres database and insert a new row of sensor values
        client.query(cQuery, (err, res) => {
            console.log(err, res);
            client.end();
        });


                    
