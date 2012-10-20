var sa =(function(){
var sa={};
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
  method_table.enterscope();
  object_table.enterscope();
  var myclass = this.class_table->lookup(symbol);

  myclass.scan(object_table, method_table, class_table);

  for (var i= 0;this.class_map.map[symbol]&&i<this.class_map.map[symbol].length; i++)
    this.ast_traverse(this.class_map.map[symbol][i]);

  /*if (semant_debug) {
    cerr << "For class " << myclass->getname()->get_string();
    object_table->dump();
    method_table->dump();
  }*/

  object_table.exitscope();
  method_table.exitscope();
}












sa.CLSemanticAnalizer=function(prgm){
    this.prgm = prgm;
}

sa.CLSemanticAnalizer.prototype.check=function(){
    var classtable = new ClassTable().init(this.prgm.classlist);
	classtable.collect_declaration();
}


return sa;
})();



