/**
 * 
 */
var colors = [
      "#D6C1B0",
      "#9DDD5A",
      "#D06D34",
      "#D28FD8",
      "#5D8556",
      "#71D4C6",
      "#CDCF79",
      "#D8A836",
      "#5E8084",
      "#738ECD",
      "#D36565",
      "#61DC7B",
      "#9B7168",
      "#97C4DE",
      "#A57E42",
      "#D5DA41",
      "#D06B97",
      "#917097",
      "#689534",
      "#90D59B"
    ];

function initCommunity(){
	/*var louvainInstance = sigma.plugins.louvain(globalS.graph, {
	    setter: function(communityId){ 
	    	this.my_community = communityId;
	    	}
	  });
	
	globalS.graph.nodes().forEach(function(node) {
	    node.color = colors[node.my_community];
	  });
	  globalS.refresh({skipIndexation: true});*/
	
	globalS.graph.nodes().forEach(function(node) {
		  node.color = colors[node.attributes["Modularity Class"] % colors.length];
		});
	globalS.refresh({skipIndexation: true});
}