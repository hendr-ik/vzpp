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
map_width: 540,
map_height: 540,
bar_width: 475,
bar_height: 300,
// ----------------------------------------------------------
position_headline: 25,
position_source: 500,
position_menu: 480,
// ----------------------------------------------------------
text_headline_1: "Instagram Users",
text_subheadline_1: "Top 10, 2018",
text_subheadline_2: "MAU, In millions",
text_subheadline_3: "MAU, In millions",
text_source: "Source: Statista 2018, TechCrunch 2016",
// ----------------------------------------------------------
color_bg: "#f9f4ef",
color_basic: "#a399e7",
// map
color_map_01: "#f2e4d6",
color_map_02: "#e1ccb9",
color_map_circle_marker: "#ff8e4b",
color_map_display: "#2e2f33",
color_map_value: "#2e2f33",
// bars
color_bars_layout_axis: "#a5a7af",
color_bars_layout_stroke: "#f2e8df",
color_bars_layout_axis_marker: "#2e2f33",
color_bars_marker: "#5b4cc4",
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
.attr("transform", "translate(" + data_set_067.center_x + "," + data_set_067.center_y + ")")
.attr("class", "gfx_group");
// create sub-groups for layers
var gfx_layer_0_067 = gfx_group_067.append("g")
.attr("class", "gfx_layer_0");
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
.style("fill", data_set_067.color_bars_layout_stroke);
//
layout_group_067.append("rect")
.attr("class", "gfx_bar_stroke")
.attr("x", 20)
.attr("y", data_set_067.position_source + 30)
.attr("height", 2)
.attr("width", 500)
.style("fill", data_set_067.color_bars_layout_stroke);




// ----------------------------------------------------------
// GFX ------------------------------------------------------
// ----------------------------------------------------------

// LAYER 0 --------------------------------------------------








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
