const db = require("./module");
const fs = require('fs')
const { Client } = require('pg');
var async = require('async');  

// Fetch the JSON address data created last week
const path = require('path')
const dataDir = path.join(__dirname + '/../week03/address.json') ;
var addressesForDb = JSON.parse(fs.readFileSync(dataDir));

// Insert each address entry into the SQL database
async.eachSeries(addressesForDb, function(value, callback) {
    const client = new Client(db.db_credentials);
    client.connect();
    
    // eg, thisQuery = INSERT INTO aalocations VALUES (E'351 E 74TH ST New York NY ', 40.7694194, -73.9555151);
    var thisQuery = "INSERT INTO aalocations VALUES (E'" + value.address + "', " + value.latlong.lat + ", " + value.latlong.lng + ");";
    
    client.query(thisQuery, (err, res) => {
        console.log(err, res);
        client.end();
    });
    setTimeout(callback, 1000); 
}); 