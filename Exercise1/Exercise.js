/*jslint browser: true, devel: true */
function compare(user) {
  "use strict";
  if (this.age < user.age) {
    alert(user.name + " is older than " + this.name);
  } else if (this.age > user.age) {
    alert(this.name + " is older than " + user.name);
  } else {
    alert(this.name + " is of same age as " + user.name);
  }
}

function User(name, age) {
  "use strict";
  this.name = name;
  this.age = age;
  this.compare = compare;
}

function Objectcreation() {
  "use strict";
  var user1, user2;
  user1 = new User('John', 25);
  user2 = new User('Mary', 21);
  user1.compare(user2);
}