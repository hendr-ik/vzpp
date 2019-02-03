var width = 960,
    height = 500,
    outerRadius = Math.min(width, height) * .5 - 10,
    innerRadius = 0; //outerRadius * .6;

var n = 7,
    data0 = [50, 20, 10, 30,  0,  0,  0],
    data1 = [50,  0,  0,  0,  0,  0,  0],
    data2 = [ 0,  0,  0,  0, 35, 10,  5],
    data = [data0, data1, data2];

var radiusScale = d3.scaleSqrt()
			.range([0, outerRadius])
			.domain([0, 110]); //d3.max([d3.sum(data0), d3.sum(data1)])])

var color = d3.scaleOrdinal(d3.schemeCategory20);

var arc = d3.arc().innerRadius(0);

var pie = d3.pie()
    .sort(null);

var svg = d3.select("#canvas_065").append("svg")
    .attr("width", width)
    .attr("height", height);

svg.selectAll(".arc")
    .data(arcs(data0, data1))
  .enter().append("g")
    .attr("class", "arc")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
  .append("path")
    .attr("fill", function(d, i) { return color(i); })
    .attr("d", arc);

transition(0, 1)

function arcs(data0, data1) {

  var arcs0 = pie(data0),
      arcs1 = pie(data1),
      i = -1,
      arc,
      outerRad0 = radiusScale(d3.sum(data0)),
  		outerRad1 = radiusScale(d3.sum(data1));

  console.log("hi", outerRad0, outerRad1)

  while (++i < n) {
    arc = arcs0[i];
    arc.outerRadius = outerRad0;
    arc.startAngle = arc.startAngle + 0.1;
    arc.endAngle = arc.endAngle + 0.1;
    arc.next = arcs1[i];
    arc.next.outerRadius = outerRad1;
  }
  return arcs0;
}

function transition(from, to) {
  var path = d3.selectAll(".arc > path")
      .data(arcs(data[from], data[to]));
/*
  // Wedges split into two rings.
  var t0 = path.transition()
      .duration(1000)
      .attrTween("d", tweenArc(function(d, i) {
        return {
          innerRadius: i & 1 ? innerRadius : (innerRadius + outerRadius) / 2,
          outerRadius: i & 1 ? (innerRadius + outerRadius) / 2 : outerRadius
        };
      }));

  // Wedges translate to be centered on their final position.
  var t1 = t0.transition()
      .attrTween("d", tweenArc(function(d, i) {
        var a0 = d.next.startAngle + d.next.endAngle,
            a1 = d.startAngle - d.endAngle;
        return {
          startAngle: (a0 + a1) / 2,
          endAngle: (a0 - a1) / 2
        };
      }));*/

  // Wedges then update their values, changing size.
  var t2 = path.transition()
  			.duration(1000)
        .attrTween("d", tweenArc(function(d, i) {
          //console.log(i, d, d.next)
          return {
            startAngle: d.next.startAngle,
            endAngle: d.next.endAngle,
          	outerRadius: d.next.outerRadius
          };
        }));
/*
  // Wedges reunite into a single ring.
  var t3 = t2.transition()
      .attrTween("d", tweenArc(function(d, i) {
        return {
          innerRadius: innerRadius
        };
      }));
 */
  var dir = to - from;
  console.log(from, to, dir, data.length);
  dir = ((to + dir) == data.length) ? -dir : dir;
  dir = ((to + dir) == -1) ? -dir : dir;

  setTimeout(function() { transition(to, to + dir); }, 2500);
}

function tweenArc(b) {
  return function(a, i) {
    var d = b.call(this, a, i), i = d3.interpolate(a, d);
    for (var k in d) a[k] = d[k]; // update data
    return function(t) { return arc(i(t)); };
  };
}
