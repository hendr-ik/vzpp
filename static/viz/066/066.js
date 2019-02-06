// ----------------------------------------------------------
// DATA -----------------------------------------------------
// ----------------------------------------------------------

var data_set_066 =
{
container_width: 540,
container_height: 540,
margin: 20,
center_x: 250,
center_y: 270,
map_width: 540,
map_height: 540,
bar_width: 450,
bar_height: 400,
bar_height_2: 350,
bar_fix: 50,
// ----------------------------------------------------------
position_headline: 25,
position_source: 500,
position_menu: 480,
// ----------------------------------------------------------
text_headline_1: "Instagram Users",
text_headline_2: "Monthly Active Users 2013",
text_headline_switch: 0,
text_subheadline_1: "Top 10, 2018",
text_subheadline_2: "MAU, In millions",
text_subheadline_3: "MAU, In millions",
text_source: "Source: Statista 2018, TechCrunch 2016",
// ----------------------------------------------------------
color_bg: "#f9f4ef",
color_layout_stroke: "#f2e8df",
// pie
color_pie_1: "#796dd5",
color_pie_2: "#a399e7",
color_pie_3: "#ff8e4b",
color_pie_display: "#2e2f33",
color_pie_value: "#2e2f33",
color_pie_selected: "#da5404",
// text
color_text_headline: "#2e2f33",
color_text_source: "#e4cfbb"
};

var circleData = [
{ "cx": -180, "cy": -50, "radius": 121, "display": "USA"},
{ "cx": 112, "cy": 38, "radius": 71, "display": "India"},
{ "cx": -80, "cy": 60, "radius": 64, "display": "Brazil"},
{ "cx": 180, "cy": 50, "radius": 59, "display": "Indonesia"},
{ "cx": 30, "cy": -18, "radius": 37, "display": "Turkey"},
{ "cx": 130, "cy": -70, "radius": 32, "display": "Russia"},
{ "cx": 208, "cy": -12, "radius": 25, "display": "Japan"},
{ "cx": 66, "cy": 6, "radius": 24, "display": "Iran"},
{ "cx": -14, "cy": -38, "radius": 23, "display": "UK"},
{ "cx": -158, "cy": 22, "radius": 22, "display": "Mexico"}
];


/*
var barData = [
{ "cx": -180, "cy": -50, "radius": 121, "display": "USA"},
{ "cx": 112, "cy": 38, "radius": 71, "display": "India"},
{ "cx": -80, "cy": 60, "radius": 64, "display": "Brazil"},
{ "cx": 180, "cy": 50, "radius": 59, "display": "Indonesia"},
{ "cx": 30, "cy": -18, "radius": 37, "display": "Turkey"},
{ "cx": 130, "cy": -70, "radius": 32, "display": "Russia"},
{ "cx": 208, "cy": -12, "radius": 25, "display": "Japan"},
{ "cx": 66, "cy": 6, "radius": 24, "display": "Iran"},
{ "cx": -14, "cy": -38, "radius": 23, "display": "UK"},
{ "cx": -158, "cy": 22, "radius": 22, "display": "Mexico"}
];
*/


// ----------------------------------------------------------
// STRUCTURE ------------------------------------------------
// ----------------------------------------------------------

// create container for svg content
var container_066 = d3.select("#canvas_066").append("svg")
.attr("width", data_set_066.container_width)
.attr("height", data_set_066.container_height)
.attr("class", "canvas")
//.style("border", "1px solid black")
.style("background-color", data_set_066.color_bg);
// set up margin
var margin_066 = data_set_066.margin;
var width_066 = data_set_066.container_width - 2 * margin_066;
var height_066 = data_set_066.container_height - 2 * margin_066;
// ----------------------------------------------------------
// create group for layout
var layout_group_066 = container_066.append("g")
.attr("class", "layout_group");
// ----------------------------------------------------------
// create container for scaling
var container_margin_066 = container_066.append("g")
.attr("class", "canvas_margin")
.attr("transform", `translate(${margin_066}, ${margin_066})`);
// ----------------------------------------------------------
// create group for gfx - translate the group for margin top, left
var gfx_group_066 = container_margin_066.append("g")
.attr("transform", "translate(" + data_set_066.center_x + "," + data_set_066.center_y + ")")
.attr("class", "gfx_group");
// create sub-groups for layers
var gfx_layer_0_066 = gfx_group_066.append("g")
.attr("class", "gfx_layer_0");
var gfx_layer_1_066 = gfx_group_066.append("g")
.attr("class", "gfx_layer_1");
var gfx_layer_2_066 = gfx_group_066.append("g")
.attr("class", "gfx_layer_2");
var gfx_layer_3_066 = gfx_group_066.append("g")
.attr("transform", "translate(-200,-200)")
.attr("class", "gfx_layer_3");
// ----------------------------------------------------------
// create group for text
var text_group_066 = container_margin_066.append("g")
.attr("class", "text_group");




// ----------------------------------------------------------
// LAYOUT ---------------------------------------------------
// ----------------------------------------------------------
// set layout strokes
layout_group_066.append("rect")
.attr("class", "gfx_bar_stroke")
.attr("x", 20)
.attr("y", data_set_066.position_headline + 35)
.attr("height", 2)
.attr("width", 500)
.style("fill", data_set_066.color_layout_stroke);

layout_group_066.append("rect")
.attr("class", "gfx_bar_stroke")
.attr("x", 20)
.attr("y", data_set_066.position_source + 30)
.attr("height", 2)
.attr("width", 500)
.style("fill", data_set_066.color_layout_stroke);




// ----------------------------------------------------------
// GFX ------------------------------------------------------
// ----------------------------------------------------------

// LAYER 0 --------------------------------------------------
// Create map
// Map and projection
var path = d3.geoPath();
var projection = d3.geoVanDerGrinten3()
.scale(90)
.center([0,0])
.translate([-10,50]);
// Data and color scale
var data = d3.map();
var colorScale = d3.scaleThreshold()
.domain([21])
.range(["#eedccb", "#d8c1ac"]);
// Load external data and boot
d3.queue()
.defer(d3.json, "static/viz/066/world.geojson")
.defer(d3.csv, "static/viz/066/world_population.csv", function(d) { data.set(d.code, +d.pop); })
.await(ready);
// Draw function
function ready(error, topo) {
// Draw the map
gfx_layer_0_066.append("g")
.selectAll("path")
.data(topo.features)
.enter()
.append("path")
// draw each country
.attr("d", d3.geoPath()
.projection(projection)
)
// set stroke
.style("stroke", "#f9f4ef")
// set the color of each country
.attr("fill", function (d) {
d.total = data.get(d.id) || 0;
return colorScale(d.total);
});

// LAYER 1 --------------------------------------------------
// Add circles
gfx_layer_1_066.append("g")
.selectAll("circle")
.data(circleData)
.enter()
.append("circle")
.attr("cx", function (d) { return d.cx; })
.attr("cy", function (d) { return d.cy; })
.attr("r", function (d) { return d.radius / 2.8; })
.style("fill", "#a399e7")
.attr("fill-opacity", .5)
}

// LAYER 2 --------------------------------------------------
// Add display
gfx_layer_2_066.append("g")
.selectAll("text")
.data(circleData)
.enter()
.append("text")
.attr("class", "map_display")
.attr("x", function(d) { return d.cx + d.radius / 30 })
.attr("y", function(d) { return 10 + d.cy; })
.text(function(d) { return d.display })
.style("fill", "#2e2f33");
// Add value
gfx_layer_2_066.append("g")
.selectAll("text")
.data(circleData)
.enter()
.append("text")
.attr("class", "map_value")
.attr("x", function(d) { return d.cx + d.radius / 30; })
.attr("y", function(d) { return 28 + d.cy; })
.text(function(d) { return d.radius })
.style("fill", "#2e2f33");











// LAYER 3 --------------------------------------------------

// Parse the Data
d3.csv("static/viz/066/bars_data.csv", function(data) {

// X axis
var x = d3.scaleBand()
.range([ 0, data_set_066.bar_width ])
.domain(data.map(function(d) { return d.Country; }))
.padding(0.2);

gfx_layer_3_066.append("g")
.attr("transform", "translate(0," + data_set_066.bar_height_2 + ")")
.call(d3.axisBottom(x))
.selectAll("text")
.attr("transform", "translate(-10,0)rotate(-45)")
.style("text-anchor", "end");

// Add Y axis
var y = d3.scaleLinear()
.domain([0, 1000])
.range([ data_set_066.bar_height - data_set_066.bar_fix, 0]);
gfx_layer_3_066.append("g")
.call(d3.axisLeft(y));

// Bars
gfx_layer_3_066.selectAll("mybar")
.data(data)
.enter()
.append("rect")
.attr("x", function(d) { return x(d.Country); })
.attr("width", x.bandwidth())
.attr("fill", "#69b3a2")
// no bar at the beginning thus:
.attr("height", function(d) { return data_set_066.bar_height - data_set_066.bar_fix }) // always equal to 0
.attr("y", function(d) { return y(0); })


// Animation
gfx_layer_3_066.selectAll("rect")
  .attr("y", function(d) { return y(d.Value); })
  .attr("height", function(d) { return data_set_066.bar_height - data_set_066.bar_fix - y(d.Value); })
})














// ----------------------------------------------------------
// ANIMATION ------------------------------------------------
// ----------------------------------------------------------

// set up switch variable and layer transparencys
var switch_066 = true;
d3.select(".gfx_layer_0").attr("opacity", 1);
d3.select(".gfx_layer_1").attr("opacity", 1);
d3.select(".gfx_layer_2").attr("opacity", 1);
d3.select(".gfx_layer_3").attr("opacity", 0);
//
d3.select(".text_subheadline_1").attr("opacity", 1);
d3.select(".text_subheadline_2").attr("opacity", 1);


// On radio button click
d3.selectAll("input")
.on("change", change
);
function change() {
if (switch_066 == false) {
d3.select(".gfx_layer_3").transition().duration(200).attr("opacity", 0);
//
d3.select(".text_subheadline_1").transition().duration(300).attr("opacity", 1);
d3.select(".gfx_layer_0").transition().duration(300).attr("opacity", 1);
d3.select(".gfx_layer_1").transition().delay(150).duration(300).attr("opacity", 1);
d3.select(".gfx_layer_2").transition().delay(250).duration(300).attr("opacity", 1);

switch_066 = true;
}
else {
d3.select(".text_subheadline_1").transition().duration(200).attr("opacity", 0);
d3.select(".gfx_layer_2").transition().duration(200).attr("opacity", 0);
d3.select(".gfx_layer_1").transition().duration(200).attr("opacity", 0);
d3.select(".gfx_layer_0").transition().delay(50).duration(200).attr("opacity", 0);
//
d3.select(".gfx_layer_3").transition().duration(300).attr("opacity", 1);
switch_066 = false;
}
}




// ----------------------------------------------------------
// TEXT -----------------------------------------------------
// ----------------------------------------------------------

// create text "headline"
var text_headline_066 = text_group_066.append("text")
.attr("class", "text_headline")
.attr("y", data_set_066.position_headline)
.text(data_set_066.text_headline_1)
.style("fill", data_set_066.color_text_headline);
// create text "subheadline 1"
var text_subheadline_066 = text_group_066.append("text")
.attr("class", "text_subheadline_1")
.attr("x", 500)
.attr("y", data_set_066.position_headline - 14)
.attr("text-anchor", "end")
.text(data_set_066.text_subheadline_1)
.style("fill", data_set_066.color_text_headline);
// create text "subheadline 2"
var text_subheadline_066 = text_group_066.append("text")
.attr("class", "text_subheadline_2")
.attr("x", 500)
.attr("y", data_set_066.position_headline + 4)
.attr("text-anchor", "end")
.text(data_set_066.text_subheadline_2)
.style("fill", data_set_066.color_text_headline);
// create text "source"
var text_source_066 = text_group_066.append("text")
.attr("class", "text_source")
.attr("x", 500)
.attr("y", data_set_066.position_source)
.attr("text-anchor", "end")
.text(data_set_066.text_source)
.style("fill", data_set_066.color_text_source);




//
