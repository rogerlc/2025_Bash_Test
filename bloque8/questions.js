const questions = [
  // ---- Special Characters (varias preguntas) ----
  {
    text: "What makes a character a 'special character' in Bash?",
    translate: "¿Qué hace que un carácter sea 'especial' en Bash?",
    type: "multiple",
    options: [
      "It has a meaning beyond its literal value",
      "It is not allowed in filenames",
      "It is a digit",
      "It must be escaped with quotes always"
    ],
    correct: ["It has a meaning beyond its literal value"]
  },
  {
    text: "Which character begins a comment in a shell script?",
    translate: "¿Qué carácter inicia un comentario en un script?",
    type: "multiple",
    options: ["#", ";", "$", "\\"],
    correct: ["#"]
  },
  {
    text: "Which character is commonly used as a command separator?",
    translate: "¿Qué carácter suele usarse como separador de comandos?",
    type: "multiple",
    options: [".", ";", "`", ","],
    correct: [";"]
  },
  {
    text: "Which 'special character' denotes the dollar variable prefix?",
    translate: "¿Qué carácter especial denota el prefijo de una variable (dólar)?",
    type: "multiple",
    options: ["$", "#", "@", "%"],
    correct: ["$"]
  },
  {
    text: "Which is used to escape characters (backslash)?",
    translate: "¿Cuál se usa para escapar caracteres (barra invertida)?",
    type: "multiple",
    options: ["\\", "`", "/", "|"],
    correct: ["\\"]
  },
  {
    text: "Which of these is a 'dot' command usage?",
    translate: "¿Cuál de estos corresponde al uso del comando 'dot' (punto)?",
    type: "multiple",
    options: ["./file", ". file", "source file", "/.file"],
    correct: ["./file"]
  },
  {
    text: "Which quoting form performs full quoting (no expansion)?",
    translate: "¿Qué forma de comillas realiza un comillado completo (sin expansión)?",
    type: "multiple",
    options: ["'single quotes'","\"double quotes\"","backticks","no quotes"],
    correct: ["'single quotes'"]
  },

  // ---- Variables: assignment and referencing ----
  {
    text: "Which is a valid variable assignment without spaces?",
    translate: "¿Cuál es una asignación de variable válida sin espacios?",
    type: "multiple",
    options: ["var=value","var = value","var= value","var =value"],
    correct: ["var=value"]
  },
  {
    text: "How do you reference a variable when echoing?",
    translate: "¿Cómo referencias una variable al hacer echo?",
    type: "multiple",
    options: ["echo $var","echo ${var}","echo var","Both first and second"],
    correct: ["Both first and second"]
  },
  {
    text: "Which assignment stores words including spaces (using escaping)?",
    translate: "¿Qué asignación almacena palabras con espacios usando escape?",
    type: "multiple",
    options: ["var3=one\\ two\\ three","var3=one two three","var3=\"one two three\"","Both 1 and 3"],
    correct: ["Both 1 and 3"]
  },
  {
    text: "How can you do indirect referencing to get the value named by a variable?",
    translate: "¿Cómo haces referencia indirecta para obtener el valor nombrado por una variable?",
    type: "multiple",
    options: [
      "eval b=\\$$var; echo $b",
      "echo $$var",
      "echo ${!var}",
      "declare -i var"
    ],
    correct: ["eval b=\\$$var; echo $b"]
  },

  // ---- Variable types / declare -i ----
  {
    text: "What does 'declare -i n' do before arithmetic assignment?",
    translate: "¿Qué hace 'declare -i n' antes de una asignación aritmética?",
    type: "multiple",
    options: [
      "Treats n as an integer for arithmetic evaluation",
      "Declares n as an array",
      "Prevents n from being exported",
      "Makes n read-only"
    ],
    correct: ["Treats n as an integer for arithmetic evaluation"]
  },
  {
    text: "If n is not declared integer, what happens with n=6/3 assigned literally?",
    translate: "Si n no se declara entero, ¿qué sucede con n=6/3 asignado literalmente?",
    type: "multiple",
    options: [
      "n becomes the string '6/3'",
      "n becomes the number 2",
      "n is undefined",
      "n becomes 6"
    ],
    correct: ["n becomes the string '6/3'"]
  },

  // ---- String manipulation ----
  {
    text: "Which expression returns the length of $var?",
    translate: "¿Qué expresión devuelve la longitud de $var?",
    type: "multiple",
    options: ["${#var}","${var:length}","${var#len}","length($var)"],
    correct: ["${#var}"]
  },
  {
    text: "How do you extract a substring of $var starting at position 2 length 5?",
    translate: "¿Cómo extraes una subcadena de $var empezando en posición 2 longitud 5?",
    type: "multiple",
    options: ["${var:2:5}","${var:5:2}","substr($var,2,5)","${var[2,5]}"],
    correct: ["${var:2:5}"]
  },
  {
    text: "What does ${var#Pattern} do?",
    translate: "¿Qué hace ${var#Pattern}?",
    type: "multiple",
    options: [
      "Remove shortest match of Pattern from front",
      "Remove longest match of Pattern from front",
      "Remove shortest match from back",
      "Replace Pattern with nothing"
    ],
    correct: ["Remove shortest match of Pattern from front"]
  },
  {
    text: "What does ${var%Pattern} do?",
    translate: "¿Qué hace ${var%Pattern}?",
    type: "multiple",
    options: [
      "Delete shortest match of Pattern from back",
      "Delete longest match of Pattern from back",
      "Remove front Pattern",
      "Split the variable"
    ],
    correct: ["Delete shortest match of Pattern from back"]
  },
  {
    text: "Which form replaces all matches of a pattern in $var?",
    translate: "¿Qué forma reemplaza todas las coincidencias de un patrón en $var?",
    type: "multiple",
    options: ["${var//Pattern/Replacement}","${var/Pattern/Replacement}","${var/#Pattern/Rep}","${var/%Pattern/Rep}"],
    correct: ["${var//Pattern/Replacement}"]
  },
  {
    text: "Which substitution replaces a prefix if it matches the pattern?",
    translate: "¿Qué sustitución reemplaza un prefijo si coincide con el patrón?",
    type: "multiple",
    options: ["${var/#Pattern/Replacement}","${var/%Pattern/Replacement}","${var//Pattern/Replacement}","${var/Pattern/Replacement}"],
    correct: ["${var/#Pattern/Replacement}"]
  },

  // ---- Parameter substitution variants ----
  {
    text: "What does ${parameter:-default} do when parameter is unset or null?",
    translate: "¿Qué hace ${parameter:-default} cuando el parámetro no está definido o es nulo?",
    type: "multiple",
    options: [
      "Use default for display but do not assign parameter",
      "Assign default to parameter permanently",
      "Cause the script to abort",
      "Return empty string"
    ],
    correct: ["Use default for display but do not assign parameter"]
  },
  {
    text: "What does ${parameter:=default} do when parameter is unset or null?",
    translate: "¿Qué hace ${parameter:=default} cuando el parámetro no está definido o es nulo?",
    type: "multiple",
    options: [
      "Assign default to parameter and return it",
      "Only print default but do not assign",
      "Throw an error",
      "Unset the parameter"
    ],
    correct: ["Assign default to parameter and return it"]
  },
  {
    text: "What difference does the ':' make in constructs like ${var-default} vs ${var:-default}?",
    translate: "¿Qué diferencia introduce ':' en ${var-default} vs ${var:-default}?",
    type: "multiple",
    options: [
      "':' makes the form treat declared-but-null as 'null' and use default",
      "No difference at all",
      "':' assigns default permanently",
      "':' prevents expansion"
    ],
    correct: ["':' makes the form treat declared-but-null as 'null' and use default"]
  },
  {
    text: "What does ${parameter?err_msg} do if parameter is unset?",
    translate: "¿Qué hace ${parameter?err_msg} si el parámetro no está definido?",
    type: "multiple",
    options: [
      "Print err_msg and abort script with exit status 1",
      "Set parameter to err_msg",
      "Return empty string",
      "Ignore error and continue"
    ],
    correct: ["Print err_msg and abort script with exit status 1"]
  },

  // ---- Variable scopes and environment ----
  {
    text: "Which variable type is visible only within a function or code block?",
    translate: "¿Qué tipo de variable es visible solo dentro de una función o bloque de código?",
    type: "multiple",
    options: ["Local variables","Environment variables","Positional parameters","Built-in variables"],
    correct: ["Local variables"]
  },
  {
    text: "How do you export a variable for the current session?",
    translate: "¿Cómo exportas una variable para la sesión actual?",
    type: "multiple",
    options: ["export MYVAR=value","set MYVAR=value","declare MYVAR=value","env MYVAR=value"],
    correct: ["export MYVAR=value"]
  },
  {
    text: "Where might environment variables be stored for all sessions of a user?",
    translate: "¿Dónde pueden almacenarse las variables de entorno para todas las sesiones de un usuario?",
    type: "multiple",
    options: ["~/.bashrc or ~/.bash_profile","/etc/environment only","/var/log","/tmp"],
    correct: ["~/.bashrc or ~/.bash_profile"]
  },
  {
    text: "Which command lists current environment variables?",
    translate: "¿Qué comando lista las variables de entorno actuales?",
    type: "multiple",
    options: ["env","lsenv","printenvall","showenv"],
    correct: ["env"]
  },

  // ---- Positional parameters and special variables ----
  {
    text: "How are script arguments referenced (first and script name)?",
    translate: "¿Cómo se referencian los argumentos del script (el primero y el nombre del script)?",
    type: "multiple",
    options: ["$0 is script name, $1 is first arg","$1 is script name, $0 is first arg","$# is first arg","$* is script name"],
    correct: ["$0 is script name, $1 is first arg"]
  },
  {
    text: "What are $* and $@ used for?",
    translate: "¿Para qué se usan $* y $@?",
    type: "multiple",
    options: [
      "Denote all positional parameters ($* as one word, $@ as separate words)",
      "Both are equivalent always",
      "Contain environment variables",
      "Return process IDs"
    ],
    correct: ["Denote all positional parameters ($* as one word, $@ as separate words)"]
  },
  {
    text: "What variable gives the number of positional parameters?",
    translate: "¿Qué variable da el número de parámetros posicionales?",
    type: "multiple",
    options: ["$#","$?","$$","$-"],
    correct: ["$#"]
  },

  // ---- Arrays ----
  {
    text: "How do you define an array with elements zero..five?",
    translate: "¿Cómo defines un array con elementos zero..five?",
    type: "multiple",
    options: [
      "my_array=( zero one two three four five )",
      "my_array = {zero,one,...}",
      "declare arr zero one two",
      "array my_array [zero..five]"
    ],
    correct: ["my_array=( zero one two three four five )"]
  },
  {
    text: "How to get the number of elements in an array?",
    translate: "¿Cómo obtener el número de elementos en un array?",
    type: "multiple",
    options: ["${#my_array[@]}","${#my_array}","length(my_array)","${my_array.length}"],
    correct: ["${#my_array[@]}"]
  },
  {
    text: "Which expands all elements as separate words?",
    translate: "¿Cuál expande todos los elementos como palabras separadas?",
    type: "multiple",
    options: ["${my_array[@]}","${my_array[*]}","${my_array}","${my_array[0]}"],
    correct: ["${my_array[@]}"]
  },

  // ---- Built-in and special shell variables ----
  {
    text: "Which variable contains the exit status of last command?",
    translate: "¿Qué variable contiene el estado de salida del último comando?",
    type: "multiple",
    options: ["$?","$$","$!","$-"],
    correct: ["$?"]
  },
  {
    text: "Which variable is the process ID (PID) of the script?",
    translate: "¿Qué variable es el PID del script?",
    type: "multiple",
    options: ["$$","$!","$*","$#"],
    correct: ["$$"]
  },
  {
    text: "What does $! hold?",
    translate: "¿Qué contiene $!?",
    type: "multiple",
    options: [
      "PID of the last background job",
      "Exit status of last command",
      "All positional parameters",
      "Current user"
    ],
    correct: ["PID of the last background job"]
  },
  {
    text: "Which built-in returns a pseudorandom integer 0-32767?",
    translate: "¿Qué variable devuelve un entero pseudoaleatorio 0-32767?",
    type: "multiple",
    options: ["$RANDOM","$PATH","$IFS","$EDITOR"],
    correct: ["$RANDOM"]
  }
];
