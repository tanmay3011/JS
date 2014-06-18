/*Parent-Child Checkbox*/
/*jslint browser: true, devel: true */
var CheckEvent = function (parentCheckBoxElement) {
  "use strict";
  this.parentCheckBoxElement = parentCheckBoxElement;
};

//method to check or uncheck sub list(child) elements
CheckEvent.prototype.subCheckBoxesEvent = function (parentBlock) {
  "use strict";
  var subCheckBoxes = document.getElementsByName(parentBlock.getAttribute("id") + "Sub"),
      subCheckBoxCounter,
      displayChoice = parentBlock.checked,
      childListName = parentBlock.getAttribute("id");
  this.subBlockDisplay(displayChoice, childListName);
  for (subCheckBoxCounter = 0; subCheckBoxCounter < subCheckBoxes.length; subCheckBoxCounter++) {
    subCheckBoxes[subCheckBoxCounter].checked = displayChoice;
  }
  parentBlock.scrollIntoView(displayChoice);
};

//method to add remove class based on the choice
CheckEvent.prototype.AddRemoveClass = function (subBlock, className) {
  subBlock.className = subBlock.className.replace(subBlock.className,""); 
  subBlock.className = subBlock.className + " " + className;
}

//method to display subblock depending on checked or unchecked 
CheckEvent.prototype.subBlockDisplay = function (displayChoice, childListName) {
  "use strict";
  var subBlock = document.getElementById(childListName + "List");
  if (displayChoice) {
    this.AddRemoveClass(subBlock, "child");
  } else {
    this.AddRemoveClass(subBlock, "hiddenField");
  }
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
  var parentCheckBoxElement = document.getElementsByName("parent");
  var checkEvent = new CheckEvent(parentCheckBoxElement);
  checkEvent.bindEvents();
};