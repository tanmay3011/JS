/* maximum three checkbox selection*/
/*jslint browser: true, devel: true */
var Days = function () {
  "use strict";
  this.checkedList = [];
  this.checkedListIndex = [];
  this.minimumCheckLimit = 3;
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
  alert("Only 3 days can be selected. You have already selected " + this.checkedList.toString());
};

//method when none is clicked
Days.prototype.checkNone = function () {
  "use strict";
  var checkBoxesCounter;
  for (checkBoxesCounter = 0; checkBoxesCounter < this.checkedListIndex.length; checkBoxesCounter++) {
    this.checkBoxes[this.checkedListIndex[checkBoxesCounter]].checked = false;
  }
  this.checkedList.length = 0;
};

//method to check the main functionality of checking three days
Days.prototype.checkBoxEvent = function (event) {
  "use strict";
  if (event.target.checked) {
    if (event.target.value === "None") {
      this.checkNone();
    } else if (this.checkedList.length !== this.minimumCheckLimit) {
      this.pushDays(event);
    } else {
      event.target.checked = false;
      this.popAlert();
    }
  } else {
    if (event.target.value !== "None") {
      this.popDays(event);
    }
  }
};

//method to push days into array when checked
Days.prototype.pushDays = function (event) {
  "use strict";
  this.noneSelect.checked = false;
  this.checkedList.push(event.target.value);
  this.checkedListIndex.push(event.target.id);
};

//method to pop days from array when unchecked
Days.prototype.popDays = function (event) {
  "use strict";
  var popIndex;
  popIndex = this.checkedList.indexOf(event.target.value);
  if (popIndex !== -1) {
    this.checkedList.splice(popIndex, 1);
    this.checkedListIndex.splice(popIndex, 1);
  }
};

//method to run javascript after loading whole page (mentioned script in head portion)
window.onload = function () {
  "use strict";
  var gridElement = document.getElementById("grid");
  var noneSelectElement = document.getElementById("7");
  var checkBoxesElement = document.getElementsByName("dayCheckBox");
  var days = new Days();
  days.init(gridElement, noneSelectElement, checkBoxesElement);
  gridElement.addEventListener('click', function (event) { days.checkBoxEvent(event); }, false);
};