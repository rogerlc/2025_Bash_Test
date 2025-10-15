const questions = [
    { 
        type: "multiple", 
        text: "Which file does give an overview of known shells on a Linux system?", 
        translate: "¿Qué archivo da un resumen de los shells conocidos en un sistema Linux?", 
        options: [
            "/etc/shells", 
            "/etc/passwords", 
            "/etc/known_shells", 
            "/etc/shells.sh"
        ], 
        correct: ["/etc/shells"] 
    },
    { 
        type: "multiple", 
        text: "How to switch from one shell to another in the active terminal?", 
        translate: "¿Cómo cambiar de un shell a otro en el terminal activo?", 
        options: [
            "Enter the name of the new shell", 
            "Update the name of the active shell in \"/etc/shells\" file", 
            "Update the name of the active shell in \"~/.bashrc\" file", 
            "It can't be done in the active terminal because OS must be restarted"
        ], 
        correct: ["Enter the name of the new shell"] 
    },
    { 
        type: "multiple", 
        text: "Select all of user-specific startup files:", 
        translate: "Selecciona todos los archivos de inicio específicos del usuario:", 
        options: [
            "/etc/profile", 
            "/etc/.profile", 
            "~/.profile", 
            "~/.bashrc"
        ], 
        correct: ["~/.profile","~/.bashrc"] 
    },
    { 
        type: "multiple", 
        text: "Shell should not be used for (Select all correct options):", 
        translate: "El shell NO debe usarse para (selecciona todas las opciones correctas):", 
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
        type: "multiple", 
        text: "Shell can be used for (Select all correct options):", 
        translate: "El shell puede usarse para (selecciona todas las opciones correctas):", 
        options: [
            "Need data structures, such as linked lists or trees", 
            "Complex applications, where structured programming is a necessity (type-checking of variables, function prototypes, etc.)", 
            "If you’re mostly calling other utilities and are doing relatively little data manipulation", 
            "Mission-critical applications upon which you are betting the future of the company"
        ], 
        correct: [
            "If you’re mostly calling other utilities and are doing relatively little data manipulation"
        ] 
    }
];
