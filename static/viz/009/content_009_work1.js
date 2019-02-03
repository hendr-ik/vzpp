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
//.attr("transform", `translate(${margin}, ${margin})`);
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




var yScale_1 = d3.scaleBand()
.range([0, width])
.domain([0, data_set.domain_max])
.padding(0.4);









var gfx_bar = gfx_diagram_1.selectAll()
.data(data_input)
.enter()
.append("g")
.attr("class", "gfx_bar");



gfx_bar.append("rect")
.attr("class", "gfx_bar_rect")
.attr("x", 10)
.attr("y", (g) => yScale_1(g.value_1))
.attr("height", 10)
.attr("width", 10)
.style("fill", "#fff");
