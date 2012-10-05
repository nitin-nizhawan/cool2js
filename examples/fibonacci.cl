class Main inherits IO {
    n:Int;
	i:Int<-1;
    main():Object{{
	    n<-in_int();
        out_string("Fibonacci Sequence upto ");
        out_int(n);
        out_string("\n");
        while i<=n loop {
            out_int(i);
            out_string(":");
            out_int(fibo(i));
            out_string(" ");
            i<-i+1;
        } pool;         	                 
	}};
	
    fibo(n:Int):Int{   
	     if n<2
           then
             n
            else
	    fibo(n-1)+fibo(n-2) fi
	};
};


