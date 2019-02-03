var data1 = [10,15,21,8,12];
var data2 = [5,30,11,16,6];

var width = 800,
    height = 250,
    radius = Math.min(width, height) / 2;

var color = d3.scale.ordinal()
    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

var arc = d3.svg.arc()
    .outerRadius(radius - 10)
    .innerRadius(radius - 70);

var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) {
        return d;
    });


var svg = d3.select("#chartDiv").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("id", "pieChart")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var path = svg.selectAll("path")
    .data(pie(data1))
    .enter()
    .append("path");

var text = svg.selectAll("text")
  .data(pie(data1))
  .enter()
  .append("text")
    .attr("text-anchor", "middle")
    .attr("transform", function (d) {
      return "translate(" + arc.centroid(d) + ")";
    })
    .text(function(d){return d.data;});

path.transition()
    .duration(500)
    .attr("fill", function(d, i) {
        return color(d.data);
    })
    .attr("d", arc)
    .each(function(d) { this._current = d; }); // Store the initial angles

function change(newdata) {
  path.data(pie(newdata))
    .transition().duration(1000)
    .attrTween("d", arcTween); // Redraw the arcs

  text.data(pie(newdata))
    .transition().duration(1000)
    .attr("transform", function (d) {
      return "translate(" + arc.centroid(d) + ")";
    })
    .text(function(d){return d.data;});
}

// Store the displayed angles in _current
// Then, interpolate from _current to the new angles
// During the transition, _current is updated in-place by d3.interpolate

function arcTween(a) {
    var i = d3.interpolate(this._current, a);
    this._current = i(0);
    return function(t) {
        return arc(i(t));
    };
}
