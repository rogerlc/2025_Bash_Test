const questions = [
  {
    text: "Which file gives an overview of known shells on a Linux system?",
    translate: "¿Qué archivo ofrece una visión general de los shells conocidos en un sistema Linux?",
    options: ["/etc/shells", "/etc/passwords", "/etc/known_shells", "/etc/shells.sh"],
    correct: ["/etc/shells"]
  },
  {
    text: "How to switch from one shell to another in the active terminal?",
    translate: "¿Cómo cambiar de un shell a otro en el terminal activo?",
    options: [
      "Enter the name of the new shell",
      "Update the name of the active shell in '/etc/shells' file",
      "Update the name of the active shell in '~/.bashrc' file",
      "It can't be done in the active terminal because OS must be restarted"
    ],
    correct: ["Enter the name of the new shell"]
  },
  {
    text: "Select all user-specific startup files:",
    translate: "Selecciona todos los archivos de inicio específicos del usuario:",
    options: ["/etc/profile", "/etc/.profile", "~/.profile", "~/.bashrc"],
    correct: ["~/.profile", "~/.bashrc"]
  },
  {
    text: "Shell should not be used for (select all correct):",
    translate: "El shell NO debe usarse para (selecciona todas las correctas):",
    options: [
      "Need data structures, such as linked lists or trees",
      "Complex applications, where structured programming is a necessity (type-checking of variables, function prototypes, etc.)",
      "If you’re mostly calling other utilities and are doing relatively little data manipulation",
      "Mission-critical applications upon which you are betting the future of the company"
    ],
    correct: [
      "Need data structures, such as linked lists or trees",
      "Complex applications, where structured programming is a necessity (type-checking of variables, function prototypes, etc.)",
      "Mission-critical applications upon which you are betting the future of the company"
    ]
  },
  {
    text: "Shell can be used for (select all correct):",
    translate: "El shell PUEDE usarse para (selecciona las correctas):",
    options: [
      "Need data structures, such as linked lists or trees",
      "Complex applications, where structured programming is a necessity (type-checking of variables, function prototypes, etc.)",
      "If you’re mostly calling other utilities and are doing relatively little data manipulation",
      "Mission-critical applications upon which you are betting the future of the company"
    ],
    correct: ["If you’re mostly calling other utilities and are doing relatively little data manipulation"]
  },
  {
    text: "Shell should only be used for small utilities or simple wrapper scripts.",
    translate: "El shell debe usarse solo para utilidades pequeñas o scripts simples de envoltura.",
    options: ["True", "False"],
    correct: ["True"]
  },
  {
    text: "If performance matters, what should you use instead of shell?",
    translate: "Si el rendimiento importa, ¿qué debes usar en vez de shell?",
    options: ["A structured programming language", "Another shell", "Bash only", "Python script"],
    correct: ["A structured programming language"]
  },
  {
    text: "When should you rewrite a shell script in a more structured language?",
    translate: "¿Cuándo deberías reescribir un script de shell en un lenguaje más estructurado?",
    options: [
      "When it exceeds 100 lines or has complex control flow",
      "When it has more than 10 lines",
      "When it uses echo commands",
      "Only when bash crashes"
    ],
    correct: ["When it exceeds 100 lines or has complex control flow"]
  },
  {
    text: "Which tasks are resource-intensive and not suited for shell?",
    translate: "¿Qué tareas son intensivas en recursos y no son adecuadas para shell?",
    options: ["Sorting and recursion", "Listing directories", "Printing to console", "Simple math operations"],
    correct: ["Sorting and recursion"]
  },
  {
    text: "What kind of applications should shell scripting avoid?",
    translate: "¿Qué tipo de aplicaciones debería evitar el shell scripting?",
    options: ["Mission-critical applications", "Simple utilities", "Temporary automation scripts", "Quick data conversions"],
    correct: ["Mission-critical applications"]
  },
  {
    text: "Why is shell scripting not suitable for proprietary applications?",
    translate: "¿Por qué el shell scripting no es adecuado para aplicaciones propietarias?",
    options: [
      "Because shell scripts expose their source code openly",
      "Because shell is too fast",
      "Because it can’t read text files",
      "Because it doesn’t work on Linux"
    ],
    correct: ["Because shell scripts expose their source code openly"]
  },
  {
    text: "What is a key guideline for using shell scripts?",
    translate: "¿Cuál es una pauta clave al usar scripts de shell?",
    options: ["Keep them short and simple", "Always include complex logic", "Use them for heavy computation", "Avoid comments"],
    correct: ["Keep them short and simple"]
  }
];
