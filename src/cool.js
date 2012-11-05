/* Jison generated parser */
var cool = (function(){
var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"Program":3,"class_list":4,"class":5,";":6,"EOF":7,"CLASS":8,"TYPEID":9,"{":10,"}":11,"INHERITS":12,"feature_list":13,"feature":14,"OBJECTID":15,"(":16,")":17,":":18,"expr":19,"formal_list":20,"ASSIGN":21,"formal":22,",":23,"expr_semicolon_list":24,"expr_comma_list":25,"case_list":26,"case":27,"DARROW":28,"let_expr":29,"let_list":30,"IN":31,"let_item":32,"@":33,".":34,"IF":35,"THEN":36,"ELSE":37,"FI":38,"WHILE":39,"LOOP":40,"POOL":41,"LET":42,"CASE":43,"OF":44,"ESAC":45,"NEW":46,"ISVOID":47,"+":48,"-":49,"*":50,"/":51,"~":52,"<":53,"LE":54,"=":55,"NOT":56,"INT_CONST":57,"STR_CONST":58,"BOOL_CONST":59,"$accept":0,"$end":1},
terminals_: {2:"error",6:";",7:"EOF",8:"CLASS",9:"TYPEID",10:"{",11:"}",12:"INHERITS",15:"OBJECTID",16:"(",17:")",18:":",21:"ASSIGN",23:",",28:"DARROW",31:"IN",33:"@",34:".",35:"IF",36:"THEN",37:"ELSE",38:"FI",39:"WHILE",40:"LOOP",41:"POOL",42:"LET",43:"CASE",44:"OF",45:"ESAC",46:"NEW",47:"ISVOID",48:"+",49:"-",50:"*",51:"/",52:"~",53:"<",54:"LE",55:"=",56:"NOT",57:"INT_CONST",58:"STR_CONST",59:"BOOL_CONST"},
productions_: [0,[3,1],[4,2],[4,3],[4,2],[5,4],[5,6],[5,5],[5,7],[13,2],[13,3],[13,3],[14,8],[14,9],[14,3],[14,5],[20,1],[20,3],[22,3],[24,2],[24,3],[25,1],[25,3],[26,1],[26,2],[27,6],[29,3],[30,1],[30,3],[32,3],[32,5],[19,3],[19,7],[19,8],[19,5],[19,6],[19,3],[19,7],[19,5],[19,4],[19,3],[19,2],[19,5],[19,2],[19,2],[19,3],[19,3],[19,3],[19,3],[19,2],[19,3],[19,3],[19,3],[19,2],[19,3],[19,1],[19,1],[19,1],[19,1]],
performAction: function anonymous(yytext,yyleng,yylineno,yy,yystate,$$,_$) {

var $0 = $$.length - 1;
switch (yystate) {
case 1: 
	           this.$=$$[$0];
               var prgm = new yy.ds.CLProgram($$[$0]);
			   var sa = new yy.sa.CLSemanticAnalizer(prgm);
			   sa.check();
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
case 32: this.$ = new yy.ds.CLStaticDispatch($$[$0-6], $$[$0-4], $$[$0-2],  new yy.ds.CLExprSemiColonList()); 
break;
case 33: this.$ = new yy.ds.CLStaticDispatch($$[$0-7], $$[$0-5], $$[$0-3], $$[$0-1]); 
break;
case 34: this.$ = new yy.ds.CLDispatch($$[$0-4], $$[$0-2], new yy.ds.CLExprSemiColonList()); 
break;
case 35: this.$ = new yy.ds.CLDispatch($$[$0-5], $$[$0-3], $$[$0-1]); 
break;
case 36: this.$ = new yy.ds.CLDispatch(new yy.ds.CLObject("self"),$$[$0-2],new yy.ds.CLExprSemiColonList()); 
break;
case 37: this.$ = new yy.ds.CLCond($$[$0-5], $$[$0-3], $$[$0-1]); 
break;
case 38: this.$ = new yy.ds.CLLoop($$[$0-3], $$[$0-1]); 
break;
case 39: this.$ = new yy.ds.CLDispatch(new yy.ds.CLObject("self"),$$[$0-3],$$[$0-1]); 
break;
case 40: this.$ = new yy.ds.CLBlock($$[$0-1]); 
break;
case 41: this.$ = $$[$0]; 
break;
case 42: this.$ = new yy.ds.CLCaseExpr($$[$0-3], $$[$0-1]); 
break;
case 43: this.$ = new yy.ds.CLNew($$[$0]); 
break;
case 44: this.$ = new yy.ds.CLIsvoid($$[$0]); 
break;
case 45: this.$ = new yy.ds.CLPlus($$[$0-2], $$[$0]); 
break;
case 46: this.$ = new yy.ds.CLSub($$[$0-2], $$[$0]); 
break;
case 47: this.$ = new yy.ds.CLMul($$[$0-2], $$[$0]); 
break;
case 48: this.$ = new yy.ds.CLDivide($$[$0-2], $$[$0]); 
break;
case 49: this.$ = new yy.ds.CLNeg($$[$0]); 
break;
case 50: this.$ = new yy.ds.CLLt($$[$0-2], $$[$0]); 
break;
case 51: this.$ = new yy.ds.CLLeq($$[$0-2], $$[$0]); 
break;
case 52: this.$ = new yy.ds.CLEq($$[$0-2], $$[$0]); 
break;
case 53: this.$ = new yy.ds.CLComp($$[$0]);  
break;
case 54: this.$ = $$[$0-1]; 
break;
case 55: this.$ = new yy.ds.CLObject($$[$0]); 
break;
case 56: this.$ = new yy.ds.CLIntConst($$[$0]); 
break;
case 57: this.$ = new yy.ds.CLStringConst($$[$0]); 
break;
case 58: this.$ = new yy.ds.CLBoolConst($$[$0]); 
break;
}
},
table: [{3:1,4:2,5:3,8:[1,4]},{1:[3]},{1:[2,1],5:5,7:[1,6],8:[1,4]},{6:[1,7]},{9:[1,8]},{6:[1,9]},{1:[2,4],7:[2,4],8:[2,4]},{1:[2,2],7:[2,2],8:[2,2]},{10:[1,10],12:[1,11]},{1:[2,3],7:[2,3],8:[2,3]},{11:[1,12],13:13,14:14,15:[1,15]},{9:[1,16]},{6:[2,5]},{2:[1,19],11:[1,17],14:18,15:[1,15]},{6:[1,20]},{16:[1,21],18:[1,22]},{10:[1,23]},{6:[2,7]},{6:[1,24]},{6:[1,25]},{2:[2,9],11:[2,9],15:[2,9]},{15:[1,29],17:[1,26],20:27,22:28},{9:[1,30]},{11:[1,31],13:32,14:14,15:[1,15]},{2:[2,10],11:[2,10],15:[2,10]},{2:[2,11],11:[2,11],15:[2,11]},{18:[1,33]},{17:[1,34],23:[1,35]},{17:[2,16],23:[2,16]},{18:[1,36]},{6:[2,14],21:[1,37]},{6:[2,6]},{2:[1,19],11:[1,38],14:18,15:[1,15]},{9:[1,39]},{18:[1,40]},{15:[1,29],22:41},{9:[1,42]},{10:[1,47],15:[1,44],16:[1,54],19:43,35:[1,45],39:[1,46],42:[1,48],43:[1,49],46:[1,50],47:[1,51],52:[1,52],56:[1,53],57:[1,55],58:[1,56],59:[1,57]},{6:[2,8]},{10:[1,58]},{9:[1,59]},{17:[2,17],23:[2,17]},{17:[2,18],23:[2,18]},{6:[2,15],33:[1,60],34:[1,61],48:[1,62],49:[1,63],50:[1,64],51:[1,65],53:[1,66],54:[1,67],55:[1,68]},{6:[2,55],11:[2,55],16:[1,70],17:[2,55],21:[1,69],23:[2,55],31:[2,55],33:[2,55],34:[2,55],36:[2,55],37:[2,55],38:[2,55],40:[2,55],41:[2,55],44:[2,55],48:[2,55],49:[2,55],50:[2,55],51:[2,55],53:[2,55],54:[2,55],55:[2,55]},{10:[1,47],15:[1,44],16:[1,54],19:71,35:[1,45],39:[1,46],42:[1,48],43:[1,49],46:[1,50],47:[1,51],52:[1,52],56:[1,53],57:[1,55],58:[1,56],59:[1,57]},{10:[1,47],15:[1,44],16:[1,54],19:72,35:[1,45],39:[1,46],42:[1,48],43:[1,49],46:[1,50],47:[1,51],52:[1,52],56:[1,53],57:[1,55],58:[1,56],59:[1,57]},{10:[1,47],15:[1,44],16:[1,54],19:74,24:73,35:[1,45],39:[1,46],42:[1,48],43:[1,49],46:[1,50],47:[1,51],52:[1,52],56:[1,53],57:[1,55],58:[1,56],59:[1,57]},{15:[1,78],29:75,30:76,32:77},{10:[1,47],15:[1,44],16:[1,54],19:79,35:[1,45],39:[1,46],42:[1,48],43:[1,49],46:[1,50],47:[1,51],52:[1,52],56:[1,53],57:[1,55],58:[1,56],59:[1,57]},{9:[1,80]},{10:[1,47],15:[1,44],16:[1,54],19:81,35:[1,45],39:[1,46],42:[1,48],43:[1,49],46:[1,50],47:[1,51],52:[1,52],56:[1,53],57:[1,55],58:[1,56],59:[1,57]},{10:[1,47],15:[1,44],16:[1,54],19:82,35:[1,45],39:[1,46],42:[1,48],43:[1,49],46:[1,50],47:[1,51],52:[1,52],56:[1,53],57:[1,55],58:[1,56],59:[1,57]},{10:[1,47],15:[1,44],16:[1,54],19:83,35:[1,45],39:[1,46],42:[1,48],43:[1,49],46:[1,50],47:[1,51],52:[1,52],56:[1,53],57:[1,55],58:[1,56],59:[1,57]},{10:[1,47],15:[1,44],16:[1,54],19:84,35:[1,45],39:[1,46],42:[1,48],43:[1,49],46:[1,50],47:[1,51],52:[1,52],56:[1,53],57:[1,55],58:[1,56],59:[1,57]},{6:[2,56],11:[2,56],17:[2,56],23:[2,56],31:[2,56],33:[2,56],34:[2,56],36:[2,56],37:[2,56],38:[2,56],40:[2,56],41:[2,56],44:[2,56],48:[2,56],49:[2,56],50:[2,56],51:[2,56],53:[2,56],54:[2,56],55:[2,56]},{6:[2,57],11:[2,57],17:[2,57],23:[2,57],31:[2,57],33:[2,57],34:[2,57],36:[2,57],37:[2,57],38:[2,57],40:[2,57],41:[2,57],44:[2,57],48:[2,57],49:[2,57],50:[2,57],51:[2,57],53:[2,57],54:[2,57],55:[2,57]},{6:[2,58],11:[2,58],17:[2,58],23:[2,58],31:[2,58],33:[2,58],34:[2,58],36:[2,58],37:[2,58],38:[2,58],40:[2,58],41:[2,58],44:[2,58],48:[2,58],49:[2,58],50:[2,58],51:[2,58],53:[2,58],54:[2,58],55:[2,58]},{10:[1,47],15:[1,44],16:[1,54],19:85,35:[1,45],39:[1,46],42:[1,48],43:[1,49],46:[1,50],47:[1,51],52:[1,52],56:[1,53],57:[1,55],58:[1,56],59:[1,57]},{10:[1,86]},{9:[1,87]},{15:[1,88]},{10:[1,47],15:[1,44],16:[1,54],19:89,35:[1,45],39:[1,46],42:[1,48],43:[1,49],46:[1,50],47:[1,51],52:[1,52],56:[1,53],57:[1,55],58:[1,56],59:[1,57]},{10:[1,47],15:[1,44],16:[1,54],19:90,35:[1,45],39:[1,46],42:[1,48],43:[1,49],46:[1,50],47:[1,51],52:[1,52],56:[1,53],57:[1,55],58:[1,56],59:[1,57]},{10:[1,47],15:[1,44],16:[1,54],19:91,35:[1,45],39:[1,46],42:[1,48],43:[1,49],46:[1,50],47:[1,51],52:[1,52],56:[1,53],57:[1,55],58:[1,56],59:[1,57]},{10:[1,47],15:[1,44],16:[1,54],19:92,35:[1,45],39:[1,46],42:[1,48],43:[1,49],46:[1,50],47:[1,51],52:[1,52],56:[1,53],57:[1,55],58:[1,56],59:[1,57]},{10:[1,47],15:[1,44],16:[1,54],19:93,35:[1,45],39:[1,46],42:[1,48],43:[1,49],46:[1,50],47:[1,51],52:[1,52],56:[1,53],57:[1,55],58:[1,56],59:[1,57]},{10:[1,47],15:[1,44],16:[1,54],19:94,35:[1,45],39:[1,46],42:[1,48],43:[1,49],46:[1,50],47:[1,51],52:[1,52],56:[1,53],57:[1,55],58:[1,56],59:[1,57]},{10:[1,47],15:[1,44],16:[1,54],19:95,35:[1,45],39:[1,46],42:[1,48],43:[1,49],46:[1,50],47:[1,51],52:[1,52],56:[1,53],57:[1,55],58:[1,56],59:[1,57]},{10:[1,47],15:[1,44],16:[1,54],19:96,35:[1,45],39:[1,46],42:[1,48],43:[1,49],46:[1,50],47:[1,51],52:[1,52],56:[1,53],57:[1,55],58:[1,56],59:[1,57]},{10:[1,47],15:[1,44],16:[1,54],17:[1,97],19:99,25:98,35:[1,45],39:[1,46],42:[1,48],43:[1,49],46:[1,50],47:[1,51],52:[1,52],56:[1,53],57:[1,55],58:[1,56],59:[1,57]},{33:[1,60],34:[1,61],36:[1,100],48:[1,62],49:[1,63],50:[1,64],51:[1,65],53:[1,66],54:[1,67],55:[1,68]},{33:[1,60],34:[1,61],40:[1,101],48:[1,62],49:[1,63],50:[1,64],51:[1,65],53:[1,66],54:[1,67],55:[1,68]},{10:[1,47],11:[1,102],15:[1,44],16:[1,54],19:103,35:[1,45],39:[1,46],42:[1,48],43:[1,49],46:[1,50],47:[1,51],52:[1,52],56:[1,53],57:[1,55],58:[1,56],59:[1,57]},{6:[1,104],33:[1,60],34:[1,61],48:[1,62],49:[1,63],50:[1,64],51:[1,65],53:[1,66],54:[1,67],55:[1,68]},{6:[2,41],11:[2,41],17:[2,41],23:[2,41],31:[2,41],33:[2,41],34:[2,41],36:[2,41],37:[2,41],38:[2,41],40:[2,41],41:[2,41],44:[2,41],48:[2,41],49:[2,41],50:[2,41],51:[2,41],53:[2,41],54:[2,41],55:[2,41]},{23:[1,106],31:[1,105]},{23:[2,27],31:[2,27]},{18:[1,107]},{33:[1,60],34:[1,61],44:[1,108],48:[1,62],49:[1,63],50:[1,64],51:[1,65],53:[1,66],54:[1,67],55:[1,68]},{6:[2,43],11:[2,43],17:[2,43],23:[2,43],31:[2,43],33:[2,43],34:[2,43],36:[2,43],37:[2,43],38:[2,43],40:[2,43],41:[2,43],44:[2,43],48:[2,43],49:[2,43],50:[2,43],51:[2,43],53:[2,43],54:[2,43],55:[2,43]},{6:[2,44],11:[2,44],17:[2,44],23:[2,44],31:[2,44],33:[1,60],34:[1,61],36:[2,44],37:[2,44],38:[2,44],40:[2,44],41:[2,44],44:[2,44],48:[2,44],49:[2,44],50:[2,44],51:[2,44],53:[2,44],54:[2,44],55:[2,44]},{6:[2,49],11:[2,49],17:[2,49],23:[2,49],31:[2,49],33:[1,60],34:[1,61],36:[2,49],37:[2,49],38:[2,49],40:[2,49],41:[2,49],44:[2,49],48:[2,49],49:[2,49],50:[2,49],51:[2,49],53:[2,49],54:[2,49],55:[2,49]},{6:[2,53],11:[2,53],17:[2,53],23:[2,53],31:[2,53],33:[1,60],34:[1,61],36:[2,53],37:[2,53],38:[2,53],40:[2,53],41:[2,53],44:[2,53],48:[1,62],49:[1,63],50:[1,64],51:[1,65],53:[1,66],54:[1,67],55:[1,68]},{17:[1,109],33:[1,60],34:[1,61],48:[1,62],49:[1,63],50:[1,64],51:[1,65],53:[1,66],54:[1,67],55:[1,68]},{11:[1,110],33:[1,60],34:[1,61],48:[1,62],49:[1,63],50:[1,64],51:[1,65],53:[1,66],54:[1,67],55:[1,68]},{10:[1,47],15:[1,44],16:[1,54],19:111,35:[1,45],39:[1,46],42:[1,48],43:[1,49],46:[1,50],47:[1,51],52:[1,52],56:[1,53],57:[1,55],58:[1,56],59:[1,57]},{34:[1,112]},{16:[1,113]},{6:[2,45],11:[2,45],17:[2,45],23:[2,45],31:[2,45],33:[1,60],34:[1,61],36:[2,45],37:[2,45],38:[2,45],40:[2,45],41:[2,45],44:[2,45],48:[2,45],49:[2,45],50:[1,64],51:[1,65],53:[2,45],54:[2,45],55:[2,45]},{6:[2,46],11:[2,46],17:[2,46],23:[2,46],31:[2,46],33:[1,60],34:[1,61],36:[2,46],37:[2,46],38:[2,46],40:[2,46],41:[2,46],44:[2,46],48:[2,46],49:[2,46],50:[1,64],51:[1,65],53:[2,46],54:[2,46],55:[2,46]},{6:[2,47],11:[2,47],17:[2,47],23:[2,47],31:[2,47],33:[1,60],34:[1,61],36:[2,47],37:[2,47],38:[2,47],40:[2,47],41:[2,47],44:[2,47],48:[2,47],49:[2,47],50:[2,47],51:[2,47],53:[2,47],54:[2,47],55:[2,47]},{6:[2,48],11:[2,48],17:[2,48],23:[2,48],31:[2,48],33:[1,60],34:[1,61],36:[2,48],37:[2,48],38:[2,48],40:[2,48],41:[2,48],44:[2,48],48:[2,48],49:[2,48],50:[2,48],51:[2,48],53:[2,48],54:[2,48],55:[2,48]},{6:[2,50],11:[2,50],17:[2,50],23:[2,50],31:[2,50],33:[1,60],34:[1,61],36:[2,50],37:[2,50],38:[2,50],40:[2,50],41:[2,50],44:[2,50],48:[1,62],49:[1,63],50:[1,64],51:[1,65],53:[2,50],54:[2,50],55:[2,50]},{6:[2,51],11:[2,51],17:[2,51],23:[2,51],31:[2,51],33:[1,60],34:[1,61],36:[2,51],37:[2,51],38:[2,51],40:[2,51],41:[2,51],44:[2,51],48:[1,62],49:[1,63],50:[1,64],51:[1,65],53:[2,51],54:[2,51],55:[2,51]},{6:[2,52],11:[2,52],17:[2,52],23:[2,52],31:[2,52],33:[1,60],34:[1,61],36:[2,52],37:[2,52],38:[2,52],40:[2,52],41:[2,52],44:[2,52],48:[1,62],49:[1,63],50:[1,64],51:[1,65],53:[2,52],54:[2,52],55:[2,52]},{6:[2,31],11:[2,31],17:[2,31],23:[2,31],31:[2,31],33:[1,60],34:[1,61],36:[2,31],37:[2,31],38:[2,31],40:[2,31],41:[2,31],44:[2,31],48:[1,62],49:[1,63],50:[1,64],51:[1,65],53:[1,66],54:[1,67],55:[1,68]},{6:[2,36],11:[2,36],17:[2,36],23:[2,36],31:[2,36],33:[2,36],34:[2,36],36:[2,36],37:[2,36],38:[2,36],40:[2,36],41:[2,36],44:[2,36],48:[2,36],49:[2,36],50:[2,36],51:[2,36],53:[2,36],54:[2,36],55:[2,36]},{17:[1,114],23:[1,115]},{17:[2,21],23:[2,21],33:[1,60],34:[1,61],48:[1,62],49:[1,63],50:[1,64],51:[1,65],53:[1,66],54:[1,67],55:[1,68]},{10:[1,47],15:[1,44],16:[1,54],19:116,35:[1,45],39:[1,46],42:[1,48],43:[1,49],46:[1,50],47:[1,51],52:[1,52],56:[1,53],57:[1,55],58:[1,56],59:[1,57]},{10:[1,47],15:[1,44],16:[1,54],19:117,35:[1,45],39:[1,46],42:[1,48],43:[1,49],46:[1,50],47:[1,51],52:[1,52],56:[1,53],57:[1,55],58:[1,56],59:[1,57]},{6:[2,40],11:[2,40],17:[2,40],23:[2,40],31:[2,40],33:[2,40],34:[2,40],36:[2,40],37:[2,40],38:[2,40],40:[2,40],41:[2,40],44:[2,40],48:[2,40],49:[2,40],50:[2,40],51:[2,40],53:[2,40],54:[2,40],55:[2,40]},{6:[1,118],33:[1,60],34:[1,61],48:[1,62],49:[1,63],50:[1,64],51:[1,65],53:[1,66],54:[1,67],55:[1,68]},{10:[2,19],11:[2,19],15:[2,19],16:[2,19],35:[2,19],39:[2,19],42:[2,19],43:[2,19],46:[2,19],47:[2,19],52:[2,19],56:[2,19],57:[2,19],58:[2,19],59:[2,19]},{10:[1,47],15:[1,44],16:[1,54],19:119,35:[1,45],39:[1,46],42:[1,48],43:[1,49],46:[1,50],47:[1,51],52:[1,52],56:[1,53],57:[1,55],58:[1,56],59:[1,57]},{15:[1,78],32:120},{9:[1,121]},{15:[1,124],26:122,27:123},{6:[2,54],11:[2,54],17:[2,54],23:[2,54],31:[2,54],33:[2,54],34:[2,54],36:[2,54],37:[2,54],38:[2,54],40:[2,54],41:[2,54],44:[2,54],48:[2,54],49:[2,54],50:[2,54],51:[2,54],53:[2,54],54:[2,54],55:[2,54]},{6:[2,12]},{11:[1,125],33:[1,60],34:[1,61],48:[1,62],49:[1,63],50:[1,64],51:[1,65],53:[1,66],54:[1,67],55:[1,68]},{15:[1,126]},{10:[1,47],15:[1,44],16:[1,54],17:[1,127],19:99,25:128,35:[1,45],39:[1,46],42:[1,48],43:[1,49],46:[1,50],47:[1,51],52:[1,52],56:[1,53],57:[1,55],58:[1,56],59:[1,57]},{6:[2,39],11:[2,39],17:[2,39],23:[2,39],31:[2,39],33:[2,39],34:[2,39],36:[2,39],37:[2,39],38:[2,39],40:[2,39],41:[2,39],44:[2,39],48:[2,39],49:[2,39],50:[2,39],51:[2,39],53:[2,39],54:[2,39],55:[2,39]},{10:[1,47],15:[1,44],16:[1,54],19:129,35:[1,45],39:[1,46],42:[1,48],43:[1,49],46:[1,50],47:[1,51],52:[1,52],56:[1,53],57:[1,55],58:[1,56],59:[1,57]},{33:[1,60],34:[1,61],37:[1,130],48:[1,62],49:[1,63],50:[1,64],51:[1,65],53:[1,66],54:[1,67],55:[1,68]},{33:[1,60],34:[1,61],41:[1,131],48:[1,62],49:[1,63],50:[1,64],51:[1,65],53:[1,66],54:[1,67],55:[1,68]},{10:[2,20],11:[2,20],15:[2,20],16:[2,20],35:[2,20],39:[2,20],42:[2,20],43:[2,20],46:[2,20],47:[2,20],52:[2,20],56:[2,20],57:[2,20],58:[2,20],59:[2,20]},{6:[2,26],11:[2,26],17:[2,26],23:[2,26],31:[2,26],33:[1,60],34:[1,61],36:[2,26],37:[2,26],38:[2,26],40:[2,26],41:[2,26],44:[2,26],48:[1,62],49:[1,63],50:[1,64],51:[1,65],53:[1,66],54:[1,67],55:[1,68]},{23:[2,28],31:[2,28]},{21:[1,132],23:[2,29],31:[2,29]},{15:[1,124],27:134,45:[1,133]},{15:[2,23],45:[2,23]},{18:[1,135]},{6:[2,13]},{16:[1,136]},{6:[2,34],11:[2,34],17:[2,34],23:[2,34],31:[2,34],33:[2,34],34:[2,34],36:[2,34],37:[2,34],38:[2,34],40:[2,34],41:[2,34],44:[2,34],48:[2,34],49:[2,34],50:[2,34],51:[2,34],53:[2,34],54:[2,34],55:[2,34]},{17:[1,137],23:[1,115]},{17:[2,22],23:[2,22],33:[1,60],34:[1,61],48:[1,62],49:[1,63],50:[1,64],51:[1,65],53:[1,66],54:[1,67],55:[1,68]},{10:[1,47],15:[1,44],16:[1,54],19:138,35:[1,45],39:[1,46],42:[1,48],43:[1,49],46:[1,50],47:[1,51],52:[1,52],56:[1,53],57:[1,55],58:[1,56],59:[1,57]},{6:[2,38],11:[2,38],17:[2,38],23:[2,38],31:[2,38],33:[2,38],34:[2,38],36:[2,38],37:[2,38],38:[2,38],40:[2,38],41:[2,38],44:[2,38],48:[2,38],49:[2,38],50:[2,38],51:[2,38],53:[2,38],54:[2,38],55:[2,38]},{10:[1,47],15:[1,44],16:[1,54],19:139,35:[1,45],39:[1,46],42:[1,48],43:[1,49],46:[1,50],47:[1,51],52:[1,52],56:[1,53],57:[1,55],58:[1,56],59:[1,57]},{6:[2,42],11:[2,42],17:[2,42],23:[2,42],31:[2,42],33:[2,42],34:[2,42],36:[2,42],37:[2,42],38:[2,42],40:[2,42],41:[2,42],44:[2,42],48:[2,42],49:[2,42],50:[2,42],51:[2,42],53:[2,42],54:[2,42],55:[2,42]},{15:[2,24],45:[2,24]},{9:[1,140]},{10:[1,47],15:[1,44],16:[1,54],17:[1,141],19:99,25:142,35:[1,45],39:[1,46],42:[1,48],43:[1,49],46:[1,50],47:[1,51],52:[1,52],56:[1,53],57:[1,55],58:[1,56],59:[1,57]},{6:[2,35],11:[2,35],17:[2,35],23:[2,35],31:[2,35],33:[2,35],34:[2,35],36:[2,35],37:[2,35],38:[2,35],40:[2,35],41:[2,35],44:[2,35],48:[2,35],49:[2,35],50:[2,35],51:[2,35],53:[2,35],54:[2,35],55:[2,35]},{33:[1,60],34:[1,61],38:[1,143],48:[1,62],49:[1,63],50:[1,64],51:[1,65],53:[1,66],54:[1,67],55:[1,68]},{23:[2,30],31:[2,30],33:[1,60],34:[1,61],48:[1,62],49:[1,63],50:[1,64],51:[1,65],53:[1,66],54:[1,67],55:[1,68]},{28:[1,144]},{6:[2,32],11:[2,32],17:[2,32],23:[2,32],31:[2,32],33:[2,32],34:[2,32],36:[2,32],37:[2,32],38:[2,32],40:[2,32],41:[2,32],44:[2,32],48:[2,32],49:[2,32],50:[2,32],51:[2,32],53:[2,32],54:[2,32],55:[2,32]},{17:[1,145],23:[1,115]},{6:[2,37],11:[2,37],17:[2,37],23:[2,37],31:[2,37],33:[2,37],34:[2,37],36:[2,37],37:[2,37],38:[2,37],40:[2,37],41:[2,37],44:[2,37],48:[2,37],49:[2,37],50:[2,37],51:[2,37],53:[2,37],54:[2,37],55:[2,37]},{10:[1,47],15:[1,44],16:[1,54],19:146,35:[1,45],39:[1,46],42:[1,48],43:[1,49],46:[1,50],47:[1,51],52:[1,52],56:[1,53],57:[1,55],58:[1,56],59:[1,57]},{6:[2,33],11:[2,33],17:[2,33],23:[2,33],31:[2,33],33:[2,33],34:[2,33],36:[2,33],37:[2,33],38:[2,33],40:[2,33],41:[2,33],44:[2,33],48:[2,33],49:[2,33],50:[2,33],51:[2,33],53:[2,33],54:[2,33],55:[2,33]},{6:[1,147],33:[1,60],34:[1,61],48:[1,62],49:[1,63],50:[1,64],51:[1,65],53:[1,66],54:[1,67],55:[1,68]},{15:[2,25],45:[2,25]}],
defaultActions: {12:[2,5],17:[2,7],31:[2,6],38:[2,8],110:[2,12],125:[2,13]},
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
case 10: return 54; 
break;
case 11: return 21; 
break;
case 12:return 6
break;
case 13:return 18
break;
case 14:return 23
break;
case 15:return 34
break;
case 16:return 33
break;
case 17:return 52
break;
case 18:return 53
break;
case 19:return 55
break;
case 20:return 49
break;
case 21:return 48
break;
case 22:return 50
break;
case 23:return 51
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
case 29: return 37; 
break;
case 30: return 38; 
break;
case 31: return 35; 
break;
case 32: return 31; 
break;
case 33: return 12; 
break;
case 34: return 47; 
break;
case 35: return 42; 
break;
case 36: return 40; 
break;
case 37: return 41; 
break;
case 38: return 36; 
break;
case 39: return 39; 
break;
case 40: return 43; 
break;
case 41: return 45; 
break;
case 42: return 46; 
break;
case 43: return 44; 
break;
case 44: return 56; 
break;
case 45: return 59; 
break;
case 46: return 59; 
break;
case 47: return 15; 
break;
case 48: return 9; 
break;
case 49:return 57;
break;
case 50:
    this.begin("STRING");
         yy.buff="";
		 yy.string_overflow = false;
		 yy.string_contains_null = false;

break;
case 51:
         if(yy.buff.length>=1024) yy.string_overflow=true;
		 else yy.buff+='\\"';

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