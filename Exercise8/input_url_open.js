/*Input Url Name and open it in a new window*/
/*jslint browser: true, devel: true */
var PopUpWindow = function () {
  "use strict";
  this.url = "http://www.google.com";
  this.regexUrl = /(http[s]?\:\/\/)?([w]{3}.)?((([\w]+)?\.)*)?([a-z.]+\.[a-z.]{2,4})([\/][\w%.-]+)*(\/)?([#][\w9%-]+)?([\?][\w%.]+\=[\w%]+)?(&[\w%.]+\=[\w%.]*)*$/i;
  this.init();
};

//method to get URL from user
PopUpWindow.prototype.getUrl = function () {
  "use strict";
  var ifNotValid;
  do {
    this.url = prompt("Please Input the URL you want to open", this.url);
    if (this.url !== null) {
      this.url = this.url.trim();
    }
    ifNotValid = this.validateUrl();
  } while (ifNotValid);
};

//method to open a New window
PopUpWindow.prototype.openNewWindow = function () {
  "use strict";
  window.open(this.url, "", "location=0, menubar=0, scrollbars=0, status=0, titlebar=0, toolbar=0, width=400, height=450");
};

//method to validate input
PopUpWindow.prototype.validateUrl = function () {
  "use strict";
  if (!this.url) {
    alert("Please enter a new Url. Blank Field will not be accepted");
    return true;
  } else if (!this.regexUrl.test(this.url)) {
    alert("This Url: " + this.url + " is invalid. Please enter a new Url");
    return true;
  }
  return false;
};

//method to assignHttp to url if not present
PopUpWindow.prototype.assignHttpIfNotPresent = function () {
  "use strict";
  if (!this.url.match(/^https?:\/\//i)) {
    this.url = 'http://' + this.url;
  }
};

//method to bind events
PopUpWindow.prototype.init = function () {
  "use strict";
  this.getUrl();
  this.assignHttpIfNotPresent();
  this.openNewWindow();
};

window.onload = function () {
  "use strict";
  var popUpWindow = new PopUpWindow();
};