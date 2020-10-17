var fs = require('fs');
var path = require('path');
var cheerio = require('cheerio');

//load the saved page HTML
const dataDir = path.join(__dirname + './../week01/data/page7.txt') ;
var content = fs.readFileSync(dataDir);
var $ = cheerio.load(content);

var list=[];

$('td[style="border-bottom:1px solid #e3e3e3; width:260px"]')       
    .each(function(i, elem){
        
       var entry = $(elem).text().split("\n").map(item => item.trim()).slice(2).filter(Boolean); 
       var name = $(elem).children().first().text().trim();
       
       var info = getDetail(entry,name);
       list.push(info);
      
      console.log(info);
       // console.log(entry);
        
    });
    
fs.writeFileSync('dataClean/loc.json', JSON.stringify(list, null, 2));

function getDetail(a,b){
    
    var wheelchair = false;
    if (a[a.length - 1] == 'Wheelchair access') { wheelchair = true; }
    
    var floor = a[1].slice(a[1].search(/\b\d/),a[1].length).split(',')[1];
    if ( floor != '') { floor = floor.trim()};
    
    //outlier
    var postcode;
    if (a[2].slice(-5) == 'ccess') { postcode = '10044';}
    else {postcode = a[2].slice(-5); }
    
    var info = {
        name: b,
        group: a[0].split(' - ')[0],
        loc: a[1].slice(a[1].search(/\b\d/),a[1].length).split(',')[0],
        floor: floor,
        postcode: parseInt(postcode,10),
        wheelChair: wheelchair
    };
    
    return info;
}


