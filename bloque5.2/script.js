// script.js - versión corregida: grade siempre vuelve a funcionar y las respuestas se muestran en verde/rojo
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("questions-container");
  const btnGrade = document.getElementById("grade");
  const btnReset = document.getElementById("reset");
  const btnReview = document.getElementById("review");
  const btnInfo = document.getElementById("info");

  // --- helper: Fisher-Yates shuffle (estable y bueno) ---
  function shuffle(array) {
    const a = array.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  // Estado actual de preguntas mostradas (referencias a objetos)
  let shownQuestions = [];

  // Renderiza las preguntas (se usa en carga inicial y en reset)
  function renderQuestions() {
    container.innerHTML = "";
    shownQuestions = shuffle(questions).map(q => {
      // clona objeto para evitar mutar el original si se desea
      return Object.assign({}, q, { options: shuffle(q.options) });
    });

    shownQuestions.forEach((q, idx) => {
      const div = document.createElement("div");
      div.className = "question";

      // Título numerado
      const p = document.createElement("p");
      p.textContent = `${idx + 1}. ${q.text}`;
      div.appendChild(p);

      // Botones Read / Translate / Pronounce
      const btnRead = document.createElement("button");
      btnRead.type = "button";
      btnRead.className = "btn-read";
      btnRead.textContent = "Read";
      btnRead.onclick = () => speakText(q.text, "en-US");
      div.appendChild(btnRead);

      const btnTranslate = document.createElement("button");
      btnTranslate.type = "button";
      btnTranslate.className = "btn-translate";
      btnTranslate.textContent = "Translate";
      btnTranslate.onclick = () => speakText(q.translate || q.text, "es-MX");
      div.appendChild(btnTranslate);

      const btnPronounce = document.createElement("button");
      btnPronounce.type = "button";
      btnPronounce.className = "btn-pronounce";
      btnPronounce.textContent = "Pronounce";
      btnPronounce.onclick = () => checkPronounce(q.text);
      div.appendChild(btnPronounce);

      // Opciones: si q.correct.length > 1 -> checkbox (multi), si no -> radio (single)
      const multi = Array.isArray(q.correct) && q.correct.length > 1;
      const inputType = multi ? "checkbox" : "radio";

      q.options.forEach(opt => {
        const label = document.createElement("label");
        label.className = "option-label";
        // mejora visual: span para el texto
        const input = document.createElement("input");
        input.type = inputType;
        input.name = `q_${idx}`;
        input.value = opt;
        // accesible
        input.setAttribute("aria-label", opt);

        const span = document.createElement("span");
        span.className = "option-text";
        span.textContent = opt;

        label.appendChild(input);
        label.appendChild(span);
        div.appendChild(label);
      });

      // guardamos referencia al objeto de la pregunta en el div (para calificar luego)
      div._q = q;
      container.appendChild(div);
    });

    // resetear contador de info en la interfaz (al renderizar)
    btnInfo.textContent = `Info (0 correct / 0 incorrect)`;
  }

  // habla texto (idioma opcional)
  function speakText(text, lang) {
    try {
      const u = new SpeechSynthesisUtterance(text);
      u.lang = lang || "en-US";
      speechSynthesis.speak(u);
    } catch (e) {
      console.warn("SpeechSynthesis no soportado:", e);
    }
  }

  // Pronunciation check (usa Web Speech API si está disponible)
  function checkPronounce(originalText) {
    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Recognition) {
      alert("Speech Recognition not supported in this browser.");
      return;
    }
    const recognition = new Recognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.start();
    recognition.onresult = (ev) => {
      const spoken = ev.results[0][0].transcript;
      comparePronunciation(originalText, spoken);
    };
    recognition.onerror = (ev) => {
      alert("Speech Recognition Error: " + (ev.error || "unknown"));
    };
  }

  function comparePronunciation(original, spoken) {
    const normalize = s => s.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").split(/\s+/);
    const oWords = normalize(original);
    const sWords = normalize(spoken || "");
    let html = "";
    oWords.forEach((w, i) => {
      if (sWords[i] === w) html += `<span class="correct-word">${w}</span> `;
      else html += `<span class="incorrect-word">${w}</span> `;
    });
    const modal = document.getElementById("pronounce-modal");
    const result = document.getElementById("pronounce-result");
    result.innerHTML = html;
    modal.style.display = "block";
    modal.querySelector(".close").onclick = () => modal.style.display = "none";
    window.onclick = e => { if (e.target === modal) modal.style.display = "none"; };
  }

  // --- GRADE: esta función puede llamarse múltiples veces ---
  function grade() {
    let correctCount = 0;

    // Limpiamos estilos previos
    container.querySelectorAll(".option-label").forEach(lbl => {
      lbl.classList.remove("correct", "incorrect", "missed");
    });

    // Recorremos preguntas mostradas (en el orden actual en pantalla)
    const divs = container.querySelectorAll(".question");
    divs.forEach((div, idx) => {
      const q = div._q;
      const inputs = Array.from(div.querySelectorAll("input"));
      const selected = inputs.filter(i => i.checked).map(i => i.value);

      // normalizamos arrays para comparar (sets)
      const correctAnswers = Array.isArray(q.correct) ? q.correct.slice() : [q.correct];
      // trim both sides to be safe
      const normalizeArr = arr => arr.map(x => String(x).trim());
      const selNorm = normalizeArr(selected).sort();
      const corrNorm = normalizeArr(correctAnswers).sort();

      const isQuestionCorrect = JSON.stringify(selNorm) === JSON.stringify(corrNorm);
      if (isQuestionCorrect) correctCount++;

      // Marcar visualmente:
      inputs.forEach(inp => {
        const label = inp.closest("label");
        const val = inp.value;
        const isCorrectOption = correctAnswers.map(x => String(x)).includes(String(val));
        if (isCorrectOption && inp.checked) {
          // opción correcta y seleccionada -> verde
          label.classList.add("correct");
        } else if (isCorrectOption && !inp.checked) {
          // opción correcta pero no seleccionada -> marcar como "missed" (amarillo claro)
          label.classList.add("missed");
        } else if (!isCorrectOption && inp.checked) {
          // opción incorrecta y seleccionada -> rojo
          label.classList.add("incorrect");
        }
        // opciones incorrectas no seleccionadas se dejan sin clase
      });
    });

    const total = container.querySelectorAll(".question").length;
    const incorrectCount = total - correctCount;
    btnInfo.textContent = `Info (${correctCount} correct / ${incorrectCount} incorrect)`;
  }

  // Reset: vuelve a renderizar con orden aleatorio
  function reset() {
    renderQuestions();
  }

  // Review incorrect: abre ventana con preguntas falladas y sus respuestas correctas
  function reviewIncorrect() {
    const w = window.open("", "Review", "width=800,height=600,scrollbars=yes");
    w.document.write(`
      <html><head><title>Review Incorrect</title>
      <style>
        body{font-family:Arial,Helvetica,sans-serif;background:#f0f2f5;padding:20px;}
        .q{background:white;padding:12px;border-radius:8px;margin-bottom:12px;box-shadow:0 2px 6px rgba(0,0,0,0.08);}
        .q h4{margin:0 0 8px 0;color:#d63031;}
        .correct{color:#00a86b;font-weight:bold;}
      </style>
      </head><body><h1>Incorrect Questions</h1></body></html>
    `);

    const divs = container.querySelectorAll(".question");
    divs.forEach((div, idx) => {
      const q = div._q;
      const inputs = Array.from(div.querySelectorAll("input"));
      const selected = inputs.filter(i => i.checked).map(i => i.value);
      const correctAnswers = Array.isArray(q.correct) ? q.correct : [q.correct];
      const normalizeArr = arr => arr.map(x => String(x).trim()).sort();
      const selNorm = normalizeArr(selected);
      const corrNorm = normalizeArr(correctAnswers);
      const isQuestionCorrect = JSON.stringify(selNorm) === JSON.stringify(corrNorm);
      if (!isQuestionCorrect) {
        w.document.body.innerHTML += `
          <div class="q">
            <h4>Question ${idx+1}: ${q.text}</h4>
            <p>Correct answer(s): <span class="correct">${correctAnswers.join(", ")}</span></p>
          </div>
        `;
      }
    });
  }

  // wire buttons
  btnGrade.onclick = grade;
  btnReset.onclick = reset;
  btnReview.onclick = reviewIncorrect;
  btnInfo.onclick = () => window.open("info.html", "_blank");

  // inicializar
  renderQuestions();
});
