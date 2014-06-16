/*Find Domain SubDomain*/
/*jslint browser: true, devel: true */
var constant = {
  regexUrl :  /(http[s]?\:\/\/)?([w]{3}.)([\w]+)(\.)?(\.)?([a-z.]{2,6})?([a-z.]{2,6})(\/)?([\w]+\/?)*$/
};

var UrlDomainSubDomain = function () {
  "use strict";
  this.url;
  this.domainName;
  this.subDomainName;
  this.form;
  this.submitButton;
  this.init();
};

//attached event on submit click
UrlDomainSubDomain.prototype.init = function () {
  "use strict";
  this.submitButton = document.getElementById('submitButton');
  this.form = document.getElementById('urlForm');
  this.bindEvent();
};

//method to find domain codomain
UrlDomainSubDomain.prototype.findDomainSubDomain = function () {
  "use strict";
  alert((!RegExp.$6) ? 'Domain: ' + RegExp.$3 + RegExp.$4 + RegExp.$7 : 'Subdomain: ' + RegExp.$3 + ' Domain: ' + RegExp.$6 + RegExp.$7);
};

//method number whether number matches with the regex or not
UrlDomainSubDomain.prototype.checkUrlValidity = function (e) {
  "use strict";
  this.url = document.getElementById('url');
  if (!constant.regexUrl.test(this.url.value.trim())) {
    alert("Wrong Url Entered! Please Enter a new url");
    e.preventDefault();
  } else {
    this.findDomainSubDomain();
  }
};

//to bind event on submit
UrlDomainSubDomain.prototype.bindEvent = function () {
  "use strict";
  var that = this;
  this.form.addEventListener('submit', function (event) { that.checkUrlValidity(event); }, false);
};

//method to run javascript after loading whole page (mentioned script in head portion)
window.onload = function () {
  "use strict";
  var urlDomainSubDomain = new UrlDomainSubDomain();
};



