/*jslint browser: true, devel: true */
function checkAll(bool) {
  "use strict";
  var checkBox = document.getElementsByName("color");
  var i=checkBox.length-1;
  if (i > -1) {
    do {
      checkBox[i].checked = bool;
    }while(--i >= 0);
  }
}