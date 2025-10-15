const container = document.getElementById("questions-container");

// Fisher-Yates shuffle
function shuffle(array){
  let current = array.length, rnd;
  while(current !== 0){
    rnd = Math.floor(Math.random() * current);
    current--;
    [array[current], array[rnd]] = [array[rnd], array[current]];
  }
  return array;
}

// Render questions
function renderQuestions(){
  container.innerHTML = "";
  questions.forEach((q,i) => {
    const card = document.createElement("div");
    card.className = "question";
    card.dataset.index = i;

    const p = document.createElement("p");
    p.textContent = `${i+1}. ${q.text}`;
    card.appendChild(p);

    // Buttons
    const btnRead = document.createElement("button");
    btnRead.textContent = "Read"; btnRead.className = "btn-read";
    btnRead.onclick = () => speak(q.text, "en");
    card.appendChild(btnRead);

    const btnTranslate = document.createElement("button");
    btnTranslate.textContent = "Translate"; btnTranslate.className = "btn-translate";
    btnTranslate.onclick = () => speak(q.translate, "es");
    card.appendChild(btnTranslate);

    const btnPron = document.createElement("button");
    btnPron.textContent = "Pronounce"; btnPron.className = "btn-pronounce";
    btnPron.onclick = () => checkPronounce(q.text);
    card.appendChild(btnPron);

    // Options (shuffled)
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
renderQuestions();

// Speak helper (explicit language)
function speak(text, lang){
  if(!text) return;
  const u = new SpeechSynthesisUtterance(text);
  u.lang = (lang === "en") ? "en-US" : "es-MX";
  speechSynthesis.speak(u);
}

// Pronunciation (SpeechRecognition)
function checkPronounce(reference){
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if(!SpeechRecognition){ alert("SpeechRecognition not supported in this browser."); return; }
  const recognition = new SpeechRecognition();
  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;
  recognition.start();
  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    comparePronunciation(reference, transcript);
  };
  recognition.onerror = (event) => { alert('Speech Recognition Error: '+event.error); };
}

function comparePronunciation(original, spoken){
  const normalize = s => s.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").split(/\s+/);
  const orig = normalize(original);
  const sp = normalize(spoken || "");
  let html = "";
  orig.forEach((w,i) => {
    html += (sp[i] === w) ? `<span class="correct-word">${w}</span> ` : `<span class="incorrect-word">${w}</span> `;
  });
  const modal = document.getElementById("pronounce-modal");
  const result = document.getElementById("pronounce-result");
  result.innerHTML = html;
  modal.style.display = "block";
  modal.querySelector(".close").onclick = () => { modal.style.display = "none"; };
  window.onclick = (e) => { if(e.target === modal) modal.style.display = "none"; };
}

// Grade: mark individual labels, count correct/incorrect questions
document.getElementById("grade").onclick = () => {
  let correctCount = 0, incorrectCount = 0;
  questions.forEach((q, idx) => {
    const card = container.children[idx];
    const inputs = Array.from(card.querySelectorAll("input[type=checkbox]"));
    // remove previous classes
    inputs.forEach(inp => inp.parentElement.classList.remove("correct","incorrect"));
    // mark selected
    inputs.forEach(inp => {
      if(inp.checked){
        if(q.correct.includes(inp.value)) inp.parentElement.classList.add("correct");
        else inp.parentElement.classList.add("incorrect");
      }
    });
    // determine whole-question correctness (selected set === correct set)
    const selected = inputs.filter(i => i.checked).map(i => i.value).sort();
    const correctSet = [...q.correct].sort();
    if(JSON.stringify(selected) === JSON.stringify(correctSet)) correctCount++;
    else incorrectCount++;
  });
  alert(`Correct: ${correctCount}   Incorrect: ${incorrectCount}`);
};

// Reset: uncheck and reshuffle labels order in each question
document.getElementById("reset").onclick = () => {
  questions.forEach((q, idx) => {
    const card = container.children[idx];
    const labels = Array.from(card.querySelectorAll("label"));
    // uncheck and remove classes
    labels.forEach(l => {
      const inp = l.querySelector("input");
      inp.checked = false;
      l.classList.remove("correct","incorrect");
    });
    // shuffle label order
    shuffle(labels);
    labels.forEach(l => card.appendChild(l));
  });
};

// Review incorrect: open new window with incorrect questions and correct answers
document.getElementById("review").onclick = () => {
  const incorrect = [];
  questions.forEach((q, idx) => {
    const card = container.children[idx];
    const inputs = Array.from(card.querySelectorAll("input[type=checkbox]"));
    const selected = inputs.filter(i => i.checked).map(i => i.value).sort();
    const correctSet = [...q.correct].sort();
    if(JSON.stringify(selected) !== JSON.stringify(correctSet)){
      incorrect.push({ text: q.text, correct: q.correct });
    }
  });
  if(incorrect.length === 0){ alert("All correct!"); return; }
  const w = window.open("", "Review", "width=800,height=600,scrollbars=yes");
  w.document.write(`<html><head><title>Review Incorrect</title>
    <style>body{font-family:Segoe UI, Tahoma, sans-serif;padding:18px;background:#f7f9fb;}
    .q{background:#fff;padding:12px;margin-bottom:12px;border-radius:8px;box-shadow:0 1px 4px rgba(0,0,0,0.06);}
    .c{color:green;font-weight:700;}</style></head><body><h1>Incorrect Questions</h1>`);
  incorrect.forEach(qobj => {
    w.document.write(`<div class="q"><p><strong>Q:</strong> ${qobj.text}</p><p class="c"><strong>Correct answer(s):</strong> ${qobj.correct.join(", ")}</p></div>`);
  });
  w.document.write("</body></html>");
};

// Info button already opens 'info.html' in a new tab (index.html uses window.open)
