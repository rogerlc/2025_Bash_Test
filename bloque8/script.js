const container = document.getElementById("questions-container");

// shuffle helper (Fisher-Yates)
function shuffle(array) {
  let current = array.length, rnd;
  while (current !== 0) {
    rnd = Math.floor(Math.random() * current);
    current--;
    [array[current], array[rnd]] = [array[rnd], array[current]];
  }
  return array;
}

// render all questions
function renderQuestions(){
  container.innerHTML = "";
  questions.forEach((q, i) => {
    const card = document.createElement("div");
    card.className = "question";
    card.dataset.index = i;

    const p = document.createElement("p");
    p.textContent = `${i+1}. ${q.text}`;
    card.appendChild(p);

    // buttons
    const btnRead = document.createElement("button");
    btnRead.textContent = "Read"; btnRead.className = "btn-read";
    btnRead.onclick = () => speakText(q.text, "en");
    card.appendChild(btnRead);

    const btnTranslate = document.createElement("button");
    btnTranslate.textContent = "Translate"; btnTranslate.className = "btn-translate";
    btnTranslate.onclick = () => speakText(q.translate || "", "es");
    card.appendChild(btnTranslate);

    const btnPron = document.createElement("button");
    btnPron.textContent = "Pronounce"; btnPron.className = "btn-pronounce";
    btnPron.onclick = () => checkPronounce(q.text);
    card.appendChild(btnPron);

    // options (shuffle each render)
    const opts = shuffle([...q.options]);
    opts.forEach(opt => {
      const label = document.createElement("label");
      const inp = document.createElement("input");
      inp.type = "checkbox";
      inp.value = opt;
      label.appendChild(inp);
      label.appendChild(document.createTextNode(opt));
      card.appendChild(label);
    });

    container.appendChild(card);
  });
}

// text-to-speech helper
function speakText(text, lang) {
  if(!text) return;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = (lang === "en") ? "en-US" : "es-MX";
  speechSynthesis.speak(utter);
}

// pronunciation (speech recognition)
function checkPronounce(referenceText){
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if(!SpeechRecognition){ alert("SpeechRecognition not supported in this browser."); return; }
  const recognition = new SpeechRecognition();
  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;
  recognition.start();
  recognition.onresult = (ev) => {
    const transcript = ev.results[0][0].transcript;
    comparePronunciation(referenceText, transcript);
  };
  recognition.onerror = (ev) => { alert("Speech Recognition Error: " + ev.error); };
}

function comparePronunciation(original, spoken){
  const normalize = s => s.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").split(/\s+/);
  const origWords = normalize(original);
  const spokenWords = normalize(spoken);
  let html = "";
  origWords.forEach((w,i) => {
    if(spokenWords[i] === w) html += `<span class="correct-word">${w}</span> `;
    else html += `<span class="incorrect-word">${w}</span> `;
  });
  const modal = document.getElementById("pronounce-modal");
  const result = document.getElementById("pronounce-result");
  result.innerHTML = html;
  modal.style.display = "block";
  modal.querySelector(".close").onclick = () => { modal.style.display = "none"; };
  window.onclick = (e) => { if(e.target === modal) modal.style.display = "none"; };
}

// grading logic
document.getElementById("grade").onclick = () => {
  let correctCount = 0, incorrectCount = 0;
  questions.forEach((q, idx) => {
    const card = container.children[idx];
    const checked = Array.from(card.querySelectorAll("input[type=checkbox]"))
                         .filter(i => i.checked)
                         .map(i => i.value)
                         .sort();
    // remove previous mark classes
    card.querySelectorAll("label").forEach(l => l.classList.remove("correct","incorrect"));

    // mark each checked label: correct if in q.correct, incorrect otherwise
    card.querySelectorAll("input[type=checkbox]").forEach(inp => {
      const lab = inp.parentElement;
      if(inp.checked && q.correct.includes(inp.value)) lab.classList.add("correct");
      else if(inp.checked && !q.correct.includes(inp.value)) lab.classList.add("incorrect");
      else lab.classList.remove("correct","incorrect");
    });

    // check whole-question correctness (checked set == correct set)
    const correctSet = [...q.correct].sort();
    const isEqual = JSON.stringify(checked) === JSON.stringify(correctSet);
    if(isEqual) correctCount++;
    else incorrectCount++;
  });

  alert(`Correct: ${correctCount}   Incorrect: ${incorrectCount}`);
};

// reset: rerender (reshuffle)
document.getElementById("reset").onclick = () => {
  renderQuestions();
};

// review incorrect opens a new window listing incorrect Qs with correct answers
document.getElementById("review").onclick = () => {
  const w = window.open("", "Review", "width=800,height=600,scrollbars=yes");
  w.document.write(`<html><head><title>Review Incorrect</title><style>
    body{font-family:Segoe UI, Tahoma, sans-serif;padding:18px;background:#f7f9fb;}
    .q{background:#fff;padding:12px;margin-bottom:12px;border-radius:8px;box-shadow:0 1px 4px rgba(0,0,0,0.06);}
    .c{color:green;font-weight:700;}
  </style></head><body><h1>Incorrect Questions</h1>`);
  questions.forEach((q, idx) => {
    const card = container.children[idx];
    const checked = Array.from(card.querySelectorAll("input[type=checkbox]")).filter(i => i.checked).map(i => i.value);
    const correctSet = q.correct;
    const equal = JSON.stringify(checked.sort()) === JSON.stringify([...correctSet].sort());
    if(!equal){
      w.document.write(`<div class="q"><p><strong>Q:</strong> ${q.text}</p><p class="c"><strong>Correct:</strong> ${correctSet.join(", ")}</p></div>`);
    }
  });
  w.document.write("</body></html>");
};

// renderQuestions helper wrapper
function renderQuestions(){
  // re-use the function above to rerender container
  container.innerHTML = "";
  questions.forEach((q, i) => {
    const card = document.createElement("div");
    card.className = "question";
    card.dataset.index = i;

    const p = document.createElement("p");
    p.textContent = `${i+1}. ${q.text}`;
    card.appendChild(p);

    // buttons
    const btnRead = document.createElement("button");
    btnRead.textContent = "Read"; btnRead.className = "btn-read";
    btnRead.onclick = () => speakText(q.text, "en");
    card.appendChild(btnRead);

    const btnTranslate = document.createElement("button");
    btnTranslate.textContent = "Translate"; btnTranslate.className = "btn-translate";
    btnTranslate.onclick = () => speakText(q.translate || "", "es");
    card.appendChild(btnTranslate);

    const btnPron = document.createElement("button");
    btnPron.textContent = "Pronounce"; btnPron.className = "btn-pronounce";
    btnPron.onclick = () => checkPronounce(q.text);
    card.appendChild(btnPron);

    // options (shuffle)
    const opts = shuffle([...q.options]);
    opts.forEach(opt => {
      const label = document.createElement("label");
      const inp = document.createElement("input");
      inp.type = "checkbox";
      inp.value = opt;
      label.appendChild(inp);
      label.appendChild(document.createTextNode(opt));
      card.appendChild(label);
    });

    container.appendChild(card);
  });
}

// initial render
renderQuestions();
