/*dynamic_table*/
/*jslint browser: true, devel: true */
var elements = {
  create : function(choice, type, value) {
    var node = document.createElement(choice);
    node.setAttribute("class", type);
    node.innerHTML = value;
    if (choice === "a") {  
      node.setAttribute("href", "#");  
    } else if (choice === "input") {
      node.setAttribute("value", value);
    }
    return node;
  }
};

//class for row
var Row = function (rowsIndex) {
  "use strict";
  this.regexMail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  this.regexName = /(\w+)/;
  this.rowsIndex = rowsIndex;
};

//method to save row
Row.prototype.bindSaveEvent = function () {
  "use strict";
  this.row = document.getElementsByTagName("tr")[this.rowsIndex];
  this.cells = this.row.getElementsByTagName("td");
  var save = this.row.getElementsByTagName("button")[0];
  var that = this;
  save.onclick = function () { 
    that.validateValues();
  };
};

//method to validate row before saving
Row.prototype.validateValues = function () {
  "use strict";
  var input = this.row.getElementsByClassName("input");
  var name = input[0].value;
  var nameCheck = this.regexName.test(name);
  var email = input[1].value;
  var emailCheck = this.regexMail.test(email);
  if (!emailCheck) {
    alert("Wrong data entered in email field (abc@xyz.com)");
  } else if (!name.trim() && !nameCheck) {
    alert("Wrong data entered in name field");
  } else {
    this.saveValues();
  }
};

Row.prototype.assignCellValues = function (inputValues) {
  "use strict";
  var i;
  for (i = 0; i < 2; i++ ) {
    if(inputValues != "replaceChild") {
      this.cells[i].innerHTML = inputValues[0].value;
    } else {
      this.cells[i].replaceChild(elements.create("input", "input", this.cells[i].innerHTML), this.cells[i].childNodes[0]);  
    }  
  }
}
//method to finally save row and display their values
Row.prototype.saveValues = function () {
  "use strict";
  var inputValues = this.row.getElementsByClassName("input"), i;
  this.assignCellValues(inputValues);
  var subBlock = this.cells[2].getElementsByClassName("Hidden"),
  sub_length = subBlock.length;
  for (i = 0; i < sub_length; i++) {
    this.addRemoveClass(subBlock[0], "notHidden");
  }
  this.editDeleteEvent();
};

Row.prototype.addRemoveClass = function (subBlock, className) {
  "use strict";
  subBlock.className = className;
};

//method in case of edit or delete event
Row.prototype.editDeleteEvent = function () {
  "use strict";
  var editEvent = this.row.getElementsByTagName("a")[0],
    deleteEvent = this.row.getElementsByTagName("a")[1],
    that = this;
  editEvent.onclick = function () { that.editRow(); };
  deleteEvent.onclick = function () { that.row.remove(); };
};

//method to edit row
Row.prototype.editRow = function () {
  "use strict";
  var that = this, i;
  this.assignCellValues("replaceChild");
  var subBlock = this.cells[2].getElementsByClassName("notHidden"),
    sub_length = subBlock.length;
  for (i = 0; i < sub_length; i++) {
    this.addRemoveClass(subBlock[0], "Hidden");
  }
};

//table class
var Table = function (tableId) {
  "use strict";
  this.tableId = tableId;
};

//method to bind table event
Table.prototype.bindEvent = function () {
  "use strict";
  var that = this;
  this.table = document.getElementById(this.tableId);
  this.addRow = document.getElementById("button");
  this.addRow.onclick = function () { that.createRow(); };
};

Table.prototype.createRow = function () {
  "use strict";
  var row = this.table.insertRow(-1);
  row.setAttribute("class", "tableRow");
  row.insertCell(0).appendChild(elements.create("input", "input", ""));
  row.insertCell(1).appendChild(elements.create("input", "input", ""));
  row.insertCell(2).appendChild(this.createButtonColumn());
  var newRow = new Row(this.table.rows.length - 1);
  newRow.bindSaveEvent();
};

Table.prototype.createButtonColumn = function () {
  var node = document.createElement("div");
  node.appendChild(elements.create("button", "Hidden", "Save"));
  node.appendChild(elements.create("a", "Hidden", "Edit"));
  node.appendChild(elements.create("a", "Hidden", "Delete"));
  return node;
};

window.onload = function () {
  "use strict";
  var table = new Table("dynamicTable");
  table.bindEvent();
};