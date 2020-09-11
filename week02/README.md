## Week Two

#### Directory
* Assignment instruction [here](https://github.com/visualizedata/data-structures/blob/master/weekly_assignment_02.md)
* The web page for data extraction [here](https://parsons.nyc/aa/m07.html)
* My solution in [wa02.js](https://github.com/JessieJessJe/dataStructures/blob/master/week02/wa02.js)
* Output in [location.json](https://github.com/JessieJessJe/dataStructures/blob/master/week02/location.json)

#### The process
* Use Cheerio to traverse the DOM tree, and locate the smallest-possible element that contains the address. In this case, its a `<td>` elem. However, this <td> also contains other elements such as `<img>`, `<h4>`, `<br>`, `<b>`. So the following step will get rid of these elements.  

  ![DOM screenshot](https://github.com/JessieJessJe/dataStructures/blob/master/week02/traverse.png)
  
  As the above screenshot shows, `<td>` is inside of a `<tr>` of a `<table>`, whose siblings include a UNIQUE `<h1>`. 
  
  Furthermore, each `<tr>` has three `<td>` children. Only the first child has address info marked by a `<h4>`.
  
  So the following is one way to traverse. *Please let me know if there's any method more efficient than this!*
  
  ```javascript
  var t = $('h1').siblings('table').children('tbody');
  t.find('h4').parent() //.each(function {to extract the address})
  ```
* Save the html inside the `<td>` as a string. So the address has been stored into a string along with other infomation.
  ```javascript
  var raw =$(elem).html().trim();
  ```
  
* Apply multiple string operations such as slice, split, search, to get rid of redundant infomation. The general pipeline `r1` -> `r2` -> `split(',')` works in most of the time. But there're several outliers need special treatments. So `r3`(except the `.split` part) and `r4` are for dealing with outliers.
  
  ```javascript    
    // get the string containing address info
    var r1 = raw.split('</b><br>');
    var r2 = r1[1].split('<br>');
    
    // start with Street No. ; end with ','
    var r3 = r2[0].slice(r2[0].search(/\b\d/),r2[0].length).split(',');
    
    // delete the part after '-'
    var r4 = r3[0].split('-');
    
  ```  
   
   To know more about outliers, see screenshots: 
   
   [I need r3!](https://github.com/JessieJessJe/dataStructures/blob/master/week02/catch_redundancy1%20.png) to remove the text 'Church of the Good Shepard' before address; 
   
   [I need r4!](https://github.com/JessieJessJe/dataStructures/blob/master/week02/catch_redundancy2.png) to remove the text '- Rectory basement' after address.
  
* Store the addresses in JSON. In consideration that in the future, other features such as name and date will also be needed, JSON is the suitable data type to store multiple features for each entry.

#### Inspirations
* MDN Working with Objects [Link](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects)
* Extract a number from a string using JavaScript [Link](https://www.geeksforgeeks.org/extract-a-number-from-a-string-using-javascript/#:~:text=The%20number%20from%20a%20string,(%5Cd%2B)%2F)
* JavaScript Regular Expressions [Link](https://www.w3schools.com/js/js_regexp.asp)
* JQuery Tree Traversal [Link](https://api.jquery.com/category/traversing/tree-traversal/)
