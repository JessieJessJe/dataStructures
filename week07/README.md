## Week Seven

#### Process & Directory

meeting_loc (**id**, name, location, lat, lng, postcode,  floor, wheelchair, *groupid(fk)*)

* Data Processing: [extract info from webpages](https://github.com/JessieJessJe/dataStructures/blob/master/week07/getLocation.js) => [add GEOcode](https://github.com/JessieJessJe/dataStructures/blob/master/week07/getGEO.js) => [additional cleaning](https://github.com/JessieJessJe/dataStructures/blob/master/week07/clean.js)
* JSON: [meeting_loc](https://github.com/JessieJessJe/dataStructures/blob/master/week07/dataClean/locationFinal.json)

meeting_tg(**id**, type, zone, special, *timeid(fk)*, *groupid(fk)*)

* Data Processing: [extract info from webpages](https://github.com/JessieJessJe/dataStructures/blob/master/week07/getTime.js)
* JSON: [meeting_tg](https://github.com/JessieJessJe/dataStructures/blob/master/week07/dataClean/timeAll.json)

meeting_time(**timeid**, day, start_time, end_time)

* Data Processing: [seperate time data from JSON(meeting_tg)](https://github.com/JessieJessJe/dataStructures/blob/master/week07/getParts.js) 
* JSON: [meeting_time](https://github.com/JessieJessJe/dataStructures/blob/master/week07/dataClean/timeTable.json)

meeting_group(**groupid**)

* Data Processing: [seperate group data from the JSON(meeting_tg)](https://github.com/JessieJessJe/dataStructures/blob/master/week07/getParts.js) 
* JSON: [meeting_group](https://github.com/JessieJessJe/dataStructures/blob/master/week07/dataClean/groupTable.json)

#### SQL

Create a schema:

````sql
CREATE TABLE meeting_group (groupid varchar(50) PRIMARY KEY);

CREATE TABLE meeting_time (timeid varchar(9) PRIMARY KEY, day varchar(10), start_time varchar(10), end_time varchar(10));

CREATE TABLE meeting_tg ( 
                    id SERIAL PRIMARY KEY, 
                    timeid varchar(9) REFERENCES meeting_time(timeid), 
                    groupid varchar(50) REFERENCES meeting_group(groupid), 
                    type varchar(5), 
                    zone int,
                    special varchar(50));
                    
CREATE TABLE meeting_loc ( 
                    id SERIAL PRIMARY KEY,
                    name VARCHAR(100),
                    location VARCHAR(100),
                    lat double precision,
                    lng double precision,
                    postcode VARCHAR(10),
                    floor VARCHAR(100),
                    wheelchair BOOLEAN,
                    groupid VARCHAR(50) REFERENCES meeting_group(groupid));
````

Insert all the entries saved in JSON. Dollar Quoating to escape apostrophes:

````sql
INSERT INTO meeting_group VALUES ($$"+ value +"$$);

INSERT INTO meeting_time VALUES ($$"+ value.timeid +"$$ , $$" + value.day + "$$ , $$"+ value.start + "$$ , $$" + value.end + "$$ );

INSERT INTO meeting_tg(timeid, groupid, type, zone, special) VALUES ($$"+ value.timeid +"$$ , $$" + value.group + "$$ , $$"+ value.type + "$$ , $$" + value.zone + "$$, $$" + value.special +"$$ );

INSERT INTO meeting_loc(name,location,lat,lng,postcode,floor,wheelchair,groupid) VALUES ($$"+ value.name +"$$ , $$" + value.location + "$$ , $$"+ value.lat + "$$ , $$" + value.lng + "$$ , $$"+ value.postcode + "$$ , $$" + value.floor + "$$, $$" + value.wheelChair +"$$, $$" + value.group +"$$ );
````
#### Debugging

Ofterntimes when I first inserted the JSON data into each table, several entries would be missing. To find out why, I downloaded both the JSON and database(DB) data as .csv, and compared the'primary key' columns from JSON and DB in a google sheet. 

For example, the following screenshot shows the missing values after the first time I updated the 'meeting_tg' table. Then I went back to the JSON file to locate the data points. Most of the time, what caused the error was a mismatch between a value and its data type. Huh, done! 

![debug](https://github.com/JessieJessJe/dataStructures/blob/master/week07/debug.png)
