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
position_headline: 25,
position_source: 500,
// ----------------------------------------------------------
text_headline: "Number of Emoji",
text_subheadline: "Single icons only",
text_source: "Source: The Unicode Consortium, 2019",
// ----------------------------------------------------------
color_bg: "#f9f4ef",
color_basic: "#a399e7",
color_layout_stroke: "#f2e8df",
// area
area_width: 460,
area_height: 360,
color_area_layout_axis: "#a5a7af",
color_area_area_1: ["#7a6ed5","#8a7ed8","#a197dd"],
color_area_area_2: ["#261697","#5b4cc4","#a399e7","#da5404","#ff8e4b","#ffc19c","#ddad00","#f9ce35","#ffe68a"],
// sticker
stickerX_1_067: 400,
stickerY_1_067: 20,
sticker_color_1: "#fff",
sticker_bg_color_1: "#dfc6b0",
sticker_display_1: "1,703",
// legend
legend_displays: ["Flags", "Symbols", "Objects", "Activities", "Travel & Places", "Food & Drink", "Animals & Nature", "People & Body", "Smileys & Emotion", "Categories"],
// text
color_text_headline: "#2e2f33",
color_text_source: "#e4cfbb"
};




// ----------------------------------------------------------
// STRUCTURE ------------------------------------------------
// ----------------------------------------------------------
// create container for svg content
var container_067 = d3.select("#canvas_068").append("svg")
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
var gfx_group_067 = container_margin_067.append("g");
// create sub-groups for layers
var gfx_layer_0_067 = gfx_group_067.append("g")
.attr("class", "gfx_layer_0");

// ----------------------------------------------------------
// create group for text
var text_group_067 = container_margin_067.append("g");




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






var myData = ['A', 'B' ];

function doEnter() {

d3.select('.gfx_layer_0')
.selectAll('div')
.data(myData)
.enter()
.append('rect')
.attr("width", 100)
.attr("height", 100)
.style("fill", "#fff")
.style("border", "1px solid black");

}







































// ----------------------------------------------------------
// TEXT -----------------------------------------------------
// ----------------------------------------------------------
// create text "headline"
var text_headline_067 = text_group_067.append("text")
.attr("class", "text_headline")
.attr("y", data_set_067.position_headline)
.text(data_set_067.text_headline)
.style("fill", data_set_067.color_text_headline);
// create text "subheadline"
var text_subheadline_067 = text_group_067.append("text")
.attr("class", "text_subheadline")
.attr("x", 500)
.attr("y", data_set_067.position_headline)
.attr("text-anchor", "end")
.text(data_set_067.text_subheadline)
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
