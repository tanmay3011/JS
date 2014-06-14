/* Numerical Value Matching*/
/*jslint browser: true, devel: true */
var NumericalValue = function (formElement, inputedElement, resultElement) {
  "use strict";
  this.number = inputedElement;
  this.form = formElement;
  this.result = resultElement;
  this.regexNumber = /^[0-9]*$/;
  this.flag = true;
};

//method number whether number matches with the regex or not
NumericalValue.prototype.checkNumberValidity = function () {
  "use strict";
  if (!this.regexNumber.test(this.number.value)) {
    this.flag = false;
  }
}

//method to validate number
NumericalValue.prototype.validate = function () {
  "use strict";
  this.checkNumberValidity();
  this.displayResult();
  if(this.flag) {
    console.log(this.form);
    this.form.submit();
  }
};

//method to display result
NumericalValue.prototype.displayResult = function () {
  "use strict";
  this.result.value = this.flag;
}

//attached event on submit click
var formHandler = function (e) {
  "use strict";
  var inputedElement = document.getElementById('number');
  var resultElement = document.getElementById('result');
  var formElement = document.getElementById('numberForm');
  var number = new NumericalValue(formElement, inputedElement, resultElement);
  e.preventDefault();
  number.validate();

}

//method to run javascript after loading whole page (mentioned script in head portion)
window.onload = function () {
  "use strict";
  var submitButton = document.getElementById('submitButton');
  submitButton.addEventListener('click', formHandler, false);
};