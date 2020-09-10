// npm install request
// mkdir data

const request = require('request');
const fs = require('fs');


function getUrl(j){
  
    if  (j<10){
        const url = "https://parsons.nyc/aa/m0" + j + ".html";
        return url; }
        
    else{
        const url = "https://parsons.nyc/aa/m" + j + ".html";
        return url; 
    }
 
}

function getFilename(j){
  
    const name = __dirname + "/data/page" + j + ".txt";
    return name;
    
}

async function saveFile(i){
  
  
  const url = await getUrl(i);
  const fn = await getFilename(i);
  
  request(url, function(error, response, body){
   
    if (!error && response.statusCode == 200){
        
        fs.writeFile(fn, body, (err) => {
              if (err) throw err;
              console.log( "save", i);
             });
       }
    else {
        console.log(error);
    }
  });
}



for (let i = 1; i < 11; i++) {
  
saveFile(i); 

}
