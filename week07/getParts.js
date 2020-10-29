var fs = require('fs');
var async = require('async');

// remove duplicates in time table
const reducer = (accumulator, currentValue) => {
      if(!accumulator.find(obj => obj.timeid === currentValue.timeid)){
        accumulator.push(currentValue);
      }
      return accumulator;
    };
    
//var list = JSON.parse(fs.readFileSync('dataClean/locationFinal.json'));
//same result:

var list = JSON.parse(fs.readFileSync('dataClean/timeAll.json'));

var group = list.map(item => item.group);
const unique = Array.from(new Set(group)).sort();
fs.writeFileSync('dataClean/groupTable.json', JSON.stringify(unique, null, 2));


var time = list.map(item => {
    
            var obj = {
                timeid: item.timeid,
                day: item.day,
                start: item.start,
                end: item.end
            };
            return obj;
            })
            .reduce(reducer,[])
            .sort( function(a,b){
                return  (a.timeid > b.timeid) ? 1 : ((a.timeid < b.timeid) ? -1 : 0);
            });
            
fs.writeFileSync('dataClean/timeTable.json', JSON.stringify(time, null, 2));
            

var time_group = list.map(item => {

            var obj = {
                timeid:item.timeid,
                group:item.group
            };
            return obj;
            });
fs.writeFileSync('dataClean/tgTable.json', JSON.stringify(time_group, null, 2));

