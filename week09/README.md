## Week Eight & Nine

#### IoT Development: Particle Argon + DHT22

Device Setup 

![image](https://github.com/JessieJessJe/dataStructures/blob/master/week09/IMG_6297.jpg)

Code in Particle Web IDE
Modified the example from Adafruit_DHT library, creating two global variables: temp and humi. [dht.info](https://github.com/JessieJessJe/dataStructures/blob/master/week09/dht.ino)

#### Fetch API Data: Particle API + AWS cloud9 + pm2

I constructed an array `record` for storing temperature `record[0]` and humidity `record[1]` data. 

So each time when a request being triggered and fetching a data point through Particle API, the data will be either stored in `record[0]` or `record[1]`.
[9b.js](https://github.com/JessieJessJe/dataStructures/blob/master/week07/getTime.js)

````javascript
var record = [];

function insertData(type,data){
    record[type]=data;
}

function getData(){
    

    // Make request to the Particle API to get sensor values
    request(temp_url, function(error, response, body) {
        // Store sensor value(s) in a variable
       var data = JSON.parse(body).result; 
        // Put the value into an array, 0 - temperature; 1 - humidity
       insertData(0,data);
       
    });
    
    request(humi_url, function(error, response, body) {
       var data = JSON.parse(body).result; 
       insertData(1,data);
       
    });
    
    return 1;

}
````

Built asynchronous function using async/await: Once the temperature and humidity data are ready, insert them into the database. 

````javascript
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
````

#### Database Mgmt: PostgreSQL

Create sensor table [9a.js](https://github.com/JessieJessJe/dataStructures/blob/master/week09/9a.js)
````sql
CREATE TABLE sensor ( 
                    id SERIAL PRIMARY KEY,
                    temp DOUBLE PRECISION,
                    humi DOUBLE PRECISION,
                    time TIMESTAMP DEFAULT current_timestamp);
````
Insert into sensor table [9b.js](https://github.com/JessieJessJe/dataStructures/blob/master/week09/9b.js)
````sql
INSERT INTO sensor(temp,humi,time) VALUES (" + record[0] + "," + record[1] + ", DEFAULT);
````

Result

Question: why there're are null values in the database? 

![image](https://github.com/JessieJessJe/dataStructures/blob/master/week09/db.png)





