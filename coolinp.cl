
(*
  demo class
  *)
class Main inherits SuperMain {
  -- main method  
  hw:HelloWorld<-new HelloWorld;
  main():SELFTYPE{
      printthing();
	  outstring(hw.getString());
	  let hw:Int<-1*45,op:Int in {
	      outstring(hw+op);
		  outstring(hw*op);
      };
	  outstring(5);
  };
    
};
class SuperMain inherits IO {
    printthing():SELFTYPE{
	    outstring(1+2*4/5);
		self;
	};
	fibo(n:Int):Int{
	   fibo(n*fibo(n-1));
	};
}; 	
class HelloWorld {
   sstring:String<-"Hello World";
   getString():String{
   sstring<-"Yo!!!";
 sstring;  };
};
