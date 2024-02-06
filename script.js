const questions = [
    {
        question: "Which component is used to compile, debug and execute the java programs?",
        answers: [
            { text:"JRE", correct:false},
            { text:"JIT", correct:false},
            { text:"JDK", correct:true},
            { text:"JVM", correct:false},
        ]
    },
    {
        question: "Which one of the following is not a Java feature?",
        answers: [
            { text:"Object-oriented", correct:false},
            { text:"Use of pointers", correct:true},
            { text:"Portable", correct:false},
            { text:"Dynamic and Extensible", correct:false},
        ]
    },
    {
        question: "Which of the following is not an OOPS concept in Java?",
        answers: [
            { text:"Polymorphism", correct:false},
            { text:"Inheritance", correct:false},
            { text:"Compilation", correct:true},
            { text:"Encapsulation", correct:false},
        ]
    },
    {
        question: "Which of the following is a type of polymorphism in Java Programming?",
        answers: [
            { text:"Multiple polymorphism", correct:false},
            { text:"Compile time polymorphism", correct:true},
            { text:"Multilevel polymorphism", correct:false},
            { text:"Execution time polymorphism", correct:false},
        ]
    },
    {
        question: "What is Truncation in Java?",
        answers: [
            { text:"Floating-point value assigned to a Floating type", correct:false},
            { text:"Floating-point value assigned to an integer type", correct:true},
            { text:"Integer value assigned to floating type", correct:false},
            { text:"Integer value assigned to floating type", correct:false},
        ]
    },
    {
        question: "Which exception is thrown when java is out of memory?",
        answers: [
            { text:"OutOfMemoryError", correct:true},
            { text:"MemoryError", correct:false},
            { text:"MemoryOutOfBoundsException", correct:false},
            { text:"MemoryFullException", correct:false},
        ]
    },
    {
        question: "Which of these are selection statements in Java?",
        answers: [
            { text:"break", correct:false},
            { text:"continue", correct:false},
            { text:"for()", correct:false},
            { text:"if()", correct:true},
        ]
    },
    {
        question: "Which of the following is a superclass of every class in Java?",
        answers: [
            { text:"ArrayList", correct:false},
            { text:"Abstract class", correct:false},
            { text:"Object class", correct:true},
            { text:"String", correct:false},
        ]
    },
    {
        question: "Which of these packages contains the exception Stack Overflow in Java?",
        answers: [
            { text:"java.io", correct:false},
            { text:"java.system", correct:false},
            { text:"java.lang", correct:true},
            { text:"java.util", correct:false},
        ]
    },
    {
        question: "Which of these keywords are used for the block to be examined for exceptions?",
        answers: [
            { text:"check", correct:false},
            { text:"throw", correct:false},
            { text:"catch", correct:false},
            { text:"try", correct:true},
        ]
    }
];

const questionElement=document.getElementById("question");
const answerButton=document.getElementById("answer-buttons");
const nextButton=document.getElementById("next-button");

let currentQuestionIndex=0;
let score=0;

function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML="Next";
    showQuestion();
}

function showQuestion(){
   
    resetState();
    let currentQuestion=questions[currentQuestionIndex];
    let questionNo=currentQuestionIndex+1;
    questionElement.innerHTML=questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer=>{
        const button=document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click",selectAnswer)
    })
}

function resetState(){
    nextButton.style.display="none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}
function selectAnswer(e){
    const selectedButton=e.target;
    const isCorrect = selectedButton.dataset.correct==="true";
    if(isCorrect){
        selectedButton.classList.add("correct");
        score++;
    }
    else{
        selectedButton.classList.add("incorrect");
    }

    Array.from(answerButton.children).forEach(button =>{
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        }
        button.disabled=true;
    });
    nextButton.style.display="block";
}

function showScore(){
    resetState();
    questionElement.innerHTML=`You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML="Play Again";
    nextButton.style.display="block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion()
    }
    else{
        showScore();
    }
}

nextButton.addEventListener("click",() =>{
    if(currentQuestionIndex<questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
})
startQuiz();

