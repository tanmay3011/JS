/*jslint browser: true, devel: true */
function CheckChoice() {
  "use strict";
  this.init = function (checkBoxes, selectAll, noneSelect) {
    this.checkBoxes = checkBoxes;
    this.selectAll = selectAll;
    this.noneSelect = noneSelect;
    this.bind_events();
  };

  this.check_all = function (check) {
    var checkCount = this.checkBoxes.length - 1;
    if (checkCount > -1) {
      do {
        this.checkBoxes[checkCount].checked = check;
        checkCount -= 1;
      } while (checkCount >= 0);
    }
  };
}

CheckChoice.prototype.bind_events = function () {
  "use strict";
  var checkValue = this;
  this.selectAll.onclick = function () {
    checkValue.check_all(true);
  };
  this.noneSelect.onclick = function () {
    checkValue.check_all(false);
  };
};

window.onload = function () {
  "use strict";
  var checkBoxes = document.getElementsByName("inputColor"), selectAll = document.getElementById("checkAll"), noneSelect = document.getElementById("checkNone"), checkChoice = new CheckChoice();
  checkChoice.init(checkBoxes, selectAll, noneSelect);
};