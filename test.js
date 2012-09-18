//var Parser = require("jison").Parser;
var cool = require("./cool.js");
var ds = require("./datastruct.js");

//var langlex =   require('fs').readFileSync(require('path').resolve("cool.js"), "utf8");
var coolprg =   require('fs').readFileSync(require('path').resolve("coolinp.cl"), "utf8");

//var tb=eval(langlex);
//console.log(ds);
cool.parser.yy.ds=ds;


var cooltree = cool.parser.parse(coolprg);



//console.log(cool);

