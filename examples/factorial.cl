class Main inherits IO {
    n:Int;
	i:Int<-1;
    main():Object{{
	    n<-in_int();
        out_string("Factorials upto ");
        out_int(n);
        out_string("\n");
        while i<=n loop {
            out_int(i);
            out_string(":");
            out_int(fact(i));
            out_string(" ");
            i<-i+1;
        } pool;         	                 
	}};
	
    fact(n:Int):Int{
           if n<1
           then 1
           else
           n*fact(n-1) fi
     };
};


