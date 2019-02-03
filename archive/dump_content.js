// load data the d3.v4 way
d3.csv("static/data/data.csv", function(error, data) {
  if (error) throw error;

  data.forEach(function(d) {
    // convert strings to numbers by label
    d.amount = +d.amount;
    // convert strings to numbers by label with space
    //d["land area"] = +d["land area"];
  });


  console.log(data);

  x


});


//-------------------------------------------------------------


// given data
//var data = [23, 54, 67, 12, 4];

// width and heigt of canvas
var width = 960, height = 400, aspect = width / height;

// margins of objects on canvas
var margin = {top: 10, right: 10, bottom: 10, left: 10},
cWidth = width - margin.left - margin.right,
cHeight = height - margin.top - margin.bottom;


//-------------------------------------------------------------

// create svg canvas with canvas_sub
var svgContainer = d3.select("#canvas").append("svg")
.attr("width", width)
.attr("height", width * aspect)
.attr("viewBox", "0 0 "+ width +" " + height +"")
.attr("preserveAspectRatio", "xMidYMid")
.attr("id", "canvas_sub")
.append("g")
.attr("transform", "translate(" + margin.left + "," + margin.top + ")");



// CONTENT --------------------------------------------------

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
.attr('width', function(d) { return axisScale(data); })
.attr('height', 20)
.attr('y', function(d, i) { return 30 + (i * 30) });



//-------------------------------------------------------------

// responsive with window size
var canvas_sub = $("#canvas_sub"),
svgContainer = canvas_sub.parent();

$(window).on("resize", function() {
var targetWidth = svgContainer.width();
canvas_sub.attr("width", targetWidth);
canvas_sub.attr("height", Math.round(targetWidth / aspect));
}).trigger("resize");
