var element = d3.select("#canvas_069");


d3.xml("static/viz/069/sausage.svg", function(error, documentFragment) {

if (error) {console.log(error); return;}
var svgNode = documentFragment.getElementsByTagName("svg")[0];
element.node().appendChild(svgNode);

});
