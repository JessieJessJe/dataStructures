const db = require("./module");
const fs = require('fs')
const { Client } = require('pg');
var async = require('async');  


//var list = JSON.parse(fs.readFileSync('dataClean/groupTable.json'));
var list = JSON.parse(fs.readFileSync('dataClean/locationFinal.json'));


async.eachSeries(list, function(value, callback) {

const client = new Client(db.db_credentials);
client.connect();

    
    // thisQuery = INSERT INTO aalocations VALUES (E'351 E 74TH ST New York NY ', 40.7694194, -73.9555151);
    //var thisQuery = "INSERT INTO meeting_group VALUES ($$"+ value +"$$);";
    //var thisQuery = "INSERT INTO meeting_time VALUES ($$"+ value.timeid +"$$ , $$" + value.day + "$$ , $$"+ value.start + "$$ , $$" + value.end + "$$ );";
    //var thisQuery = "INSERT INTO meeting_tg(timeid, groupid, type, zone, special) VALUES ($$"+ value.timeid +"$$ , $$" + value.group + "$$ , $$"+ value.type + "$$ , $$" + value.zone + "$$, $$" + value.special +"$$ );";
    var thisQuery = "INSERT INTO meeting_loc(name,location,lat,lng,postcode,floor,wheelchair,groupid) VALUES ($$"+ value.name +"$$ , $$" + value.location + "$$ , $$"+ value.lat + "$$ , $$" + value.lng + "$$ , $$"+ value.postcode + "$$ , $$" + value.floor + "$$, $$" + value.wheelChair +"$$, $$" + value.group +"$$ );";
    
    
    
    client.query(thisQuery, (err, res) => {
        console.log(err, res);
        client.end();
    });
    setTimeout(callback, 100); 
}); 