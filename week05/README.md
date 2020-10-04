## Week Five

#### Directory
* Assignment instruction [here](https://github.com/visualizedata/data-structures/blob/master/weekly_assignment_05.md)
* My solution in [wa05.js](https://github.com/JessieJessJe/dataStructures/blob/master/week05/wa05.js)

#### The Process Blog DB Plan
In this assignment, I used a NoSQL database to store some relevant information of the photos i took on my cat, including date of creation, theme, number of photos taken, and whether or not being posted on Instagram. 
![db model](https://github.com/JessieJessJe/dataStructures/blob/master/week05/wa05_plan.png)

#### The Process
* Create a javascript class `BlogEntry` for storing the value of each entry.
```javascript
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
```
* Create sample entries.
* Get c9 connected with DynamoDB by registering *IAM* users.
* Use `async` and `await` functions to push entries into the database one at a time.

```javascript
//async method to upload all the entries via a for loop
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
```
