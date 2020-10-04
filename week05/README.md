## Week Five

#### Directory
* Assignment instruction [here](https://github.com/visualizedata/data-structures/blob/master/weekly_assignment_04.md)
* My solution in [4a.js](https://github.com/JessieJessJe/dataStructures/blob/master/week04/4a.js), [4b.js](https://github.com/JessieJessJe/dataStructures/blob/master/week04/4b.js). [4c.js](https://github.com/JessieJessJe/dataStructures/blob/master/week04/4c.js)

#### Database Model
![db model](https://github.com/JessieJessJe/dataStructures/blob/master/week04/db_model.jpg)

#### The Process
* Prepare a `module.js` of credentials to get connected with the AWS RDS POSTGRESQL Database.
  ```javascript
  //module.js
  var db_credentials = new Object();
    db_credentials.user = 'jessie';
    db_credentials.host = 'ds2020.ccf1jkcus2qg.us-east-1.rds.amazonaws.com';
    db_credentials.database = 'aa';
    db_credentials.password = process.env.RDSPW;
    db_credentials.port = 5432;
```