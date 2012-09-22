
(*
  demo class
  *)
class Main inherits SuperMain {
  -- main method  
  hw:HelloWorld<-new HelloWorld;
  main():SELFTYPE{
      printthing();
	  out_string(hw.getString());
	  let hw:Int<-1*45,op:Int in {
	      out_string(hw+op);
		  out_string(hw*op);
      };
	  out_string(fibo(6));
	  let c:Int in {
	     while c<8 loop  {
	      out_string(fibo(c));
		  out_string(" ");
		  c<-c+1; }
		  pool;
	  };
  };
    
};
class SuperMain inherits IO {
    printthing():SELFTYPE{
	    out_string(1+2*4/5);
		self;
	};
	fibo(n:Int):Int{
	   let f:Int,s:Int<-1,c:Int,tmp:Int in {
	       while c<n loop {
		     tmp<-f;
			 f<-s;
			 s<-f+tmp;
			-- out_string(f);
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
