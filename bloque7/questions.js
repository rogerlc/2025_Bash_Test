const questions = [
  // --- Script Development and Invocation ---
  {
    text: "What is a script in the simplest case?",
    translate: "¿Qué es un script en el caso más simple?",
    type: "single",
    options: ["A list of system commands stored in a file","A compiled program","A library","A GUI tool"],
    correct: "A list of system commands stored in a file"
  },
  {
    text: "What does the sha-bang (#!) indicate in a script?",
    translate: "¿Qué indica el sha-bang (#!) en un script?",
    type: "single",
    options: ["The interpreter to execute the script","The script file name","The shell prompt","The exit code"],
    correct: "The interpreter to execute the script"
  },
  {
    text: "Which of the following is a valid sha-bang?",
    translate: "¿Cuál de los siguientes es un sha-bang válido?",
    type: "multiple",
    options: ["#!/bin/sh","#!/bin/bash","#!/usr/bin/python","#!/invalid/path"],
    correct: ["#!/bin/sh","#!/bin/bash","#!/usr/bin/python"]
  },
  {
    text: "How can you execute a script?",
    translate: "¿Cómo se puede ejecutar un script?",
    type: "multiple",
    options: ["sh scriptname","bash scriptname","./scriptname","double-click on script in all shells"],
    correct: ["sh scriptname","bash scriptname","./scriptname"]
  },
  {
    text: "What command makes a script directly executable?",
    translate: "¿Qué comando hace que un script sea directamente ejecutable?",
    type: "single",
    options: ["chmod","set","export","source"],
    correct: "chmod"
  },

  // --- Bash Options ---
  {
    text: "What is the purpose of Bash options?",
    translate: "¿Cuál es el propósito de las opciones de Bash?",
    type: "single",
    options: ["Change shell or script behavior","Store variables","Display files","Install packages"],
    correct: "Change shell or script behavior"
  },
  {
    text: "How do you enable an option inside a script?",
    translate: "¿Cómo habilitas una opción dentro de un script?",
    type: "multiple",
    options: ["set -o option-name","set -option-abbrev","export option","source option"],
    correct: ["set -o option-name","set -option-abbrev"]
  },
  {
    text: "How do you disable a Bash option inside a script?",
    translate: "¿Cómo deshabilitas una opción de Bash dentro de un script?",
    type: "multiple",
    options: ["set +o option-name","set +option-abbrev","unset option","kill option"],
    correct: ["set +o option-name","set +option-abbrev"]
  },
  {
    text: "What does 'set -e' do in a script?",
    translate: "¿Qué hace 'set -e' en un script?",
    type: "single",
    options: ["Exit immediately if a command fails","Enable verbose mode","Skip errors","Enable debugging"],
    correct: "Exit immediately if a command fails"
  },
  {
    text: "What is the default behavior without 'set -e'?",
    translate: "¿Cuál es el comportamiento por defecto sin 'set -e'?",
    type: "single",
    options: ["Continue even if commands fail","Exit on first error","Prompt user for error","Log errors only"],
    correct: "Continue even if commands fail"
  },

  // --- Exit Codes ---
  {
    text: "What does exit code 1 represent?",
    translate: "¿Qué representa el código de salida 1?",
    type: "single",
    options: ["Catchall for general errors","Misuse of shell builtins","Command cannot execute","Exit status out of range"],
    correct: "Catchall for general errors"
  },
  {
    text: "Example of exit code 1?",
    translate: "Ejemplo de código de salida 1?",
    type: "single",
    options: ['let "var1 = 1/0"','empty_function() {}','/dev/null','exit -1'],
    correct: 'let "var1 = 1/0"'
  },
  {
    text: "What does exit code 2 mean?",
    translate: "¿Qué significa el código de salida 2?",
    type: "single",
    options: ["Misuse of shell builtins","Catchall for general errors","Invalid argument to exit","Script terminated by Ctrl-C"],
    correct: "Misuse of shell builtins"
  },
  {
    text: "Example of exit code 2?",
    translate: "Ejemplo de código de salida 2?",
    type: "single",
    options: ["empty_function() {}","let 'var1 = 1/0'","Illegal_command","kill -9 $PPID"],
    correct: "empty_function() {}"
  },
  {
    text: "Exit code 126 indicates?",
    translate: "¿Qué indica el código de salida 126?",
    type: "single",
    options: ["Command cannot execute","Command not found","Invalid argument to exit","Exit status out of range"],
    correct: "Command cannot execute"
  },
  {
    text: "Exit code 127 is returned when?",
    translate: "¿Cuándo se devuelve el código de salida 127?",
    type: "single",
    options: ["Command not found","Fatal error signal","General error","Script terminated by Ctrl-C"],
    correct: "Command not found"
  },
  {
    text: "Exit code 128 occurs for?",
    translate: "¿Cuándo ocurre el código de salida 128?",
    type: "single",
    options: ["Invalid argument to exit","Command cannot execute","Misuse of shell builtins","Catchall for general errors"],
    correct: "Invalid argument to exit"
  },
  {
    text: "Example of exit code 128+n?",
    translate: "Ejemplo de código de salida 128+n?",
    type: "single",
    options: ["kill -9 $PPID of script","empty_function() {}","exit 3.14159","exit -1"],
    correct: "kill -9 $PPID of script"
  },
  {
    text: "Exit code 130 indicates?",
    translate: "¿Qué indica el código de salida 130?",
    type: "single",
    options: ["Script terminated by Control-C","Command not found","General error","Invalid argument to exit"],
    correct: "Script terminated by Control-C"
  },
  {
    text: "Exit code 255 meaning?",
    translate: "¿Qué significa el código de salida 255?",
    type: "single",
    options: ["Exit status out of range","Catchall for general errors","Misuse of shell builtins","Fatal error signal"],
    correct: "Exit status out of range"
  }
];
