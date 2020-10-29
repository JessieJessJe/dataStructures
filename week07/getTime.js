var fs = require('fs');
var path = require('path');
var cheerio = require('cheerio');

//load the saved page HTML


for (let i = 1; i < 11; i++) {
   parseTime(i);
  }   


async function parseTime(j){

const dataDir = await getPath(j) ;
var content = fs.readFileSync(dataDir);
var $ = cheerio.load(content);

var list=[];

// traversing the page
$('td[style="border-bottom:1px solid #e3e3e3;width:350px;"]')       
    .each(function(i, elem){
    
    var group = $(elem).prev().find('b').text().split(' - ')[0].trim().split('(')[0].trim().split('@')[0].trim();
    var entry = $(elem).text().trim().replace(/\t/g,"").trim().split("\n");  
    
    var info;
    if (entry.length == 1)
      { 
       info = getDetail(entry[0], group,j);
       list.push(info);
      // console.log(info);
       
      } else {
        
        for (let i = 0; i< entry.length; i += 4){
        console.log(i);
          info = getDetail(entry[i], group,j);
          list.push(info);
        //  console.log(info);
          
        }
      }
    });
   
fs.appendFileSync('dataClean/timeAll.json', JSON.stringify(list, null, 2));

}

function getDetail(a,b,j){
    
    var ss;
    var s = a.search("Special Interest") + 17;
    if (s > 17) {
      ss = a.slice(s);
    }
    
    var entry = a.trim().split(' ');
  
    // generating timeID based on time
    // eg, Monday 8:30PM to 9:30PM -> ID=108300930, day2=1, hour2=08300930
    var hour2 = convertTime(entry[3],entry[4]) + convertTime(entry[6],entry[7]);
    var day = getDay(entry[0]);
    
    var day2 = day.toString();
    
    var day3;
    if (entry[0] == "s"){ day3= "Sunday";} else { day3 = entry[0].slice(0, -1);} // Mondays -> Monday
    
    var info = {
    
      timeid : day2+hour2,
      group: b,
      day: day3,
      start: entry[3] +' '+ entry[4],
      end: entry[6] +' '+ entry[7],
      type: entry[10],
      special:ss,
      zone: j
      
    };
    
    return info;
}

function convertTime(a,b){
  var h;
  if (b == "PM") {
     
     if (a.split(":")[0] =="12"){
        h = '12'; 
     } else {
        h =parseInt(a.split(":")[0],10) + 12;
     };
 
  } else if (a.split(":")[0] =="10" || a.split(":")[0] =="11" ){
        h = a.split(":")[0];
       
  } else if (a.split(":")[0] =="12"){
        h = '00';
        
  } else {
        h = '0'+ a.split(":")[0];
    }
    
    return h.toString() + a.split(":")[1];
}

function getDay(b){
var day;
switch (b) {
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
    break;
  case "s": 
    day = 0;
    break;
}

return day;
}

function getPath(j){
  
    const name = __dirname + "/../week01/data/page" + j + ".txt";
    return name;
    
}