// ----------------------------------------------------------
// DATA -----------------------------------------------------
// ----------------------------------------------------------
var data_set_068 = {
container_width: 540,
container_height: 540,
margin: 20,
center_x: 250,
center_y: 270,
// ----------------------------------------------------------
position_headline: 25,
position_source: 500,
// ----------------------------------------------------------
text_headline: "###",
text_subheadline: "###",
text_source: "Source: ###",
// ----------------------------------------------------------
color_bg: "#f9f4ef",
color_basic: "#a399e7",
color_layout_stroke: "#f2e8df",

// data
data_set_068_1: [
{"label": "A", "posX": 50, "posY": 50, "rad": 20},
{"label": "B", "posX": 100, "posY": 100, "rad": 20},
{"label": "C", "posX": 150, "posY": 150, "rad": 20},
],
data_set_068_2: [
{"label": "D", "posX": 200, "posY": 200, "rad": 20}
],

// text
color_text_headline: "#2e2f33",
color_text_source: "#e4cfbb"
};




// ----------------------------------------------------------
// STRUCTURE ------------------------------------------------
// ----------------------------------------------------------
// create container for svg content
var container_068 = d3.select("#canvas_068").append("svg")
.attr("width", data_set_068.container_width)
.attr("height", data_set_068.container_height)
.attr("class", "canvas")
//.style("border", "1px solid black")
.style("background-color", data_set_068.color_bg);
// set up margin
var margin_068 = data_set_068.margin;
var width_068 = data_set_068.container_width - 2 * margin_068;
var height_068 = data_set_068.container_height - 2 * margin_068;
// ----------------------------------------------------------
// create group for layout
var layout_group_068 = container_068.append("g")
.attr("class", "layout_group");
// ----------------------------------------------------------
// create container for scaling
var container_margin_068 = container_068.append("g")
.attr("class", "canvas_margin")
.attr("transform", `translate(${margin_068}, ${margin_068})`);
// ----------------------------------------------------------
// create group for gfx - translate the group for margin top, left
var gfx_group_068 = container_margin_068.append("g");
// create sub-groups for layers
var gfx_layer_0_068 = gfx_group_068.append("g")
.attr("class", "gfx_layer_0");

// ----------------------------------------------------------
// create group for text
var text_group_068 = container_margin_068.append("g");




// ----------------------------------------------------------
// LAYOUT ---------------------------------------------------
// ----------------------------------------------------------
// set layout strokes
layout_group_068.append("rect")
.attr("class", "gfx_bar_stroke")
.attr("x", 20)
.attr("y", data_set_068.position_headline + 35)
.attr("height", 2)
.attr("width", 500)
.style("fill", data_set_068.color_layout_stroke);
//
layout_group_068.append("rect")
.attr("class", "gfx_bar_stroke")
.attr("x", 20)
.attr("y", data_set_068.position_source + 30)
.attr("height", 2)
.attr("width", 500)
.style("fill", data_set_068.color_layout_stroke);




// ----------------------------------------------------------
// GFX ------------------------------------------------------
// ----------------------------------------------------------





//2 different data arrays
var dataArray1 = [30,35,45,55,70];
var dataArray2 = [50,55,45,35,20,25,25,40];


var data_set_068_1 = [
{"label": "A", "posX": 50, "posY": 50, "rad": 20},
{"label": "B", "posX": 100, "posY": 100, "rad": 20},
{"label": "C", "posX": 150, "posY": 150, "rad": 20},
];

var data_set_068_2 = [
{"label": "D", "posX": 200, "posY": 200, "rad": 20}
];


//globals
var dataIndex=1;
var xBuffer=50;
var yBuffer=150;
var lineLength=400;





//create basic circles
gfx_layer_0_068.selectAll("circle")
.data(eval("dataArray"+dataIndex))
.enter()
.append("circle")
.attr("cx",function(d,i){
var spacing = lineLength/(eval("dataArray"+dataIndex).length);
return xBuffer+(i*spacing)
})
.attr("cy",yBuffer)
.attr("r",function(d,i){return d});




function doUpdate() {


//select new data
if (dataIndex==1) {
dataIndex=2;
} else   {
dataIndex=1;
}
//rejoin data
var circle = gfx_layer_0_068.selectAll("circle")
.data(eval("dataArray"+dataIndex));

circle.exit().remove();//remove unneeded circles
circle.enter().append("circle")
.attr("r",0);//create any new circles needed

//update all circles to new positions
circle.transition()
.duration(500)
.attr("cx",function(d,i){
var spacing = lineLength/(eval("dataArray"+dataIndex).length);
return xBuffer+(i*spacing)
})
.attr("cy",yBuffer)
.attr("r",function(d,i){return d});

d3.select("text").text("dataset"+dataIndex);

};//end click function




































// ----------------------------------------------------------
// TEXT -----------------------------------------------------
// ----------------------------------------------------------
// create text "headline"
var text_headline_068 = text_group_068.append("text")
.attr("class", "text_headline")
.attr("y", data_set_068.position_headline)
.text(data_set_068.text_headline)
.style("fill", data_set_068.color_text_headline);
// create text "subheadline"
var text_subheadline_068 = text_group_068.append("text")
.attr("class", "text_subheadline")
.attr("x", 500)
.attr("y", data_set_068.position_headline)
.attr("text-anchor", "end")
.text(data_set_068.text_subheadline)
.style("fill", data_set_068.color_text_headline);
// create text "source"
var text_source_068 = text_group_068.append("text")
.attr("class", "text_source")
.attr("x", 500)
.attr("y", data_set_068.position_source)
.attr("text-anchor", "end")
.text(data_set_068.text_source)
.style("fill", data_set_068.color_text_source);




//
