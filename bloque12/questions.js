/* 12 preguntas - mezcladas (2 Environment, 4 Comments, 6 Formatting) */
const questions = [
  // Environment (2)
  {
    id: "env1",
    text: "Where should error messages be sent to separate them from normal program output?",
    translate: "¿A dónde deben enviarse los mensajes de error para separarlos de la salida normal del programa?",
    type: "single",
    options: ["STDOUT (1)", "STDERR (2)", "A file", "A socket"],
    correct: ["STDERR (2)"]
  },
  {
    id: "env2",
    text: "In the example err() function, where is the message redirected?",
    translate: "En la función de ejemplo err(), ¿a dónde se redirige el mensaje?",
    type: "text",
    correct: "stderr"
  },

  // Comments (4)
  {
    id: "com1",
    text: "What should every file start with to describe its contents?",
    translate: "¿Con qué debe empezar cada archivo para describir su contenido?",
    type: "single",
    options: ["A license header", "A file header comment", "A binary marker", "Nothing"],
    correct: ["A file header comment"]
  },
  {
    id: "com2",
    text: "Which comments should describe function arguments, outputs and globals?",
    translate: "¿Qué comentarios deben describir argumentos, salidas y globales de una función?",
    type: "single",
    options: ["Implementation comments", "Function comments", "TODO comments", "Inline comments only"],
    correct: ["Function comments"]
  },
  {
    id: "com3",
    text: "When is a TODO comment appropriate?",
    translate: "¿Cuándo es apropiado un comentario TODO?",
    type: "multiple",
    options: [
      "For temporary or short-term solutions",
      "To document permanent and final code",
      "To include a contact (name/email) for context",
      "To hide broken code"
    ],
    correct: ["For temporary or short-term solutions","To include a contact (name/email) for context"]
  },
  {
    id: "com4",
    text: "True or False: All functions in a library must be commented regardless of length.",
    translate: "Verdadero o Falso: Todas las funciones en una librería deben comentarse sin importar su longitud.",
    type: "single",
    options: ["True","False"],
    correct: ["True"]
  },

  // Formatting (6)
  {
    id: "fmt1",
    text: "What indentation is recommended for shell scripts?",
    translate: "¿Qué indentación se recomienda para scripts de shell?",
    type: "single",
    options: ["Tabs", "2 spaces", "4 spaces", "No indentation"],
    correct: ["2 spaces"]
  },
  {
    id: "fmt2",
    text: "What is the recommended maximum line length?",
    translate: "¿Cuál es la longitud máxima de línea recomendada?",
    type: "single",
    options: ["72 characters", "80 characters", "100 characters", "No limit"],
    correct: ["80 characters"]
  },
  {
    id: "fmt3",
    text: "How should pipelines be formatted if they do not fit on one line?",
    translate: "¿Cómo deben formatearse las canalizaciones si no caben en una línea?",
    type: "multiple",
    options: [
      "Keep them on one extremely long line",
      "Split one pipe segment per line with the pipe at the start of the next line",
      "Use a backslash and indent the continued segments by 2 spaces",
      "Remove pipes and use semicolons instead"
    ],
    correct: ["Split one pipe segment per line with the pipe at the start of the next line","Use a backslash and indent the continued segments by 2 spaces"]
  },
  {
    id: "fmt4",
    text: "Where should '; do' and '; then' appear?",
    translate: "¿Dónde deben aparecer '; do' y '; then'?",
    type: "single",
    options: ["On a new line", "On the same line as for/while/if", "After the closing fi/done", "They are optional"],
    correct: ["On the same line as for/while/if"]
  },
  {
    id: "fmt5",
    text: "Which form of variable expansion is preferred to avoid confusion?",
    translate: "¿Qué forma de expansión de variables se prefiere para evitar confusión?",
    type: "single",
    options: ["$var", "${var}", "${1}", "$*"],
    correct: ["${var}"]
  },
  {
    id: "fmt6",
    text: "When passing arguments along, which is almost always correct?",
    translate: "Al pasar argumentos, ¿qué es casi siempre correcto?",
    type: "single",
    options: ['"$@"', '$*', '"$*"', '$@'],
    correct: ['"$@"']
  }
];
