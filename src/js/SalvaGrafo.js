//funzione che salva il grafa in jpg
function salvaGrafo(){
	$.getScript('js/Data.js', function(){
		console.log("["+date()+"]"+"avvio salvataggio immagine");
		//funzione sigma per creare il jpg del grafo 
		globalS.renderers[0].snapshot({
			format: 'jpg',
			background: 'white',
			filename: 'Grafo'+date()+'.jpg',
			labels: false,
			download: true
		});
		// Download the rendered graph as an image
		//myRenderer.snapshot({download: true});
		console.log("["+date()+"]"+"sucesso salvataggio immagine");	
	});	
}
