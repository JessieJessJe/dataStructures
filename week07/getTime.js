var fs = require('fs');
var path = require('path');
var cheerio = require('cheerio');

//load the saved page HTML
const dataDir = path.join(__dirname + '/../week01/data/page7.txt') ;
var content = fs.readFileSync(dataDir);
var $ = cheerio.load(content);

var groupList = JSON.parse(fs.readFileSync('dataClean/group.json'));

var list=[];


function getDetail(a,b){
    
    var ss;
    var s = a.search("Special Interest") + 17;
    if (s > 17) {
      ss = a.slice(s);
    }
    
    var entry = a.trim().split(' ');
    
    if (entry[4] == "PM") {
        var hh = entry[3].split(":")[0];
        var h = parseInt(hh,10) + 12;
    } else {
        var h = entry[3].split(":")[0];
    }
    
    var hour2 = h.toString() + entry[3].split(":")[1];
    
    var day = getDay(entry[0]);
    var day2 = day.toString();
 
  
    
    var info = {
    
      //id: day2.concat(hour2),
      
      id : day2.concat(hour2),
      day: entry[0].slice(0, -1),
      hour: entry[3].concat(entry[4]),
      type: entry[10],
      group: b,
      special:ss
      
    }
    
    return info;
}

// traversing the page
$('td[style="border-bottom:1px solid #e3e3e3;width:350px;"]')       
    .each(function(i, elem){
    
    var group = $(elem).prev().find('b').text().split('-')[0].trim();
    var entry = $(elem).text().trim().replace(/\t/g,"").trim().split("\n");      
    //var entry2=$(elem).text().trim();
    
    if (entry.length == 1)
      { 
       var info = getDetail(entry[0], group);
       list.push(info);
       console.log(info);
       
      } else {
        
        for (let i = 0; i< entry.length; i += 4){
          console.log(i);
          var info = getDetail(entry[i], group);
          list.push(info);
          console.log(info);
          
        }
      }
  
   
         
    
    });
   
    

fs.writeFileSync('dataClean/time.json', JSON.stringify(list, null, 2));

function getDay(b){

var day;
switch (b.trim()) {
  case "Sundays":
    day = 0;
    break;
  case "Mondays":
    day = 1;
    break;
  case "Tuesdays":
     day = 2;
    break;
  case "Wednesdays":
    day = 3;
    break;
  case "Thursdays":
    day = 4;
    break;
  case "Fridays":
    day = 5;
    break;
  case "Saturdays":
    day = 6;
}

return day;
}
