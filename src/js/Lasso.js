/**
 * Lasso
 */

function initLasso(){
	 /*
	 * Selezione di più nodi tramite lazzo
	 * select-drag-node
	 */
	var keyboard = sigma.plugins.keyboard(globalS, globalS.renderers[0]);
	// Initialize the Select plugin:
	var select = sigma.plugins.select(globalS, activeState);
	select.bindKeyboard(keyboard);

	// Initialize the dragNodes plugin:
	var dragListener = sigma.plugins.dragNodes(globalS, globalS.renderers[0], activeState);

	// Initialize the lasso plugin:
	var lasso = new sigma.plugins.lasso(globalS, globalS.renderers[0], {
	  'strokeStyle': 'rgb(236, 81, 72)',
	  'lineWidth': 2,
	  'fillWhileDrawing': true,
	  'fillStyle': 'rgba(236, 81, 72, 0.2)',
	  'cursor': 'crosshair'
	});

	select.bindLasso(lasso);
	//lasso.activate();
	
	// halo on active nodes:
	function renderHalo() {
		globalS.renderers[0].halo({
			nodes: activeState.nodes()
		});
	}

	//"spacebar" + "s" keys pressed binding for the lasso tool
	keyboard.bind('32+83', function() {
		console.log("attivazione lazzo");
		if (lasso.isActive) {
			lasso.deactivate();
		} else {
			lasso.activate();
		}
	});

	// Listen for selectedNodes event
	lasso.bind('selectedNodes', function (event) {
		setTimeout(function() {
			lasso.deactivate();
			globalS.refresh({ skipIdexation: true });
		}, 0);
	});

}