const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const questionCounterText = document.getElementById('questionCounter');
const scoreText = document.getElementById('score');

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: "What is the purpose of the HTML doctype declaration?",
        choice1: "To specify the document title",
        choice2:  "To define the document structure",
        choice3: "To link to external stylesheets",
        choice4: "To enable JavaScript",
        answer: 2
    },
    {
        question: "Which HTML tag is used to create a dropdown menu?",
        choice1: "<select>",
        choice2: "<option>",
        choice3: "<menu>",
        choice4: "<nav>",
        answer: 1
    },
    {
        question: "What is the difference between HTML and XHTML?",
        choice1: "HTML is stricter than XHTML",
        choice2: "XHTML is stricter than HTML",
        choice3: "HTML is for dynamic content, XHTML for static",
        choice4: "XHTML is for dynamic content, HTML for static",
        answer: 2
    },
    {
        question: "Which HTML attribute is used to specify an image's width?",
        choice1: "width",
        choice2: "height",
        choice3: "alt",
        choice4: "src",
        answer: 1
    },
    {
        question: "What is the purpose of HTML semantic elements?",
        choice1: "To improve search engine optimization",
        choice2: "To enhance accessibility",
        choice3: "To create responsive designs",
        choice4: "To animate elements",
        answer: 2
    },


];

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 5;

startGame = ()=> {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
};

getNewQuestion = () => {
    if(availableQuestions.length == 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);
        return window.location.assign('end_quiz.html');
    }
    questionCounter++;
    questionCounterText.innerText = questionCounter + '/' + MAX_QUESTIONS;

    const QuestionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[QuestionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach( choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });
    availableQuestions.splice(QuestionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach((choice) => {
    choice.addEventListener('click', (e) => {
        if(!acceptingAnswers) return;
        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];
    
        const classToApply = 
            selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if(classToApply === 'correct') {
            incrementScore(CORRECT_BONUS);
        }


        selectedChoice.parentElement.classList.add(classToApply);
        setTimeout ( () => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion();
        }, 1000 );
        
    });

})

function incrementScore (CORRECT_BONUS) {
    score += CORRECT_BONUS;
    scoreText.innerText = score;

};
startGame();


