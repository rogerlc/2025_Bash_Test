const questions = [
{
  question: '1) What happens if you use the "set -e" in a Bash script?',
  options: [
    'It will cause Bash to exit if a function or subshell returns a nonzero status code.',
    'It will cause Bash to exit if a conditional returns a non-zero status code',
    'It will cause Bash to exit if local, declare, or typeset assignments return a nonzero status code.',
    'It will cause Bash to exit if a command, list of commands, compound command, or potentially a pipeline returns nonzero status code.'
  ],
  correct: 3
},
{
  question: '2) VAR="/var/www/html/website.com/html/"\necho "${VAR#*/html}"\nWhat is the output of this code?',
  options: [
    '/website.com/html/',
    '/html/website.com/html/',
    '/var/www/html/website.com/',
    'Nothing will be echoed on the screen.'
  ],
  correct: 0
},
{
  question: '3) In order for a Bash script to be executed like an OS command, it should start with a shebang line. What does this look like?',
  options: [
    '#!/usr/bin/env bash',
    '~/usr/bin/env bash',
    '$!/usr/bin/env bash',
    '#/usr/bin/env bash'
  ],
  correct: 0
},
{
  question: '4) What line of Bash script probably produced the following output: "The date is: Sun Mar 24 12:30:06 CST 2019!"?',
  options: [
    'echo "The date is: !"',
    'echo "The date is: date!"',
    'echo "The date is: (date)!"',
    'echo "The date is: $(date)!"'
  ],
  correct: 3
},
{
  question: '5) What do you use in a case statement to tell Bash that you\'re done with a specific test?',
  options: [
    ';;',
    '::',
    'done',
    '$$'
  ],
  correct: 0
},
{
  question: '6) Which variable would you check to verify that the last command executed successfully?',
  options: [
    '$$',
    '$?',
    '$!',
    '$@'
  ],
  correct: 1
},
{
  question: '7) Which file allows you to save modifications to the shell environment across sessions?',
  options: [
    '/etc/bash.conf',
    '~/.profile',
    '/etc/bashprofile',
    '~/profile'
  ],
  correct: 1
},
{
  question: '8) In order to write a script that iterates through the files in a directory, which of the following could you use?',
  options: [
    'bash for i in $(ls); do ... done',
    'bash for $(ls); do ... done',
    'bash for i in $ls; do ... done',
    'bash for $ls; do ... done'
  ],
  correct: 0
},
{
  question: '9) When executing a command and passing the output of that command to another command, which character allows you to chain these commands together?',
  options: [
    '|',
    '->',
    '#',
    '@'
  ],
  correct: 0
},
{
  question: '10) Which statement checks whether the variable num is greater than five?',
  options: [
    '(( $num -gt 5 ))',
    '[$num -lt 5]',
    '((\\$num > 5 ))',
    '$num > 5'
  ],
  correct: 2
}
];
