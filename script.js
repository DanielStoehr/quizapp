let questions = [
  {
    question: "Wer hat HTML erfunden?",
    answer_1: "Robbie Williams",
    answer_2: "Lady Gaga",
    answer_3: "Tim Berners-Lee",
    answer_4: "Justin Bieber",
    right_answer: 3,
  },
  {
    question: "Was bedeutet ds HTML Tag &lt;a&gt;?",
    answer_1: "Text fett",
    answer_2: "Container",
    answer_3: "Ein Link",
    answer_4: "Kursiv",
    right_answer: 3,
  },
];

let currentQuestion = 0;
let rightAnswers = 0;

function init() {
  document.getElementById("numberOfQuestions").innerHTML = questions.length;
  showQuestion();
}

function showQuestion() {
  if (currentQuestion >= questions.length) {
    document.getElementById("end-screen").style = "";
    document.getElementById("question-body").style.display = "none";
    document.getElementById("right-answers").innerHTML = rightAnswers;
    document.getElementById("all-questions").innerHTML = questions.length;
  } else {
    document.getElementById("currentQuestion").innerHTML = currentQuestion + 1;
    let question = questions[currentQuestion];
    document.getElementById("question").innerHTML = question.question;
    document.getElementById("answer_1").innerHTML = question.answer_1;
    document.getElementById("answer_2").innerHTML = question.answer_2;
    document.getElementById("answer_3").innerHTML = question.answer_3;
    document.getElementById("answer_4").innerHTML = question.answer_4;
  }
}

function answer(selection) {
  let question = questions[currentQuestion];
  let selectedQuestionNumber = selection.slice(-1);
  let idOfRightAnswer = `answer_${question.right_answer}`;

  if (Number(selectedQuestionNumber) === question.right_answer) {
    document.getElementById(selection).parentNode.classList.add("bg-success");
    rightAnswers++;
  } else {
    document.getElementById(selection).parentNode.classList.add("bg-danger");
    document.getElementById(idOfRightAnswer).parentNode.classList.add("bg-success");
  }
  document.getElementById("next-button").disabled = false;
  enableAnswers(false);
}

function enableAnswers(boolean) {
  for (let answer of document.getElementsByClassName("quiz-answer-card")) {
    if (boolean) {
      answer.style["pointer-events"] = "auto";
    } else {
      answer.style["pointer-events"] = "none";
    }
  }
}

function nextQuestion() {
  currentQuestion++;
  resetAnswerButtons();
  document.getElementById("next-button").disabled = true;
  showQuestion();
  enableAnswers(true);
}

function resetAnswerButtons() {
  for (let answer of document.getElementsByClassName("quiz-answer-card")) {
    answer.classList.remove("bg-success");
    answer.classList.remove("bg-danger");
  }
}
