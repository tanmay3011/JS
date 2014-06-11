/*Prompt Name and then print it into the window*/
/*jslint browser: true, devel: true */
var PromptName = function (displayElement) {
  "use strict";
  this.displayElement = displayElement;
  this.firstName = "";
  this.secondName = "";
  this.valid = true;
  this.regexName = /^[a-z ,.'-]+$/i;
};

//main method to call both input from user
PromptName.prototype.Name = function () {
  "use strict";
  this.firstName = this.getName('First Name');
  this.secondName = this.getName('Second Name');
  this.printNameInPage();
};

//method to receive name from user
PromptName.prototype.getName = function (nameType) {
  "use strict"; 
  var name,check; 
  do{
    name = prompt("Please enter your " + nameType);
    check = this.validateName(name, nameType);
  } while(check);
  return name
};

//method to print name on HTML page
PromptName.prototype.printNameInPage = function () {
  "use strict";
  var fullName = "Hello " + this.firstName + " " + this.secondName;
  this.displayElement.innerHTML = fullName;
};

//method to validate name i.e. to check wheter the input is null or not
PromptName.prototype.validateName = function(name, nameType) {
  "use strict";
  if (!this.regexName.test(name) || !name) {
    alert("Invalid " + nameType +" please enter again");
    return true;
  } else {
    return false;
  }
};

window.onload = function () {
  "use strict";
  var displayElement = document.getElementById("box");
  var promptName = new PromptName(displayElement);
  promptName.Name();
}
 
