//apre la scheda con la tabella
function apriTabellaNodi() {
	window.open("TabellaNodi.html");
}

function apriTabellaArchi() {
	window.open("TabellaArchi.html");
}

//mostra/nasconde i campi dei filtri della tabella
function apriChiudiFiltri(){
	if($(".tablesorter-filter").css("display")=='none'){
		$(".tablesorter-filter").show();
	}
	else{
		$(".tablesorter-filter").hide();
	}
		nascondiElemento('contentControlPane');
}

//costruisce la tabella per i nodi
function creaTabellaNodi(array){

	console.log( "["+date()+"]"+'inizio creazione tabella' );
	var jqxhr = $.getJSON( 'json/Crime.json', function( data ) {
		console.log("["+date()+"]"+ 'lettura file json success' );

		//creazione variabile
		N = data.nodes.length;
		
		console.log("["+date()+"]"+"creazione tabella");
		//var table = "<table id='tabella' class='tablesorter' ><thead><tr><th><h2>id</h2></th><th><h2>label</h2><div>label</div></th>" ;
		var table = "<table id='tabella' class='tablesorter'><thead class='nav'><tr><th data-placeholder='ex. a* or <=100'><h2>Label</h2></th>" ;
		for (i in data.nodes[0].attributes){
			
			table += "<th data-placeholder='ex. a* or <=100'><h2>" + i.replace(/_/g," ") + "</h2></th>" ;
		}
		table += "</tr></thead> <tbody>";

		console.log("["+date()+"]"+"inserimento dati in tabella");
		for(var i=0; i<N; i++){
			table += "<tr onclick='creaTabellaArchi(\""+data.nodes[i].id+"\" )'>";
			//table += "<td>" + data.nodes[i].id + "</td>";
			table += "<td>" + data.nodes[i].label + "</td>";
			for(j in data.nodes[i].attributes)
				table += "<td>" + data.nodes[i].attributes[j] + "</td>";
			table += "</tr>";
		}
		table += " </tbody></table>";
		console.log("["+date()+"]"+ 'inserimento tabella nella pagina html' );
		document.getElementById("table").innerHTML = table;
	
		//$("#info-control-pane").hide();

		console.log("["+date()+"]"+ 'fine creazione success' );
		//$("#tabella").tablesorter();
  // call the tablesorter plugin
  $("#tabella").tablesorter({
    theme: 'default',

    // hidden filter input/selects will resize the columns, so try to minimize the change
    widthFixed : true,
	showProcessing: true,
    headerTemplate : '{content} {icon}', // Add icon for various themes

    // initialize zebra striping and filter widgets
    widgets: ["zebra","stickyHeaders", "filter"],

    ignoreCase: false,

    widgetOptions : {

		
      // extra class name added to the sticky header row
      stickyHeaders : '#tabella',
      // number or jquery selector targeting the position:fixed element
      stickyHeaders_offset : 0,
      // added to table ID, if it exists
      stickyHeaders_cloneId : '-sticky',
      // trigger "resize" event on headers
      stickyHeaders_addResizeEvent : true,
      // if false and a caption exist, it won't be included in the sticky header
      stickyHeaders_includeCaption : true,
      // The zIndex of the stickyHeaders, allows the user to adjust this to their needs
      stickyHeaders_zIndex : 2,
      // jQuery selector or object to attach sticky header to
      stickyHeaders_attachTo : null,
      // jQuery selector or object to monitor horizontal scroll position (defaults: xScroll > attachTo > window)
      stickyHeaders_xScroll : null,
      // jQuery selector or object to monitor vertical scroll position (defaults: yScroll > attachTo > window)
      stickyHeaders_yScroll : null,

      // scroll table top into view after filtering
      stickyHeaders_filteredToTop: true,

      // *** REMOVED jQuery UI theme due to adding an accordion on this demo page ***
      // adding zebra striping, using content and default styles - the ui css removes the background from default
      // even and odd class names included for this demo to allow switching themes
      // , zebra   : ["ui-widget-content even", "ui-state-default odd"]
      // use uitheme widget to apply defauly jquery ui (jui) class names
      // see the uitheme demo for more details on how to change the class names
      // , uitheme : 'jui'
      // filter_anyMatch options was removed in v2.15; it has been replaced by the filter_external option

      // If there are child rows in the table (rows with class name from "cssChildRow" option)
      // and this option is true and a match is found anywhere in the child row, then it will make that row
      // visible; default is false
      filter_childRows : false,

      // if true, filter child row content by column; filter_childRows must also be true
      filter_childByColumn : false,

      // if true, include matching child row siblings
      filter_childWithSibs : true,

      // if true, a filter will be added to the top of each table column;
      // disabled by using -> headers: { 1: { filter: false } } OR add class="filter-false"
      // if you set this to false, make sure you perform a search using the second method below
      filter_columnFilters : true,

      // if true, allows using "#:{query}" in AnyMatch searches (column:query; added v2.20.0)
      filter_columnAnyMatch: true,

      // extra css class name (string or array) added to the filter element (input or select)
      filter_cellFilter : '',

      // extra css class name(s) applied to the table row containing the filters & the inputs within that row
      // this option can either be a string (class applied to all filters) or an array (class applied to indexed filter)
      filter_cssFilter : '', // or []

      // add a default column filter type "~{query}" to make fuzzy searches default;
      // "{q1} AND {q2}" to make all searches use a logical AND.
      filter_defaultFilter : {},

      // filters to exclude, per column
      filter_excludeFilter : {},

      // jQuery selector (or object) pointing to an input to be used to match the contents of any column
      // please refer to the filter-any-match demo for limitations - new in v2.15
      filter_external : '',

      // class added to filtered rows (rows that are not showing); needed by pager plugin
      filter_filteredRow : 'filtered',

      // add custom filter elements to the filter row
      // see the filter formatter demos for more specifics
      filter_formatter : null,

      // add custom filter functions using this option
      // see the filter widget custom demo for more specifics on how to use this option
      filter_functions : null,

      // hide filter row when table is empty
      filter_hideEmpty : true,

      // if true, filters are collapsed initially, but can be revealed by hovering over the grey bar immediately
      // below the header row. Additionally, tabbing through the document will open the filter row when an input gets focus
      filter_hideFilters : true,

      // Set this option to false to make the searches case sensitive
      filter_ignoreCase : true,

      // if true, search column content while the user types (with a delay)
      filter_liveSearch : true,

      // global query settings ('exact' or 'match'); overridden by "filter-match" or "filter-exact" class
      filter_matchType : { 'input': 'exact', 'select': 'exact' },

      // a header with a select dropdown & this class name will only show available (visible) options within that drop down.
      filter_onlyAvail : 'filter-onlyAvail',

      // default placeholder text (overridden by any header "data-placeholder" setting)
      filter_placeholder : { search : '', select : '' },

      // jQuery selector string of an element used to reset the filters
      filter_reset : '#resetFiltri',

      // Reset filter input when the user presses escape - normalized across browsers
      filter_resetOnEsc : true,

      // Use the $.tablesorter.storage utility to save the most recent filters (default setting is false)
      filter_saveFilters : true,

      // Delay in milliseconds before the filter widget starts searching; This option prevents searching for
      // every character while typing and should make searching large tables faster.
      filter_searchDelay : 300,

      // allow searching through already filtered rows in special circumstances; will speed up searching in large tables if true
      filter_searchFiltered: true,

      // include a function to return an array of values to be added to the column filter select
      filter_selectSource  : null,

      // if true, server-side filtering should be performed because client-side filtering will be disabled, but
      // the ui and events will still be used.
      filter_serversideFiltering : false,

      // Set this option to true to use the filter to find text from the start of the column
      // So typing in "a" will find "albert" but not "frank", both have a's; default is false
      filter_startsWith : false,

      // Filter using parsed content for ALL columns
      // be careful on using this on date columns as the date is parsed and stored as time in seconds
      filter_useParsedData : false,

      // data attribute in the header cell that contains the default filter value
      filter_defaultAttrib : 'data-value',

      // filter_selectSource array text left of the separator is added to the option value, right into the option text
      filter_selectSourceSeparator : '|'

    }

  });



  
 

});

}

//costruisce la tabella per gli archi
function creaTabellaArchi (id){
	console.log("["+date()+"]"+ 'inizio creazione tabella' );
	var jqxhr = $.getJSON( 'json/Crime.json', function( data ) {
		console.log("["+date()+"]"+ 'lettura file json success' );

		//creazioni variabili
		E = data.edges.length;
		//creazione tabella per gli archi
		var table= "<table id='tabella' class='tablesorter'><thead><tr>";
		for (i in data.edges[0]){
			if(i == "type" ){}else
			table += "<th><h2>" + i.replace(/_/g," ") + "</h2></th>" ;
		}
		table += "</tr></thead> <tbody>";

		for(var i=0; i<E;i++){

			
			var row=" ", count=0;
			
			for ( j in data.edges[i]){
				if(id== null && data.edges[i].target==id && data.edges[i].source==id || count!=3   )
				{

				
				if (count>0 && count <=2){
					if(id!=null && data.edges[i][j]==id)
						row += "<td onclick='creaTabellaNodo(\""+data.edges[i][j]+"\" )'><b>" + cercaPerID(data.edges[i][j], data).label + "</b></td>";
					else
						row += "<td onclick='creaTabellaNodo(\""+data.edges[i][j]+"\" )'>" + cercaPerID(data.edges[i][j], data).label + "</td>";
					count++;

				}else {
					
					count++;
					row += "<td>" + data.edges[i][j] + "</td>";
				}
			}
			}
			if(row.localeCompare(" ")!=0){
				table +="<tr>"+row+"</tr>";
			}

		}

		table += " </tbody></table>";
		console.log("["+date()+"]"+ 'inserimento tabella nella pagina html' );
		if(id==null){
			document.getElementById("table").innerHTML = table;
			//$("#tabella").tablesorter();
			 // call the tablesorter plugin
  $("#tabella").tablesorter({
	  theme: 'default',

    // hidden filter input/selects will resize the columns, so try to minimize the change
    widthFixed : true,
 
    showProcessing: true,
    headerTemplate : '{content} {icon}', // Add icon for various themes

    widgets: [ 'zebra', 'stickyHeaders', 'filter' ],

	ignoreCase: false,
	
    widgetOptions: {

      // extra class name added to the sticky header row
      stickyHeaders : '',
      // number or jquery selector targeting the position:fixed element
      stickyHeaders_offset : 0,
      // added to table ID, if it exists
      stickyHeaders_cloneId : '-sticky',
      // trigger "resize" event on headers
      stickyHeaders_addResizeEvent : true,
      // if false and a caption exist, it won't be included in the sticky header
      stickyHeaders_includeCaption : true,
      // The zIndex of the stickyHeaders, allows the user to adjust this to their needs
      stickyHeaders_zIndex : 2,
      // jQuery selector or object to attach sticky header to
      stickyHeaders_attachTo : null,
      // jQuery selector or object to monitor horizontal scroll position (defaults: xScroll > attachTo > window)
      stickyHeaders_xScroll : null,
      // jQuery selector or object to monitor vertical scroll position (defaults: yScroll > attachTo > window)
      stickyHeaders_yScroll : null,

      // scroll table top into view after filtering
      stickyHeaders_filteredToTop: true,

      // *** REMOVED jQuery UI theme due to adding an accordion on this demo page ***
      // adding zebra striping, using content and default styles - the ui css removes the background from default
      // even and odd class names included for this demo to allow switching themes
      // , zebra   : ["ui-widget-content even", "ui-state-default odd"]
      // use uitheme widget to apply defauly jquery ui (jui) class names
      // see the uitheme demo for more details on how to change the class names
      // , uitheme : 'jui'
	  
	  // filter_anyMatch options was removed in v2.15; it has been replaced by the filter_external option

      // If there are child rows in the table (rows with class name from "cssChildRow" option)
      // and this option is true and a match is found anywhere in the child row, then it will make that row
      // visible; default is false
      filter_childRows : false,

      // if true, filter child row content by column; filter_childRows must also be true
      filter_childByColumn : false,

      // if true, include matching child row siblings
      filter_childWithSibs : true,

      // if true, a filter will be added to the top of each table column;
      // disabled by using -> headers: { 1: { filter: false } } OR add class="filter-false"
      // if you set this to false, make sure you perform a search using the second method below
      filter_columnFilters : true,

      // if true, allows using "#:{query}" in AnyMatch searches (column:query; added v2.20.0)
      filter_columnAnyMatch: true,

      // extra css class name (string or array) added to the filter element (input or select)
      filter_cellFilter : '',

      // extra css class name(s) applied to the table row containing the filters & the inputs within that row
      // this option can either be a string (class applied to all filters) or an array (class applied to indexed filter)
      filter_cssFilter : '', // or []

      // add a default column filter type "~{query}" to make fuzzy searches default;
      // "{q1} AND {q2}" to make all searches use a logical AND.
      filter_defaultFilter : {},

      // filters to exclude, per column
      filter_excludeFilter : {},

      // jQuery selector (or object) pointing to an input to be used to match the contents of any column
      // please refer to the filter-any-match demo for limitations - new in v2.15
      filter_external : '',

      // class added to filtered rows (rows that are not showing); needed by pager plugin
      filter_filteredRow : 'filtered',

      // add custom filter elements to the filter row
      // see the filter formatter demos for more specifics
      filter_formatter : null,

      // add custom filter functions using this option
      // see the filter widget custom demo for more specifics on how to use this option
      filter_functions : null,

      // hide filter row when table is empty
      filter_hideEmpty : true,

      // if true, filters are collapsed initially, but can be revealed by hovering over the grey bar immediately
      // below the header row. Additionally, tabbing through the document will open the filter row when an input gets focus
      filter_hideFilters : true,

      // Set this option to false to make the searches case sensitive
      filter_ignoreCase : true,

      // if true, search column content while the user types (with a delay)
      filter_liveSearch : true,

      // global query settings ('exact' or 'match'); overridden by "filter-match" or "filter-exact" class
      filter_matchType : { 'input': 'exact', 'select': 'exact' },

      // a header with a select dropdown & this class name will only show available (visible) options within that drop down.
      filter_onlyAvail : 'filter-onlyAvail',

      // default placeholder text (overridden by any header "data-placeholder" setting)
      filter_placeholder : { search : '', select : '' },

      // jQuery selector string of an element used to reset the filters
      filter_reset : 'button.reset',

      // Reset filter input when the user presses escape - normalized across browsers
      filter_resetOnEsc : true,

      // Use the $.tablesorter.storage utility to save the most recent filters (default setting is false)
      filter_saveFilters : true,

      // Delay in milliseconds before the filter widget starts searching; This option prevents searching for
      // every character while typing and should make searching large tables faster.
      filter_searchDelay : 300,

      // allow searching through already filtered rows in special circumstances; will speed up searching in large tables if true
      filter_searchFiltered: true,

      // include a function to return an array of values to be added to the column filter select
      filter_selectSource  : null,

      // if true, server-side filtering should be performed because client-side filtering will be disabled, but
      // the ui and events will still be used.
      filter_serversideFiltering : false,

      // Set this option to true to use the filter to find text from the start of the column
      // So typing in "a" will find "albert" but not "frank", both have a's; default is false
      filter_startsWith : false,

      // Filter using parsed content for ALL columns
      // be careful on using this on date columns as the date is parsed and stored as time in seconds
      filter_useParsedData : false,

      // data attribute in the header cell that contains the default filter value
      filter_defaultAttrib : 'data-value',

      // filter_selectSource array text left of the separator is added to the option value, right into the option text
      filter_selectSourceSeparator : '|'
    }
  });



		}
		else
		{	
			$('#attribute-table').html(table);
			console.log("["+date()+"]"+ 'inserimento tabella nella pagina html' );
			  $("#attribute-table").tablesorter({
	  theme: 'default',

    // hidden filter input/selects will resize the columns, so try to minimize the change
    widthFixed : true,
 
    showProcessing: true,
    headerTemplate : '{content} {icon}', // Add icon for various themes

    widgets: [ 'zebra', 'stickyHeaders', 'filter' ],

	ignoreCase: false,
	
    widgetOptions: {

      // extra class name added to the sticky header row
      stickyHeaders : '',
      // number or jquery selector targeting the position:fixed element
      stickyHeaders_offset : 0,
      // added to table ID, if it exists
      stickyHeaders_cloneId : '-sticky',
      // trigger "resize" event on headers
      stickyHeaders_addResizeEvent : true,
      // if false and a caption exist, it won't be included in the sticky header
      stickyHeaders_includeCaption : true,
      // The zIndex of the stickyHeaders, allows the user to adjust this to their needs
      stickyHeaders_zIndex : 2,
      // jQuery selector or object to attach sticky header to
      stickyHeaders_attachTo : '#contentOpzioniTabella',
      // jQuery selector or object to monitor horizontal scroll position (defaults: xScroll > attachTo > window)
      stickyHeaders_xScroll : null,
      // jQuery selector or object to monitor vertical scroll position (defaults: yScroll > attachTo > window)
      stickyHeaders_yScroll : null,

      // scroll table top into view after filtering
      stickyHeaders_filteredToTop: true,

      // *** REMOVED jQuery UI theme due to adding an accordion on this demo page ***
      // adding zebra striping, using content and default styles - the ui css removes the background from default
      // even and odd class names included for this demo to allow switching themes
      // , zebra   : ["ui-widget-content even", "ui-state-default odd"]
      // use uitheme widget to apply defauly jquery ui (jui) class names
      // see the uitheme demo for more details on how to change the class names
      // , uitheme : 'jui'
	  
	  // filter_anyMatch options was removed in v2.15; it has been replaced by the filter_external option

      // If there are child rows in the table (rows with class name from "cssChildRow" option)
      // and this option is true and a match is found anywhere in the child row, then it will make that row
      // visible; default is false
      filter_childRows : false,

      // if true, filter child row content by column; filter_childRows must also be true
      filter_childByColumn : false,

      // if true, include matching child row siblings
      filter_childWithSibs : true,

      // if true, a filter will be added to the top of each table column;
      // disabled by using -> headers: { 1: { filter: false } } OR add class="filter-false"
      // if you set this to false, make sure you perform a search using the second method below
      filter_columnFilters : true,

      // if true, allows using "#:{query}" in AnyMatch searches (column:query; added v2.20.0)
      filter_columnAnyMatch: true,

      // extra css class name (string or array) added to the filter element (input or select)
      filter_cellFilter : '',

      // extra css class name(s) applied to the table row containing the filters & the inputs within that row
      // this option can either be a string (class applied to all filters) or an array (class applied to indexed filter)
      filter_cssFilter : '', // or []

      // add a default column filter type "~{query}" to make fuzzy searches default;
      // "{q1} AND {q2}" to make all searches use a logical AND.
      filter_defaultFilter : {},

      // filters to exclude, per column
      filter_excludeFilter : {},

      // jQuery selector (or object) pointing to an input to be used to match the contents of any column
      // please refer to the filter-any-match demo for limitations - new in v2.15
      filter_external : '',

      // class added to filtered rows (rows that are not showing); needed by pager plugin
      filter_filteredRow : 'filtered',

      // add custom filter elements to the filter row
      // see the filter formatter demos for more specifics
      filter_formatter : null,

      // add custom filter functions using this option
      // see the filter widget custom demo for more specifics on how to use this option
      filter_functions : null,

      // hide filter row when table is empty
      filter_hideEmpty : true,

      // if true, filters are collapsed initially, but can be revealed by hovering over the grey bar immediately
      // below the header row. Additionally, tabbing through the document will open the filter row when an input gets focus
      filter_hideFilters : true,

      // Set this option to false to make the searches case sensitive
      filter_ignoreCase : true,

      // if true, search column content while the user types (with a delay)
      filter_liveSearch : true,

      // global query settings ('exact' or 'match'); overridden by "filter-match" or "filter-exact" class
      filter_matchType : { 'input': 'exact', 'select': 'exact' },

      // a header with a select dropdown & this class name will only show available (visible) options within that drop down.
      filter_onlyAvail : 'filter-onlyAvail',

      // default placeholder text (overridden by any header "data-placeholder" setting)
      filter_placeholder : { search : '', select : '' },

      // jQuery selector string of an element used to reset the filters
      filter_reset : 'button.reset',

      // Reset filter input when the user presses escape - normalized across browsers
      filter_resetOnEsc : true,

      // Use the $.tablesorter.storage utility to save the most recent filters (default setting is false)
      filter_saveFilters : true,

      // Delay in milliseconds before the filter widget starts searching; This option prevents searching for
      // every character while typing and should make searching large tables faster.
      filter_searchDelay : 300,

      // allow searching through already filtered rows in special circumstances; will speed up searching in large tables if true
      filter_searchFiltered: true,

      // include a function to return an array of values to be added to the column filter select
      filter_selectSource  : null,

      // if true, server-side filtering should be performed because client-side filtering will be disabled, but
      // the ui and events will still be used.
      filter_serversideFiltering : false,

      // Set this option to true to use the filter to find text from the start of the column
      // So typing in "a" will find "albert" but not "frank", both have a's; default is false
      filter_startsWith : false,

      // Filter using parsed content for ALL columns
      // be careful on using this on date columns as the date is parsed and stored as time in seconds
      filter_useParsedData : false,

      // data attribute in the header cell that contains the default filter value
      filter_defaultAttrib : 'data-value',

      // filter_selectSource array text left of the separator is added to the option value, right into the option text
      filter_selectSourceSeparator : '|'
    }
  });
					//$("#ControlPane").hide();
			
			$("#tablePane").show();
			$("#info-control-pane").show();
		}
	
	});
	console.log( "["+date()+"]"+'fine creazione success' );


}

function creaTabellaNodo(id){
	var jqxhr = $.getJSON( 'json/Crime.json', function( data ) {
		var node=cercaPerID(id,data);
	
		$('#attribute-table-node').html("<th><h3 style='text-align: right;'>label</h3></th><td><h3 style='text-align: right;'>" + node.label + "</h3></td>");
	
	 for(i in node.attributes){
     	$('#attribute-table-node').append("<tr><th align='right'>" + i +
     			":</th><td id=" + i + ">" + 
     			node.attributes[i] + "</td></tr>");
     }
    

	console.log( "["+date()+"]"+'inserimento tabella nella pagina html' );

	//$("#ControlPane").hide();
			
			$("#tablePane").show();
			$("#info-control-pane").show();

});
}
//cerca all'interno dell'array pasatogli su quell'attributo il valore 
function cercaTabella(array,attributo , valore){
		conosole.log("["+date()+"] inzio ricerca attributo");
	
		var toReturn;
		for(var j=0; j<array.length; j++){
			if(array[j].attributo== valore)
			{
				toReturn.push(array[j]);
			}
		}
	return toReturn;
}


//ritorna la stringa del nome(label) corrispondente all id passata
function cercaID(id){
	var jqxhr = $.getJSON( 'json/Crime.json', function( data ) {
		console.log("["+date()+"]"+ 'lettura file json success' );
		console.log("["+date()+"]"+"cerco il nome corrispondete all'id "+id);
		a= cercaPerID(id,data).label;
		console.log("["+date()+"]"+"valore trovato "+a);
		return a;

	})


}

//cerca il nodo nell'array nodes preso dal json traminte id e lo ritorna
function cercaPerID(id, A){
	for(var j=0; j<A.nodes.length; j++){
		if (A.nodes[j].id == id) //A = data ,id = data.edges[i].source
		{
			return A.nodes[j];
		}
	}
}


