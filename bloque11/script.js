const quizContainer = document.getElementById('quiz-container');
const resetBtn = document.getElementById('reset-btn');
const gradeBtn = document.getElementById('grade-btn');
const reviewBtn = document.getElementById('review-btn');

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function renderQuiz() {
  quizContainer.innerHTML = '';
  questions.forEach((q, idx) => {
    // Shuffle options and track the new correct index
    const options = q.options.map((opt, i) => ({opt, i}));
    shuffleArray(options);
    const correctIndex = options.findIndex(o => o.i === q.correct);
    q.currentCorrect = correctIndex;

    const questionDiv = document.createElement('div');
    questionDiv.classList.add('question');
    questionDiv.innerHTML = `<p>${idx + 1}) ${q.question}</p>`;
    options.forEach((o, i) => {
      const label = document.createElement('label');
      label.innerHTML = `<input type="radio" name="q${idx}" value="${i}"> ${o.opt}`;
      questionDiv.appendChild(label);
    });
    quizContainer.appendChild(questionDiv);
  });
}

function resetQuiz() {
  renderQuiz();
}

function gradeQuiz() {
  let correctCount = 0;
  let incorrectCount = 0;
  questions.forEach((q, idx) => {
    const selected = document.querySelector(`input[name="q${idx}"]:checked`);
    const questionDiv = document.querySelectorAll('.question')[idx];
    questionDiv.querySelectorAll('label').forEach((label, i) => {
      label.classList.remove('correct','incorrect');
      if (i === q.currentCorrect) label.classList.add('correct');
    });
    if (selected) {
      if (parseInt(selected.value) === q.currentCorrect) correctCount++;
      else incorrectCount++;
    } else {
      incorrectCount++;
    }
  });
  alert(`Correct: ${correctCount}\nIncorrect: ${incorrectCount}`);
}

function reviewIncorrect() {
  quizContainer.innerHTML = '';
  questions.forEach((q, idx) => {
    const selected = document.querySelector(`input[name="q${idx}"]:checked`);
    if (!selected || parseInt(selected.value) !== q.currentCorrect) {
      const questionDiv = document.createElement('div');
      questionDiv.classList.add('question');
      questionDiv.innerHTML = `<p>${idx + 1}) ${q.question}</p>`;
      const label = document.createElement('label');
      label.classList.add('correct');
      label.innerText = q.options[q.correct];
      questionDiv.appendChild(label);
      quizContainer.appendChild(questionDiv);
    }
  });
}

resetBtn.addEventListener('click', resetQuiz);
gradeBtn.addEventListener('click', gradeQuiz);
reviewBtn.addEventListener('click', reviewIncorrect);

renderQuiz();
