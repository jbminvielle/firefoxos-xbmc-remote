Quelques informations sur XBMC

La clé **playerid** est variable on la récupère dans la méthode pour récupérer les informations sur XBMC

	var JSON_RPC = "/jsonrpc"

### Requete a effectuer *en post*

	$.post(JSON_RPC + '?UpdatePlayer',(string - param), function(data) {
		console.log(data);
	});


### Avoir les informations sur ce qui se passe actuellement dans XBMC
	'{"jsonrpc": "2.0", "method": "Player.GetActivePlayers", "id": 1}'

Renvoit un object {id,jsonrpc,result}
**result** est un tableau vide si il ne se passe rien sinon c'est un tableau avec un sous objet:
	{playerid:(int),type:(string)}

### Avoir les informations sur ce qui est en cours de lecture
	'{"jsonrpc": "2.0", "method": "Player.GetProperties", "params": { "playerid": ' + this.activePlayerId + ', "properties": [ "playlistid", "speed", "position", "totaltime", "time" ] }, "id": 1}'

Même objet que prédécement mais cette fois result est un objet

### Changer de playlist

* Element Suivant

	'?SkipNext', '{"jsonrpc": "2.0", "method": "Player.GoNext", "params": { "playerid": 1}, "id": 1}'

* Element prédédent

	'?SkipPrevious', '{"jsonrpc": "2.0", "method": "Player.GoPrevious", "params": { "playerid": 1 }, "id": 1}'

### Mettre un élément en pause

	'?PlayPause', '{"jsonrpc": "2.0", "method": "Player.PlayPause", "params": { "playerid": 1 }, "id": 1}'

Renvoit un objet dans résult avec speed = 1

### Play element
	
	'?PlayPause', '{"jsonrpc": "2.0", "method": "Playlist.Play", "params": { "playerid": 1 }, "id": 1}'

La première semble planter par contre celle là foncitonne
	
	'?SendRemoteKey', '{"jsonrpc": "2.0", "method": "Player.PlayPause", "params": { "playerid": 1}, "id": 1}'

Renvoit dans résult la clé speed à 0

### Stop un élément 
	
	'?SendRemoteKey', '{"jsonrpc": "2.0", "method": "Player.Stop", "params": { "playerid": 1}, "id": 1}'


	