require("cool");
var source = require("file").path(require("file").cwd()).join(args[1]).read({charset: "utf-8"});
var cooltree = cool.parse(source);