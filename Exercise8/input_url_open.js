/*Input Url Name and open it in a new window*/
/*jslint browser: true, devel: true */
var PopUpWindow = function () {
  "use strict";
  this.url = "http://www.google.com";
  this.regexUrl = /^((ht|f)tps?:| )?\/\/[a-z0-9-\.]+\.[a-z]{2,4}\/?([^\s<>\#%"\,\{\}\\|\\\^\[\]`]+)?$/;
};

//method to get URL from user
PopUpWindow.prototype.getUrlName = function () {
  "use strict";
  var check;
  do {
    this.url = prompt("Please Input the URL you want to open", this.url);
    this.url = this.url.trim();
    check = this.validateUrl();
  } while (check);
  this.openNewWindow();
};

//method to open a New window
PopUpWindow.prototype.openNewWindow = function () {
  "use strict";
  window.open(this.url, "", "location=0, menubar=0, scrollbars=0, status=0, titlebar=0, toolbar=0, width=400,height=450");
};

//method to validate input
PopUpWindow.prototype.validateUrl = function () {
  "use strict";
  if (!this.url) {
    alert("Please enter a new Url. Blank Field will not be accepted");
    return true;
  }
  if (!/^https?:\/\//i.test(this.url) && !!this.url) {
    this.url = 'http://' + this.url;
  }
  if (!this.regexUrl.test(this.url)) {
    alert("This Url: " + this.url + " is invalid. Please enter a new Url");
    return true;
  }
  return false;
};

window.onload = function () {
  "use strict";
  var popUpWindow = new PopUpWindow();
  popUpWindow.getUrlName();
};