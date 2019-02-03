// DATA -----------------------------------------------------
// ----------------------------------------------------------
var data_input = [

{radius: 15.601, term: "ChuChu TV",
color_gfx: "#000", color_label: "#000",
color_label_text: "#fff"},

{radius: 5.363, term: "Sesame Street",
color_gfx: "#bbb", color_label: "#bbb",
color_label_text: "#000"},

{radius: 2.802, term: "Nickelodeon",
color_gfx: "#fff", color_label: "#fff",
color_label_text: "#000"}

];


var data_set = {container_width: 540, container_height: 540,
                domain_min: 0, range_min: 0, range_max: 200,
                color_svg: "#ddd", color_layout_head: "#ccc",
                color_text: "#000"};


// ----------------------------------------------------------
// strip values from data_input for scaling
var data_strip = data_input.map(function (temp) {
return temp.radius;
});

// find maximum value
var domain_max = d3.max(data_strip);

// setup scale function
var Rscale = d3.scaleLinear()
.domain([ data_set.domain_min, domain_max ])
.range([data_set.range_min, data_set.range_max]);

// transfer every given data point to new scale
var data_process = [];
for (var i = 0; i < data_strip.length; i++) {
data_process[i] = Rscale(data_strip[i]);
}




// STRUCTURE ------------------------------------------------
// ----------------------------------------------------------
// create container for svg content
var container = d3.select("#canvas").append("svg")
.attr("width", data_set.container_width)
.attr("height", data_set.container_height)
.style("background-color", data_set.color_svg);

// create group for layout
var layout_group = container.append("g")
.attr("class", "layout_group");

// create group for gfx - translate the group for margin top, left
var gfx_group = container.append("g")
.attr("class", "gfx_group")
//.attr("transform", "translate(10,10)")
;

// create group for text
var text_group = container.append("g")
.attr("class", "text_group");

// create group for text labels
var label_group = text_group.append("g")
.attr("class", "label_group");


/*

// LAYOUT ---------------------------------------------------
// ----------------------------------------------------------
 var layout_head = layout_group.append("rect")
.attr("class", "layout_head")
.attr("x", 0)
.attr("y", 0)
.attr("width", 540)
.attr("height", 100)
.style("fill", data_set.color_layout_head);

*/


// GFX ------------------------------------------------------
// ----------------------------------------------------------











/*

// TEXT -----------------------------------------------------
// ----------------------------------------------------------
// create text "headline"
var text_headline = text_group.append("text")
.attr("class", "text_headline")
.attr("x", 20)
.attr("y", 40)
.text("This is a Headline")
.style("fill", data_set.color_text);

// create text "sub headline"
var text_headline_sub = text_group.append("text")
.attr("class", "text_headline_sub")
.attr("x", 20)
.attr("y", 80)
.text("This is a Sub Headline")
.style("fill", data_set.color_text);

// create text "source"
var text_source = text_group.append("text")
.attr("class", "text_source")
.attr("x", 20)
.attr("y", 520)
.text("Source: Temp Source")
.style("fill", data_set.color_text);

*/
