/*dynamic_table*/
/*jslint browser: true, devel: true */
var elements = {
  create : function(choice, type) {
    var node = document.createElement(choice);
    node.setAttribute("class", type);
    node.innerHTML = type;
    if (choice === "a") {
      node.setAttribute("href", "#");  
    } else if (choice === "input") {
      if (type) {
        node.setAttribute("value", type);  
      }
    }
    return node;
  }
};

//class for row
var RowEvents = function (rowsIndex) {
  "use strict";
  this.regexMail = /\S+@\S+\.\S+/;
  this.regexName = /(\w+)/;
  this.rowsIndex = rowsIndex;
};

//method initialize row attributes
RowEvents.prototype.bindRowEvent = function (rowIndex) {
  "use strict";
  this.row = document.getElementsByTagName("tr")[this.rowsIndex];
  this.cell = this.row.getElementsByTagName("td");
  this.saveEvent();
}

//method to save row
RowEvents.prototype.saveEvent = function () {
  "use strict";
  var save = this.row.getElementsByTagName("button")[0];
  var that = this;
  save.onclick = function () { 
    that.validateValues();
  };
};

//method to validate row before saving
RowEvents.prototype.validateValues = function () {
  "use strict";
  var input = this.row.getElementsByTagName("input");
  var name = input[0].value;
  var nameCheck = this.regexName.test(name);
  var email = input[1].value;
  var emailCheck = this.regexMail.test(email);
  if (!emailCheck || !name) {
    if (!emailCheck){
      alert("Wrong data entered in email field (abc@xyz.com)");
    } else {
      alert("Wrong data entered in name field");
    }
    this.saveEvent();
  } else {
    this.saveValues();
  }
};

//method to finally save row and display their values
RowEvents.prototype.saveValues = function () {
  "use strict";
  var input = this.row.getElementsByTagName("input");
  this.cell[0].innerHTML = input[0].value;
  this.cell[1].innerHTML = input[0].value;
  this.cell[2].replaceChild(elements.create("a","editRow "), this.cell[2].childNodes[0]);
  this.cell[2].appendChild(elements.create("a","deleteRow"));
  this.editDeleteEvent();
};

//method in case of edit or delete event
RowEvents.prototype.editDeleteEvent = function () {
  "use strict";
  var editEvent = this.row.getElementsByTagName("a")[0];
  var deleteEvent = this.row.getElementsByTagName("a")[1];
  var that = this;
  editEvent.onclick = function () { that.editRow(); };
  deleteEvent.onclick = function () { that.row.remove(); };
};

//method to edit row
RowEvents.prototype.editRow = function () {
  "use strict";;
  var that = this;
  this.cell[0].replaceChild(elements.create("input", this.cell[0].innerHTML), this.cell[0].childNodes[0]);
  this.cell[1].replaceChild(elements.create("input", this.cell[1].innerHTML), this.cell[1].childNodes[0]);
  this.cell[2].childNodes[1].remove();
  this.cell[2].replaceChild(elements.create("button","save"), this.cell[2].childNodes[0]);
  this.saveEvent();
};

//table class
var TableEvent = function (tableId) {
  "use strict";
  this.table;
  this.add;
  this.tableId = tableId;
};

//method to bind table event
TableEvent.prototype.bindEvent = function () {
  "use strict";
  var that = this;
  this.table = document.getElementById(this.tableId);
  this.add = document.getElementById("button");
  this.add.onclick = function () { that.createRow(); };
};

TableEvent.prototype.createRow = function () {
  "use strict";
  var row = this.table.insertRow(-1);
  row.setAttribute("class", "tableRow");
  row.insertCell(0).appendChild(elements.create("input"));
  row.insertCell(1).appendChild(elements.create("input"));
  row.insertCell(2).appendChild(elements.create("button","save")); 
  var newRowEvent = new RowEvents(this.table.rows.length - 1);
  newRowEvent.bindRowEvent();
};

window.onload = function () {
  "use strict";
  var tableEvent = new TableEvent("dynamicTable");
  tableEvent.bindEvent();
};