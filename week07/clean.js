var fs = require('fs');
var async = require('async');


var list = JSON.parse(fs.readFileSync('dataClean/locationAll.json'));

async.eachSeries(list, (obj,callback) => {
    
    obj.group = obj.group.split('@')[0].trim();
    setTimeout(callback,100);
    
}, (err) => {
    if (err)  throw err;
    fs.writeFileSync('dataClean/locationFinal.json', JSON.stringify(list, null, 2));
});

//already cleaned
//var tlist = JSON.parse(fs.readFileSync('dataClean/timeAll.json'));


    