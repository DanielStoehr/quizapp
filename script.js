let HtmlQuestions = [
  {
    question: "Wer hat HTML erfunden?",
    answer_1: "Robbie Williams",
    answer_2: "Lady Gaga",
    answer_3: "Tim Berners-Lee",
    answer_4: "Justin Bieber",
    right_answer: 3,
  },
  {
    question: "Was bedeutet das HTML Tag &lt;a&gt;?",
    answer_1: "Text fett",
    answer_2: "Container",
    answer_3: "Ein Link",
    answer_4: "Kursiv",
    right_answer: 3,
  },
  {
    question: "Mit welchem Tag bindet man Bilder ein?",
    answer_1: "&lt;image&gt;",
    answer_2: "&lt;img&gt;",
    answer_3: "&lt;pic&gt;",
    answer_4: "&lt;picture&gt;",
    right_answer: 2,
  },
  {
    question: "Wofür steht der Tag &lt;b&gt;?",
    answer_1: "unterstrichen",
    answer_2: "kursiv",
    answer_3: "durchgestrichen",
    answer_4: "fett",
    right_answer: 4,
  },
  {
    question: "Mit welchem Tag fügt man einen Container ein?",
    answer_1: "&lt;div&gt;",
    answer_2: "&lt;link&gt;",
    answer_3: "&lt;a&gt;",
    answer_4: "&lt;img&gt;",
    right_answer: 1,
  },
];

let CssQuestions = [
  {
    question: "Mit welchem Tag kann man im Header CSS Dateien einbinden?",
    answer_1: "stylesheet",
    answer_2: "src",
    answer_3: "link",
    answer_4: "meta",
    right_answer: 3,
  },
  {
    question: "Mit welchem CSS-Attribut kann man text zentrieren?",
    answer_1: "center",
    answer_2: "margin",
    answer_3: "text-align",
    answer_4: "padding",
    right_answer: 3,
  },
  {
    question: "Welches CSS-Attribut steht für den Aussenabstand?",
    answer_1: "padding",
    answer_2: "margin",
    answer_3: "height",
    answer_4: "width",
    right_answer: 2,
  },
  {
    question: "Mit welcher Psuedo-Klasse kann man den Effekt beim Darüberfahren anpassen?",
    answer_1: ":active",
    answer_2: ":disabled",
    answer_3: ":isvalid",
    answer_4: ":hover",
    right_answer: 4,
  },
  {
    question: "Welches Attribut verändert die Schriftfarbe?",
    answer_1: "color",
    answer_2: "style",
    answer_3: "background-color",
    answer_4: "border-color",
    right_answer: 1,
  },
];

let JsQuestions = [
  {
    question: "Wie greift man auf Elemente über die ID zu?",
    answer_1: "getElementsByClassName()",
    answer_2: "getElementsByTagName()",
    answer_3: "getElementById()",
    answer_4: "getElementsByName()",
    right_answer: 3,
  },
  {
    question: "Wie fügt man einem Array Werte hinzu?",
    answer_1: "add()",
    answer_2: "append()",
    answer_3: "push()",
    answer_4: "innerHTML()",
    right_answer: 3,
  },
  {
    question: "Wie fügt man einem Element eine CSS-Klasse hinzu?",
    answer_1: "Element.addClass",
    answer_2: "Element.classList.add",
    answer_3: "Element.style",
    answer_4: "Element.value",
    right_answer: 2,
  },
  {
    question: "Wie definiert man eine Funktion?",
    answer_1: "def name() {}",
    answer_2: "func name() {}",
    answer_3: "class name() {}",
    answer_4: "function name() {}",
    right_answer: 4,
  },
  {
    question: "Wie beende man vorzeitig eine Funktion?",
    answer_1: "return",
    answer_2: "break",
    answer_3: "continue",
    answer_4: "exit",
    right_answer: 1,
  },
];

let questions = [];

let currentQuestion = 0;
let rightAnswers = 0;

function loadQuestions(section) {
  if (section == "html") return HtmlQuestions;
  if (section == "css") return CssQuestions;
  if (section == "js") return JsQuestions;
  alert("Section not implemented");
}

function start(element, section) {
  setActiveNavlink(element);
  showStartingContent(false);
  showEndScreen(false);
  resetSavedAnswers();
  resetAnswerButtons();
  showQuestion(true);
  questions = loadQuestions(section);
  setQuestion();
}

function showStartingContent(boolean) {
  if (boolean) {
    document.getElementById("starting-content").style = "display:unset";
  } else {
    document.getElementById("starting-content").style = "display: none";
  }
}

function resetSavedAnswers() {
  currentQuestion = 0;
  rightAnswers = 0;
}

function showQuestion(boolean) {
  if (boolean) {
    document.getElementById("question-body").style = "display:unset";
  } else {
    document.getElementById("question-body").style = "display:none";
  }
}

function showEndScreen(boolean) {
  if (boolean) {
    document.getElementById("end-screen").style = "display:flex";
  } else {
    document.getElementById("end-screen").style = "display:none";
  }
}

function setQuestion() {
  if (currentQuestion >= questions.length) {
    showQuestion(false);
    showEndScreen(true);
    document.getElementById("score").innerHTML = `${rightAnswers} / ${questions.length}`;
  } else {
    enableNextButton(false);
    let question = questions[currentQuestion];
    document.getElementById("question").innerHTML = question.question;
    document.getElementById("answer_1").innerHTML = question.answer_1;
    document.getElementById("answer_2").innerHTML = question.answer_2;
    document.getElementById("answer_3").innerHTML = question.answer_3;
    document.getElementById("answer_4").innerHTML = question.answer_4;
  }
}

function answer(selection) {
  updateProgressBar();
  let question = questions[currentQuestion];
  let selectedQuestionNumber = selection.slice(-1);
  let idOfRightAnswer = `answer_${question.right_answer}`;

  if (Number(selectedQuestionNumber) === question.right_answer) {
    document.getElementById(selection).parentNode.classList.add("container-success");
    rightAnswers++;
  } else {
    document.getElementById(selection).parentNode.classList.add("container-danger");
    document.getElementById(idOfRightAnswer).parentNode.classList.add("container-success");
  }
  enableNextButton(true);
  enableAnswers(false);
}

function enableAnswers(boolean) {
  for (let answer of document.getElementsByClassName("answer-container")) {
    if (boolean) {
      answer.style["pointer-events"] = "auto";
    } else {
      answer.style["pointer-events"] = "none";
    }
  }
}

function enableNextButton(boolean) {
  document.getElementById("next-button").disabled = !boolean;
}

function nextQuestion() {
  currentQuestion++;
  resetAnswerButtons();
  enableNextButton(false);
  setQuestion();
  enableAnswers(true);
}

function resetAnswerButtons() {
  for (let answer of document.getElementsByClassName("answer-container")) {
    answer.classList.remove("container-success");
    answer.classList.remove("container-danger");
  }
}

function shareScore() {
  alert("nicht implementiert");
}

function replay() {
  currentQuestion = 0;
  rightAnswers = 0;
  resetProgressBar();
  showEndScreen(false);
  showQuestion(true);
}

function updateProgressBar() {
  const progressLength = ((currentQuestion + 1) / questions.length) * 100;
  document.getElementById("current-progress").style = `width: ${progressLength}%`;
  document.getElementById("current-progress").innerHTML = `${progressLength}%`;
}

function resetProgressBar() {
  document.getElementById("current-progress").style = "display: none";
}

function setActiveNavlink(element) {
  const navlinks = document.getElementsByClassName("navlink");
  for (let i = 0; i < navlinks.length; i++) {
    navlinks[i].classList.remove("active");
  }
  element.classList.add("active");
}
