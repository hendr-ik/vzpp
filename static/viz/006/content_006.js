// DATA -----------------------------------------------------
// ----------------------------------------------------------
var data_input = [{radius: 2000, term: "A",
                  color_gfx: "#777", color_label: "#ddd",
                  color_label_text: "#fff"},

                  {radius: 1200, term: "B",
                  color_gfx: "#bbb", color_label: "#ccc",
                  color_label_text: "#000"},

                  {radius: 500, term: "C",
                  color_gfx: "#ccc", color_label: "#000",
                  color_label_text: "#fff"}];

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




// LAYOUT ---------------------------------------------------
// ----------------------------------------------------------
 var layout_head = layout_group.append("rect")
.attr("class", "layout_head")
.attr("x", 0)
.attr("y", 0)
.attr("width", 540)
.attr("height", 100)
.style("fill", data_set.color_layout_head);




// GFX ------------------------------------------------------
// ----------------------------------------------------------
// link processed data create gfx circles
var gfx_circle = gfx_group.selectAll(".gfx_circle")
.data(data_process)
.enter()
.append("circle");
// set gfx circles attributes
var gfx_circle = gfx_circle
.attr("class", "gfx_circle")
.attr("cx", 270)
.attr("cy", 270)
.attr("r", function (d) { return d; });

// color gfx circles
d3.selectAll(".gfx_circle")
.data(data_input)
.style("fill", function (d) { return d.color_gfx; });




// LABEL ----------------------------------------------------
// ----------------------------------------------------------
// link process data to create text label positions
var text_label = label_group.selectAll(".text_label")
.data(data_process)
.enter()
.append("text");
// set text labels attributes
var text_label = text_label
.attr("class", "text_label")
.attr("text-anchor", "middle")
.attr("x", function (d) { return 220 + d; })
.attr("y", 270);


// ----------------------------------------------------------
// link input data to set terms of text labels
var text_label = label_group.selectAll(".text_label")
.data(data_input)
.text( function (d) { return d.term; })
.style("fill", function (d) { return d.color_label_text; })

// create gfx label behind each text label
.each(function(d){
var bbox = this.getBBox();
label_group.insert("rect","text")
.attr("class", "gfx_label")
.attr("x", bbox.x -5)
.attr("y", bbox.y -5)
.attr("width", 10 + bbox.width)
.attr("height", 10 + bbox.height);
});

// color gfx label
d3.selectAll(".gfx_label")
.data(data_input)
.style("fill", function (d) { return d.color_label; });




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
