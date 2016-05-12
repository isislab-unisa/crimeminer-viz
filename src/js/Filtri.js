/**
 * Funzioni per applicare il filtri sul degree.
 */

var filter;

/**
 * Aggiorna il pannello dei filtri con il max degree value.
 * 
 * @param graph il grafo da analizzare
 * @param filter la variabile del plugin
 */
function updatePane(graph, filter){
	//prendi il max degree
	var maxDegree = graph.getMaxDegree();
	
	// min degree
	  _.$('min-degree').max = maxDegree;
	  _.$('max-degree-value').textContent = maxDegree;
	  
	// reset button
	  _.$('reset-button').addEventListener("click", function(e) {
		_.$('min-degree').value = 0;
	    _.$('min-degree-val').textContent = '0';
	    filter.undo().apply();
	});
}

function applyMinDegreeFilter(e){
	var start = new Date().getTime();
	var v = e.target.value;
	
	_.$('min-degree-val').textContent = v;
	filter
		.undo('min-degree')
		.nodesBy(
				function(n, options){
					return this.graph.degree(n.id) >= options.minDegreeVal;
				}, {
					minDegreeVal: + v
				},
				'min-degree'
		)
		.apply();
	var end = new Date().getTime();
	var time = end - start;
	console.log('Execution total time: ' + time);
}

_.$('min-degree').addEventListener("input", applyMinDegreeFilter);  // for Chrome and FF
_.$('min-degree').addEventListener("change", applyMinDegreeFilter); // for IE10+, that sucks