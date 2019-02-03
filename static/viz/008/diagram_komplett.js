

// DIAGRAM 1  -----------------------------------------------
// set up scales
// left
var yScale_1 = d3.scaleLinear()
.range([height, 0])
.domain([0, data_set.domain_max]);
// bottom
var xScale_1 = d3.scaleBand()
.range([0, width])
.domain(data_input.map((s) => s.term))
.padding(0.4)

// set up grid lines
// vertical
var makeXLines_1 = () => d3.axisBottom()
.scale(xScale_1)
// horizontal
var makeYLines_1 = () => d3.axisLeft()
.scale(yScale_1)

// append scales
// left
gfx_diagram_1.append("g")
.attr("class", "gfx_scale_left")
.call(d3.axisLeft(yScale_1));
// bottom
gfx_diagram_1.append("g")
.attr("class", "gfx_scale_bottom")
.attr("transform", `translate(0, ${height})`)
.call(d3.axisBottom(xScale_1));

// append grid lines
// vertical
gfx_diagram_1.append("g")
.attr("class", "gfx_grid_vertical")
.attr("transform", `translate(0, ${height})`)
.call(makeXLines_1()
.tickSize(-height, 0, 0)
.tickFormat(""));
// horizontal
gfx_diagram_1.append("g")
.attr("class", "gfx_grid_horizontal")
.call(makeYLines_1()
.tickSize(-width, 0, 0)
.tickFormat(""));


// BARS -----------------------------------------------------
// link data input to create gfx bars
var gfx_bar = gfx_diagram_1.selectAll()
.data(data_input)
.enter()
.append("g")
.attr("class", "gfx_bar");

// set gfx bars attributes
gfx_bar.append("rect")
.attr("class", "gfx_bar_rect")
.attr("x", (g) => xScale_1(g.term))
.attr("y", (g) => yScale_1(g.value_1))
.attr("height", (g) => height - yScale_1(g.value_1))
.attr("width", xScale_1.bandwidth())
.style("fill", "#fff");

// set gfx bars text
gfx_bar.append("text")
.attr("class", "gfx_bar_value")
.attr("x", (a) => xScale_1(a.term) + xScale_1.bandwidth() / 2)
.attr("y", (a) => yScale_1(a.value_1) + 30)
.attr("text-anchor", "middle")
.text((a) => `${a.value_1}`);
