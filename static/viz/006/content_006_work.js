width = 960
height = 500

// create the SVG ###
svg = d3.select('body').append('svg')
.attr('width', width)
.attr('height', height)

// create a text element
text = svg.append('text')
.attr("class", "ttt")
.text('Hello world!')
.attr('x', 480)
.attr('y', 250)
.attr('dy','0.35em')

// obtain its bounding box (without considering transforms)
bbox = d3.select(".ttt").getBBox()

// insert a yellow rect beneath the text, to represent the bounding box
svg.insert('rect','text')
.attr('x', bbox.x)
.attr('y', bbox.y)
.attr('width', bbox.width)
.attr('height', bbox.height)
