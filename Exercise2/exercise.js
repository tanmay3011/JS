/*jslint browser: true, devel: true */
function CheckChoice() {
  "use strict";
  var checkBoxes = [], selectAll = [], noneSelect = [];
  this.checkBoxes = checkBoxes;
  this.selectAll = selectAll;
  this.noneSelect = noneSelect;

  this.init = function () {
    var checkValue = this;
    this.selectAll.onclick = function () {
      checkValue.check(1);
    };
    this.noneSelect.onclick = function () {
      checkValue.check(0);
    };
  };

  this.check = function (choice) {
    var i = this.checkBoxes.length - 1;
    if (i > -1) {
      do {
        this.checkBoxes[i].checked = choice;
        i = i - 1;
      } while (i >= 0);
    }
  };
}

var checkChoice = new CheckChoice();
checkChoice.checkBoxes = document.getElementsByName("inputColor");
checkChoice.selectAll = document.getElementById("checkAll");
checkChoice.noneSelect = document.getElementById("checkNone");
checkChoice.init();