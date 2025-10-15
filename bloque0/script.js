const container=document.getElementById("questions-container");

questions.forEach((q,i)=>{
    const div=document.createElement("div");
    div.classList.add("question"); div.dataset.index=i;

    const p=document.createElement("p"); p.textContent=q.text; div.appendChild(p);

    const btnRead=document.createElement("button"); btnRead.textContent="Read"; btnRead.classList.add("btn-read");
    btnRead.onclick=()=>speak(q.text,"en-US"); div.appendChild(btnRead);

    const btnTranslate=document.createElement("button"); btnTranslate.textContent="Translate"; btnTranslate.classList.add("btn-translate");
    btnTranslate.onclick=()=>speak(q.translate,"es-MX"); div.appendChild(btnTranslate);

    const btnPronounce=document.createElement("button"); btnPronounce.textContent="Pronounce"; btnPronounce.classList.add("btn-pronounce");
    btnPronounce.onclick=()=>checkPronounce(q.text); div.appendChild(btnPronounce);

    if(q.type==="multiple"){
        q.options.forEach(opt=>{
            const label=document.createElement("label");
            const checkbox=document.createElement("input"); checkbox.type="checkbox"; checkbox.value=opt;
            label.appendChild(checkbox); label.appendChild(document.createTextNode(opt));
            div.appendChild(label);
        });
    }else{
        const input=document.createElement("input"); input.type="text"; input.id=`write_${i}`; div.appendChild(input);
        const span=document.createElement("span"); span.classList.add("correct-answer"); span.style.marginLeft="10px"; div.appendChild(span);
    }

    container.appendChild(div);
});

function speak(text,lang){ const utter=new SpeechSynthesisUtterance(text); utter.lang=lang; speechSynthesis.speak(utter); }

function checkPronounce(questionText){
    const recognition=new (window.SpeechRecognition||window.webkitSpeechRecognition)();
    recognition.lang='en-US'; recognition.interimResults=false; recognition.maxAlternatives=1;
    recognition.start();
    recognition.onresult=(event)=>{
        const transcript=event.results[0][0].transcript;
        comparePronunciation(questionText,transcript);
    };
    recognition.onerror=(event)=>{ alert('Speech Recognition Error: '+event.error); };
}

function comparePronunciation(original,spoken){
    const normalize=str=>str.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").split(" ");
    const originalWords=normalize(original); const spokenWords=normalize(spoken);
    let html=""; originalWords.forEach((word,i)=>{ html+=spokenWords[i]===word ? `<span class="correct-word">${word}</span> ` : `<span class="incorrect-word">${word}</span> `; });
    const modal=document.getElementById("pronounce-modal"); const result=document.getElementById("pronounce-result");
    result.innerHTML=html; modal.style.display="block";
    modal.querySelector(".close").onclick=()=>{modal.style.display="none";};
    window.onclick=(event)=>{ if(event.target===modal) modal.style.display="none"; };
}

document.getElementById("grade").onclick=()=>{ grade(); };
document.getElementById("reset").onclick=()=>{ reset(); };
document.getElementById("review").onclick=()=>{ reviewIncorrect(); };
document.getElementById("info").onclick=()=>{ window.open("info.html","_blank"); };

function grade(){
    let correct=0, incorrect=0;
    questions.forEach((q,i)=>{
        const div=container.children[i];
        if(q.type==="multiple"){
            div.querySelectorAll("input[type=checkbox]").forEach(inp=>{
                if(q.correct.includes(inp.value)&&inp.checked){ inp.parentElement.classList.add("correct"); correct++; }
                else if(q.correct.includes(inp.value)&&!inp.checked){ inp.parentElement.classList.add("correct"); correct++; }
                else if(!q.correct.includes(inp.value)&&inp.checked){ inp.parentElement.classList.add("incorrect"); incorrect++; }
            });
        }else{
            const inp=div.querySelector("input"); const span=div.querySelector(".correct-answer");
            if(inp.value.trim()===q.correct){ inp.classList.add("correct"); span.textContent=""; correct++; }
            else{ inp.classList.add("incorrect"); span.textContent=q.correct; incorrect++; }
        }
    });
    document.getElementById("info").textContent=`Info (${correct} correct / ${incorrect} incorrect)`;
}

function reset(){
    questions.forEach((q,i)=>{
        const div=container.children[i];
        if(q.type==="multiple"){ div.querySelectorAll("input[type=checkbox]").forEach(inp=>{ inp.checked=false; inp.parentElement.classList.remove("correct","incorrect"); }); }
        else{ const inp=div.querySelector("input"); const span=div.querySelector(".correct-answer"); inp.value=""; inp.classList.remove("correct","incorrect"); span.textContent=""; }
    });
    document.getElementById("info").textContent=`Info (0 correct / 0 incorrect)`;
}

function reviewIncorrect(){
    const w = window.open("", "Review", "width=800,height=600,scrollbars=yes");
    w.document.write(`
        <html>
        <head>
            <title>Review Incorrect</title>
            <style>
                body { font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif; background:#f0f2f5; padding:20px; }
                h1 { text-align:center; color:#0984e3; }
                .question-box { background:white; border-radius:10px; box-shadow:0 2px 6px rgba(0,0,0,0.1); padding:15px 20px; margin-bottom:15px; }
                .question-box p { margin:5px 0; }
                .question-box hr { border:none; border-top:1px solid #dfe6e9; margin:10px 0; }
                .question-text { font-weight:bold; color:#d63031; }
                .correct-answer { color:#00b894; font-weight:bold; }
            </style>
        </head>
        <body>
            <h1>Incorrect Questions</h1>
        </body>
        </html>
    `);

    questions.forEach((q,i)=>{
        const div = container.children[i];
        let wrong = false;
        if(q.type === "multiple"){
            div.querySelectorAll("input[type=checkbox]").forEach(inp=>{
                if(!q.correct.includes(inp.value) && inp.checked){ wrong = true; }
                if(q.correct.includes(inp.value) && !inp.checked){ wrong = true; }
            });
        }else{
            const inp = div.querySelector("input");
            if(inp.value.trim() !== q.correct){ wrong = true; }
        }

        if(wrong){
            w.document.body.innerHTML += `
                <div class="question-box">
                    <p class="question-text">Question: ${q.text}</p>
                    <p class="correct-answer">Correct Answer${q.type==="multiple" ? "s" : ""}: ${q.correct.join ? q.correct.join(", ") : q.correct}</p>
                    <hr>
                </div>
            `;
        }
    });
}


