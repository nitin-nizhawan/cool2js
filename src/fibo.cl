class Main inherits IO {
    n:Int <- 6;
    main():SELF_TYPE {
    
        out_string("Hello\nWorld\t!");
        out_int(fibo(n));
        self;  
        
    };
    fibo(n:Int):Int {
       
        if n<3 
        then
           1
        else 
        fibo(n-1) + fibo(n-2)
        fi;
    };
};