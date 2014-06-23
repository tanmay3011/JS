/*JSON product data*/
/*jslint browser: true, devel: true */
var UserDetails = function (fetchedElementList) {
  "use strict";
  this.currentIndex = 0;
  this.name = fetchedElementList.nameElement;
  this.save = fetchedElementList.saveElement;
  this.createTodo = fetchedElementList.createToDoElement;
  this.createUser = fetchedElementList.createUserElement;
  this.addButton = fetchedElementList.addElement;
  this.save = fetchedElementList.searchElement;
  this.user = [];
  this.addUser();
};


UserDetails.prototype.bindEvents = function () {
  "use strict";
  var that = this;
  this.createUser.onclick = function () {
    that.addButton.onclick = function () {
      this.addNewUser();
    } 
  }
  if (this.users.length > 0) {
    this.createTodo.onclick = function () {
      this.createTodo();
    }
  }
};


UserDetails.prototype.addNewUser = function () {
  "use strict";
  if(this.validate()) {
    this.users.push(this.name, this.currentIndex);
    this.display();
  }
};

UserDetails.prototype.validate = function () {
  "use strict";
  var  valid = true;
  if(!this.name.value.trim()) {
    valid = false;
  } else {
    valid = this.checkUsersExistence();
  }
};


UserDetails.prototype.checkUsersExistence = function () {
  "use strict";
  var i;
  for (i = 0; i < this.users.length; i++) {
    if (this.name.value == this.users.name[i]) {
      return false;
    }
  }
};

UserDetails.prototype.display = function () {
  this.div = document.createElement("div");
  this.div.id = this.counter;
  this.div.innerHTML = "Name:" + name 
  this.userList.appendChild(this.div);
  this.counter++;
};
// UserDetails.prototype.replaceClass = function (subBlock, className) {
//   "use strict";
//   subBlock.className = className;
// };
 
// UserDetails.prototype.subBlockDisplay = function (subBlock ,displayChoice) {
//   "use strict";
//   if (displayChoice) {
//     this.replaceClass(subBlock, "notHidden");
//   } else {
//     this.replaceClass(subBlock, "hidden");
//   }
// };

window.onload = function () {
  "use strict";
  var nameElement = document.getElementById('name'),
    createToDoElement = document.getElementById('createTodo'),
    createUserElement = document.getElementById('createUser'),
    addElement = document.getElementById('add'),
    saveElement = document.getElementById('save'),
    userListElement = document.getElementById('userList'),
    toDoListElement = document.getElementById('todoList'),
    fetchedElementList = {
      "name" : nameElement,
      "createToDo" : createToDoElement,
      "createUser" : createUserElement,
      "addButton" : addElement,
      "save" : saveElement,
      "userList" : userListElement,
      "todoList" : toDoListElement,
    },
    userDetails = UserDetails(fetchedElementList);
    userDetails.bindEvents();
};