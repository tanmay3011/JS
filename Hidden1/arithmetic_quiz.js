var ArithmeticQuiz = function () {
  "use strict";

};

arithmeticQuiz.prototype.getNumber = function () {
  "use strict";
  return Math.floor(Math.random() * 20);
};

arithmeticQuiz.prototype.getOperator = function () {
  "use strict";
  return Math.floor(Math.random() * 4);	
};

arithmeticQuiz.prototype.getOperator = function () {
  "use strict";
  var firstNumber = this.getNumber(),
      secondNumber = this.getNumber(),
      operator = this.getOperator();
};

arithmeticQuiz.prototype.init = function () {
  "use strict";

var nextElement = document.getElementById('next');

window.onload = function () {
  "use strict";
  
  var arithmeticQuiz = ArithmeticQuiz();
  next
};



