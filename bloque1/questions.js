const questions = [
    { type: "multiple", text: "What does the UNIX shell program do?", translate: "¿Qué hace el programa de shell de UNIX?", options: ["Interprets user commands", "Compiles user commands", "Formats files"], correct: ["Interprets user commands"] },
    { type: "multiple", text: "Shell scripts are:", translate: "Los scripts de shell son:", options: ["Interpreted", "Compiled", "Encrypted"], correct: ["Interpreted"] },
    { type: "multiple", text: "The shell reads commands from:", translate: "El shell lee comandos de:", options: ["User input", "Script files", "Kernel only"], correct: ["User input","Script files"] },
    { type: "multiple", text: "A compiler converts a program into:", translate: "Un compilador convierte un programa en:", options: ["Machine readable form", "Shell script", "Text file"], correct: ["Machine readable form"] },
    { type: "multiple", text: "Main task of shell:", translate: "La tarea principal del shell:", options: ["Providing user environment", "Compiling code", "Running only scripts"], correct: ["Providing user environment"] },

    // 🔽 aquí van las 3 que eran "write", ahora como "multiple"
    { 
        type: "multiple", 
        text: "Write the command to see known shells:", 
        translate: "Escribe el comando para ver los shells conocidos:", 
        options: ["cat /etc/shells", "ps --pid $$", "/bin/bash", "ls -l"], 
        correct: ["cat /etc/shells"] 
    },
    { 
        type: "multiple", 
        text: "Write the command to switch to bash:", 
        translate: "Escribe el comando para cambiar a bash:", 
        options: ["/bin/bash", "cat /etc/shells", "ps --pid $$", "sh"], 
        correct: ["/bin/bash"] 
    },
    { 
        type: "multiple", 
        text: "Write the command to check current shell process:", 
        translate: "Escribe el comando para verificar el proceso del shell actual:", 
        options: ["ps --pid $$", "cat /etc/shells", "/bin/bash", "whoami"], 
        correct: ["ps --pid $$"] 
    },

    { type: "multiple", text: "The file /etc/shells shows:", translate: "El archivo /etc/shells muestra:", options: ["Valid login shells", "User home directories", "Executable files"], correct: ["Valid login shells"] },
    { type: "multiple", text: "To switch from one shell to another:", translate: "Para cambiar de un shell a otro:", options: ["Enter the new shell name in terminal", "Restart computer", "Use 'compile' command"], correct: ["Enter the new shell name in terminal"] }
];
