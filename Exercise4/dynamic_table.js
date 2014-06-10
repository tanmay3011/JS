/*jslint browser: true, devel: true */
var RowEvents = function (index) {
  "use strict";
  this.row = document.getElementsByTagName("tr")[index];
  this.cell = this.row.getElementsByTagName("td");
  this.saveEvent();
};

RowEvents.prototype.saveEvent = function () {
  "use strict";
  var save = this.row.getElementsByTagName("button")[0];
  var that = this;
  save.onclick = function () { that.validateValues();
     };
};

RowEvents.prototype.validateValues = function () {
  "use strict";
  var input = this.row.getElementsByTagName("input");
  var that = this;
  var name = input[0].value;
  var regexName = /(\w+)/;
  var nameCheck = regexName.test(name);
  var email = input[1].value;
  var regexMail = /\S+@\S+\.\S+/;
  var emailCheck = regexMail.test(email);
  if (emailCheck === false || name === false) {
    if (emailCheck === false){
      alert("Wrong data entered in email field (abc@xyz.com)");
    } else {
      alert("Wrong data entered in name field");
    }
    that.saveEvent();
  } else {
    that.saveValues();
  }
};

RowEvents.prototype.saveValues = function () {
  "use strict";
  var input = this.row.getElementsByTagName("input");
  this.cell[0].innerHTML = input[0].value;
  this.cell[1].innerHTML = input[0].value;
  
  var editLink = document.createElement("a");
  editLink.innerHTML = "Edit";
  editLink.setAttribute("class", "editRow");
  editLink.setAttribute("href", "#");
  this.cell[2].replaceChild(editLink, this.cell[2].childNodes[0]);
  
  var deleteLink = document.createElement("a");
  deleteLink.innerHTML = "Delete";
  deleteLink.setAttribute("class", "deleteRow");
  deleteLink.setAttribute("href", "#");
  this.cell[2].appendChild(deleteLink);
  this.editDeleteEvent();
};
 
RowEvents.prototype.editDeleteEvent = function () {
  "use strict";
  var editEvent = this.row.getElementsByTagName("a")[0];
  var deleteEvent = this.row.getElementsByTagName("a")[1];
  var that = this;
  editEvent.onclick = function () { that.editRow(); };
  deleteEvent.onclick = function () { that.row.remove(); };
};

RowEvents.prototype.editRow = function () {
  "use strict";
  var inputName = document.createElement("input");
  inputName.setAttribute("value", this.cell[0].innerHTML);
  this.cell[0] = this.cell[0].replaceChild(inputName, this.cell[0].childNodes[0]);
  
  var inputEmail = document.createElement("input");
  inputEmail.setAttribute("value", this.cell[1].innerHTML);
  this.cell[1] = this.cell[1].replaceChild(inputEmail, this.cell[1].childNodes[0]);
  
  var saveButton = document.createElement("button");
  saveButton.setAttribute("class", "saveRow");
  saveButton.innerHTML = "Save";
  
  this.cell[2].childNodes[1].remove();
  this.cell[2].replaceChild(saveButton, this.cell[2].childNodes[0]);
  this.saveEvent();
};

var TableEvent = function (id) {
  "use strict";
  var that = this;
  this.table = document.getElementById(id);
  this.add = document.getElementById("button");
  this.add.onclick = function () { that.createRow(); };
};

TableEvent.prototype.createRow = function () {
  "use strict";
  var row = this.table.insertRow(-1);
  row.setAttribute("class", "tableRow");
  
  var inputName = document.createElement("input");
  inputName.setAttribute("value", "");
  row.insertCell(0).appendChild(inputName);
  
  var inputEmail = document.createElement("input");
  inputEmail.setAttribute("value", "");
  row.insertCell(1).appendChild(inputEmail);
  
  var saveButton = document.createElement("button");
  saveButton.setAttribute("class", "saveRow");
  saveButton.innerHTML = "Save";
  row.insertCell(2).appendChild(saveButton);
  
  var newRowEvent = new RowEvents(this.table.rows.length - 1);
};

window.onload = function () {
  "use strict";
  var tableEvent = new TableEvent("dynamicTable");
};