var ds = (function(){
	var ret={};
   // util functions 
   function mixin(obj1,obj2){
	   for(var a in obj2){
		   obj1[a]=obj2[a];
	   }
   }
   function jsWriter(){
       var acc=[];
       var jsFunc = function(){
	       for(var s =0;s<arguments.length;s++){
		       acc.push(arguments[s]);
		   }
       }	   
	   jsFunc.out=function(){
	       return acc.join("\n");
	   }
	   jsFunc.a=function(){
	       for(var s=0;s<arguments.length;s++){
		       acc[acc.length-1]+=arguments[s];
		   }
	   }
	   return jsFunc;
   }
// Program class
   
   ret.CLProgram=function(classlist){
	   this.classlist = classlist;
   }
   mixin(ret.CLProgram.prototype,(function(){
	   return {
	       appendChildrenToQ:function(map,className,q){
		        if(map[className]){
					    for(x=0;x<map[className].length;x++){
						    q.push(map[className][x]);
						}
	            }		
		   },
		   accept:function(visitor){
				    // build inheritance hierarchy
					visitor.visitCLProgram(this);
					var map={};
					var x;
					for(x=0;x<this.classlist.length;x++){
					    if(!map[this.classlist[x].pclass]){
						    map[this.classlist[x].pclass]=[this.classlist[x]];
						} else {
						    map[this.classlist[x].pclass].push(this.classlist[x]);
						}
					}
					var qu=[];
					this.appendChildrenToQ(map,"Object",qu);
					this.appendChildrenToQ(map,"IO",qu);
					
					while(qu.length>0){
					    var curclass = qu.shift();
						curclass.accept(visitor);
						this.appendChildrenToQ(map,curclass.name,qu);
					}
					
		   }
	   };
   })());
   
   
//Class class
ret.CLClass=function(name,pclass,featureList){
	this.name=name;
	this.pclass = pclass;
	this.featureList = featureList;
	this.featureList.setClass(this);
  }
  mixin(ret.CLClass.prototype,(function(){
	  return {
	      getMethodList:function(){
		      return this.featureList.methodList;
		  },
		  getAttrList:function(){
		      return this.featureList.attrList;
		  },
		  accept:function(visitor){
				visitor.visitCLClass(this);
          }
	  };
  })());
  
  
  
// Features
ret.CLAttrList=function(){
    this.list=[];
	this.containingClass="No_Class";
}
mixin(ret.CLAttrList.prototype,(function(){
    return {
	    append:function(item){
		    this.list.push(item);
		},
		accept:function(visitor){
		    //visitor.visitAttrList(this);
			for(var x=0;x<this.list.length;x++){
			    this.list[x].accept(visitor);
			}
		},
		setClass:function(cls){
		    this.containingClass=cls;
		}
	};
})());
ret.CLMethodList=function(){
    this.list=[];
	this.containingClass="No_Class";
}
mixin(ret.CLMethodList.prototype,(function(){
    return {
	    append:function(item){
		    this.list.push(item);
		},
		accept:function(visitor){
		    for(var x=0;x<this.list.length;x++){
			    this.list[x].containingClass = this.containingClass;
			    this.list[x].accept(visitor);
			}
		},
		setClass:function(cls){
		    this.containingClass=cls;
		}
	};
})());
ret.CLFeatureList=function(){
    this.attrList=new ret.CLAttrList();
	this.methodList = new ret.CLMethodList();	
}
mixin(ret.CLFeatureList.prototype,(function(){
    return {
	    setClass:function(cls){
		    this.containingClass = cls;
			this.attrList.setClass(cls);
			this.methodList.setClass(cls);
		},
	    append:function(item){
		   if(item.type=="CLAttr"){
	         this.attrList.append(item);
	       } else {
	         this.methodList.append(item);
	       }
		},
	    accept:function(visitor){
		}
	};
})());


ret.CLMethod=function(name,formals,typeid,body){
    this.name=name;
	this.paramList = formals;
	this.typeid = typeid;
	this.body = body;
	this.type="CLMethod";
	this.containingClass="No_Class";
}
 mixin(ret.CLMethod.prototype,(function(){
	  return {
		  accept:function(visitor){
		      visitor.visitMethod(this);
		  }
	  };
  })());
ret.CLAttr=function(name,typeid,expr){
   this.name=name;
   this.typeid=typeid;
   this.expr = expr;
   this.type="CLAttr";
}  
mixin(ret.CLAttr.prototype,(function(){
	  return {
		  accept:function(visitor){
		      visitor.visitAttr(this);
		  }
	  };
 })());


ret.CLFormal=function(objid,typeid){
    this.objectid = objid;
	this.typeid = typeid;
} 
mixin(ret.CLFormal.prototype,(function(){
	  return {
		  accept:function(visitor){
		      visitor.visitCLFormal(this);
		  }
	  };
 })());
ret.CLFormalList=function(){
    this.list=[];
} 
mixin(ret.CLFormalList.prototype,(function(){
	  return {
		  accept:function(visitor){
		      visitor.visitCLFormalList(this);
		  },
		  append:function(item){
		      this.list.push(item);
		  }
	  };
 })());
 
ret.CLExprCommaSepList=function(){
    this.list=[];
} 
mixin(ret.CLExprCommaSepList.prototype,(function(){
    return {
	    append:function(item){
		    this.list.push(item);
		},
	    accept:function(visitor){
		    visitor.visitExprCommaSepList(this);
		}
	};
})()); 
ret.CLExprSemiColonList=function(){
    this.list=[];
} 
mixin(ret.CLExprSemiColonList.prototype,(function(){
    return {
	    append:function(item){
		    this.list.push(item);
		},
	    accept:function(visitor){
		     visitor.visitExprSemiColonList(this);
		}
	};
})());

ret.CLBranchList=function(){
    this.list = [];
}
mixin(ret.CLBranchList.prototype,(function(){
    return {
	      append:function(item){
		      this.list.push(item);
		  },
	      accept:function(visitor){
		      
		  }
	};
})());
ret.CLBranch=function(objid,typeid,expr){
    this.objectid = objid;
    this.typeid = typeid;
    this.expr = expr;
}
mixin(ret.CLBranch.prototype,(function(){
    return {
	      accept:function(visitor){
		      
		  }
	};
})());
ret.CLCaseExpr=function(expr,case_list){
    this.expr = expr;
	this.case_list = case_list;
}
mixin(ret.CLCaseExpr.prototype,(function(){
    return {
	      accept:function(visitor){
		      visitor.visitCLCaseExpr(this);
		  }
	};
})());
ret.CLLetExpr=function(let_list,expr){
    this.let_list = let_list;
	this.expr = expr;
}
mixin(ret.CLLetExpr.prototype,(function(){
    return {
	      accept:function(visitor){
		      visitor.visitCLLetExpr(this);
		  }
	};
})());
ret.CLLetList=function(){
    this.list=[];
}
mixin(ret.CLLetList.prototype,(function(){
    return {
	      accept:function(visitor){
		  },
		  append:function(item){
		      this.list.push(item);
		  }
	};
})());
ret.CLLetItem=function(objid,typeid,expr){
    this.objectid = objid;
	this.typeid = typeid;
	this.expr = expr;
}
mixin(ret.CLLetItem.prototype,(function(){
    return {
	      accept:function(visitor){
		  }
	};
})());
//  Expressions 
ret.CLAssign=function(objectid,expr){
   this.objectid = objectid;
   this.expr = expr;
}
mixin(ret.CLAssign.prototype,(function(){
   return {
       accept:function(visitor){
	       visitor.visitCLAssign(this);
	   }
   };
})());
ret.CLStaticDispatch=function(expr,typeid,objectid,params){
   this.expr = expr;
   this.typeid = typeid;
   this.objectid=objectid;
   this.params = params
}  
mixin(ret.CLStaticDispatch.prototype,(function(){
	  return {
		  accept:function(visitor){
		      visitor.visitStaticDispatch(this);
		  }
	  };
 })()); 
ret.CLDispatch=function(expr,objectid,params){
   this.expr = expr;
   this.objectid=objectid;
   this.params = params
}  
mixin(ret.CLDispatch.prototype,(function(){
	  return {
		  accept:function(visitor){
		      visitor.visitDispatch(this);
		  }
	  };
 })()); 
ret.CLCond=function(expr1,expr2,expr3){
    this.expr1 = expr1;
	this.expr2 = expr2;
	this.expr3 = expr3;
}
mixin(ret.CLCond.prototype,(function(){
    return {
	    accept:function(visitor){
		     visitor.visitCLCond(this);
		}
	};
})());
ret.CLLoop=function(expr1,expr2){
    this.expr1 = expr1;
	this.expr2 = expr2;
}
mixin(ret.CLLoop.prototype,(function(){
    return {
	    accept:function(visitor){
		     visitor.visitCLLoop(this);
		}
	};
})());
ret.CLBlock=function(semi_colon_list){
   this.expr_list = semi_colon_list;
} 
mixin(ret.CLBlock.prototype,(function(){
    return {
	    accept:function(visitor){
		     visitor.visitCLBlock(this);
		}
	};
})());
ret.CLNew=function(expr){
    this.expr = expr;
}
mixin(ret.CLNew.prototype,(function(){
    return {
	    accept:function(visitor){
		     visitor.visitCLNew(this);
		}
	};
})());
ret.CLIsvoid=function(expr){
    this.expr = expr;
}
mixin(ret.CLIsvoid.prototype,(function(){
    return {
	    accept:function(visitor){
		    visitor.visitCLIsvoid(this);
		}
	};
})());
ret.CLPlus=function(expr1,expr2){
  this.expr1 = expr1;
  this.expr2 = expr2;    
}
mixin(ret.CLPlus.prototype,(function(){
	  return {
		  accept:function(visitor){
		       visitor.visitCLPlus(this);
		  }
	  };
})());
ret.CLSub=function(expr1,expr2){
  this.expr1 = expr1;
  this.expr2 = expr2;    
}
mixin(ret.CLSub.prototype,(function(){
	  return {
		  accept:function(visitor){
		       
		       visitor.visitCLSub(this);
		       
		  }
	  };
})());
ret.CLMul=function(expr1,expr2){
  this.expr1 = expr1;
  this.expr2 = expr2;    
}
mixin(ret.CLMul.prototype,(function(){
	  return {
		  accept:function(visitor){
		       
		       visitor.visitCLMul(this);
		       
		  }
	  };
})());
ret.CLDivide=function(expr1,expr2){
  this.expr1 = expr1;
  this.expr2 = expr2;
}
mixin(ret.CLDivide.prototype,(function(){
	  return {
		  accept:function(visitor){
		       visitor.visitCLDivide(this);
		       
		  }
	  };
})());
 ret.CLNeg=function(expr){
  this.expr = expr;
}
mixin(ret.CLNeg.prototype,(function(){
	  return {
		  accept:function(visitor){
		       this.expr.accept(visitor);
		       visitor.visitCLNeg(this);
		  }
	  };
})());
 ret.CLLt=function(expr1,expr2){
  this.expr1 = expr1;
  this.expr2 = expr2;
}

mixin(ret.CLLt.prototype,(function(){
	  return {
		  accept:function(visitor){
		       visitor.visitCLLt(this);
		  }
	  };
})());
 ret.CLLeq=function(expr1,expr2){
  this.expr1 = expr1;
  this.expr2 = expr2;
}
mixin(ret.CLLeq.prototype,(function(){
	  return {
		  accept:function(visitor){
		       visitor.visitCLLeq(this);
		  }
	  };
})());

ret.CLEq=function(expr1,expr2){
  this.expr1 = expr1;
  this.expr2 = expr2;
}
mixin(ret.CLEq.prototype,(function(){
	  return {
		  accept:function(visitor){
		       visitor.visitCLEq(this);
		 }
	  };
})());
ret.CLComp=function(expr){
  this.expr = expr;
}
mixin(ret.CLComp.prototype,(function(){
	  return {
		  accept:function(visitor){
		       visitor.visitCLComp(this);
		  }
	  };
})());
ret.CLObject=function(val){
    this.val = val;
}
mixin(ret.CLObject.prototype,(function(){
	  return {
		  accept:function(visitor){
		       visitor.visitCLObject(this);
		     
		  }
	  };
})());
ret.CLIntConst=function(val){
   this.val=val;
}  
mixin(ret.CLIntConst.prototype,(function(){
	  return {
		  accept:function(visitor){
		       visitor.visitCLIntConst(this);
		     
		  }
	  };
 })());
ret.CLStringConst=function(val){
   this.val=val;
}  
mixin(ret.CLStringConst.prototype,(function(){
	  return {
		  accept:function(visitor){
		       visitor.visitCLStringConst(this);
		     
		  }
	  };
 })());
ret.CLBoolConst=function(val){
   this.val=val;
}  
mixin(ret.CLBoolConst.prototype,(function(){
	  return {
		  accept:function(visitor){
		       visitor.visitCLBoolConst(this);
		     
		  }
	  };
 })());
 
// mamoth visitor 
ret.CLCodeGenVisitor=function(ns,prgm){
    this.ns = ns;
	this.program = prgm;
	this.js=jsWriter();
}

mixin(ret.CLCodeGenVisitor.prototype,(function(){
	  return {
	      out:function(){
		     return this.js.out();
		  },
		  codegen:function(){
		      this.js("var tmpns={};");
		      this.program.accept(this);
			  this.js("new "+this.ns+".CLPrefix_Main().$init().main();");
		  },
	      installUtils:function(){
		       // add mixin function
			   this.js(this.ns+".mixin=function(obj1,obj2){");
			   this.js("    for(var x in obj2){");
			   this.js("        obj1[x]=obj2[x];");
			   this.js("    }");
			   this.js("}");
			   this.js(this.ns+".isVoid=function(obj1){");
			   this.js("   if(typeof(obj1)==\"undefined\"||obj1==null){");
			   this.js("        return true;");
			   this.js("   }");
			   this.js(" return false; ");
			   this.js("}");
		   },
		   installSystemClasses:function(){
		       // Object class
			   this.js(this.ns+".CLPrefix_Object=function(){");
			   this.js("this.$__CL_type_id=\"Object\";");
			   this.js("}");
			   this.js(this.ns+".CLPrefix_Object.prototype.type_name=function(){");
			   this.js("    return new "+this.ns+".CLPrefix_String().$init(this.$__CL_type_id);");
			   this.js("}");
			   this.js(this.ns+".CLPrefix_Object.prototype.$init=function(){");
			   this.js("    return this;");
			   this.js("}");
			   this.js(this.ns+".CLPrefix_Object.prototype.$eq=function(objref){");
			   this.js("    return new "+this.ns+".CLPrefix_Bool().$init(this===objref);");
			   this.js("}");
			   this.js(this.ns+".CLPrefix_Object.prototype.abort=function(){");
			   this.js(" throw new Error(\"Program Aborted\") ;");
			   this.js("}");
			   // IO Class
			   this.js(this.ns+".CLPrefix_IO=function(){");
			   this.js("this.$__CL_type_id=\"IO\";");
			   this.js("}");
			   this.js(this.ns+".CLPrefix_IO.prototype=new "+this.ns+".CLPrefix_Object();\n");
			   this.js(this.ns+".CLPrefix_IO.prototype.constructor="+this.ns+".CLPrefix_IO;\n");
			   this.js(this.ns+".CLPrefix_IO.prototype.out_string=function(v){");
			   this.js("    yy.printstr(v.$val);return this;");
			   this.js("}");
			   this.js(this.ns+".CLPrefix_IO.prototype.out_int=function(v){");
			   this.js("    yy.printstr(v.$val);return this;");
			   this.js("}");
			   this.js(this.ns+".CLPrefix_IO.prototype.in_int=function(v){");
			   this.js("return new "+this.ns+".CLPrefix_Int().$init(yy.readstr());");
			   this.js("}");
			   this.js(this.ns+".CLPrefix_IO.prototype.in_string=function(v){");
			   this.js("return new "+this.ns+".CLPrefix_String().$init(yy.readstr());");
			   this.js("}");
			   // String class
			   this.js(this.ns+".CLPrefix_String=function(){");
			   this.js("this.$__CL_type_id=\"String\";");
			   this.js("this.$val=\"\";");
			   this.js("}");
			   this.js(this.ns+".CLPrefix_String.prototype=new "+this.ns+".CLPrefix_Object();\n");
			   this.js(this.ns+".CLPrefix_String.prototype.constructor="+this.ns+".CLPrefix_String;\n");
			   this.js(this.ns+".CLPrefix_String.prototype.$init=function(v){");
			   this.js(" this.$val=((typeof(v)==\"undefined\")?\"\":v);return this;");
			   this.js("}");
			   //length
			   this.js(this.ns+".CLPrefix_String.prototype.length=function(v){");
			   this.js(" return new "+this.ns+".CLPrefix_Int().$init(this.$val.length);");
			   this.js("}");
			   //concat
			   this.js(this.ns+".CLPrefix_String.prototype.concat=function(v){");
			   this.js(" return new "+this.ns+".CLPrefix_String().$init(this.$val+v.$val);");
			   this.js("}");
			   //substr
			   this.js(this.ns+".CLPrefix_String.prototype.substr=function(i,l){");
			   this.js(" return new "+this.ns+".CLPrefix_String().$init(this.$val.substr(i.$val,l.$val));");
			   this.js("}");
			     //$eq
			   this.js(this.ns+".CLPrefix_String.prototype.$eq=function(pstr){");
			   this.js(" return new "+this.ns+".CLPrefix_Bool().$init(this.$val==pstr.$val);");
			   this.js("}");
			   //Int Class
			   this.js(this.ns+".CLPrefix_Int=function(){");
			   this.js("this.$__CL_type_id=\"Int\";");
			   this.js("this.$val=0;");
			   this.js("}");
			   this.js(this.ns+".CLPrefix_Int.prototype=new "+this.ns+".CLPrefix_Object();\n");
			   this.js(this.ns+".CLPrefix_Int.prototype.constructor="+this.ns+".CLPrefix_Int;\n");
			   this.js(this.ns+".CLPrefix_Int.prototype.$init=function(v){");
			   this.js(" this.$val=((typeof(v)==\"undefined\")?0:v);return this;");
			   this.js("}");
			   // plus
			   this.js(this.ns+".CLPrefix_Int.prototype.$plus=function(v){");
			   this.js("return new "+this.ns+".CLPrefix_Int().$init(this.$val+v.$val);");
			   this.js("}");
			   //sub
			   this.js(this.ns+".CLPrefix_Int.prototype.$sub=function(v){");
			   this.js(" return new "+this.ns+".CLPrefix_Int().$init(this.$val-v.$val);");
			   this.js("}");
			   //divide
			   this.js(this.ns+".CLPrefix_Int.prototype.$divide=function(v){");
			   this.js("return new "+this.ns+".CLPrefix_Int().$init(~~(this.$val/v.$val));");
			   this.js("}");
			   //mult
			   this.js(this.ns+".CLPrefix_Int.prototype.$mult=function(v){");
			   this.js("return new "+this.ns+".CLPrefix_Int().$init(this.$val*v.$val);");
			   this.js("}");
			   //le
			   this.js(this.ns+".CLPrefix_Int.prototype.$le=function(v){");
			   this.js("return new "+this.ns+".CLPrefix_Bool().$init(this.$val<=v.$val);");
			   this.js("}");
			   //lt
			   this.js(this.ns+".CLPrefix_Int.prototype.$lt=function(v){");
			   this.js("return new "+this.ns+".CLPrefix_Bool().$init(this.$val<v.$val);");
			   this.js("}");
			   //eq
			   this.js(this.ns+".CLPrefix_Int.prototype.$eq=function(v){");
			   this.js("return new "+this.ns+".CLPrefix_Bool().$init(this.$val===v.$val);");
			   this.js("}");
			   //neg
			   this.js(this.ns+".CLPrefix_Int.prototype.$neg=function(){");
			   this.js("return new "+this.ns+".CLPrefix_Int().$init(-1*this.$val);");
			   this.js("}");
			   //Bool class
			   this.js(this.ns+".CLPrefix_Bool=function(){");
			   this.js("this.$__CL_type_id=\"Bool\";");
			   this.js("this.$val=false;");
			   this.js("}");
			   this.js(this.ns+".CLPrefix_Bool.prototype=new "+this.ns+".CLPrefix_Object();\n");
			   this.js(this.ns+".CLPrefix_Bool.prototype.constructor="+this.ns+".CLPrefix_Bool;\n");
			   this.js(this.ns+".CLPrefix_Bool.prototype.$init=function(v){");
			   this.js(" this.$val=((typeof(v)==\"undefined\")?false:v);return this;");
			   this.js("}");
			   this.js(this.ns+".CLPrefix_Bool.prototype.$eq=function(v){");
			   this.js("return new "+this.ns+".CLPrefix_Bool().$init(this.$val===v.$val);");
			   this.js("}");
			   this.js(this.ns+".CLPrefix_Bool.prototype.$comp=function(v){");
			   this.js("return new "+this.ns+".CLPrefix_Bool().$init(!this.$val);");
			   this.js("}");
		  },
		  visitCLProgram:function(prg){
		      this.installUtils();
			  this.installSystemClasses();
		  },
		  visitCLClass:function(cls){
		      this.js(this.ns+".CLPrefix_"+cls.name+"=function(){");
			  this.js("this.$__CL_type_id=\""+cls.name+"\";");
			      //moved to $init for now, cls.getAttrList().accept(this);
			  this.js("}");
			  // inheritance
			  this.js(this.ns+".CLPrefix_"+cls.name+".prototype=new "+this.ns+".CLPrefix_"+cls.pclass+"();");
			  this.js(this.ns+".CLPrefix_"+cls.name+".prototype.constructor="+this.ns+".CLPrefix_"+cls.name+";");
			  // add empty constructor function
			  this.js(this.ns+".CLPrefix_"+cls.name+".prototype.$init=function(){");
			  this.js(this.ns+".CLPrefix_"+cls.pclass+".prototype.$init.call(this);");
			  this.js("var self=this;");
			  this.js("with(self){");
			  cls.getAttrList().accept(this);
			  this.js("return self;");
			  this.js("}};");
			  cls.getMethodList().accept(this);
		  },
		  visitAttr:function(attr){
		      this.js("this."+attr.name);
			  this.js.a("=");
			  if(attr.expr){
			     attr.expr.accept(this);
			  } else if(attr.typeid=="Int"){
			     this.js.a("new "+this.ns+".CLPrefix_Int().$init(0)");
			  } else if(attr.typeid=="String"){
			     this.js.a("new "+this.ns+".CLPrefix_String().$init(\"\")");
			  } else if(attr.typeid=="Bool"){
			     this.js.a("new "+this.ns+".CLPrefix_Bool().$init(false)");
			  } else {
			     this.js.a("undefined");
			  }
			  this.js.a(";");
		  },
		  visitMethod:function(method){
		      this.js(this.ns+".CLPrefix_"+method.containingClass.name+".prototype."+method.name+"=function(");
			      method.paramList.accept(this);
			  this.js.a("){");
			  this.js.a("var CLPrefix_cooljs_param={};");
			  for(var x=0;x<method.paramList.list.length;x++){
			      this.js.a("CLPrefix_cooljs_param."+method.paramList.list[x].objectid+"="+method.paramList.list[x].objectid+";");
			  }
			  this.js("var self = this;");
			  this.js("with(self){");
			  this.js("with(CLPrefix_cooljs_param){");
			  this.js.a("return ");
			      method.body.accept(this);
			   this.js.a(";");
			  this.js("}}};")
		  },
		  visitExprSemiColonList:function(explist){
		      for(var x=0;x<explist.list.length;x++){
			      if(x==explist.list.length-1){
				      this.js("return ");
				  } else {
				       this.js("");
				  }
				  explist.list[x].accept(this);
				  this.js.a(";");
			  }
		  },
		  visitCLLetExpr:function(letexpr){
		      this.js.a("(function(");
			  for(var x=0;x<letexpr.let_list.list.length;x++){
			      if(x>0) this.js.a(",");
			      this.js.a(letexpr.let_list.list[x].objectid);
			  }
			  this.js.a("){");
			     this.js.a("return ");
			     letexpr.expr.accept(this);
				 this.js.a(";");
			  this.js.a("})(");
			  for(var x=0;x<letexpr.let_list.list.length;x++){
			      if(x>0) this.js.a(",");
				  if(letexpr.let_list.list[x].expr){
				      letexpr.let_list.list[x].expr.accept(this);
				  } else if(letexpr.let_list.list[x].typeid=="Int") {
				      this.js.a("new "+this.ns+".CLPrefix_Int().$init()");
				  } else if(letexpr.let_list.list[x].typeid=="String") {
				      this.js.a("new "+this.ns+".CLPrefix_String().$init()");
				  } else if(letexpr.let_list.list[x].typeid="Bool"){	  
				      this.js.a("new "+this.ns+".CLPrefix_Bool().$init()");
				  } else {
				      this.js.a("undefined");
				  }
			      
			  }
			  this.js.a(")");
		  },
		  visitCLNew:function(newobj){
		      this.js.a("((new "+this.ns+".CLPrefix_"+newobj.expr+"()).$init())");
		  },
		  visitCLIsvoid:function(isvoid){
		      this.js.a("(new "+this.ns+".CLPrefix_Bool().$init("+this.ns+".isVoid(");
			  isvoid.expr.accept(this);
			  this.js.a(")))");
		  },
		  visitCLPlus:function(plus){
		      this.js.a("(");
		      plus.expr1.accept(this);
		      this.js.a(".$plus(");
			  plus.expr2.accept(this);
			  this.js.a("))");
		  },
		  visitCLSub:function(sub){
		      this.js.a("(");
			  sub.expr1.accept(this);
		      this.js.a(".$sub(");
			  sub.expr2.accept(this);
			  this.js.a("))");
		  },
		  visitCLMul:function(mul){
		      this.js.a("(");
			  mul.expr1.accept(this);
		      this.js.a(".$mult(");
			  mul.expr2.accept(this);
			  this.js.a("))");
		  },
		  visitCLDivide:function(dvd){
		      this.js.a("(");
			  dvd.expr1.accept(this);
		      this.js.a(".$divide(");
			  dvd.expr2.accept(this);
			  this.js.a("))");
		  },
		  visitCLNeg:function(exp){
		      this.js.a(".$neg()");
		  },
		  visitCLLt:function(eq){
		      this.js.a("(");
			  eq.expr1.accept(this);
		      this.js.a(".$lt(");
			  eq.expr2.accept(this);
			  this.js.a("))");
		  },
		  visitCLLeq:function(eq){
		      this.js.a("(");
			  eq.expr1.accept(this);
		      this.js.a(".$le(");
			  eq.expr2.accept(this);
			  this.js.a("))");
		  },
		  visitCLEq:function(eq){
		      this.js.a("(");
			  eq.expr1.accept(this);
		      this.js.a(".$eq(");
			  eq.expr2.accept(this);
			  this.js.a("))");
		  },
		  visitCLComp:function(comp){
		      comp.expr1.accept(this);
		      this.js.a(".$comp()");
		  },
		  visitCLObject:function(objid){
		       this.js.a("("+objid.val+")");
		  },
		  visitCLIntConst:function(int_const){
		       this.js.a("new "+this.ns+".CLPrefix_Int().$init("+int_const.val+")");
		  },
		  visitCLStringConst:function(string_const){
		       this.js.a("new "+this.ns+".CLPrefix_String().$init(\""+string_const.val+"\")");
		  },
		  visitCLBoolConst:function(bool_const){
		      this.js.a("new "+this.ns+".CLPrefix_Bool().$init("+bool_const.val+")");
		  },
		  visitCLAssign:function(asgn){
		      this.js.a(asgn.objectid);
		      this.js.a("=");
			  asgn.expr.accept(this);
		  },
		  visitStaticDispatch:function(dispatch){
		        this.js.a(this.ns+".CLPrefix_"+dispatch.typeid+".prototype."+dispatch.objectid+".apply(");
		       this.js.a("(");
		       dispatch.expr.accept(this);
		       this.js.a("),[");
			       dispatch.params.accept(this);
			   this.js.a("])")
		  },
		  visitDispatch:function(dispatch){
		       this.js.a("(");
		       dispatch.expr.accept(this);
		       this.js.a(")."+dispatch.objectid+"(");
			       dispatch.params.accept(this);
			   this.js.a(")")
		  },
		  visitExprCommaSepList:function(explist){
		      for(var x=0;x<explist.list.length;x++){
			      if(x>0){
				      this.js.a(",");
				  }
				  explist.list[x].accept(this);
			  }
		  },
		  visitCLFormalList:function(flist){
		      for(var x=0;x<flist.list.length;x++){
			      if(x>0) this.js.a(",");
				  flist.list[x].accept(this);
			  }
		  },
		  visitCLFormal:function(formal){
		     this.js.a(formal.objectid);
		  },
		  visitCLBlock:function(block){
		     this.js.a("(function(){");
			   block.expr_list.accept(this);
			 this.js.a("})()");
		  },
		  visitCLCond:function(cond){
		      this.js.a("(function(){if(");
			  cond.expr1.accept(this);
			  this.js.a(".$val) return ");
			  cond.expr2.accept(this);
			  this.js.a("; else return ");
			  cond.expr3.accept(this);
			  this.js.a("; })()");
		  },
		  visitCLLoop:function(loop){
		     this.js.a("(function(){")
			 this.js.a("while(");
			     loop.expr1.accept(this);
			 this.js.a(".$val){");
			     loop.expr2.accept(this);
			 this.js.a("}");
			 this.js.a("})()");
		  },
		  visitCLCaseExpr:function(case_expr){
		      this.js.a("(function($case_expr){");
			    for(var x=0;x<case_expr.case_list.list.length;x++){
				     var case_branch = case_expr.case_list.list[x];
					 this.js.a("if($case_expr instanceof "+this.ns+".CLPrefix_"+case_branch.typeid+")");
					 this.js.a("return ");
					     this.js.a("(function("+case_branch.objectid+"){");
						 this.js.a("return ");
						   case_branch.expr.accept(this);
						 this.js.a(";");
						 this.js.a("})($case_expr)");
					 this.js.a("; else ");
				}
				this.js.a("throw new Error(\"No case matched\");");
			  this.js.a("})(");
			     case_expr.expr.accept(this);
			  this.js.a(")");
		  }
	  };
 })());

return ret;
})();

if(typeof (module)!="undefined"){
module.exports=ds;
}