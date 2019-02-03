// ----------------------------------------------------------
// DATA -----------------------------------------------------
// ----------------------------------------------------------

var data_set =
{
container_width: 540,
container_height: 540,
margin: 20,
limit_top: 140,
limit_bottom: 25,
padding: 0.675,
domain_max_1: 16,
general_duration: 100,
color_svg: "#ddd",
color_layout_head: "#ccc",
color_text: "#000"
};


var data_button = [
{
term: "views",
position: 20
},
{
term: "subscriptions",
position: 100
},
{
term: "uploads",
position: 250
}
];


var data_input = [
{
term: "Nickelodeon",
value_1: 2.8
},
{
term: "Sesame Street",
value_1: 5.4
},
{
term: "ChuChu TV",
value_1: 15.6
},
{
term: "BillionSurpriseToys",
value_1: 5.6
},
{
term: "LooLoo Kids",
value_1: 4.7
}
];




// ----------------------------------------------------------
// STRUCTURE ------------------------------------------------
// ----------------------------------------------------------

// set up margin
var margin = data_set.margin;
var width = data_set.container_width - 2 * margin;
var height = data_set.container_height - 2 * margin;

// create container for svg content
var container = d3.select("#canvas").append("svg")
.attr("width", data_set.container_width)
.attr("height", data_set.container_height)
.style("background-color", data_set.color_svg);

// ----------------------------------------------------------
// create group for menu
var menu_group = container.append("g")
.attr("class", "menu_group");

// ----------------------------------------------------------
// create group for gfx - translate the group for margin top, left
var gfx_group = container.append("g")
.attr("class", "gfx_group")
;
// create sub-group for diagram_1
var gfx_diagram_1 = gfx_group.append("g")
.attr("class", "gfx_diagram_1")
.attr("transform", `translate(${margin}, ${margin})`);
;
// create sub-group for gfx button
var gfx_button = gfx_group.append("g")
.attr("class", "gfx_button")
;

// ----------------------------------------------------------
// create group for text
var text_group = container.append("g")
.attr("class", "text_group");




// ----------------------------------------------------------
// MENU -----------------------------------------------------
// ----------------------------------------------------------
//create menu button text
var button = menu_group.selectAll(".menu_button")
.data(data_button)
.enter()
.append("text")
.attr("class", "menu_button_text")
.attr("text-anchor", "start")
.attr("x", function (d) { return d.position; })
.attr("y", 80)
.text( function (d) { return d.term; })

// create gfx rect behind each menu button text
.each(function(d){
var bbox = this.getBBox();
menu_group.insert("rect","text")
.attr("class", "menu_button_rect")
.attr("x", bbox.x -5)
.attr("y", bbox.y -5)
.attr("width", 10 + bbox.width)
.attr("height", 10 + bbox.height)
.style("fill", "#fff");
})

// create gfx rect active on top of menu button text
.each(function(d){
var bbox = this.getBBox();
menu_group.insert("rect")
.attr("class", "menu_button_active")
.attr("x", bbox.x -5)
.attr("y", bbox.y -5)
.attr("width", 10 + bbox.width)
.attr("height", 10 + bbox.height)
.attr('opacity', 0);
});

// give id to button rect
d3.selectAll(".menu_button_rect")
.data(data_button)
.attr("id", function (d) { return d.term + "_r";  });

// give id to button active
d3.selectAll(".menu_button_active")
.data(data_button)
.attr("id", function (d) { return d.term + "_a";  });

// ----------------------------------------------------------

// Menu "views"
d3.select("#views_r")
.style("fill", "#777");

// Menu "subscriptions"
d3.select("#subscriptions_a")
// enter
.on("mouseenter", function () {
d3.select("#views_r").style("fill", "#fff");
d3.select("#subscriptions_r").style("fill", "#777");
//d3.select(".gfx_diagram_1").attr('opacity', 0);
})
// leave
.on("mouseleave", function () {
d3.select("#views_r").style("fill", "#777");
d3.select("#subscriptions_r").style("fill", "#fff");
//d3.select(".gfx_diagram_1").attr('opacity', 100);
});

// Menu "views"
d3.select("#uploads_a")
// enter
.on("mouseenter", function () {
d3.select("#views_r").style("fill", "#fff");
d3.select("#uploads_r").style("fill", "#777");
//d3.select(".gfx_diagram_1").attr('opacity', 0);
})
// leave
.on("mouseleave", function () {
d3.select("#views_r").style("fill", "#777");
d3.select("#uploads_r").style("fill", "#fff");
//d3.select(".gfx_diagram_1").attr('opacity', 100);
});


// ----------------------------------------------------------
// GFX ------------------------------------------------------
// ----------------------------------------------------------

// LAYOUT  -----------------------------------------------

// set up scales
// Y
var yScale = d3.scaleBand()
.domain(data_input.map((s) => s.term))
.range([0 + data_set.limit_top, height - data_set.limit_bottom])
.paddingInner(data_set.padding);
// X
var xScale_1 = d3.scaleLinear()
.range([0, width])
.domain([0, data_set.domain_max_1]);

// link data input to create gfx bars
var gfx_bar = gfx_diagram_1.selectAll()
.data(data_input)
.enter()
.append("g")
.attr("class", "gfx_bar");

// set gfx bars attributes
gfx_bar.append("rect")
.attr("class", "gfx_bar_rect")
.attr("y", function(d) {return yScale(d.term);})
.attr("height", yScale.bandwidth())
.attr("width", (d) => xScale_1(d.value_1))
.style("fill", "#fff");

// set gfx bars term text
gfx_bar.append("text")
.attr("class", "gfx_bar_term")
.attr("y", function(d) {return yScale(d.term) -10;})
.attr("text-anchor", "start")
.text((a) => `${a.term}`);

// set gfx bars value text
gfx_bar.append("text")
.attr("class", "gfx_bar_value")
.attr("x", (d) => xScale_1(d.value_1) - 5)
.attr("y", function(d) {return 20 + yScale(d.term);})
.attr("text-anchor", "end")
.text((a) => `${a.value_1} Mrd.`);

// set layout strokes
gfx_bar.append("rect")
.attr("class", "gfx_bar_stroke")
.attr("x", -20)
.attr("y", function(d) {return yScale(d.term) - 40;})
.attr("height", 1)
.attr("width", 540)
.style("fill", "#000");












// ----------------------------------------------------------
// TEXT -----------------------------------------------------
// ----------------------------------------------------------

// create text "headline"
var text_headline = text_group.append("text")
.attr("class", "text_headline")
.attr("x", 20)
.attr("y", 40)
.text("Kids channels on YouTube")
.style("fill", data_set.color_text);

// create text "source"
var text_source = text_group.append("text")
.attr("class", "text_source")
.attr("x", 520)
.attr("y", 520)
.attr("text-anchor", "end")
.text("Source: Social Blade, October 16, 2018")
.style("fill", data_set.color_text);

















//
