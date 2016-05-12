/**
 * Funzioni aggiunte a Graph. Il contesto è Graph.
 */

//aggiungo il metodo getNeighborsArray a graph. 
//restituisce un array con il centerNode e i nodi puntati dagli archi uscenti da esso
sigma.classes.graph.addMethod('getNeighborsArray', function(centerNode) {
	var list = [];
	
	list.push(centerNode);
	edges.forEach(function(edge){
		if(edge.source == centerNode.id)
			globalS.graph.nodes().forEach(function(node){
				if(node.id == edge.target)
					list.push(node);
			})
	});
	return list;
});

//aggiungo il metodo getNeighborsArray a graph. 
//restituisce un oggetto con il nodo passato e con l'array dei nodi e l'array degli archi vicini
sigma.classes.graph.addMethod('getNeighborsNodesAndEdges', function(centerNode) {
	var list = {
			nodes: [],
			edges: []
	};
	var l = nodes.length;
	
	list.nodes.push(centerNode);
	edges.forEach(function(edge){
		if(edge.source == centerNode.id){
			list.edges.push(edge);
			for(i=0; i<l; i++)
				if(nodes[i].id == edge.target){
					list.nodes.push(nodes[i]);
					break;
				}
		}
	});
	return list;
});


//aggiungo il metodo getMaxDegree a graph. Restituisce il degree max del grafo.
sigma.classes.graph.addMethod('getMaxDegree', function(){
	var maxDegree = 0;
	nodes.forEach(function(n){
		maxDegree = Math.max(maxDegree, globalS.graph.degree(n.id));
	});
	return maxDegree;
});

//aggiungo il metodo changeProperty a graph.
//data una lista di nodi o archi, cambia il valore di nameProperty con il propertyValue passato. 
sigma.classes.graph.addMethod('changeProperty', function(list, nameProperty, propertyValue){	
	list.forEach(function(el){
		el.data[nameProperty] = propertyValue;
	});
});

//aggiungo il metodo muteList a graph.
//setta la quality di ogni nodo della lista passata a 'invisible'.
sigma.classes.graph.addMethod('muteList', function(list){
    this.changeProperty(list, 'quality', 'invisible');
    //colorVisitedElement();
});

//aggiungo il metodo unmuteList a graph.
//setta la quality di ogni nodo della lista passata a 'visible'.
sigma.classes.graph.addMethod('unmuteList', function(list){
  this.changeProperty(list, 'quality', 'visible');
  //colorVisitedElement();
});

//aggiungo il metodo getNodesLessThan a graph.
//data una proprieta' dei nodi, restituisce un oggetto con tutti i nodi che hanno il
//valore della proprieta' in data minore o uguale al valore passato. 
//es nodes[n].data.degree < degree.
//la proprieta' passata deve essere numerica.
sigma.classes.graph.addMethod('getNodesLessThan', function(property, value){
	var list = [];
	
	nodes.forEach(function(node){
		if(node.data[property] < value){
			list.push(node);
		}
	});
	
	return list;
});