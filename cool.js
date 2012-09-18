/* Jison generated parser */
var cool = (function(){
var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"Program":3,"class_list":4,"class":5,";":6,"EOF":7,"CLASS":8,"TYPEID":9,"{":10,"}":11,"INHERITS":12,"feature_list":13,"feature":14,"OBJECTID":15,"(":16,")":17,":":18,"expr_semicolon_list":19,"ASSIGN":20,"expr":21,"expr_comma_list":22,",":23,"let_list":24,"IN":25,".":26,"NEW":27,"ISVOID":28,"+":29,"-":30,"*":31,"/":32,"~":33,"<":34,"LE":35,"=":36,"NOT":37,"INT_CONST":38,"STR_CONST":39,"BOOL_CONST":40,"$accept":0,"$end":1},
terminals_: {2:"error",6:";",7:"EOF",8:"CLASS",9:"TYPEID",10:"{",11:"}",12:"INHERITS",15:"OBJECTID",16:"(",17:")",18:":",20:"ASSIGN",23:",",25:"IN",26:".",27:"NEW",28:"ISVOID",29:"+",30:"-",31:"*",32:"/",33:"~",34:"<",35:"LE",36:"=",37:"NOT",38:"INT_CONST",39:"STR_CONST",40:"BOOL_CONST"},
productions_: [0,[3,1],[4,2],[4,3],[4,2],[5,4],[5,6],[5,5],[5,7],[13,2],[13,3],[13,3],[14,8],[14,3],[14,5],[19,2],[19,3],[22,1],[22,3],[24,7],[24,5],[24,7],[24,5],[21,5],[21,6],[21,3],[21,4],[21,2],[21,2],[21,3],[21,3],[21,3],[21,3],[21,2],[21,3],[21,3],[21,3],[21,2],[21,3],[21,1],[21,1],[21,1],[21,1]],
performAction: function anonymous(yytext,yyleng,yylineno,yy,yystate,$$,_$) {

var $0 = $$.length - 1;
switch (yystate) {
case 1: 
	           this.$=$$[$0];
               var prgm = new yy.ds.CLProgram($$[$0]);
			   var visitor = new yy.ds.CLCodeGenVisitor("tmpns",prgm);
			   //prgm.accept(visitor);
			   visitor.codegen();
			   console.log(visitor.out());
			   try{
			       eval(visitor.out());	
			   }catch(e){
			      console.log(e);
			   }
               
	   
break;
case 2: this.$=[$$[$0-1]]; 
break;
case 3: $$[$0-2].push($$[$0-1]); this.$=$$[$0-2]; 
break;
case 4:        
break;
case 5: this.$=new yy.ds.CLClass($$[$0-2],"Object",new yy.ds.CLFeatureList());  
break;
case 6: this.$=new yy.ds.CLClass($$[$0-4],$$[$0-2],new yy.ds.CLFeatureList()); 
break;
case 7: this.$=new yy.ds.CLClass($$[$0-3],"Object",$$[$0-1]);  
break;
case 8: this.$=new yy.ds.CLClass($$[$0-5],$$[$0-3],$$[$0-1]); 
break;
case 9:this.$=new yy.ds.CLFeatureList(); this.$.append($$[$0-1]); 
break;
case 10: $$[$0-2].append($$[$0-1]); this.$ = $$[$0-2]; 
break;
case 11: throw "Error reading features"; 
break;
case 12:  this.$ = new yy.ds.CLMethod($$[$0-7],new yy.ds.CLExprCommaSepList(), $$[$0-3], $$[$0-1]); 
break;
case 13: this.$ = new yy.ds.CLAttr($$[$0-2],$$[$0],null); 
break;
case 14: this.$ = new yy.ds.CLAttr($$[$0-4],$$[$0-2],$$[$0]); 
break;
case 15:  this.$ = new yy.ds.CLExprSemiColonList();this.$.append($$[$0-1]); 
break;
case 16:
       $$[$0-2].append($$[$0-1]); this.$ = $$[$0-2];//append_Expressions($$[$0-2], single_Expressions($$[$0-1]));
    
break;
case 17: this.$ = new yy.ds.CLExprCommaSepList();this.$.append($$[$0]); 
break;
case 18: $$[$0-2].append($$[$0]); this.$ = $$[$0-2]; 
break;
case 19: 
      this.$ = new yy.ds.CLLet($$[$0-6], $$[$0-4], $$[$0-2], $$[$0]); 
break;
case 20: 
      this.$ = new yy.ds.CLLet($$[$0-4], $$[$0-2], no_expr(), $$[$0]); 
break;
case 21: 
      this.$ = new yy.ds.CLLet($$[$0-6], $$[$0-4], $$[$0-2], $$[$0]); 
break;
case 22:  this.$ = new yy.ds.CLLet($$[$0-4], $$[$0-2], no_expr(), $$[$0]); 
break;
case 23: this.$ = new yy.ds.CLDispatch($$[$0-4], $$[$0-2], new yy.ds.CLExprSemiColonList()); 
break;
case 24: this.$ = new yy.ds.CLDispatch($$[$0-5], $$[$0-3], $$[$0-1]); 
break;
case 25: this.$ = new yy.ds.CLDispatch(new yy.ds.CLObject("self"),$$[$0-2],new yy.ds.CLExprSemiColonList()); 
break;
case 26: this.$ = new yy.ds.CLDispatch(new yy.ds.CLObject("self"),$$[$0-3],$$[$0-1]); 
break;
case 27: this.$ = new yy.ds.CLNew($$[$0]); 
break;
case 28: this.$ = new yy.ds.CLIsvoid($$[$0]); 
break;
case 29: this.$ = new yy.ds.CLPlus($$[$0-2], $$[$0]); 
break;
case 30: this.$ = new yy.ds.CLSub($$[$0-2], $$[$0]); 
break;
case 31: this.$ = new yy.ds.CLMul($$[$0-2], $$[$0]); 
break;
case 32: this.$ = new yy.ds.CLDivide($$[$0-2], $$[$0]); 
break;
case 33: this.$ = new yy.ds.CLNeg($$[$0]); 
break;
case 34: this.$ = new yy.ds.CLLt($$[$0-2], $$[$0]); 
break;
case 35: this.$ = new yy.ds.CLLeq($$[$0-2], $$[$0]); 
break;
case 36: this.$ = new yy.ds.CLEq($$[$0-2], $$[$0]); 
break;
case 37: this.$ = new yy.ds.CLComp($$[$0]);  
break;
case 38: this.$ = $$[$0-1]; 
break;
case 39: this.$ = new yy.ds.CLObject($$[$0]); 
break;
case 40: this.$ = new yy.ds.CLIntConst($$[$0]); 
break;
case 41: this.$ = new yy.ds.CLStringConst($$[$0]); 
break;
case 42: this.$ = new yy.ds.CLBoolConst($$[$0]); 
break;
}
},
table: [{3:1,4:2,5:3,8:[1,4]},{1:[3]},{1:[2,1],5:5,7:[1,6],8:[1,4]},{6:[1,7]},{9:[1,8]},{6:[1,9]},{1:[2,4],7:[2,4],8:[2,4]},{1:[2,2],7:[2,2],8:[2,2]},{10:[1,10],12:[1,11]},{1:[2,3],7:[2,3],8:[2,3]},{11:[1,12],13:13,14:14,15:[1,15]},{9:[1,16]},{6:[2,5]},{2:[1,19],11:[1,17],14:18,15:[1,15]},{6:[1,20]},{16:[1,21],18:[1,22]},{10:[1,23]},{6:[2,7]},{6:[1,24]},{6:[1,25]},{2:[2,9],11:[2,9],15:[2,9]},{17:[1,26]},{9:[1,27]},{11:[1,28],13:29,14:14,15:[1,15]},{2:[2,10],11:[2,10],15:[2,10]},{2:[2,11],11:[2,11],15:[2,11]},{18:[1,30]},{6:[2,13],20:[1,31]},{6:[2,6]},{2:[1,19],11:[1,32],14:18,15:[1,15]},{9:[1,33]},{15:[1,35],16:[1,40],21:34,27:[1,36],28:[1,37],33:[1,38],37:[1,39],38:[1,41],39:[1,42],40:[1,43]},{6:[2,8]},{10:[1,44]},{6:[2,14],26:[1,45],29:[1,46],30:[1,47],31:[1,48],32:[1,49],34:[1,50],35:[1,51],36:[1,52]},{6:[2,39],16:[1,53],17:[2,39],23:[2,39],26:[2,39],29:[2,39],30:[2,39],31:[2,39],32:[2,39],34:[2,39],35:[2,39],36:[2,39]},{9:[1,54]},{15:[1,35],16:[1,40],21:55,27:[1,36],28:[1,37],33:[1,38],37:[1,39],38:[1,41],39:[1,42],40:[1,43]},{15:[1,35],16:[1,40],21:56,27:[1,36],28:[1,37],33:[1,38],37:[1,39],38:[1,41],39:[1,42],40:[1,43]},{15:[1,35],16:[1,40],21:57,27:[1,36],28:[1,37],33:[1,38],37:[1,39],38:[1,41],39:[1,42],40:[1,43]},{15:[1,35],16:[1,40],21:58,27:[1,36],28:[1,37],33:[1,38],37:[1,39],38:[1,41],39:[1,42],40:[1,43]},{6:[2,40],17:[2,40],23:[2,40],26:[2,40],29:[2,40],30:[2,40],31:[2,40],32:[2,40],34:[2,40],35:[2,40],36:[2,40]},{6:[2,41],17:[2,41],23:[2,41],26:[2,41],29:[2,41],30:[2,41],31:[2,41],32:[2,41],34:[2,41],35:[2,41],36:[2,41]},{6:[2,42],17:[2,42],23:[2,42],26:[2,42],29:[2,42],30:[2,42],31:[2,42],32:[2,42],34:[2,42],35:[2,42],36:[2,42]},{15:[1,35],16:[1,40],19:59,21:60,27:[1,36],28:[1,37],33:[1,38],37:[1,39],38:[1,41],39:[1,42],40:[1,43]},{15:[1,61]},{15:[1,35],16:[1,40],21:62,27:[1,36],28:[1,37],33:[1,38],37:[1,39],38:[1,41],39:[1,42],40:[1,43]},{15:[1,35],16:[1,40],21:63,27:[1,36],28:[1,37],33:[1,38],37:[1,39],38:[1,41],39:[1,42],40:[1,43]},{15:[1,35],16:[1,40],21:64,27:[1,36],28:[1,37],33:[1,38],37:[1,39],38:[1,41],39:[1,42],40:[1,43]},{15:[1,35],16:[1,40],21:65,27:[1,36],28:[1,37],33:[1,38],37:[1,39],38:[1,41],39:[1,42],40:[1,43]},{15:[1,35],16:[1,40],21:66,27:[1,36],28:[1,37],33:[1,38],37:[1,39],38:[1,41],39:[1,42],40:[1,43]},{15:[1,35],16:[1,40],21:67,27:[1,36],28:[1,37],33:[1,38],37:[1,39],38:[1,41],39:[1,42],40:[1,43]},{15:[1,35],16:[1,40],21:68,27:[1,36],28:[1,37],33:[1,38],37:[1,39],38:[1,41],39:[1,42],40:[1,43]},{15:[1,35],16:[1,40],17:[1,69],21:71,22:70,27:[1,36],28:[1,37],33:[1,38],37:[1,39],38:[1,41],39:[1,42],40:[1,43]},{6:[2,27],17:[2,27],23:[2,27],26:[2,27],29:[2,27],30:[2,27],31:[2,27],32:[2,27],34:[2,27],35:[2,27],36:[2,27]},{6:[2,28],17:[2,28],23:[2,28],26:[1,45],29:[2,28],30:[2,28],31:[2,28],32:[2,28],34:[2,28],35:[2,28],36:[2,28]},{6:[2,33],17:[2,33],23:[2,33],26:[1,45],29:[2,33],30:[2,33],31:[2,33],32:[2,33],34:[2,33],35:[2,33],36:[2,33]},{6:[2,37],17:[2,37],23:[2,37],26:[1,45],29:[1,46],30:[1,47],31:[1,48],32:[1,49],34:[1,50],35:[1,51],36:[1,52]},{17:[1,72],26:[1,45],29:[1,46],30:[1,47],31:[1,48],32:[1,49],34:[1,50],35:[1,51],36:[1,52]},{11:[1,73],15:[1,35],16:[1,40],21:74,27:[1,36],28:[1,37],33:[1,38],37:[1,39],38:[1,41],39:[1,42],40:[1,43]},{6:[1,75],26:[1,45],29:[1,46],30:[1,47],31:[1,48],32:[1,49],34:[1,50],35:[1,51],36:[1,52]},{16:[1,76]},{6:[2,29],17:[2,29],23:[2,29],26:[1,45],29:[2,29],30:[2,29],31:[1,48],32:[1,49],34:[2,29],35:[2,29],36:[2,29]},{6:[2,30],17:[2,30],23:[2,30],26:[1,45],29:[2,30],30:[2,30],31:[1,48],32:[1,49],34:[2,30],35:[2,30],36:[2,30]},{6:[2,31],17:[2,31],23:[2,31],26:[1,45],29:[2,31],30:[2,31],31:[2,31],32:[2,31],34:[2,31],35:[2,31],36:[2,31]},{6:[2,32],17:[2,32],23:[2,32],26:[1,45],29:[2,32],30:[2,32],31:[2,32],32:[2,32],34:[2,32],35:[2,32],36:[2,32]},{6:[2,34],17:[2,34],23:[2,34],26:[1,45],29:[1,46],30:[1,47],31:[1,48],32:[1,49],34:[2,34],35:[2,34],36:[2,34]},{6:[2,35],17:[2,35],23:[2,35],26:[1,45],29:[1,46],30:[1,47],31:[1,48],32:[1,49],34:[2,35],35:[2,35],36:[2,35]},{6:[2,36],17:[2,36],23:[2,36],26:[1,45],29:[1,46],30:[1,47],31:[1,48],32:[1,49],34:[2,36],35:[2,36],36:[2,36]},{6:[2,25],17:[2,25],23:[2,25],26:[2,25],29:[2,25],30:[2,25],31:[2,25],32:[2,25],34:[2,25],35:[2,25],36:[2,25]},{17:[1,77],23:[1,78]},{17:[2,17],23:[2,17],26:[1,45],29:[1,46],30:[1,47],31:[1,48],32:[1,49],34:[1,50],35:[1,51],36:[1,52]},{6:[2,38],17:[2,38],23:[2,38],26:[2,38],29:[2,38],30:[2,38],31:[2,38],32:[2,38],34:[2,38],35:[2,38],36:[2,38]},{6:[2,12]},{6:[1,79],26:[1,45],29:[1,46],30:[1,47],31:[1,48],32:[1,49],34:[1,50],35:[1,51],36:[1,52]},{11:[2,15],15:[2,15],16:[2,15],27:[2,15],28:[2,15],33:[2,15],37:[2,15],38:[2,15],39:[2,15],40:[2,15]},{15:[1,35],16:[1,40],17:[1,80],21:71,22:81,27:[1,36],28:[1,37],33:[1,38],37:[1,39],38:[1,41],39:[1,42],40:[1,43]},{6:[2,26],17:[2,26],23:[2,26],26:[2,26],29:[2,26],30:[2,26],31:[2,26],32:[2,26],34:[2,26],35:[2,26],36:[2,26]},{15:[1,35],16:[1,40],21:82,27:[1,36],28:[1,37],33:[1,38],37:[1,39],38:[1,41],39:[1,42],40:[1,43]},{11:[2,16],15:[2,16],16:[2,16],27:[2,16],28:[2,16],33:[2,16],37:[2,16],38:[2,16],39:[2,16],40:[2,16]},{6:[2,23],17:[2,23],23:[2,23],26:[2,23],29:[2,23],30:[2,23],31:[2,23],32:[2,23],34:[2,23],35:[2,23],36:[2,23]},{17:[1,83],23:[1,78]},{17:[2,18],23:[2,18],26:[1,45],29:[1,46],30:[1,47],31:[1,48],32:[1,49],34:[1,50],35:[1,51],36:[1,52]},{6:[2,24],17:[2,24],23:[2,24],26:[2,24],29:[2,24],30:[2,24],31:[2,24],32:[2,24],34:[2,24],35:[2,24],36:[2,24]}],
defaultActions: {12:[2,5],17:[2,7],28:[2,6],32:[2,8],73:[2,12]},
parseError: function parseError(str, hash) {
    throw new Error(str);
},
parse: function parse(input) {
    var self = this,
        stack = [0],
        vstack = [null], // semantic value stack
        lstack = [], // location stack
        table = this.table,
        yytext = '',
        yylineno = 0,
        yyleng = 0,
        recovering = 0,
        TERROR = 2,
        EOF = 1;

    //this.reductionCount = this.shiftCount = 0;

    this.lexer.setInput(input);
    this.lexer.yy = this.yy;
    this.yy.lexer = this.lexer;
    this.yy.parser = this;
    if (typeof this.lexer.yylloc == 'undefined')
        this.lexer.yylloc = {};
    var yyloc = this.lexer.yylloc;
    lstack.push(yyloc);

    var ranges = this.lexer.options && this.lexer.options.ranges;

    if (typeof this.yy.parseError === 'function')
        this.parseError = this.yy.parseError;

    function popStack (n) {
        stack.length = stack.length - 2*n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }

    function lex() {
        var token;
        token = self.lexer.lex() || 1; // $end = 1
        // if token isn't its numeric value, convert
        if (typeof token !== 'number') {
            token = self.symbols_[token] || token;
        }
        return token;
    }

    var symbol, preErrorSymbol, state, action, a, r, yyval={},p,len,newState, expected;
    while (true) {
        // retreive state number from top of stack
        state = stack[stack.length-1];

        // use default actions if available
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == 'undefined') {
                symbol = lex();
            }
            // read action for current state and first input
            action = table[state] && table[state][symbol];
        }

        // handle parse error
        _handle_error:
        if (typeof action === 'undefined' || !action.length || !action[0]) {

            var errStr = '';
            if (!recovering) {
                // Report error
                expected = [];
                for (p in table[state]) if (this.terminals_[p] && p > 2) {
                    expected.push("'"+this.terminals_[p]+"'");
                }
                if (this.lexer.showPosition) {
                    errStr = 'Parse error on line '+(yylineno+1)+":\n"+this.lexer.showPosition()+"\nExpecting "+expected.join(', ') + ", got '" + (this.terminals_[symbol] || symbol)+ "'";
                } else {
                    errStr = 'Parse error on line '+(yylineno+1)+": Unexpected " +
                                  (symbol == 1 /*EOF*/ ? "end of input" :
                                              ("'"+(this.terminals_[symbol] || symbol)+"'"));
                }
                this.parseError(errStr,
                    {text: this.lexer.match, token: this.terminals_[symbol] || symbol, line: this.lexer.yylineno, loc: yyloc, expected: expected});
            }

            // just recovered from another error
            if (recovering == 3) {
                if (symbol == EOF) {
                    throw new Error(errStr || 'Parsing halted.');
                }

                // discard current lookahead and grab another
                yyleng = this.lexer.yyleng;
                yytext = this.lexer.yytext;
                yylineno = this.lexer.yylineno;
                yyloc = this.lexer.yylloc;
                symbol = lex();
            }

            // try to recover from error
            while (1) {
                // check for error recovery rule in this state
                if ((TERROR.toString()) in table[state]) {
                    break;
                }
                if (state === 0) {
                    throw new Error(errStr || 'Parsing halted.');
                }
                popStack(1);
                state = stack[stack.length-1];
            }

            preErrorSymbol = symbol == 2 ? null : symbol; // save the lookahead token
            symbol = TERROR;         // insert generic error symbol as new lookahead
            state = stack[stack.length-1];
            action = table[state] && table[state][TERROR];
            recovering = 3; // allow 3 real symbols to be shifted before reporting a new error
        }

        // this shouldn't happen, unless resolve defaults are off
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: '+state+', token: '+symbol);
        }

        switch (action[0]) {

            case 1: // shift
                //this.shiftCount++;

                stack.push(symbol);
                vstack.push(this.lexer.yytext);
                lstack.push(this.lexer.yylloc);
                stack.push(action[1]); // push state
                symbol = null;
                if (!preErrorSymbol) { // normal execution/no error
                    yyleng = this.lexer.yyleng;
                    yytext = this.lexer.yytext;
                    yylineno = this.lexer.yylineno;
                    yyloc = this.lexer.yylloc;
                    if (recovering > 0)
                        recovering--;
                } else { // error just occurred, resume old lookahead f/ before error
                    symbol = preErrorSymbol;
                    preErrorSymbol = null;
                }
                break;

            case 2: // reduce
                //this.reductionCount++;

                len = this.productions_[action[1]][1];

                // perform semantic action
                yyval.$ = vstack[vstack.length-len]; // default to $$ = $1
                // default location, uses first token for firsts, last for lasts
                yyval._$ = {
                    first_line: lstack[lstack.length-(len||1)].first_line,
                    last_line: lstack[lstack.length-1].last_line,
                    first_column: lstack[lstack.length-(len||1)].first_column,
                    last_column: lstack[lstack.length-1].last_column
                };
                if (ranges) {
                  yyval._$.range = [lstack[lstack.length-(len||1)].range[0], lstack[lstack.length-1].range[1]];
                }
                r = this.performAction.call(yyval, yytext, yyleng, yylineno, this.yy, action[1], vstack, lstack);

                if (typeof r !== 'undefined') {
                    return r;
                }

                // pop off stack
                if (len) {
                    stack = stack.slice(0,-1*len*2);
                    vstack = vstack.slice(0, -1*len);
                    lstack = lstack.slice(0, -1*len);
                }

                stack.push(this.productions_[action[1]][0]);    // push nonterminal (reduce)
                vstack.push(yyval.$);
                lstack.push(yyval._$);
                // goto new state = table[STATE][NONTERMINAL]
                newState = table[stack[stack.length-2]][stack[stack.length-1]];
                stack.push(newState);
                break;

            case 3: // accept
                return true;
        }

    }

    return true;
}};
/* Jison generated lexer */
var lexer = (function(){
var lexer = ({EOF:1,
parseError:function parseError(str, hash) {
        if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },
setInput:function (input) {
        this._input = input;
        this._more = this._less = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {first_line:1,first_column:0,last_line:1,last_column:0};
        if (this.options.ranges) this.yylloc.range = [0,0];
        this.offset = 0;
        return this;
    },
input:function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno++;
            this.yylloc.last_line++;
        } else {
            this.yylloc.last_column++;
        }
        if (this.options.ranges) this.yylloc.range[1]++;

        this._input = this._input.slice(1);
        return ch;
    },
unput:function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length-len-1);
        //this.yyleng -= len;
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length-1);
        this.matched = this.matched.substr(0, this.matched.length-1);

        if (lines.length-1) this.yylineno -= lines.length-1;
        var r = this.yylloc.range;

        this.yylloc = {first_line: this.yylloc.first_line,
          last_line: this.yylineno+1,
          first_column: this.yylloc.first_column,
          last_column: lines ?
              (lines.length === oldLines.length ? this.yylloc.first_column : 0) + oldLines[oldLines.length - lines.length].length - lines[0].length:
              this.yylloc.first_column - len
          };

        if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        return this;
    },
more:function () {
        this._more = true;
        return this;
    },
less:function (n) {
        this.unput(this.match.slice(n));
    },
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20)+(next.length > 20 ? '...':'')).replace(/\n/g, "");
    },
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c+"^";
    },
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) this.done = true;

        var token,
            match,
            tempMatch,
            index,
            col,
            lines;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i=0;i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (!this.options.flex) break;
            }
        }
        if (match) {
            lines = match[0].match(/(?:\r\n?|\n).*/g);
            if (lines) this.yylineno += lines.length;
            this.yylloc = {first_line: this.yylloc.last_line,
                           last_line: this.yylineno+1,
                           first_column: this.yylloc.last_column,
                           last_column: lines ? lines[lines.length-1].length-lines[lines.length-1].match(/\r?\n?/)[0].length : this.yylloc.last_column + match[0].length};
            this.yytext += match[0];
            this.match += match[0];
            this.matches = match;
            this.yyleng = this.yytext.length;
            if (this.options.ranges) {
                this.yylloc.range = [this.offset, this.offset += this.yyleng];
            }
            this._more = false;
            this._input = this._input.slice(match[0].length);
            this.matched += match[0];
            token = this.performAction.call(this, this.yy, this, rules[index],this.conditionStack[this.conditionStack.length-1]);
            if (this.done && this._input) this.done = false;
            if (token) return token;
            else return;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            return this.parseError('Lexical error on line '+(this.yylineno+1)+'. Unrecognized text.\n'+this.showPosition(),
                    {text: "", token: null, line: this.yylineno});
        }
    },
lex:function lex() {
        var r = this.next();
        if (typeof r !== 'undefined') {
            return r;
        } else {
            return this.lex();
        }
    },
begin:function begin(condition) {
        this.conditionStack.push(condition);
    },
popState:function popState() {
        return this.conditionStack.pop();
    },
_currentRules:function _currentRules() {
        return this.conditions[this.conditionStack[this.conditionStack.length-1]].rules;
    },
topState:function () {
        return this.conditionStack[this.conditionStack.length-2];
    },
pushState:function begin(condition) {
        this.begin(condition);
    }});
lexer.options = {};
lexer.performAction = function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {

var YYSTATE=YY_START
switch($avoiding_name_collisions) {
case 0:  
break;
case 1: yy.comment_depth=1; this.begin('COMMENT'); 
break;
case 2:
    yy.error_msg = "Unmatched *)";
    return 'ERROR';

break;
case 3: yy.comment_depth++; 
break;
case 4:
        if (--yy.comment_depth == 0){
                this.begin('INITIAL');
				
	    }

break;
case 5: /*curr_lineno++;*/ 
break;
case 6:
break;
case 7:
    this.begin('INITIAL');
    yy.error_msg = "EOF in comment";
    return 'ERROR';

break;
case 8: 
break;
case 9: return 'DARROW'; 
break;
case 10: return 35; 
break;
case 11: return 20; 
break;
case 12:return 6
break;
case 13:return 18
break;
case 14:return 23
break;
case 15:return 26
break;
case 16:return '@'
break;
case 17:return 33
break;
case 18:return 34
break;
case 19:return 36
break;
case 20:return 30
break;
case 21:return 29
break;
case 22:return 31
break;
case 23:return 32
break;
case 24:return 10
break;
case 25:return 11
break;
case 26:return 16
break;
case 27:return 17
break;
case 28: return 8; 
break;
case 29: return 'ELSE'; 
break;
case 30: return 'FI'; 
break;
case 31: return 'IF'; 
break;
case 32: return 25; 
break;
case 33: return 12; 
break;
case 34: return 28; 
break;
case 35: return 'LET'; 
break;
case 36: return 'LOOP'; 
break;
case 37: return 'POOL'; 
break;
case 38: return 'THEN'; 
break;
case 39: return 'WHILE'; 
break;
case 40: return 'CASE'; 
break;
case 41: return 'ESAC'; 
break;
case 42: return 27; 
break;
case 43: return 'OF'; 
break;
case 44: return 37; 
break;
case 45: return 40; 
break;
case 46: return 40; 
break;
case 47: return 15; 
break;
case 48: return 9; 
break;
case 49:return 38;
break;
case 50:
    this.begin("STRING");
         yy.buff="";
		 yy.string_overflow = false;
		 yy.string_contains_null = false;

break;
case 51:
         if(yy.buff.length>=1024) yy.string_overflow=true;
		 else yy.buff+='"';

break;
case 52:
         if(yy.buff.length>=1024) yy.string_overflow=true;
		 yy.buff+="\n";

break;
case 53:
        this.begin("INITIAL");
		if(yy.string_contains_null) yy.error_msg="String contains null chars";
		else yy.error_msg ="Unterminated string constant";
        return 'ERROR';		

break;
case 54:
       if(yy.buff.length>=1024) yy.string_overflow=true;
		else yy.buff+="\b";

break;
case 55:
        if(yy.buff.length>=1024) yy.string_overflow=true;
		else yy.buff+="\t";

break;
case 56:
        if(yy.buff.length>=1024) yy.string_overflow=true;
		else yy.buff+="\n";

break;
case 57:
        if(yy.buff.length>=1024) yy.string_overflow=true;
		else yy.buff+="\f";

break;
case 58:
        if(yy.buff.length>=1024) yy.string_overflow=true;
		else yy.buff+=yy_.yytext[1];

break;
case 59:
    this.begin("INITIAL");
	if(yy.string_constains_null) { yy.error_msg="String contains null char"; return 'ERROR'}
	if(yy.string_overflow) { yy.error_msg="String too long";return 'ERROR'; }
	
	yy_.yytext=yy.buff;
    return 'STR_CONST';

break;
case 60:
     yy.string_contains_null=true;
	 if(yy.buff.length>=1024) yy.string_overflow=true;
	 else yy.buff+=yy_.yytext[0];

break;
case 61:
    this.begin("INITIAL");
	yy.error_msg="EOF in string constant";
	return 'ERROR';

break;
case 62:
      if(yy.buff.length>=1024) yy.string_overflow=true;
	  else yy.buff+=yy_.yytext[0];

break;
case 63:
break;
case 64:
break;
case 65:return 7
break;
case 66:return 'INVALID'
break;
}
};
lexer.rules = [/^(?:(--.*))/,/^(?:(\(\*))/,/^(?:(\*\)))/,/^(?:(\(\*))/,/^(?:(\*\)))/,/^(?:(\n\b))/,/^(?:([\s\f\t\v\r]))/,/^(?:$)/,/^(?:.)/,/^(?:(=>))/,/^(?:(<=))/,/^(?:(<-))/,/^(?:;)/,/^(?::)/,/^(?:,)/,/^(?:\.)/,/^(?:@)/,/^(?:~)/,/^(?:<)/,/^(?:=)/,/^(?:-)/,/^(?:\+)/,/^(?:\*)/,/^(?:\/)/,/^(?:\{)/,/^(?:\})/,/^(?:\()/,/^(?:\))/,/^(?:(class\b))/,/^(?:(else\b))/,/^(?:(fi\b))/,/^(?:(if\b))/,/^(?:(in\b))/,/^(?:(inherits\b))/,/^(?:(isvoid\b))/,/^(?:(let\b))/,/^(?:(loop\b))/,/^(?:(pool\b))/,/^(?:(then\b))/,/^(?:(while\b))/,/^(?:(case\b))/,/^(?:(esac\b))/,/^(?:(new\b))/,/^(?:(of\b))/,/^(?:(not\b))/,/^(?:(true\b))/,/^(?:(false\b))/,/^(?:(([a-z])([A-Za-z0-9_])*))/,/^(?:(([A-Z])([A-Za-z0-9_])*))/,/^(?:(([0-9])+))/,/^(?:")/,/^(?:\\")/,/^(?:\\(\n\b))/,/^(?:(\n\b))/,/^(?:\\b)/,/^(?:\\t\b)/,/^(?:\\n\b)/,/^(?:\\f\b)/,/^(?:\\.)/,/^(?:")/,/^(?:\0)/,/^(?:$)/,/^(?:.)/,/^(?:([\s\f\t\v\r])+)/,/^(?:(\n\b))/,/^(?:$)/,/^(?:.)/];
lexer.conditions = {"STRING":{"rules":[51,52,53,54,55,56,57,58,59,60,61,62],"inclusive":false},"COMMENT":{"rules":[3,4,5,6,7,8],"inclusive":false},"INITIAL":{"rules":[0,1,2,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,63,64,65,66],"inclusive":true}};
return lexer;})()
parser.lexer = lexer;
function Parser () { this.yy = {}; }Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})();
if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
exports.parser = cool;
exports.Parser = cool.Parser;
exports.parse = function () { return cool.parse.apply(cool, arguments); }
exports.main = function commonjsMain(args) {
    if (!args[1])
        throw new Error('Usage: '+args[0]+' FILE');
    var source, cwd;
    if (typeof process !== 'undefined') {
        source = require('fs').readFileSync(require('path').resolve(args[1]), "utf8");
    } else {
        source = require("file").path(require("file").cwd()).join(args[1]).read({charset: "utf-8"});
    }
    return exports.parser.parse(source);
}
if (typeof module !== 'undefined' && require.main === module) {
  exports.main(typeof process !== 'undefined' ? process.argv.slice(1) : require("system").args);
}
}