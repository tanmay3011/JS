/* Move countries from one box to another*/
/*jslint browser: true, devel: true */
var CountryList = function (containerElement, firstSelectListElement, secondSelectListElement) {
  "use strict";
  this.containerElement = containerElement;
  this.firstSelectListElement = firstSelectListElement;
  this.secondSelectListElement = secondSelectListElement;
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
  for (selectedCountriesCounter = 0; selectedCountriesCounter < list1.options.length; selectedCountriesCounter++) {
    if (list1.options[selectedCountriesCounter].selected) {
      list2.appendChild(list1.options[selectedCountriesCounter--]);
    }
  }
};

//method to run javascript after loading whole page (mentioned script in head portion)
window.onload = function () {
  "use strict";
  var containerElement = document.getElementById("container");
  var firstSelectListElement = document.getElementById("firstList");
  var secondSelectListElement = document.getElementById("secondList");
  var countryList = new CountryList(containerElement, firstSelectListElement, secondSelectListElement);
  containerElement.addEventListener('click', function (event) { countryList.checkEventType(event); }, false);
};