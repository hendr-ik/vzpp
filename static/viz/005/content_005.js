
// DATA -----------------------------------------------------
// ----------------------------------------------------------
var data_input = [{radius: 2000, color: "#777", name: "A"},
                  {radius: 1200, color: "#bbb", name: "B"},
                  {radius: 500, color: "#ccc", name: "C"}];

// strip values from data
var data_strip = data_input.map(function (temp) {
return temp.radius;
});

// find maximum value
var data_max = d3.max(data_strip);

// setup scale function
var Rscale = d3.scaleLinear()
.domain([ 0, data_max ])
.range([0, 200]);

// transfer every given data point to new scale
var data_process = [];
for (var i = 0; i < data_strip.length; i++) {
data_process[i] = Rscale(data_strip[i]);
}



// STRUCTURE ------------------------------------------------
// ----------------------------------------------------------
// create container for svg content
var container = d3.select("#canvas").append("svg")
.attr("width", 540)
.attr("height", 540)
//.style("border", "2px solid #66FF00");

// create group for layout - translate the group for margin top, left
var layout_group = container.append("g")
.attr("class", "layout_group");


// create group for gfx - translate the group for margin top, left
var gfx_group = container.append("g")
.attr("class", "gfx_group")
//.attr("transform", "translate(10,10)")
;

// create group for text - translate the group for margin top, left
var text_group = container.append("g")
.attr("class", "text_group");




// LAYOUT ---------------------------------------------------
// ----------------------------------------------------------
 var layout_head = layout_group.append("rect")
.attr("class", "layout_head")
.attr("x", 0)
.attr("y", 0)
.attr("width", 540)
.attr("height", 100)
.style("fill", "#ccc");




// GFX ------------------------------------------------------
// ----------------------------------------------------------
// link processed data create gfx circles
var gfx_circle = gfx_group.selectAll(".gfx_circle")
.data(data_process)
//.data(data_final)
.enter()
.append("circle");
// set gfx circles attributes by binding data to it
var gfx_circle = gfx_circle
.attr("class", "gfx_circle")
.attr("cx", 270)
.attr("cy", 270)
.attr("r", function (d) { return d; });


// link input data to color gfx circles
var gfx_circle = gfx_group.selectAll(".gfx_circle")
.data(data_input)
.style("fill", function (d) { return d.color; });




// TEXT -----------------------------------------------------
// ----------------------------------------------------------
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


// ----------------------------------------------------------
// link process data to create text labels
var text_label = text_group.selectAll(".text_label")
.data(data_process)
.enter()
.append("text");
// set text labels attributes by binding data to it
var text_label = text_label
.attr("class", "text_label")
.attr("x", function (d) { return 220 + d; })
.attr("y", 270);

// link input data to name text labels
var text_label = text_group.selectAll(".text_label")
.data(data_input)
// print properties of circles in text elements
.text( function (d) { return d.name; });


// ----------------------------------------------------------
// create text source
var text_source = text_group.append("text")
.attr("class", "text_source")
.attr("x", 20)
.attr("y", 520)
.text("Source: Temp Source");
