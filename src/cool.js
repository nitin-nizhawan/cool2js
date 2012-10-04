/* Jison generated parser */
var cool = (function(){
var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"Program":3,"class_list":4,"class":5,";":6,"EOF":7,"CLASS":8,"TYPEID":9,"{":10,"}":11,"INHERITS":12,"feature_list":13,"feature":14,"OBJECTID":15,"(":16,")":17,":":18,"expr":19,"formal_list":20,"ASSIGN":21,"formal":22,",":23,"expr_semicolon_list":24,"expr_comma_list":25,"case_list":26,"case":27,"DARROW":28,"let_expr":29,"let_list":30,"IN":31,"let_item":32,".":33,"IF":34,"THEN":35,"ELSE":36,"FI":37,"WHILE":38,"LOOP":39,"POOL":40,"LET":41,"CASE":42,"OF":43,"ESAC":44,"NEW":45,"ISVOID":46,"+":47,"-":48,"*":49,"/":50,"~":51,"<":52,"LE":53,"=":54,"NOT":55,"INT_CONST":56,"STR_CONST":57,"BOOL_CONST":58,"$accept":0,"$end":1},
terminals_: {2:"error",6:";",7:"EOF",8:"CLASS",9:"TYPEID",10:"{",11:"}",12:"INHERITS",15:"OBJECTID",16:"(",17:")",18:":",21:"ASSIGN",23:",",28:"DARROW",31:"IN",33:".",34:"IF",35:"THEN",36:"ELSE",37:"FI",38:"WHILE",39:"LOOP",40:"POOL",41:"LET",42:"CASE",43:"OF",44:"ESAC",45:"NEW",46:"ISVOID",47:"+",48:"-",49:"*",50:"/",51:"~",52:"<",53:"LE",54:"=",55:"NOT",56:"INT_CONST",57:"STR_CONST",58:"BOOL_CONST"},
productions_: [0,[3,1],[4,2],[4,3],[4,2],[5,4],[5,6],[5,5],[5,7],[13,2],[13,3],[13,3],[14,8],[14,9],[14,3],[14,5],[20,1],[20,3],[22,3],[24,2],[24,3],[25,1],[25,3],[26,1],[26,2],[27,6],[29,3],[30,1],[30,3],[32,3],[32,5],[19,3],[19,5],[19,6],[19,3],[19,7],[19,5],[19,4],[19,3],[19,2],[19,5],[19,2],[19,2],[19,3],[19,3],[19,3],[19,3],[19,2],[19,3],[19,3],[19,3],[19,2],[19,3],[19,1],[19,1],[19,1],[19,1]],
performAction: function anonymous(yytext,yyleng,yylineno,yy,yystate,$$,_$) {

var $0 = $$.length - 1;
switch (yystate) {
case 1: 
	           this.$=$$[$0];
               var prgm = new yy.ds.CLProgram($$[$0]);
			   var visitor = new yy.ds.CLCodeGenVisitor("tmpns",prgm);
			   //prgm.accept(visitor);
			   visitor.codegen();
			   if(yy.debug){
			       yy.debug(visitor.out());
			   }
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
case 12:  this.$ = new yy.ds.CLMethod($$[$0-7],new yy.ds.CLFormalList(), $$[$0-3], $$[$0-1]); 
break;
case 13:  this.$ = new yy.ds.CLMethod($$[$0-8],$$[$0-6], $$[$0-3], $$[$0-1]); 
break;
case 14: this.$ = new yy.ds.CLAttr($$[$0-2],$$[$0],null); 
break;
case 15: this.$ = new yy.ds.CLAttr($$[$0-4],$$[$0-2],$$[$0]); 
break;
case 16: this.$ = new yy.ds.CLFormalList();this.$.append($$[$0]); 
break;
case 17: this.$= $$[$0-2]; $$[$0-2].append($$[$0]); 
break;
case 18: this.$ = new yy.ds.CLFormal($$[$0-2], $$[$0]); 
break;
case 19:  this.$ = new yy.ds.CLExprSemiColonList();this.$.append($$[$0-1]); 
break;
case 20:
       $$[$0-2].append($$[$0-1]); this.$ = $$[$0-2];//append_Expressions($$[$0-2], single_Expressions($$[$0-1]));
    
break;
case 21: this.$ = new yy.ds.CLExprCommaSepList();this.$.append($$[$0]); 
break;
case 22: $$[$0-2].append($$[$0]); this.$ = $$[$0-2]; 
break;
case 23: this.$ = new yy.ds.CLBranchList();this.$.append($$[$0]); 
break;
case 24: $$[$0-1].append($$[$0]);this.$ = $$[$0-1]; 
break;
case 25: this.$ = new yy.ds.CLBranch($$[$0-5], $$[$0-3], $$[$0-1]); 
break;
case 26: this.$ = new yy.ds.CLLetExpr($$[$0-2],$$[$0]); 
break;
case 27: this.$ = new yy.ds.CLLetList(); this.$.append($$[$0]); 
break;
case 28: $$[$0-2].append($$[$0]); this.$ = $$[$0-2]; 
break;
case 29: this.$ = new yy.ds.CLLetItem($$[$0-2],$$[$0],null); 
break;
case 30:this.$ = new yy.ds.CLLetItem($$[$0-4],$$[$0-2],$$[$0]); 
break;
case 31: this.$ = new yy.ds.CLAssign($$[$0-2], $$[$0]); 
break;
case 32: this.$ = new yy.ds.CLDispatch($$[$0-4], $$[$0-2], new yy.ds.CLExprSemiColonList()); 
break;
case 33: this.$ = new yy.ds.CLDispatch($$[$0-5], $$[$0-3], $$[$0-1]); 
break;
case 34: this.$ = new yy.ds.CLDispatch(new yy.ds.CLObject("self"),$$[$0-2],new yy.ds.CLExprSemiColonList()); 
break;
case 35: this.$ = new yy.ds.CLCond($$[$0-5], $$[$0-3], $$[$0-1]); 
break;
case 36: this.$ = new yy.ds.CLLoop($$[$0-3], $$[$0-1]); 
break;
case 37: this.$ = new yy.ds.CLDispatch(new yy.ds.CLObject("self"),$$[$0-3],$$[$0-1]); 
break;
case 38: this.$ = new yy.ds.CLBlock($$[$0-1]); 
break;
case 39: this.$ = $$[$0]; 
break;
case 40: this.$ = new yy.ds.CLCaseExpr($$[$0-3], $$[$0-1]); 
break;
case 41: this.$ = new yy.ds.CLNew($$[$0]); 
break;
case 42: this.$ = new yy.ds.CLIsvoid($$[$0]); 
break;
case 43: this.$ = new yy.ds.CLPlus($$[$0-2], $$[$0]); 
break;
case 44: this.$ = new yy.ds.CLSub($$[$0-2], $$[$0]); 
break;
case 45: this.$ = new yy.ds.CLMul($$[$0-2], $$[$0]); 
break;
case 46: this.$ = new yy.ds.CLDivide($$[$0-2], $$[$0]); 
break;
case 47: this.$ = new yy.ds.CLNeg($$[$0]); 
break;
case 48: this.$ = new yy.ds.CLLt($$[$0-2], $$[$0]); 
break;
case 49: this.$ = new yy.ds.CLLeq($$[$0-2], $$[$0]); 
break;
case 50: this.$ = new yy.ds.CLEq($$[$0-2], $$[$0]); 
break;
case 51: this.$ = new yy.ds.CLComp($$[$0]);  
break;
case 52: this.$ = $$[$0-1]; 
break;
case 53: this.$ = new yy.ds.CLObject($$[$0]); 
break;
case 54: this.$ = new yy.ds.CLIntConst($$[$0]); 
break;
case 55: this.$ = new yy.ds.CLStringConst($$[$0]); 
break;
case 56: this.$ = new yy.ds.CLBoolConst($$[$0]); 
break;
}
},
table: [{3:1,4:2,5:3,8:[1,4]},{1:[3]},{1:[2,1],5:5,7:[1,6],8:[1,4]},{6:[1,7]},{9:[1,8]},{6:[1,9]},{1:[2,4],7:[2,4],8:[2,4]},{1:[2,2],7:[2,2],8:[2,2]},{10:[1,10],12:[1,11]},{1:[2,3],7:[2,3],8:[2,3]},{11:[1,12],13:13,14:14,15:[1,15]},{9:[1,16]},{6:[2,5]},{2:[1,19],11:[1,17],14:18,15:[1,15]},{6:[1,20]},{16:[1,21],18:[1,22]},{10:[1,23]},{6:[2,7]},{6:[1,24]},{6:[1,25]},{2:[2,9],11:[2,9],15:[2,9]},{15:[1,29],17:[1,26],20:27,22:28},{9:[1,30]},{11:[1,31],13:32,14:14,15:[1,15]},{2:[2,10],11:[2,10],15:[2,10]},{2:[2,11],11:[2,11],15:[2,11]},{18:[1,33]},{17:[1,34],23:[1,35]},{17:[2,16],23:[2,16]},{18:[1,36]},{6:[2,14],21:[1,37]},{6:[2,6]},{2:[1,19],11:[1,38],14:18,15:[1,15]},{9:[1,39]},{18:[1,40]},{15:[1,29],22:41},{9:[1,42]},{10:[1,47],15:[1,44],16:[1,54],19:43,34:[1,45],38:[1,46],41:[1,48],42:[1,49],45:[1,50],46:[1,51],51:[1,52],55:[1,53],56:[1,55],57:[1,56],58:[1,57]},{6:[2,8]},{10:[1,58]},{9:[1,59]},{17:[2,17],23:[2,17]},{17:[2,18],23:[2,18]},{6:[2,15],33:[1,60],47:[1,61],48:[1,62],49:[1,63],50:[1,64],52:[1,65],53:[1,66],54:[1,67]},{6:[2,53],11:[2,53],16:[1,69],17:[2,53],21:[1,68],23:[2,53],31:[2,53],33:[2,53],35:[2,53],36:[2,53],37:[2,53],39:[2,53],40:[2,53],43:[2,53],47:[2,53],48:[2,53],49:[2,53],50:[2,53],52:[2,53],53:[2,53],54:[2,53]},{10:[1,47],15:[1,44],16:[1,54],19:70,34:[1,45],38:[1,46],41:[1,48],42:[1,49],45:[1,50],46:[1,51],51:[1,52],55:[1,53],56:[1,55],57:[1,56],58:[1,57]},{10:[1,47],15:[1,44],16:[1,54],19:71,34:[1,45],38:[1,46],41:[1,48],42:[1,49],45:[1,50],46:[1,51],51:[1,52],55:[1,53],56:[1,55],57:[1,56],58:[1,57]},{10:[1,47],15:[1,44],16:[1,54],19:73,24:72,34:[1,45],38:[1,46],41:[1,48],42:[1,49],45:[1,50],46:[1,51],51:[1,52],55:[1,53],56:[1,55],57:[1,56],58:[1,57]},{15:[1,77],29:74,30:75,32:76},{10:[1,47],15:[1,44],16:[1,54],19:78,34:[1,45],38:[1,46],41:[1,48],42:[1,49],45:[1,50],46:[1,51],51:[1,52],55:[1,53],56:[1,55],57:[1,56],58:[1,57]},{9:[1,79]},{10:[1,47],15:[1,44],16:[1,54],19:80,34:[1,45],38:[1,46],41:[1,48],42:[1,49],45:[1,50],46:[1,51],51:[1,52],55:[1,53],56:[1,55],57:[1,56],58:[1,57]},{10:[1,47],15:[1,44],16:[1,54],19:81,34:[1,45],38:[1,46],41:[1,48],42:[1,49],45:[1,50],46:[1,51],51:[1,52],55:[1,53],56:[1,55],57:[1,56],58:[1,57]},{10:[1,47],15:[1,44],16:[1,54],19:82,34:[1,45],38:[1,46],41:[1,48],42:[1,49],45:[1,50],46:[1,51],51:[1,52],55:[1,53],56:[1,55],57:[1,56],58:[1,57]},{10:[1,47],15:[1,44],16:[1,54],19:83,34:[1,45],38:[1,46],41:[1,48],42:[1,49],45:[1,50],46:[1,51],51:[1,52],55:[1,53],56:[1,55],57:[1,56],58:[1,57]},{6:[2,54],11:[2,54],17:[2,54],23:[2,54],31:[2,54],33:[2,54],35:[2,54],36:[2,54],37:[2,54],39:[2,54],40:[2,54],43:[2,54],47:[2,54],48:[2,54],49:[2,54],50:[2,54],52:[2,54],53:[2,54],54:[2,54]},{6:[2,55],11:[2,55],17:[2,55],23:[2,55],31:[2,55],33:[2,55],35:[2,55],36:[2,55],37:[2,55],39:[2,55],40:[2,55],43:[2,55],47:[2,55],48:[2,55],49:[2,55],50:[2,55],52:[2,55],53:[2,55],54:[2,55]},{6:[2,56],11:[2,56],17:[2,56],23:[2,56],31:[2,56],33:[2,56],35:[2,56],36:[2,56],37:[2,56],39:[2,56],40:[2,56],43:[2,56],47:[2,56],48:[2,56],49:[2,56],50:[2,56],52:[2,56],53:[2,56],54:[2,56]},{10:[1,47],15:[1,44],16:[1,54],19:84,34:[1,45],38:[1,46],41:[1,48],42:[1,49],45:[1,50],46:[1,51],51:[1,52],55:[1,53],56:[1,55],57:[1,56],58:[1,57]},{10:[1,85]},{15:[1,86]},{10:[1,47],15:[1,44],16:[1,54],19:87,34:[1,45],38:[1,46],41:[1,48],42:[1,49],45:[1,50],46:[1,51],51:[1,52],55:[1,53],56:[1,55],57:[1,56],58:[1,57]},{10:[1,47],15:[1,44],16:[1,54],19:88,34:[1,45],38:[1,46],41:[1,48],42:[1,49],45:[1,50],46:[1,51],51:[1,52],55:[1,53],56:[1,55],57:[1,56],58:[1,57]},{10:[1,47],15:[1,44],16:[1,54],19:89,34:[1,45],38:[1,46],41:[1,48],42:[1,49],45:[1,50],46:[1,51],51:[1,52],55:[1,53],56:[1,55],57:[1,56],58:[1,57]},{10:[1,47],15:[1,44],16:[1,54],19:90,34:[1,45],38:[1,46],41:[1,48],42:[1,49],45:[1,50],46:[1,51],51:[1,52],55:[1,53],56:[1,55],57:[1,56],58:[1,57]},{10:[1,47],15:[1,44],16:[1,54],19:91,34:[1,45],38:[1,46],41:[1,48],42:[1,49],45:[1,50],46:[1,51],51:[1,52],55:[1,53],56:[1,55],57:[1,56],58:[1,57]},{10:[1,47],15:[1,44],16:[1,54],19:92,34:[1,45],38:[1,46],41:[1,48],42:[1,49],45:[1,50],46:[1,51],51:[1,52],55:[1,53],56:[1,55],57:[1,56],58:[1,57]},{10:[1,47],15:[1,44],16:[1,54],19:93,34:[1,45],38:[1,46],41:[1,48],42:[1,49],45:[1,50],46:[1,51],51:[1,52],55:[1,53],56:[1,55],57:[1,56],58:[1,57]},{10:[1,47],15:[1,44],16:[1,54],19:94,34:[1,45],38:[1,46],41:[1,48],42:[1,49],45:[1,50],46:[1,51],51:[1,52],55:[1,53],56:[1,55],57:[1,56],58:[1,57]},{10:[1,47],15:[1,44],16:[1,54],17:[1,95],19:97,25:96,34:[1,45],38:[1,46],41:[1,48],42:[1,49],45:[1,50],46:[1,51],51:[1,52],55:[1,53],56:[1,55],57:[1,56],58:[1,57]},{33:[1,60],35:[1,98],47:[1,61],48:[1,62],49:[1,63],50:[1,64],52:[1,65],53:[1,66],54:[1,67]},{33:[1,60],39:[1,99],47:[1,61],48:[1,62],49:[1,63],50:[1,64],52:[1,65],53:[1,66],54:[1,67]},{10:[1,47],11:[1,100],15:[1,44],16:[1,54],19:101,34:[1,45],38:[1,46],41:[1,48],42:[1,49],45:[1,50],46:[1,51],51:[1,52],55:[1,53],56:[1,55],57:[1,56],58:[1,57]},{6:[1,102],33:[1,60],47:[1,61],48:[1,62],49:[1,63],50:[1,64],52:[1,65],53:[1,66],54:[1,67]},{6:[2,39],11:[2,39],17:[2,39],23:[2,39],31:[2,39],33:[2,39],35:[2,39],36:[2,39],37:[2,39],39:[2,39],40:[2,39],43:[2,39],47:[2,39],48:[2,39],49:[2,39],50:[2,39],52:[2,39],53:[2,39],54:[2,39]},{23:[1,104],31:[1,103]},{23:[2,27],31:[2,27]},{18:[1,105]},{33:[1,60],43:[1,106],47:[1,61],48:[1,62],49:[1,63],50:[1,64],52:[1,65],53:[1,66],54:[1,67]},{6:[2,41],11:[2,41],17:[2,41],23:[2,41],31:[2,41],33:[2,41],35:[2,41],36:[2,41],37:[2,41],39:[2,41],40:[2,41],43:[2,41],47:[2,41],48:[2,41],49:[2,41],50:[2,41],52:[2,41],53:[2,41],54:[2,41]},{6:[2,42],11:[2,42],17:[2,42],23:[2,42],31:[2,42],33:[1,60],35:[2,42],36:[2,42],37:[2,42],39:[2,42],40:[2,42],43:[2,42],47:[2,42],48:[2,42],49:[2,42],50:[2,42],52:[2,42],53:[2,42],54:[2,42]},{6:[2,47],11:[2,47],17:[2,47],23:[2,47],31:[2,47],33:[1,60],35:[2,47],36:[2,47],37:[2,47],39:[2,47],40:[2,47],43:[2,47],47:[2,47],48:[2,47],49:[2,47],50:[2,47],52:[2,47],53:[2,47],54:[2,47]},{6:[2,51],11:[2,51],17:[2,51],23:[2,51],31:[2,51],33:[1,60],35:[2,51],36:[2,51],37:[2,51],39:[2,51],40:[2,51],43:[2,51],47:[1,61],48:[1,62],49:[1,63],50:[1,64],52:[1,65],53:[1,66],54:[1,67]},{17:[1,107],33:[1,60],47:[1,61],48:[1,62],49:[1,63],50:[1,64],52:[1,65],53:[1,66],54:[1,67]},{11:[1,108],33:[1,60],47:[1,61],48:[1,62],49:[1,63],50:[1,64],52:[1,65],53:[1,66],54:[1,67]},{10:[1,47],15:[1,44],16:[1,54],19:109,34:[1,45],38:[1,46],41:[1,48],42:[1,49],45:[1,50],46:[1,51],51:[1,52],55:[1,53],56:[1,55],57:[1,56],58:[1,57]},{16:[1,110]},{6:[2,43],11:[2,43],17:[2,43],23:[2,43],31:[2,43],33:[1,60],35:[2,43],36:[2,43],37:[2,43],39:[2,43],40:[2,43],43:[2,43],47:[2,43],48:[2,43],49:[1,63],50:[1,64],52:[2,43],53:[2,43],54:[2,43]},{6:[2,44],11:[2,44],17:[2,44],23:[2,44],31:[2,44],33:[1,60],35:[2,44],36:[2,44],37:[2,44],39:[2,44],40:[2,44],43:[2,44],47:[2,44],48:[2,44],49:[1,63],50:[1,64],52:[2,44],53:[2,44],54:[2,44]},{6:[2,45],11:[2,45],17:[2,45],23:[2,45],31:[2,45],33:[1,60],35:[2,45],36:[2,45],37:[2,45],39:[2,45],40:[2,45],43:[2,45],47:[2,45],48:[2,45],49:[2,45],50:[2,45],52:[2,45],53:[2,45],54:[2,45]},{6:[2,46],11:[2,46],17:[2,46],23:[2,46],31:[2,46],33:[1,60],35:[2,46],36:[2,46],37:[2,46],39:[2,46],40:[2,46],43:[2,46],47:[2,46],48:[2,46],49:[2,46],50:[2,46],52:[2,46],53:[2,46],54:[2,46]},{6:[2,48],11:[2,48],17:[2,48],23:[2,48],31:[2,48],33:[1,60],35:[2,48],36:[2,48],37:[2,48],39:[2,48],40:[2,48],43:[2,48],47:[1,61],48:[1,62],49:[1,63],50:[1,64],52:[2,48],53:[2,48],54:[2,48]},{6:[2,49],11:[2,49],17:[2,49],23:[2,49],31:[2,49],33:[1,60],35:[2,49],36:[2,49],37:[2,49],39:[2,49],40:[2,49],43:[2,49],47:[1,61],48:[1,62],49:[1,63],50:[1,64],52:[2,49],53:[2,49],54:[2,49]},{6:[2,50],11:[2,50],17:[2,50],23:[2,50],31:[2,50],33:[1,60],35:[2,50],36:[2,50],37:[2,50],39:[2,50],40:[2,50],43:[2,50],47:[1,61],48:[1,62],49:[1,63],50:[1,64],52:[2,50],53:[2,50],54:[2,50]},{6:[2,31],11:[2,31],17:[2,31],23:[2,31],31:[2,31],33:[1,60],35:[2,31],36:[2,31],37:[2,31],39:[2,31],40:[2,31],43:[2,31],47:[1,61],48:[1,62],49:[1,63],50:[1,64],52:[1,65],53:[1,66],54:[1,67]},{6:[2,34],11:[2,34],17:[2,34],23:[2,34],31:[2,34],33:[2,34],35:[2,34],36:[2,34],37:[2,34],39:[2,34],40:[2,34],43:[2,34],47:[2,34],48:[2,34],49:[2,34],50:[2,34],52:[2,34],53:[2,34],54:[2,34]},{17:[1,111],23:[1,112]},{17:[2,21],23:[2,21],33:[1,60],47:[1,61],48:[1,62],49:[1,63],50:[1,64],52:[1,65],53:[1,66],54:[1,67]},{10:[1,47],15:[1,44],16:[1,54],19:113,34:[1,45],38:[1,46],41:[1,48],42:[1,49],45:[1,50],46:[1,51],51:[1,52],55:[1,53],56:[1,55],57:[1,56],58:[1,57]},{10:[1,47],15:[1,44],16:[1,54],19:114,34:[1,45],38:[1,46],41:[1,48],42:[1,49],45:[1,50],46:[1,51],51:[1,52],55:[1,53],56:[1,55],57:[1,56],58:[1,57]},{6:[2,38],11:[2,38],17:[2,38],23:[2,38],31:[2,38],33:[2,38],35:[2,38],36:[2,38],37:[2,38],39:[2,38],40:[2,38],43:[2,38],47:[2,38],48:[2,38],49:[2,38],50:[2,38],52:[2,38],53:[2,38],54:[2,38]},{6:[1,115],33:[1,60],47:[1,61],48:[1,62],49:[1,63],50:[1,64],52:[1,65],53:[1,66],54:[1,67]},{10:[2,19],11:[2,19],15:[2,19],16:[2,19],34:[2,19],38:[2,19],41:[2,19],42:[2,19],45:[2,19],46:[2,19],51:[2,19],55:[2,19],56:[2,19],57:[2,19],58:[2,19]},{10:[1,47],15:[1,44],16:[1,54],19:116,34:[1,45],38:[1,46],41:[1,48],42:[1,49],45:[1,50],46:[1,51],51:[1,52],55:[1,53],56:[1,55],57:[1,56],58:[1,57]},{15:[1,77],32:117},{9:[1,118]},{15:[1,121],26:119,27:120},{6:[2,52],11:[2,52],17:[2,52],23:[2,52],31:[2,52],33:[2,52],35:[2,52],36:[2,52],37:[2,52],39:[2,52],40:[2,52],43:[2,52],47:[2,52],48:[2,52],49:[2,52],50:[2,52],52:[2,52],53:[2,52],54:[2,52]},{6:[2,12]},{11:[1,122],33:[1,60],47:[1,61],48:[1,62],49:[1,63],50:[1,64],52:[1,65],53:[1,66],54:[1,67]},{10:[1,47],15:[1,44],16:[1,54],17:[1,123],19:97,25:124,34:[1,45],38:[1,46],41:[1,48],42:[1,49],45:[1,50],46:[1,51],51:[1,52],55:[1,53],56:[1,55],57:[1,56],58:[1,57]},{6:[2,37],11:[2,37],17:[2,37],23:[2,37],31:[2,37],33:[2,37],35:[2,37],36:[2,37],37:[2,37],39:[2,37],40:[2,37],43:[2,37],47:[2,37],48:[2,37],49:[2,37],50:[2,37],52:[2,37],53:[2,37],54:[2,37]},{10:[1,47],15:[1,44],16:[1,54],19:125,34:[1,45],38:[1,46],41:[1,48],42:[1,49],45:[1,50],46:[1,51],51:[1,52],55:[1,53],56:[1,55],57:[1,56],58:[1,57]},{33:[1,60],36:[1,126],47:[1,61],48:[1,62],49:[1,63],50:[1,64],52:[1,65],53:[1,66],54:[1,67]},{33:[1,60],40:[1,127],47:[1,61],48:[1,62],49:[1,63],50:[1,64],52:[1,65],53:[1,66],54:[1,67]},{10:[2,20],11:[2,20],15:[2,20],16:[2,20],34:[2,20],38:[2,20],41:[2,20],42:[2,20],45:[2,20],46:[2,20],51:[2,20],55:[2,20],56:[2,20],57:[2,20],58:[2,20]},{6:[2,26],11:[2,26],17:[2,26],23:[2,26],31:[2,26],33:[1,60],35:[2,26],36:[2,26],37:[2,26],39:[2,26],40:[2,26],43:[2,26],47:[1,61],48:[1,62],49:[1,63],50:[1,64],52:[1,65],53:[1,66],54:[1,67]},{23:[2,28],31:[2,28]},{21:[1,128],23:[2,29],31:[2,29]},{15:[1,121],27:130,44:[1,129]},{15:[2,23],44:[2,23]},{18:[1,131]},{6:[2,13]},{6:[2,32],11:[2,32],17:[2,32],23:[2,32],31:[2,32],33:[2,32],35:[2,32],36:[2,32],37:[2,32],39:[2,32],40:[2,32],43:[2,32],47:[2,32],48:[2,32],49:[2,32],50:[2,32],52:[2,32],53:[2,32],54:[2,32]},{17:[1,132],23:[1,112]},{17:[2,22],23:[2,22],33:[1,60],47:[1,61],48:[1,62],49:[1,63],50:[1,64],52:[1,65],53:[1,66],54:[1,67]},{10:[1,47],15:[1,44],16:[1,54],19:133,34:[1,45],38:[1,46],41:[1,48],42:[1,49],45:[1,50],46:[1,51],51:[1,52],55:[1,53],56:[1,55],57:[1,56],58:[1,57]},{6:[2,36],11:[2,36],17:[2,36],23:[2,36],31:[2,36],33:[2,36],35:[2,36],36:[2,36],37:[2,36],39:[2,36],40:[2,36],43:[2,36],47:[2,36],48:[2,36],49:[2,36],50:[2,36],52:[2,36],53:[2,36],54:[2,36]},{10:[1,47],15:[1,44],16:[1,54],19:134,34:[1,45],38:[1,46],41:[1,48],42:[1,49],45:[1,50],46:[1,51],51:[1,52],55:[1,53],56:[1,55],57:[1,56],58:[1,57]},{6:[2,40],11:[2,40],17:[2,40],23:[2,40],31:[2,40],33:[2,40],35:[2,40],36:[2,40],37:[2,40],39:[2,40],40:[2,40],43:[2,40],47:[2,40],48:[2,40],49:[2,40],50:[2,40],52:[2,40],53:[2,40],54:[2,40]},{15:[2,24],44:[2,24]},{9:[1,135]},{6:[2,33],11:[2,33],17:[2,33],23:[2,33],31:[2,33],33:[2,33],35:[2,33],36:[2,33],37:[2,33],39:[2,33],40:[2,33],43:[2,33],47:[2,33],48:[2,33],49:[2,33],50:[2,33],52:[2,33],53:[2,33],54:[2,33]},{33:[1,60],37:[1,136],47:[1,61],48:[1,62],49:[1,63],50:[1,64],52:[1,65],53:[1,66],54:[1,67]},{23:[2,30],31:[2,30],33:[1,60],47:[1,61],48:[1,62],49:[1,63],50:[1,64],52:[1,65],53:[1,66],54:[1,67]},{28:[1,137]},{6:[2,35],11:[2,35],17:[2,35],23:[2,35],31:[2,35],33:[2,35],35:[2,35],36:[2,35],37:[2,35],39:[2,35],40:[2,35],43:[2,35],47:[2,35],48:[2,35],49:[2,35],50:[2,35],52:[2,35],53:[2,35],54:[2,35]},{10:[1,47],15:[1,44],16:[1,54],19:138,34:[1,45],38:[1,46],41:[1,48],42:[1,49],45:[1,50],46:[1,51],51:[1,52],55:[1,53],56:[1,55],57:[1,56],58:[1,57]},{6:[1,139],33:[1,60],47:[1,61],48:[1,62],49:[1,63],50:[1,64],52:[1,65],53:[1,66],54:[1,67]},{15:[2,25],44:[2,25]}],
defaultActions: {12:[2,5],17:[2,7],31:[2,6],38:[2,8],108:[2,12],122:[2,13]},
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
case 9: return 28; 
break;
case 10: return 53; 
break;
case 11: return 21; 
break;
case 12:return 6
break;
case 13:return 18
break;
case 14:return 23
break;
case 15:return 33
break;
case 16:return '@'
break;
case 17:return 51
break;
case 18:return 52
break;
case 19:return 54
break;
case 20:return 48
break;
case 21:return 47
break;
case 22:return 49
break;
case 23:return 50
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
case 29: return 36; 
break;
case 30: return 37; 
break;
case 31: return 34; 
break;
case 32: return 31; 
break;
case 33: return 12; 
break;
case 34: return 46; 
break;
case 35: return 41; 
break;
case 36: return 39; 
break;
case 37: return 40; 
break;
case 38: return 35; 
break;
case 39: return 38; 
break;
case 40: return 42; 
break;
case 41: return 44; 
break;
case 42: return 45; 
break;
case 43: return 43; 
break;
case 44: return 55; 
break;
case 45: return 58; 
break;
case 46: return 58; 
break;
case 47: return 15; 
break;
case 48: return 9; 
break;
case 49:return 56;
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
		else yy.buff+="\\b";

break;
case 55:
        if(yy.buff.length>=1024) yy.string_overflow=true;
		else yy.buff+="\\t";

break;
case 56:
        if(yy.buff.length>=1024) yy.string_overflow=true;
		else yy.buff+="\\n";

break;
case 57:
        if(yy.buff.length>=1024) yy.string_overflow=true;
		else yy.buff+="\\f";

break;
case 58:
        if(yy.buff.length>=1024) yy.string_overflow=true;
		else yy.buff+=yy_.yytext;

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