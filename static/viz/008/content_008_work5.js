// ----------------------------------------------------------
// DATA -----------------------------------------------------
// ----------------------------------------------------------
var data_input = [
{
term: "Nickelodeon",
value_1: 2.802
},
{
term: "Sesame Street",
value_1: 5.363
},
{
term: "ChuChu TV",
value_1: 15.601
},
{
term: "BillionSurpriseToys",
value_1: 5.685
},
{
term: "LooLoo Kids",
value_1: 4.703
}
];

var data_set =
{
container_width: 540,
container_height: 540,
general_margin: 60,
domain_max: 16,
general_duration: 100,
color_svg: "#ddd",
color_layout_head: "#ccc",
color_text: "#000"
};




// ----------------------------------------------------------
// STRUCTURE ------------------------------------------------
// ----------------------------------------------------------

// set up margin
var margin = data_set.general_margin;
var width = data_set.container_width - 2 * margin;
var height = data_set.container_height - 2 * margin;

// create container for svg content
var container = d3.select("#canvas").append("svg")
.attr("width", data_set.container_width)
.attr("height", data_set.container_height)
.style("background-color", data_set.color_svg);

// ----------------------------------------------------------
// create group for layout
var layout_group = container.append("g")
.attr("class", "layout_group");

// ----------------------------------------------------------
// create group for gfx - translate the group for margin top, left
var gfx_group = container.append("g")
.attr("class", "gfx_group")
;
// create sub-group for diagram_1
var gfx_diagram_1 = gfx_group.append("g")
.attr("class", "gfx_diagram_1")
.attr("transform", `translate(${margin}, ${margin})`);
;
// create sub-group for diagram_2
var gfx_diagram_2 = gfx_group.append("g")
.attr("class", "gfx_diagram_2")
.attr("transform", `translate(${margin}, ${margin})`);
;
// create sub-group for gfx button
var gfx_button = gfx_group.append("g")
.attr("class", "gfx_button")
.attr("transform", `translate(${margin}, ${margin})`);
;


// ----------------------------------------------------------
// create group for text
var text_group = container.append("g")
.attr("class", "text_group");

// create sub-group for text labels
var label_group = text_group.append("g")
.attr("class", "label_group");




// ----------------------------------------------------------
// GFX ------------------------------------------------------
// ----------------------------------------------------------

// DIAGRAM 1  -----------------------------------------------
// set up scales
// left
var yScale = d3.scaleLinear()
.range([height, 0])
.domain([0, data_set.domain_max]);
// bottom
var xScale = d3.scaleBand()
.range([0, width])
.domain(data_input.map((s) => s.term))
.padding(0.4)

// set up grid lines
// vertical
var makeXLines = () => d3.axisBottom()
.scale(xScale)
// horizontal
var makeYLines = () => d3.axisLeft()
.scale(yScale)

// append scales
// left
gfx_diagram_1.append("g")
.attr("class", "gfx_scale_left")
.call(d3.axisLeft(yScale));
// bottom
gfx_diagram_1.append("g")
.attr("class", "gfx_scale_bottom")
.attr("transform", `translate(0, ${height})`)
.call(d3.axisBottom(xScale));

// append grid lines
// vertical
gfx_diagram_1.append("g")
.attr("class", "gfx_grid_vertical")
.attr("transform", `translate(0, ${height})`)
.call(makeXLines()
.tickSize(-height, 0, 0)
.tickFormat(""));
// horizontal
gfx_diagram_1.append("g")
.attr("class", "gfx_grid_horizontal")
.call(makeYLines()
.tickSize(-width, 0, 0)
.tickFormat(""));

// BARS -----------------------------------------------------
// link data input to create gfx bars
var gfx_bar = gfx_diagram_1.selectAll()
.data(data_input)
.enter()
.append("g")
.attr("class", "gfx_bar");

// set gfx bars attributes
gfx_bar.append("rect")
.attr("class", "gfx_bar_rect")
.attr("x", (g) => xScale(g.term))
.attr("y", (g) => yScale(g.value_1))
.attr("height", (g) => height - yScale(g.value_1))
.attr("width", xScale.bandwidth())
.style("fill", "#fff")
// set gfx bars mouse over
// enter
.on("mouseenter", function (actual, i) {
d3.select(this)
.transition()
.duration(100)
.style("fill", "#777");
})
// leave
.on("mouseleave", function (actual, i) {
d3.select(this)
.transition()
.duration(100)
.style("fill", "#fff");
});

// set gfx bars text
gfx_bar.append("text")
.attr("class", "gfx_bar_value")
.attr("x", (a) => xScale(a.term) + xScale.bandwidth() / 2)
.attr("y", (a) => yScale(a.value_1) + 30)
.attr("text-anchor", "middle")
.text((a) => `${a.value_1}`);
















// BUTTONS --------------------------------------------------
var button_1 = gfx_button.append("rect")
.attr("x", 10)
.attr("y", 10)
.attr("width", 50)
.attr("height", 100)
// set gfx bars mouse over
// enter
.on("mouseenter", function () {
d3.select(this)
.transition()
.duration(data_set.general_duration)
.style("fill", "#777");

d3.select(".gfx_diagram_1")
.transition()
.duration(data_set.general_duration)
.attr('opacity', 0);
})
// leave
.on("mouseleave", function () {
d3.select(this)
.transition()
.duration(data_set.general_duration)
.style("fill", "#000");

d3.select(".gfx_diagram_1")
.transition()
.duration(data_set.general_duration)
.attr('opacity', 100);
});


// ----------------------------------------------------------
var button_2 = gfx_button.append("rect")
.attr("x", 80)
.attr("y", 10)
.attr("width", 50)
.attr("height", 100)
// set gfx bars mouse over
// enter
.on("mouseenter", function () {
d3.select(this)
.transition()
.duration(data_set.general_duration)
.style("fill", "#777");

d3.select(".gfx_diagram")
.transition()
.duration(data_set.general_duration)
.attr('opacity', 0);
})
// leave
.on("mouseleave", function () {
d3.select(this)
.transition()
.duration(data_set.general_duration)
.style("fill", "#000");

d3.select(".gfx_diagram")
.transition()
.duration(data_set.general_duration)
.attr('opacity', 100);
});
