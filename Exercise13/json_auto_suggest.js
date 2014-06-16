/*Name Auto Suggest*/
/*jslint browser: true, devel: true */
var person = [ {"name":"Luigi Damiano"},
  {"name":"Zenith Coboro"},
  {"name":"Zig Ziglar"},
  {"name":"Steve Costner"},
  {"name":"Bill Grazer"},
  {"name":"Timothy Frazer"},
  {"name":"Boris Becker"},
  {"name":"Glenn Gladwich"},
  {"name":"Jim Jackson"},
  {"name":"Aaron Kabin"},
  {"name":"Roy Goldwin"},
  {"name":"Jason Goldberg"},
  {"name":"Tim Ferris"},
  {"name":"Buck Singham"},
  {"name":"Malcom Gladwell"},
  {"name":"Joy Rabura"},
  {"name":"Vid Luther"},
  {"name":"Tom Glicken"},
  {"name":"Ray Baxter"},
  {"name":"Ari Kama"},
  {"name":"Kenichi Suzuki"},
  {"name":"Rick Olson"} ];

//class
var AutoComplete = function (nameElement) {
  "use strict";
  this.nameElement = nameElement;
};

//method  to find matching names
AutoComplete.prototype.setName = function () {
  "use strict";
  var namesCounter ,
      nameArray = document.getElementById("container"),
        suggestionArray = [];
  nameArray.style.display = "none";
  this.clearList(nameArray, suggestionArray);
  for (namesCounter = person.length - 1; namesCounter >= 0; namesCounter--) {
    if(person[namesCounter].name.toLowerCase().indexOf(this.nameElement.value.toLowerCase()) > -1) {
      suggestionArray.push(person[namesCounter].name);
    }
  }
  this.displayName(suggestionArray, nameArray);
};

//method to display list
AutoComplete.prototype.displayName = function (suggestionArray, nameArray) {
  "use strict";
  var that = this, namesCounter, node;
  for (namesCounter = 0; namesCounter < suggestionArray.length; namesCounter++) {
    if (suggestionArray.length > 0) {
      node = this.createNode(namesCounter, suggestionArray);
      nameArray.appendChild(node);
      nameArray.style.display = "block";
      node.onclick = function() {
        that.nameElement.value = this.textContent;
        that.clearList(nameArray, suggestionArray);
      }
    }
  }
};

//method to clear the list
AutoComplete.prototype.clearList = function(nameArray, suggestionArray) {
  "use strict";
  nameArray.innerHTML = '';
  nameArray.style.display = 'none';
  suggestionArray.length = 0;
};

//create a paragraph node to display the matching text
AutoComplete.prototype.createNode = function (namesCounter, suggestionArray) {
  "use strict";
  var node = document.createElement("p");
  var text = document.createTextNode(suggestionArray[namesCounter]);
  node.appendChild(text);
  return node;
};

//to run once the whole page loads
window.onload = function () {
  "use strict";
  var nameElement = document.getElementById('fullName');
  var autoComplete = new AutoComplete(nameElement);
  nameElement.addEventListener('keyup' , function(event) { autoComplete.setName(); }, false);
};