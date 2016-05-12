/**
 * Elenco di funzioni di utilita' generali
 */
var _ = {
		//selezione elemento tramite id
		$: function(id){
			return document.getElementById(id);
		},
		//seleziona tutti gli elementi con la stessa classe, ritorna un array
		all: function(classe){
			return document.querySelectorAll(classe);
		}
};