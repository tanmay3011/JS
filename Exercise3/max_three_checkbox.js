/*jslint browser: true, devel: true */
function CheckEvent() {
  "use strict";
  var checkedCount = 0, checkedList = [], minimumCheckLimit = 4, checkBoxesCounter = 0;
  //method for initiation
  this.init = function (tableIdRef, noneSelectRef, checkBoxesRef) {
    this.tableId = tableIdRef;
    this.noneSelect = noneSelectRef;
    this.checkBoxes = checkBoxesRef;
    this.totalNumberCheckBoxes = this.checkBoxes.length - 1;
    this.bindEvents();
  };

  //method to alert on 4th click
  this.popAlert = function () {
    checkedList.length = minimumCheckLimit - 1;
    alert("Only 3 days can be selected. You have already selected " + checkedList.toString());
    this.checkNone();
  };

  //method when none is clicked
  this.checkNone = function () {
    for (checkBoxesCounter = 0 ; checkBoxesCounter <= this.totalNumberCheckBoxes ; checkBoxesCounter++) {
        this.checkBoxes[checkBoxesCounter].checked = false;
    }  
    checkedList.length = 0;
    checkedCount = 0;
  };

  //method to check the main functionality of checking three days
  this.increaseCount = function () {
    var that = this;
    checkedCount = 0;
    this.noneSelect.checked = false;
    for (var checkBoxesCounter = 0 ; checkBoxesCounter <= this.totalNumberCheckBoxes ; checkBoxesCounter++) {
      if (this.checkBoxes[checkBoxesCounter].checked === true) {
        checkedCount += 1;    
      }  
    }
    if (checkedCount === minimumCheckLimit - 1) {
      that.pushDays();
    } else if (checkedCount < minimumCheckLimit - 1) {
      checkedList.length = 0;
    } else {
      that.popAlert();
    }
  };

  //method for storing days
  this.pushDays = function() {
    for (checkBoxesCounter = 0 ; checkBoxesCounter <= this.totalNumberCheckBoxes ; checkBoxesCounter++) {
      if (this.checkBoxes[checkBoxesCounter].checked === true) {
         checkedList.push(this.checkBoxes[checkBoxesCounter].value);
      }
    }
  };
}

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