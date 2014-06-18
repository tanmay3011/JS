/* Timed Arithmetic Quiz*/
/*jslint browser: true, devel: true */
//Question generator class
var Question = function (maxNumberLimit) {
  "use strict";
  this.operand1;
  this.operand2;
  this.operator;
  this.question;
  this.answer;
  this.createQuestion(maxNumberLimit);
};

Question.prototype = {
  //method to get a random number
  getRandomNumber : function (maxLimit) {
    "use strict";
    return Math.floor(Math.random() * maxLimit) + 1;
  },
  //method to generate a random operator
  getRandomOperator : function () {
    "use strict";
    var operators = ["+", "-", "*", "/"];
    return operators[this.getRandomNumber(operators.length) - 1];
  },
  //method to create a question
  createQuestion : function (maxNumberLimit) {
    "use strict";
    this.operand1 = this.getRandomNumber(maxNumberLimit);
    this.operand2 = this.getRandomNumber(maxNumberLimit);
    this.operator = this.getRandomOperator();
    this.answer = this.correctAnswer();
    this.questionToString();
  },
  //method to find the correct answer 
  correctAnswer : function () {
    "use strict";
    switch (this.operator) {
      case "+" : return(parseInt(this.operand1 + this.operand2, 10)); break;
      case "-" : return(parseInt(this.operand1 - this.operand2, 10)); break;
      case "/" : return (Math.round((this.operand1 / this.operand2) * 100) / 100); break;
      case "*" : return(parseInt(this.operand1 * this.operand2, 10)); break;
    }
  },
  //question to string
  questionToString : function () {
    "use strict";
    this.question = this.operand1 + " " + this.operator +" "+ this.operand2;
  }

};

//Quiz class
var ArithmeticQuiz = function (retrievedElementsJsonObject) {
  "use strict";
  this.nextButton = retrievedElementsJsonObject.next;
  this.questionElement = retrievedElementsJsonObject.question;
  this.replyElement = retrievedElementsJsonObject.reply;
  this.questionCountElement = retrievedElementsJsonObject.questionCount;
  this.timerElement = retrievedElementsJsonObject.timer;
  this.scoreElement = retrievedElementsJsonObject.score;
  this.maxNumberLimit = retrievedElementsJsonObject.maxNumberLimit;
  this.maxQuestionCount = retrievedElementsJsonObject.maxQuestionCount;
  this.timePerQuestion = retrievedElementsJsonObject.timePerQuestion;
  this.currentIndex = 0;
  this.totalScore = 0;
  this.timeUp = false;
  this.timerId;
  this.question = [];
  this.createQuestionSet();
};

ArithmeticQuiz.prototype = {
  //method to start quiz
  startQuiz : function () {
    "use strict";
    var quiz = this;
    this.nextButton.addEventListener("click", function (event) { 
      quiz.displayNext();
    }, false);
  },
  //method which will follow after next click
  displayNext : function () {
    "use strict";
    if (this.currentIndex > 0) {
      this.scoringAndResultDisplay();      
    }
    if (this.currentIndex === 0) {
      this.replyElement.setAttribute("type", "text");
    }
    if (this.currentIndex < this.maxNumberLimit) {
      this.displayEvents();
    }  
    this.currentIndex++;
  },
  //method to call score related methods and Final Display method
  scoringAndResultDisplay : function () {
    "use strict";
    this.calculateScore();
    this.showScore();
    if (this.currentIndex === this.maxQuestionCount) {
      this.displayResult();
    }
    this.clearTimer();
  },
  //method to call initial display events
  displayEvents : function () {
    "use strict";
    this.clearTimer();
    this.setTimer();
    this.display();
  },
  //create a question a set of 20 questions
  createQuestionSet : function () {
    "use strict";
    var questionIndex, questionObject;
    for (questionIndex = 0; questionIndex < this.maxQuestionCount; questionIndex++) {
      questionObject = new Question(this.maxNumberLimit);
      this.saveQuestion(questionObject);
    }
  },
  //to append the object in a JSON object
  saveQuestion : function (questionObject) {
    "use strict";
    this.question.push(questionObject);
  },
  //function to generate timer
  setTimer : function () {
    "use strict";
    var i = this.timePerQuestion,
      that = this;
    this.timerElement.innerHTML = "Timer: " + i;
    
    this.timeUp = false;
    this.timerId = window.setInterval(function () {
      if (i > 0) {
        i--;
        that.timerElement.innerHTML = "Timer: " + i;
        if (i === 0) {
          that.timerElement.innerHTML = "Time Up!";
          that.timeUp = true;
          that.displayNext();
        }
      }
    }, 1000);
  },
  //method to display result
  displayResult : function () {
    "use strict";
    this.displayFinalResult = document.getElementById("container");
    this.displayFinalResult.innerHTML = "";
    var questionCounter, 
      wrongAnswerList = "Final Score:" + this.totalScore + "<br>",
      node = document.createElement("p");
    for (questionCounter = 0; questionCounter < this.maxNumberLimit; questionCounter++) {
      if (this.question[questionCounter].timeOut == "TimedOut") {
        wrongAnswerList += this.generateWrongAnswerList("  TimedOut " , questionCounter, "");
      } else if (!this.question[questionCounter].reply || this.question[questionCounter].reply != this.question[questionCounter].answer) {
        wrongAnswerList += this.generateWrongAnswerList("  Reply: ", questionCounter, this.question[questionCounter].reply);
      }
    }
    this.displayFinalResult.innerHTML = wrongAnswerList ;
  },
  //populate the wrong answered list
  generateWrongAnswerList : function (message, questionCounter, value) {
    "use strict";
    return "Question: " + this.question[questionCounter].question + message + " " + value + "  Actual Answer: " +this.question[questionCounter].answer + "<br>";
  },
  //clearTimer
  clearTimer : function () {
    "use strict";
    if (this.timerId) {
      window.clearInterval(this.timerId);
      this.timerElement.innerHTML = "";
    }
  },
  //to display question
  displayQuestion : function () {
    "use strict";
    this.questionElement.innerHTML = this.question[this.currentIndex].question;
  },
  // to display the question remaining count
  displayQuestionCount : function () {
    "use strict"
    this.questionCountElement.innerHTML = "Question Number: " +(this.currentIndex +1) ;
  },
  //to calculate score
  calculateScore : function () {
    "use strict";
    this.question[this.currentIndex - 1].reply = this.replyElement.value;
    if (this.checkCondition()) {
      this.totalScore++;
    } else if (this.timeUp) {
      this.question[this.currentIndex - 1].timeOut = "TimedOut";
    }
    this.replyElement.value = "";
  },
  //condition for score increment  
  checkCondition : function () {
    "use strict";
    if (!(this.replyElement.value === null) && !(this.replyElement.value === "") && this.replyElement.value == this.question[this.currentIndex - 1].answer && !this.timeUp) {
      return true;
    } 
  },
  //showscore
  showScore : function () {
    "use strict";
    this.scoreElement.innerHTML = "Score : " + this.totalScore;
  },
  //to display the display element
  display : function () {
    "use strict";
    this.displayQuestion();
    this.displayQuestionCount();
  }
};

window.onload = function () {
  "use strict";
  var maxQuestionCount = 20,
    maxNumberLimit = 20,
    timePerQuestion = 5,
    nextButton = document.getElementById('next'),
    questionElement = document.getElementById('question'),
    replyElement = document.getElementById('answer'),
    questionCountElement = document.getElementById('question_count'),
    timerElement = document.getElementById('timer'),
    scoreElement = document.getElementById('score'),
    retrievedElementsJsonObject = { 
      "next" : nextButton, 
      "question" : questionElement,  
      "reply" : replyElement,
      "questionCount" : questionCountElement, 
      "timer" : timerElement,
      "score" : scoreElement,
      "maxQuestionCount" : maxQuestionCount,
      "maxNumberLimit" : maxNumberLimit,
      "timePerQuestion" : timePerQuestion
    },
    arithmeticQuiz = new ArithmeticQuiz(retrievedElementsJsonObject);
    arithmeticQuiz.startQuiz();
};