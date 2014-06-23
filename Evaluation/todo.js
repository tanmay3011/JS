/*jslint browser: true, devel: true */
var UserDetails = function (fetchedElementList) {
  "use strict";
  this.name = fetchedElementList.name;
  this.createToDo = fetchedElementList.createToDo;
  this.createUser = fetchedElementList.createUser;
  this.addButton = fetchedElementList.addButton;
  this.userListDiv = fetchedElementList.userList;
  this.todoListDiv = fetchedElementList.todoList;
  this.users = [];
  this.currentIndex = 0;
};

var ToDo = function (users, userListDiv, todoListDiv, createToDo) {
  this.usersList = users;
  this.userListDiv = userListDiv;
  this.todoListDiv = todoListDiv;
  this.createToDo = createToDo;
  this.toDoInput = document.getElementById('todo');
  this.selectListElement = document.getElementById("select");
  this.save = document.getElementById("save")
  this.todo = [];
  this.userListDisplay();
  this.selectListDisplay();
}

ToDo.prototype = {
  bindToDoEvent : function () {
    "use strict";
    var that = this;
    if (this.usersList.length > 0) {
      this.createToDo.onclick = function () {
        that.bindSaveEvent();
      };
    }
  },

  bindSaveEvent : function () {
    "use strict";
    var that = this;
    this.save.onclick = function () {
      that.addNewToDo();
      that.displayToDo();
      that.bindCheckboxEvent();
      
    };
  },

  addNewToDo : function () {
    "use strict";
    if (this.toDoInput.value.trim()) {
      var userToDo = {};
      userToDo["event"] = this.toDoInput.value;
      userToDo["assignee"] = this.selectListElement.value;
      this.todo.push(userToDo);
      this.incrementUsersToDoCount(this.selectListElement.value);
      this.toDoInput.value = "";
    }
  },

  display : function () {

  },

  selectListDisplay : function () {
    "use strict";
    var length = this.usersList.length - 1;
    this.selectListElement.appendChild(this.createElements("option",length));
  },

  userListDisplay : function () {
    "use strict";
    var length = this.usersList.length - 1;
    this.userListDiv.appendChild(this.createElements("p",length));
  },

  reUserListDisplay : function () {
    "use strict";
    var length = this.usersList.length, i;
    console.log(this.usersList);
    this.userListDiv.innerHTML = "";
    for (i=0; i < length; i++) {
      this.userListDiv.appendChild(this.createElements("p",i));
    }
  },

  displayToDo : function () {
    "use strict";
    var length = this.usersList.length - 1;
    this.todoListDiv.appendChild(this.createElements("div",length));
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

  incrementUsersToDoCount : function (name) {
    "use strict";
    var i;
    for (i = 0; i < this.usersList.length; i++) {
      if (this.usersList[i].name == name) {
        this.usersList[i].currentIndex += 1;
        break;
      }  
    }
    this.reUserListDisplay();
  },


  bindCheckboxEvent : function (subBlock, className) {
    "use strict";
    var that = this;
    this.checkboxElement = document.getElementsByClassName("checkToDo");
    console.log(this.checkboxElement);
    this.checkboxElement[0].addEventListener('click', function (event) {
      that.checkCheckbox(event);
    }, false);
  },

  checkCheckbox : function (event) {
    "use strict";
    if (event.target.checked) {
      this.decrementCount(event.target.nextSibling.id);
      event.target.nextSibling.style.setProperty("text-decoration", "line-through");
    } else {
      event.target.nextSibling.style.setProperty("text-decoration", "none");
      this.incrementUsersToDoCount(event.target.nextSibling.id);
    }
  },

  decrementCount : function (name) {
    "use strict";
    var i;
    for (i = 0; i < this.usersList.length; i++) {
      if (this.usersList[i].name == name) {
        this.usersList[i].currentIndex -= 1;
        break;
      }  
    }
    console.log(this.usersList);
    this.reUserListDisplay();
  },

  replaceClass : function (subBlock, className) {
    "use strict";
    subBlock.className = className;
  },

  subBlockDisplay : function (subBlock, displayChoice) {
    "use strict";
    if (displayChoice) {
      this.replaceClass(subBlock, "notHidden");
    } else {
      this.replaceClass(subBlock, "hidden");
    }
  },
};
  

UserDetails.prototype.bindEvents = function () {
  "use strict";
  var that = this;
  this.createUser.onclick = function () {
    that.bindAddUserEvent();
  };
};

UserDetails.prototype.bindAddUserEvent = function () {
  "use strict";
  var that = this;
  this.addButton.onclick = function () {
    that.addNewUser();
  };
};

UserDetails.prototype.addNewUser = function () {
  "use strict";
  if (this.validate()) {
    var user = {};
    user["name"] = this.name.value;
    user["currentIndex"] = this.currentIndex;
    this.users.push(user);
    var newToDo = new ToDo (this.users, this.userListDiv, this.todoListDiv, this.createToDo);
    newToDo.bindToDoEvent();
  }
};

UserDetails.prototype.validate = function () {
  "use strict";
  var valid = true;
  if (!this.name.value.trim()) {
    valid = false;
  } else {
    valid = this.checkUsersExistence();
  }
  return valid;
};

UserDetails.prototype.checkUsersExistence = function () {
  "use strict";
  var i;
  for (i = 0; i < this.users.length; i++) {
    if (this.name.value == this.users[i].name) {
      return false;
    }
  }
  return true;
};

window.onload = function () {
  "use strict";
  var nameElement = document.getElementById('name'),
    createToDoElement = document.getElementById('createToDo'),
    createUserElement = document.getElementById('createUser'),
    addElement = document.getElementById('add'),
    userListElement = document.getElementById('userList'),
    toDoListElement = document.getElementById('todoList'),
    fetchedElementList = {
      "name" : nameElement,
      "createToDo" : createToDoElement,
      "createUser" : createUserElement,
      "addButton" : addElement,
      "userList" : userListElement,
      "todoList" : toDoListElement
    },
    userDetails = new UserDetails(fetchedElementList);
    userDetails.bindEvents();
};