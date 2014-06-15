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
var Names = function (nameElement) {
  "use strict";
  this.suggestionArray = [];
  this.nameElement = nameElement;
  this.init();
};

//initialisation
Names.prototype.init = function () {
  "use strict";
  this.nameArray = document.getElementById("container");
  this.nameArray.style.display = "none";
};

//method  to find matching names
Names.prototype.setName = function () {
  "use strict";
  var namesCounter;
  this.clearList();
  for (namesCounter = person.length - 1; namesCounter >= 0; namesCounter--) {
    if(person[namesCounter].name.toLowerCase().indexOf(this.nameElement.value) > -1) {
      this.suggestionArray.push(person[namesCounter].name);
    }
  }
  this.displayName();
};

//method to display list
Names.prototype.displayName = function () {
  "use strict";
  var that = this, namesCounter, node;
  for (namesCounter = 0; namesCounter < this.suggestionArray.length; namesCounter++) {
    if (this.suggestionArray.length > 0) {
      node = this.createNode(namesCounter);
      this.nameArray.appendChild(node);
      this.nameArray.style.display = "block";
      node.onclick = function() {
        that.nameElement.value = this.textContent;
        that.clearList();
      }
    }
  }
};

//method to clear the list
Names.prototype.clearList = function() {
  "use strict";
  this.nameArray.innerHTML = '';
  this.nameArray.style.display = 'none';
  this.suggestionArray.length = 0;
};

//create a paragraph node to display the matching text
Names.prototype.createNode = function (namesCounter) {
  "use strict";
  var node = document.createElement("p");
  var text = document.createTextNode(this.suggestionArray[namesCounter]);
  node.appendChild(text);
  return node;
};

//to run once the whole page loads
window.onload = function () {
  "use strict";
  var nameElement = document.getElementById('fullName');
  var names = new Names(nameElement);
  nameElement.addEventListener('keyup' , function(event) { names.setName(); }, false);
};