/* script.js — bloque12 functionality */
const container = document.getElementById('questions-container');
const gradeBtn = document.getElementById('grade');
const reviewBtn = document.getElementById('review');
const resetBtn = document.getElementById('reset');
const infoBtn = document.getElementById('info');
const pronounceModal = document.getElementById('pronounce-modal');
const pronounceResultEl = document.getElementById('pronounce-result');
const pronounceClose = document.getElementById('pronounce-close');

/* Utility shuffle */
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

/* Render questions. Optionally pass preserve map keyed by question text */
function renderQuestions(preserve = {}) {
  container.innerHTML = '';
  questions.forEach((q, i) => {
    const card = document.createElement('div');
    card.className = 'question';
    card.dataset.qid = q.id || q.text;

    // question text
    const pq = document.createElement('p');
    pq.className = 'qtext';
    pq.textContent = q.text;
    card.appendChild(pq);

    // buttons: Read / Translate / Pronounce
    const btnRead = document.createElement('button');
    btnRead.className = 'btn-read';
    btnRead.textContent = 'Read';
    btnRead.onclick = () => speak(q.text, 'en-US');
    card.appendChild(btnRead);

    const btnTrans = document.createElement('button');
    btnTrans.className = 'btn-translate';
    btnTrans.textContent = 'Translate';
    btnTrans.onclick = () => speak(q.translate || '', 'es-MX');
    card.appendChild(btnTrans);

    const btnPron = document.createElement('button');
    btnPron.className = 'btn-pronounce';
    btnPron.textContent = 'Pronounce';
    btnPron.onclick = () => checkPronounce(q.text);
    card.appendChild(btnPron);

    // answers area
    const answers = document.createElement('div');
    answers.className = 'answers';

    if (q.type === 'multiple' || q.options) {
      // show checkboxes or radios depending on type: multiple=>checkbox, single=>radio
      const opts = q.options ? q.options.slice() : [];
      shuffle(opts);
      opts.forEach(opt => {
        const label = document.createElement('label');
        label.className = 'option-label';
        const input = document.createElement('input');
        input.type = (q.type === 'multiple') ? 'checkbox' : 'radio';
        input.name = `q_${i}`;
        input.value = opt;
        // restore preserve if exists
        const preserved = preserve[q.text];
        if (preserved) {
          if (Array.isArray(preserved) && preserved.includes(opt)) input.checked = true;
          if (typeof preserved === 'string' && preserved === opt) input.checked = true;
        }
        label.appendChild(input);
        label.appendChild(document.createTextNode(opt));
        answers.appendChild(label);
      });
    } else if (q.type === 'text') {
      const input = document.createElement('input');
      input.type = 'text';
      input.className = 'text-input';
      input.id = `txt_${i}`;
      if (preserve[q.text] && typeof preserve[q.text] === 'string') input.value = preserve[q.text];
      const span = document.createElement('span');
      span.className = 'correct-answer';
      span.style.marginLeft = '8px';
      answers.appendChild(input);
      answers.appendChild(span);
    } else {
      // fallback to text input
      const input = document.createElement('input');
      input.type = 'text';
      input.className = 'text-input';
      answers.appendChild(input);
    }

    card.appendChild(answers);
    container.appendChild(card);
  });
}

/* TTS speak */
function speak(text, lang) {
  if (!text) return;
  const u = new SpeechSynthesisUtterance(text);
  u.lang = lang;
  speechSynthesis.speak(u);
}

/* Pronunciation check (basic word-for-word comparison) */
function checkPronounce(questionText) {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) {
    alert('Speech Recognition not supported in this browser.');
    return;
  }
  const rec = new SR();
  rec.lang = 'en-US';
  rec.interimResults = false;
  rec.maxAlternatives = 1;
  rec.start();
  rec.onresult = (ev) => {
    const transcript = ev.results[0][0].transcript || '';
    comparePronunciation(questionText, transcript);
  };
  rec.onerror = (e) => { alert('Speech recognition error: ' + e.error); };
}

function normalizeWords(s) {
  return String(s || '').toLowerCase()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()"]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ')
    .filter(Boolean);
}

function comparePronunciation(original, spoken) {
  const o = normalizeWords(original);
  const s = normalizeWords(spoken);
  let html = '';
  o.forEach((w, i) => {
    const sw = s[i] || '';
    if (sw === w) html += `<span class="correct-word">${escapeHtml(w)}</span> `;
    else html += `<span class="incorrect-word">${escapeHtml(w)}</span> `;
  });
  pronounceResultEl.innerHTML = html;
  pronounceModal.style.display = 'block';
}

/* Collect current answers keyed by question text (pre-render) */
function collectAnswersByText() {
  const map = {};
  const qCards = Array.from(container.querySelectorAll('.question'));
  qCards.forEach(card => {
    const qText = card.querySelector('.qtext')?.textContent;
    if (!qText) return;
    // multiple
    const checks = Array.from(card.querySelectorAll('input[type=checkbox]')).filter(i=>i.checked).map(i=>i.value);
    const radio = card.querySelector('input[type=radio]:checked');
    const textInput = card.querySelector('input[type=text]');
    if (checks.length) map[qText] = checks;
    else if (radio) map[qText] = radio.value;
    else if (textInput) map[qText] = textInput.value.trim();
    else map[qText] = '';
  });
  return map;
}

/* Clear visual marks */
function clearMarks() {
  container.querySelectorAll('.option-label').forEach(l => l.classList.remove('correct','incorrect'));
  container.querySelectorAll('.text-input').forEach(i => i.classList.remove('correct','incorrect'));
  container.querySelectorAll('.correct-answer').forEach(s => s.textContent = '');
}

/* Grade: preserve answers by question text, shuffle questions, render with preserved answers, then evaluate */
function grade() {
  // 1) collect answers by question text from current DOM
  const preserved = collectAnswersByText();

  // 2) clear previous marks
  clearMarks();

  // 3) shuffle questions order and also shuffle options on render (renderQuestions shuffles options)
  shuffle(questions);

  // 4) render using preserve map keyed by question.text
  renderQuestions(preserved);

  // 5) evaluate rendered DOM against questions array (new order)
  let correct = 0, incorrect = 0;

  questions.forEach((q, idx) => {
    const card = container.children[idx];
    if (!card) return;
    if (q.type === 'multiple') {
      // for each option-label
      const labels = Array.from(card.querySelectorAll('.option-label'));
      labels.forEach(l => {
        const inp = l.querySelector('input');
        const val = inp.value;
        const isChecked = inp.checked;
        const should = q.correct.includes(val);
        if (should && isChecked) { l.classList.add('correct'); correct++; }
        else if (should && !isChecked) { l.classList.add('correct'); incorrect++; }
        else if (!should && isChecked) { l.classList.add('incorrect'); incorrect++; }
      });
    } else if (q.options) { // single choice (radio)
      const labels = Array.from(card.querySelectorAll('.option-label'));
      const selected = card.querySelector('input[type=radio]:checked');
      labels.forEach(l => {
        const inp = l.querySelector('input');
        const val = inp.value;
        if (q.correct.includes(val)) {
          l.classList.add('correct');
          if (inp.checked) { correct++; }
        } else {
          if (inp.checked) { l.classList.add('incorrect'); incorrect++; }
        }
      });
    } else if (q.type === 'text') {
      const inp = card.querySelector('.text-input');
      const span = card.querySelector('.correct-answer');
      const ans = (inp.value || '').trim();
      if (ans.toLowerCase() === String(q.correct).toLowerCase()) {
        inp.classList.add('correct'); correct++;
      } else {
        inp.classList.add('incorrect'); span.textContent = q.correct; incorrect++;
      }
    }
  });

  infoBtn.textContent = `Info(${correct} correct/${incorrect} incorrect)`;
}

/* Reset: clear inputs and marks but keep rendered order as-is (user wanted ability to reset and re-take) */
function reset() {
  container.querySelectorAll('input[type=checkbox], input[type=radio]').forEach(i=>i.checked = false);
  container.querySelectorAll('input[type=text]').forEach(i=>{ i.value = ''; i.classList.remove('correct','incorrect'); });
  container.querySelectorAll('.option-label').forEach(l => l.classList.remove('correct','incorrect'));
  container.querySelectorAll('.correct-answer').forEach(s => s.textContent = '');
  infoBtn.textContent = 'Info(0 correct/0 incorrect)';
}

/* Review Incorrect: open new tab and show only incorrect questions with correct answer (question red, answer green) */
function reviewIncorrect() {
  const w = window.open('', '_blank');
  const doc = w.document;
  doc.open();
  doc.write(`<html><head><title>Review Incorrect</title>
    <style>
      body{font-family:Arial,Helvetica,sans-serif;background:#f6f8fa;padding:20px}
      h1{color:#0984e3;text-align:center}
      .card{background:#fff;padding:14px;border-radius:8px;box-shadow:0 2px 6px rgba(0,0,0,0.06);margin-bottom:12px}
      .q{color:#d63031;font-weight:700}
      .a{color:#00b894;font-weight:700}
    </style></head><body><h1>Incorrect Questions</h1><div id="content"></div></body></html>`);
  doc.close();

  // determine incorrects by comparing current DOM inputs to questions array in current render order
  const content = doc.getElementById('content');
  questions.forEach((q, idx) => {
    const card = container.children[idx];
    if (!card) return;
    let wrong = false;
    if (q.type === 'multiple') {
      card.querySelectorAll('input[type=checkbox]').forEach(inp => {
        const val = inp.value;
        if ((q.correct.includes(val) && !inp.checked) || (!q.correct.includes(val) && inp.checked)) wrong = true;
      });
    } else if (q.options) {
      const sel = card.querySelector('input[type=radio]:checked');
      if (!sel || !q.correct.includes(sel.value)) wrong = true;
    } else if (q.type === 'text') {
      const val = (card.querySelector('input[type=text]')?.value || '').trim();
      if (val.toLowerCase() !== String(q.correct).toLowerCase()) wrong = true;
    }
    if (wrong) {
      const correctDisplay = Array.isArray(q.correct) ? q.correct.join(', ') : q.correct;
      const node = doc.createElement('div');
      node.className = 'card';
      node.innerHTML = `<p class="q">Question: ${escapeHtml(q.text)}</p><p class="a">Correct Answer: ${escapeHtml(correctDisplay)}</p>`;
      content.appendChild(node);
    }
  });
}

/* Escape HTML helper */
function escapeHtml(s) {
  return String(s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/* Info button: open info.html in a new tab */
function openInfo() {
  window.open('info.html', '_blank');
}

/* Event wiring */
renderQuestions(); // initial render (in original order)
gradeBtn.addEventListener('click', grade);
resetBtn.addEventListener('click', reset);
reviewBtn.addEventListener('click', reviewIncorrect);
infoBtn.addEventListener('click', openInfo);
pronounceClose?.addEventListener('click', ()=>{ pronounceModal.style.display = 'none'; });
window.addEventListener('click', (e)=>{ if (e.target === pronounceModal) pronounceModal.style.display = 'none'; });
