/*jslint browser: true, devel: true */
function CheckEvent() {
  "use strict";
  var checkedCount = 0, checkedList = [];
  //method for initiation
  this.init = function (checkBoxes, noneSelect) {
    this.checkBoxes = checkBoxes;
    this.noneSelect = noneSelect;
    this.bind_events();
  };

  //method to alert on 4th click
  this.popAlert = function () {
    checkedList.length = 3;
    alert("Only 3 days can be selected. You have already selected " + checkedList.toString());
    this.checkNone();
  };

  //method to check the main functionality of checking three days and storing 
  this.check = function () {
    var totalCheckCount = this.checkBoxes.length - 1, alreadyCheck = false, checkListCount = 0;
    checkedCount += 1;
    this.noneSelect.checked = false;
    if (totalCheckCount > -1 || checkedCount >= 3) {
      do {
        if (this.checkBoxes[totalCheckCount].checked === true && checkedCount >= 3) {
          checkListCount = checkedList.length - 1;
          alreadyCheck = false;
          if (checkListCount > -1) {
            do {
              if (checkedList[checkListCount] === this.checkBoxes[totalCheckCount].value) {
                alreadyCheck = true;
              }
              checkListCount -= 1;
            } while (checkListCount >= 0);
          }
          if (alreadyCheck === false) {
            checkedList.push(this.checkBoxes[totalCheckCount].value);
            alreadyCheck = false;
          }
        }
        if (checkedList.length === 4) {
          this.checkBoxes[totalCheckCount].checked = false;
          this.popAlert();
        }
        totalCheckCount -= 1;
      } while (totalCheckCount >= 0);
    }
  };

  //method when none is clicked
  this.checkNone = function () {
    var totalCheckCount = this.checkBoxes.length - 1;
    if (totalCheckCount > -1) {
      do {
        this.checkBoxes[totalCheckCount].checked = false;
        totalCheckCount -= 1;
      } while (totalCheckCount >= 0);
    }
    checkedList.length = 0;
    checkedCount = 0;
  };
}

//method to bind event on click
CheckEvent.prototype.bind_events = function () {
  "use strict";
  var checkChoice = this, totalCheckCount = this.checkBoxes.length - 1;
  if (totalCheckCount > -1) {
    do {
      this.checkBoxes[totalCheckCount].onclick = function () {
        checkChoice.check();
      };
      totalCheckCount -= 1;
    } while (totalCheckCount >= 0);
  }
  this.noneSelect.onclick = function () {
    checkChoice.checkNone();
  };
};

//method to run javascript after loading whole page (mentioned script in head portion)
window.onload = function () {
  "use strict";
  var checkBoxes = document.getElementsByName("day_checkBox"), noneSelect = document.getElementById("checkNone"), checkEvent = new CheckEvent();
  checkEvent.init(checkBoxes, noneSelect);
};


