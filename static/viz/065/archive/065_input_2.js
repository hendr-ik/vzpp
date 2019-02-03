var width = 500,
  height = 500,
  radius = Math.min(width, height) / 2;

var color = d3.scaleOrdinal(d3.schemeCategory20);

var pie = d3.pie()
  .value(function(d) {
    return d.apples;
  })
  .sort(null);

var arc = d3.arc()
  .innerRadius(radius - 100)
  .outerRadius(radius - 20);

var svg = d3.select("#canvas_065").append("svg")
  .attr("width", width)
  .attr("height", height)
  .append("g")
  .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var data = [{
  "apples": 53245,
  "oranges": 200
}, {
  "apples": 28479,
  "oranges": 200
}, {
  "apples": 19697,
  "oranges": 200
}, {
  "apples": 24037,
  "oranges": 200
}, {
  "apples": 40245,
  "oranges": 200
}];

var g = svg.datum(data).selectAll(".arc")
  .data(pie)
  .enter().append("g")
  .attr("class", "arc");

var path = g.append("path")
  .attr("d", arc)
  .style("fill", function(d) {
    return color(d.data.apples);
  })
  .each(function(d) {
    this._current = d;
  }); // store the initial angles

var text = g.append("text")
  .attr("transform", function(d) {
    return "translate(" + arc.centroid(d) + ")";
  })
  .attr("dy", ".35em")
  .text(function(d) {
    return d.data.apples;
  });

d3.selectAll("input")
  .on("change", change);

function change() {
  var value = this.value;
  pie.value(function(d) {
    return d[value];
  }); // change the value function
  g = g.data(pie); // compute the new angles
  g.select("path")
    .transition()
    .duration(750)
    .attrTween("d", arcTween); // redraw the arcs
  g.select("text")
    .style("opacity", 0)
    .attr("transform", function(d) {
      return "translate(" + arc.centroid(d) + ")";
    })
    .text(function(d) {
      return d.data[value];
    })
    .transition()
    .duration(1000)
    .style("opacity", 1);
}

function type(d) {
  d.apples = +d.apples;
  d.oranges = +d.oranges;
  return d;
}

// Store the displayed angles in _current.
// Then, interpolate from _current to the new angles.
// During the transition, _current is updated in-place by d3.interpolate.
function arcTween(a) {
  var i = d3.interpolate(this._current, a);
  this._current = i(0);
  return function(t) {
    return arc(i(t));
  };
}
