// width and heigt of canvas
var width = 960, height = 400, aspect = width / height;

// margins of objects on canvas
var margin = {top: 0, right: 0, bottom: 0, left: 0},
cWidth = width - margin.left - margin.right,
cHeight = height - margin.top - margin.bottom;


//-------------------------------------------------------------

// create svg canvas with canvas_sub
var svgContainer = d3.select("#canvas").append("svg")
.attr("width", width)
.attr("height", width * aspect)
.attr("viewBox", "0 0 "+ width +" " + height +"")
.attr("preserveAspectRatio", "xMidYMid")
.attr("id", "canvas_sub")
.append("g")
.attr("transform", "translate(" + margin.left + "," + margin.top + ")");



// CONTENT --------------------------------------------------

//space for content
var svg = d3.select("svg"),
width = 860, height = 300

// Headline
/*
svg.append("text")
.attr("transform", "translate(100,0)")
.attr("x", 50)
.attr("y", 50)
.attr("font-size", "24px")
.text("Headline")
*/

// set scales for axes
var xScale = d3.scaleBand().range([0, width]).padding(0.4),
yScale = d3.scaleLinear().range([height, 0]);

// create group and add padding from left up corner
var g = svg.append("g")
.attr("transform", "translate(" + 50 + "," + 50 + ")");

// open load csv
d3.csv("static/data/data_01.csv", function(error, data) {
if (error) {
throw error;
}

// translate data for gfx
xScale.domain(data.map(function(d) { return d.name; }));
yScale.domain([0, d3.max(data, function(d) { return d.value; })]);

// deal with x axe
g.append("g")
// put x axe down
.attr("transform", "translate(0," + height + ")")
// scale x axe
.call(d3.axisBottom(xScale))
// text on x axe
/*
.append("text")
.attr("y", height - 0)
.attr("x", width - 0)
.attr("text-anchor", "end")
.attr("stroke", "black")
.text("name");
*/

// deal with y axe
g.append("g")
// bind values to y axe
.call(d3.axisLeft(yScale).tickFormat(function(d){
   return d;
})
/* old version
.call(d3.axisLeft(yScale).tickFormat(function(d){
   return "$" + d;
})
*/
.ticks(4))

// text on y axe
/*
.append("text")
.attr("transform", "rotate(-90)")
.attr("y", 6)
.attr("dy", "-5.1em")
.attr("text-anchor", "end")
.attr("stroke", "black")
.text("Stock Price");
*/

// deal with the bars
g.selectAll(".bar")
.data(data)
.enter().append("rect")
.attr("class", "bar")
.attr("x", function(d) { return xScale(d.name); })
.attr("y", function(d) { return yScale(d.value); })
.attr("width", xScale.bandwidth())
.attr("height", function(d) { return height - yScale(d.value); });


// close csv load
});




//-------------------------------------------------------------

// responsive with window size
var canvas_sub = $("#canvas_sub"),
svgContainer = canvas_sub.parent();

$(window).on("resize", function() {
var targetWidth = svgContainer.width();
canvas_sub.attr("width", targetWidth);
canvas_sub.attr("height", Math.round(targetWidth / aspect));
}).trigger("resize");
