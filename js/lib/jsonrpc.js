/**
 * JSON RPC helpers
 */

define(function(require) {
  var $ = require("zepto");
  var _ = { };

  _.openServer = function(url) {
    var self = { };
    var currentId = 1;

    self.request = function(method, params) {
      var req = {
        "jsonrpc": "2.0",
        "method": method,
        "params": params,
        "id": currentId
      };
      return $.ajax({
        type: "POST",
        url: url,
        data: JSON.stringify(req),
        dataType: "json"
      });
    }

    return self;
  }

  return _;
});
