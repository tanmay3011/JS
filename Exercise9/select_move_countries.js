/* Move countries from one box to another*/
/*jslint browser: true, devel: true */
var CountryList = function (containerElement, firstSelectListElement, secondSelectListElement) {
  "use strict";
  this.init = function () {
    this.containerElement = document.getElementById("container");;
    this.firstSelectListElement = document.getElementById("firstList");
    this.secondSelectListElement = document.getElementById("secondList");
    this.bindEvent();
  };
};

//method to check whether to add country or remove country
CountryList.prototype.checkEventType = function (event) {
  "use strict";
  if (event.target.id === "Add") {
    this.moveCountries(this.firstSelectListElement, this.secondSelectListElement);
  } else if (event.target.id === "Remove") {
    this.moveCountries(this.secondSelectListElement, this.firstSelectListElement);
  }
};

//method to move countries from one list to another
CountryList.prototype.moveCountries = function (list1, list2) {
  "use strict";
  var selectedCountriesCounter;
  while (list1.selectedIndex !== -1) {
    list2.appendChild(list1.options[list1.selectedIndex]);
  }
};

CountryList.prototype.bindEvent = function () {
  "use strict";
  var that = this;
  this.containerElement.addEventListener('click', function (event) { that.checkEventType(event); }, false);
};

//method to run javascript after loading whole page (mentioned script in head portion)
window.onload = function () {
  "use strict";
  var countryList = new CountryList();
  countryList.init();
};