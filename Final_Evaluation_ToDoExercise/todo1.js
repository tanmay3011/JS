/*jslint browser: true, devel: true */
//Class for ToDo
var ToDo = function (userId, assignee) {
  "use strict";
  this.toDoInput = document.getElementById('toDo');
  this.addNewToDo(userId, assignee);
};

ToDo.prototype = {
  //method to add a new ToDo
  addNewToDo : function (userId, assignee) {
    "use strict";
    var input = this.toDoInput.value.trim();
    if (input) {
      this.toDoUserId = userId;
      this.toDoEvent = input;
      this.toDoAssignee = assignee;
      this.toDoState = "unchecked";
    }
  }
};

//Users Class
var Users = function (fetchedElementList) {
  "use strict";
  this.name = fetchedElementList.name;
  this.nameBlock = fetchedElementList.nameBlock;
  this.toDoBlock = fetchedElementList.toDoBlock;
  this.createToDo = fetchedElementList.createToDo;
  this.createUser = fetchedElementList.createUser;
  this.addButton = fetchedElementList.addButton;
  this.saveToDo = fetchedElementList.save;
  this.userListDiv = fetchedElementList.userList;
  this.todoListDiv = fetchedElementList.todoList;
  this.selectList = fetchedElementList.selectElement;
  this.toDoText = fetchedElementList.toDoText;
  this.userId = 1;
  this.usersList = [];
  this.usersToDo = [];
  this.remainingToDoCount = 0;
  this.bindCheckboxEvent();
};

Users.prototype = {
  //method to bind click on create user and create to-do button
  bindEvents : function () {
    "use strict";
    var that = this;
    this.createUser.onclick = function () {
      that.replaceClass(that.nameBlock, "notHidden");
      that.replaceClass(that.userListDiv, "notHidden");
      that.bindAddUserEvent();
    };
    this.createToDo.onclick = function () {
      that.replaceClass(that.toDoBlock, "notHidden");
      that.replaceClass(that.userListDiv, "notHidden");
      that.bindSaveEvent();
    };
  },

  //method to bind click on add user
  bindAddUserEvent : function () {
    "use strict";
    var that = this;
    this.addButton.onclick = function () {
      that.addNewUser();
      that.replaceClass(that.nameBlock, "hidden");
      that.replaceClass(that.createToDo, "notHidden");
    };
  },

  //method to apend values to a user node and then return that node
  appendValuesToUser : function () {
    "use strict";
    var user = {};
    user["idNumber"] = this.userId++;
    user["name"] = this.name.value.trim();
    user["currentIndex"] = this.remainingToDoCount;
    return user;
  },

  //method to add a new user after validation
  addNewUser : function () {
    "use strict";
    if (this.validate()) {
      this.usersList.push(this.appendValuesToUser());
      this.display(this.userListDiv, "p");
      this.display(this.selectList, "option");
    }
  },

  //method to validate the input in the name field
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

  //method to check whether user already exists or not
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

  //method to create elements and append values
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

  //method to set attributes of created nodes
  nodeSetAttribute : function (node, name, type) {
    "use strict";
    node.setAttribute(name, type);
  },

  //method to bind save To-Do click
  bindSaveEvent : function () {
    "use strict";
    var that = this, res, userId;
    this.saveToDo.onclick = function () {
      if (that.toDoText.value.trim()) {
        res = that.selectList.value.split(" ");
        userId = res.splice(0, 1);
        assignee = res.join(" ");
        var todo = new ToDo(userId, res);
        that.replaceClass(that.toDoBlock, "hidden");
        that.usersToDo = todo;
        that.updateUsersToDoCount(res, "increment");
        that.display(that.todoListDiv, "div");
      }
    };
  },

  //method to display user list (i.e. the left coulmn)
  reUserListDisplay : function () {
    "use strict";
    var length = this.usersList.length, i;
    this.userListDiv.innerHTML = "";
    for (i = 0; i < length; i++) {
      this.userListDiv.appendChild(this.createElements("p",i));
    }
  },

  //method to dislpay different elements (like select options, to do options)
  display : function (displayDivElement, type) {
    "use strict";
    var length = this.usersList.length - 1;
    displayDivElement.appendChild(this.createElements(type,length));
  },

  //method to bind checkbox click
  bindCheckboxEvent : function () {
    "use strict";
    var that = this;
    this.checkboxElement = document.getElementsByClassName("checkToDo");
    this.checkboxElement[0].addEventListener('click', function (event) {
      that.checkCheckbox(event);
    }, false);
  },

  //method to check whether checkbox is checked or not
  checkCheckbox : function (event) {
    "use strict";
    var assigneeName = event.target.nextSibling.innerHTML.split(/[()]/).filter(function (e) { return e; });
    if (event.target.checked == true) {
      this.setPropertyAndUpdateCount(event, assigneeName[1], "decrement", "line-through");
    } else {
      this.setPropertyAndUpdateCount(event, assigneeName[1], "increment", "none");
    }
  },

  //method to set text property and call update count function
  setPropertyAndUpdateCount : function (event, name, countChoice, textStyleChoice) {
    "use strict";
    this.updateUsersToDoCount(name, countChoice);
    event.target.nextSibling.style.setProperty("text-decoration", textStyleChoice);
  },

  //method to update the users to-do counts
  updateUsersToDoCount : function (name, type) {
    "use strict";
    var i, length = this.usersList.length;
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

  //method to replace class for hidden and not hidden property
  replaceClass : function (subBlock, className) {
    "use strict";
    subBlock.className = className;
  }
};

window.onload = function () {
  "use strict";
  var nameElement = document.getElementById('name'),
    nameBlock = document.getElementById('name_block'),
    toDoBlock = document.getElementById('todo_block'),
    createToDoElement = document.getElementById('createToDo'),
    createUserElement = document.getElementById('createUser'),
    addElement = document.getElementById('add'),
    userListElement = document.getElementById('userList'),
    toDoListElement = document.getElementById('todoList'),
    saveButtonElement = document.getElementById('save'),
    toDoInput = document.getElementById('toDo'),
    selectFieldElement = document.getElementById('select'),
    fetchedElementList = {
      "name" : nameElement,
      "nameBlock" : nameBlock,
      "toDoBlock" : toDoBlock,
      "createToDo" : createToDoElement,
      "createUser" : createUserElement,
      "save" : saveButtonElement,
      "addButton" : addElement,
      "userList" : userListElement,
      "todoList" : toDoListElement,
      "selectElement" : selectFieldElement,
      "toDoText" : toDoInput
    },
    users = new Users(fetchedElementList);
  users.bindEvents();
};