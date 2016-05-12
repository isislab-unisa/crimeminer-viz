/*
 * DOCUMENTATION 
 */
var s, NUMNODI, NUMEDGE,
    g = {
		nodes: [],
		edges: []
	};
        
var jqxhr = $.getJSON( 'json/Crime.json', function( data ) {
	console.log( 'success' );
          
    g.nodes = data.nodes;
    g.edges = data.edges;
    console.log(g);
    NUMNODI = data.nodes.length;
    NUMEDGE = data.edges.length;
          
    for(var t=0; t<NUMNODI; t++){
    	g.nodes[t].visitato = false; 
    	g.nodes[t].initColor = g.nodes[t].color;
     	g.nodes[t].x = 100 * Math.cos(2 * t * Math.PI / NUMNODI);
      	g.nodes[t].y = 100 * Math.sin(2 * t * Math.PI / NUMNODI);
		g.nodes[t].size = 2 + g.nodes[t].size ;
    }
    
	for(var ed=0; ed<NUMEDGE; ed++){
		g.edges[ed].color = '#C0C0C0';
		g.edges[ed].type = 'curvedArrow';
		g.edges[ed].size = 0;
	}
	
	buildGraph();
	insertSelection(data.nodes[0].attributes, data.nodes); //inizializza la select della selezione
})
	.done(function() {
		console.log( "second success" );
	})
	.fail(function() {
		console.log( "error" );
	})
	.always(function() {
		console.log( "complete" );
	})
          
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
           	maxEdgeSize: 50,
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
       	e.data.node.color = '#D80000';
        $('#attribute-table').html("<th style='text-align: right; color: red'>" + e.data.node.label + "</th>");
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
        
        e.data.node.visitato = true;          
        s.refresh(); 
	});
        
 	s.bind('clickStage doubleClickStage rightClickStage', function(e) {
	}); 
        
	s.bind('clickEdge', function(e) {
		//e.data.edge.color = '#D80000';
		
		// $('#attribute-table').html("<th style='text-align: right; color: red'>" + e.data.edge.id + "</th>");
		for(i in e.data.edge){
			$('#attribute-table').append("<tr><th align='right'>" + i +
					":</th><td id=" + i + ">" + 
					e.data.edge[i] + "</td></tr>");
		}

		$('#contenitor-info-node').show();
		$('#contenitor-nascondi-node').show();
		$('#titolo-info').show();
		$('#attribute-table').show();
		//$('#nInterc').html( e.data.node.attributes);


		e.data.edge.visitato = true;          
		s.refresh(); 
	});
	s.bind('doubleClickEdge', function(e) {
		if(e.data.edge.color != '#D80000')
			e.data.edge.color = '#D80000';
		else
			e.data.edge.color = '#C0C0C0';
		s.refresh();
	});
    
	s.bind('hovers', function(e) {
		//console.log(e.type, e.data.captor, e.data);
	});
}
         
$('#reset-btn').bind('click', function() {
	for(var q=0; q<NUMNODI; q++){
		g.nodes[q].color = g.nodes[q].initColor;
		g.nodes[q].visitato = false;
	}
	for(var q=0; q<NUMEDGE; q++){
		g.edges[q].color = '#C0C0C0';
	}
	$('#contenitor-info-node').hide();
	$('#contenitor-nascondi-node').hide();
	//$('#buttonInfoPane').hide();
	s.refresh();
});
		
$('#nascondi').bind('click', function() {
	for(var q=0; q<NUMNODI; q++){
		if(g.nodes[q].visitato == false){
			g.nodes[q].color='#EFEFEF';
        }
        //console.log(g.nodes[q])
	}
	for(var q=0; q<NUMEDGE; q++){
		if(g.edges[q].color != '#FF0000')
			g.edges[q].color = '#EFEFEF';
	}
    s.refresh();
});
        
$("#atlasLayout").bind("click", function(){
	s.startForceAtlas2({
		//worker: true
		iterationsPerRender: 2,
        scalingRatio: 10,
       	//strongGravityMode: false,
       	//gravity: 0,
       	//adjustSizes: true,
       	//linLogMode: true,
       	slowDown: 10
	});
		
	/*
	for(var q=0; q<N; q++)
    	if(g.nodes[q].size >= 20)
        	g.nodes[q].color = 'red';
        else
        	if(g.nodes[q].size >= 16)
        		g.nodes[q].color = 'orange';
			else
				if(g.nodes[q].size >= 14)
	            	g.nodes[q].color = 'green';
	*/
	setTimeout(func, 4000);
});
        
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
	/*
	for(var q=0; q<N; q++)
        if(g.nodes[q].size >= 20)
           	g.nodes[q].color = 'red';
       	else
       		if(g.nodes[q].size >= 16)
               	g.nodes[q].color = 'orange';
		else
			if(g.nodes[q].size >= 14)
	        	g.nodes[q].color = 'green';
	*/
	// Start the Fruchterman-Reingold algorithm:
	sigma.layouts.fruchtermanReingold.start(s);
});
/*
$('selezioneAttributi').bind('click', function(e){
	for(i in e.data.node.attributes){
    	$('#selezioneAttributi').append("<select value='"+ i +"'>" +
    			+ i + "</select>");
    }
});
*//*
function insertSelection(attributes){
	var el = document.getElementById('selezioneAttributi');
	/*el = document.createElement('select');
	el.id = 'selezioneAttributi';
	document.getElementById('selezioneDiv').appendChild(el);
	*//*
	for(i in attributes){
		var option = document.createElement('option');
		option.value = i;
		option.text = i;
		el.appendChild(option);
    }
}*/