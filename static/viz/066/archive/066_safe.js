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
centroid_extend: 2.65,
// ----------------------------------------------------------
position_headline: 25,
position_source: 500,
position_menu: 480,
// ----------------------------------------------------------
text_headline_1: "Monthly Active Users 2018",
text_headline_2: "Monthly Active Users 2013",
text_headline_switch: 0,
text_subheadline: "In millions",
text_source: "Source: Statista 2018, Company press releases 2013",
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

// data for pies
var data_input_066 = [{
  "setA_066": 1500,
  "setB_066": 300,
  "display": "WhatsApp"
}, {
  "setA_066": 1300,
  "setB_066": 45,
  "display_extra": "Facebook",
  "display": "Messenger"
}, {
  "setA_066": 1058,
  "setB_066": 236,
  "display": "WeChat"
}, {
  "setA_066": 708,
  "setB_066": 808,
  "display": "QQ Mobile"
}, {
  "setA_066": 300,
  "setB_066": 250,
  "display": "Skype"
}, {
  "setA_066": 260,
  "setB_066": 66,
  "display": "Viber"
}];





// ----------------------------------------------------------
// STRUCTURE ------------------------------------------------
// ----------------------------------------------------------

// create container for svg content
var container_066 = d3.select("#canvas_066").append("svg")
.attr("width", data_set_066.container_width)
.attr("height", data_set_066.container_height)
.attr("class", "canvas")
// .style("border", "1px solid black")
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
// reposition pie display and value
.attr("transform", "translate(-30,23)")
.attr("class", "gfx_layer_1");
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
// SCALES & SETUP -------------------------------------------
// ----------------------------------------------------------

// define colors of pie pieces
var color_066 = d3.scaleOrdinal().range ([
data_set_066.color_pie_1,
data_set_066.color_pie_2,
data_set_066.color_pie_3,
data_set_066.color_pie_2,
data_set_066.color_pie_1,
data_set_066.color_pie_2
]);

var pie_generator_066 = d3.pie()
.value(function(d) {return d.setA_066;})
.sort(null);



var arc_generator_066 = d3.arc()
.innerRadius(3)
.padAngle(0.5)
.padRadius(4)
.cornerRadius(4)
.outerRadius(150);

var format_066 = d3.format(",.0f")




// ----------------------------------------------------------
// GFX ------------------------------------------------------
// ----------------------------------------------------------
// create gfx structure
var g0_066 = gfx_layer_0_066.datum(data_input_066).selectAll(".wedge")
.data(pie_generator_066)
.enter()
.append("g")
.attr("class", "wedge");

var g1_066 = gfx_layer_1_066.datum(data_input_066).selectAll(".pie_value")
.data(pie_generator_066)
.enter()
.append("g")
.attr("class", "pie_value");

var g2_066 = gfx_layer_1_066.datum(data_input_066).selectAll(".pie_display")
.data(pie_generator_066)
.enter()
.append("g")
.attr("transform", "translate(0,-25)")
.attr("class", "pie_display");

var g3_066 = gfx_layer_1_066.datum(data_input_066).selectAll(".pie_display_extra")
.data(pie_generator_066)
.enter()
// filter and create display if value > 1299
.filter(function(d){ return d.data.setA_066 > 1299; }).append("g")
.attr("transform", "translate(0,-45)")
.attr("class", "pie_display_extra");


// LAYER 0 --------------------------------------------------
// Create wedge
g0_066.append("path")
.attr("d", arc_generator_066)
.style("fill", function(d) {
return color_066(d.data.setA_066);
})
.each(function(d) {
this._current = d;
});

// LAYER 1 --------------------------------------------------
// Create pie_value
g1_066.append("text")
// position text anchors
.attr("text-anchor", "start")
// reposition centroid
.attr("transform", function(d) {
var c_066 = arc_generator_066.centroid(d);
return "translate(" + c_066[0]*data_set_066.centroid_extend +"," + c_066[1]*data_set_066.centroid_extend + ")";
})
// return a formated number out of value
.text(function(d) { return format_066(d.data.setA_066); })
.style("fill", data_set_066.color_pie_value);

// Create pie_display
g2_066.append("text")
// reposition text anchors
.attr("text-anchor", "start")

// reposition centroid
.attr("transform", function(d) {
var c_066 = arc_generator_066.centroid(d);
return "translate(" + c_066[0]*data_set_066.centroid_extend +"," + c_066[1]*data_set_066.centroid_extend + ")";
})
.text(function(d) {return d.data.display;})
.style("fill", data_set_066.color_pie_display);

// Create pie_display extra
g3_066.append("text")
// reposition text anchors
.attr("text-anchor", "start")
// reposition centroid
.attr("transform", function(d) {
var c_066 = arc_generator_066.centroid(d);
return "translate(" + c_066[0]*data_set_066.centroid_extend +"," + c_066[1]*data_set_066.centroid_extend + ")";
})
.text(function(d) {return d.data.display_extra;})
.style("fill", data_set_066.color_pie_display);

// highlight stuff
g1_066.selectAll("text").filter(function(d){ return d.data.display == "WeChat"; })
.style("fill", data_set_066.color_pie_selected);
g2_066.selectAll("text").filter(function(d){ return d.data.display == "WeChat"; })
.style("fill", data_set_066.color_pie_selected);




var dataset = "temp";


// ----------------------------------------------------------
// ANIMATION ------------------------------------------------
// ----------------------------------------------------------
// On radio button click
d3.selectAll("input")
.on("change", change
);

function change() {

// change headline
if (data_set_066.text_headline_switch == 0) {
d3.select(".text_headline").text(data_set_066.text_headline_2);
data_set_066.text_headline_switch = 1;
}
else {
d3.select(".text_headline").text(data_set_066.text_headline_1);
data_set_066.text_headline_switch = 0;
}

// change the value function
var value_066 = this.value;
pie_generator_066.value(function(d) {
return d[value_066];
});

// compute the new angles
g0_066 = g0_066.data(pie_generator_066);
g1_066 = g1_066.data(pie_generator_066);
g2_066 = g2_066.data(pie_generator_066);
g3_066 = g3_066.data(pie_generator_066);

dataset = "memp";

// redraw wedges
g0_066.select("path")
.transition().duration(750)
.attrTween("d", arcTween);

// redraw pie_value
g1_066.select("text")
.style("opacity", 0)
.transition().delay(600).duration(0)
// reposition centroid
.attr("transform", function(d) {
var c_066 = arc_generator_066.centroid(d);
return "translate(" + c_066[0]*data_set_066.centroid_extend +"," + c_066[1]*data_set_066.centroid_extend + ")";
})
// update text value in formatted number
.text(function(d) { return format_066(d.data[value_066]); })
.transition()
.duration(200)
.style("opacity", 1)
;


// redraw pie_display
g2_066.select("text")
.transition().duration(750)
// reposition centroid
.attr("transform", function(d) {
var c_066 = arc_generator_066.centroid(d);
return "translate(" + c_066[0]*data_set_066.centroid_extend +"," + c_066[1]*data_set_066.centroid_extend + ")";
})

// redraw pie_display extra
g3_066.select("text")
.transition().duration(750)
// reposition centroid
.attr("transform", function(d) {
var c_066 = arc_generator_066.centroid(d);
return "translate(" + c_066[0]*data_set_066.centroid_extend +"," + c_066[1]*data_set_066.centroid_extend + ")";
})
}

// set order of switch
function type(d) {
d.setA_066 = +d.setA_066;
d.setB_066 = +d.setB_066;
return d;
}

// Store and interpolate angles
function arcTween(a) {
var i_066 = d3.interpolate(this._current, a);
this._current = i_066(0);
return function(t) {
return arc_generator_066(i_066(t));
};
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
// create text "subheadline"
var text_subheadline_066 = text_group_066.append("text")
.attr("class", "text_subheadline")
.attr("x", 500)
.attr("y", data_set_066.position_headline)
.attr("text-anchor", "end")
.text(data_set_066.text_subheadline)
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
