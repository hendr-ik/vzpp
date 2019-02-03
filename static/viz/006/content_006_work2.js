var w = 600,
h = 600;


var data = [50, 100 , 150, 200 ] ;

var svg = d3.select('body')
.append('svg')
.attr('width', w)
.attr('height', h);

var labels = svg.selectAll('text').data(data);

labels.enter()
.append('text')
.attr('x', function (d) { return d; })
.attr('y', function (d) { return d; })
.text(function (d) { return d; })

.each(function(d){
var bbox = this.getBBox();
svg.insert('rect','text')
.attr('x', bbox.x -5)
.attr('y', bbox.y -5)
.attr('width', 5 + bbox.width)
.attr('height', 5 + bbox.height)
.style('fill', '#fff');
})

;
