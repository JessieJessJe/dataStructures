//dependencies
const fs = require('fs'),
      querystring = require('querystring'),
      request = require('request'),
      async = require('async'),
      dotenv = require('dotenv');
      
dotenv.config();
const KEY = process.env.KEY;
const URL = 'https://geoservices.tamu.edu/Services/Geocode/WebService/GeocoderWebServiceHttpNonParsed_V04_01.aspx';

// manually did the following steps:
// var listRaw = JSON.stringify(fs.readFileSync('dataClean/locAll.json'));
// var listClean = listRaw.replace('][',',');
var list = JSON.parse(fs.readFileSync('dataClean/locAll.json'));
var dirList = []; 

async.eachSeries(list, (obj,callback) => {
  
    let query = {
        streetAddress: obj.loc,
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
        
        obj.location = tamuGeo.InputAddress.StreetAddress;

        obj.lat = tamuGeo.OutputGeocodes[0].OutputGeocode.Latitude;
        obj.lng = tamuGeo.OutputGeocodes[0].OutputGeocode.Longitude;
        delete obj.loc;
        console.log(obj);
        dirList.push(obj);
    });
  
    setTimeout(callback,500);
    
}, (err) => {
    if (err)  throw err;
    fs.writeFileSync('dataClean/locationAll.json', JSON.stringify(dirList, null, 2));
});