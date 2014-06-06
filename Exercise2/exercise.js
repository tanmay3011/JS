/*jslint browser: true, devel: true */
function CheckChoice() {
  "use strict";
  this.checkBox = document.getElementsByName("inputColor");
  this.selectAll = document.getElementById("checkAll");
  this.noneSelect = document.getElementById("checkNone");
  this.events();
  this.check = function (choice) {
    var i = this.checkBox.length - 1;
    if (i > -1) {
      do {
        this.checkBox[i].checked = choice;
        i = i - 1;
      } while (i >= 0);
    }
  };
}

CheckChoice.prototype.events = function () {
  "use strict";
  var checkValue = this;
  this.selectAll.onclick = function () {
    checkValue.check(1);
  };
  this.noneSelect.onclick = function () {
    checkValue.check(0);
  };
};

var checkChoice = new CheckChoice();
