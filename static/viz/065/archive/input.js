var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height"),
    radius = Math.min(width, height) / 2,
    g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var color = d3.scaleOrdinal(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

var data = [ {type:"cashSalary", fmv: 80000},{type:"cashBonus", fmv: 40000},{type:"equity", fmv: 30000},{type:"benfits", fmv: 18000},{type:"perks", fmv: 4000},{type:"401k", fmv: 6000},{type:"stipends", fmv: 12000} ]



var pie = d3.pie()
    .sort(null)
    .value(function(d) { return d.fmv; });

var path = d3.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);

var label = d3.arc()
    .outerRadius(radius - 40)
    .innerRadius(radius - 40);

var arc = g.selectAll(".arc")
    .data(pie(data))
    .enter().append("g")
      .attr("class", "arc");

arc.append("path")
    .attr("d", path)
    .attr("fill", function(d) { return color(d.data.type); })
    .on("click",function(d) {
      // The amount we need to rotate:
      var rotate = 180-(d.startAngle + d.endAngle)/2 / Math.PI * 180;

      // Transition the pie chart
      g.transition()
        .attr("transform",  "translate(" + width / 2 + "," + height / 2 + ") rotate(" + rotate + ")")
        .duration(1000);

     // Τransition the labels:
     text.transition()
       .attr("transform", function(dd) {
         return "translate(" + label.centroid(dd) + ") rotate(" + (-rotate) + ")"; })
       .duration(1000);

    });

 var text = arc.append("text")
      .attr("transform", function(d) { return "translate(" + label.centroid(d) + ")"; })
      .attr("dy", "0.35em")
      .text(function(d) { return d.data.type; });
