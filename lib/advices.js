var Advices = require("kaop").Advices;

Advices.locals.h = require("virtual-dom/h");
Advices.locals.tohscript = require('html2hscript');
Advices.locals.$getParamIndex = function(method, paramName){
  return /\((.*,?)*\)/g
  .exec(method.toString())
  .pop()
  .split(",")
  .map(function(param){return param.trim()})
  .indexOf(paramName)
};

Advices.add(
  function evalHscript(paramName){
    var argIndex = $getParamIndex(meta.method, paramName);
    tohscript(meta.args[argIndex].trim(), function(err, parsed){
      if(err) throw err;
      var hscript = eval(parsed)
      meta.args[argIndex] = hscript;
      console.log(parsed);
      console.log(hscript);
      console.log(meta);
      next();
    });
  }
)
