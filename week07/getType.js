var fs = require('fs');
var cheerio = require('cheerio');


var type=[];

var content = fs.readFileSync('data/type.txt');
var $ = cheerio.load(content);

$('option').each(function(i, elem) {
    
    
    var entry = {
        typeID: $(elem).text().split('=')[0].trim(),
        name: $(elem).text().split('=')[1].trim()
    }
    type.push(entry);
});


console.log(type[1]);
fs.writeFileSync('dataClean/type.json', JSON.stringify(type,null,2));