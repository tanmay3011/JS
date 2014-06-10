/* Form Validation*/
/*jslint browser: true, devel: true */
var Form = function (id) {
  "use strict";
  this.textFieldElement = document.getElementsByName('textinput');
  this.textAreaElement = document.getElementById('textbox');
  this.checkBoxElement = document.getElementById('checkbox');
  this.selectElement = document.getElementById('TimeZone');
  var that = this;
  document.getElementById(id).onsubmit = function () { return that.validateEvents(); };
};

//to check empty that elements 
Form.prototype.validateTextFieldElements = function () {
  "use strict";
  var textFieldCounter = 0;
  var valid = true;
  for (textFieldCounter =  0; textFieldCounter < this.textFieldElement.length - 1; textFieldCounter++) {
    if (this.textFieldElement[textFieldCounter].value === "") {
      alert(this.textFieldElement[textFieldCounter].id + " cannot be blank");
      valid = false;
      break;
    }
  }
  return valid;
};

//method to validate textarea input
Form.prototype.validateTextAreaElement = function () {
  "use strict";
  var textAreaMaxLimit = 50;
  var valid = true;
  if (this.textAreaElement.value === "") {
    alert(this.textAreaElement.id + "blank");
    valid = false;
  }
  if (this.textAreaElement.value.length > textAreaMaxLimit) {
    alert(this.textAreaElement.id + " exceeds the maximum count of 50");
    valid = false;
  }
  return valid;
};

//method to valide checkbox input
Form.prototype.validateCheckBoxElement = function () {
  "use strict";
  var valid = true;
  if (!this.checkBoxElement.checked) {
    alert("Do you really wanna leave it unchecked " + this.checkBoxElement.id);
    valid = false;
  }
  return valid;
};

//method to valide selectbox input
Form.prototype.validateSelectElement = function () {
  "use strict";
  var valid = true;
  if (this.selectElement.options[this.selectElement.selectedIndex].text === "GMT") {
    alert("Please Select a Time Zone " + this.selectElement.id);
    valid = false;
  }
  return valid;
}

Form.prototype.validateEvents = function () {
  "use strict";
  var valid = this.validateTextFieldElements() && this.validateTextAreaElement() && this.validateCheckBoxElement() && this.validateSelectElement();
  return valid;
};

//method to run javascript after loading whole page (mentioned script in head portion)
window.onload = function () {
  "use strict";
  var registrationform = new Form("userRegistrationForm");
};