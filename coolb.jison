

/* operator associations and precedence */

%left '+' '-'
%left '*' '/'
%left '^'
%right '!'
%right '%'
%left UMINUS

%start Program

%% /* language grammar */

Program 
     : class_list
	   { $$=$1; console.log("%j",$1);  }
	 ;
class_list
     : class ';' 
         { $$=[$1]; }	 
     | class_list class ';'
	   { $1.push($2); $$=$1; }
     | class_list EOF
	    {        }
	   
	 ;
class 
    : CLASS TYPEID '{' '}' 
	   { $$={name:$2,parent:"Object"};  }
	| CLASS TYPEID INHERITS TYPEID '{' '}'
	   { $$={name:$2,parent:$4}; }
	| CLASS TYPEID '{' feature_list '}' 
	   { $$={name:$2,parent:"Object",features:$4};  }
	| CLASS TYPEID INHERITS TYPEID '{' feature_list '}'
	   { $$={name:$2,parent:$4,features:$6}; }
	;

feature_list
    : feature ';'
      { $$ = [$1] ;}
    | feature_list feature ';'
      { $1.push($2); $$ = $1; }
    | feature_list error ';'
      { throw "Error reading features"; }
    ;
    
feature:
    OBJECTID '(' ')' ':' TYPEID '{'  '}'
      {  $$ = {name:$1, params:[], retType:$5, body:[],Type:"method"}; }
    | OBJECTID ':' TYPEID 
      { $$ = {name:$1, typeid:$3}; }
    ;
expressions
    : e EOF
        { typeof console !== 'undefined' ? console.log($1) : print($1);
          return $1; }
    ;

e
    : e '+' e
        {$$ = $1+$3;}
    | e '-' e
        {$$ = $1-$3;}
    | e '*' e
        {$$ = $1*$3;}
    | e '/' e
        {$$ = $1/$3;}
    | e '^' e
        {$$ = Math.pow($1, $3);}
    | e '!'
        {{
          $$ = (function fact (n) { return n==0 ? 1 : fact(n-1) * n })($1);
        }}
    | e '%'
        {$$ = $1/100;}
    | '-' e %prec UMINUS
        {$$ = -$2;}
    | '(' e ')'
        {$$ = $2;}
    | NUMBER
        {$$ = Number(yytext);}
    | E
        {$$ = Math.E;}
    | PI
        {$$ = Math.PI;}
    ;
