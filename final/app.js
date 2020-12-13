var express = require('express'), 
    app = express();
const { Pool } = require('pg');
var AWS = require('aws-sdk');
//const moment = require('moment-timezone');
const handlebars = require('handlebars');
var fs = require('fs');

var path = require('path');
var dir = path.join(__dirname, 'public');


const db = require("./module");


const aaSource = fs.readFileSync("templates/aa.txt").toString();
var aatemplate = handlebars.compile(aaSource, { strict: true });

const pbSource = fs.readFileSync("templates/blog.txt").toString();
var pbtemplate = handlebars.compile(pbSource, { strict: true });

const sSource = fs.readFileSync("templates/sensor.txt").toString();
var stemplate = handlebars.compile(sSource, { strict: true });

app.get('/', function(req, res) {
    res.send('<h3>Code demo site</h3><ul><li><a href="/aa">aa meetings</a></li><li><a href="/temperature">temp sensor</a></li><li><a href="/processblog">process blog</a></li></ul>');
}); 

app.get('/aa', function(req, res) {

    // Connect to the AWS RDS Postgres database
    const client = new Pool(db.db_credentials);
    client.connect();
   
    var thisQuery = `
    SELECT *
    FROM meeting_loc 
    JOIN ( SELECT *
                FROM meeting_tg
                JOIN ( SELECT *
                            FROM meeting_time
                        ) sub_time
                ON meeting_tg.timeid = sub_time.timeid
            ) sub_tg
    ON meeting_loc.groupid = sub_tg.groupid
                    `;
    
    client.query(thisQuery, (qerr, qres) => {
        if (qerr) { throw qerr }
      
        else {
            res.send(aatemplate({ aadata: JSON.stringify(qres.rows)}));
            client.end();
            console.log('responded to request for aa meeting data');
        }
    });
});

app.get('/temperature', function(req, res) {

    // Connect to the AWS RDS Postgres database
    const client = new Pool(db.db_credentials);

    // SQL query 
    var q = `
    SELECT 	temp, humi,
		    TIME as EST,
		    date_trunc('minute', TIME) as est_min
		    
    FROM sensor
    WHERE temp >0 AND temp <100 AND humi is NOT NULL 
        AND TIME - INTERVAL '5 hours' > timestamp '2020-11-09 23:59:59'
        AND TIME - INTERVAL '5 hours' < timestamp '2020-11-30 23:59:59';
    
    `;

    client.connect();
    client.query(q, (qerr, qres) => {
        if (qerr) { throw qerr }
        else {
            res.send(stemplate({ sensordata: JSON.stringify(qres.rows)}));
            client.end();
            console.log('responded to request for sensor graph');
        }
    });
}); 

app.get('/processblog', function(req, res) {
    // AWS DynamoDB credentials
    AWS.config = new AWS.Config();
    AWS.config.region = "us-east-1";

    // Connect to the AWS DynamoDB database
    var dynamodb = new AWS.DynamoDB();
    
    // GET query parameters -- post, post2 defined as:
    //              post        post2
    // get A        1           0
    // get B        0           1
    // get A&B      1           1
    let post = (req.query.post == 'true') ? true : false;
    let post2 = (req.query.post2 == 'true') ? true : false;
    
    // DynamoDB (NoSQL) query
    if (post && post2) {
        var params = {
            TableName : "processblog",
            ReturnConsumedCapacity: "TOTAL"
            }
        } else if (post){
            
            var params = {
            TableName : "processblog",
            ReturnConsumedCapacity: "TOTAL",
            FilterExpression: "ins = :val",
            ExpressionAttributeValues: {
                ":val": { "BOOL": true},
               }
            }
        } else if (post2){
            
            var params = {
            TableName : "processblog",
            ReturnConsumedCapacity: "TOTAL",
            FilterExpression: "ins = :val",
            ExpressionAttributeValues: {
                ":val": { "BOOL": false},
               }
            }};
    
    if ( post || post2) {
    
    dynamodb.scan(params, function(err, data) {
        if (err) {
            console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
            throw (err);
        }
        else {
            
            res.send(pbtemplate({ pbdata: JSON.stringify(data.Items)}));
            console.log('responded to request for process blog data');
            }
        });
    } else {
        let dumidata=[];
        res.send(pbtemplate({ pbdata: JSON.stringify(dumidata)}));
    }
    
}); 


// serve static files in /public
app.use('/public', express.static(dir));

app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!");
});

// listen on port 8080
var port = process.env.PORT || 8080;

app.listen(port, function() {
    console.log('Server listening...');
});