/*jslint browser: true, devel: true */
function CheckEvent() {
  "use strict";
  this.checkedCount = 0;
  this.checkedList = [];
  this.minimumCheckLimit = 4;
  this.checkBoxesCounter = 0;
  //method for initiation
  this.init = function (tableIdRef, noneSelectRef, checkBoxesRef) {
    this.tableId = tableIdRef;
    this.noneSelect = noneSelectRef;
    this.checkBoxes = checkBoxesRef;
    this.totalNumberCheckBoxes = this.checkBoxes.length - 1;
    this.bindEvents();
  };
};

CheckEvent.prototype.popAlert = function () {
  this.checkedList.length =this.minimumCheckLimit - 1;
  alert("Only 3 days can be selected. You have already selected " + this.checkedList.toString());
  this.checkNone();
};

//method when none is clicked
CheckEvent.prototype.checkNone = function () {
  for (checkBoxesCounter = 0 ; checkBoxesCounter <= this.totalNumberCheckBoxes ; checkBoxesCounter++) {
      this.checkBoxes[checkBoxesCounter].checked = false;
  }  
  this.checkedList.length = 0;
  this.checkedCount = 0;
};

//method to check the main functionality of checking three days
CheckEvent.prototype.increaseCount = function () {
  var that = this;
  this.checkedCount = 0;
  this.noneSelect.checked = false;
  for (var checkBoxesCounter = 0 ; checkBoxesCounter <= this.totalNumberCheckBoxes ; checkBoxesCounter++) {
    if (this.checkBoxes[checkBoxesCounter].checked === true) {
      this.checkedCount += 1;    
    }  
  }
  if (this.checkedCount === this.minimumCheckLimit - 1) {
    that.pushDays();
  } else if (this.checkedCount < this.minimumCheckLimit - 1) {
    that.checkedList.length = 0;
  } else {
    that.popAlert();
  }
};

//method for storing days
CheckEvent.prototype.pushDays = function() {
  var that = this;
  for (checkBoxesCounter = 0 ; checkBoxesCounter <= this.totalNumberCheckBoxes ; checkBoxesCounter++) {
    if (this.checkBoxes[checkBoxesCounter].checked === true) {
       that.checkedList.push(this.checkBoxes[checkBoxesCounter].value);
    }
  }
};

//method to bind event on click
CheckEvent.prototype.bindEvents = function () {
  "use strict";
  var checkChoice = this;
  this.tableId.onclick = function () {
    checkChoice.increaseCount();
  };
  this.noneSelect.onclick = function () {
    checkChoice.checkNone();
  };
};

//method to run javascript after loading whole page (mentioned script in head portion)
window.onload = function () {
  "use strict";
  var tableIdRef = document.getElementById("checkBoxTable");
  var noneSelectRef = document.getElementById("checkNone");
  var checkBoxesRef = document.getElementsByName("dayCheckBox");
  var checkEvent = new CheckEvent();
  checkEvent.init(tableIdRef, noneSelectRef, checkBoxesRef);
};