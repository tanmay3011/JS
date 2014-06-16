/*Find Domain SubDomain*/
/*jslint browser: true, devel: true */
var constant = {
  regexUrl :  /(http[s]?\:\/\/)?(w{3}.)?([\w]+)(\.)?(\.)?([a-z.]{2,6})?([a-z.]{2,6})(\/)?([\w]+\/?)*$/
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
UrlDomainSubDomain.prototype.init = function (e) {
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
  if (!constant.regexUrl.test(this.url.value)) {
    alert("Wrong Url Entered! Please Enter a new url");
    //e.preventDefault();
  } else {
    this.findDomainSubDomain();
  }
};

//to bind event on submit
UrlDomainSubDomain.prototype.bindEvent = function () {
  "use strict";
  var that = this;
  this.submitButton = document.getElementById('submitButton');
  this.cb_addEventListener(this.form, 'submit', this.checkUrlValidity);
  //this.form.addEventListener('submit', function (event) { that.checkUrlValidity(event); }, false);
};


UrlDomainSubDomain.prototype.cb_addEventListener = function (obj, evt, fnc) {
  "use strict";
  if (obj.addEventListener) {
    console.log(obj);
    obj.addEventListener(evt, fnc, false);
  return true;
  } else if (obj.attachEvent) {
    return obj.attachEvent('on' + evt, fnc);
  } else {
    evt = 'on'+evt;
    if(typeof obj[evt] === 'function') {
      fnc = (function(f1,f2) {
        return function() {
          f1.apply(this,arguments);
          f2.apply(this,arguments);
        }
      })(obj[evt], fnc);
    }
    obj[evt] = fnc;
    return true;
  }
  return false;
};

//method to run javascript after loading whole page (mentioned script in head portion)
window.onload = function () {
  "use strict";
  var urlDomainSubDomain = new UrlDomainSubDomain();
};



