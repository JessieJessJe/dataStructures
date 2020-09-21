## Week Three

#### Directory
* Assignment instruction [here](https://github.com/visualizedata/data-structures/blob/master/weekly_assignment_03.md)
* The address list for geocoding [here](https://github.com/JessieJessJe/dataStructures/blob/master/week02/location.json)
* My solution in [wa03.js](https://github.com/JessieJessJe/dataStructures/blob/master/week03/wa03.js)
* Output in [address.json](https://github.com/JessieJessJe/dataStructures/blob/master/week03/address.json)

#### The Process
* Prepare the array of address information for geocoding. Since the address list was saved in a .json file, use `JSON.parse` to get the JSON array.
  ```javascript
  var objArray = JSON.parse(fs.readFileSync(dataDir));
  ```
* Iterate the JSON array to get each address's latitude and longitude data using Texas A&M Geoservices Geocoding APIs.
* Store the information retrieved in JSON object. 

   **Question:** what is the best practice to create a nested JSON object? See also in the comments below.
   ```javascript
   const entry = {};
        const nest = {};
        
        entry.address = tamuGeo.InputAddress.StreetAddress;
        
        //QUESTION: why the following wont work? in this case, 'entry' only have 'address' property; and 'entry.latlong' seems to become seperated object
        // entry.latlong.lat = tamuGeo.OutputGeocodes[0].OutputGeocode.Latitude;
        // entry.latlong.lng = tamuGeo.OutputGeocodes[0].OutputGeocode.Longitude;
        
        nest.lat = tamuGeo.OutputGeocodes[0].OutputGeocode.Latitude;
        nest.lng = tamuGeo.OutputGeocodes[0].OutputGeocode.Longitude;
        //'latlong' being nested inside 'entry'
        entry.latlong = nest;
   ```
