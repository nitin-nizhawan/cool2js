class Main inherits IO {
   main():Object{
     let r:Random<-new Random,n:Int in {
         r.setSeed(in_int());
         n<-in_int();
         while 0<n loop {
             out_int(r.random()).out_string("\n");
             n<-n-1;
         } pool ;
     }
   };
};

class Random {
  seed:Int;
  p1:Int<-7907;
  p2:Int<-7919;
  m:Int<-p1*p2;
  setSeed(n:Int):Int{{
    seed<-n;
    random();
  }};
  rem(a:Int,b:Int):Int{
      a-(a/b)*b
  }; 
  random():Int{{
      -- blum blum shub
      seed<-rem(seed*seed,m);    
  }};
  
};