/*Parent-Child Checkbox*/
/*jslint browser: true, devel: true */
var CheckEvent = function (mainBlockElement, parentCheckBoxElement, subBlockElement) {
  "use strict";
  this.parentCheckBoxElement = parentCheckBoxElement;
  this.subBlockElement = subBlockElement;
  this.mainBlock = mainBlockElement;
};

//method to display no subblock at the starting
CheckEvent.prototype.hideSubBlock = function () {
  "use strict";
  var length = this.subBlockElement.length, subBlockCounter;
  for (subBlockCounter = 0; subBlockCounter < length; subBlockCounter++) {
    this.subBlockElement[subBlockCounter].style.display = "none";
  }
};

//method to check or uncheck sub list(child) elements
CheckEvent.prototype.subCheckBoxesEvent = function (object) {
  "use strict";
  var subCheckBoxes = document.getElementsByName(object.getAttribute("id") + "Sub");
  var length = subCheckBoxes.length, subCheckBoxCounter, choice = object.checked, childListName = object.getAttribute("id");
  for (subCheckBoxCounter = 0; subCheckBoxCounter < length; subCheckBoxCounter++) {
    subCheckBoxes[subCheckBoxCounter].checked = choice;
  }
  this.subBlockDisplayScroll(choice, childListName);
  object.scrollIntoView(choice);
};


//method to display subblock depending on checked or unchecked 
CheckEvent.prototype.subBlockDisplayScroll = function (choice, childListName) {
  "use strict";
  var subBlock = document.getElementById(childListName + "List");
  subBlock.style.display = this.subBlockDisplay(choice);
  subBlock.scrollIntoView(choice);
};

//method to display sublock
CheckEvent.prototype.subBlockDisplay = function (choice) {
  "use strict";
  var displayChoice;
  if (choice) {
    displayChoice = "block";
  } else {
    displayChoice = "none";
  }
  console.log(choice);
  return displayChoice;
};

//method to bind event on click
CheckEvent.prototype.bindEvents = function () {
  "use strict";
  var that = this, parentCounter;
  for (parentCounter = 0; parentCounter < this.parentCheckBoxElement.length; parentCounter++) {
    this.parentCheckBoxElement[parentCounter].onclick = function () { that.subCheckBoxesEvent(this); };
  }
};

window.onload = function () {
  "use strict";
  var mainBlockElement = document.getElementById("main");
  var parentCheckBoxElement = document.getElementsByName("parent");
  var subBlockElement = document.getElementsByName("child");
  var checkEvent = new CheckEvent(mainBlockElement, parentCheckBoxElement, subBlockElement);
  checkEvent.hideSubBlock();
  checkEvent.bindEvents();
};