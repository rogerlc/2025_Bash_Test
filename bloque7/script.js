const container = document.getElementById("questions-container");

function shuffle(array) {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}

function renderQuestions() {
  container.innerHTML = "";
  questions.forEach((q, i) => {
    const div = document.createElement("div");
    div.classList.add("question");

    const p = document.createElement("p"); p.textContent = `${i+1}. ${q.text}`; div.appendChild(p);

    const btnRead = document.createElement("button");
    btnRead.textContent = "Read"; btnRead.classList.add("btn-read");
    btnRead.onclick = () => speakText(q.text,"en-US"); div.appendChild(btnRead);

    const btnTranslate = document.createElement("button");
    btnTranslate.textContent = "Translate"; btnTranslate.classList.add("btn-translate");
    btnTranslate.onclick = () => speakText(q.translate,"es-MX"); div.appendChild(btnTranslate);

    const btnPronounce = document.createElement("button");
    btnPronounce.textContent = "Pronounce"; btnPronounce.classList.add("btn-pronounce");
    btnPronounce.onclick = () => checkPronounce(q.text); div.appendChild(btnPronounce);

    const options = shuffle([...q.options]);
    options.forEach(opt => {
      const label = document.createElement("label");
      const checkbox = document.createElement("input"); checkbox.type="checkbox"; checkbox.value = opt;
      label.appendChild(checkbox); label.appendChild(document.createTextNode(opt));
      div.appendChild(label);
    });

    container.appendChild(div);
  });
}

function speakText(text, lang){
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = lang;
  speechSynthesis.speak(utter);
}

function checkPronounce(questionText){
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = 'en-US'; recognition.interimResults=false; recognition.maxAlternatives=1;
  recognition.start();
  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    comparePronunciation(questionText, transcript);
  };
  recognition.onerror = (event)=>{ alert('Speech Recognition Error: '+event.error); };
}

function comparePronunciation(original, spoken){
  const normalize = str => str.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").split(" ");
  const originalWords = normalize(original);
  const spokenWords = normalize(spoken);
  let html="";
  originalWords.forEach((word,i)=>{
    html += spokenWords[i]===word ? `<span class="correct-word">${word}</span> ` : `<span class="incorrect-word">${word}</span> `;
  });
  const modal = document.getElementById("pronounce-modal");
  const result = document.getElementById("pronounce-result");
  result.innerHTML = html;
  modal.style.display="block";
  modal.querySelector(".close").onclick = () => { modal.style.display="none"; };
  window.onclick = (event)=>{ if(event.target===modal) modal.style.display="none"; };
}

document.getElementById("grade").onclick = () => {
  let correctCount=0, incorrectCount=0;
  questions.forEach((q,i)=>{
    const div = container.children[i];
    const checked = Array.from(div.querySelectorAll("input[type=checkbox]")).filter(inp=>inp.checked).map(inp=>inp.value);
    div.querySelectorAll("label").forEach(label => label.classList.remove("correct","incorrect"));
    div.querySelectorAll("input[type=checkbox]").forEach(inp=>{
      if(q.correct.includes(inp.value) && inp.checked) inp.parentElement.classList.add("correct");
      else if(!q.correct.includes(inp.value) && inp.checked) inp.parentElement.classList.add("incorrect");
    });
    if(JSON.stringify(checked.sort())===JSON.stringify(q.correct.sort())) correctCount++;
    else incorrectCount++;
  });
  document.getElementById("info").textContent=`Info: ${correctCount} correct / ${incorrectCount} incorrect`;
};

document.getElementById("reset").onclick = () => { renderQuestions(); document.getElementById("info").textContent=`Info: 0 correct / 0 incorrect`; };

document.getElementById("review").onclick = () => {
  const w = window.open("", "Review", "width=800,height=600,scrollbars=yes");
  questions.forEach((q,i)=>{
    const div = container.children[i];
    const checked = Array.from(div.querySelectorAll("input[type=checkbox]")).filter(inp=>inp.checked).map(inp=>inp.value);
    if(JSON.stringify(checked.sort())!==JSON.stringify(q.correct.sort())){
      w.document.write(`<p>${q.text}<br>Correct: ${q.correct.join(", ")}</p><hr>`);
    }
  });
};

const info_en = `In the simplest case, a script is nothing more than a list of system commands stored in a file. The sha-bang (#!) at the head indicates the interpreter. Scripts can be executed by sh scriptname, bash scriptname, or chmod +x ./scriptname. Bash options can be set with set -o or set -option. Exit codes indicate errors such as 1=general error, 2=misuse of shell builtins, 126=command cannot execute, 127=command not found, 128=invalid argument, 130=terminated by Ctrl-C.`;
const info_es = `En el caso más simple, un script no es más que una lista de comandos del sistema almacenados en un archivo. El sha-bang (#!) indica el intérprete. Los scripts pueden ejecutarse con sh scriptname, bash scriptname, o chmod +x ./scriptname. Las opciones de Bash se establecen con set -o o set -option. Los códigos de salida indican errores: 1=error general, 2=uso incorrecto de builtins, 126=comando no ejecutable, 127=comando no encontrado, 128=argumento inválido, 130=terminado por Ctrl-C.`;

document.getElementById("info").onclick = () => {
  const w = window.open("", "_blank", "width=1000,height=600,scrollbars=yes");
  w.document.write(`
    <html><head>
    <title>Info</title>
    <style>
      body { font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif; margin:0; padding:10px; }
      pre { white-space: pre-wrap; word-wrap: break-word; }
      button { margin:5px; padding:5px 10px; cursor:pointer; }
    </style></head>
    <body>
      <div style="display:flex; gap:20px;">
        <div style="flex:1; border:1px solid #ccc; padding:10px; border-radius:5px;">
          <h2>English</h2>
          <button onclick="speechSynthesis.speak(new SpeechSynthesisUtterance('${info_en.replace(/'/g,"\\'")}'))">Read</button>
          <button onclick="speechSynthesis.speak(new SpeechSynthesisUtterance('${info_es.replace(/'/g,"\\'")}'))">Translate</button>
          <pre>${info_en}</pre>
        </div>
        <div style="flex:1; border:1px solid #ccc; padding:10px; border-radius:5px;">
          <h2>Español</h2>
          <button onclick="speechSynthesis.speak(new SpeechSynthesisUtterance('${info_es.replace(/'/g,"\\'")}'))">Read</button>
          <button onclick="speechSynthesis.speak(new SpeechSynthesisUtterance('${info_en.replace(/'/g,"\\'")}'))">Translate</button>
          <pre>${info_es}</pre>
        </div>
      </div>
    </body></html>
  `);
};

renderQuestions();
