/*jslint browser: true, devel: true */
function User(name, age) {
  "use strict";
  this.name = name;
  this.age = age;
  return this;
}

User.prototype.compare = function (user) {
  "use strict";
  if (this.age < user.age) {
    alert(user.name + " is older than " + this.name);
  } else if (this.age > user.age) {
    alert(this.name + " is older than " + user.name);
  } else {
    alert(this.name + " is of same age as " + user.name);
  }
}

window.onload = function() {
  "use strict";
  var user1 = new User('John', 25);
  var user2 = new User('Mary', 21);
  user1.compare(user2);
};