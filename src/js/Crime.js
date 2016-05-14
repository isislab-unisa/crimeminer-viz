/**
 * Funzioni principali del grafo.
 */
var globalS, nodes, numNodes, edges, numEdges, activeState;

//******* COSTRUISCE IL GRAFO **********
sigma.parsers.json('json/Crime.json',{
	renderer: {
		container: 'graph-container',
		type: 'canvas' //necessario per alcuni plugins e render (es curve)
	},	
	settings: {
		//setting della legend
		legendTitleFontSize: 18,
		legendFontSize: 15,
		legendTitleFontColor: 'green',
		
		maxNodeSize: 5.5,
		nodeBorderSize: 0.3,
		nodeBorderColor: 'black',
		nodeHoverBorderSize: 2,
		defaultNodeHoverBorderColor: 'rgb(236, 81, 72)',
		nodeActiveBorderSize: 2,
		nodeActiveOuterBorderSize: 5,
		//nodeActiveColor: 'red',
		nodeActiveLevel: 3,
		defaultNodeActiveBorderColor: '#fff',
		defaultNodeActiveOuterBorderColor: 'rgb(236, 81, 72)',
		
		//edgeColor: 'default', //colora gli archi
		defaultEdgeColor: '#ccc',
		defaultEdgeType: 'curvedArrow', //non va. bug?
		minArrowSize: 5,
		enableEdgeHovering: true,
	    edgeHoverExtremities: true,
	    edgeHoverColor: '#000',
	    edgeHoverSizeRatio: 3
	}
}, function(s){
	globalS = s;
	nodes = s.graph.nodes();
	numNodes = nodes.length;
	edges = s.graph.edges();
	numEdges = edges.length;
	
	for(var n=0; n<numNodes; n++){
		//nodes[n].color = '#' + (Math.floor(Math.random() * 16777215).toString(16) + '000000').substr(0, 6);
		nodes[n].x = 100 * Math.cos(2 * n * Math.PI / numNodes);
		nodes[n].y = 100 * Math.sin(2 * n * Math.PI / numNodes);
		nodes[n].data = {
			//associo dei dati al nodo e poi li uso per settare i colori
			totDegree: s.graph.degree(nodes[n].id),
			inDegree: s.graph.degree(nodes[n].id, 'in'),
			outDegree: outDegree = s.graph.degree(nodes[n].id, 'out'),
			eccentricity: parseInt(nodes[n].attributes.Eccentricity) + 10,	//per la legenda
			betweenness: parseInt(nodes[n].attributes["Betweenness Centrality"]),
			closeness: parseInt(nodes[n].attributes["Closeness Centrality"]) + 10,	//per la legenda
			
			//quality: 'invisible',	//per la scomparsa nel design
			filtered: 'yes',	//yes per i dati filtrati
			selected: 'no'		//nodi clickati
		};
		
	}
	for(var e=0; e<numEdges; e++){
		edges[e].type = 'curvedArrow';
		edges[e].data = {
			quality : 'invisible',	//per la scomparsa nel design
			filtered: 'yes',
			selected: 'no'
		}
	}
	s.refresh();
	
	//***COMMUNITY ***
	initCommunity();

	//*** FILTRI ***
	filter = sigma.plugins.filter(s);		//var filter e funzioni nel file Filtri.js
	updatePane(s.graph, filter);			//aggiorna il pannello filtri
	insertSelection(nodes[0].attributes);	//riempie la select
	
	//*** SELECT DEI NODI ***
	activeState = sigma.plugins.activeState(s);				// Instanzia l'ActiveState plugin
	sigma.plugins.select(s, activeState, s.renderers[0]);	// Inizializza il Select plugin
	
	//*** DESIGN ***
	initDesignCommunity();
	
	//*** TOOLTIPS ***
	initTooltips();
	
	//*** LAZZO ***
	initLasso();
	
	//*** CLICK SU NODO ***
	s.bind('clickNode', function(e) {
		var neighbors;
		
		if(s.graph.nodes(e.data.node.id).active){
    		if(($('#contentInfoPane').is(":visible"))) 
            	nascondiElemento('contentInfoPane');
    		setToLastStyle();
        }
		else{
			neighbors = s.graph.getNeighborsNodesAndEdges(e.data.node);
	        s.graph.changeProperty(neighbors.nodes, 'selected', 'yes');
	        s.graph.changeProperty(neighbors.edges, 'selected', 'yes');
	        colorGraph('selected');
	        creaTabellaInfoNode(e);		//crea la tabella con i dati del nodo e la mostra
	        s.graph.changeProperty(neighbors.nodes, 'selected', 'no');
	        s.graph.changeProperty(neighbors.edges, 'selected', 'no');
		}
	});
	
	
	//*** CLICK FUORI ELEMENTO ***
	s.bind('clickStage', function() {
		
	});
});
