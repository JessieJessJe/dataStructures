const dotenv = require('dotenv');
dotenv.config();  

//connect to a different database 'db-october' from previous

// AWS RDS POSTGRESQL INSTANCE
var db_credentials = new Object();
db_credentials.user = 'jessie';
db_credentials.host = 'db-october.ccf1jkcus2qg.us-east-1.rds.amazonaws.com';
db_credentials.database = 'aa';
db_credentials.password = process.env.RDSPW;
db_credentials.port = 5432;

module.exports.db_credentials = db_credentials;