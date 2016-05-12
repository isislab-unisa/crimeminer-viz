/**
 * Funzioni e impostazioni dei layout del grafo.
 */

/*
Layout Force-Atlas 2
*/
$("#atlasLayout").bind("click", function(){
	globalS.startForceAtlas2({
       	linLogMode: false,
       	outboundAttractionDistribution: false,
       	adjustSizes: false,
       	edgeWeightInfluence: 0,
       	scalingRatio: 1,
       	strongGravityMode: true,
       	gravity: 0.5,
       	//barnesHutOptimize: false,
       	//barnesHutTheta: 0.5
       	slowDown: 10,
       	startingIterations: 1,
       	iterationsPerRender: 3,
       	
       	worker: true,
       	workerUrl: "librerie/linkurious.js-develop/plugins/sigma.layouts.forceAtlas2/worker.js"
	});
	//per far fermare il plugin
	setTimeout(function(){
		globalS.killForceAtlas2();
	}, 7000);
});

/*
Layout Fruchterman Reingold
*/
$('#frLayout').bind('click', function(){
	// Configure the Fruchterman-Reingold algorithm:
	var frListener = sigma.layouts.fruchtermanReingold.configure(globalS, {
		iterations: 300,
		easing: 'quadraticInOut',
		duration: 3000
	});
             
	// Bind the events:
	frListener.bind('start stop interpolate', function(e) {
		console.log(e.type); 
	});
	// Start the Fruchterman-Reingold algorithm:
	sigma.layouts.fruchtermanReingold.start(globalS);
});