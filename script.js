const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById
("question-container");
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const timerElement = document.getElementById('timer')
let shuffledQuestions, currentQuestionsIndex


startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionsIndex++
    setNextQuestion()
})

// tried to create timer below.
//sort of got it to work. couldn't figure out how to make it countdown and restart

function startTimer() {
    let seconds = 30;
    let count = seconds.countdown;
    let timerElement = setInterval(function() {
        document.getElementById('timer').innerHTML='00: ' + seconds;
        if (sec < 0) {
            clearInterval(startTimer);
            setNextQuestion();
        }
        
    }, 1000);
}

// let startTime =
// function startTimer() {
//     timerElement.innerText = 60;
//     startTime = new Date()
//     setInterval(() => {
//         timer.innerText = getTimerTime()
//     }, 1000)
// }
// function getTimerTime() {
//    return Math.floor((new Date() - startTime) / 1000)
// }


function startGame() {
console.log('started')
startButton.classList.add('hide')
shuffledQuestions = questions.sort(() => Math.random() - .5)
currentQuestionsIndex = 0
questionContainerElement.classList.remove('hide')
startTimer()
setNextQuestion()
}


function setNextQuestion () {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionsIndex])
}

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
    if (shuffledQuestions.length > currentQuestionsIndex + 1){
        nextButton.classList.remove('hide');
    } else {
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
    }
    
}
function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct');
    } else{
        element.classList.add('wrong');
        }
    }

    function clearStatusClass(element) {
        element.classList.remove('correct');
        element.classList.remove('wrong');
    }

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