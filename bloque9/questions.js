const questions = [
  // CONDITIONS / TEST COMMAND
  {
    text: "Which constructs are used by bash for conditions?",
    translate: "¿Qué construcciones usa bash para condiciones?",
    type: "multiple",
    options: ["test or [ ]","[[ ]] extended test","(( )) and let","select ... do"],
    correct: ["test or [ ]","[[ ]] extended test","(( )) and let"]
  },
  {
    text: "What is '[ EXPRESSION ]' in bash?",
    translate: "¿Qué es '[ EXPRESSION ]' en bash?",
    type: "multiple",
    options: ["Synonym for test","A built-in for efficiency","An arithmetic operator","A keyword"],
    correct: ["Synonym for test","A built-in for efficiency"]
  },
  {
    text: "What exit status does a true test return?",
    translate: "¿Qué estado de salida devuelve una prueba verdadera?",
    type: "multiple",
    options: ["0","1","-1","255"],
    correct: ["0"]
  },
  {
    text: "Which test checks if a file exists and is a regular file?",
    translate: "¿Qué prueba verifica si un archivo existe y es un archivo regular?",
    type: "multiple",
    options: ["-f FILE","-d FILE","-e FILE","-r FILE"],
    correct: ["-f FILE"]
  },
  {
    text: "Which test checks that a file exists and is a directory?",
    translate: "¿Qué prueba verifica que un archivo existe y es un directorio?",
    type: "multiple",
    options: ["-d FILE","-f FILE","-x FILE","-s FILE"],
    correct: ["-d FILE"]
  },

  // EXTENDED TEST COMMAND
  {
    text: "What advantage does [[ ... ]] have over [ ... ]?",
    translate: "¿Qué ventaja tiene [[ ... ]] sobre [ ... ]?",
    type: "multiple",
    options: ["Handles && and || inside test","Less quoting errors with spaces","Allows < and > comparisons","Is POSIX sh compatible"],
    correct: ["Handles && and || inside test","Less quoting errors with spaces","Allows < and > comparisons"]
  },
  {
    text: "Why does [ -n $string_with_spaces ] sometimes fail?",
    translate: "¿Por qué [ -n $string_with_spaces ] a veces falla?",
    type: "multiple",
    options: ["Word splitting produces too many args","Because -n is invalid","It is only for numbers","The variable is always empty"],
    correct: ["Word splitting produces too many args"]
  },

  // DOUBLE PARENTHESES / LET
  {
    text: "What does (( ... )) return when expression evaluates to non-zero?",
    translate: "¿Qué devuelve (( ... )) cuando la expresión evalúa distinto de cero?",
    type: "multiple",
    options: ["Exit status 0 (true)","Exit status 1 (false)","It prints the value","It aborts the script"],
    correct: ["Exit status 0 (true)"]
  },
  {
    text: "Which is true about 'declare -i' arithmetic example?",
    translate: "¿Qué es cierto sobre el ejemplo con 'declare -i'?",
    type: "multiple",
    options: ["With declare -i, 6/3 evaluates to 2","Without declare -i, variable is '6/3' string","declare -i forces integer arithmetic","All of the above"],
    correct: ["All of the above"]
  },

  // IF/THEN
  {
    text: "Which statement is valid for conditional execution in bash?",
    translate: "¿Qué sentencia es válida para ejecución condicional en bash?",
    type: "multiple",
    options: ["if [ cond ]; then ... fi","if command; then ... fi","if [[ cond ]]; then ... fi","All of the above"],
    correct: ["All of the above"]
  },
  {
    text: "What does 'elif' do in an if construct?",
    translate: "¿Qué hace 'elif' en una construcción if?",
    type: "multiple",
    options: ["Provides an else-if branch","Terminates the if","Is used for arithmetic","Is a case label"],
    correct: ["Provides an else-if branch"]
  },

  // CASE
  {
    text: "How does each clause in a case statement end?",
    translate: "¿Cómo termina cada cláusula en un case?",
    type: "multiple",
    options: ["With ';;'","With 'esac'","With 'fi'","With 'end'"],
    correct: ["With ';;'"]
  },
  {
    text: "What keyword ends a case statement?",
    translate: "¿Qué palabra clave termina un case?",
    type: "multiple",
    options: ["esac","endcase","fi","done"],
    correct: ["esac"]
  },
  {
    text: "In the init script example, how is the default handled?",
    translate: "En el ejemplo init, ¿cómo se maneja el caso por defecto?",
    type: "multiple",
    options: ["Using *) pattern","By omitting pattern","Using else clause inside case","With 'default' keyword"],
    correct: ["Using *) pattern"]
  },

  // LIST CONSTRUCTS (AND / OR lists)
  {
    text: "What does 'cmd1 && cmd2 && cmd3' do?",
    translate: "¿Qué hace 'cmd1 && cmd2 && cmd3'?",
    type: "multiple",
    options: ["Executes sequence until a command returns false","Executes all regardless of status","Executes only cmd1","Runs commands in background"],
    correct: ["Executes sequence until a command returns false"]
  },
  {
    text: "What does 'cmd1 || cmd2 || cmd3' do?",
    translate: "¿Qué hace 'cmd1 || cmd2 || cmd3'?",
    type: "multiple",
    options: ["Executes until a command returns true","Executes never","Runs only last command","Is equivalent to AND list"],
    correct: ["Executes until a command returns true"]
  },

  // LOOPS: for / while / until
  {
    text: "How does a for loop iterate over values?",
    translate: "¿Cómo itera un for sobre valores?",
    type: "multiple",
    options: ["for arg in list; do ... done","for (i=0;i<n;i++)","for arg; echo arg","for arg while cond do"],
    correct: ["for arg in list; do ... done"]
  },
  {
    text: "In 'for file in \"$(find . -type l)\"; do ... done', what is iterated?",
    translate: "En 'for file in \"$(find . -type l)\"; do ... done', ¿qué se itera?",
    type: "multiple",
    options: ["List of symlink paths returned by find","All regular files only","Line numbers","Nothing"],
    correct: ["List of symlink paths returned by find"]
  },
  {
    text: "When does a while loop continue iterating?",
    translate: "¿Cuándo continúa iterando un while?",
    type: "multiple",
    options: ["While the condition command returns 0 (true)","While condition returns nonzero","Until a counter is reached","Always exactly 10 times"],
    correct: ["While the condition command returns 0 (true)"]
  },
  {
    text: "What is the opposite of while?",
    translate: "¿Cuál es el opuesto de while?",
    type: "multiple",
    options: ["until","for","repeat","loop"],
    correct: ["until"]
  },

  // LOOP CONTROL
  {
    text: "What does 'break' do inside a loop?",
    translate: "¿Qué hace 'break' dentro de un bucle?",
    type: "multiple",
    options: ["Terminates the loop immediately","Skips to next iteration","Exits the script","Restarts the loop from beginning"],
    correct: ["Terminates the loop immediately"]
  },
  {
    text: "What does 'continue' do inside a loop?",
    translate: "¿Qué hace 'continue' dentro de un bucle?",
    type: "multiple",
    options: ["Skips remaining commands and starts next iteration","Terminates the loop","Prints next value","Pauses execution"],
    correct: ["Skips remaining commands and starts next iteration"]
  },

  // MISC small checks
  {
    text: "What does '[ $? -ne 0 ] && rc=1' do after a command?",
    translate: "¿Qué hace '[ $? -ne 0 ] && rc=1' después de un comando?",
    type: "multiple",
    options: ["Sets rc=1 if previous command failed","Sets rc=1 if previous command succeeded","Resets rc to zero","Prints rc"],
    correct: ["Sets rc=1 if previous command failed"]
  },
  {
    text: "Which construct treats arithmetic expressions and returns status based on non-zero/zero?",
    translate: "¿Qué construcción evalúa expresiones aritméticas y devuelve estado según no-cero/cero?",
    type: "multiple",
    options: ["(( ... )) and let","[ ... ]","case ... esac","for ... do"],
    correct: ["(( ... )) and let"]
  }
];
