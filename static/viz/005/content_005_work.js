var data_input = [{radius: 50, "temp": 140},
                  {radius: 100, temp: 140},
                  {radius: 200, temp: 140}];

// strip values from data
var data_strip = data_input.map(function (temp) {
  return temp.radius;
});

// find maximum value
var data_max = d3.max(data_strip);

// setup scale function
var Rscale = d3.scaleLinear()
.domain([ 0, data_max ])
.range([0, 60]);

// transfer every given data point to new scale
var data_new = [];
for (var i = 0; i < data_strip.length; i++) {
data_new[i] = Rscale(data_strip[i]);
}



var svg = d3.select('#canvas').append('svg')
        .attr('width', 540)
        .attr('height', 540)
        .attr('class', 'chart');

svg.selectAll('.chart')
        .data(data_new)
        .enter().append('rect')
        .attr('class', 'bar')
        .attr('y', function(d, i) { return i * 20 })
        .attr("width", function (d) { return d; })
        .attr("height", 10);
