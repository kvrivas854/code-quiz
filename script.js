
// Variables connect to HTML:
// Click the start button to start the game.
const startButton = document.getElementById('start-btn');
//  Click the next button to see the next question.
const nextButton = document.getElementById('next-btn');
// Hold's questions for quiz
const questionContainerElement = document.getElementById
("question-container");

const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const timerElement = document.getElementById('timer')
let shuffledQuestions, currentQuestionsIndex
let scoreCardElement = document.getElementById('score')

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionsIndex++
    setNextQuestion()
})

// tried to create timer below.
//sort of got it to work. couldn't figure out how to make it countdown and restart

function startTimer() {
    let seconds = 30;
    let count = seconds;
    let timerElement = setInterval(function() {
        document.getElementById('timer').innerHTML='00:' + seconds;
        if (seconds < 0) {
            clearInterval(startTimer);
            setNextQuestion();
        }  
    }, 1000);
}

function startGame() {
// When start button is clicked, it causes the start button to 'hide'.
startButton.classList.add('hide')
// Shuffles questions with Math.random
shuffledQuestions = questions.sort(() => Math.random() - .5)
currentQuestionsIndex = 0
// Hide is removed to show first random question
questionContainerElement.classList.remove('hide')
startTimer() 
// * place an if/else statement to deduct time for answers that are incorrect
setNextQuestion()
}
// Shuffles questions and resets to default state
function setNextQuestion () {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionsIndex])
}
// shows question and changes to show correct answer after a choice has been selected.
function showQuestion(question) {
     questionElement.innerText = question.question
     question.answers.forEach(answer => {
         const button = document.createElement('button')
         button.innerText = answer.text
         button.classList.add('btn')
         if (answer.correct) {
             button.dataset.correct = answer.correct
         }
         button.addEventListener('click', selectAnswer)
         answerButtonsElement.appendChild(button) 
     })
 }
 function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild
        (answerButtonsElement.firstChild);
    }
 }
function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct);
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    })
     // Restarts quiz once it goes through all questions listed in the quiz
    if (shuffledQuestions.length > currentQuestionsIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
         startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
    }
}
// Changes background color to signal is answer is right or wrong.
function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct'); 
    } else {
        element.classList.add('wrong');
        score -= 1;
    }
 }
// Removes color of background back to normal default color when next button is hit.
function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}
//Questions for quiz are listed here.
const questions = [
    {
        question: "Who invented JavaScript?",
        answers: [
            {text: 'A. Douglas Crockford', correct: false},
            {text: 'B. Sheryl Sandberg', correct: false},
            {text: 'C. Brendan Eich', correct: true}
        ]
    },
    { 
        question: 'Which one of these is a JavaScript package manager?',
        answers: [
            {text: 'A. Node.js', correct: false},
            {text: 'B. TypeScript', correct: false},
            {text: 'C. npm', correct: true}

        ]
    },
    { 
        question: 'Which tool can you use to ensure code quality?',
        answers: [
            {text: 'A. Angular', correct: false},
            {text: 'B. jQuery', correct: false},
            {text: 'C. RequireJS', correct: false},
            {text: 'D. ESLint', correct: true}

        ]
    },
    { 
        question: 'Which tool is used for styling webpages?',
        answers: [
            {text: 'A. HTML', correct: false},
            {text: 'B. jQuery', correct: false},
            {text: 'C. CSS', correct: true},
            {text: 'D. XML', correct: false}

        ]
    },
    { 
        question: 'Which is used for Connect To Database?',
        answers: [
            {text: 'A. PHP', correct: true},
            {text: 'B. HTML', correct: false},
            {text: 'C. JavaScript', correct: false},
            {text: 'D. All of the above', correct: false}
        ]
    },
]