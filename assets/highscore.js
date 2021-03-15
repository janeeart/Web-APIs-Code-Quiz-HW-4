var listEL = document.querySelector("#highscores");

var storedScores = JSON.parse(localStorage.getItem("score")) || [];
for (let i = 0; i < storedScores.length; i++) {
    var bestScores = storedScores[i];
    var ul = document.createElement("ul");
    ul.textContent = `${bestScores.initials} - ${bestScores.score}`;
    listEL.append(ul);
}

var clearAll = document.querySelector("#clear-score");

clearAll.addEventListener("click", function() {
    localStorage.clear();
    location.reload();
}) ; 