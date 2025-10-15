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
    text: "Shell scripts are interpreted, not compiled.",
    translate: "Los scripts de shell son interpretados, no compilados.",
    options: ["True", "False"],
    correct: ["True"]
  },
  {
    text: "The shell program interprets user commands line by line.",
    translate: "El programa shell interpreta comandos del usuario línea por línea.",
    options: ["True", "False"],
    correct: ["True"]
  }
];
