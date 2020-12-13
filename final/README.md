# Final Projects

## AA Meeting

* Demo | 
[visit demo page](https://jessiejessje.github.io/dataStructures/final_demo_1/)

![aa](https://github.com/JessieJessJe/dataStructures/blob/master/final/aameeting.png)

* Server-side Dev | 
[app.js](https://github.com/JessieJessJe/dataStructures/blob/master/final/app.js)
```sql
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
```
* Client-side Dev |
[index.html](https://github.com/JessieJessJe/dataStructures/blob/master/final_demo_1/index.html)

Considering the aa meeting dataset isn't too large, I decided to let the browser handle the filtering tasks. 

1. create a dropdown menu for filtering:
```html
    <div id="filter">
      <label for="days">Select a day:</label>
      <select name="day" id="days">
        <option value="Sunday">Sunday</option>
        <option value="Monday">Monday</option>
        <option value="Tuesday">Tuesday</option>
        <option value="Wednesday">Wednesday</option>
        <option value="Thursday">Thursday</option>
        <option value="Friday">Friday</option>
        <option value="Saturday">Saturday</option>
      </select>

      <button onclick="applyFilter()">Search</button>
    </div>

```
2. create the filted array
```javascript
  function filterData(day){
    var dd = [];

    for (let i=0; i<rawdata.length; i++){
        if (rawdata[i].day == day) {
          dd.push(rawdata[i]);
        }
    }

    return dd;
  }
```
3. update markers on the map
```javascript
 async function applyFilter(){
    var d = document.getElementById("days");
    var day = d.options[d.selectedIndex].value; 
    
    await removeMarker();
    markerLayer = L.layerGroup().addTo(mymap);

    //create the filtered array
    var data = await filterData(day);
    
    //add new markers
    for (var i=0; i < data.length; i++) {
      
       var mypopup = "<b>Group:&nbsp</b>" +  data[i].groupid + "<br /> <b>Location:&nbsp</b>" + data[i].location + "<br /><b>Day:&nbsp</b>" + data[i].day;
           mypopup += "<br /><b>Time:&nbsp</b>" + data[i].start_time + "-" + data[i].end_time + "<br /> <b>Wheelchair:&nbsp</b>" + data[i].wheelchair;
       // specify popup options 
      var customOptions =
        {
        'maxWidth': '500',
        'className' : 'custom'
        }
       var marker = L.marker( [data[i].lat, data[i].lng], {icon:myicon}).bindPopup(mypopup,customOptions)
                     .addTo(markerLayer);
                     
        marker.on('click', onClick);
        marker.meta = data[i];
    }
    
  } //end of async
 
   function removeMarker(){
    if ( markerLayer !== undefined){ mymap.removeLayer(markerLayer);}
  }
```

## Sensor

* Demo 
<img src="https://github.com/JessieJessJe/dataStructures/blob/master/final/sensor.png" width="800" />

## Process Blog

* Demo 
![blog](https://github.com/JessieJessJe/dataStructures/blob/master/final/blog.png)

* Server-side Dev |
[app.js](https://github.com/JessieJessJe/dataStructures/blob/master/final/app.js)

To filter data on the front-end, the browser/client-side will generate a url query string based on the selected filter and re-direct the page to that url. The following code shows how the server side responses to each query string request. 

In this case, I want my frontend to generate 4 different requests - empty / get class A / get class B / get both A&B. This might not be the most efficient way, but I chose to use 2 dummy parameters - post, post2, to denote all the circumstances.

```javascript
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
```

