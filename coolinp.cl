
(*
  demo class
  *)
class Main inherits SuperMain {
  -- main method  
  hw:HelloWorld<-new HelloWorld;
  main():SELFTYPE{
      printthing();
	  outstring(hw.getString());
  };
    
};
class SuperMain inherits IO {
    printthing():SELFTYPE{
	    outstring(1+2*4/5);
		self;
	};
}; 	
class HelloWorld {
   getString():String{
 "Hello World";  };
};
