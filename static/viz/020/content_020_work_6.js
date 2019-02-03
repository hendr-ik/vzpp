// ----------------------------------------------------------
// DATA -----------------------------------------------------
// ----------------------------------------------------------
var data_set =
{
container_width: 540,
container_height: 540,
margin: 20,
limit_top: 75,
limit_bottom: 50,
padding_left: 6,
padding_right: 115,
// ----------------------------------------------------------
domain_max_1: 15.6,
domain_max_2: 20.3,
domain_max_3: 2968,
// ----------------------------------------------------------
position_headline: 25,
position_source: 500,
position_menu: 480,
// ----------------------------------------------------------
text_headline: "Monthly app downloads",
text_subheadline: "2018 / United States",
text_source: "Source: SensorTower / TechCrunch, November 18, 2018",
// ----------------------------------------------------------
color_bg: "#f9f4ef", // background

color_layout_axis: "#a5a7af", // ???????????????????????????
color_layout_stroke: "#f2e8df", // layout lines

color_graph_A: "#ff8e4b",
color_graph_B: "#b9f8e8",
color_graph_B_on: "#19ab86",

color_graph_label_A: "#ff8e4b",
color_graph_label_B: "#5ad0b2",
color_graph_label_B_on: "#038e6b",

color_button_stroke: "#19ab86",
color_button_on: "#19ab86",
color_button_off: "#5ad0b2",
color_button_text_on: "#2e2f33",
color_button_text_off: "#fff",

color_text_headline: "#2e2f33",
color_text_source: "#e4cfbb"
};


var data_input_main = {
n: 10, // Amount of data points
text_label_1: "Snapchat",
text_label_2: "YouTube",
text_label_3: "Instagram",
text_label_4: "Facebook",
text_label_5: "TikTok"
}




// data for graphs
var data_input_1 = [
3200000, 3150000, 2720000, 2450000, 2850000, 2800000, 2850000, 2650000, 2800000, 2350000
];

var data_input_2 = [
2550000, 2350000, 2800000, 2200000, 2300000, 2350000, 2400000, 2500000, 2350000, 2400000
];

var data_input_3 = [
3700000, 2600000, 2900000, 2800000, 3450000, 3900000, 3550000, 2850000, 2800000, 2900000
];

var data_input_4 = [
3650000, 2950000, 3300000, 3250000, 3700000, 3700000, 3700000, 3550000, 3600000, 3250000
];

var data_input_5 = [
1600000, 1350000, 1800000, 1750000, 2050000, 2200000, 2900000, 2850000, 2950000, 3800000
];







// ----------------------------------------------------------
// STRUCTURE ------------------------------------------------
// ----------------------------------------------------------

// create spacer left
var spacer_left = d3.select("#canvas").append("svg")
.attr("height", 540)
.attr("width", 50)
.attr("class", "spacer_left");
spacer_left.append("rect")
.attr("height", 540)
.attr("width", 50)
.style("fill", data_set.color_bg);
// ----------------------------------------------------------
// create container for svg content
var container = d3.select("#canvas").append("svg")
.attr("width", data_set.container_width)
.attr("height", data_set.container_height)
.attr("class", "container")
.style("border", "1px solid #ccc")
.style("background-color", data_set.color_bg);
// set up margin
var margin = data_set.margin;
var width = data_set.container_width - 2 * margin;
var height = data_set.container_height - 2 * margin;
// ----------------------------------------------------------
// create group for layout
var layout_group = container.append("g")
.attr("class", "layout_group");
// ----------------------------------------------------------
// create container for scaling
var container_margin = container.append("g")
.attr("class", "container_margin")
.attr("transform", `translate(${margin}, ${margin})`);
// ----------------------------------------------------------
// create group for menu
var menu_group = container_margin.append("g")
.attr("class", "menu_group");
// ----------------------------------------------------------
// create group for gfx - translate the group for margin top, left
var gfx_group = container_margin.append("g")
.attr("class", "gfx_group")
// padding > translate to fix x axis overlap
.attr("transform", "translate(" + data_set.padding_left + ",0)");
// create sub-groups for layers
var gfx_layer_0 = gfx_group.append("g")
.attr("class", "gfx_layer_0");
var gfx_layer_1 = gfx_group.append("g")
.attr("class", "gfx_layer_1").attr("id", "gfx_layer_select_1");
var gfx_layer_2 = gfx_group.append("g")
.attr("class", "gfx_layer_2").attr("id", "gfx_layer_select_2");
var gfx_layer_3 = gfx_group.append("g")
.attr("class", "gfx_layer_3").attr("id", "gfx_layer_select_3");
var gfx_layer_4 = gfx_group.append("g")
.attr("class", "gfx_layer_4").attr("id", "gfx_layer_select_4");
var gfx_layer_5 = gfx_group.append("g")
.attr("class", "gfx_layer_5");
// ----------------------------------------------------------
// create group for text
var text_group = container_margin.append("g")
.attr("class", "text_group");
// ----------------------------------------------------------
// create spacer right
var spacer_right = d3.select("#canvas").append("svg")
.attr("height", 540)
.attr("width", 50)
.attr("class", "spacer_right");
spacer_right.append("rect")
.attr("height", 540)
.attr("width", 50)
.style("fill", data_set.color_bg);




// ----------------------------------------------------------
// LAYOUT ---------------------------------------------------
// ----------------------------------------------------------
// set layout strokes below headline
layout_group.append("rect")
.attr("class", "gfx_bar_stroke")
.attr("x", 20)
.attr("y", data_set.position_headline + 30)
.attr("height", 2)
.attr("width", 500)
.style("fill", data_set.color_layout_stroke);




// ----------------------------------------------------------
// SCALES ---------------------------------------------------
// ----------------------------------------------------------
// X
// for lines
var xScale = d3.scaleLinear()
.domain([0, data_input_main.n - 1]) // input
.range([0, width - data_set.padding_right]); // output
// for x axis
var xScale_date = d3.scaleTime()
  .domain([new Date(2017, 12), new Date(2018, 9)])
  .range([0, width - data_set.padding_right]);

// Y
var yScale = d3.scaleLinear()
.domain([0, 4000000]) // input
.range([height - data_set.limit_bottom, data_set.limit_top])




// ----------------------------------------------------------
// GFX ------------------------------------------------------
// ----------------------------------------------------------

// LAYER 0 --------------------------------------------------
// AXIS -----------------------------------------------------
// X
// create custom axis number format
var xAxis = d3.axisBottom(xScale_date)
.ticks(d3.timeMonth, 1)
.tickFormat(d3.timeFormat('%b'));
// append custom axis
gfx_layer_0.append("g")
.attr("class", "x axis")
.attr("transform", "translate(0," + ( height - data_set.limit_bottom ) + ")")
.call(customXAxis);
// change axis design
function customXAxis(g) {
g.call(xAxis);
g.select(".domain").remove();
g.selectAll(".tick line").attr("stroke", data_set.color_layout_axis)
g.selectAll(".tick text").style("fill", data_set.color_layout_axis);
}

// Y
// create custom axis number format
var formatNumber = d3.format(".1f");
var yAxis = d3.axisRight(yScale)
.ticks(5)
.tickSize(width - data_set.padding_right)
.tickFormat(function(d) {
var s = formatNumber(d / 1e6);
return this.parentNode.nextSibling
? s
: s + " M";
});
// append custom axis
gfx_layer_0.append("g")
.attr("class", "y axis")
.call(customYAxis);
// change axis design
function customYAxis(g) {
g.call(yAxis);
g.select(".domain").remove();
g.selectAll(".tick:not(:first-of-type) line").attr("stroke", data_set.color_layout_axis).attr("stroke-dasharray", "2,2");
g.selectAll(".tick:first-of-type line").attr("stroke", data_set.color_layout_axis);
g.selectAll(".tick text").attr("text-anchor", "start").attr("x", 15).attr("dy", -10).style("fill", data_set.color_layout_axis);
}


// LAYER 1 --------------------------------------------------
// GRAPH 1 --------------------------------------------------
// d3's line generator
var line_1 = d3.line()
.x(function(d, i) { return xScale(i); }) // set the x values for the line generator
.y(function(d) { return yScale(d); }) // set the y values for the line generator

// Append the path, bind the data, and call the line generator
gfx_layer_1.append("path")
.datum(data_input_1) // Binds data to the line
.attr("class", "line")
.attr("d", line_1) // Calls the line generator
.style("fill", "none").style("stroke", data_set.color_graph_B).style("stroke-width", 3);
// Duplicate fpr bigger active area
gfx_layer_1.append("path")
.datum(data_input_1) // Binds data to the line
.attr("class", "line_active")
.attr("d", line_1) // Calls the line generator
.style("fill", "none").style("stroke", "transparent").style("stroke-width", 20);

// Append a circle for each datapoint
gfx_layer_1.selectAll(".dot")
.data(data_input_1)
.enter().append("circle") // Uses the enter().append() method
.attr("class", "dot") // Assign a class for styling
.attr("cx", function(d, i) { return xScale(i) })
.attr("cy", function(d) { return yScale(d) })
.attr("r", 4)
.attr("opacity", 0)
.style("fill", data_set.color_graph_B_on).style("stroke", data_set.color_bg).style("stroke-width", 2);

// set text
var label_1 = gfx_layer_1.append("text")
.attr("class", "label")
.attr("x", 10 + xScale(data_input_main.n-1))
.attr("y", 15 + yScale(data_input_1[data_input_main.n-1]))
.text(data_input_main.text_label_1)
.style("fill", data_set.color_graph_label_B);


// LAYER 2 --------------------------------------------------
// GRAPH 2 --------------------------------------------------
// d3's line generator
var line_2 = d3.line()
.x(function(d, i) { return xScale(i); }) // set the x values for the line generator
.y(function(d) { return yScale(d); }) // set the y values for the line generator

// Append the path, bind the data, and call the line generator
gfx_layer_2.append("path")
.datum(data_input_2) // Binds data to the line
.attr("class", "line")
.attr("d", line_2) // Calls the line generator
.style("fill", "none").style("stroke", data_set.color_graph_B).style("stroke-width", 3);
// Duplicate fpr bigger active area
gfx_layer_2.append("path")
.datum(data_input_2) // Binds data to the line
.attr("class", "line_active")
.attr("d", line_2) // Calls the line generator
.style("fill", "none").style("stroke", "transparent").style("stroke-width", 20);

// Append a circle for each datapoint
gfx_layer_2.selectAll(".dot")
.data(data_input_2)
.enter().append("circle") // Uses the enter().append() method
.attr("class", "dot") // Assign a class for styling
.attr("cx", function(d, i) { return xScale(i) })
.attr("cy", function(d) { return yScale(d) })
.attr("r", 4)
.attr("opacity", 0)
.style("fill", data_set.color_graph_B_on).style("stroke", data_set.color_bg).style("stroke-width", 2);

// set text
var label_2 = gfx_layer_2.append("text")
.attr("class", "label")
.attr("x", 10 + xScale(data_input_main.n-1))
.attr("y", 0 + yScale(data_input_2[data_input_main.n-1]))
.text(data_input_main.text_label_2)
.style("fill", data_set.color_graph_label_B);


// LAYER 3 --------------------------------------------------
// GRAPH 3 --------------------------------------------------
// d3's line generator
var line_3 = d3.line()
.x(function(d, i) { return xScale(i); }) // set the x values for the line generator
.y(function(d) { return yScale(d); }) // set the y values for the line generator

// Append the path, bind the data, and call the line generator
gfx_layer_3.append("path")
.datum(data_input_3) // Binds data to the line
.attr("class", "line")
.attr("d", line_3) // Calls the line generator
.style("fill", "none").style("stroke", data_set.color_graph_B).style("stroke-width", 3);
// Duplicate fpr bigger active area
gfx_layer_3.append("path")
.datum(data_input_3) // Binds data to the line
.attr("class", "line_active")
.attr("d", line_3) // Calls the line generator
.style("fill", "none").style("stroke", "transparent").style("stroke-width", 20);

// Append a circle for each datapoint
gfx_layer_3.selectAll(".dot")
.data(data_input_3)
.enter().append("circle") // Uses the enter().append() method
.attr("class", "dot") // Assign a class for styling
.attr("cx", function(d, i) { return xScale(i) })
.attr("cy", function(d) { return yScale(d) })
.attr("r", 4)
.attr("opacity", 0)
.style("fill", data_set.color_graph_B_on).style("stroke", data_set.color_bg).style("stroke-width", 2);

// set text
var label_3 = gfx_layer_3.append("text")
.attr("class", "label")
.attr("x", 10 + xScale(data_input_main.n-1))
.attr("y", 5 + yScale(data_input_3[data_input_main.n-1]))
.text(data_input_main.text_label_3)
.style("fill", data_set.color_graph_label_B);


// LAYER 4 --------------------------------------------------
// GRAPH 4 --------------------------------------------------
// d3's line generator
var line_4 = d3.line()
.x(function(d, i) { return xScale(i); }) // set the x values for the line generator
.y(function(d) { return yScale(d); }) // set the y values for the line generator

// Append the path, bind the data, and call the line generator
gfx_layer_4.append("path")
.datum(data_input_4) // Binds data to the line
.attr("class", "line")
.attr("d", line_4) // Calls the line generator
.style("fill", "none").style("stroke", data_set.color_graph_B).style("stroke-width", 3);
// Duplicate fpr bigger active area
gfx_layer_4.append("path")
.datum(data_input_4) // Binds data to the line
.attr("class", "line_active")
.attr("d", line_4) // Calls the line generator
.style("fill", "none").style("stroke", "transparent").style("stroke-width", 20);

// Append a circle for each datapoint
gfx_layer_4.selectAll(".dot")
.data(data_input_4)
.enter().append("circle") // Uses the enter().append() method
.attr("class", "dot") // Assign a class for styling
.attr("cx", function(d, i) { return xScale(i) })
.attr("cy", function(d) { return yScale(d) })
.attr("r", 4)
.attr("opacity", 0)
.style("fill", data_set.color_graph_B_on).style("stroke", data_set.color_bg).style("stroke-width", 2);

// set text
var label_4 = gfx_layer_4.append("text")
.attr("class", "label")
.attr("x", 10 + xScale(data_input_main.n-1))
.attr("y", 5 + yScale(data_input_4[data_input_main.n-1]))
.text(data_input_main.text_label_4)
.style("fill", data_set.color_graph_label_B);


// LAYER 5 --------------------------------------------------
// GRAPH 5 --------------------------------------------------
// d3's line generator
var line_5 = d3.line()
.x(function(d, i) { return xScale(i); }) // set the x values for the line generator
.y(function(d) { return yScale(d); }) // set the y values for the line generator
// Append the path, bind the data, and call the line generator
gfx_layer_5.append("path")
.datum(data_input_5) // Binds data to the line
.attr("class", "line")
.attr("d", line_5) // Calls the line generator
.style("fill", "none").style("stroke", data_set.color_graph_A).style("stroke-width", 3);
// Append a circle for each datapoint
gfx_layer_5.selectAll(".dot")
.data(data_input_5)
.enter().append("circle") // Uses the enter().append() method
.attr("class", "dot") // Assign a class for styling
.attr("cx", function(d, i) { return xScale(i) })
.attr("cy", function(d) { return yScale(d) })
.attr("r", 4)
.style("fill", data_set.color_graph_A).style("stroke", data_set.color_bg).style("stroke-width", 2);
// set text
var label_5 = gfx_layer_5.append("text")
.attr("class", "label")
.attr("x", 10 + xScale(data_input_main.n-1))
.attr("y", 5 + yScale(data_input_5[data_input_main.n-1]))
.text(data_input_main.text_label_5)
.style("fill", data_set.color_graph_label_A);




// ----------------------------------------------------------
// ANIMATION ------------------------------------------------
// ----------------------------------------------------------


d3.select(".gfx_layer_1").on("mouseenter", function() {
this.parentElement.appendChild(this);
});

/*
// mouseovers
// layer 1
d3.select("#gfx_layer_select_1")
.on("mouseenter", function() {
d3.selectAll("#gfx_layer_select_1 .line").style("stroke", data_set.color_graph_B_on);
d3.selectAll("#gfx_layer_select_1 .dot").attr("opacity", 1);
d3.selectAll("#gfx_layer_select_1 .label").style("fill", data_set.color_graph_label_B_on);
})
.on("mouseleave", function() {
d3.selectAll("#gfx_layer_select_1 .line").style("stroke", data_set.color_graph_B);
d3.selectAll("#gfx_layer_select_1 .dot").attr("opacity", 0);
d3.selectAll("#gfx_layer_select_1 .label").style("fill", data_set.color_graph_label_B);
});

// layer 2
d3.select("#gfx_layer_select_2")
.on("mouseenter", function() {
d3.selectAll("#gfx_layer_select_2 .line").style("stroke", data_set.color_graph_B_on);
d3.selectAll("#gfx_layer_select_2 .dot").attr("opacity", 1);
d3.selectAll("#gfx_layer_select_2 .label").style("fill", data_set.color_graph_label_B_on);
})
.on("mouseleave", function() {
d3.selectAll("#gfx_layer_select_2 .line").style("stroke", data_set.color_graph_B);
d3.selectAll("#gfx_layer_select_2 .dot").attr("opacity", 0);
d3.selectAll("#gfx_layer_select_2 .label").style("fill", data_set.color_graph_label_B);
});

// layer 3
d3.select("#gfx_layer_select_3")
.on("mouseenter", function() {
d3.selectAll("#gfx_layer_select_3 .line").style("stroke", data_set.color_graph_B_on);
d3.selectAll("#gfx_layer_select_3 .dot").attr("opacity", 1);
d3.selectAll("#gfx_layer_select_3 .label").style("fill", data_set.color_graph_label_B_on);
})
.on("mouseleave", function() {
d3.selectAll("#gfx_layer_select_3 .line").style("stroke", data_set.color_graph_B);
d3.selectAll("#gfx_layer_select_3 .dot").attr("opacity", 0);
d3.selectAll("#gfx_layer_select_3 .label").style("fill", data_set.color_graph_label_B);
});

// layer 4
d3.select("#gfx_layer_select_4")
.on("mouseenter", function() {
d3.selectAll("#gfx_layer_select_4 .line").style("stroke", data_set.color_graph_B_on);
d3.selectAll("#gfx_layer_select_4 .dot").attr("opacity", 1);
d3.selectAll("#gfx_layer_select_4 .label").style("fill", data_set.color_graph_label_B_on);
})
.on("mouseleave", function() {
d3.selectAll("#gfx_layer_select_4 .line").style("stroke", data_set.color_graph_B);
d3.selectAll("#gfx_layer_select_4 .dot").attr("opacity", 0);
d3.selectAll("#gfx_layer_select_4 .label").style("fill", data_set.color_graph_label_B);
});
*/

// ----------------------------------------------------------
// TEXT -----------------------------------------------------
// ----------------------------------------------------------

// create text "headline"
var text_headline = text_group.append("text")
.attr("class", "text_headline")
.attr("y", data_set.position_headline)
.text(data_set.text_headline)
.style("fill", data_set.color_text_headline);
// create text "subheadline"
var text_subheadline = text_group.append("text")
.attr("class", "text_subheadline")
.attr("x", 500)
.attr("y", data_set.position_headline)
.attr("text-anchor", "end")
.text(data_set.text_subheadline)
.style("fill", data_set.color_text_headline);
// create text "source"
var text_source = text_group.append("text")
.attr("class", "text_source")
.attr("x", 500)
.attr("y", data_set.position_source)
.attr("text-anchor", "end")
.text(data_set.text_source)
.style("fill", data_set.color_text_source);





//
