/*Validation of form*/
/*jslint browser: true, devel: true */
var Form = function (formElement, textFieldsElement, selectTimeZoneElement, aboutMeElement, notificationCheckElement) {
  "use strict";
  this.form = formElement;
  this.textFields = textFieldsElement;
  this.selectTimeZone = selectTimeZoneElement;
  this.aboutMe = aboutMeElement;
  this.notificationCheck = notificationCheckElement;
  this.flag = true;
  this.errors = [];
};

//method to validate textfield inputs
Form.prototype.validateTextFields = function () {
  "use strict";
  var textFieldsCounter;
  for (textFieldsCounter = 0; textFieldsCounter < this.textFields.length; textFieldsCounter = textFieldsCounter + 1) {
    this.textFields[textFieldsCounter].value = this.textFields[textFieldsCounter].value.trim();
    if (!this.textFields[textFieldsCounter].value) {
      this.errors.push(this.textFields[textFieldsCounter].name + " can not be empty");
      this.textFields[textFieldsCounter].focus();
      this.flag = false;
    }
  }
};

//method to validate AboutMe Text
Form.prototype.validateAboutMe = function () {
  "use strict";
  this.aboutMe.value = this.aboutMe.value.trim();
  if (this.aboutMe.value.length < 50) {
    if (!this.aboutMe.value) {
      this.errors.push(this.aboutMe.name + " cannot be empty");
    } else {
      this.errors.push("Minimum length of this box is 50");
    }
    this.aboutMe.focus();
    this.flag = false;
  }
};

//method to validate selectbox input
Form.prototype.validateSelectTimeZone = function () {
  "use strict";
  if (this.selectTimeZone.options[this.selectTimeZone.selectedIndex].text === "GMT") {
    this.errors.push("Please Select a Time Zone");
    this.flag = false;
    this.selectTimeZone.focus();
    this.flag = false;
  }
};

//method to validate notification checkbox checked or not
Form.prototype.validateNotificationCheck = function () {
  "use strict";
  if (this.notificationCheck.checked === false) {
    this.errors.push(this.notificationCheck.name + " must be checked ");
    this.notificationCheck.focus();
    this.flag = false;
  }
};

//method to throw error
Form.prototype.throwErrors = function () {
  "use strict";
  var errorCounter;
  for (errorCounter = 0; errorCounter < this.errors.length; errorCounter = errorCounter + 1) {
    alert(this.errors[errorCounter]);
  }
  //this.errors.length = 0;
};

//method to show submit confirmation
Form.prototype.sendConfirmation = function () {
  "use strict";
  alert("Form Submitted");
};

//method to validate
Form.prototype.validate = function () {
  "use strict";
  this.validateTextFields();
  this.validateSelectTimeZone();
  this.validateAboutMe();
  this.validateNotificationCheck();
  if (this.errors.length === 0) {
    this.sendConfirmation();
    this.form.submit();
  } else {
    this.throwErrors();
  }
};

var formHandler = function () {
  "use strict";
  var textFieldsElement = document.getElementsByClassName('TextFields');
  var selectTimeZoneElement = document.getElementById('timeZone');
  var aboutMeElement = document.getElementById('aboutMe');
  var notificationCheckElement = document.getElementById('notification');
  var formElement = document.getElementById('registerationForm');
  var form = new Form(formElement, textFieldsElement, selectTimeZoneElement, aboutMeElement, notificationCheckElement);
  form.validate();
};

//method to run javascript after loading whole page (mentioned script in head portion)
window.onload = function () {
  "use strict";
  var submitButton = document.getElementById('submitButton');
  submitButton.addEventListener('click', formHandler, false);
};
