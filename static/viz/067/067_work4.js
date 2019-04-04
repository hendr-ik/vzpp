// ----------------------------------------------------------
// DATA -----------------------------------------------------
// ----------------------------------------------------------
var data_set_067 = {
container_width: 540,
container_height: 540,
margin: 20,
center_x: 250,
center_y: 270,
// ----------------------------------------------------------
area_width: 460,
area_height: 360,
// ----------------------------------------------------------
position_headline: 25,
position_source: 500,
// ----------------------------------------------------------
text_headline_1: "Instagram Users",
text_subheadline_1: "Top 10, 2018",
text_subheadline_2: "MAU, In millions",
text_subheadline_3: "MAU, In millions",
text_source: "Source: Statista 2018, TechCrunch 2016",
// ----------------------------------------------------------
color_bg: "#f9f4ef",
color_basic: "#a399e7",
color_layout_stroke: "#f2e8df",
// graph
color_graph_layout_axis: "#a5a7af",
color_graph_area: ["261697","#5b4cc4","a399e7","da5404","ff8e4b","ffc19c","ddad00","ffd84b","ffeca7"],
// text
color_text_headline: "#2e2f33",
color_text_source: "#e4cfbb"
};





// ----------------------------------------------------------
// STRUCTURE ------------------------------------------------
// ----------------------------------------------------------
// create container for svg content
var container_067 = d3.select("#canvas_067").append("svg")
.attr("width", data_set_067.container_width)
.attr("height", data_set_067.container_height)
.attr("class", "canvas")
//.style("border", "1px solid black")
.style("background-color", data_set_067.color_bg);
// set up margin
var margin_067 = data_set_067.margin;
var width_067 = data_set_067.container_width - 2 * margin_067;
var height_067 = data_set_067.container_height - 2 * margin_067;
// ----------------------------------------------------------
// create group for layout
var layout_group_067 = container_067.append("g")
.attr("class", "layout_group");
// ----------------------------------------------------------
// create container for scaling
var container_margin_067 = container_067.append("g")
.attr("class", "canvas_margin")
.attr("transform", `translate(${margin_067}, ${margin_067})`);
// ----------------------------------------------------------
// create group for gfx - translate the group for margin top, left
var gfx_group_067 = container_margin_067.append("g")
//.attr("transform", "translate(" + data_set_067.center_x + "," + data_set_067.center_y + ")")
.attr("class", "gfx_group")
//.attr("transform", "translate(50,0)");
// create sub-groups for layers
var gfx_layer_0_067 = gfx_group_067.append("g")
.attr("class", "gfx_layer_0")
.attr("transform", "translate(38,70)")
;
var gfx_layer_1_067 = gfx_group_067.append("g")
.attr("class", "gfx_layer_1")
.attr("transform", "translate(38,70)")
;
// ----------------------------------------------------------
// create group for text
var text_group_067 = container_margin_067.append("g")
.attr("class", "text_group");




// ----------------------------------------------------------
// LAYOUT ---------------------------------------------------
// ----------------------------------------------------------
// set layout strokes
layout_group_067.append("rect")
.attr("class", "gfx_bar_stroke")
.attr("x", 20)
.attr("y", data_set_067.position_headline + 35)
.attr("height", 2)
.attr("width", 500)
.style("fill", data_set_067.color_layout_stroke);
//
layout_group_067.append("rect")
.attr("class", "gfx_bar_stroke")
.attr("x", 20)
.attr("y", data_set_067.position_source + 30)
.attr("height", 2)
.attr("width", 500)
.style("fill", data_set_067.color_layout_stroke);




// ----------------------------------------------------------
// GFX ------------------------------------------------------
// ----------------------------------------------------------

// LAYER 0 --------------------------------------------------

// Parse the Data
d3.csv("static/viz/067/data.csv", function(data_graph_067) {
// List of groups = header of the csv files
var keys_067 = data_graph_067.columns.slice(1)

// build array of selected years
var selectedX_067 = [];
for (var i = 0; i < data_graph_067.length; i++) {
selectedX_067.push(data_graph_067[i].year);
};
// define threshold
var thresholdX_067 = d3.scaleThreshold()
.domain(selectedX_067);

// define X scale
var xScale_067 = d3.scaleLinear()
.range([ 0, data_set_067.area_width ])
.domain(d3.extent(data_graph_067, function(d) { return d.year; }));

// add X axis
gfx_layer_0_067.append("g")
.attr("transform", "translate(0," + data_set_067.area_height + ")")
.call(d3.axisBottom(xScale_067)
// pass treshhold values
.tickValues(thresholdX_067.domain())
// format to plain number
.tickFormat(d3.format("")))
.call(customXAxis_067);

// change X axis design
function customXAxis_067(g) {
g.select(".domain").remove();
g.selectAll(".tick line").attr("stroke", data_set_067.color_graph_layout_axis)
g.selectAll("text").attr("transform", "translate(-10,0)rotate(-45)")
.style("text-anchor", "end").attr("fill", data_set_067.color_graph_layout_axis);

// highlight stuff
var ticks_067 = g.selectAll(".tick");
ticks_067.attr("class", function(d,i){
if(data_graph_067[i].year == 2010){ return "tick_marker"}
else if(data_graph_067[i].year == 1995){ return "tick_marker"}
else if(data_graph_067[i].year == 2016){ return "tick_marker"}
else{ return "tick"}
});
g.selectAll(".tick_marker text").attr("fill", "#000");
g.selectAll(".tick_marker line").attr("stroke", "#000");
}


// array of selected values
var selectedY_067 = [0,200,1100,1700];

// define threshold
var thresholdY_067 = d3.scaleThreshold()
.domain(selectedY_067);

// define Y scales
var yScale_067 = d3.scaleLinear()
.domain([0, 1700])
.range([ data_set_067.area_height, 0 ]);

// add Y axis
gfx_layer_0_067.append("g")
.call(d3.axisRight(yScale_067)
.tickSize(data_set_067.area_width)
.tickValues(thresholdY_067.domain()))
.call(customYAxis_067);

// change Y axis design
function customYAxis_067(g) {
g.select(".domain").remove();
g.selectAll(".tick:not(:first-of-type) line").attr("stroke", data_set_067.color_graph_layout_axis)
.attr("stroke-dasharray", "3,3").style("stroke-width", 1);
g.selectAll(".tick:first-of-type line").remove();
g.selectAll(".tick text").attr("text-anchor", "end").attr("x", -6).attr("dy", -2)
.style("fill", data_set_067.color_graph_layout_axis);
}


// color palette
var color = d3.scaleOrdinal()
.domain(keys_067)
.range(data_set_067.color_graph_area)

//stack the data
var stackedData_067 = d3.stack().keys(keys_067)(data_graph_067)

// Show the areas
gfx_layer_1_067.selectAll()
.data(stackedData_067)
.enter()
.append("path")
.style("fill", function(d) { console.log(d.key) ; return color(d.key); })
.attr("d", d3.area()
.x(function(d, i) { return xScale_067(d.data.year); })
.y0(function(d) { return yScale_067(d[0]); })
.y1(function(d) { return yScale_067(d[1]); })
)
})







// ----------------------------------------------------------
// TEXT -----------------------------------------------------
// ----------------------------------------------------------
// create text "headline"
var text_headline_067 = text_group_067.append("text")
.attr("class", "text_headline")
.attr("y", data_set_067.position_headline)
.text(data_set_067.text_headline_1)
.style("fill", data_set_067.color_text_headline);
// create text "subheadline 1"
var text_subheadline_067 = text_group_067.append("text")
.attr("class", "text_subheadline_1")
.attr("x", 500)
.attr("y", data_set_067.position_headline - 14)
.attr("text-anchor", "end")
.text(data_set_067.text_subheadline_1)
.style("fill", data_set_067.color_text_headline);
// create text "subheadline 2"
var text_subheadline_067 = text_group_067.append("text")
.attr("class", "text_subheadline_2")
.attr("x", 500)
.attr("y", data_set_067.position_headline + 4)
.attr("text-anchor", "end")
.text(data_set_067.text_subheadline_2)
.style("fill", data_set_067.color_text_headline);
// create text "source"
var text_source_067 = text_group_067.append("text")
.attr("class", "text_source")
.attr("x", 500)
.attr("y", data_set_067.position_source)
.attr("text-anchor", "end")
.text(data_set_067.text_source)
.style("fill", data_set_067.color_text_source);




//
