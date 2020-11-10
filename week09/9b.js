const db = require("./module");
const { Client } = require('pg');
var request = require('request');

var device_id = process.env.PHOTON_ID;
var access_token = process.env.PHOTON_TOKEN;
//var device_id = 'e00fce6841ef535ed52e7c58';
//var access_token = 'a989b8f8e508755f68f8c3247a44086c19215f4e';
var temp_variable = 'temp';
var humi_variable = 'humi';
var temp_url = 'https://api.particle.io/v1/devices/' + device_id + '/' + temp_variable + '?access_token=' + access_token;
var humi_url = 'https://api.particle.io/v1/devices/' + device_id + '/' + humi_variable + '?access_token=' + access_token;
console.log(temp_url);

var record = [];

function insertData(type,data){
    record[type]=data;
}

function getData(){
    

    // Make request to the Particle API to get sensor values
    request(temp_url, function(error, response, body) {
        // Store sensor value(s) in a variable
       var data = JSON.parse(body).result; 
       insertData(0,data);
       
    });
    
    request(humi_url, function(error, response, body) {
        // Store sensor value(s) in a variable
       var data = JSON.parse(body).result; 
       insertData(1,data);
       
    });
    
    return 1;

}

async function getAndWriteData() {
        
    // Connect to the AWS RDS Postgres database
    const client = new Client(db.db_credentials);
    client.connect(); 
    

    let ready = await getData();
    console.log(record);    
        
    // Construct a SQL statement to insert sensor values into a table
    const cQuery = "INSERT INTO sensor(temp,humi,time) VALUES (" + record[0] + "," + record[1] + ", DEFAULT);" ;
    console.log(cQuery); // for debugging
    

    // Connect to the AWS RDS Postgres database and insert a new row of sensor values
    client.query(cQuery, (err, res) => {
        console.log(err, res);
        client.end(); });
};

// write a new row of sensor data every five minutes
setInterval(getAndWriteData, 300000);
                    
