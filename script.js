//questions array 
const questions =[
    {
        question: "What does HTML stand for?",
        answers:[
            { text: "Hyper Trainer Marking Language", correct: false },
            { text: "Hyper Text Markup Language", correct: true },
            { text: "Hyperlinks Text Mark Language", correct: false },
            { text: "Hyperlinking Text Marking Language", correct: false }
        ]
    },
    {
        question: "Which symbol is used to denote an ID in CSS?",
        answers: [
            { text: ".", correct: false },
            { text: "#", correct: true },
            { text: "*", correct: false },
            { text: "!", correct: false }
        ]
    },
    {
        question: "Which JavaScript method is used to write something to the console?",
        answers: [
            { text: "document.write()", correct: false },
            { text: "console.log()", correct: true },
            { text: "console.output()", correct: false },
            { text: "alert()", correct: false }
        ]
    },
    {
        question: "Which HTML element is used to embed JavaScript code?",
        answers: [
            { text: "<script>", correct: true },
            { text: "<javascript>", correct: false },
            { text: "<js>", correct: false },
            { text: "<code>", correct: false }
        ]
    },
    {
        question: "What does CSS stand for?",
        answers: [
            { text: "Cascading Style Sheets", correct: true },
            { text: "Creative Style System", correct: false },
            { text: "Computer Style Syntax", correct: false },
            { text: "Controlled Style Sheets", correct: false }
        ]
    },
    {
        question: "What is the purpose of a function in JavaScript?",
        answers: [
            { text: "To write less code", correct: false },
            { text: "To store data", correct: false },
            { text: "To create reusable code", correct: true },
            { text: "To style the webpage", correct: false }
        ]
    },
]
let currentQuestionIndex = 0;
let time = questions.length * 12; 
let timerId;
const timeElement = document.getElementById('time');
const startButton = document.getElementById('start-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const endScreenElement = document.getElementById('end-screen');
const finalScoreElement = document.getElementById('final-score');
const initialsElement = document.getElementById('initials');
const submitScoreButton = document.getElementById('submit-score');

//start quiz
function startQuiz() {
    startButton.classList.add('hidden');
    questionContainerElement.classList.remove('hidden');
    timerId = setInterval(updateTimer, 1000);
    setNextQuestion();
}

//show question
function setNextQuestion() {
    resetState();
    showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
    if (answer.correct) {
        button.dataset.correct = answer.correct;
    }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}
//check answer and go to the next 
function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    if (!correct) {
        time -= 10; 
        if (time < 0) time = 0; 
        timeElement.innerText = time;
    }
    if (questions.length > currentQuestionIndex + 1) {
        currentQuestionIndex++;
        setNextQuestion();
    } else {
        endQuiz();
    }
}

//update timer
function updateTimer() {
    time--;
    timeElement.innerText = time;
    if (time <= 0) {
    endQuiz();
    }
}

//end quiz and clear timer and show score
function endQuiz() {
    clearInterval(timerId);
    questionContainerElement.classList.add('hidden');
    document.getElementById('end-screen').classList.remove('hidden'); 
    document.getElementById('final-score').textContent = time;
}
//save high score
function saveHighScore() {
    const initials = initialsElement.value;
    if (initials) {
        const highscores = JSON.parse(localStorage.getItem('highscores')) || [];
        const newScore = {
            score: time,
            initials: initials
        };
        highscores.push(newScore);
        localStorage.setItem('highscores', JSON.stringify(highscores));
        alert('Score saved!');
    } else {
        alert('Please enter your initials!');
    }
}

//event listener
document.getElementById('start-btn').addEventListener('click', startQuiz);
submitScoreButton.addEventListener('click', saveHighScore);

