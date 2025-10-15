document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("questions-container");
  const btnGrade = document.getElementById("grade");
  const btnReset = document.getElementById("reset");
  const btnReview = document.getElementById("review");
  const btnInfo = document.getElementById("info");
  const modal = document.getElementById("pronounce-modal");
  const modalClose = modal.querySelector(".close");
  const modalResult = document.getElementById("pronounce-result");
  const modalRef = document.getElementById("pronounce-reference");

  function shuffle(src) {
    const a = src.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  let shownQuestions = [];

  function renderQuestions() {
    container.innerHTML = "";
    shownQuestions = shuffle(questions).map(q => ({ ...q, options: shuffle(q.options) }));

    shownQuestions.forEach((q, idx) => {
      const card = document.createElement("div");
      card.className = "question";

      const title = document.createElement("p");
      title.textContent = `${idx + 1}. ${q.text}`;
      card.appendChild(title);

      const btnRead = document.createElement("button");
      btnRead.type = "button";
      btnRead.className = "btn-read";
      btnRead.textContent = "Read";
      btnRead.onclick = () => speakText(q.text, "en-US");
      card.appendChild(btnRead);

      const btnTranslate = document.createElement("button");
      btnTranslate.type = "button";
      btnTranslate.className = "btn-translate";
      btnTranslate.textContent = "Translate";
      btnTranslate.onclick = () => speakText(q.translate || q.text, "es-ES");
      card.appendChild(btnTranslate);

      const btnPronounce = document.createElement("button");
      btnPronounce.type = "button";
      btnPronounce.className = "btn-pronounce";
      btnPronounce.textContent = "Pronounce";
      btnPronounce.onclick = () => startPronounce(q.text);
      card.appendChild(btnPronounce);

      const multi = Array.isArray(q.correct) && q.correct.length > 1;
      const inputType = multi ? "checkbox" : "radio";

      q.options.forEach(opt => {
        const label = document.createElement("label");
        label.className = "option-label";

        const input = document.createElement("input");
        input.type = inputType;
        input.name = `q_${idx}`;
        input.value = opt;

        const span = document.createElement("span");
        span.className = "option-text";
        span.textContent = opt;

        label.appendChild(input);
        label.appendChild(span);
        card.appendChild(label);
      });

      card._q = q;
      container.appendChild(card);
    });

    btnInfo.textContent = `Info (0 correct / 0 incorrect)`;
  }

  function speakText(text, lang) {
    try {
      const u = new SpeechSynthesisUtterance(text);
      u.lang = lang || "en-US";
      speechSynthesis.speak(u);
    } catch (e) { console.warn("SpeechSynthesis error", e); }
  }

  function startPronounce(originalText) {
    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Recognition) { alert("Speech Recognition not supported in this browser."); return; }
    const recognition = new Recognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.start();

    recognition.onresult = (ev) => {
      const spoken = ev.results[0][0].transcript || "";
      showPronounceModal(originalText, spoken);
    };
    recognition.onerror = (ev) => { alert("Speech recognition error: " + (ev.error || "unknown")); };
  }

  function showPronounceModal(original, spoken) {
    const normalize = s => String(s || "").toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").split(/\s+/).filter(Boolean);
    const o = normalize(original);
    const s = normalize(spoken);

    let spokenHtml = `<p><strong>You said:</strong> `;
    for (let i = 0; i < s.length; i++) {
      const w = s[i];
      const matchAtPos = o[i] === w;
      spokenHtml += matchAtPos ? `<span class="correct-word">${w}</span> ` : `<span class="incorrect-word">${w}</span> `;
    }
    spokenHtml += `</p>`;

    let originalHtml = `<p><strong>Target:</strong> `;
    originalHtml += o.join(" ") + `</p>`;

    modalResult.innerHTML = spokenHtml;
    modalRef.innerHTML = originalHtml;
    modal.style.display = "block";
    modal.setAttribute("aria-hidden", "false");
  }

  function grade() {
    container.querySelectorAll(".option-label").forEach(lbl => {
      lbl.classList.remove("correct", "incorrect", "missed");
    });

    const cards = Array.from(container.querySelectorAll(".question"));
    let correctCount = 0;

    cards.forEach((card) => {
      const q = card._q;
      const inputs = Array.from(card.querySelectorAll("input"));
      const selected = inputs.filter(i => i.checked).map(i => String(i.value).trim());
      const correctAnswers = (Array.isArray(q.correct) ? q.correct.slice() : [q.correct]).map(x => String(x).trim());

      const selNorm = selected.slice().sort();
      const corrNorm = correctAnswers.slice().sort();
      const isCorrect = JSON.stringify(selNorm) === JSON.stringify(corrNorm);
      if (isCorrect) correctCount++;

      inputs.forEach(inp => {
        const label = inp.closest(".option-label");
        const val = String(inp.value).trim();
        const isCorrectOption = corrNorm.includes(val);
        if (isCorrectOption && inp.checked) label.classList.add("correct");
        else if (isCorrectOption && !inp.checked) label.classList.add("missed");
        else if (!isCorrectOption && inp.checked) label.classList.add("incorrect");
      });
    });

    const total = cards.length;
    const incorrectCount = total - correctCount;
    btnInfo.textContent = `Info (${correctCount} correct / ${incorrectCount} incorrect)`;
  }

  function reset() { renderQuestions(); }

  function reviewIncorrect() {
    const w = window.open("", "Review", "width=900,height=700,scrollbars=yes");
    w.document.write(`<html><head><title>Review Incorrect</title>
      <style>body{font-family:Arial,Helvetica,sans-serif;background:#f0f2f5;padding:20px;} .q{background:white;padding:15px;border-radius:8px;margin-bottom:12px;box-shadow:0 2px 6px rgba(0,0,0,0.08);} .title{font-weight:bold;color:#d63031;} .correct{color:#00a86b;font-weight:bold;}</style>
      </head><body><h1>Incorrect Questions</h1></body></html>`);

    const cards = Array.from(container.querySelectorAll(".question"));
    cards.forEach((card, idx) => {
      const q = card._q;
      const inputs = Array.from(card.querySelectorAll("input"));
      const selected = inputs.filter(i => i.checked).map(i => String(i.value).trim());
      const correctAnswers = (Array.isArray(q.correct) ? q.correct : [q.correct]).map(x => String(x).trim());
      const selNorm = selected.slice().sort();
      const corrNorm = correctAnswers.slice().sort();
      const isCorrect = JSON.stringify(selNorm) === JSON.stringify(corrNorm);
      if (!isCorrect) {
        w.document.body.innerHTML += `
          <div class="q">
            <div class="title">Question ${idx+1}: ${q.text}</div>
            <div><strong>Correct answer(s):</strong> <span class="correct">${correctAnswers.join(", ")}</span></div>
            <hr>
          </div>
        `;
      }
    });
  }

  modalClose.onclick = () => { modal.style.display = "none"; modal.setAttribute("aria-hidden","true"); };
  window.onclick = e => { if (e.target === modal) { modal.style.display = "none"; modal.setAttribute("aria-hidden","true"); } };

  btnGrade.onclick = grade;
  btnReset.onclick = reset;
  btnReview.onclick = reviewIncorrect;
  btnInfo.onclick = () => window.open("info.html", "_blank");

  renderQuestions();
});
