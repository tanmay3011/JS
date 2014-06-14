/*jslint browser: true, devel: true */
function User(name, age) {
  "use strict";
  this.name = name;
  this.age = age;
  return this;
});

User.method('getValue1', function () {
  "use strict";
  return this.name;
});

User.method('getValue2', function () {
  "use strict";
  return this.age;
});


User.method('compare', function (user) {
  "use strict";
  if (this.age < user.age) {
    alert(user.getValue1() + " is older than " + this.getValue1());
  } else if (this.age > user.age) {
    alert(this.getValue1() + " is older than " + user.getValue1());
  } else {
    alert(this.getValue1() + " is of same age as " + user.getValue1());
  }
});

function createObject() {
  "use strict";
  var user1, user2;
  user1 = new User('john', 25);
  user2 = new User('mary', 21);
  user1.compare(user2);
}