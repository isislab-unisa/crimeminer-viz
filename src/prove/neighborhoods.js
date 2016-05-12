/**
 * This example shows how to explore the neighborhoods inside a graph,
 * with a simple example plugin.
 *
 * Basically, a graph is loaded into a kind of database mockup (the
 * sigma.plugins.neighborhoods plugin) that provides a method to retrieve
 * the neighborhood (or ego-centered network) of a specified node. Then,
 * a sigma instance will display only this graph, instead of the global
 * one.
 *
 * And also, if you are looking for an exemple of graph custom method or
 * how to use the graph model outside of sigma, this is the place.
 */
var s = new sigma({
		container: 'graph-container',
		settings: {
			defaultLabelColor: '#fff',
			sideMargin: 2
		}
	}),
	db = new sigma.plugins.neighborhoods();


db.load('../json/Crime.json', function() {
  var nodeId = '181';
  s
    .read(db.neighborhood(nodeId))
    .refresh();
});