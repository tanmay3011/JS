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
  this.url = prompt("Please Input the URL you want to open", this.url);
  this.validateAndOpenUrl();
};

//method to open a New window
PopUpWindow.prototype.openNewWindow = function () {
  "use strict";
  window.open(this.url, "", "location=0, menubar=0, scrollbars=0, status=0, titlebar=0, toolbar=0, width=400, height=450");
};

//method to validate input
PopUpWindow.prototype.validateAndOpenUrl = function () {
  "use strict";
  if (!this.url.trim()) {
    alert("Please enter a new Url. Blank Field will not be accepted");
    new PopUpWindow();
  } else if (!this.regexUrl.test(this.url.trim())) {
    this.url = this.url.trim();
    alert("This Url: " + this.url + " is invalid. Please enter a new Url");
    new PopUpWindow();
  } else {
    this.assignHttpIfNotPresent();
    this.openNewWindow();
  }
};

//method to assignHttp to url if not present
PopUpWindow.prototype.assignHttpIfNotPresent = function () {
  "use strict";
  if (!/^https?:\/\//i.test(this.url) && !!this.url) {
    this.url = 'http://' + this.url;
  }
};

//method to bind events
PopUpWindow.prototype.init = function () {
  "use strict";
  this.getUrl();
};

window.onload = function () {
  "use strict";
  var popUpWindow = new PopUpWindow();
};