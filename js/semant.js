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
                    this.otable.addid(afeature.name, afeature.typeid);
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
			  letexpr.let_list.accept(this);
			  letexpr.expr.accept(this);
			  
			  this.snapshot(letexpr);
              this.otable.exitscope();
		  },
		  visitCLNew:function(newobj){this.snapshot(newobj);},
		  visitCLIsvoid:function(isvoid){ isvoid.expr.accept(this); this.snapshot(isvoid);},
		  visitCLPlus:function(plus){ plus.expr1.accept(this); plus.expr2.accept(this);this.snapshot(plus);},
		  visitCLSub:function(sub){ sub.expr1.accept(this); sub.expr2.accept(this);this.snapshot(sub);},
		  visitCLMul:function(mul){ mul.expr1.accept(this); mul.expr2.accept(this);this.snapshot(mul);},
		  visitCLDivide:function(dvd){ dvd.expr1.accept(this); dvd.expr2.accept(this);this.snapshot(dvd);},
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
		  visitCLLetList:function(brnchList){
		      for(var i=0;i<brnchList.list.length;i++){
                  brnchList.list[i].accept(this);
			  }
			  this.snapshot(brnchList);
		  },
		  visitCLLetItem:function(letItem){
		      this.otable.addid(letItem.objectid, letItem.typeid);
			  letItem.expr.accept(this);
			  this.snapshot(letItem);
		  }
	  };
 })());
 
function TypeCheckVisitor(ctable){this.ctable=ctable;}
mixin(TypeCheckVisitor.prototype,(function(){
	  return {
	     error:function(msg){
		     throw new SemanticError(msg);
		 },
	     lub:function(s1,s2) {
             if (s1 == "SELF_TYPE"&& s2 == "SELF_TYPE")
                 return "SELF_TYPE";
             var c1 = (s1 == "SELF_TYPE") ? this.ctable.lookup(this.cur_class) : this.ctable.lookup(s1);
             var c2 = (s2 == "SELF_TYPE") ? this.ctable.lookup(this.cur_class) : this.ctable.lookup(s2);

             if ((!c1)&& (!c2))
                return ("_no_type");
             else if (!c1)
                return s2;
             else if (!c2)
                return s1;

             var class_set={};
             while (c1) {
                 class_set[c1.name]=true;
                 c1 = this.ctable.lookup(c1.pclass);
             }
             while (c2) {
                 if (class_set[c2.name])
                     return c2.name;
                 c2 = this.ctable.lookup(c2.pclass);
             }
             return null;     
          },
		  conform:function(computed_type,atype) {
             // "_no_type" conforms to any type
            if (computed_type == "_no_type")
                  return true;
            // no type conforms to "_no_type" except itself
            if (atype == "_no_type")
                 return false;
             //SELF_TYPE_C <= SELF_TYPE_C
            if (computed_type == "SELF_TYPE" && atype == "SELF_TYPE")
                return true;
            // T <= SELF_TYPE_C always false
            if (atype == "SELF_TYPE")
                return false;

            return atype == this.lub(computed_type, atype);
         },
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
		     
              // attribute name cannot be self
              if (attr.name == "self") {
                  this.error("'self' cannot be the name of an attribute.");
              }
             // inherited attributes cannot be redefined
             var objcopy = attr.otable.clone();
             objcopy.exitscope();
             var lastobj = objcopy.lookup(attr.name);
             if (lastobj) {
                 this.error("Attribute " + attr.name + " is an attribute of an inherited class.");
             }

    // check if type exist
            var decl = attr.ctable.lookup(attr.typeid);
            if ((!decl)&& attr.typeid != "SELF_TYPE") {
                this.error("Class " + attr.typeid + " of attribute " + attr.name + " is undefined.");
            }
             if (attr.expr) {
                  attr.expr.accept(this);
                  // check if init conform to type_decl
                 if (!this.conform(attr.expr.computed_type,attr.typeid)) {
                      this.error("Inferred type " + attr.expr.computed_type + " of initialization of attribute "+
                       attr.name + " does not conform to declared type " +attr.typeid + ".");     
                 }
            }
     
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
           } else if (method.body.accept&&!this.conform(method.body.computed_type,method.typeid)) {
                 //check if return type match
                 throw new SemanticError("Inferred return type " + method.body.computed_type + " of method " + method.name+ " does not conform to declared return type " + method.typeid + ".");
            }
		  },
		  visitCLExprSemiColonList:function(explist){for(var i=0;i<explist.list.length;i++) explist.list[i].accept(this);},
		  visitCLLetExpr:function(letexpr){
		      letexpr.let_list.accept(this);
	          letexpr.expr.accept(this);
			  
			  letexpr.computed_type = letexpr.expr.computed_type;
		  },
		  visitCLNew:function(newobj){
		      var atype = newobj.ctable.lookup(newobj.expr);
              if (newobj.expr == "SELF_TYPE") {
                // self_type is special case
                newobj.computed_type = "SELF_TYPE";
              } else if (!atype) {
                 this.error("'new' used with undefined class " + newobj.expr + ".");
				 //ERROR RECOVERY
                 newobj.computed_type ="_no_type";
              } else 
                 newobj.computed_type = newobj.expr;
    
		  },
		  visitCLIsvoid:function(isvoid){ isvoid.expr.accept(this); isvoid.computed_type="Bool"; },
		  visitCLPlus:function(plus){ plus.expr1.accept(this); plus.expr2.accept(this);
		      if(plus.expr1.computed_type!="Int"||plus.expr2.computed_type!="Int"){
			      this.error("Non-Int argumnets :"+plus.expr1.computed_type+" + "+plus.expr2.computed_type+" .");
			  }
			  plus.computed_type="Int";
		  },
		  visitCLSub:function(sub){ sub.expr1.accept(this); sub.expr2.accept(this);
		      if(sub.expr1.computed_type!="Int"||sub.expr2.computed_type!="Int"){
			      this.error("Non-Int argumnets :"+sub.expr1.computed_type+" - "+sub.expr2.computed_type+" .");
			  }
			  sub.computed_type="Int";
		  },
		  visitCLMul:function(mul){ mul.expr1.accept(this); mul.expr2.accept(this);
		      if(mul.expr1.computed_type!="Int"||mul.expr2.computed_type!="Int"){
			      this.error("Non-Int argumnets :"+mul.expr1.computed_type+" * "+mul.expr2.computed_type+" .");
			  }
			  mul.computed_type="Int";
		  },
		  visitCLDivide:function(dvd){ dvd.expr1.accept(this); dvd.expr2.accept(this);
		      if(dvd.expr1.computed_type!="Int"||dvd.expr2.computed_type!="Int"){
			      this.error("Non-Int argumnets :"+dvd.expr1.computed_type+" / "+dvd.expr2.computed_type+" .");
			  }
			  dvd.computed_type="Int";
		  },
		  visitCLNeg:function(exp){exp.expr.accept(this);
		      if(exp.expr.computed_type!="Int"){
			     this.error("Argument of '~' has type "+exp.expr.computed_type+" instead of Int");
			  }
			  exp.expr.computed_type="Int";
		  },
		  visitCLLt:function(eq){
		       eq.expr1.accept(this); eq.expr2.accept(this);
			   if(eq.expr1.computed_type!="Int"||eq.expr2.computed_type!="Int"){
			       this.error("Non-Int  arguments "+eq.expr1.computed_type +"<"+eq.expr2.computed_type+" .");
			   }
			   eq.computed_type="Bool";
		  },
		  visitCLLeq:function(eq){ 
        		  eq.expr1.accept(this); eq.expr2.accept(this);
		       if(eq.expr1.computed_type!="Int"||eq.expr2.computed_type!="Int"){
			       this.error("Non-Int  arguments: "+eq.expr1.computed_type +"<="+eq.expr2.computed_type+" .");
			   }
			   eq.computed_type="Bool";
		  },
		  isbasictype:function(tp){
		      return tp=="Int"||tp=="String"||tp=="Bool";
		  },
		  visitCLEq:function(eq){
		      eq.expr1.accept(this); eq.expr2.accept(this);
			  if (this.isbasictype(eq.expr1.computed_type) || this.isbasictype(eq.expr2.computed_type))
                 if (eq.expr1.computed_type != eq.expr2.computed_type) {
                     this.error("Illegal comparison with a basic type");
                 }
			  eq.computed_type="Bool";
		  },
		  visitCLComp:function(comp){ 
		      comp.expr.accept(this); 
			  if(comp.expr.computed_type!="Bool"){
			      this.error("Argument of 'not' has type " + comp.expr.computed_type + " instead of Bool.");
			  }
			  comp.computed_type="Bool";
		  },
		  visitCLObject:function(objid){
		     if (objid.val == "self")
                 objid.computed_type = "SELF_TYPE";
             else if (!objid.otable.lookup(objid.val)) {
                 this.error("Undeclared identifier " + objid.val + ".");
               //ERROR RECOVERY
                objid.computed_type = "_no_type";
             } else
                objid.computed_type = objid.otable.lookup(objid.val);
          },
		  visitCLIntConst:function(int_const){int_const.computed_type="Int";},
		  visitCLStringConst:function(string_const){string_const.computed_type="String";},
		  visitCLBoolConst:function(bool_const){bool_const.computed_type="Bool";},
		  visitCLAssign:function(asgn){
		       asgn.expr.accept(this);
			   var atype = asgn.otable.lookup(asgn.objectid);
               if (!atype) {
                   this.error("Assignment to undeclared variable " + asgn.objectid + ".");
               } else if (!this.conform(asgn.expr.computed_type,atype)) {
                   // check if expr conforms to static type of assigned object
                   this.error("Type " + asgn.expr.computed_type + " of assigned expression does not conform"+
                       " to declared type " + atype + " of identifier " + asgn.objectid + ".");
			   }
     
               asgn.computed_type = asgn.expr.computed_type;
		  },
		  visitCLStaticDispatch:function(dispatch){dispatch.params.accept(this); dispatch.expr.accept(this);
		     var aclass = (dispatch.expr.computed_type=="SELF_TYPE")?dispatch.ctable.lookup(this.cur_class):dispatch.ctable.lookup(expr.computed_type);
			 if(!aclass){
			     this.error("dispatch on undefined class "+disptach.expr.computed_type);
			 }
			 if (!this.conform(dispatch.expr.computed_type,dispatch.typeid)) {
                 this.error("Expression type " + dispatch.expr.computed_type + " does not conform to declared static dispatch type "+ dispatch.typeid + " .");
            }         
		     var meth = aclass.ftable.lookup(dispatch.objectid);
			 if(!meth){
			     this.error("Method "+dispatch.objectid+" Not found ");
			 }
			 if(meth.paramList.list.length!=dispatch.params.list.length){
			     this.error("Method "+dispatch.objectid+" called with wrong number of arguments");
			 }
			 for(var i=0;i<meth.paramList.list.length;i++){
			     if(!this.conform(dispatch.params.list[i].computed_type,meth.paramList.list[i].typeid)){
				     this.error("In the call of method "+dispatch.objectid+" ,type "+dispatch.params.list[i].computed_type+" does not conform "+
					 "of parameter "+meth.paramList.list[i].objectid+" to declared type "+meth.paramList.list[i].typeid+" .");
				 }
			 }
			 if(meth.typeid=="SELF_TYPE"){
			     dispatch.computed_type=dispatch.expr.computed_type;
			 } else {
		         dispatch.computed_type=meth.typeid;
			 }
		  },
		  visitCLDispatch:function(dispatch){dispatch.params.accept(this); dispatch.expr.accept(this);
		     var aclass = (dispatch.expr.computed_type=="SELF_TYPE")?dispatch.ctable.lookup(this.cur_class):dispatch.ctable.lookup(dispatch.expr.computed_type);
			 if(!aclass){
			     this.error("dispatch on undefined class "+disptach.expr.computed_type);
			 }
		     var meth = aclass.ftable.lookup(dispatch.objectid);
			 if(!meth){
			     this.error("Method "+dispatch.objectid+" Not found ");
			 }
			 if(meth.paramList.list.length!=dispatch.params.list.length){
			     this.error("Method "+dispatch.objectid+" called with wrong number of arguments");
			 }
			 for(var i=0;i<meth.paramList.list.length;i++){
			     if(!this.conform(dispatch.params.list[i].computed_type,meth.paramList.list[i].typeid)){
				     this.error("In the call of method "+dispatch.objectid+" ,type "+dispatch.params.list[i].computed_type+" does not conform "+
					 "of parameter "+meth.paramList.list[i].objectid+" to declared type "+meth.paramList.list[i].typeid+" .");
				 }
			 }
			 if(meth.typeid=="SELF_TYPE"){
			     dispatch.computed_type=dispatch.expr.computed_type;
			 } else {
		         dispatch.computed_type=meth.typeid;
			 }
		  },
		  visitCLExprCommaSepList:function(explist){for(var i=0;i<explist.list.length;i++) explist.list[i].accept(this);},
		  visitCLFormalList:function(flist){for(var i=0;i<flist.list.length;i++) flist.list[i].accept(this);},
		  visitCLFormal:function(formal){
		      if(formal.objectid=="self"){
			      this.error("self cannot be the name of formal parameter");
			  }
			  if(formal.typeid=="SELF_TYPE"){
			      this.error("Formal parameter "+formal.objectid+" cannot have type SELF_TYPE");
			  } else if(!this.ctable.lookup(formal.typeid)){
			      this.error("Type "+formal.typeid+" of formal parameter "+formal.objectid+" is undefined");
			  }
		  },
		  visitCLBlock:function(block){block.expr_list.accept(this);
		      for(var i=0;i<block.expr_list.list.length;i++){
			      block.computed_type = block.expr_list.list[i].computed_type;
			  }
		  },
		  visitCLCond:function(cond){cond.expr1.accept(this); cond.expr2.accept(this); cond.expr3.accept(this);
		      if(cond.expr1.computed_type!="Bool"){
			      this.error("'if' condition does not have type Bool");
			  }
			  cond.computed_type = this.lub(cond.expr2.computed_type,cond.expr3.computed_type);
		  },
		  visitCLLoop:function(loop){loop.expr1.accept(this); loop.expr2.accept(this);
		      if(loop.expr1.computed_type!="Bool"){
			      this.error("Loop condition does not have type Bool");
			  }
		      loop.computed_type="Object";
		  },
		  visitCLCaseExpr:function(case_expr){
		      case_expr.expr.accept(this);
			  case_expr.case_list.accept(this);
			  case_expr.computed_type="_no_type";
			  for(var i = 0; i<case_expr.case_list.list.length; i++) {
                  if (case_expr.case_list.list[i].typeid == "SELF_TYPE") {
                     this.error("Identifier " + case_expr.case_list.list[i].typeid+" declared with type SELF_TYPE in case branch.");
                  } else {
                    // cases->nth(i)->typecheck(stream);
                     if (case_expr.computed_type == "_no_type")
                         case_expr.computed_type = case_expr.case_list.list[i].typeid;
                     else
		                 case_expr.computed_type = this.lub(case_expr.computed_type,case_expr.case_list.list[i].typeid);
                  }
               }
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
			  if(!this.ctable.lookup(brnch.typeid)){
			      this.error("Type "+brnch.typeid+" of case branch is undefined");
			  }
		  },
		  visitCLLetList:function(brnchList){
		      for(var i=0;i<brnchList.list.length;i++){
			       brnchList.list[i].accept(this);
			  }
		  },
		  visitCLLetItem:function(letItem){
		      letItem.expr.accept(this);
			  if(letItem.objectid=="self"){
			     this.error("'self' cannot be bound in let expression");
			  }
			  if((!letItem.ctable.lookup(letItem.typeid))&&letItem.typeid!="SELF_TYPE"){
			     this.error("Clsss "+letItem.typeid+ " of let bound identifier "+letItem.objectid+" is not found.");
			  }
			  if(!this.conform(letItem.expr.computed_type,letItem.typeid)){
			      this.error("Inferred type " + letItem.expr.computed_type + " of initialization of " + letItem.objectid+
                  " does not conform to identifier's declared type " + letItem.typeid + ".");
			  }
		  }
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



