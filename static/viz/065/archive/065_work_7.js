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
radius: 200,
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
color_layout_axis: "#a5a7af",
color_layout_stroke: "#f2e8df", // layout lines
// graphs
color_graph_a: "#ff8e4b",
color_graph_b: "#b9f8e8",
color_graph_b_on: "#19ab86",
color_graph_label_a: "#ff8e4b",
color_graph_label_b: "#5ad0b2",
color_graph_label_b_on: "#038e6b",
// texts
color_text_headline: "#2e2f33",
color_text_source: "#e4cfbb"
};

var data_input_main_065 = {
text_label_1: "WhatsApp",
text_label_2: "Facebook Messenger",
text_label_3: "WeChat",
text_label_4: "QQ Mobile",
text_label_5: "Skype"
}

// data for pies
var data_input_065 = [{
  "setA": 1500,
  "setB": 300,
  "label": "WhatsApp"
}, {
  "setA": 1300,
  "setB": 0,
  "label": "WhatsApp"
}, {
  "setA": 1058,
  "setB": 236,
  "label": "WhatsApp"
}, {
  "setA": 708,
  "setB": 808,
  "label": "WhatsApp"
}, {
  "setA": 300,
  "setB": 250,
  "label": "WhatsApp"
}];




// ----------------------------------------------------------
// STRUCTURE ------------------------------------------------
// ----------------------------------------------------------

// create spacer left
var spacer_left_065 = d3.select("#canvas_065").append("svg")
.attr("height", 540)
.attr("width", 50)
.attr("class", "spacer_left");
spacer_left_065.append("rect")
.attr("height", 540)
.attr("width", 50)
.style("fill", data_set_065.color_bg);
// ----------------------------------------------------------
// create container for svg content
var container_065 = d3.select("#canvas_065").append("svg")
.attr("width", data_set_065.container_width)
.attr("height", data_set_065.container_height)
.attr("class", "container")
.style("border", "1px solid black")
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
.attr("class", "gfx_group");
// create sub-groups for layers
var gfx_layer_0_065 = gfx_group_065.append("g")
.attr("transform", "translate(" + data_set_065.center_x + "," + data_set_065.center_y + ")")
.attr("class", "gfx_layer_0");
// ----------------------------------------------------------
// create group for text
var text_group_065 = container_margin_065.append("g")
.attr("class", "text_group");
// ----------------------------------------------------------
// create spacer right
var spacer_right_065 = d3.select("#canvas_065").append("svg")
.attr("height", 540)
.attr("width", 50)
.attr("class", "spacer_right");
spacer_right_065.append("rect")
.attr("height", 540)
.attr("width", 50)
.style("fill", data_set_065.color_bg);




// ----------------------------------------------------------
// LAYOUT ---------------------------------------------------
// ----------------------------------------------------------
// set layout strokes below headline
layout_group_065.append("rect")
.attr("class", "gfx_bar_stroke")
.attr("x", 20)
.attr("y", data_set_065.position_headline + 30)
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
.outerRadius(200);





// ----------------------------------------------------------
// GFX ------------------------------------------------------
// ----------------------------------------------------------

// LAYER 0 --------------------------------------------------
// Add wedges and labels to layer
var g = gfx_layer_0_065.datum(data_input_065).selectAll(".arc")
.data(pie_generator)
.enter()
.append("g")
.attr("class", "arc");


// Create wedge
var path = g.append("path")
.attr("d", arc_generator)
.style("fill", function(d) {
return color(d.data.setA);
})
.each(function(d) {
this._current = d;
}); // store the initial angles


// Create text
var text = g.append("text")
.attr("transform", function(d) {
return "translate(" + arc_generator.centroid(d) + ")";
})
.attr("dy", ".35em")
.text(function(d) {return d.data.setA;});







// ----------------------------------------------------------
// ANIMATION ------------------------------------------------
// ----------------------------------------------------------

d3.selectAll("input")
.on("change", change);

function change() {
  var value = this.value;
  pie_generator.value(function(d) {
    return d[value];
  }); // change the value function
  g = g.data(pie_generator); // compute the new angles
  g.select("path")
    .transition()
    .duration(750)
    .attrTween("d", arcTween); // redraw the arcs
  g.select("text")
    // .style("opacity", 0)
    .attr("transform", function(d) {
      return "translate(" + arc_generator.centroid(d) + ")";
    })
    .text(function(d) {
      return d.data[value];
    })
    .transition()
    .duration(1000)
    // .style("opacity", 1);
}

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
