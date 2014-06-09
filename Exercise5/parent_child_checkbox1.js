var CheckEvent = function(id) {
  this.parentCheckBox = document.getElementById(id);
  this.subCheckBoxes = document.getElementsByName(id + "Sub");
  this.subBlockCheckBoxes = document.getElementById(id + "List");
  this.subBlockCheckBoxes.style.display = "none";
  this.bindEvents();
};

CheckEvent.prototype.subCheckBoxesEvent = function(choice) {
  var length = this.subCheckBoxes.length;
  for (i = 0; i < length; i++) {
    this.subCheckBoxes[i].checked = choice;
  }
  this.subBlockCheckBoxes.style.display = (choice) ? "block" : "none";
  this.parentCheckBox.scrollIntoView(choice);
}

//method to bind event on click
CheckEvent.prototype.bindEvents = function() {
  var that = this;
  this.parentCheckBox.onclick = function() { that.subCheckBoxesEvent(that.parentCheckBox.checked); };
}

window.onload = function () {
  "use strict";
  var checkEventColors = new CheckEvent("color");
  var checkEventDrinks = new CheckEvent("drink");
  var checkEventMovies = new CheckEvent("movie");
  var checkEventBikes = new CheckEvent("bike");
}