var Class = require("kaop").Class;
var parser = require("html2hscript");
var createElement = require("virtual-dom/create-element");
var diff = require('virtual-dom/diff');
var patch = require('virtual-dom/patch');

module.exports = dms = Class.static({
    create: ["evalHscript: 'hscript'", function(hscript, appendTo){
      var node = createElement(hscript);
      appendTo.appendChild(node);
      return {
        hscript: hscript,
        node: node
      }
    }],
    update: ["evalHscript: 'hscript'", function(hscript, oldhscript, node){
      var patches = diff(oldhscript, hscript);
      node = patch(node, patches);
      return {
        hscript: hscript,
        node: node
      }
    }]
});
