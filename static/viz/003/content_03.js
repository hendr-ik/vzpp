
// given data
var data_input = [{"radius": 200, "temp": 140}, {"radius": 120, "temp": 65}, {"radius": 50, "temp": 5}];

//------------------------------------------------------
// create container for svg content
var container = d3.select("#canvas").append("svg")
.attr("width", 540)
.attr("height", 540)
//.style("border", "2px solid #66FF00");

// create group for gfx - translate the group for margin top, left
var gfx_group = container.append("g")
.attr("class", "gfx_group")
.attr("transform", "translate(10,10)");

// create group for text - translate the group for margin top, left
var text_group = container.append("g")
.attr("class", "text_group")
.attr("transform", "translate(10,10)");


//------------------------------------------------------
// create gfx and in it svg elements from data points
var gfx = gfx_group.selectAll("circle")
.data(data_input)
.enter()
.append("circle");

// set gfx attributes by binding data to it
var gfx_attributes = gfx
.attr("cx", 200)
.attr("cy", 200)
.attr("r", function (d) { return d.radius; })

// color gfx from data
.style("fill", function(d) {
var returnColor;
if (d.radius === 200) { returnColor = "green";
  } else if (d.radius === 120) { returnColor = "purple";
  } else if (d.radius === 50) { returnColor = "red"; }
  return returnColor;
});


//------------------------------------------------------
// set text attributes by binding data to it
var text = text_group.selectAll("text")
.data(data_input)
.enter()
.append("text");

// bind data to properties of text elements
var textLabels = text
.attr("x", function (d) { return 200 + d.temp; })
.attr("y", 200)
// print properties of circles in text elements
.text( function (d) { return d.radius; })
;
