var questions = [
    {
        question: "HTML stands for -:",
        answer: "HyperText Markup Language",
        options: [
            "HighText Machine Language",
            "HyperText and Markup Language",
            "HyperText Markup Language",
            "None of these"
        ]
    },
    {
        question: " Which of the following tag is used for inserting the largest heading in HTML?",
        answer: "<h2>",
        options: [
            "<h3>",
            "<h2>",
            "<h5>",
            "<h6>",
        ]
    },
    {
        question: "How to insert a background image in HTML?",
        answer: '<body background = "img.png">',
        options: [
            '<body background = "img.png">',
            '<img background = "img.png">',
            '<bg-image = "img.png">',
            "None of the above",
        ]
    },
    {
        question: "How to insert an image in HTML? ",
        answer: '<img src = "jtp.png" />',
        options: [
            '<img href = "jtp.png" />',
            '<img url = "jtp.png" />',
            '<img link = "jtp.png" />',
            '<img src = "jtp.png" />',
        ]
    },
    {
        question: " The <hr> tag in HTML is used for -",
        answer: "horizontal ruler",
        options: [
            "new line",
            "vertical ruler",
            "new paragraph",
            "horizontal ruler",
        ]
    }
];

var currentQuestion = {
    question: "",
    answer: "",
    options: []
};
var questionNo = 0;
var totalQuestionNo = questions.length;
var userAnswers = [];

var timerSeconds = 0;
var timerMinutes = 0;
var totalTimerSeconds = 30 * questions.length;
var timer;
var score = 0;
var storeRightAndWrongAns = [];

function gotoHomePage() {
    document.getElementById("homePageMainBlock").style.display = "block";
    document.getElementById("quizpage").style.display = "none";
    document.getElementById("editpage").style.display = "none";
    document.getElementById("floatingButton").style.display = "none";
}

function gotoQuizPage() {
    document.getElementById("homePageMainBlock").style.display = "none";
    document.getElementById("quizpage").style.display = "block";
    document.getElementById("editpage").style.display = "none";
    document.getElementById("floatingButton").style.display = "block";
    onLoad();
}

function gotoEditPage() {
    document.getElementById("homePageMainBlock").style.display = "none";
    document.getElementById("quizpage").style.display = "none";
    document.getElementById("editpage").style.display = "block";
    document.getElementById("floatingButton").style.display = "block";
    createQuestionContainers(false);
}

function onLoad() {
    questionNo = 0;
    totalTimerSeconds = 30 * questions.length;
    totalQuestionNo = questions.length;
    score = 0;
    timerSeconds = totalTimerSeconds % 60;
    timerMinutes = (totalTimerSeconds - timerSeconds) / 60;
    putQuestion('nextBtn');
    timer = setInterval(startTimer, 1000);
    document.getElementById("questionNo").textContent = "Question No: " + questionNo + "/" + totalQuestionNo;
    document.getElementById("dialogBox").style.visibility = "hidden";
}
function startTimer() {
    document.getElementById('timer').textContent = "Timer: " + (timerMinutes < 10 ? "0" + timerMinutes : timerMinutes) + " : " + (timerSeconds < 10 ? "0" + timerSeconds : timerSeconds);
    if (timerMinutes == 0 && timerSeconds == 0) {
        window.clearInterval(timer);
        return;
    }

    if (timerSeconds == 0) {
        timerSeconds = 59;
        timerMinutes--;
    } else {
        timerSeconds--;
    }
}

function onSelectOption(btnId) {
    userAnswers[questionNo] = document.getElementById(btnId).textContent;
    checkSelectedOption();
}

function nextBtn() {
    if (userAnswers[questionNo] == undefined) {
        alert("Please select an option");
    } else {
        putQuestion("nextBtn");
    }
}

function putQuestion(id) {

    resetSelectedOption();
    if (questionNo < questions.length && questionNo >= 0 && id.localeCompare("nextBtn") == 0) {
        questionNo++;
    } else if (questionNo <= questions.length && questionNo > 1 && id.localeCompare("previousBtn") == 0) {
        questionNo--;
        document.getElementById("nextBtn").textContent = "Next";
        document.getElementById("nextBtn").onclick = function () { nextBtn(); }
    }
    showHideButtons();
    currentQuestion = questions[questionNo - 1];
    document.getElementById('question').innerHTML = "Q-" + questionNo + ": " + currentQuestion.question;
    document.getElementById('option1').textContent = currentQuestion.options[0];
    document.getElementById('option2').textContent = currentQuestion.options[1];
    document.getElementById('option3').textContent = currentQuestion.options[2];
    document.getElementById('option4').textContent = currentQuestion.options[3];
    //changing the question no
    document.getElementById("questionNo").textContent = "Question No: " + questionNo + "/" + totalQuestionNo;
    checkSelectedOption();
}
//show and hide buttons 
function showHideButtons() {
    if (questionNo - 1 == 0) {
        document.getElementById("previousBtn").style.visibility = "hidden";
    } else {
        document.getElementById("previousBtn").style.visibility = "visible";
    }
    if (questionNo == questions.length) {
        showFinishBtn();
    }
}

//resetSelectedOption
function resetSelectedOption() {
    for (var i = 1; i <= 4; i++) {
        document.getElementById("option" + i).style.borderColor = "black";
        document.getElementById("option" + i).style.backgroundColor = "white";
        document.getElementById("option" + i).style.color = "black";
        document.getElementById("option" + i).style.fontSize = "large";
        document.getElementById("option" + i).style.boxShadow = "none";
    }
}


//Checking that question is selected or not
function checkSelectedOption() {
    if (userAnswers[questionNo] == undefined) {
        return;
    }
    for (var j = 1; j <= 4; j++) {
        if (document.getElementById("option" + j).textContent == userAnswers[questionNo]) {
            document.getElementById("option" + j).style.borderColor = "white";
            document.getElementById("option" + j).style.backgroundColor = "#F43331";
            document.getElementById("option" + j).style.color = "white";
            document.getElementById("option" + j).style.boxShadow = "0px 0px 5px 5px #F43331";
        } else {
            document.getElementById("option" + j).style.borderColor = "black";
            document.getElementById("option" + j).style.backgroundColor = "white";
            document.getElementById("option" + j).style.color = "black";
            document.getElementById("option" + j).style.boxShadow = "none";
        }
    }
}

function calculateScores() {
    var allScoreTables = "";
    for (var i = 1; i <= questions.length; i++) {
        if (userAnswers[i].localeCompare(questions[i - 1].answer) == 0) {
            score++;
        }
        var scoreTable = "<table>";
        scoreTable += "<tr><th rowspan='2'>" + "Q-" + i + "</th><th>Option 1</th><th>Option 2</th><th>Option 3</th><th>Option 4</th></tr>";
        scoreTable += "<tr>";

        if (userAnswers[i].localeCompare(questions[i - 1].answer) == 0) {
            console.log("correct");
            for (var j = 0; j < 4; j++) {
                if (questions[i - 1].options[j].localeCompare(questions[i - 1].answer) == 0) {
                    scoreTable += "<td> <img src='tick.png'></td>";
                } else {
                    scoreTable += "<td></td>";
                }
            }
        } else {
            for (var j = 0; j < 4; j++) {
                if (questions[i - 1].options[j].localeCompare(userAnswers[i]) == 0) {
                    scoreTable += "<td> <img src='cut.png'></td>";
                } else if (questions[i - 1].options[j].localeCompare(questions[i - 1].answer) == 0) {
                    scoreTable += "<td> <img src='tick.png'></td>";
                } else {
                    scoreTable += "<td></td>";
                }
            }
        }

        scoreTable += "</tr>";
        scoreTable += "</table>";
        allScoreTables += scoreTable;
    }
    document.getElementById("scoreContainer").innerHTML = allScoreTables;
}

function showFinishBtn() {
    document.getElementById("nextBtn").textContent = "Finish";
    document.getElementById("nextBtn").onclick = function () {
        calculateScores();
        showDialogBox();
    }
}

function showDialogBox() {
    document.getElementById("score").textContent = score + "/" + totalQuestionNo;
    document.getElementById("dialogBox").style.visibility = "visible";
    document.getElementById("mainBlock").style.visibility = "hidden";
    document.getElementById("nextBtn").style.visibility = "hidden";
    document.getElementById("previousBtn").style.visibility = "hidden";
    document.getElementById("score").scrollTop = 0;
}
function checkAnswers() {
    document.getElementById("dialogBox").style.visibility = "hidden";
    document.getElementById("nextBtn").textContent = "Next";
    document.getElementById("mainBlock").style.visibility = "visible";
    document.getElementById("nextBtn").style.visibility = "visible";
    document.getElementById("previousBtn").style.visibility = "visible";
    window.clearInterval(timer);
    questionNo = 0;

    for (var j = 1; j <= 4; j++) {
        document.getElementById("option" + j).onmouseover = null;
        document.getElementById("option" + j).onmouseout = null;
        document.getElementById("option" + j).onclick = function () { };
    }
    document.getElementById('timer').textContent = "Timer: " + "00 : 00";
    document.getElementById("previousBtn").onclick = function () {
        changeQuestionInResultPreview("previousBtn");
    }
    document.getElementById("nextBtn").onclick = function () {
        changeQuestionInResultPreview("nextBtn");
    }
    changeQuestionInResultPreview("nextBtn");
}
function changeQuestionInResultPreview(id) {
    if (questionNo == 0) {
        document.getElementById("previousBtn").style.visibility = "hidden";
    } else {
        document.getElementById("previousBtn").style.visibility = "visible";
    }
    if (questionNo < questions.length && questionNo >= 0 && id.localeCompare("nextBtn") == 0) {
        questionNo++;
    } else if (questionNo <= questions.length && questionNo > 1 && id.localeCompare("previousBtn") == 0) {
        questionNo--;
        document.getElementById("nextBtn").textContent = "Next";
        document.getElementById("nextBtn").onclick = function () { changeQuestionInResultPreview('nextBtn'); }
    }
    showHideButtons();
    if (questionNo == questions.length) {
        document.getElementById("nextBtn").textContent = "Got it!";
        document.getElementById("nextBtn").onclick = function () {
            showDialogBox();
        };
    }

    currentQuestion = questions[questionNo - 1];
    document.getElementById('question').innerHTML = "Q-" + questionNo + ": " + currentQuestion.question;
    document.getElementById('option1').textContent = currentQuestion.options[0];
    document.getElementById('option2').textContent = currentQuestion.options[1];
    document.getElementById('option3').textContent = currentQuestion.options[2];
    document.getElementById('option4').textContent = currentQuestion.options[3];
    //changing the question no
    document.getElementById("questionNo").textContent = "Question No: " + questionNo + "/" + totalQuestionNo;
    checkSelectedOption();
    showCorrectAns();
}

function showCorrectAns() {
    for (var j = 1; j <= 4; j++) {
        if (document.getElementById("option" + j).textContent == currentQuestion.answer) {
            document.getElementById("option" + j).style.borderColor = "white";
            document.getElementById("option" + j).style.backgroundColor = "#08af7b";
            document.getElementById("option" + j).style.color = "white";
            document.getElementById("option" + j).style.boxShadow = "0px 0px 5px 5px #08af7b";
        }
    }
}

function startAgain() {
    userAnswers = [];
    document.getElementById("dialogBox").style.visibility = "hidden";
    document.getElementById("nextBtn").textContent = "Next";
    document.getElementById("mainBlock").style.visibility = "visible";
    document.getElementById("nextBtn").style.visibility = "visible";
    document.getElementById("previousBtn").style.visibility = "visible";
    questionNo = 0;
    onLoad();
    document.getElementById("previousBtn").onclick = function () {
        putQuestion("previousBtn");
    }
    document.getElementById("nextBtn").onclick = function () {
        nextBtn();
    }

    //option1
    document.getElementById("option1").onclick = function () {
        onSelectOption("option1");
    }
    document.getElementById("option1").onmouseover = function () {
        onOptionBtnMouseOver("option1");
    }
    document.getElementById("option1").onmouseout = function () {
        onOptionBtnMouseOut("option1");
    }
    //option2
    document.getElementById("option2").onclick = function () {
        onSelectOption("option2");
    }
    document.getElementById("option2").onmouseover = function () {
        onOptionBtnMouseOver("option2");
    }
    document.getElementById("option2").onmouseout = function () {
        onOptionBtnMouseOut("option2");
    }
    //option3
    document.getElementById("option3").onclick = function () {
        onSelectOption("option3");
    }
    document.getElementById("option3").onmouseover = function () {
        onOptionBtnMouseOver("option3");
    }
    document.getElementById("option3").onmouseout = function () {
        onOptionBtnMouseOut("option3");
    }

    //option4
    document.getElementById("option4").onclick = function () {
        onSelectOption("option4");
    }
    document.getElementById("option4").onmouseover = function () {
        onOptionBtnMouseOver("option4");
    }
    document.getElementById("option4").onmouseout = function () {
        onOptionBtnMouseOut("option4");
    }


    document.getElementById("previousBtn").onmouseover = function () {
        onPreviousNextBtnMouseOver("previousBtn");
    }
    document.getElementById("previousBtn").onmouseout = function () {
        onPreviousNextBtnMouseOut("previousBtn");
    }
    document.getElementById("nextBtn").onmouseover = function () {
        onPreviousNextBtnMouseOver("nextBtn");
    }
    document.getElementById("nextBtn").onmouseout = function () {
        onPreviousNextBtnMouseOut("nextBtn");
    }
}


function onOptionBtnMouseOver(id) {
    document.getElementById(id).style.borderColor = "white";
    document.getElementById(id).style.backgroundColor = "grey";
    document.getElementById(id).style.color = "white";
    document.getElementById(id).style.boxShadow = "0px 0px 5px 5px grey";
}
function onOptionBtnMouseOut(id) {
    document.getElementById(id).style.borderColor = "black";
    document.getElementById(id).style.backgroundColor = "white";
    document.getElementById(id).style.color = "black";
    document.getElementById(id).style.boxShadow = "none";
    checkSelectedOption();
}
function onPreviousNextBtnMouseOver(id) {
    document.getElementById(id).style.backgroundColor = '#33b249';
    document.getElementById(id).style.color = 'white';
    document.getElementById(id).style.borderColor = 'white';
    document.getElementById(id).style.boxShadow = "0px 0px 5px 5px #33b249";
}
function onPreviousNextBtnMouseOut(id) {
    document.getElementById(id).style.backgroundColor = 'white';
    document.getElementById(id).style.color = 'black';
    document.getElementById(id).style.borderColor = 'black';
    document.getElementById(id).style.boxShadow = 'none';
}

// EditPage functons 

function createQuestionContainers(addEmptyBlock) {
    var allQuestionsContainer = '';
    var questionContainer;
    var question;
    var option1;
    var option2;
    var option3;
    var option4;
    var answer;

    for (var i = 0; i < questions.length; i++) {
        question = questions[i].question;
        option1 = questions[i].options[0];
        option2 = questions[i].options[1];
        option3 = questions[i].options[2];
        option4 = questions[i].options[3];
        answer = questions[i].answer;


        questionContainer = "<div class='questionAnswerBox' id='questionAnswerBox'><div class='questionBox'><h1>Question No-" + (i + 1) + ":</h1><label>Question: </label><input type='text' id='question" + i + "' value='" + question + "' disabled></ininputut><label>Option 1: </label><input type='text' id='option1" + i + "' value='" + option1 + "' disabled></input><label>Option 2: </label><input type='text' id='option2" + i + "' value='" + option2 + "' disabled></input><label>Option 3: </label><input type='text' id='option3" + i + "' value='" + option3 + "' disabled></input><label>Option 4: </label><input type='text' id='option4" + i + "' value='" + option4 + "' disabled></input><label>Answer: </label><input type='text' id='answer" + i + "' value='" + answer + "' disabled></input></div ><div class='options'><button id='editBtn' class='editBtn' onclick='editQuestion(" + i + ")'>Edit</button><button id='deleteBtn' class='deleteBtn' onclick='deleteQuestion(" + i + ")'>Delete</button></div></div>";

        allQuestionsContainer += questionContainer;
    }
    if (addEmptyBlock) {
        allQuestionsContainer += "<div class='questionAnswerBox' id='questionAnswerBox'><h1>Question No-" + (questions.length + 1) + ":</h1><div class='questionBox'> <label>Question: </label><input type='text' id='newQuestion'></ininputut><label>Option 1: </label><input type='text' id='newOption1'></input><label>Option 2: </label><input type='text' id='newOption2'></input><label>Option 3: </label><input type='text' id='newOption3'></input><label>Option 4: </label><input type='text' id='newOption4'></input><label>Answer: </label><input type='text' id='newAnswer'></input></div><div class='options'><button id='deleteBtn' class='deleteBtn' onclick='cancelAddQuestion()'>Cancel</button></div></div>";
    }

    document.getElementById("editPageMainBlock").innerHTML = allQuestionsContainer;
}

function editQuestion(i) {
    document.getElementById("question" + i).disabled = false;
    document.getElementById("option1" + i).disabled = false;
    document.getElementById("option2" + i).disabled = false;
    document.getElementById("option3" + i).disabled = false;
    document.getElementById("option4" + i).disabled = false;
    document.getElementById("answer" + i).disabled = false;

    document.getElementById("editBtn").textContent = "Save";
    document.getElementById("editBtn").style.backgroundColor = "#33b249";
    document.getElementById("editBtn").onclick = function () {
        saveUpdatedQuestion(i);
    }
    document.getElementById("addQuestionBtn").textContent = "Add Questions";
    document.getElementById("addQuestionBtn").style.backgroundColor = "crimson";
    document.getElementById("addQuestionBtn").onclick = function () {
        addQuestion();
    }
}

function saveUpdatedQuestion(index) {
    questions[index].question = document.getElementById("question" + index).value;
    questions[index].options[0] = document.getElementById("option1" + index).value;
    questions[index].options[1] = document.getElementById("option2" + index).value;
    questions[index].options[2] = document.getElementById("option3" + index).value;
    questions[index].options[3] = document.getElementById("option4" + index).value;
    questions[index].answer = document.getElementById("answer" + index).value;
    createQuestionContainers(false);
}

function deleteQuestion(i) {
    const index = questions.indexOf(questions[i]);
    if (index > -1) {
        questions.splice(index, 1);
    }
    createQuestionContainers(false);
    document.getElementById("addQuestionBtn").textContent = "Add Questions";
    document.getElementById("addQuestionBtn").style.backgroundColor = "crimson";
    document.getElementById("addQuestionBtn").onclick = function () {
        addQuestion();
    }
}

function addQuestion() {
    createQuestionContainers(true);
    var objDiv = document.getElementById("editPageMainBlock");
    objDiv.scrollTop = objDiv.scrollHeight - 500;
    document.getElementById("addQuestionBtn").textContent = "Submit";
    document.getElementById("addQuestionBtn").style.backgroundColor = "#33b249";
    document.getElementById("addQuestionBtn").onclick = function () {
        if (!(document.getElementById("newQuestion").value == '' || document.getElementById("newAnswer").value == '' || document.getElementById("newOption1").value == '' || document.getElementById("newOption2").value == '' || document.getElementById("newOption3").value == '' || document.getElementById("newOption4").value == '')) {
            questions.push({
                question: document.getElementById("newQuestion").value,
                answer: document.getElementById("newAnswer").value,
                options: [
                    document.getElementById("newOption1").value,
                    document.getElementById("newOption2").value,
                    document.getElementById("newOption3").value,
                    document.getElementById("newOption4").value,
                ]
            },);
        }
        document.getElementById("addQuestionBtn").textContent = "Add Questions";
        document.getElementById("addQuestionBtn").style.backgroundColor = "crimson";
        document.getElementById("addQuestionBtn").onclick = function () {
            addQuestion();
        }
        createQuestionContainers(false);
    };

}

function cancelAddQuestion() {
    document.getElementById("addQuestionBtn").textContent = "Add Questions";
    document.getElementById("addQuestionBtn").style.backgroundColor = "#33b249";
    document.getElementById("addQuestionBtn").onclick = function () {
        addQuestion();
    }
    createQuestionContainers(false);

}
