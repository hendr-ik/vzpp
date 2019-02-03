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
padding: 0.675,
// ----------------------------------------------------------
domain_max_1: 15.6,
domain_max_2: 20.3,
domain_max_3: 2968,
// ----------------------------------------------------------
position_headline: 25,
position_source: 500,
position_menu: 480,
// ----------------------------------------------------------
text_headline_1: "Kids channels on YouTube / views",
text_headline_2: "Kids channels on YouTube / subscriptions",
text_headline_3: "Kids channels on YouTube / uploads",
text_source: "Source: Social Blade, October 16, 2018",
// ----------------------------------------------------------
color_bg: "#f9f4ef", // background
color_layout_display: "#ff8e4b", // label bars
color_layout_stroke: "#f2e8df", // layout lines
color_bar_1: "#ffc19c", color_bar_display_1: "#2e2f33", // bars layer 1
color_bar_2: "#ffc19c", color_bar_display_2: "#2e2f33", // bars layer 2
color_bar_3: "#ffc19c", color_bar_display_3: "#2e2f33", // bars layer 3
color_button_stroke: "#19ab86",
color_button_on: "#19ab86",
color_button_off: "#5ad0b2",
color_button_text_on: "#2e2f33",
color_button_text_off: "#fff",
color_text_headline: "#2e2f33",
color_text_source: "#e4cfbb"
};


var n = 10;

/*
var data_input_1 = [
{y: 1600000},
{y: 1350000},
{y: 1800000},
{y: 1750000},
{y: 2050000},
{y: 2200000},
{y: 2900000},
{y: 2850000},
{y: 2950000},
{y: 3800000}
];
*/

var data_input_1 = [
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
// translate to fix x axis overlap
.attr("transform", "translate(10,0)");
// create sub-groups for layers
var gfx_layer_0 = gfx_group.append("g")
.attr("class", "gfx_layer_0");
var gfx_layer_1 = gfx_group.append("g")
.attr("class", "gfx_layer_1");
var gfx_layer_2 = gfx_group.append("g")
.attr("class", "gfx_layer_2");
var gfx_layer_3 = gfx_group.append("g")
.attr("class", "gfx_layer_3");
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
// SCALES ---------------------------------------------------
// ----------------------------------------------------------
// X
// for lines
var xScale = d3.scaleLinear()
.domain([0, n - 1]) // input
.range([0, width - 100]); // output
// for x axis
var xScale_date = d3.scaleTime()
  .domain([new Date(2017, 12), new Date(2018, 9)])
  .range([0, width - 100]);

// Y
var yScale = d3.scaleLinear()
.domain([0, 4000000]) // input
.range([height - data_set.limit_bottom, data_set.limit_top])




// ----------------------------------------------------------
// GFX ------------------------------------------------------
// ----------------------------------------------------------

// LAYOUT  -----------------------------------------------
// set layout strokes below headline
layout_group.append("rect")
.attr("class", "gfx_bar_stroke")
.attr("x", 20)
.attr("y", data_set.position_headline + 30)
.attr("height", 2)
.attr("width", 500)
.style("fill", data_set.color_layout_stroke);

// AXIS  -------------------------------------------------
// X
// create custom axis number format
var xAxis = d3.axisBottom(xScale_date)
.ticks(d3.timeMonth, 1)
.tickFormat(d3.timeFormat('%b'));
// append custom axis
gfx_layer_0.append("g")
.attr("transform", "translate(0," + ( height - data_set.limit_bottom ) + ")")
.call(customXAxis);
// change axis design
function customXAxis(g) {
g.call(xAxis);
g.select(".domain").remove();
}

// Y
// create custom axis number format
var formatNumber = d3.format(".1f");
var yAxis = d3.axisRight(yScale)
.ticks(5)
.tickSize(width - 100)
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
g.selectAll(".tick:not(:first-of-type) line").attr("stroke", "#777").attr("stroke-dasharray", "2,2");
g.selectAll(".tick text").attr("text-anchor", "start").attr("x", 15).attr("dy", -10);
}




// LINE 1  -------------------------------------------------
// d3's line generator
var line = d3.line()
.x(function(d, i) { return xScale(i); }) // set the x values for the line generator
.y(function(d) { return yScale(d.y); }) // set the y values for the line generator
// Append the path, bind the data, and call the line generator
gfx_layer_1.append("path")
.datum(data_input_1) // Binds data to the line
.attr("class", "line")
.attr("d", line) // Calls the line generator
.style("fill", "none").style("stroke", "#ffab00").style("stroke-width", 3);
// Append a circle for each datapoint
gfx_layer_1.selectAll(".dot")
.data(data_input_1)
.enter().append("circle") // Uses the enter().append() method
.attr("class", "dot") // Assign a class for styling
.attr("cx", function(d, i) { return xScale(i) })
.attr("cy", function(d) { return yScale(d.y) })
.attr("r", 5)
.style("fill", "#ffab00").style("stroke", data_set.color_bg).style("stroke-width", 2);




// set text


gfx_layer_1.selectAll(".label")
.data(data_input_1)
.enter()
.append("text")
.attr("class", "label")


.attr("x", function(d, i)
{ if (i==9) { return xScale(i) }
})



.attr("y", function(d, i)
{ if (i==9) { return yScale(d.y) }
 })

.text("hello")
.style("fill", data_set.color_bar_display_1);





// ----------------------------------------------------------
// TEXT -----------------------------------------------------
// ----------------------------------------------------------

// create text "headline"
var text_headline = text_group.append("text")
.attr("class", "text_headline")
.attr("y", data_set.position_headline)
.text(data_set.text_headline_1)
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
