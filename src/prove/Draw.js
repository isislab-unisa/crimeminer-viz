function buildGraph(){
	s = new sigma({
		graph: g,
		renderer: {
			container: document.getElementById('graph-container'),
			type: 'canvas'
		},
		settings: {
			minArrowSize:5,
			doubleClickEnabled: false,
			minEdgeSize: 0.5,
			maxEdgeSize: 50, /* maxEdgeSize: 50*/
			enableEdgeHovering: true,
			edgeHoverColor: 'edge',
			labelThreshold: 8,
			defaultEdgeType:'curvedArrow',
			defaultEdgeHoverColor: '#000',
			edgeHoverSizeRatio: 6,
			edgeHoverExtremities: true,
			autoCurveRatio: 2
		}
	});



	s.bind('clickNode', function(e) {

		var newColor = '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
		e.data.node.color=newColor;	

		//console.log(e.data.edge) non mi da l'arco come evento
		//plug in neighboroos per vedere i vicini
		//visualizzare i dati a lato
		//console.log( e.data.node.size)
		//e.data.node.size=10+e.data.node.size;
		//console.log( e.data.node.size)
		$('#contenitor-info-node').show();
		$('#contenitor-nascondi-node').show();
		$('#titolo-info').show();
		$('#attribute-table').show();
		$('#id-indagato').html(e.data.node.id );
		$('#label').html(e.data.node.label );
		$('#indirizzo').html(e.data.node.attributes.INDIRIZZO_RESIDENZA );
		$('#cap').html(e.data.node.attributes.CAP_RESIDENZA );
		$('#prov').html(e.data.node.attributes.PROV_RESIDENZA );
		$('#luogo-nascita').html(e.data.node.attributes.LUOGO_NASCITA );
		$('#nInterc').html( e.data.node.size);

		e.data.node.visitato=true;          
		s.refresh(); 
	});

	s.bind('clickStage doubleClickStage rightClickStage', function(e) {
	}); 
	
	//s.bind('clickEdge doubleClickEdge rightClickEdge', function(e) {	
	s.bind('clickEdge', function(e) {
		e.data.edge.color = '#D80000';
		var node=cercaPerID(data.edges[i].source, data);
		node.color = '#D80000';
		node.visitato = true;
		cercaPerID(data.edges[i].target, data).color = '#D80000';
		/*   $('#attribute-table').html("<tr></tr>");
       for(i in e.data.node.attributes){
        	$('#attribute-table').append("<tr><th align='right'>" + i +
        			":</th><td id=" + i + ">" + 
        			e.data.node.attributes[i] + "</td></tr>");
        }
        $('#contenitor-info-node').show();
        $('#contenitor-nascondi-node').show();
        $('#titolo-info').show();
        $('#attribute-table').show();
        //$('#nInterc').html( e.data.node.attributes);
          	
        for(var i=0; i<NUMEDGE; i++){
        	if(g.edges[i].source == e.data.node.id){
        		for(var j=0; j<NUMNODI; j++)
        			if(g.nodes[j].id == g.edges[i].target){
        				g.nodes[j].color = '#D80000';
        				g.nodes[j].visitato = true;
        				g.edges[i].color = '#FF0000';
        			}
          	}
        }
       */ 
      //  e.data.node.visitato = true;          
        s.refresh(); 
	

	});


	s.bind('hovers', function(e) {
		console.log(e.type, e.data.captor, e.data);
	});

}

$('#reset-btn').bind('click', function() {
	for(var q=0;q<N;q++){
		g.nodes[q].color=g.nodes[q].initColor;
		g.nodes[q].visitato=false;
	}
	$('#contenitor-info-node').hide();
	$('#contenitor-nascondi-node').hide();
	s.refresh();
});

$('#nascondi').bind('click', function() {
	for(var q=0;q<N;q++){
		if(g.nodes[q].visitato==false){
			g.nodes[q].color='#EFEFEF';
			//g.edges[q].color='#EFEFEF';
		}
		else{
			// g.nodes[q].color='red';
		}
		console.log(g.nodes[q])
	}
	s.refresh();
});

$("#atlasLayout").bind("click", function(){
	s.startForceAtlas2({
		//iterationsPerRender: 1,
		//scalingRatio: 1,
		//strongGravityMode: false,
		//gravity: 0,
		//adjustSizes: true,
		//linLogMode: true,
		//slowDown: 10
	});
	setTimeout(func, 4000);
});
function forcedAtlas2(){
	s.startForceAtlas2({
		//iterationsPerRender: 1,
		//scalingRatio: 1,
		//strongGravityMode: false,
		//gravity: 0,
		//adjustSizes: true,
		//linLogMode: true,
		//slowDown: 10
	});
	setTimeout(func, 4000);
}

function func(){
	s.killForceAtlas2();
}

$('#frLayout').bind('click', function(){
	// Configure the Fruchterman-Reingold algorithm:
	var frListener = sigma.layouts.fruchtermanReingold.configure(s, {
		iterations: 300,
		easing: 'quadraticInOut',
		duration: 3000  
	});

	// Bind the events:
	frListener.bind('start stop interpolate', function(e) {
		console.log(e.type); 
	});



	// Start the Fruchterman-Reingold algorithm:
	sigma.layouts.fruchtermanReingold.start(s);
});

