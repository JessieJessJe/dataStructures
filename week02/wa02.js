var fs = require('fs');
var path = require('path');
var cheerio = require('cheerio');

//load the saved page HTML
const dataDir = path.join(__dirname + '/../week01/data/page7.txt') ;
var content = fs.readFileSync(dataDir);

//create a JSON object to store the locations
var dir = {
    name:'', // for future usage
    address:''
    }
var dirList = [];       
    

var $ = cheerio.load(content);

// traversing the page
var t = $('h1').siblings('table').children('tbody')

// QUESTION -- t or $(t)? why nextALL() not working
t.find('h4').parent().each(function(i, elem) {
    var raw =$(elem).html().trim();
   
    // get the string containing address info
    var r1 = raw.split('</b><br>');
    var r2 = r1[1].split('<br>');
    
    // start with Street No. ; end with ','
    var r3 = r2[0].slice(r2[0].search(/\b\d/),r2[0].length).split(',');
    
    // delete the part after '-'
    var r4 = r3[0].split('-');
    
    console.log(r4[0]);
    
    var entry = Object.create(dir);
    entry.location = r4[0];
    
    dirList.push(entry);
    
});

fs.writeFileSync('location.json', JSON.stringify(dirList));