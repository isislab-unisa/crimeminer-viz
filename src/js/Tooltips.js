/**
 * Funzioni per il tooltips
 */

function initTooltips(){
	var config = {
			 node: [{
				    show: 'rightClickNode',
				    hide: 'clickNode',
				    position: 'top',
				    cssClass: 'tooltip',
				    template: 	' <div class="tooltipArrow"></div>' + 
				    			' <div class="tooltipHeader">{{label}}</div>' +
				    			'  <div class="tooltipBody">' +
				    			'    <table>' +
				    			'      <tr><th>Name</th> <td style="text-align:center">{{label}}</td></tr>' +
							    '    </table>' +
							    '  	 <div>'+
							    '      <a class="cliccabile" onclick="graficoABarre()"><span>Bar Chart</span></a>'+
								'      <a class="cliccabile" onclick="graficoLinea()"><span>Linear Chart</span></a>'+
								'    </div>'+
							    '  </div>' +
							    '  <div class="tooltipFooter">Var{{var}}</div>',
					renderer: function(node, template){
						//si può fare qualcosa, tipo calcola var
						return Mustache.render(template, node);
					}
				  },{
					  hide: 'clickStage'
				  }]
	};
	
	sigma.plugins.tooltips(globalS, globalS.renderers[0], config);
}