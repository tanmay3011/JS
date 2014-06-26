/*dynamic_table*/
/*jslint browser: true, devel: true */
var elements = {
  create : function(choice, type, value) {
    var node = document.createElement(choice);
    node.setAttribute("class", type);
    node.innerHTML = value;
    if (choice === "a") {
      node.setAttribute("href", "#");
      node.setAttribute("name", type);
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
  var save = this.row.getElementsByClassName("Save")[0],
    that = this;
  save.onclick = function () {
    that.validateValues();
  };
};

//method to validate row before saving
Row.prototype.validateValues = function () {
  "use strict";
  var name = this.row.getElementsByClassName("name")[0].value;
  var nameCheck = this.regexName.test(name);
  var email = this.row.getElementsByClassName("email")[0].value;
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
    } else if ( i == 0 ) {
      this.addClass(i, "input name");
    } else {
      this.addClass(i, "input email");
    }
  }
}

Row.prototype.addClass = function (i, className) {
  "use strict";
  this.cells[i].replaceChild(elements.create("input", className, this.cells[i].innerHTML), this.cells[i].childNodes[0]);
}

//method to finally save row and display their values
Row.prototype.saveValues = function () {
  "use strict";
  var inputValues = this.row.getElementsByClassName("input");
  this.assignCellValues(inputValues);
  this.swapClass("Hidden", "notHidden")
  this.bindEditAndDeleteEvent();
};

Row.prototype.swapClass = function (firstClass, secondClass) {
  "use strict";
  var i,
    subBlock = this.cells[2].getElementsByClassName(firstClass),
    sub_length = subBlock.length;
  for (i = 0; i < sub_length; i++) {
    this.replaceClass(subBlock[0], firstClass, secondClass);
  }
}

Row.prototype.replaceClass = function (subBlock, firstClass, secondClass) {
  "use strict";
  var x = subBlock.className;
  x = x.replace(firstClass, secondClass);
  subBlock.className = x;
};

//method in case of edit or delete event
Row.prototype.bindEditAndDeleteEvent = function () {
  "use strict";
  var editEvent = this.row.getElementsByClassName("Edit")[0],
    deleteEvent = this.row.getElementsByClassName("Delete")[0],
    that = this;
  editEvent.onclick = function () { that.editRow(); };
  deleteEvent.onclick = function () { that.row.remove(); };
};

//method to edit row
Row.prototype.editRow = function () {
  "use strict";
  this.assignCellValues("replaceChild");
  this.swapClass("notHidden", "Hidden");
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
  row.insertCell(0).appendChild(elements.create("input", "input name", ""));
  row.insertCell(1).appendChild(elements.create("input", "input email", ""));
  row.insertCell(2).appendChild(this.createButtonColumn());
  var newRow = new Row(this.table.rows.length - 1);
  newRow.bindSaveEvent();
};

Table.prototype.createButtonColumn = function () {
  var node = document.createElement("div");
  node.appendChild(elements.create("button", "Hidden Save", "Save"));
  node.appendChild(elements.create("a", "Hidden Edit", "Edit"));
  node.appendChild(elements.create("a", "Hidden Delete", "Delete"));
  return node;
};

window.onload = function () {
  "use strict";
  var table = new Table("dynamicTable");
  table.bindEvent();
};