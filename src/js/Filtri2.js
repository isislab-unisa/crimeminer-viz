/**
 * Filtri sul grafo. Usa le funzioni in Utility.js
 */

function updatePane(graph){
	var maxDegree = graph.getMaxDegree(); //prendi il max degree
	
	_.$('min-degree').max = maxDegree;	// min degree
	_.$('max-degree-value').textContent = maxDegree;
	// reset button
	_.$('reset-button').addEventListener("click", function(e) {
		_.$('min-degree').value = 0;
		_.$('min-degree-val').textContent = '0';
		resetColor();
	});
}

function applyMinDegreeFilter(e){
	var start = new Date().getTime();
	var v = e.target.value;
	var list;
	
	_.$('min-degree-val').textContent = v;
	globalS.graph.changeProperty(nodes, 'filtered', 'yes');
	list = globalS.graph.getNodesLessThan('totDegree', v);
	globalS.graph.changeProperty(list, 'filtered', 'no');
	colorGraph('filtered');
	
	var end = new Date().getTime();
	var time = end - start;
	console.log('Execution total time: ' + time);
}


_.$('min-degree').addEventListener("input", applyMinDegreeFilter);  //Chrome e FF
_.$('min-degree').addEventListener("change", applyMinDegreeFilter); //IE10+ (that sucks)
