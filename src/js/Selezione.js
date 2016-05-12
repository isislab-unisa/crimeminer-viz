/**
 * Aggiunge gli attributi come options della select. Evidenzia i nodi filtrati. 
 * Crea la tabella con i dati del nodo selezionato.
 */

/**
 * Crea la tabella con i dati del nodo selezionato e la mostra
 */
function creaTabellaInfoNode(e){
	//creo e mostro la tabella con i dati del nodo
    $('#attribute-table').html("<th><h3 style='text-align: right; color: red'>" + e.data.node.label + "</h3></th>");
    for(i in e.data.node.attributes){
    	$('#attribute-table').append("<tr><th align='right'>" + i +
    			":</th><td id=" + i + ">" + 
    			e.data.node.attributes[i] + "</td></tr>");
    }
    //$('#contenitor-info-node').show(); //vecchio tasto
    $('#attribute-table').show();
    if(!($('#contentInfoPane').is(":visible"))) 
    	nascondiElemento('contentInfoPane');
}

/**
 * Inserisce i nomi degli attributi nella select
 */
function insertSelection(attributi){
	var el = _.$('selezioneAttributi');
	for(i in attributi){
		var option = document.createElement('option');
		option.value = i;
		option.text = i.replace(/_/," ");
		el.appendChild(option);
    }
}

/**
 * Inserisce i valori degli attributi nella select.
 * 
 * @param id l'id della select che lancia l'evento
 * @param selectId l'id della select dove inserire i tag option
 */
function selectSelection(id, selectId){
	var select = _.$(id);
	var valoreSelezionato = select.options[select.selectedIndex].value;
    selezionaAttributo(valoreSelezionato, selectId);
}

/**
 * Selezionato il nome di un attributo, ne prende tutti i sigoli valori (quindi niente duplicati)
 * e li inserisce come tag option nella select scelta.
 * 
 * @param valoreSelezionato il nome del valore scelto
 * @param selectId l'id della select dove inserire le option
 */
function selezionaAttributo(valoreSelezionato, selectId){
	var el = _.$(selectId);
	var lista = new Array();
	var i;
	el.innerHTML = "";
	for(n in nodes){
		var valore = nodes[n].attributes[valoreSelezionato];
		if(!cercaInLista(lista, valore))
			lista.push(valore);
	}
	lista.sort();
	for(i in lista){
		var option = document.createElement('option');
		option.value = lista[i];
		option.text = lista[i];
		el.appendChild(option);
	}
}

/**
 * Controlla se un valore e' inserito in un array.
 * 
 * @param lista l'array da controllare
 * @param valore il valore da cercare
 * @returns {Boolean} true se e' trovato, false altrimenti
 */
function cercaInLista(lista, valore){
	for(i in lista)
		if(lista[i] == valore)
			return true;
	return false;
}

/**
 * Evidenzia i nodi filtrati
 */
function evidenziaSelection(){
	var nomeAttr = _.$('selezioneAttributi').value;
	var valoreAttr = _.$('scegliAttributi').value;
	var list = [];

	nodes.forEach(function(n){
		if(n.attributes[nomeAttr] != valoreAttr)
			list.push(n);
	});
	globalS.graph.changeProperty(nodes, 'filtered', 'yes');
	globalS.graph.changeProperty(list, 'filtered', 'no');
	colorGraph('filtered');
}