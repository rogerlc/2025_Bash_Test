const questions = [
    { 
        type: "multiple", 
        text: "What are startup files in Bash?", 
        translate: "¿Qué son los archivos de inicio en Bash?", 
        options: [
            "Scripts read and executed when Bash starts", 
            "Configuration files for the kernel", 
            "Temporary files created by users", 
            "Programs that run only once during boot"
        ], 
        correct: ["Scripts read and executed when Bash starts"] 
    },
    { 
        type: "multiple", 
        text: "Which files are read by an interactive login shell?", 
        translate: "¿Qué archivos son leídos por un shell interactivo de inicio de sesión?", 
        options: [
            "/etc/profile and ~/.bash_profile", 
            "~/.bashrc", 
            "/etc/hosts", 
            "/var/log/syslog"
        ], 
        correct: ["/etc/profile and ~/.bash_profile"] 
    },
    { 
        type: "multiple", 
        text: "Which file is executed upon logout in a login shell?", 
        translate: "¿Qué archivo se ejecuta al cerrar sesión en un shell de inicio de sesión?", 
        options: [
            "~/.bashrc", 
            "~/.bash_logout", 
            "~/.profile", 
            "/etc/passwd"
        ], 
        correct: ["~/.bash_logout"] 
    },
    { 
        type: "multiple", 
        text: "Which file is read by an interactive non-login shell?", 
        translate: "¿Qué archivo es leído por un shell interactivo sin inicio de sesión?", 
        options: [
            "~/.bashrc", 
            "/etc/profile", 
            "~/.bash_logout", 
            "~/.bash_login"
        ], 
        correct: ["~/.bashrc"] 
    },
    { 
        type: "multiple", 
        text: "What does 'interactive' mean in the context of shells?", 
        translate: "¿Qué significa 'interactivo' en el contexto de los shells?", 
        options: [
            "You can enter commands directly", 
            "The shell only runs scripts", 
            "It executes during system boot", 
            "It requires authentication"
        ], 
        correct: ["You can enter commands directly"] 
    }
];
