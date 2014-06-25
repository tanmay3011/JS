/*jslint browser: true, devel: true */
var ToDo = function (userId, assignee) {
  "use strict";
  this.toDoInput = document.getElementById('toDo');
  this.addNewToDo(userId, assignee);
};

ToDo.prototype = {
  addNewToDo : function (userId, assignee) {
    "use strict";
    if (!!this.toDoInput.value.trim()) {
      this.toDoUserId = userId;
      this.toDoEvent = this.toDoInput.value;
      this.toDoAssignee = assignee;
      this.toDoState = "unchecked";
    }
  }
};

var Users = function (fetchedElementList) {
  "use strict";
  this.name = fetchedElementList.name;
  this.createToDo = fetchedElementList.createToDo;
  this.createUser = fetchedElementList.createUser;
  this.addButton = fetchedElementList.addButton;
  this.saveToDo = fetchedElementList.save;
  this.userListDiv = fetchedElementList.userList;
  this.todoListDiv = fetchedElementList.todoList;
  this.selectList = fetchedElementList.selectElement;
  this.userId = 1;
  this.usersList = [];
  this.usersToDo = [];
  this.remainingToDoCount = 0;
};

Users.prototype = {
  bindEvents : function () {
    "use strict";
    var that = this;
    this.createUser.onclick = function () {
      that.bindAddUserEvent();
    };
  },

  bindCreateToDoEvent : function () {
    "use strict";
    var that = this;
    this.createToDo.onclick = function () {
      that.bindSaveEvent();
      that.bindCheckboxEvent();
    };
  },

  bindAddUserEvent : function () {
    "use strict";
    var that = this;
    this.addButton.onclick = function () {
      that.addNewUser();
      if (that.selectList.length > 1) {
        that.bindCreateToDoEvent();
      }
    };
  },

  appendValuesToUser : function () {
    "use strict";
    var user = {};
    user["idNumber"] = this.userId++;
    user["name"] = this.name.value;
    user["currentIndex"] = this.remainingToDoCount;
    return user;
  },

  addNewUser : function () {
    "use strict";
    if (this.validate()) {
      this.usersList.push(this.appendValuesToUser());
      this.display(this.userListDiv, "p");
      this.display(this.selectList, "option");
    }
  },

  validate : function () {
    "use strict";
    var valid = true;
    if (!this.name.value.trim()) {
      valid = false;
    } else {
      valid = this.checkUsersExistence();
    }
    return valid;
  },

  checkUsersExistence : function () {
    "use strict";
    var i;
    for (i = 0; i < this.usersList.length; i++) {
      if (this.name.value == this.usersList[i].name) {
        return false;
      }
    }
    return true;
  },

  createElements : function (element, i) {
    "use strict";
    var node = document.createElement(element);
    if (element == 'p') {
      node.innerHTML = this.usersList[i].name + "(" + this.usersList[i].currentIndex + ")";
    } else if (element == "option") {
      node.value = this.usersList[i].idNumber + " " + this.usersList[i].name;
      node.innerHTML = this.usersList[i].idNumber + " " + this.usersList[i].name;
    } else if (element == "input") {
      this.nodeSetAttribute(node, 'type', 'checkbox');
    } else if (element == "span") {
      node.innerHTML = " " + this.usersToDo.toDoEvent + " assigned by (" + this.usersToDo.toDoAssignee + ") ";
      this.nodeSetAttribute(node, 'class', 'checkbox');
    } else {
      node.appendChild(this.createElements("input", i));
      node.appendChild(this.createElements("span", i));
    }
    return node;
  },

  nodeSetAttribute : function (node, name, type) {
    "use strict";
    node.setAttribute(name, type);
  },

  bindSaveEvent : function () {
    "use strict";
    var that = this, res, userId, assignee;
    this.saveToDo.onclick = function () {
      res = that.selectList.value.split(" ");
      userId = res.splice(0, 1);
      assignee = res.join(" ");
      var todo = new ToDo(userId,res);
      that.usersToDo = todo;
      that.updateUsersToDoCount(res, "increment");
      that.display(that.todoListDiv, "div");
    };
  },

  reUserListDisplay : function () {
    "use strict";
    var length = this.usersList.length, i;
    this.userListDiv.innerHTML = "";
    for (i=0; i < length; i++) {
      this.userListDiv.appendChild(this.createElements("p",i));
    }
  },

  display : function (object, type) {
    "use strict";
    var length = this.usersList.length - 1;
    object.appendChild(this.createElements(type,length));
  },

  bindCheckboxEvent : function () {
    "use strict";
    var that = this;
    this.checkboxElement = document.getElementsByClassName("checkToDo");
    this.checkboxElement[0].addEventListener('click', function (event) {
      that.checkCheckbox(event);
    }, false);
  },

  checkCheckbox : function (event) {
    "use strict";
    var that = this;
    var assigneeName = event.target.nextSibling.innerHTML.split(/[()]/).filter(function(e) { return e; });
    if (event.target.checked == true) {
      this.setPropertyAndUpdateCount(event, assigneeName[1],"decrement","line-through");
    } else {
      this.setPropertyAndUpdateCount(event, assigneeName[1],"increment","none");
    }
  },

  setPropertyAndUpdateCount : function (event, name, countChoice, textStyleChoice) {
    "use strict";
    this.updateUsersToDoCount(name, countChoice);
    event.target.nextSibling.style.setProperty("text-decoration", textStyleChoice);
  },

  updateUsersToDoCount : function (name, type) {
    "use strict";
    var i,length = this.usersList.length;
    for (i = 0; i < length; i++) {
      if (this.usersList[i].name == name) {
        if (type == "increment") {
          this.usersList[i].currentIndex += 1;
        } else {
          this.usersList[i].currentIndex -= 1;
        }
      }
    }
    this.reUserListDisplay();
  },

  replaceClass : function (subBlock, className) {
    "use strict";
    subBlock.className = className;
  },
};

window.onload = function () {
  "use strict";
  var nameElement = document.getElementById('name'),
    createToDoElement = document.getElementById('createToDo'),
    createUserElement = document.getElementById('createUser'),
    addElement = document.getElementById('add'),
    userListElement = document.getElementById('userList'),
    toDoListElement = document.getElementById('todoList'),
    saveButtonElement = document.getElementById('save'),
    selectFieldElement = document.getElementById('select'),
    fetchedElementList = {
      "name" : nameElement,
      "createToDo" : createToDoElement,
      "createUser" : createUserElement,
      "save" : saveButtonElement,
      "addButton" : addElement,
      "userList" : userListElement,
      "todoList" : toDoListElement,
      "selectElement" : selectFieldElement,
    },
    users = new Users(fetchedElementList);
    users.bindEvents();
};