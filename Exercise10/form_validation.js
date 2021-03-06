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
  this.regexUrl = /^((ht|f)tps?:\/\/|)?[a-z0-9-\.]+\.[a-z]{2,4}\/?([^\s<>\#%"\,\{\}\\|\\\^\[\]`]+)?$/;
  this.regexMail = /\S+@\S+\.\S+/;
};

Form.prototype = {
  //method to validate textfield inputs
  validateTextFields : function () {
    "use strict";
    var textFieldsCounter;
    for (textFieldsCounter = 0; textFieldsCounter < this.textFields.length; textFieldsCounter = textFieldsCounter + 1) {
      this.textFields[textFieldsCounter].value = this.textFields[textFieldsCounter].value.trim();
      if (!this.textFields[textFieldsCounter].value) {
        this.errors.push(this.textFields[textFieldsCounter].name + " can not be empty");
        this.textFields[textFieldsCounter].focus();
        this.flag = false;
      } else if (this.textFields[textFieldsCounter].id === "email") {
        this.validEmailId(this.textFields[textFieldsCounter].value);
      } else if (this.textFields[textFieldsCounter].id === "homePage") {
        this.validUrl(this.textFields[textFieldsCounter].value);
      }
    }  
  },

  //method to validate AboutMe Text
  validateAboutMe : function () {
    "use strict";
    this.aboutMe.value = this.aboutMe.value.trim();
    if (this.aboutMe.value.length < 50) {
      if (!this.aboutMe.value) {
        this.errors.push(this.aboutMe.name + " cannot be empty");
      } else {
        this.errors.push("Minimum length of this box is 50");
      }
      this.flag = false;
    }  
  },

  //method to validate selectbox input
  validateSelectTimeZone : function () {
    "use strict";
    if (this.selectTimeZone.options[this.selectTimeZone.selectedIndex].text === "GMT") {
      this.errors.push("Please Select a Time Zone");
      this.flag = false;
    }
  },
  
  //method to validate notification checkbox checked or not
  validateNotificationCheck : function () {
    "use strict";
    if (this.notificationCheck.checked === false) {
      this.errors.push(this.notificationCheck.name + " must be checked ");
      this.flag = false;
    }  
  },

  //method to throw error
  throwErrors : function () {
    "use strict";
    var errorCounter;
    for (errorCounter = 0; errorCounter < this.errors.length; errorCounter = errorCounter + 1) {
      alert(this.errors[errorCounter]);
    }
    this.errors.length = 0;
  },

  //method to show submit confirmation
  sendConfirmation : function () {
    "use strict";
    alert("Form Submitted");
  },

  //method to test URL with the regex if it's not NULL
  validUrl : function (url) {
    "use strict";
    var valid;
    if (!/^https?:\/\//i.test(url) && !!url) {
      url = 'http://' + url;
    }
    valid = this.regexUrl.test(url);
    if (!valid) {
      this.errors.push("Invalid Url Entered! \n Please Enter Again");
      this.flag = false;
    }
  },

  //method to test Email with the regex if it's not NULL
  validEmailId : function (email) {
    "use strict";
    var valid = this.regexMail.test(email);
    if (!valid) {
      this.errors.push("Invalid Email Entered \n Please Enter Again");
      this.flag = false;
    }
  },

  //method to validate
  validate : function (event) {
    "use strict";
    this.validateTextFields();
    this.validateSelectTimeZone();
    this.validateAboutMe();
    this.validateNotificationCheck();
    if (this.errors.length === 0) {
      this.sendConfirmation();
    } else {
      this.throwErrors();
      event.preventDefault();
    }
  }
};

//method to run javascript after loading whole page (mentioned script in head portion)
window.onload = function () {
  "use strict";
  var textFieldsElement = document.getElementsByClassName('TextFields'),
      selectTimeZoneElement = document.getElementById('timeZone'),
      aboutMeElement = document.getElementById('aboutMe'),
      notificationCheckElement = document.getElementById('notification'),
      formElement = document.getElementById('registerationForm'),
      form = new Form(formElement, textFieldsElement, selectTimeZoneElement, aboutMeElement, notificationCheckElement);
  formElement.addEventListener('submit', function (event) {form.validate(event);}, false);
};