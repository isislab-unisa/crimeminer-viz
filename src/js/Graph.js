/**
 * Funzioni per i grafici
 */

$("#outer").bind("click", function(){
	$("#outer").hide();
	$('#chiudiGrafo').hide();
}).children().click(function(){
	return false;
});

/*
function chiudiGrafico(){
	console.log("chiusura div grafico");
	$("#outer").hide();
	$('#chiudiGrafo').hide();
}
*/

function graficoABarre(){
	var jqxhr = $.getJSON('json/Crime.json',function(data) {
		$(function() {
			$('#containerGraph').highcharts(
							{
								chart : {
									type : 'bar'
								},
								title : {
									text : 'Grafico delle Intercettazioni sulle chiamate'
								},
								subtitle : {
									text : 'valori attuali'
								},
								xAxis : {
									categories : [
											'id :'+ data.nodes[0].id	+ ' nome:'+ data.nodes[0].label,
											'id :'+data.nodes[1].id+ ' nome :'+ data.nodes[1].label,
											'id :'+data.nodes[2].id+ ' nome :'+ data.nodes[2].label,
											'id :'+data.nodes[3].id+ ' nome :'+ data.nodes[3].label,
											 '....' ],
									title : {
										text : null
									}
								},
								yAxis : {
									min : 0,
									title : {
										text : 'valori',
										align : 'high'
									},
									labels : {
										overflow : 'justify'
									}
								},
								tooltip : {
									valueSuffix : ' m'
								},
								plotOptions : {
									bar : {
										dataLabels : {
											enabled : true
										}
									}
								},
								legend : {
									layout : 'vertical',
									align : 'right',
									verticalAlign : 'top',
									x : -40,
									y : 80,
									floating : true,
									borderWidth : 1,
									backgroundColor : ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
									shadow : true
								},
								credits : {
									enabled : false
								},

								series : [
										{
											name : 'Totale Intercettazioni',
											data : [
													40,
													20,
													50,
													30, 
													10 ]
										},
										{
											name : 'Chiamate effetuate',
											data : [
													30,
													10,
													10,
													20, 
													8 ]
										},
										{
											name : 'Chiamate ricevute',
											data : [
													10,
													10,
													40,
													10, 
													2 ]
										} ]
							});
		});
	});
	$('#outer').css('display', 'table');
}

function graficoLinea(){
var jqxhr = $.getJSON('json/Crime.json',function(data) {
	$(function () {
	    $('#containerGraph').highcharts({
	        title: {
	            text: 'nome:'+ data.nodes[0].label,
	            x: -20 //center
	        },
	        subtitle: {
	            text: 'id :'+ data.nodes[0].id ,
	            x: -20
	        },
	        xAxis: {
	            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
	                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
	        },
	        yAxis: {
	            title: {
	                text: 'N° interecettazioni'
	            },
	            plotLines: [{
	                value: 0,
	                width: 1,
	                color: '#808080'
	            }]
	        },
	        tooltip: {
	            valueSuffix: 'N°'
	        },
	        legend: {
	            layout: 'vertical',
	            align: 'right',
	            verticalAlign: 'middle',
	            borderWidth: 0
	        },
	        series: [{
	            name: 'totale del mese',
	            data: [7.0, 6, 9, 14, 18, 21, 25, 26, 23, 18, 13, 9]
	        }
	        ]
	    });
	});
	});
$('#outer').css('display', 'table');
$('#back').show();
}
