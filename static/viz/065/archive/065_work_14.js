// ----------------------------------------------------------
// DATA -----------------------------------------------------
// ----------------------------------------------------------
var data_set_065 =
{
container_width: 540,
container_height: 540,
margin: 20,
center_x: 250,
center_y: 270,
radius: 180,
// ----------------------------------------------------------
position_headline: 25,
position_source: 500,
position_menu: 480,
// ----------------------------------------------------------
text_headline: "Headline",
text_subheadline: "Subheadline",
text_source: "Source:",
// ----------------------------------------------------------
color_bg: "#f9f4ef", // background
color_layout_stroke: "#f2e8df", // layout lines
color_pie_display: "#2e2f33",
color_pie_value: "#2e2f33",
// text
color_text_headline: "#2e2f33",
color_text_source: "#e4cfbb"
};

// data for pies
var data_input_065 = [{
  "setA": 1500,
  "setB": 300,
  "display": "WhatsApp"
}, {
  "setA": 1300,
  "setB": 45,
  "display_extra": "Facebook",
  "display": "Messenger"
}, {
  "setA": 1058,
  "setB": 236,
  "display": "WeChat"
}, {
  "setA": 708,
  "setB": 808,
  "display": "QQ Mobile"
}, {
  "setA": 300,
  "setB": 250,
  "display": "Skype"
}, {
  "setA": 260,
  "setB": 66,
  "display": "Viber"
}, {
  "setA": 203,
  "setB": 60,
  "display": "Line"
}];




// ----------------------------------------------------------
// STRUCTURE ------------------------------------------------
// ----------------------------------------------------------

// create container for svg content
var container_065 = d3.select("#canvas_065").append("svg")
.attr("width", data_set_065.container_width)
.attr("height", data_set_065.container_height)
.attr("class", "container")
// .style("border", "1px solid black")
.style("background-color", data_set_065.color_bg);
// set up margin
var margin_065 = data_set_065.margin;
var width_065 = data_set_065.container_width - 2 * margin_065;
var height_065 = data_set_065.container_height - 2 * margin_065;
// ----------------------------------------------------------
// create group for layout
var layout_group_065 = container_065.append("g")
.attr("class", "layout_group");
// ----------------------------------------------------------
// create container for scaling
var container_margin_065 = container_065.append("g")
.attr("class", "container_margin")
.attr("transform", `translate(${margin_065}, ${margin_065})`);
// ----------------------------------------------------------
// create group for gfx - translate the group for margin top, left
var gfx_group_065 = container_margin_065.append("g")
.attr("transform", "translate(" + data_set_065.center_x + "," + data_set_065.center_y + ")")
.attr("class", "gfx_group");
// create sub-groups for layers
var gfx_layer_0_065 = gfx_group_065.append("g")
.attr("class", "gfx_layer_0");
var gfx_layer_1_065 = gfx_group_065.append("g")
// reposition pie display and value
.attr("transform", "translate(0,20)")
.attr("class", "gfx_layer_1");
// ----------------------------------------------------------
// create group for text
var text_group_065 = container_margin_065.append("g")
.attr("class", "text_group");




// ----------------------------------------------------------
// LAYOUT ---------------------------------------------------
// ----------------------------------------------------------
// set layout strokes
layout_group_065.append("rect")
.attr("class", "gfx_bar_stroke")
.attr("x", 20)
.attr("y", data_set_065.position_headline + 30)
.attr("height", 2)
.attr("width", 500)
.style("fill", data_set_065.color_layout_stroke);

layout_group_065.append("rect")
.attr("class", "gfx_bar_stroke")
.attr("x", 20)
.attr("y", data_set_065.position_source + 30)
.attr("height", 2)
.attr("width", 500)
.style("fill", data_set_065.color_layout_stroke);




// ----------------------------------------------------------
// SCALES & SETUP -------------------------------------------
// ----------------------------------------------------------

// define colors of pie pieces
/*
var color = d3.scaleOrdinal()
.range(["#2C93E8","#838690","#F56C4E"]);
*/
var color = d3.scaleOrdinal(d3.schemeCategory20);

var pie_generator = d3.pie()
.value(function(d) {return d.setA;})
.sort(null);

var arc_generator = d3.arc()
.innerRadius(4)
.padAngle(0.5)
.padRadius(4)
.cornerRadius(4)
.outerRadius(150);

var format = d3.format(",.0f")


// ----------------------------------------------------------
// GFX ------------------------------------------------------
// ----------------------------------------------------------
// create gfx structure
var g0 = gfx_layer_0_065.datum(data_input_065).selectAll(".wedge")
.data(pie_generator)
.enter()
.append("g")
.attr("class", "wedge");

var g1 = gfx_layer_1_065.datum(data_input_065).selectAll(".pie_value")
.data(pie_generator)
.enter()
.append("g")
.attr("class", "pie_value");

var g2 = gfx_layer_1_065.datum(data_input_065).selectAll(".pie_display")
.data(pie_generator)
.enter()
.append("g")
.attr("transform", "translate(0,-22)")
.attr("class", "pie_display");

var g3 = gfx_layer_1_065.datum(data_input_065).selectAll(".pie_display_extra")
.data(pie_generator)
.enter()
// filter and create display if value > 1299
.filter(function(d){ return d.data.setA > 1299; }).append("g")
.attr("transform", "translate(0,-38)")
.attr("class", ".pie_display_extra");






// LAYER 0 --------------------------------------------------
// Create wedge
g0.append("path")
.attr("d", arc_generator)
.style("fill", function(d) {
return color(d.data.setA);
})
.each(function(d) {
this._current = d;
});

// Create pie_value
g1.append("text")
// reposition text anchors
.attr("text-anchor", function(d) {
return (d.endAngle + d.startAngle)/2 > Math.PI ?
"end" : "start" ;})
// reposition centroid
.attr("transform", function(d) {
var c1 = arc_generator.centroid(d),
x = c1[0],
y = c1[1],
// pythagorean theorem for hypotenuse
h = Math.sqrt(x*x + y*y);
return "translate(" + (x/h * data_set_065.radius) +  ',' +
(y/h * data_set_065.radius) +  ")";
})
// .text(function(d) {return d.data.setA;})
// return a formated number out of value
.text(function(d) { return format(d.data.setA); })
.style("fill", data_set_065.color_pie_value);

// Create pie_display
g2.append("text")
// reposition text anchors
.attr("text-anchor", function(d) {
return (d.endAngle + d.startAngle)/2 > Math.PI ?
"end" : "start" ;})
// reposition centroid
.attr("transform", function(d) {
var c2 = arc_generator.centroid(d),
x = c2[0],
y = c2[1],
// pythagorean theorem for hypotenuse
h = Math.sqrt(x*x + y*y);
return "translate(" + (x/h * data_set_065.radius) +  ',' +
(y/h * data_set_065.radius) +  ")";
})
.text(function(d) {return d.data.display;})
.style("fill", data_set_065.color_pie_display);

// Create pie_display extra
g3.append("text")
// reposition text anchors
.attr("text-anchor", function(d) {
return (d.endAngle + d.startAngle)/2 > Math.PI ?
"end" : "start" ;})
// reposition centroid
.attr("transform", function(d) {
var c3 = arc_generator.centroid(d),
x = c3[0],
y = c3[1],
// pythagorean theorem for hypotenuse
h = Math.sqrt(x*x + y*y);
return "translate(" + (x/h * data_set_065.radius) +  ',' +
(y/h * data_set_065.radius) +  ")";
})
.text(function(d) {return d.data.display_extra;})
.style("fill", data_set_065.color_pie_display);




// ----------------------------------------------------------
// ANIMATION ------------------------------------------------
// ----------------------------------------------------------
// On radio button click
d3.selectAll("input")
.on("change", change);
// change the value function
function change() {
var value = this.value;
pie_generator.value(function(d) {
return d[value];
});
// compute the new angles
g0 = g0.data(pie_generator);
g1 = g1.data(pie_generator);
g2 = g2.data(pie_generator);
g3 = g3.data(pie_generator);

// redraw wedges
g0.select("path")
.transition().duration(750)
.attrTween("d", arcTween);

// redraw pie_value
g1.select("text")
// .style("opacity", 0)
.transition().duration(750)
/*
// reposition text anchors
.attr("text-anchor", function(d) {
return (d.endAngle + d.startAngle)/2 > Math.PI ?
"end" : "start" ;})
*/
// reposition centroid
.attr("transform", function(d) {
var c1 = arc_generator.centroid(d),
x = c1[0],
y = c1[1],
// pythagorean theorem for hypotenuse
h = Math.sqrt(x*x + y*y);
return "translate(" + (x/h * data_set_065.radius) +  ',' +
(y/h * data_set_065.radius) +  ")";
})
// update text value in formatted number
.text(function(d) { return format(d.data[value]); })
.transition()
.duration(200)
// .style("opacity", 1);

// redraw pie_display
g2.select("text")
.transition().duration(750)
// reposition text anchors
/*
.attr("text-anchor", function(d) {
return (d.endAngle + d.startAngle)/2 > Math.PI ?
"end" : "start" ;})
*/
// reposition centroid
.attr("transform", function(d) {
var c2 = arc_generator.centroid(d),
x = c2[0],
y = c2[1],
// pythagorean theorem for hypotenuse
h = Math.sqrt(x*x + y*y);
return "translate(" + (x/h * data_set_065.radius) +  ',' +
(y/h * data_set_065.radius) +  ")";
})

// redraw pie_display extra
g3.select("text")
.transition().duration(750)
/*
// reposition text anchors
.attr("text-anchor", function(d) {
return (d.endAngle + d.startAngle)/2 > Math.PI ?
"end" : "start" ;})
*/
// reposition centroid
.attr("transform", function(d) {
var c3 = arc_generator.centroid(d),
x = c3[0],
y = c3[1],
// pythagorean theorem for hypotenuse
h = Math.sqrt(x*x + y*y);
return "translate(" + (x/h * data_set_065.radius) +  ',' +
(y/h * data_set_065.radius) +  ")";
})

}


// set order of switch ?
function type(d) {
d.setA = +d.setA;
d.setB = +d.setB;
return d;
}



// Store the displayed angles in _current.
// Then, interpolate from _current to the new angles.
// During the transition, _current is updated in-place by d3.interpolate.
function arcTween(a) {
var i = d3.interpolate(this._current, a);
this._current = i(0);
return function(t) {
return arc_generator(i(t));
};
}




// ----------------------------------------------------------
// TEXT -----------------------------------------------------
// ----------------------------------------------------------
// create text "headline"
var text_headline_065 = text_group_065.append("text")
.attr("class", "text_headline")
.attr("y", data_set_065.position_headline)
.text(data_set_065.text_headline)
.style("fill", data_set_065.color_text_headline);
// create text "subheadline"
var text_subheadline_065 = text_group_065.append("text")
.attr("class", "text_subheadline")
.attr("x", 500)
.attr("y", data_set_065.position_headline)
.attr("text-anchor", "end")
.text(data_set_065.text_subheadline)
.style("fill", data_set_065.color_text_headline);
// create text "source"
var text_source_065 = text_group_065.append("text")
.attr("class", "text_source")
.attr("x", 500)
.attr("y", data_set_065.position_source)
.attr("text-anchor", "end")
.text(data_set_065.text_source)
.style("fill", data_set_065.color_text_source);




//
