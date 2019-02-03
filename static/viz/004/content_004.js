
// DATA ------------------------------------------------------
var data_input = [{"radius": 200, "temp": 140},
                  {"radius": 120, "temp": 65},
                  {"radius": 50, "temp": 5}];



// STRUCTURE ------------------------------------------------------
// create container for svg content
var container = d3.select("#canvas").append("svg")
.attr("width", 540)
.attr("height", 540)
//.style("border", "2px solid #66FF00");

// create group for gfx - translate the group for margin top, left
var gfx_group = container.append("g")
.attr("class", "gfx_group")
//.attr("transform", "translate(10,10)")
;

// create group for layout - translate the group for margin top, left
var layout_group = container.append("g")
.attr("class", "layout_group");

// create group for text - translate the group for margin top, left
var text_group = container.append("g")
.attr("class", "text_group");



// GFX --------------------------------------------------
// create gfx circles and link data
var gfx_circle = gfx_group.selectAll(".gfx_circle")
.data(data_input)
.enter()
.append("circle");
// set gfx circles attributes by binding data to it
var gfx_circle = gfx_circle
.attr("class", "gfx_circle")
.attr("cx", 270)
.attr("cy", 270)
.attr("r", function (d) { return d.radius; })
// color gfx from data
.style("fill", function(d) {
var return_color;
if (d.radius === 200) { return_color = "green";
  } else if (d.radius === 120) { return_color = "purple";
  } else if (d.radius === 50) { return_color = "red"; }
  return return_color;
});

// LAYOUT --------------------------------------------------
 var layout_head = layout_group.append("rect")
.attr("class", "layout_head")
.attr("x", 0)
.attr("y", 0)
.attr("width", 540)
.attr("height", 100)
.style("fill", "#ccc");


// TEXT -------------------------------------------------
// create text headline
var text_headline = text_group.append("text")
.attr("class", "text_headline")
.attr("x", 20)
.attr("y", 40)
.text("This is a Headline");

// create text sub headline
var text_headline_sub = text_group.append("text")
.attr("class", "text_headline_sub")
.attr("x", 20)
.attr("y", 80)
.text("This is a Sub Headline");

// create text labels and link data
var text_label = text_group.selectAll(".text_label")
.data(data_input)
.enter()
.append("text");
// set text labels attributes by binding data to it
var text_label = text_label
.attr("class", "text_label")
.attr("x", function (d) { return 270 + d.temp; })
.attr("y", 270)
// print properties of circles in text elements
.text( function (d) { return d.radius; });

// create text source
var text_source = text_group.append("text")
.attr("class", "text_source")
.attr("x", 20)
.attr("y", 520)
.text("Source: Temp Source");
