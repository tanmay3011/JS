/* maximum three checkbox selection*/
/*jslint browser: true, devel: true */
var Days = function () {
  "use strict";
  this.checkedCount = 0;
  this.checkedList = [];
  this.checkedIndexList = [];
  this.checkedIndexList2 = [];
  this.minimumCheckLimit = 3;
  //method for initiation
  this.init = function (tableIdRef, noneSelectRef, checkBoxesRef) {
    this.tableId = tableIdRef;
    this.noneSelect = noneSelectRef;
    this.checkBoxes = checkBoxesRef;
    this.totalNumberCheckBoxes = this.checkBoxes.length - 1;
    this.bindEvents();
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
   //running this loop once and only unchecking the checked elements
  for (checkBoxesCounter = 0; checkBoxesCounter < this.minimumCheckLimit; checkBoxesCounter++) {
    this.checkBoxes[this.checkedIndexList2[checkBoxesCounter]].checked = false;
  }
  this.checkedList.length = 0;
  this.checkedCount = 0;
};

//method to check the main functionality of checking three days
Days.prototype.checkCount = function () {
  "use strict";
  var checkBoxesCounter;
  this.checkedCount = 0;
  this.checkedIndexList.length = 0;
  this.noneSelect.checked = false;
  for (checkBoxesCounter = 0; checkBoxesCounter <= this.totalNumberCheckBoxes; checkBoxesCounter++) {
    if (this.checkBoxes[checkBoxesCounter].checked === true) {
      this.checkedCount += 1;
      this.checkedIndexList.push(checkBoxesCounter);
    }
    if (this.checkCount === this.minimumCheckLimit + 1) {      //condition for stopping this loop after getting the 4th checked element
      break;
    }
  }
  this.checkCountBasedSelection();
};

//method to select what to do next based on checkCount
Days.prototype.checkCountBasedSelection = function () {
  "use strict";
  if (this.checkedCount === this.minimumCheckLimit) {
    this.pushDays();
  } else if (this.checkedCount < this.minimumCheckLimit) {
    this.checkedList.length = 0;
  } else {
    this.checkedCount -= 1;
    this.uncheckFourthClickDifference();
    this.popAlert();
  }
}

//method to uncheck the fourth click
Days.prototype.uncheckFourthClickDifference = function() {
  "use strict";
  var differenceArray=[],diff=[];
  for (var i=0; i<this.checkedIndexList2.length; i++) {
    differenceArray[this.checkedIndexList2[i]]=true;
  }
  for (var i=0; i<this.checkedIndexList.length; i++) {
    if (differenceArray[this.checkedIndexList[i]]) {
      delete differenceArray[this.checkedIndexList[i]];
    } else {
      differenceArray[this.checkedIndexList[i]] = true;
      diff = this.checkedIndexList[i];
    }
  }
  this.checkBoxes[diff].checked = false;    //4th click option unchecked
};

//method to push days in array(optimized by only checking the checked item stoed in the checkedIndexList array)
Days.prototype.pushDays = function(choice) {
  "use strict";
  var length = this.checkedIndexList.length;
  this.checkedCount = 0;
  this.checkedList.length = 0;
  this.checkedIndexList2.length = 0;
  for (var checkBoxesCounter = 0 ; checkBoxesCounter < length; checkBoxesCounter++) {
     this.checkBoxes[this.checkedIndexList[checkBoxesCounter]].checked = true;
     this.checkedIndexList2.push(this.checkedIndexList[checkBoxesCounter]) ;
     this.checkedList.push(this.checkBoxes[this.checkedIndexList[checkBoxesCounter]].value);
  }
};

//method to bind event on click
Days.prototype.bindEvents = function () {
  "use strict";
  var checkChoice = this;
  this.tableId.onclick = function () {
    checkChoice.checkCount();
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
  var days = new Days();
  days.init(tableIdRef, noneSelectRef, checkBoxesRef);
};