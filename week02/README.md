##Week Two

#### Directory
Assignment instruction [here](https://github.com/visualizedata/data-structures/blob/master/weekly_assignment_02.md); 
My solution in [wa02.js](https://github.com/JessieJessJe/dataStructures/blob/master/week02/wa02.js)
Output in [location.json](https://github.com/JessieJessJe/dataStructures/blob/master/week02/location.json)

#### The process
* Use Cheerio to traverse the DOM tree, and locate the smallest-possible element that contains the address. In this case, its a <td> elem. However, this <td> also contains other elements such as <img>, <h4>, <br>, <b>. So the following step will get rid of these elements.  
* Save the html inside the <tg> as a string. So the address has been stored into a string along with other infomation.
* Apply multiple string operations such as slice, split, to get rid of redundant infomation. Note that there're several outliers need special treatment.
* Store the addresses in JSON. In consideration that in the future, other features such as name and date will also be needed except for the address. JSON is the suitable data type to store multiple features for one entry.
* 
#### Inspirations
* MDN Working with Objects [Link](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects)
* Extract a number from a string using JavaScript [Link](https://www.geeksforgeeks.org/extract-a-number-from-a-string-using-javascript/#:~:text=The%20number%20from%20a%20string,(%5Cd%2B)%2F)
* JavaScript Regular Expressions [Link](https://www.w3schools.com/js/js_regexp.asp)
* JQuery Tree Traversal [Link](https://api.jquery.com/category/traversing/tree-traversal/)