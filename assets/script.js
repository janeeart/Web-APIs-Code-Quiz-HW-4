var initials = document.querySelector("#initials");
var playerScore = document.querySelector("#player-score");
var timeLeft = 0
var timer;
var quizData = [
    {
        question: "Inside which HTML element do we put the JavaScript?",
        option: ["<javascript>", "<script>", "<scripting>", "<js>"],
        correct: "<script>"
    },
    {
        question: "How do you create a function in JavaScript?",
        option: ["function myFunction()", "function:myFunction()", "function = myFunction()", "None of the above"],
        correct: "function myFunction()"
    },
    {
        question: "How do you write an IF statement in JavaScript?",
        option: ["if i == 5 then", "if i = 5", "if (i = 5) then", "if (i == 5)"],
        correct: "if (i == 5)"
    },
    {
        question: "How does a FOR loop start?",
        option: ["for (i = 0; i <= 5)", "for i = 1 to 5", "for (i = 0; i <= 5; i++)", "for (i <=5; i++)"],
        correct: "for (i = 0; i <= 5; i++)"
    },
    {
        question: "Which event occurs when the user clicks on an HTML element?",
        option: ["onclick", "onmouseclick", "onchange", "onmouseover"],
        correct: "onclick"
    },
]


var currentQ;
function start() {
    currentQ = 0;
    timerStart()
    document.querySelector("#start-menu").setAttribute("class", "hide")
    document.querySelector("#end-game").setAttribute("class", "hide")
    document.querySelector("#quiz-content").setAttribute("class", "")
    populateQuiz()
}

function timerStart() {
    timeLeft = 75;
    document.getElementById("timeLeft").innerHTML = timeLeft;

    timer = setInterval(function () {
        timeLeft--;
        document.getElementById("timeLeft").innerHTML = timeLeft;
        if (timeLeft <= 0 || currentQ >= quizData.length) {
            clearInterval(timer);
            endGame();
        }
    }, 1000);
}

function populateQuiz() {
    if (currentQ < quizData.length) {

        document.querySelector("#question").textContent = quizData[currentQ].question

        var arrayOfElements = document.querySelectorAll("#option")
        for (i = 0; i < arrayOfElements.length; i++) {
            arrayOfElements[i].textContent = quizData[currentQ].option[i]
            arrayOfElements[i].addEventListener("click", checkAndIterate)
        }
    }

}

function checkAndIterate(e) {
    e.preventDefault()

    console.log("clicked", e.target.textContent)
    var optionPicked = e.target.textContent

    if (optionPicked == quizData[currentQ].correct) {
        currentQ++
        populateQuiz()
    } else {
        timeLeft -= 10;
        currentQ++
        populateQuiz()
    }
}

function endGame() {
    document.querySelector("#end-game").setAttribute("class", "")
    document.querySelector("#quiz-content").setAttribute("class", "hide")
    document.querySelector("#start-menu").setAttribute("class", "hide")
    playerScore.textContent = timeLeft;
}


var highScorerName = document.getElementById("initials")

function setScore() {
  
    var storedScores = JSON.parse(localStorage.getItem("score")) || [];
    var allStored = {
        initials: highScorerName.value,
        score: timeLeft
    };

storedScores.push(allStored);
localStorage.setItem("score", JSON.stringify(storedScores));

}

initials.addEventListener("submit", setScore)


