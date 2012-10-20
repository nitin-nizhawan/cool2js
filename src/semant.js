var sa =(function(){
var sa={};
function mixin(obj1,obj2){
	   for(var a in obj2){
		   obj1[a]=obj2[a];
	   }
}
// SymtabEntry (Symbol table entry)
var SA_CONST={
  CObject:"Object",
  CIO:"IO",
  CStr:"String",
  CInt:"Int",
  CNo_Class:"No_Class",
  CBool:"Bool"
};
function SymtabEntry(){
  this.id="";
  this.info=undefined;
}
SymtabEntry.prototype.init=function(id,data){
  this.id=id;
  this.info=data;
  return this;
}
SymtabEntry.prototype.getId=function(){
  return this.id;
}
SymtabEntry.prototype.getInfo=function(){
  return this.info;
}

//SymtabEntry definition ends here
//SymbolTable definition begins here
function SymbolTable(){
  // this tbl is list of list of SymEntry
  this.tbl=null;
}
SymbolTable.prototype.enterscope=function(){
    if(!this.tbl) this.tbl=[[]];// list of list
	else this.tbl.push([]);
}
SymbolTable.prototype.exitscope=function(){
   this.tbl.pop();
}
SymbolTable.prototype.addid=function(id,data){
    var entry = new SymtabEntry().init(id,data);
	this.tbl[this.tbl.length-1].push(entry);
	return entry;
}
SymbolTable.prototype.lookup=function(id){
   for(var l=this.tbl.length-1;l>=0;l--){ // for each scope
       for(var s=0;s<this.tbl[l].length;s++){
	       if(this.tbl[l][s].getId()==id){
		       return this.tbl[l][s].getInfo();
		   }
	   }
   }
}
SymbolTable.prototype.probe=function(id){
    var curScopeList = this.tbl[this.tbl.length-1];
    for(var s=0;s<curScopeList.length;s++){
	    if(id == curScopeList[s].getId()){
		    return curScopeList[s].getInfo();
		}
	}
}
SymbolTable.prototype.clone=function(){
    var st = new SymbolTable();
    for(var i=0;this.tbl&&i<this.tbl.length;i++){
	    var tscopeList = this.tbl[i];
		st.enterscope();
	    for(var j=0;j<tscopeList.length;j++){
		    var entry = tscopeList[j];
		    st.addid(entry.getId(),entry.getInfo());
		}
	}
	return st;
}
//SymbolTable definition ends here

function MultiMap(){
   this.map={};
   this.size=0;
}
MultiMap.prototype.add=function(key,val){
   if(this.map[key]){
      this.map[key].push(val);
	  this.size++;
   } else {
      this.map[key]=[val];
	  this.size++;
   }
}


function SemanticError(msg){
    Error.apply(this, arguments);
	this.message = msg;
}
SemanticError.prototype = new Error();
SemanticError.prototype.constructor = SemanticError;
SemanticError.prototype.name ="SemanticError";
CollectDeclarationsVisitor=function(ftable,otable,ctable){
	this.ftable  = ftable;
	this.otable = otable;
	this.ctable = ctable;
}
mixin(CollectDeclarationsVisitor.prototype,(function(){
	  return {
	      snapshot:function(obj){
		      obj.ftable  = this.ftable.clone();
			  obj.otable  = this.otable.clone();
			  obj.ctable  = this.ctable.clone();
		  },
	      visitCLProgram:function(prg){},
		  visitCLClass:function(cls){
		      for(var i = 0; i<cls.featureList.list.length; i++) {
                 var afeature = cls.featureList.list[i];
                 if (afeature.isMethod())
                    this.ftable.addid(afeature.name, afeature);
                 else 
                    this.otable.addid(afeature.name, afeature);
             }
             for(var i = 0; i<cls.featureList.list.length; i++) 
                    cls.featureList.list[i].accept(this);
			 this.snapshot(cls);
		  },
		  visitCLAttr:function(attr){
		      if(attr.expr) attr.expr.accept(this);
			  this.snapshot(attr);
		  },
		  visitCLMethod:function(method){
		       this.otable.enterscope();
               method.paramList.accept(this);
               method.body.accept&&method.body.accept(this);
			   this.snapshot(method);
               this.otable.exitscope();
		  },
		  visitCLExprSemiColonList:function(explist){for(var i=0;i<explist.list.length;i++) explist.list[i].accept(this);},
		  visitCLLetExpr:function(letexpr){
		      this.otable.enterscope();
			  for(var i=0;i<letexpr.let_list.list.length;i++){
                  this.otable.addid(letexpr.let_list.list[i].objectid, letexpr.let_list.list[i].typeid);
                  letexpr.let_list.list[i].expr.accept(this);
			  }
	          letexpr.expr.accept(this);
			  this.snapshot(letexpr);
              this.otable.exitscope();
		  },
		  visitCLNew:function(newobj){this.snapshot(newobj);},
		  visitCLIsvoid:function(isvoid){ isvoid.expr.accept(this); this.snapshot(isvoid);},
		  visitCLPlus:function(plus){ plus.expr1.accept(this); plus.expr2.accept(this);this.snapshot(plus);},
		  visitCLSub:function(sub){ sub.expr1.accept(this); sub.expr2.accept(this);this.snapshot(sub);},
		  visitCLMul:function(mul){ mul.expr1.accept(this); mul.expr2.accept(this);this.snapshot(mul);},
		  visitCLDivide:function(dvd){ dvd.expr1.accept(this); dvd.expr2.accept(this);this.snapshot(dvds);},
		  visitCLNeg:function(exp){exp.expr.accept(this);this.snapshot(exp);},
		  visitCLLt:function(eq){eq.expr1.accept(this); eq.expr2.accept(this);this.snapshot(eq);},
		  visitCLLeq:function(eq){  eq.expr1.accept(this); eq.expr2.accept(this);this.snapshot(eq);},
		  visitCLEq:function(eq){eq.expr1.accept(this); eq.expr2.accept(this);this.snapshot(eq);},
		  visitCLComp:function(comp){ comp.expr.accept(this); this.snapshot(comp);},
		  visitCLObject:function(objid){this.snapshot(objid);},
		  visitCLIntConst:function(int_const){this.snapshot(int_const);},
		  visitCLStringConst:function(string_const){this.snapshot(string_const);},
		  visitCLBoolConst:function(bool_const){this.snapshot(bool_const);},
		  visitCLAssign:function(asgn){asgn.expr.accept(this);this.snapshot(asgn);},
		  visitCLStaticDispatch:function(dispatch){dispatch.params.accept(this); dispatch.expr.accept(this);this.snapshot(dispatch);},
		  visitCLDispatch:function(dispatch){dispatch.params.accept(this); dispatch.expr.accept(this);this.snapshot(dispatch);},
		  visitCLExprCommaSepList:function(explist){for(var i=0;i<explist.list.length;i++) explist.list[i].accept(this);},
		  visitCLFormalList:function(flist){for(var i=0;i<flist.list.length;i++) flist.list[i].accept(this);},
		  visitCLFormal:function(formal){this.otable.addid(formal.objectid, formal.typeid);this.snapshot(formal);},
		  visitCLBlock:function(block){block.expr_list.accept(this);this.snapshot(block);},
		  visitCLCond:function(cond){cond.expr1.accept(this); cond.expr2.accept(this); cond.expr3.accept(this);this.snapshot(cond);},
		  visitCLLoop:function(loop){loop.expr1.accept(this); loop.expr2.accept(this);this.snapshot(loop);},
		  visitCLCaseExpr:function(case_expr){
		      case_expr.expr.accept(this);
			  case_expr.case_list.accept(this);
			  this.snapshot(case_expr);
		  },
		  visitCLAttrList:function(attrList){},
		  visitCLMethodList:function(methodList){},
		  visitCLFeatureList:function(featureList){},
		  visitCLBranchList:function(branchList){
		      for(var i=0;i<branchList.list.length;i++){
			      branchList.list[i].accept(this);
			  }
		  },
		  visitCLBranch:function(brnch){
		      this.otable.enterscope();
			  this.otable.addid(brnch.objectid, brnch.typeid);
              brnch.expr.accept(this);
			  this.snapshot(brnch);
			  this.otable.exitscope();
		  },
		  visitCLLetList:function(brnchList){},
		  visitCLLetItem:function(letItem){}
	  };
 })());
 
function TypeCheckVisitor(ctable){this.ctable=ctable;}
mixin(TypeCheckVisitor.prototype,(function(){
	  return {
	      visitCLProgram:function(prg){
		     var has_Main=false;
			 var has_main_meth=false;
			 for(var i = 0; i<prg.classlist.length; i++) {
                 var aclass = prg.classlist[i];
                 aclass.accept(this);
                 //check if a main class is contained
                 if (aclass.name == "Main") {
                     has_Main = true;
                     if (aclass.ftable.probe("main")){
                         has_main_meth = true;
				     }		 
                 }
             }
             if (!has_Main) {
                 throw new SemanticError("Class Main is not defined.");
             } else if (!has_main_meth) {
                 throw new SemanticError("No 'main' method in class Main.");
             }
		  },
		  visitCLClass:function(cls){
		    this.cur_class = cls.name;
		    for(var i = 0; i<cls.featureList.list.length; i++) 
                    cls.featureList.list[i].accept(this);
		 },
		  visitCLAttr:function(attr){
		      if(attr.expr) attr.expr.accept(this);
		  },
		  visitCLMethod:function(method){
		       method.paramList.accept(this);
               method.body.accept&&method.body.accept(this);
			   var funcopy = method.ftable.clone();
               funcopy.exitscope();
               var lastfun = (funcopy.lookup(method.name));
    
                 if (lastfun) {
                     if (method.paramList.list.length != lastfun.paramList.list.length) {
                         throw new SemanticError("Incompatible number of formal parameters in redefined method "+ method.name + ".");
                     }
                     else {
                        for(var i = 0;i<method.paramList.list.length;i++) {
                            if (method.paramList.list[i].typeid!=lastfun.paramList.list[i].typeid) {
                             
                               throw new SemanticError("In redefined method " + method.name + ", paramater type "+method.paramList.list[i].typeid +
            							" is different from original type " + lastfun.paramList.list[i].typeid + ".");
                             }
                         }
                     }
                     if (lastfun.typeid != method.typeid) {
                      throw new SemanticError("In redefined method " + method.name + ", return type " + method.typeid+
                                " is different from original return type " + lastfun.typeid + ".");
			         }
              }

             //need to check if type exists
           if (!this.ctable.lookup(method.typeid) && method.typeid != "SELF_TYPE") {
                 throw new SemanticError("Undefined return type " + method.typeid + " in method " + method.name + ".") ;
           } /*else if (!expr->conform(return_type)) {
                 //check if return type match
                 throw new SemanticError("Inferred return type " + expr->type + " of method " + name+ " does not conform to declared return type " + return_type << ".");
              }*/
		  },
		  visitCLExprSemiColonList:function(explist){for(var i=0;i<explist.list.length;i++) explist.list[i].accept(this);},
		  visitCLLetExpr:function(letexpr){
		  
			  for(var i=0;i<letexpr.let_list.list.length;i++){
                 letexpr.let_list.list[i].expr.accept(this);
			  }
	          letexpr.expr.accept(this);
		  },
		  visitCLNew:function(newobj){},
		  visitCLIsvoid:function(isvoid){ isvoid.expr.accept(this); },
		  visitCLPlus:function(plus){ plus.expr1.accept(this); plus.expr2.accept(this);},
		  visitCLSub:function(sub){ sub.expr1.accept(this); sub.expr2.accept(this);},
		  visitCLMul:function(mul){ mul.expr1.accept(this); mul.expr2.accept(this);},
		  visitCLDivide:function(dvd){ dvd.expr1.accept(this); dvd.expr2.accept(this);},
		  visitCLNeg:function(exp){exp.expr.accept(this);},
		  visitCLLt:function(eq){eq.expr1.accept(this); eq.expr2.accept(this);},
		  visitCLLeq:function(eq){  eq.expr1.accept(this); eq.expr2.accept(this);},
		  visitCLEq:function(eq){eq.expr1.accept(this); eq.expr2.accept(this);},
		  visitCLComp:function(comp){ comp.expr.accept(this); },
		  visitCLObject:function(objid){},
		  visitCLIntConst:function(int_const){},
		  visitCLStringConst:function(string_const){},
		  visitCLBoolConst:function(bool_const){},
		  visitCLAssign:function(asgn){asgn.expr.accept(this);},
		  visitCLStaticDispatch:function(dispatch){dispatch.params.accept(this); dispatch.expr.accept(this);},
		  visitCLDispatch:function(dispatch){dispatch.params.accept(this); dispatch.expr.accept(this);},
		  visitCLExprCommaSepList:function(explist){for(var i=0;i<explist.list.length;i++) explist.list[i].accept(this);},
		  visitCLFormalList:function(flist){for(var i=0;i<flist.list.length;i++) flist.list[i].accept(this);},
		  visitCLFormal:function(formal){},
		  visitCLBlock:function(block){block.expr_list.accept(this);},
		  visitCLCond:function(cond){cond.expr1.accept(this); cond.expr2.accept(this); cond.expr3.accept(this);},
		  visitCLLoop:function(loop){loop.expr1.accept(this); loop.expr2.accept(this);},
		  visitCLCaseExpr:function(case_expr){
		      case_expr.expr.accept(this);
			  case_expr.case_list.accept(this);
		  },
		  visitCLAttrList:function(attrList){},
		  visitCLMethodList:function(methodList){},
		  visitCLFeatureList:function(featureList){},
		  visitCLBranchList:function(branchList){
		      for(var i=0;i<branchList.list.length;i++){
			      branchList.list[i].accept(this);
			  }
		  },
		  visitCLBranch:function(brnch){
			  brnch.expr.accept(this);
		  },
		  visitCLLetList:function(brnchList){},
		  visitCLLetItem:function(letItem){}
	  };
 })());
function ClassTable(){
   this.class_map = new MultiMap();
}
ClassTable.prototype.init=function(classes){
    this.class_table = new SymbolTable();
	this.class_table.enterscope();
	for(var i=0;i<classes.length;i++){
	    var aclass = classes[i];
		this.class_map.add(aclass.pclass,aclass.name);
		if (this.class_table.probe(aclass.name)){
		    throw new SemanticError("Duplicate class declaration: "+aclass.name);
		}
		this.class_table.addid(aclass.name,aclass);
		 //report unpermitted redeclaration
        if (aclass.name == SA_CONST.CNo_Class
        || aclass.name == SA_CONST.CObject
        || aclass.name == SA_CONST.CIO
        || aclass.name == SA_CONST.CInt
        || aclass.name == SA_CONST.CStr)
         throw new SemanticError(aclass.name+" cannot be defined ");
	}
	this.install_basic_classes();
    this.inheritance_check();
    return this;
}
ClassTable.prototype.inheritance_check=function() {
  var in_degree={};
  for (var key in this.class_map.map) {
    //report unpermitted inheritance
    if (key == SA_CONST.CInt
        || key == SA_CONST.CStr
        || key == SA_CONST.CBool)
      throw new SemanticError(this.class_map.map[key][0]+" Cannot inherit "+key);
     for(var i=0;i<this.class_map.map[key].length;i++){
	      var cl = this.class_map.map[key][i];
          in_degree[cl]=(in_degree[cl])?(in_degree[cl]+1):1;
	 }
  }

  var class_set={};
  this.inheritance_traverse(SA_CONST.CNo_Class, class_set);
  var cl_size =0; for(var x in class_set) cl_size++;
  /*if (semant_debug)
    cerr << "inheritance tree has " << class_set.size() << " nodes" << endl;*/

  //report undeclared classes
  var error_msg="";
  if (cl_size < this.class_map.size + 1) {
    for (var first in this.class_map.map) for(var i in this.class_map.map[first]){
	  var second = this.class_map.map[first][i];
      if (!class_set[first] && !in_degree[first]) {
	      error_msg+="Class "+second+" inherits from an undefined class " + first+"\n ";
          this.inheritance_traverse(first, class_set);
      }
	}  
	
	 
    for (var first in this.class_map.map) for(var i in this.class_map.map[first]){
	  var second = this.class_map.map[first][i];
      if (!class_set[first])
        throw new SemanticError("Cycle involving class "+first);
     }
  }
  
  if(error_msg){
	  throw new  SemanticError(error_msg);
  }
}
ClassTable.prototype.inheritance_traverse=function(symbol,visited) {
  if (visited[symbol]) {
     throw new SemanticError("Cycle Involving "+symbol);
  }
  visited[symbol]=true;
  
  var range = this.class_map.map[symbol];

  for (var i=0;range&&i<range.length;i++)
    this.inheritance_traverse(range[i], visited);
}
ClassTable.prototype.install_basic_classes=function() {

  // The tree package uses these globals to annotate the classes built below.
  //Symbol filename = stringtable.add_string("<basic class>");
    
  // The following demonstrates how to create dummy parse trees to
  // refer to basic Cool classes.  There's no need for method
  // bodies -- these are already built into the runtime system.
    
  // IMPORTANT: The results of the following expressions are
  // stored in local variables.  You will want to do something
  // with those variables at the end of this method to make this
  // code meaningful.

  // 
  // The Object class has no parent class. Its methods are
  //        abort() : Object    aborts the program
  //        type_name() : Str   returns a string representation of class name
  //        copy() : SELF_TYPE  returns a copy of the object
  //
  // There is no need for method bodies in the basic classes---these
  // are already built in to the runtime system.

var Object_class =
    new ds.CLClass(SA_CONST.CObject, 
           SA_CONST.CNo_Class,new ds.CLFeatureList().append(
		                                                 new ds.CLMethod("type_name",new ds.CLFormalList(),SA_CONST.CStr,"")
										                 ).append(
														 new ds.CLMethod("abort",new ds.CLFormalList(),"SELF_TYPE","")
														 )
												);
               
  this.class_map.add(SA_CONST.CNo_Class, SA_CONST.CObject);
  this.class_table.addid(SA_CONST.CObject, Object_class);
  // 
  // The IO class inherits from Object. Its methods are
  //        out_string(Str) : SELF_TYPE       writes a string to the output
  //        out_int(Int) : SELF_TYPE            "    an int    "  "     "
  //        in_string() : Str                 reads a string from the input
  //        in_int() : Int                      "   an int     "  "     "
  //
  var IO_class = 
    new ds.CLClass(SA_CONST.CIO, 
           SA_CONST.CObject,
           new ds.CLFeatureList().append(
		                       new ds.CLMethod("out_string", new ds.CLFormalList().append(new ds.CLFormal("arg",SA_CONST.CStr)),"SELF_TYPE", "")).append(
							   new ds.CLMethod("out_int", new ds.CLFormalList().append(new ds.CLFormal("arg",SA_CONST.CInt)),"SELF_TYPE", "")).append(
                               new ds.CLMethod("in_string", new ds.CLFormalList(), SA_CONST.CStr, "")).append(
                               new ds.CLMethod("in_int", new ds.CLFormalList(), SA_CONST.CInt, "")));  
                     
  this.class_map.add(SA_CONST.CObject, SA_CONST.CIO);
  this.class_table.addid(SA_CONST.CIO, IO_class);

  //
  // The Int class has no methods and only a single attribute, the
  // "val" for the integer. 
  //
  var Int_class =
    new ds.CLClass(SA_CONST.CInt, 
           SA_CONST.CObject,
           new ds.CLFeatureList());

  this.class_map.add(SA_CONST.CObject, SA_CONST.CInt);
  this.class_table.addid(SA_CONST.CInt, Int_class);
  //
  // Bool also has only the "val" slot.
  //
  var Bool_class =
    new ds.CLClass(SA_CONST.CBool, SA_CONST.CObject, new ds.CLFeatureList());
    
  this.class_map.add(SA_CONST.CObject, SA_CONST.CBool);
  this.class_table.addid(SA_CONST.CBool, Bool_class);

  //
  // The class Str has a number of slots and operations:
  //       val                                  the length of the string
  //       str_field                            the string itself
  //       length() : Int                       returns length of the string
  //       concat(arg: Str) : Str               performs string concatenation
  //       substr(arg: Int, arg2: Int): Str     substring selection
  //       
  var Str_class =
    new ds.CLClass(SA_CONST.CStr, 
           SA_CONST.CObject,
           new ds.CLFeatureList().append(
               new ds.CLMethod("length", new ds.CLFormalList(), SA_CONST.CInt, "")).append(
               new ds.CLMethod("concat", new ds.CLFormalList().append(new ds.CLFormal("arg", SA_CONST.CStr)), SA_CONST.CStr, "")).append(
               new ds.CLMethod("substr",new ds.CLFormalList().append(new ds.CLFormal("arg", SA_CONST.CInt)).append( 
                                                        new ds.CLFormal("arg2", SA_CONST.CInt)), SA_CONST.CStr, "")));

  this.class_map.add(SA_CONST.CObject, SA_CONST.CStr);
  this.class_table.addid(SA_CONST.CStr,Str_class);
}

ClassTable.prototype.collect_declaration=function() {
  this.method_table = new SymbolTable();
  this.object_table = new SymbolTable();
  this.ast_traverse(SA_CONST.CObject);
}


ClassTable.prototype.ast_traverse=function(symbol) {
  this.method_table.enterscope();
  this.object_table.enterscope();
  var myclass = this.class_table.lookup(symbol);
  var scanv =new CollectDeclarationsVisitor(this.method_table,this.object_table,this.class_table);
  myclass.accept(scanv);
  //scanv.visitCLClass(myclass);
 // myclass.accept(object_table, method_table, class_table);

  for (var i= 0;this.class_map.map[symbol]&&i<this.class_map.map[symbol].length; i++)
    this.ast_traverse(this.class_map.map[symbol][i]);

  /*if (semant_debug) {
    cerr << "For class " << myclass->getname()->get_string();
    object_table->dump();
    method_table->dump();
  }*/

  this.object_table.exitscope();
  this.method_table.exitscope();
}












sa.CLSemanticAnalizer=function(prgm){
    this.prgm = prgm;
}

sa.CLSemanticAnalizer.prototype.check=function(){
    var classtable = new ClassTable().init(this.prgm.classlist);
	classtable.collect_declaration();
	var type_check = new TypeCheckVisitor(classtable.class_table);
	this.prgm.accept(type_check);
}


return sa;
})();



