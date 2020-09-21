//dependencies
const fs = require('fs'),
      path = require('path'),
      querystring = require('querystring'),
      request = require('request'),
      async = require('async'),
      dotenv = require('dotenv');
      
const dataDir = path.join(__dirname + '/../week02/location.json') ;

dotenv.config();
const KEY = process.env.KEY;
const URL = 'https://geoservices.tamu.edu/Services/Geocode/WebService/GeocoderWebServiceHttpNonParsed_V04_01.aspx';

var objArray = JSON.parse(fs.readFileSync(dataDir));
var dirList = []; 


async.eachSeries(objArray, (obj,callback) => {
  
    let query = {
        streetAddress: obj.location,
        city: "New York",
        state: "NY",
        apiKey: KEY,
        format: "json",
        version: "4.01"
    };
    
    let apiRequest = URL + '?' + querystring.stringify(query);
    
    request(apiRequest, function(err, resp, body) {
        if (err){ throw err; }

        let tamuGeo = JSON.parse(body);
        
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
        
        dirList.push(entry);
    });
  
    setTimeout(callback,1000);
    
}, (err) => {
    if (err)  throw err;
    fs.writeFileSync('address.json', JSON.stringify(dirList));
});