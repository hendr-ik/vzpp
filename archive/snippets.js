
// Retrieve x and y of an object
var transf = d3.select("#Line").attr("transform");
var splitted = transf.split(",");
var x = ~~splitted [0].split("(")[1];
var y = ~~splitted [1].split(")")[0];
console.log(x, y);


// Onclick text change
.on("click", function(d) {
if (data_set_065.text_headline_switch == 0) {
d3.select(".text_headline").text(data_set_065.text_headline_2);
data_set_065.text_headline_switch = 1;
}
else {
d3.select(".text_headline").text(data_set_065.text_headline_1);
data_set_065.text_headline_switch = 0;
}


// Filter for select a single element
g1_065.selectAll("text").filter(function(d){ return d.data.display == "WeChat"; })
.style("fill", data_set_065.color_pie_selected);



//--- D3 diagram 1---------------------------------
 // given data
var data = [23, 54, 67, 12, 4];
var width = 800;
var height = 200;

// create svg canvas
var svgContainer = d3.select("body").append("svg")
.attr("width", width)
.attr("height", height)
.style("border", "1px solid black");

// Set scale for the axis
var axisScale = d3.scaleLinear()
.domain([0, 70])
.range([0, width - 100]);

// Create bottom and left axis (?)
var axisBot = d3.axisBottom(axisScale);
var axisLft = d3.axisLeft(data);

// create group and attach scale
var xsCont = svgContainer.append('g')
.call(axisBot);

// create svg bars from data points
var bars = svgContainer.selectAll('rect')
.data(data)
.enter()
.append('rect');

// bind data to properties of bars
var barsAttributes = bars
.attr('width', function(d) { return axisScale(d); })
.attr('height', 20)
.attr('y', function(d, i) { return 30 + (i * 30) });




//--- svg text elements ---------------------------------

 // given data
var circleData = [
{ "cx": 20, "cy": 20, "radius": 20, "color" : "green" },
{ "cx": 70, "cy": 70, "radius": 20, "color" : "purple" }
];

// create svg canvas
var svgContainer = d3.select("body").append("svg")
.attr("width",200)
.attr("height",200)
.style("border", "1px solid black");

// create svg circles from data points
var circles = svgContainer.selectAll("circle")
.data(circleData)
.enter()
.append("circle");

// bind data to properties of svg rectangles
var circleAttributes = circles
.attr("cx", function (d) { return d.cx; })
.attr("cy", function (d) { return d.cy; })
.attr("r", function (d) { return d.radius; })
.style("fill", function (d) { return d.color; });

// create text elements from data points - drawn on top of circles
var text = svgContainer.selectAll("text")
.data(circleData)
.enter()
.append("text");

// bind data to properties of text elements
var textLabels = text
.attr("x", function(d) { return d.cx; })
.attr("y", function(d) { return d.cy; })
// print properties of circles in text elements
.text( function (d) { return "( " + d.cx + ", " + d.cy +" )"; })
.attr("font-family", "sans-serif")
.attr("font-size", "20px")
.attr("fill", "red");





//--- grouping and translating svg objects ---------------------------------

// given data
var circleData = [
{ "cx": 20, "cy": 20, "radius": 20, "color" : "green" },
{ "cx": 70, "cy": 70, "radius": 20, "color" : "purple" }
];
 var rectangleData = [
{ "rx": 110, "ry": 110, "height": 30, "width": 30, "color" : "blue" },
{ "rx": 160, "ry": 160, "height": 30, "width": 30, "color" : "red" }
];

// create svg canvas
var svgContainer = d3.select("body").append("svg")
.attr("width",200)
.attr("height",200)
.style("border", "1px solid black");

// create group for svg circles - translate the group
var circleGroup = svgContainer.append("g")
.attr("transform", "translate(80,0)");

// create svg circles from data points
var circles = circleGroup.selectAll("circle")
.data(circleData)
.enter()
.append("circle");

// bind data to properties of svg circles
var circleAttributes = circles
.attr("cx", function (d) { return d.cx; })
.attr("cy", function (d) { return d.cy; })
.attr("r", function (d) { return d.radius; })
.style("fill", function (d) { return d.color; });

// create svg rectangles from data points
var rectangles = svgContainer.selectAll("rect")
.data(rectangleData)
.enter()
.append("rect");

// bind data to properties of svg rectangles
var rectangleAttributes = rectangles
.attr("x", function (d) { return d.rx; })
.attr("y", function (d) { return d.ry; })
.attr("height", function (d) { return d.height; })
.attr("width", function (d) { return d.width; })
.style("fill", function(d) { return d.color; });




//--- resizing data to fit given svg canvas ---------------------------------

// given data
var initialScaleData = [0, 1000, 3000, 2000, 5000, 4000, 7000, 6000, 9000, 8000, 10000];

// determine min and max values of given data
 var newScaledData = [];
 var minDataPoint = d3.min(initialScaleData);
 var maxDataPoint = d3.max(initialScaleData);

// specify the new scale of data
 var linearScale = d3.scaleLinear()
.domain([minDataPoint,maxDataPoint])
// min - max
.range([0,100]);

// transfer every given data point to new scale
for (var i = 0; i < initialScaleData.length; i++) {
  newScaledData[i] = linearScale(initialScaleData[i]);
}

// create p elements from data points
var p = d3.select("body").selectAll("p")
.data(newScaledData)
.enter()
.append("p")

// fill text field with data d and i
.text(function (d,i) {
  return "i = " + i + " d = "+d;
});




//--- resizing svg canvas to fit given data ---------------------------------

// given data
var jsonRectangles = [
{ "x_axis": 10, "y_axis": 10, "height": 20, "width":20, "color" : "green" },
{ "x_axis": 160, "y_axis": 40, "height": 20, "width":20, "color" : "purple" },
{ "x_axis": 70, "y_axis": 70, "height": 20, "width":20, "color" : "red" }];

// updated to be the max coordinates
 var max_x = 0;
 var max_y = 0;

// loop to the data arrays
for (var i = 0; i < jsonRectangles.length; i++) {
  var temp_x, temp_y;

  // calculate maximum width and height
  var temp_x = jsonRectangles[i].x_axis + jsonRectangles[i].width;
  var temp_y = jsonRectangles[i].y_axis + jsonRectangles[i].height;

  // compare max with temp values
  if ( temp_x >= max_x ) {
    max_x = temp_x;
  }
  if ( temp_y >= max_y ) {
    max_y = temp_y;
  }
}

// create svg canvas + some extra space arround
var svgContainer = d3.select("body").append("svg")
.attr("width", max_x + 20)
.attr("height", max_y + 20)
.style("border", "1px solid black");

// create svg rectangles from data points
var rectangles = svgContainer.selectAll("rect")
.data(jsonRectangles)
.enter()
.append("rect");

// bind data to properties of svg rectangles
var rectangleAttributes = rectangles
.attr("x", function (d) { return d.x_axis; })
.attr("y", function (d) { return d.y_axis; })
.attr("height", function (d) { return d.height; })
.attr("width", function (d) { return d.width; })
.style("fill", function(d) { return d.color; });




//--- polylines drawing with svg ---------------------------------

// given data
var lineData = [
{ "x": 1,   "y": 5},  { "x": 20,  "y": 20},
{ "x": 40,  "y": 10}, { "x": 60,  "y": 40},
{ "x": 80,  "y": 5},  { "x": 100, "y": 60}
];

// bind data to a drawing function
var lineFunction = d3.line()
.x(function(d) { return d.x; })
.y(function(d) { return d.y; })
.curve(d3.curveLinear);

// create svg canvas
var svgContainer = d3.select("body").append("svg")
.attr("width", 200)
.attr("height", 200)
.style("border", "1px solid black");

// draw a svg path and make it a line
var lineGraph = svgContainer.append("path")
.attr("d", lineFunction(lineData))
.attr("stroke", "blue")
.attr("stroke-width", 2)
.attr("fill", "none");




//--- basic drawing with svg ---------------------------------

// create svg canvas
var svgContainer = d3.select("body").append("svg")
.attr("width", 200)
.attr("height", 200)
.style("border", "1px solid black");

// Line
 var circle = svgContainer.append("line")
.attr("x1", 5)
.attr("y1", 5)
.attr("x2", 50)
.attr("y2", 50)
.attr("stroke-width", 2)
.attr("stroke", "black");

// Rectangle
 var rectangle = svgContainer.append("rect")
.attr("x", 10)
.attr("y", 10)
.attr("width", 50)
.attr("height", 100);

// Elypse
var circle = svgContainer.append("ellipse")
.attr("cx", 50)
.attr("cy", 50)
.attr("rx", 25)
.attr("ry", 10);

// Circle
var circle = svgContainer.append("circle")
.attr("cx", 30)
.attr("cy", 30)
.attr("r", 20);




//--- handling JSON data ---------------------------------

// given data
var jsonCircles = [
{
"x_axis": 30, "y_axis": 30, "radius": 20, "color" : "green"
}, {
"x_axis": 70, "y_axis": 70, "radius": 20, "color" : "purple"
}, {
"x_axis": 110, "y_axis": 100, "radius": 20, "color" : "red"
}];

// create svg canvas
var svgContainer = d3.select("body").append("svg")
.attr("width", 200)
.attr("height", 200)
.style("border", "1px solid black");

// create svg elements from data points
var circles = svgContainer.selectAll("circle")
.data(jsonCircles)
.enter()
.append("circle");

// bind data to properties of svg elements
var circleAttributes = circles
.attr("cx", function (d) { return d.x_axis; })
.attr("cy", function (d) { return d.y_axis; })
.attr("r", function (d) { return d.radius; })
.style("fill", function(d) { return d.color; });




//--- svg and coordinates ---------------------------------

// given data
var spaceCircles = [30, 70, 110];

// create svg canvas
var svgContainer = d3.select("body").append("svg")
.attr("width", 200)
.attr("height", 200)
.style("border", "1px solid black");

// create svg elements from data points
var circles = svgContainer.selectAll("circle")
.data(spaceCircles)
.enter()
.append("circle");

// bind data to positions of svg elements
var circleAttributes = circles
.attr("cx", function (d) { return d; })
.attr("cy", function (d) { return d; })
.attr("r", 20 )

// color svg elements from data
.style("fill", function(d) {
var returnColor;
if (d === 30) { returnColor = "green";
  } else if (d === 70) { returnColor = "purple";
  } else if (d === 110) { returnColor = "red"; }
  return returnColor;
});




//--- circle from data ---------------------------------

// given data
var circleRadii = [40, 20, 10];

// create svg canvas
var svgContainer = d3.select("body").append("svg")
.attr("width", 600)
.attr("height", 200);

// create svg elements from data points
var circles = svgContainer.selectAll("circle")
.data(circleRadii)
.enter()
.append("circle");

// set positions and bind data to dimensions of svg elements
var circleAttributes = circles
.attr("cx", 50)
.attr("cy", 50)
.attr("r", function (d) { return d; })

// color svg elements from data
.style("fill", function(d) {
var returnColor;
if (d === 40) { returnColor = "green";
  } else if (d === 20) { returnColor = "purple";
  } else if (d === 10) { returnColor = "red"; }
  return returnColor;
});



//--- text from data ---------------------------------

// given data
var theData = [ 1, 2, 3 ]

// create p elements from data points
var p = d3.select("body").selectAll("p")
.data(theData)
.enter()
.append("p")

// fill text field with data d and i
.text(function (d,i) {
  return "i = " + i + " d = "+d;
});



//--- basics ---------------------------------

// border
.style("border", "2px solid #66FF00");


// reference array
var data_set = {range_min: 0, range_max: 200};
var temps = data_set.range_max;

// print value to console
console.log (value);
