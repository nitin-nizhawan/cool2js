
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
	  outstring(fibo(6));
	  let c:Int in {
	     while c<8 loop  {
	      outstring(fibo(c));
		  outstring(" ");
		  c<-c+1; }
		  pool;
	  };
  };
    
};
class SuperMain inherits IO {
    printthing():SELFTYPE{
	    outstring(1+2*4/5);
		self;
	};
	fibo(n:Int):Int{
	   let f:Int,s:Int<-1,c:Int,tmp:Int in {
	       while c<n loop {
		     tmp<-f;
			 f<-s;
			 s<-f+tmp;
			-- outstring(f);
		     c <- c + 1; }
		   pool;
		   f;
	   };
	};
}; 	
class HelloWorld {
   sstring:String<-"Hello World";
   getString():String{
   sstring<-"Yo!!!";
 sstring;  };
};
