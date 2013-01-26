
// This uses require.js to structure javascript:
// http://requirejs.org/docs/api.html#define

define(function(require) {
    // Zepto provides nice js and DOM methods (very similar to jQuery,
    // and a lot smaller):
    // http://zeptojs.com/
    console.log("hi");
    var $ = require('zepto');
    var rpc = require('jsonrpc');
    window.rpc = rpc;


});

