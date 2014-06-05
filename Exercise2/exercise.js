/*jslint browser: true, devel: true */
function CheckChoice() {
  "use strict";
  this.checkBox = document.getElementsByName("color");
  this.selectAll = document.getElementById("checkall");
  this.noneSelect = document.getElementById("checknone");
  this.check = function (choice) {
    this.choice = choice;
    this.i = this.checkBox.length - 1;
    if (this.i > -1) {
      do {
        this.checkBox[this.i].checked = this.choice;
        this.i = this.i - 1;
      } while (this.i >= 0);
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

var checkBoxObject = new CheckChoice();
checkBoxObject.events();