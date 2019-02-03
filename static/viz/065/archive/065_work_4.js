


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
var n = 8; // Amount of data points
    data_input_1 = [300, 0, 236, 808, 250, 66, 60, 30];
    data_input_2 = [1500, 1300, 1058, 708, 300, 260, 203, 200];
    data_input = [data_input_1, data_input_2];





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
.attr("class", "gfx_layer_0");
var gfx_layer_1_065 = gfx_group_065.append("g")
.attr("class", "gfx_layer_1");
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

// define arc with inner radius, padding, corner
var arc = d3.arc()
.innerRadius(4)
.padAngle(0.5)
.padRadius(4)
.cornerRadius(4);

// define pie
var pie = d3.pie()
.sort(null);


var label = d3.arc()
    .outerRadius(radius - 40)
    .innerRadius(radius - 40);







// ----------------------------------------------------------
// GFX ------------------------------------------------------
// ----------------------------------------------------------

// LAYER 0 - pie --------------------------------------------
gfx_layer_0_065.selectAll(".arc")
.data(arcs(data_input_1, data_input_2))
.enter().append("g")
.attr("class", "arc")
.attr("transform", "translate(" + data_set_065.center_x + "," + data_set_065.center_y + ")")
.append("path")
.attr("fill", function(d, i) { return color(i); })
.attr("d", arc);



 var text = arc.append("text")
      .attr("transform", function(d) { return "translate(" + label.centroid(d) + ")"; })
      .attr("dy", "0.35em")
      .text("hello");









transition(0, 1)

function arcs(data_input_1, data_input_2) {

  var arcs0 = pie(data_input_1),
      arcs1 = pie(data_input_2),
      i = -1,
      arc,
      outerRad0 = data_set_065.radius;
  		outerRad1 = data_set_065.radius;

/*  console.log("hi", outerRad0, outerRad1) */

  while (++i < n) {
    arc = arcs0[i];
    arc.outerRadius = outerRad0;
    arc.startAngle = arc.startAngle + 0;
    arc.endAngle = arc.endAngle + 0;
    arc.next = arcs1[i];
    arc.next.outerRadius = outerRad1;
  }
  return arcs0;
}

function transition(from, to) {
  var path = d3.selectAll(".arc > path")
      .data(arcs(data_input[from], data_input[to]));


  // Wedges then update their values, changing size.
  var t2 = path.transition()
  			.duration(1000)
        .attrTween("d", tweenArc(function(d, i) {
          //console.log(i, d, d.next)
          return {
            startAngle: d.next.startAngle,
            endAngle: d.next.endAngle,
          	outerRadius: d.next.outerRadius
          };
        }));

  var dir = to - from;

/*  console.log(from, to, dir, data.length); */
  dir = ((to + dir) == data_input.length) ? -dir : dir;
  dir = ((to + dir) == -1) ? -dir : dir;

  setTimeout(function() { transition(to, to + dir); }, 2500);
}

function tweenArc(b) {
  return function(a, i) {
    var d = b.call(this, a, i), i = d3.interpolate(a, d);
    for (var k in d) a[k] = d[k]; // update data
    return function(t) { return arc(i(t)); };
  };
}










// LAYER 1 - labels -----------------------------------------








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
