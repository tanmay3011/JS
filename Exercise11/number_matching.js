/* Numerical Value Matching*/
/*jslint browser: true, devel: true */
var Form = function (numberElement, resultElement, formElement, submitButton) {
  "use strict";
  this.number = numberElement;
  this.result = resultElement;
  this.form = formElement;
  this.submitButton = submitButton;
  this.regexNumber = /^[0-9]+$/;
  this.valid = true;
};

//init to call other methods
Form.prototype.init = function () {
  "use strict";
  this.bindEvent();
};

//method number whether number matches with the regex or not
Form.prototype.checkNumberValidity = function () {
  "use strict";
  this.number.value = this.number.value.trim();
  if (!this.regexNumber.test(this.number.value) || this.number.value === 0) {
    this.valid = false;
  }
};

//method to validate number
Form.prototype.validate = function () {
  "use strict";
  this.checkNumberValidity();
  this.displayResult();
  if (this.valid) {
    this.form.submit();
  }
};

//method to display result
Form.prototype.displayResult = function () {
  "use strict";
  this.result.value = this.valid;
};

//method to bindEvent
Form.prototype.bindEvent = function () {
  "use strict";
  var that = this;
  this.submitButton.addEventListener('click', function (event) { that.validate(); }, false);
};

//method to run javascript after loading whole page (mentioned script in head portion)
window.onload = function () {
  "use strict";
  var numberElement = document.getElementById('number'),
      resultElement = document.getElementById('result'),
      formElement = document.getElementById('numberForm'),
      submitButton = document.getElementById('submitButton'),
      form = new Form(numberElement, resultElement, formElement, submitButton);
      form.init();
};