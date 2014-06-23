/*jslint browser: true, devel: true */
var ToDo = function (userId, assignee) {
  "use strict";
  this.toDoId = 0;
  this.toDoInput = document.getElementById('toDo');
  this.addNewToDo(userId, assignee)
};

ToDo.prototype = {
  addNewToDo : function (userId, assignee) {
    "use strict";
    if (!!this.toDoInput.value.trim()) {
      this.toDoUserId = userId;
      this.toDoEvent = this.toDoInput.value;
      this.toDoAssignee = assignee;
      this.toDoId++;
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
  this.userId = 0;
  this.usersList = [];
  this.userstoDo = [];
  this.remainingToDoCount = 0;
};

Users.prototype = {
  bindEvents : function () {
    "use strict";
    var that = this;
    this.createUser.onclick = function () {
      that.bindAddUserEvent();
    };
    if (this.usersList.length > 0) {
      this.createToDo.onclick = function () {
        that.bindSaveEvent();
      };
    }
  },

  bindAddUserEvent : function () {
    "use strict";
    var that = this;
    this.addButton.onclick = function () {
      that.addNewUser();
      that.displayUsersList();
    };
  },

  addNewUser : function () {
    "use strict";
    if (this.validate()) {
      var user = {};
      user["id"] = this.userId++;
      user["name"] = this.name.value;
      user["currentIndex"] = this.remainingToDoCount;
      this.usersList.push(user);
      this.createSelectOption();
    }
  },

  createSelectOption : function () {
    "use strict";
    var length = this.usersList.length - 1;
    this.selectList.appendChild(this.createElements("option",length));
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
    var node = document.createElement(element),node1;
    if (element == 'p') {
      node.innerHTML = this.usersList[i].name + "(" + this.usersList[i].currentIndex + ")";
    } else if (element == "option") {
      node.value = this.usersList[i].name;
      node.innerHTML = this.usersList[i].name;
    } else if (element == "input") {
      node.setAttribute('type', 'checkbox');
    } else if (element == "span") {
      node.innerHTML = this.todo[i].event + "assigned by" + "(" + this.todo[i].assignee + ")" ;
      node.setAttribute('id', this.todo[i].assignee);
    } else {
      node.appendChild(this.createElements("input", i));
      node.appendChild(this.createElements("span", i));
      node.setAttribute('class', 'checkbox');
    }
    return node;
  },

  displayUsersList : function () {
    "use strict";
    var length = this.usersList.length - 1;
    this.userListDiv.appendChild(this.createElements("p",length));
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