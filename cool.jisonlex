
/* description: Parses end executes mathematical expressions. */

/* lexical grammar */
%lex
%%

\s+                   /* skip whitespace */
"class"               { return 'CLASS'; }
"inherits"            { return 'INHERITS'; }
[a-z][a-zA-Z0-9]*     { return 'OBJECTID'; }
[A-Z][a-zA-Z0-9]*     { return 'TYPEID'; }
[0-9]+("."[0-9]+)?\b  return 'NUMBER'
"*"                   return '*'
"/"                   return '/'
"-"                   return '-'
"+"                   return '+'
"^"                   return '^'
"!"                   return '!'
";"                   return ';'
":"                   return ':'
"%"                   return '%'
"("                   return '('
")"                   return ')'
"{"                   return "{"
"}"                   return "}"
"PI"                  return 'PI'
"E"                   return 'E'
<<EOF>>               return 'EOF'
.                     return 'INVALID'

/lex

