const questions = [
  {
    text: "What does the command 'trap' do in a Bash script?",
    translate: "¿Qué hace el comando 'trap' en un script Bash?",
    options: [
      "Executes commands when a signal is received",
      "Stops the script immediately",
      "Sets environment variables",
      "Logs script errors"
    ],
    correct: ["Executes commands when a signal is received"]
  },
  {
    text: "What signal number corresponds to SIGTERM?",
    translate: "¿Qué número de señal corresponde a SIGTERM?",
    options: ["15", "9", "2", "1"],
    correct: ["15"]
  },
  {
    text: "What is the purpose of 'set -e' in a Bash script?",
    translate: "¿Cuál es el propósito de 'set -e' en un script Bash?",
    options: [
      "Exit immediately if a command exits with a non-zero status",
      "Print all executed commands",
      "Enable debug mode",
      "Ignore errors"
    ],
    correct: ["Exit immediately if a command exits with a non-zero status"]
  },
  {
    text: "What is 'set -x' used for?",
    translate: "¿Para qué se usa 'set -x'?",
    options: [
      "To print each command before executing it",
      "To stop execution on errors",
      "To ignore variables",
      "To hide errors"
    ],
    correct: ["To print each command before executing it"]
  },
  {
    text: "What command checks if a variable is empty in Bash?",
    translate: "¿Qué comando verifica si una variable está vacía en Bash?",
    options: [
      "if [ -z \"$VAR\" ]",
      "if [ -n \"$VAR\" ]",
      "if [ $VAR -eq 0 ]",
      "if [[ $VAR ]]"
    ],
    correct: ["if [ -z \"$VAR\" ]"]
  },
  {
    text: "What does the '$?' variable represent?",
    translate: "¿Qué representa la variable '$?'?",
    options: [
      "The exit code of the last executed command",
      "The current PID",
      "The number of arguments",
      "The script name"
    ],
    correct: ["The exit code of the last executed command"]
  },
  {
    text: "What is the use of 'source' in Bash?",
    translate: "¿Para qué se utiliza 'source' en Bash?",
    options: [
      "Runs commands from a file in the current shell",
      "Executes a new shell",
      "Prints a file's content",
      "Starts a background job"
    ],
    correct: ["Runs commands from a file in the current shell"]
  },
  {
    text: "What does 'shift' do in a Bash script?",
    translate: "¿Qué hace el comando 'shift' en un script Bash?",
    options: [
      "Shifts positional parameters to the left",
      "Deletes all variables",
      "Restarts the script",
      "Moves to next function"
    ],
    correct: ["Shifts positional parameters to the left"]
  },
  {
    text: "What does 'exec' do in Bash?",
    translate: "¿Qué hace 'exec' en Bash?",
    options: [
      "Replaces the current shell with a new command",
      "Starts a background process",
      "Creates a subshell",
      "Terminates the shell"
    ],
    correct: ["Replaces the current shell with a new command"]
  },
  {
    text: "What does 'export' do?",
    translate: "¿Qué hace el comando 'export'?",
    options: [
      "Makes a variable available to child processes",
      "Deletes a variable",
      "Unsets an alias",
      "Creates a temporary file"
    ],
    correct: ["Makes a variable available to child processes"]
  },
  {
    text: "How can you make a script executable?",
    translate: "¿Cómo puedes hacer un script ejecutable?",
    options: [
      "chmod +x script.sh",
      "bash script.sh",
      "run script.sh",
      "sh script.sh"
    ],
    correct: ["chmod +x script.sh"]
  },
  {
    text: "What does 'readonly' do in Bash?",
    translate: "¿Qué hace 'readonly' en Bash?",
    options: [
      "Marks variables as read-only",
      "Locks files",
      "Prevents user input",
      "Stops script execution"
    ],
    correct: ["Marks variables as read-only"]
  },
  {
    text: "What is the purpose of '#!/bin/bash'?",
    translate: "¿Cuál es el propósito de '#!/bin/bash'?",
    options: [
      "Indicates the interpreter used to run the script",
      "Comments a line",
      "Defines a variable",
      "Runs a command"
    ],
    correct: ["Indicates the interpreter used to run the script"]
  },
  {
    text: "What command prints all environment variables?",
    translate: "¿Qué comando imprime todas las variables de entorno?",
    options: ["printenv", "ls", "echo", "envshow"],
    correct: ["printenv"]
  },
  {
    text: "What does 'sleep 5' do?",
    translate: "¿Qué hace 'sleep 5'?",
    options: [
      "Pauses execution for 5 seconds",
      "Terminates after 5 commands",
      "Repeats 5 times",
      "Prints 5 lines"
    ],
    correct: ["Pauses execution for 5 seconds"]
  }
];
