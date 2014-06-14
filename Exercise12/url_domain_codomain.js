/*Find Domain SubDomain*/
/*jslint browser: true, devel: true */
var UrlDomainSubDomain = function (formElement, inputedElement) {
  "use strict";
  this.url = inputedElement;
  this.domainName;
  this.subDomainName;
  this.form = formElement;
  this.regexUrl = /(http[s]?\:\/\/)?(w{3}.)?([\w]+)(\.)?(\.)?([a-z.]{2,6})?([a-z.]{2,6})(\/)?([\w]+\/?)*$/;
  this.flag = true;
};

//method number whether number matches with the regex or not
UrlDomainSubDomain.prototype.checkUrlValidity = function () {
  "use strict";
  this.url.value = this.url.value.trim();
  if (!this.regexUrl.test(this.url.value)) {
    alert("Wrong Url Entered! Please Enter a new url");
    this.flag = false;
  } else {
    this.findDomainSubDomain();
  }
};

//method to find domain codomain
UrlDomainSubDomain.prototype.findDomainSubDomain = function () {
  "use strict";
  var hostname = (this.url.value.match(this.regexUrl));
  if(!hostname[6]) {
    this.domainName = hostname[3] + hostname[4] + hostname[7];
  } else {
    this.domainName = hostname[6] + hostname[7];
    this.subDomainName = hostname[3];
  }
};

//method to validate number
UrlDomainSubDomain.prototype.validate = function () {
  "use strict";
  this.checkUrlValidity();
  if (this.flag) {
    this.popAlert();
    this.form.submit();
  }
};

//method to display result
UrlDomainSubDomain.prototype.popAlert = function () {
  "use strict";
  if(!this.subDomainName) {
    alert("Domain: " + this.domainName);  
  } else {
    alert("Domain: " + this.domainName + " & Codomain: " + this.subDomainName)
  }
};

//attached event on submit click
var formHandler = function (e) {
  "use strict";
  var inputedElement = document.getElementById('url'),
      formElement = document.getElementById('urlForm'),
      urlDomainSubDomain = new UrlDomainSubDomain(formElement, inputedElement);
  e.preventDefault();
  urlDomainSubDomain.validate();
};

//method to run javascript after loading whole page (mentioned script in head portion)
window.onload = function () {
  "use strict";
  var submitButton = document.getElementById('submitButton');
  submitButton.addEventListener('click', formHandler, false);
};