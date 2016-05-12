/**
 * Design dei nodi e degli archi.
 */

//gli schemi di colori
var myPalette = {
		qualitativeScheme: {
			'invisible': '#ebebeb',
			//'visible': '#00441b'
			'no': '#ebebeb'
		},
		colorbrewer: {
			sequentialGreen: {
				3: ["#e5f5f9","#99d8c9","#2ca25f"],
				4: ["#edf8fb","#b2e2e2","#66c2a4","#238b45"],
				5: ["#edf8fb","#b2e2e2","#66c2a4","#2ca25f","#006d2c"],
				6: ["#edf8fb","#ccece6","#99d8c9","#66c2a4","#2ca25f","#006d2c"],
				7: ["#edf8fb","#ccece6","#99d8c9","#66c2a4","#41ae76","#238b45","#005824"],
				8: ["#f7fcfd","#e5f5f9","#ccece6","#99d8c9","#66c2a4","#41ae76","#238b45","#005824"],
				9: ["#f7fcfd","#e5f5f9","#ccece6","#99d8c9","#66c2a4","#41ae76","#238b45","#006d2c","#00441b"]
			},
			sequentialBlue: {
				6: [/*'#ffffcc',*/'#c7e9b4','#7fcdbb','#41b6c4','#1d91c0','#225ea8','#0c2c84'],
				7: [/*'#ffffd9',*/'#edf8b1','#c7e9b4','#7fcdbb','#41b6c4','#1d91c0','#225ea8','#0c2c84'],
				8: [/*'#ffffd9',*/'#edf8b1','#c7e9b4','#7fcdbb','#41b6c4','#1d91c0','#225ea8','#253494','#081d58']
			},
			spectral: sigma.plugins.colorbrewer.Spectral,
			bupu : sigma.plugins.colorbrewer.BuPu,
			YlOrRd : sigma.plugins.colorbrewer.YlOrRd,
			YlGnBu : sigma.plugins.colorbrewer.YlGnBu,
			RdBu: sigma.plugins.colorbrewer.RdBu
		},
		aSetScheme: {
			7: ["#e41a1c","#377eb8","#4daf4a","#984ea3","#ff7f00","#ffff33","#a65628"]
		}
};

//i vari stili usati
var style = {
		empty: {
			nodes: {
				
			},
			edges: {
				
			}
		},
		totdegree: {
				nodes: {
				    color: {
				    	by: 'data.totDegree',
				    	scheme: 'colorbrewer.sequentialBlue',
				    	bins: 8
				    },
				    size: {
				    	 by: 'data.totDegree',
				         bins: 1,
				         min: 5.5,
				         max: 5.5
				    }
				},
				edges: {
					color: {
						by: 'data.quality',
						scheme: 'qualitativeScheme'
					}
				}
		},
		indegree: {
				nodes: {
				    color: {
				    	by: 'data.inDegree',
				    	scheme: 'colorbrewer.sequentialBlue',
				    	bins: 8
				    },
				    size: {
				    	 by: 'data.totDegree',
				         bins: 1,
				         min: 5.5,
				         max: 5.5
				    }
				},
				edges: {
					color: {
						by: 'data.quality',
						scheme: 'qualitativeScheme'
					}
				}
		},
		outdegree: {
				nodes: {
				    color: {
				    	by: 'data.outDegree',
				    	scheme: 'colorbrewer.sequentialBlue',
				    	bins: 8
				    },
				    size: {
				    	 by: 'data.totDegree',
				         bins: 1,
				         min: 5.5,
				         max: 5.5
				    }
				},
				edges: {
					color: {
						by: 'data.quality',
						scheme: 'qualitativeScheme'
					}
				}
		},
		eccentricity: {
				nodes: {
				    color: {
				    	by: 'data.eccentricity',
				    	scheme: 'colorbrewer.sequentialBlue',
				    	bins: 8
				    },
				    size: {
				    	 by: 'data.totDegree',
				         bins: 1,
				         min: 5.5,
				         max: 5.5
				    }
				},
				edges: {
					color: {
						by: 'data.quality',
						scheme: 'qualitativeScheme'
					}
				}
		},
		betweenness: {
				nodes: {
				    color: {
				    	by: 'data.betweenness',
				    	scheme: 'colorbrewer.sequentialBlue',
				    	bins: 8
				    },
				    size: {
				    	 by: 'data.totDegree',
				         bins: 1,
				         min: 5.5,
				         max: 5.5
				    }
				},
				edges: {
					color: {
						by: 'data.quality',
						scheme: 'qualitativeScheme'
					}
				}
		},
		closeness: {
				nodes: {
				    color: {
				    	by: 'data.closeness',
				    	scheme: 'colorbrewer.sequentialBlue',
				    	bins: 8
				    },
				    size: {
				    	 by: 'data.totDegree',
				         bins: 1,
				         min: 5.5,
				         max: 5.5
				    }
				},
				edges: {
					color: {
						by: 'data.quality',
						scheme: 'qualitativeScheme'
					}
				}
		},
		filtered: {
			nodes: {
				color: {
					by: 'data.filtered',
					scheme: 'qualitativeScheme'
				}
			},
			edges: {
				color: {
					by: 'data.quality',
					scheme: 'qualitativeScheme'
				}
			}
		},
		selected: {
			nodes: {
				color: {
					by: 'data.selected',
					scheme: 'qualitativeScheme'
				}
			},
			edges: {
				color: {
					by: 'data.selected',
					scheme: 'qualitativeScheme'
				}
			}
		}
};

var design, legend, setting, usedStyle = false;

//inizializza i plugins design e legend
function initDesignCommunity(){
	design = sigma.plugins.design(globalS);
	design.setPalette(myPalette);
	
}

/**
 * Applica lo stile scelto al grafo e mostra la legenda. Se lo stile e' quello applicato ai nodi filtrati o clickati,
 * la legenda non viene mostrata.
 * 
 * @param styleChoice lo stile da applicare.
 */
function colorGraph(styleChoice){
	design.reset();
	design.setStyles(style[styleChoice]);
	design.apply();
	if(legend)
		legend.setVisibility(false);
	if(styleChoice != 'selected'){
		usedStyle = styleChoice;
	}
	if(styleChoice != 'selected' & styleChoice != 'filtered'){
		showLegend();
	}
}

/**
 * Mostra la legenda
 */
function showLegend(){
	if(legend)
		sigma.plugins.killLegend(globalS);
	legend = sigma.plugins.legend(globalS, true);
	legend.draw();
	legend.removeWidget('node', 'size');
	legend.removeWidget('edge', 'color');
	legend.setPlacement('right');
	legend.setVisibility(true);
}

/**
 * Resetta ogni stile applicato e nasconde la legend
 */
function resetColor(){
	usedStyle = false;
	design.reset();
	if(legend)
		legend.setVisibility(false);
}

/**
 * Se e' stato applicato uno stile lo riapplica, altrimenti resetta tutto.
 */
function setToLastStyle(){
	if(usedStyle)
		colorGraph(usedStyle);
	else
		resetColor();
}
