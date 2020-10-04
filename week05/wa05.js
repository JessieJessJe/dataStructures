var blogEntries = [];

// Standard Practice: Put initial letter in UPPER case to indicate 'class'
class BlogEntry {
  constructor(primaryKey, date, entry, ins, ipic) {
    this.pk = {};
    this.pk.S = primaryKey.toString();
    this.date = {}; 
    this.date.S = new Date(date).toDateString();
    this.entry = {};
    this.entry.S = entry;
    this.ins = {};
    this.ins.BOOL = ins; 
    if (ipic != null) {
      this.ipic = {};
      this.ipic.N = ipic.toString(); 
    }
    this.month = {};
    this.month.N = new Date(date).getMonth().toString();
  }
}

blogEntries.push(new BlogEntry(0, 'Sept 13 2020', "First time on leash", true, 22));
blogEntries.push(new BlogEntry(1, 'September 21, 2020', "Second time on leash", true, 4));
blogEntries.push(new BlogEntry(2, 'September 22, 2020', "Walked in the garden on leash successfully!", false, 10));
blogEntries.push(new BlogEntry(3, 'September 23, 2020', "Spot another cat from the upper floor", true,17));
blogEntries.push(new BlogEntry(4, 'September 25, 2020', "Found a mantis...and finaly ate it", false,20));

console.log(blogEntries);

var AWS = require('aws-sdk');
AWS.config = new AWS.Config();
AWS.config.region = "us-east-1";

var dynamodb = new AWS.DynamoDB();

//async method to put in all entries
function getParams(i){
  var params = {};
    params.Item = blogEntries[i]; 
    params.TableName = "processblog";
  return params;
}

async function putEachItem(i){
  
  const params = await getParams(i);
  
  dynamodb.putItem(params, function (err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
  });
}
  
for (let i=0; i<BlogEntry.length; i++){
  putEachItem(i);
}



