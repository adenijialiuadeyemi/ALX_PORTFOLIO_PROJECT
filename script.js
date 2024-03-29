var myModal = document.getElementById("myModal");
var close_btn = document.getElementById("close");
var calc_btn = document.getElementById("calc_btn");

var resultContainer = document.getElementById("resultContainer");
resultContainer.style.display = "none";

var headerContainer = document.getElementById("headerContainer");
headerContainer.style.display = "none";

var nextButton = document.querySelector("#nextButton");
nextButton.style.display = "none";
nextButton.addEventListener("click", nextQuestion);

var prevButton = document.querySelector("#prevButton");
prevButton.style.display = "none";
nextButton.addEventListener("click", nextQuestion)
prevButton.addEventListener("click", prevQuestion)
//Questions
var allQuestions = [
  {
    question: "Who is the father of computer?",
    choices: ["Charles Babbage", "Tony Elumelu", "Michael Faraday", "Ada Lovelace"],
    answer: 0
  },
  {
    question: "What is the longest key on the keyboard?",
    choices: ["Enter Key", "Spacebar", "Shift key", "control key"],
    answer: 1
  },
  {
    question: "what is the sum of 2 and 3?",
    choices: ["4", "7", "5", "9"],
    answer: 2
  }
];

var index = 0;
//Storing in local storage
localStorage.setItem('allQuestions', JSON.stringify(allQuestions));

//Getting it back as a string - serialization
var stringQuestions = localStorage.getItem('allQuestions');

//Getting itback as JS object - Deserialization
allQuestions = JSON.parse(stringQuestions);



close_btn.onclick = function () {
  myModal.style.display = "none";
};
calc_btn.onclick = function () {
  myModal.style.display = "block";
};
window.onclick = function (event) {
  if (event.target == myModal) {
    myModal.style.display = "none";
  }

};

var playerArray = [];
localStorage.setItem('playerArray', JSON.stringify(playerArray));


var loginBtn = document.querySelector("#loginBtn");
var userName = document.getElementById("userName").value;
var warning = document.querySelector("#warning");
var loginPage = document.getElementById("loginPage");

loginBtn.addEventListener('click', checkForm);

function checkForm(e) {
  e.preventDefault();
  var user = document.getElementById("userName").value;
  if (user === "") {
    var errMsg = document.querySelector("#warning");
    errMsg.innerHTML = "Username cannot empty"
  }
  else {
    logIn(user)
  }
}

function Player(user) {
  this.userName = user;
  this.total = 0;
  this.storeScores = [];
  this.storedAnswers = [];
  this.answerAt = 0;
  this.finished = true;
}

function logIn(user) {
  document.getElementById("loginPage").style.display = "none";
  resultContainer.style.display = "none";
  document.getElementById("headerContainer").style.display = "block";
  document.getElementById("quizContainer").style.display = "block";

  var timeLeft = document.getElementById("timeLeft");

  //results.innerHTML = "";
  player = new Player(user);
  playerArray.push(player);
  localStorage.setItem("playerArray", JSON.stringify(playerArray));


  var playerString = localStorage.getItem("playerArray");
  playerArray = JSON.parse(playerString);
  console.log(playerArray);
  // document.getElementById('login').style.display = "none";

  for (var i = 0; i < playerArray.length; i++) {
    var player = playerArray[i];
    if (player.userName === user) {
      //console.log(player);
      actualPlayer = player;
      var storedAnswers = actualPlayer.storedAnswers;
      index = actualPlayer.answerAt;
      var welcome = document.getElementById("welcome")
      welcome.innerHTML = "Welcome to this Digital Evaluation Platform, " + actualPlayer.userName + "!";

      userName = "";
      //code to start the exam imediately
      index = actualPlayer.answerAt;

      if (actualPlayer.finished) {
        actualPlayer.storedAnswers.length = 0;  //empty the array
        actualPlayer.finished = false;
        index = 0;
      }

      var stringQuestions = localStorage.getItem("allQuestions");
      allQuestions = JSON.parse(stringQuestions);
      quizLength = allQuestions.length;


      showQuestion();
      //document.getElementById("prevButton").style.display = 'none';

      //document.getElementById("headerContainer").style.display = 'block';

    }
  }
}
//end of code to start the exam


function showQuestion() {
  var quizForm = document.getElementById("quizForm");

  showQuizButtons();
  if (index === quizLength) {
    return;
  }
  // display of question at given index:
  quizForm.classList.remove("hide");
  // var form = document.quizForm
  // form.innerHTML = "";
  var quizItem = allQuestions[index];
  var q = document.createElement("h3");
  var text = document.createTextNode(quizItem.question);

  var storedAnswers = actualPlayer.storedAnswers;
  var storedAnswer = storedAnswers[index];
  q.appendChild(text);
  quizForm.appendChild(q);

  // display of choices, belonging to the questions at given index:
  choices = allQuestions[index].choices;

  for (var i = 0; i < choices.length; i++) {
    var div = document.createElement("div");
    div.classList.add("radio");


    var input = document.createElement("input");
    input.setAttribute("id", i);
    input.setAttribute("type", "radio");
    input.setAttribute("name", "question");




    if (i === quizItem.answer) {

      input.setAttribute("value", "1");
    } else {
      input.setAttribute("value", "0");
    }


    //if question has been answered already
    if (storedAnswer) {
      var id = storedAnswer.id;
      if (i == id) {
        // if question is already answered, id has a value
        input.setAttribute("checked", "checked");

      }
    }

    //if radiobutton is clicked, the chosen answer is stored in array storedAnswers
    input.addEventListener("click", storeAnswer);


    var label = document.createElement("label");
    label.setAttribute("class", "radio-label")
    label.setAttribute("for", i);
    var choice = document.createTextNode(choices[i]);
    label.appendChild(choice);
    div.appendChild(input);
    div.appendChild(label);
    quizForm.appendChild(div);

  }
}

function storeAnswer(e) {
  var element = e.target;
  var answer = {
    id: element.id,
    value: element.value
  }
  actualPlayer.storedAnswers[index] = answer;

}


function showQuizButtons() {
  //prevButton.classList.add("hide");
  document.getElementById("nextButton").style.display = "block";
  var quizLength = allQuestions.length
  if (index === 0) {
    //there is no prev question when first question is shown
    prevButton.classList.add("hide");
  }
  if (index > 0) {
    prevButton.classList.remove("hide");
  }
  if (index === quizLength) {
    console.log("True")
    //only if last question is shown user can see the score
    //scoreButton.classList.remove("hide");
    document.getElementById("nextButton").style.display = "none";
    //prevButton still visible so user can go back and change answers
    var h2 = document.createElement("h2");
    h2.innerHTML = "sorry no more question. click the SUBMIT button ";
    quizForm.appendChild(h2);
    // document.getElementById('quizButtons').style.display = 'none';
    // document.getElementById('score').style.display = 'block';

  }
  else {
    nextButton.classList.remove("hide");
    //scoreButton.classList.add("hide");
  }
}


function prevQuestion() {
  if (index === 1) {
    //there is no prev question when first question is shown
    document.getElementById("prevButton").style.display = 'none';
  }
  //shows prev question, with chosen answer checked
  index--;
  //var form = document.quizForm
  //form.innerHTML = "";
  quizForm.innerHTML = ""
  $("#quizForm").fadeOut(0, function () {
    var show = showQuestion();
    $(this).attr('innerHTML', 'show').fadeIn(300);
  });

}

function nextQuestion() {

  index++;
  // warning.innerHTML = "";
  //var form = document.quizForm
  //form.innerHTML = "";
  quizForm.innerHTML = ""
  $("#quizForm").fadeOut(0, function () {

    var show = showQuestion();
    $(this).attr('innerHTML', 'show').fadeIn(300);
  });
  document.getElementById("prevButton").style.display = 'block';

}

function showScore() {
  var totalScore = 0;
  var storedAnswers = actualPlayer.storedAnswers

  for (var i = 0; i < storedAnswers.length; i++) {
    var score = parseInt(storedAnswers[i].value);
    totalScore += score;
  }
  console.log(totalScore)
  var percentage = (totalScore / allQuestions.length) * 100
  console.log(percentage.toFixed(2) + "%")
}
var submitExam = document.querySelector("#submitExam");
submitExam.addEventListener("click", showScore);

let created = new Date()
console.log(created.toLocaleString("en-US"))


var timeline = 60 * 1;
var secs = parseInt(timeline % 60);
var mins = parseInt(timeline / 60);

function countDown() {
  document.querySelector("#timeLeft").innerHTML = `Time Left: ${mins} Mins:${secs} Secs`;
  if (timeline <= 30) {
    document.querySelector("#timeLeft").style.color = "red";
    document.querySelector("#warningMsg").style.color = "red";
    document.querySelector("#warningMsg").innerHTML = "OOPS! You have less thn 30 seconds";
  }
  if (timeline <= 0) {
    console.log("SUBMIT")
    document.querySelector("#quizContainer").style.display = "none";
    document.querySelector("#headerContainer").style.display = "none";
    document.querySelector("#welcome").style.display = "none";
    document.querySelector("#resultContainer").style.display = "block";

    var totalScore = 0;
    var storedAnswers = actualPlayer.storedAnswers;

    for (i = 0; i < storedAnswers.length; i++) {
      var score = parseInt(storedAnswers[i].value);
      totalScore += score;
    }

    percentage = (totalScore / allQuestions.length) * 100;
    
    //display score percentage area
    
    var created = new Date();

    document.querySelector("#Score").innerHTML = `${totalScore} / ${allQuestions.length}`;

    document.querySelector('#user').innerHTML = "<b>Username: </b>" 
    + actualPlayer.userName + "<br>" + "<br>" + "<b>Subject: </b>COMPUTER STUDIES" 
    + "<br>" + "<br>" + "<b>Exam Date: </b>" + created.toLocaleString("en-US") + "<br>"+ "<br>" 
    + "<b>Total Score: </b>" + totalScore + " <b>out of</b> "+allQuestions.length+" questions" + "<br>"+"<br>"
    +"<b>Percentage: </b>"+percentage.toFixed(2)+" %";

    //results.innerHTML = output;
    actualPlayer.score = totalScore;
    actualPlayer.storedScores.push(totalScore);
    
    

    setTimeout(1);
  } else {
    timeline = timeline - 1
    mins = parseInt(timeline / 60);
    secs = parseInt(timeline % 60);

    setTimeout("countDown()", 1000);
  }
}

function startTimer() {
  setTimeout("countDown()", 1000);
}

document.getElementById("submitExam").addEventListener("click", ()=>{
  Swal.fire({
    title: 'Are you sure you want to submit this Exam?',
    text: 'Once submitted, you cannot undo this action!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, submit it!',
    cancelButtonText: 'No, cancel!',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      // If the user confirms, submit the form
      //this.submit();
      console.log("SUBMIT")
      document.querySelector("#quizContainer").style.display = "none";
      document.querySelector("#headerContainer").style.display = "none";
      document.querySelector("#welcome").style.display = "none";
      document.querySelector("#resultContainer").style.display = "block";

      var totalScore = 0;
      var storedAnswers = actualPlayer.storedAnswers;

      for (i = 0; i < storedAnswers.length; i++) {
        var score = parseInt(storedAnswers[i].value);
        totalScore += score;
      }

      percentage = (totalScore / allQuestions.length) * 100;
      
      //display score percentage area
      
      var created = new Date();

      document.querySelector("#Score").innerHTML = `${totalScore} / ${allQuestions.length}`;

      document.querySelector('#user').innerHTML = "<b>Username: </b>" 
      + actualPlayer.userName + "<br>" + "<br>" + "<b>Subject: </b>COMPUTER STUDIES" 
      + "<br>" + "<br>" + "<b>Exam Date: </b>" + created.toLocaleString("en-US") + "<br>"+ "<br>" 
      + "<b>Total Score: </b>" + totalScore + " <b>out of</b> "+allQuestions.length+" questions" + "<br>"+"<br>"
      +"<b>Percentage: </b>"+percentage.toFixed(2)+" %";

      //results.innerHTML = output;
      actualPlayer.score = totalScore;
      actualPlayer.storedScores.push(totalScore);
      
      setTimeout(1);
};
  });
});

