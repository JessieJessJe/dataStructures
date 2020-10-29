const db = require("./module");
const { Client } = require('pg');

// Connect to the AWS RDS Postgres database
const client = new Client(db.db_credentials);
client.connect();


//var cQuery = "CREATE TABLE meeting_type (id varchar(2) PRIMARY KEY, type_name varchar(100));";
//var cQuery = "CREATE TABLE meeting_group (groupid varchar(50) PRIMARY KEY);";
//var cQuery = "CREATE TABLE meeting_time (timeid varchar(9) PRIMARY KEY, day varchar(10), start_time varchar(10), end_time varchar(10));";
/*const cQuery = `CREATE TABLE meeting_tg ( 
                    id SERIAL PRIMARY KEY, 
                    timeid varchar(9) REFERENCES meeting_time(timeid), 
                    groupid varchar(50) REFERENCES meeting_group(groupid), 
                    type varchar(5), 
                    zone int,
                    special varchar(50));`; */
                    
const cQuery = `CREATE TABLE meeting_loc ( 
                    id SERIAL PRIMARY KEY,
                    name VARCHAR(100),
                    location VARCHAR(100),
                    lat double precision,
                    lng double precision,
                    postcode VARCHAR(10),
                    floor VARCHAR(100),
                    wheelchair BOOLEAN,
                    groupid VARCHAR(50) REFERENCES meeting_group(groupid));`;
                    


client.query(cQuery, (err, res) => {
    console.log(err, res);
    client.end();
});