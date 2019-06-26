// ----------------------------------------------------------
// DATA -----------------------------------------------------
// ----------------------------------------------------------
var data_set_069 = {
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
text_subheadline_1: "###",
text_subheadline_2: "###",
text_source_1: "Source: ###",
text_source_2: "###",
// ----------------------------------------------------------
color_bg: "#f9f4ef",
color_basic: "#a399e7",
color_layout_stroke: "#f2e8df",
// ----------------------------------------------------------
// plot
index: 1,
plot_width: 394,
plot_height: 350,
color_area_layout_axis: "#a5a7af",
color_line_1: "#ff8e4b",
color_line_2: "#5b4cc4",
color_circle_1: "#ffc19c",
color_circle_2: "#ff8e4b",
color_circle_3: "#da5404",
color_circle_4: "#a399e7",
color_circle_5: "#261697",
// legend
legend_1: [
{"label": "Age group", "position": 0},
{"label": "50+", "position": 45},
{"label": "30-49", "position": 79},
{"label": "18-29", "position": 95},
],
legend_2: [
{"label": "Education", "position": 0},
{"label": "less", "position": 54},
{"label": "more", "position": 93},
],
// text
color_text_headline: "#2e2f33",
color_text_source: "#e4cfbb"
};




// ----------------------------------------------------------
// STRUCTURE ------------------------------------------------
// ----------------------------------------------------------
// create container for svg content
var container_069 = d3.select("#canvas_069").append("svg")
.attr("width", data_set_069.container_width)
.attr("height", data_set_069.container_height)
.attr("class", "canvas")
//.style("border", "1px solid black")
.style("background-color", data_set_069.color_bg);
// set up margin
var margin_069 = data_set_069.margin;
var width_069 = data_set_069.container_width - 2 * margin_069;
var height_069 = data_set_069.container_height - 2 * margin_069;
// ----------------------------------------------------------
// create group for layout
var layout_group_069 = container_069.append("g")
.attr("class", "layout_group");
// ----------------------------------------------------------
// create container for scaling
var container_margin_069 = container_069.append("g")
.attr("class", "canvas_margin")
.attr("transform", `translate(${margin_069}, ${margin_069})`);
// ----------------------------------------------------------
// create group for gfx - translate the group for margin top, left
var gfx_group_069 = container_margin_069.append("g");
// create sub-groups for layers
var gfx_layer_0_069 = gfx_group_069.append("g")
.attr("class", "gfx_layer_0")
//.attr("transform", "translate(80,80)")
;
// ----------------------------------------------------------
// create group for text
var text_group_069 = container_margin_069.append("g");




// ----------------------------------------------------------
// LAYOUT ---------------------------------------------------
// ----------------------------------------------------------
// set layout strokes
layout_group_069.append("rect")
.attr("class", "gfx_bar_stroke")
.attr("x", 20)
.attr("y", data_set_069.position_headline + 35)
.attr("height", 2)
.attr("width", 500)
.style("fill", data_set_069.color_layout_stroke);
//
layout_group_069.append("rect")
.attr("class", "gfx_bar_stroke")
.attr("x", 20)
.attr("y", data_set_069.position_source + 30)
.attr("height", 2)
.attr("width", 500)
.style("fill", data_set_069.color_layout_stroke);




// ----------------------------------------------------------
// GFX ------------------------------------------------------
// ----------------------------------------------------------



var element = d3.select(".gfx_layer_0");


d3.xml("static/viz/069/cookie.svg", function(error, documentFragment) {

if (error) {console.log(error); return;}
var svgNode = documentFragment.getElementsByTagName("svg")[0];
element.node().appendChild(svgNode);

});












// ----------------------------------------------------------
// ANIMATION ------------------------------------------------
// ----------------------------------------------------------
//radio button on website
d3.selectAll("input[name='button_B_069']")
.on("change", change_069);

//button function
function change_069() {

// button switch
//transform to state 2
if (data_set_069.index == 1) {
data_set_069.index = 2;


d3.selectAll(".gfx_layer_0")
.transition().duration(400)
.attr("transform", "translate(80,80)")


//transform to state 1
} else {
data_set_069.index = 1;


d3.selectAll(".gfx_layer_0")
.transition().duration(400)
.attr("transform", "translate(0,0)")

// close button switch
};
// close button function
};












// ----------------------------------------------------------
// TEXT -----------------------------------------------------
// ----------------------------------------------------------
// create text "headline"
var text_headline_069 = text_group_069.append("text")
.attr("class", "text_headline")
.attr("y", data_set_069.position_headline)
.text(data_set_069.text_headline)
.style("fill", data_set_069.color_text_headline);
// create text "subheadline"
var text_subheadline_1_069 = text_group_069.append("text")
.attr("class", "text_subheadline_1")
.attr("x", 500)
.attr("y", data_set_069.position_headline - 14)
.attr("text-anchor", "end")
.text(data_set_069.text_subheadline_1)
.style("fill", data_set_069.color_text_headline);
var text_subheadline_2_069 = text_group_069.append("text")
.attr("class", "text_subheadline_2")
.attr("x", 500)
.attr("y", data_set_069.position_headline + 4)
.attr("text-anchor", "end")
.text(data_set_069.text_subheadline_2)
.style("fill", data_set_069.color_text_headline);
// create text "source"
var text_source_1_069 = text_group_069.append("text")
.attr("class", "text_source")
.attr("x", 500)
.attr("y", data_set_069.position_source - 14)
.attr("text-anchor", "end")
.text(data_set_069.text_source_1)
.style("fill", data_set_069.color_text_source);
var text_source_2_069 = text_group_069.append("text")
.attr("class", "text_source")
.attr("x", 500)
.attr("y", data_set_069.position_source)
.attr("text-anchor", "end")
.text(data_set_069.text_source_2)
.style("fill", data_set_069.color_text_source);



//
