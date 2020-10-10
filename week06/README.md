## Week Six

#### Directory
* My solution in [6a.js](https://github.com/JessieJessJe/dataStructures/blob/master/week06/6a.js) and  [6b.js](https://github.com/JessieJessJe/dataStructures/blob/master/week06/6b.js)
* [DynamoDB Query](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Query.html#DDB-Query-request-KeyConditionExpression)

#### The Process
#### Query for the AA data in PostgreSQL (SQL DB)

```javascript
const { Client } = require('pg');

// Import the module of database credentials from week04
const db = require('./../week04/module');
const client = new Client(db.db_credentials);
client.connect();

// Sample SQL statement 
var thisQuery = "SELECT address, lat, long FROM aalocations WHERE long >= -73.95 and long <= -73.94;";

client.query(thisQuery, (err, res) => {
    if (err) {throw err}
    else {
        console.log(res.rows);
        client.end();
    }
});
```

Result of the query: only two entries satisfying the longitude conditions shows up.

![6A result](https://github.com/JessieJessJe/dataStructures/blob/master/week06/queryA.png)

#### Query for the Dear Diary data in DynamoDB (NoSQL DB)

```javascript
var params = {
    TableName : "processblog",
    KeyConditionExpression: "pk = :pkval", // partition key equality test
    ExpressionAttributeValues: { // specify query values
        ":pkval": {S: "0"} // 
    }
};

dynamodb.query(params, function(err, data) {
    if (err) {
        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
    } else {
        console.log("Query succeeded.");
        data.Items.forEach(function(item) {
            console.log("***** ***** ***** ***** ***** \n", item);
        });
    }
});
```
Result of the query: the first entry of which partition key is '0' shows up.

![6A result](https://github.com/JessieJessJe/dataStructures/blob/master/week06/queryB.png)

