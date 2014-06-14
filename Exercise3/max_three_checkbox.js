/* maximum three checkbox selection*/
/*jslint browser: true, devel: true */
var Days = function () {
  "use strict";
  this.checkedList = [];
  this.minimumCheckLimit = 3;
  this.daysChecked = "";
  //method for initiation
  this.init = function (tableIdRef, noneSelectRef, checkBoxesRef) {
    this.tableId = tableIdRef;
    this.noneSelect = noneSelectRef;
    this.checkBoxes = checkBoxesRef;
  };
};

//method to pop alert on 4th click
Days.prototype.popAlert = function () {
  "use strict";
  this.extractCheckedList("extractString");
  alert("Only " + this.minimumCheckLimit + "  days can be selected. You have already selected " + this.daysChecked);
};

//method when none is clicked
Days.prototype.checkNone = function () {
  "use strict";
  this.extractCheckedList("checkNone");
  this.checkedList.length = 0;
};

//method to extract required information from check list based on choice 
Days.prototype.extractCheckedList = function (choice) {
  "use strict"
  var checkBoxesCounter;
  this.daysChecked = "";
  for (checkBoxesCounter = 0; checkBoxesCounter < this.checkedList.length; checkBoxesCounter++) {
    if(choice === "checkNone") {
      this.checkAllNone(checkBoxesCounter);
    } else if (choice === "extractString") {
      this.extractString(checkBoxesCounter);
    } else {
      if (this.checkedList[checkBoxesCounter].id === choice) {
        return checkBoxesCounter;
      }
    }
  }
};

//method to check false all those who were checked
Days.prototype.checkAllNone = function (counter) {
  "use strict"; 
  this.checkBoxes[this.checkedList[counter].id].checked = false;
};

//method to check false all those who were checked
Days.prototype.extractString = function (counter) {
  "use strict";
  this.daysChecked = this.checkedList[counter].value + "," + this.daysChecked; 
};

//method to check the main functionality of checking three days
Days.prototype.checkBoxEvent = function (event) {
  "use strict"; 
  if (event.target.checked) {
    if (this.checkedList.length < this.minimumCheckLimit) {
      this.pushDays(event);
    } else {
      event.target.checked = false;
      this.popAlert();
    }
  } else {
    this.popDays(event);
  }
};

//method to push days into array when checked
Days.prototype.pushDays = function (event) {
  "use strict";
  this.checkedList.push(event.target);
};

//method to pop days from array when unchecked
Days.prototype.popDays = function (event) {
  "use strict";
  var popIndex;
  popIndex = this.extractCheckedList(event.target.id);
  if (popIndex !== -1) {
    this.checkedList.splice(popIndex, 1);
  }
};

//method to run javascript after loading whole page (mentioned script in head portion)
window.onload = function () {
  "use strict";
  var gridElement = document.getElementById("grid");
  var noneSelectElement = document.getElementsByClassName("checkNone");
  var checkBoxesElement = document.getElementsByName("dayCheckBox");
  var days = new Days();
  days.init(gridElement, noneSelectElement, checkBoxesElement);
  gridElement.addEventListener('click', function (event) {
    noneSelectElement[0].checked = false;
    days.checkBoxEvent(event);
  }, false);
  noneSelectElement[0].addEventListener('click', function (event) { 
    days.checkNone();
  }, false);
};
