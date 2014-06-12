/*Input Url Name and open it in a new window*/
/*jslint browser: true, devel: true */
var Prompt = function () {
  "use strict";
  this.UrlName = "";
  this.regexUrl = /^(ht|f)tps?:\/\/[a-z0-9-\.]+\.[a-z]{2,4}\/?([^\s<>\#%"\,\{\}\\|\\\^\[\]`]+)?$/;
};

//method to get URL from user
Prompt.prototype.getUrlName = function () {
  "use strict";
  var check;
  do {
    this.UrlName = prompt("Please Input the URL you want to open", "http://www.google.com");
    check = this.validateInputUrl();
  } while (check);
  this.openNewWindow();
};

//method to open a New window
Prompt.prototype.openNewWindow = function () {
  "use strict";
  window.open(this.UrlName,"", "location=0, menubar=0, scrollbars=0, status=0, titlebar=0, toolbar=0, width=400,height=450");
};

//method to validate input
Prompt.prototype.validateInputUrl = function () {
  "use strict";
  if (!/^https?:\/\//i.test(this.UrlName)) {
    this.UrlName = 'http://' + this.UrlName;
	}
  if (!this.regexUrl.test(this.UrlName) || !this.UrlName) {
    alert("This Url: " + this.UrlName + " is invalid. Please enter a new Url");
    return true;
  } else {
    return false;
  }
};

window.onload = function () {
  "use strict";
  var prompt = new Prompt();
  prompt.getUrlName();
};
