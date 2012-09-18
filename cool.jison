
/* description: Parses end executes mathematical expressions. */

/* lexical grammar */

%lex

 /* Basic stuff */
DIGIT           [0-9]
UPPERCASE       [A-Z]
LOWERCASE       [a-z]
ALPHANUMERIC    [A-Za-z0-9_]

 /* 10.1 Integers, Identifiers, and Special Notation */
INTEGER         {DIGIT}+
TYPEID          {UPPERCASE}{ALPHANUMERIC}*
OBJECTID        {LOWERCASE}{ALPHANUMERIC}*
DARROW          \=\>
LE              \<\=
ASSIGN          \<\-

 /* 10.2 Strings: No regex is required */

 /* 10.3 Comments */
OPEN_COMMENT    \(\*
CLOSE_COMMENT   \*\)
LINE_COMMENT    \-\-.*

 /* 10.4 Keywords */
CLASS           "class"
ELSE            "else"
FI              "fi"
IF              "if"
IN              "in"
INHERITS        "inherits"
ISVOID          "isvoid"
LET             "let"
LOOP            "loop"
POOL            "pool"
THEN            "then"
WHILE           "while"
CASE            "case"
ESAC            "esac"
NEW             "new"
OF              "of"
NOT             "not"
BOOL_TRUE       "true"
BOOL_FALSE      "false"

 /* 10.5 White Space */
WHITESPACE      [\s\f\t\v\r]
ENDLINE         \n

%x COMMENT
%x STRING
%%

/* Comment related rules */
{LINE_COMMENT}  {  }
{OPEN_COMMENT}  { yy.comment_depth=1; this.begin('COMMENT'); }
{CLOSE_COMMENT} {
    yy.error_msg = "Unmatched *)";
    return 'ERROR';
}
<COMMENT>{OPEN_COMMENT} { yy.comment_depth++; }
<COMMENT>{CLOSE_COMMENT} {
        if (--yy.comment_depth == 0){
                this.begin('INITIAL');
				
	    }
}
<COMMENT>{ENDLINE} { /*curr_lineno++;*/ }
<COMMENT>{WHITESPACE} {}
<COMMENT><<EOF>>   {
    this.begin('INITIAL');
    yy.error_msg = "EOF in comment";
    return 'ERROR';
}
<COMMENT>.      { }


/* Multiple-character operators */
{DARROW}        { return 'DARROW'; }
{LE}            { return 'LE'; }
{ASSIGN}        { return 'ASSIGN'; }

/* Single-character operators  */
";"                   return ';'
":"                   return ':'
","                   return ','
"."                   return '.'
"@"                   return '@'
"~"                   return '~'
"<"                   return '<'
"="                   return '='
"-"                   return '-'
"+"                   return '+'
"*"                   return '*'
"/"                   return '/'
"{"                   return '{'
"}"                   return '}'
"("                   return '('
")"                   return ')'

/*keywords */
{CLASS}         { return 'CLASS'; }
{ELSE}          { return 'ELSE'; }
{FI}            { return 'FI'; }
{IF}            { return 'IF'; }
{IN}            { return 'IN'; }
{INHERITS}      { return 'INHERITS'; }
{ISVOID}        { return 'ISVOID'; }
{LET}           { return 'LET'; }
{LOOP}          { return 'LOOP'; }
{POOL}          { return 'POOL'; }
{THEN}          { return 'THEN'; }
{WHILE}         { return 'WHILE'; }
{CASE}          { return 'CASE'; }
{ESAC}          { return 'ESAC'; }
{NEW}           { return 'NEW'; }
{OF}            { return 'OF'; }
{NOT}           { return 'NOT'; }
{BOOL_TRUE}          { return 'BOOL_CONST'; }
{BOOL_FALSE}         { return 'BOOL_CONST'; }

/* constants and indentifiers */
{OBJECTID}    { return 'OBJECTID'; }
{TYPEID}    { return 'TYPEID'; }
{INTEGER}  {return 'INT_CONST';}

/* match a string */

\"              {
    this.begin("STRING");
         yy.buff="";
		 yy.string_overflow = false;
		 yy.string_contains_null = false;
}
<STRING>\\\"  {
         if(yy.buff.length>=1024) yy.string_overflow=true;
		 else yy.buff+='"';
}
<STRING>\\{ENDLINE} {
         if(yy.buff.length>=1024) yy.string_overflow=true;
		 yy.buff+="\n";
}
<STRING>{ENDLINE} {
        this.begin("INITIAL");
		if(yy.string_contains_null) yy.error_msg="String contains null chars";
		else yy.error_msg ="Unterminated string constant";
        return 'ERROR';		
}
<STRING>\\b {
       if(yy.buff.length>=1024) yy.string_overflow=true;
		else yy.buff+="\b";
}
<STRING>\\t {
        if(yy.buff.length>=1024) yy.string_overflow=true;
		else yy.buff+="\t";
}
<STRING>\\n {
        if(yy.buff.length>=1024) yy.string_overflow=true;
		else yy.buff+="\n";
}
<STRING>\\f {
        if(yy.buff.length>=1024) yy.string_overflow=true;
		else yy.buff+="\f";
}
<STRING>\\. {
        if(yy.buff.length>=1024) yy.string_overflow=true;
		else yy.buff+=yytext[1];
}

<STRING>\"      {
    this.begin("INITIAL");
	if(yy.string_constains_null) { yy.error_msg="String contains null char"; return 'ERROR'}
	if(yy.string_overflow) { yy.error_msg="String too long";return 'ERROR'; }
	
	yytext=yy.buff;
    return 'STR_CONST';
}
<STRING>\0 {
     yy.string_contains_null=true;
	 if(yy.buff.length>=1024) yy.string_overflow=true;
	 else yy.buff+=yytext[0];
}
<STRING><<EOF>> {
    this.begin("INITIAL");
	yy.error_msg="EOF in string constant";
	return 'ERROR';
}
<STRING>.       {
      if(yy.buff.length>=1024) yy.string_overflow=true;
	  else yy.buff+=yytext[0];
}






{WHITESPACE}+         {}         /* skip whitespace */
{ENDLINE}             {}
<<EOF>>               return 'EOF'
.                     return 'INVALID'

/lex

/* operator associations and precedence */

%right IN
%right ASSIGN /* The only right-associative operator */
%left NOT
%left LE '<' '='
%left '+' '-'
%left '*' '/'
%left ISVOID
%left '~'
%left '@'
%left '.'

%start Program

%% /* language grammar */

Program 
     : class_list
	   { 
	           $$=$1;
               var prgm = new yy.ds.CLProgram($1);
			   var visitor = new yy.ds.CLCodeGenVisitor("tmpns",prgm);
			   //prgm.accept(visitor);
			   visitor.codegen();
			   console.log(visitor.out());
			   try{
			       eval(visitor.out());	
			   }catch(e){
			      console.log(e);
			   }
               
	   }	  
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
	   { $$=new yy.ds.CLClass($2,"Object",new yy.ds.CLFeatureList());  }
	| CLASS TYPEID INHERITS TYPEID '{' '}'
	   { $$=new yy.ds.CLClass($2,$4,new yy.ds.CLFeatureList()); }
	| CLASS TYPEID '{' feature_list '}' 
	   { $$=new yy.ds.CLClass($2,"Object",$4);  }
	| CLASS TYPEID INHERITS TYPEID '{' feature_list '}'
	   { $$=new yy.ds.CLClass($2,$4,$6); }
	;

feature_list
    : feature ';'
      {$$=new yy.ds.CLFeatureList(); $$.append($1); }
    | feature_list feature ';'
      { $1.append($2); $$ = $1; }
    | feature_list error ';'
      { throw "Error reading features"; }
    ;
    
feature:
    
    OBJECTID '(' ')' ':' TYPEID '{' expr_semicolon_list '}'
      {  $$ = new yy.ds.CLMethod($1,new yy.ds.CLExprCommaSepList(), $5, $7); }
    | OBJECTID ':' TYPEID 
      { $$ = new yy.ds.CLAttr($1,$3,null); }
	| OBJECTID ':' TYPEID ASSIGN expr
	  { $$ = new yy.ds.CLAttr($1,$3,$5); }
    ;
	
	
/* expressions  */
 /* expr_semicolon_list: [[expr;]]* */
expr_semicolon_list
    : expr ';'
	 {  $$ = new yy.ds.CLExprSemiColonList();$$.append($1); }
    | expr_semicolon_list expr ';'
	{
       $1.append($2); $$ = $1;//append_Expressions($1, single_Expressions($2));
    }
    ;
	
expr_comma_list
    : expr
      { $$ = new yy.ds.CLExprCommaSepList();$$.append($1); }
    | expr_comma_list ',' expr
      { $1.append($3); $$ = $1; }
    ;	
let_list:
    OBJECTID ':' TYPEID ASSIGN expr IN expr
      { 
      $$ = new yy.ds.CLLet($1, $3, $5, $7); }
    | OBJECTID ':' TYPEID IN expr
      { 
      $$ = new yy.ds.CLLet($1, $3, no_expr(), $5); }
    | OBJECTID ':' TYPEID ASSIGN expr ',' let_list
      { 
      $$ = new yy.ds.CLLet($1, $3, $5, $7); }
    | OBJECTID ':' TYPEID ',' let_list
      {  $$ = new yy.ds.CLLet($1, $3, no_expr(), $5); }
    
    ;
expr
    : expr '.' OBJECTID '('  ')'
      { $$ = new yy.ds.CLDispatch($1, $3, new yy.ds.CLExprSemiColonList()); }
    | expr '.' OBJECTID '(' expr_comma_list ')'
      { $$ = new yy.ds.CLDispatch($1, $3, $5); }
    | OBJECTID '(' ')'
      { $$ = new yy.ds.CLDispatch(new yy.ds.CLObject("self"),$1,new yy.ds.CLExprSemiColonList()); }
    | OBJECTID '(' expr_comma_list ')'
      { $$ = new yy.ds.CLDispatch(new yy.ds.CLObject("self"),$1,$3); }
	| LET let_list
      { $$ = $2; }
	| NEW TYPEID
      { $$ = new yy.ds.CLNew($2); }
	| ISVOID expr
      { $$ = new yy.ds.CLIsvoid($2); }
	| expr '+' expr
      { $$ = new yy.ds.CLPlus($1, $3); }
    | expr '-' expr
      { $$ = new yy.ds.CLSub($1, $3); }
	| expr '*' expr
      { $$ = new yy.ds.CLMul($1, $3); }  
	| expr '/' expr
      { $$ = new yy.ds.CLDivide($1, $3); }
	| '~' expr
    { $$ = new yy.ds.CLNeg($2); }
	| expr '<' expr
      { $$ = new yy.ds.CLLt($1, $3); }
	| expr LE expr
      { $$ = new yy.ds.CLLeq($1, $3); }
	| expr '=' expr
      { $$ = new yy.ds.CLEq($1, $3); }
	| NOT expr
      { $$ = new yy.ds.CLComp($2);  }
	| '(' expr ')'
      { $$ = $2; }
    | OBJECTID
      { $$ = new yy.ds.CLObject($1); }
	| INT_CONST
	  { $$ = new yy.ds.CLIntConst($1); }
    | STR_CONST
      { $$ = new yy.ds.CLStringConst($1); }
	| BOOL_CONST
	  { $$ = new yy.ds.CLBoolConst($1); }
    ;
	
