/**
 * Funzioni con gli effetti di animazione
 */

/**
 * Hide e show dei pannelli laterali
 */
function togglePannello(id){
	$('#' + id).toggle(500);
}

/**
 * Nasconde l'elemento passato come primo parametro e mostra 
 * l'elemento passato come secondo parametro.
 * 
 * @param id1 l'id dell'elemento da nascondere
 * @param id2 l'id dell'elemento da mostrare
 */
function nascondiMostraPannello(id1, id2){
	togglePannello(id1);
	togglePannello(id2);
}

/**
 * Nasconde o rende visibile un elemento.
 * 
 * @param id l'id del tag da nasconder o mostrare
 */
function nascondiElemento(id){
	togglePannello(id);
}

function nascondiMenu(id){
	var list = _.all('.contentPannelloSinistro');
	var l = list.length;
	
	for(n=0; n<l; n++){
		if(list[n].id != id)
			list[n].style.display = 'none';
	}
	togglePannello(id);
}