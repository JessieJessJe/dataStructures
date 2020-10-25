var fs = require('fs');
var path = require('path');
var cheerio = require('cheerio');

//load the saved page HTML



for (let i = 1; i < 11; i++) {
    
    parseContent(i); 
    
}    

// fs.writeFileSync('dataClean/locAll.json', JSON.stringify(list, null, 2));


async function parseContent(j){
    
const dataDir = await getPath(j) ;
var content = fs.readFileSync(dataDir);
var $ = cheerio.load(content);
var list=[];
console.log(j);


$('td[style="border-bottom:1px solid #e3e3e3; width:260px"]')       
    .each(function(i, elem){
        
       var entry = $(elem).text().split("\n").map(item => item.trim()).slice(2).filter(Boolean); 
       var name = $(elem).children().first().text().trim();
       var group = $(elem).find('b').text().split(' - ')[0].trim().split('(')[0].trim();
       
       var info = getDetail(entry,name,group,j);
       list.push(info);
     
     
    });
  
 
 fs.appendFileSync('dataClean/locAll.json', JSON.stringify(list, null, 2)); 
}
    

function getDetail(a,b,c,j){
    
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
        group: c,
        loc: a[1].slice(a[1].search(/\b\d/),a[1].length).split(',')[0],
        floor: floor,
        postcode: parseInt(postcode,10),
        wheelChair: wheelchair,
        zone: j
    };
    
    return info;
}


function getPath(j){
  
    const name = __dirname + "/../week01/data/page" + j + ".txt";
    return name;
    
}

