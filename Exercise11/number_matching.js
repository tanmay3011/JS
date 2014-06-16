/* Numerical Value Matching*/
/*jslint browser: true, devel: true */
var NumericalValue = function () {
  "use strict";
  this.number = document.getElementById('number');
  this.result = document.getElementById('result');
  this.form = document.getElementById('numberForm');
  this.regexNumber = /^[0-9]+$/;
  this.valid = true;
};

//method number whether number matches with the regex or not
NumericalValue.prototype.checkNumberValidity = function () {
  "use strict";
  this.number.value = this.number.value.trim();
  if (!this.regexNumber.test(this.number.value) || this.number.value === 0) {
    this.valid = false;
  }
};

//method to validate number
NumericalValue.prototype.validate = function () {
  "use strict";
  this.checkNumberValidity();
  this.displayResult();
  if (this.valid) {
    this.form.submit();
  }
};

//method to display result
NumericalValue.prototype.displayResult = function () {
  "use strict";
  this.result.value = this.valid;
};

//attached event on submit click
var formHandler = function (e) {
  "use strict";
  number = new NumericalValue();
  number.validate();
};

//method to run javascript after loading whole page (mentioned script in head portion)
window.onload = function () {
  "use strict";
  var submitButton = document.getElementById('submitButton');
  submitButton.addEventListener('click', formHandler, false);
};