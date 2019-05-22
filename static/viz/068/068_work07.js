// ----------------------------------------------------------
// DATA -----------------------------------------------------
// ----------------------------------------------------------
var data_set_068 = {
container_width: 540,
container_height: 540,
margin: 20,
center_x: 250,
center_y: 270,
// ----------------------------------------------------------
position_headline: 25,
position_source: 500,
// ----------------------------------------------------------
text_headline: "###",
text_subheadline: "###",
text_source: "Source: ###",
// ----------------------------------------------------------
color_bg: "#f9f4ef",
color_basic: "#a399e7",
color_layout_stroke: "#f2e8df",
// ----------------------------------------------------------
// plot
index: 1,
plot_width: 400,
plot_height: 360,
set_1: [
{"label": "A", "posX": 50, "posY": 50, "rad": 20},
{"label": "B", "posX": 100, "posY": 100, "rad": 20},
{"label": "C", "posX": 150, "posY": 150, "rad": 20},
],
set_2: [
{"label": "D", "posX": 200, "posY": 200, "rad": 20},
{"label": "E", "posX": 250, "posY": 250, "rad": 20}
],
// text
color_text_headline: "#2e2f33",
color_text_source: "#e4cfbb"
};




// ----------------------------------------------------------
// STRUCTURE ------------------------------------------------
// ----------------------------------------------------------
// create container for svg content
var container_068 = d3.select("#canvas_068").append("svg")
.attr("width", data_set_068.container_width)
.attr("height", data_set_068.container_height)
.attr("class", "canvas")
//.style("border", "1px solid black")
.style("background-color", data_set_068.color_bg);
// set up margin
var margin_068 = data_set_068.margin;
var width_068 = data_set_068.container_width - 2 * margin_068;
var height_068 = data_set_068.container_height - 2 * margin_068;
// ----------------------------------------------------------
// create group for layout
var layout_group_068 = container_068.append("g")
.attr("class", "layout_group");
// ----------------------------------------------------------
// create container for scaling
var container_margin_068 = container_068.append("g")
.attr("class", "canvas_margin")
.attr("transform", `translate(${margin_068}, ${margin_068})`);
// ----------------------------------------------------------
// create group for gfx - translate the group for margin top, left
var gfx_group_068 = container_margin_068.append("g");
// create sub-groups for layers
var gfx_layer_0_068 = gfx_group_068.append("g")
.attr("class", "gfx_layer_0")
.attr("transform", "translate(80,70)");

// ----------------------------------------------------------
// create group for text
var text_group_068 = container_margin_068.append("g");




// ----------------------------------------------------------
// LAYOUT ---------------------------------------------------
// ----------------------------------------------------------
// set layout strokes
layout_group_068.append("rect")
.attr("class", "gfx_bar_stroke")
.attr("x", 20)
.attr("y", data_set_068.position_headline + 35)
.attr("height", 2)
.attr("width", 500)
.style("fill", data_set_068.color_layout_stroke);
//
layout_group_068.append("rect")
.attr("class", "gfx_bar_stroke")
.attr("x", 20)
.attr("y", data_set_068.position_source + 30)
.attr("height", 2)
.attr("width", 500)
.style("fill", data_set_068.color_layout_stroke);




// ----------------------------------------------------------
// GFX ------------------------------------------------------
// ----------------------------------------------------------
// Parse the Data
//d3.csv("http://niefeld.com/static/viz/068/data.csv", function(data_area_067) {
d3.csv("static/viz/068/data.csv", function(data_plot_068) {


// Add X axis
var x = d3.scaleLinear()
.domain([0, 100])
.range([ 0, data_set_068.plot_width]);
gfx_layer_0_068.append("g")
.attr("transform", "translate(0," + data_set_068.plot_height + ")")
.call(d3.axisBottom(x))

// Y axis
var y = d3.scaleBand()
.range([ 0, data_set_068.plot_height ])
.domain(data_plot_068.map(function(d) { return d.group; }))
.padding(1);
gfx_layer_0_068.append("g")
.call(d3.axisLeft(y))

// Lines
gfx_layer_0_068.selectAll()
.data(data_plot_068)
.enter()
.append("line")
.attr("class", "plot-line")
.attr("x1", function(d) { return x(d.value1); })
.attr("x2", function(d) { return x(d.value2); })
.attr("y1", function(d) { return y(d.group); })
.attr("y2", function(d) { return y(d.group); })
.attr("stroke", "grey")
.attr("stroke-width", "1px")

// Circles of variable 1
gfx_layer_0_068.selectAll()
.data(data_plot_068)
.enter()
.append("circle")
.attr("class", "circle_a")
.attr("cx", function(d) { return x(d.value1); })
.attr("cy", function(d) { return y(d.group); })
.attr("r", "6")
.style("fill", "#69b3a2")

// Circles of variable 2
gfx_layer_0_068.selectAll()
.data(data_plot_068)
.enter()
.append("circle")
.attr("class", "circle_b")
.attr("cx", function(d) { return x(d.value2); })
.attr("cy", function(d) { return y(d.group); })
.attr("r", "6")
.style("fill", "#4C4082")



//-------------------------------------------------------------------
//radio button on website
d3.selectAll("input[name='button_B_068']")
.on("change", change_068)
;

//button function
function change_068() {

//transform to state 2
if (data_set_068.index == 1) {
data_set_068.index = 2;

gfx_layer_0_068.selectAll(".plot-line")
.transition().duration(500)
.attr("x1", function(d) { return x(d.value3); })
.attr("x2", function(d) { return x(d.value4); })

gfx_layer_0_068.selectAll(".circle_a")
.transition().duration(500)
.attr("cx", function(d) { return x(d.value3); })

gfx_layer_0_068.selectAll(".circle_b")
.transition().duration(500)
.attr("cx", function(d) { return x(d.value4); })

//transform to state 1
} else {
data_set_068.index = 1;

gfx_layer_0_068.selectAll(".plot-line")
.transition().duration(500)
.attr("x1", function(d) { return x(d.value1); })
.attr("x2", function(d) { return x(d.value2); })

gfx_layer_0_068.selectAll(".circle_a")
.transition().duration(500)
.attr("cx", function(d) { return x(d.value1); })

gfx_layer_0_068.selectAll(".circle_b")
.transition().duration(500)
.attr("cx", function(d) { return x(d.value2); })

}





/*
// Circles of variable 1
gfx_layer_0_068.selectAll("mycircle")
.data(data_plot_068)
.enter()
.attr("cx", function(d) { return x(d.value3); })
.attr("cy", function(d) { return y(d.group); })
.attr("r", "6")
.style("fill", "#69b3a2")

// Circles of variable 2
gfx_layer_0_068.selectAll("mycircle")
.data(data_plot_068)
.enter()
.attr("cx", function(d) { return x(d.value4); })
.attr("cy", function(d) { return y(d.group); })
.attr("r", "6")
.style("fill", "#4C4082")
*/

//end button function
};

// close csv read function
})





// ----------------------------------------------------------
// TEXT -----------------------------------------------------
// ----------------------------------------------------------
// create text "headline"
var text_headline_068 = text_group_068.append("text")
.attr("class", "text_headline")
.attr("y", data_set_068.position_headline)
.text(data_set_068.text_headline)
.style("fill", data_set_068.color_text_headline);
// create text "subheadline"
var text_subheadline_068 = text_group_068.append("text")
.attr("class", "text_subheadline")
.attr("x", 500)
.attr("y", data_set_068.position_headline)
.attr("text-anchor", "end")
.text(data_set_068.text_subheadline)
.style("fill", data_set_068.color_text_headline);
// create text "source"
var text_source_068 = text_group_068.append("text")
.attr("class", "text_source")
.attr("x", 500)
.attr("y", data_set_068.position_source)
.attr("text-anchor", "end")
.text(data_set_068.text_source)
.style("fill", data_set_068.color_text_source);




//
