
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

    var xbmc = {
    	"JSON_RPC" = "/jsonrpc",
    	"player_id" = null,
        "control" : {
            "play" :         document.getElementById('xbmc-play'),
            "pause" :        document.getElementById('xbmc-pause'),
            "next" :         document.getElementById('xbmc-next'),
            "previous" :     document.getElementById('xbmc-previous')
        },
        "manage" : {
        	"home" : document.getElementById('xbmc-home'),
        	"up" : document.getElementById('xbmc-up'),
        	"right" : document.getElementById('xbmc-right'),
        	"ok" : document.getElementById('xbmc-ok'),
        	"bottom" : document.getElementById('xbmc-bottom'),
        	"left" : document.getElementById('xbmc-left')
        },

    	request : function(url,method,player_id,callback) {

    		if(method === 'init_xbmc') {
    			$.post(this.JSON_RPC + '?'+url,'{"jsonrpc": "2.0", "method": "Player.GetActivePlayers", "id": 1}', callback);
    			return;
    		}

    		$.post(this.JSON_RPC + '?'+url,'{"jsonrpc": "2.0", "method": "'+method+'", "params": { "playerid": '+player_id+'}, "id": 1}', callback);
    	},

        init : function() {
        	var that = this;
        	that.request('UpdatePlayer','init_xbmc',null,function(data){
        		if(data.result.length > 0) {
        			that.player_id  = data.result[0].playerid;
        		}else{
        			alert('Votre Serveur XBMC n\'est pas actif');
        		}

        	});
        },

    	play : function() {
    		this.request('SendRemoteKey','Player.PlayPause',this.player_id, function(data) {
    			console.log(data);
    		});
    	}
    }
        
        
        
        
        



    };
});

