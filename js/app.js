
// This uses require.js to structure javascript:
// http://requirejs.org/docs/api.html#define

define(function(require) {
    // Zepto provides nice js and DOM methods (very similar to jQuery,
    // and a lot smaller):
    // http://zeptojs.com/
    var $ = require('zepto');
    var rpc = require('jsonrpc');
    window.rpc = rpc;

    var base_url = 'http://10.102.180.42:3920/';
    var xbmc = {
    	"JSON_RPC" : "/jsonrpc",
    	"player_id" : null,
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
    			$.post(base_url+this.JSON_RPC + '?'+url,'{"jsonrpc": "2.0", "method": "Player.GetActivePlayers", "id": 1}', callback);
    			return;
    		}

    		$.post(base_url+this.JSON_RPC + '?'+url,'{"jsonrpc": "2.0", "method": "'+method+'", "params": { "playerid": '+player_id+'}, "id": 1}', callback);
    	},

        init : function() {
        	alert('On test');
        	var that = this;
        	that.request('UpdatePlayer','init_xbmc',null,function(data){
        		alert('Request Access init');
        		if(data.result.length > 0) {
        			that.player_id  = data.result[0].playerid;
        		}else{
        			alert('Votre Serveur XBMC n\'est pas actif');
        		}

        	});
        },

    	playPause : function() {
    		this.request('SendRemoteKey','Player.PlayPause',this.player_id, function(data) {

    			if("undefined" == typeof data.result.speed) {
    				alert('Une erreur est survenue');
    				return;
    			}
 
    			if(data.result.speed == 0) {
    				this.control.classList.add('status_paused');
    			}else {
    				this.control.classList.remove('status_paused');
    			}

    		});
    	},

    	next : function() {
    		'?SkipNext', '{"jsonrpc": "2.0", "method": "Player.GoNext", "params": { "playerid": 1}, "id": 1}'
    	},

    	previous : function() {
    		'?SkipPrevious', '{"jsonrpc": "2.0", "method": "Player.GoPrevious", "params": { "playerid": 1 }, "id": 1}'
    	},

    	up : function() {

    	},

    	down : function() {

    		
    	}
    };

    xbmc.init();
    xbmc.playPause();

    window.xbmc = rpc.openServer("http://localhost:8080/jsonrpc")

    window.test = function() {
      window.xbmc.request("Application.GetProperties", { properties: ["volume"] }, function(d) {

      	alert('It Works');
      });
    }
});

