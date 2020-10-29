## Week Seven

#### DB Schema & Directory

meeting_loc (**id**, name, location, lat, lng, postcode,  floor, wheelchair, *groupid(fk)*)

* Data Processing: [extract info from webpages](https://github.com/JessieJessJe/dataStructures/blob/master/week07/getLocation.js) => [add GEOcode](https://github.com/JessieJessJe/dataStructures/blob/master/week07/getGEO.js) => [clean format](https://github.com/JessieJessJe/dataStructures/blob/master/week07/clean.js)
* JSON: [meeting_loc](https://github.com/JessieJessJe/dataStructures/blob/master/week07/dataClean/locationFinal.json)

meeting_tg(**id**, type, zone, special, *timeid(fk)*, *groupid(fk)*)

* Data Processing: [extract info from webpages](https://github.com/JessieJessJe/dataStructures/blob/master/week07/getTime.js)
* JSON: [meeting_tg](https://github.com/JessieJessJe/dataStructures/blob/master/week07/dataClean/timeAll.json)

meeting_time(**timeid**, day, start_time, end_time)

* Data Processing: [seperate time data from the above JSON(meeting_tg)](https://github.com/JessieJessJe/dataStructures/blob/master/week07/getParts.js) 
* JSON: [meeting_time](https://github.com/JessieJessJe/dataStructures/blob/master/week07/dataClean/timeTable.json)

meeting_group(**groupid**)

* Data Processing: [seperate group data from the above JSON(meeting_tg)](https://github.com/JessieJessJe/dataStructures/blob/master/week07/getParts.js) 
* JSON: [meeting_group](https://github.com/JessieJessJe/dataStructures/blob/master/week07/dataClean/groupTable.json)
