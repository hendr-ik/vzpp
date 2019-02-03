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
domain_max_1: 15.6,
domain_max_2: 20.3,
domain_max_3: 2968,
color_svg: "#ddd",
color_text: "#000"
};

var data_menu = [
{
term: "views",
position: 10
},
{
term: "subscriptions",
position: 90
},
{
term: "uploads",
position: 246
}
];

var data_input = [
{
term: "Nickelodeon",
value_1: 2.8, display_1: "2,8 Mrd.",
value_2: 4.7, display_2: "4,7 Mio.",
value_3: 2970, display_3: "2.970"
},
{
term: "Sesame Street",
value_1: 5.4, display_1: "5,4 Mrd.",
value_2: 4.2, display_2: "4,2 Mio.",
value_3: 2610, display_3: "2.610"
},
{
term: "ChuChu TV",
value_1: 15.6, display_1: "15,6 Mrd.",
value_2: 20.3, display_2: "20,3 Mio.",
value_3: 260, display_3: "260"
},
{
term: "BillionSurpriseToys",
value_1: 5.6, display_1: "5,6 Mrd.",
value_2: 17.7, display_2: "17,7 Mio.",
value_3: 230, display_3: "230"
},
{
term: "LooLoo Kids",
value_1: 4.7, display_1: "4,7 Mrd.",
value_2: 11.7, display_2: "11,7 Mio.",
value_3: 510, display_3: "510"
}
];




// ----------------------------------------------------------
// STRUCTURE ------------------------------------------------
// ----------------------------------------------------------

// create container for svg content
var container = d3.select("#canvas").append("svg")
.attr("width", data_set.container_width)
.attr("height", data_set.container_height)
.style("background-color", data_set.color_svg);

// set up margin
var margin = data_set.margin;
var width = data_set.container_width - 2 * margin;
var height = data_set.container_height - 2 * margin;
// create container for scaling
var container_margin = container.append("g")
.attr("class", "container_margin")
.attr("transform", `translate(${margin}, ${margin})`)
;
// ----------------------------------------------------------
// create group for menu
var menu_group = container_margin.append("g")
.attr("class", "menu_group")
;
// ----------------------------------------------------------
// create group for layout
var layout_group = container.append("g")
.attr("class", "layout_group")
;
// ----------------------------------------------------------
// create group for gfx - translate the group for margin top, left
var gfx_group = container_margin.append("g")
.attr("class", "gfx_group")
;
// create sub-group for diagram_1
var gfx_diagram_1 = gfx_group.append("g")
.attr("class", "gfx_diagram_1")
;
// create sub-group for diagram_2
var gfx_diagram_2 = gfx_group.append("g")
.attr("class", "gfx_diagram_2")
;
// create sub-group for diagram_3
var gfx_diagram_3 = gfx_group.append("g")
.attr("class", "gfx_diagram_3")
;
// ----------------------------------------------------------
// create group for text
var text_group = container_margin.append("g")
.attr("class", "text_group")
;




// ----------------------------------------------------------
// MENU -----------------------------------------------------
// ----------------------------------------------------------
//create menu button text
var button = menu_group.selectAll(".menu_button")
.data(data_menu)
.enter()
.append("text")
.attr("class", "menu_button_text")
.attr("text-anchor", "start")
.attr("x", function (d) { return d.position; })
.attr("y", 60)
.text( function (d) { return d.term; })

// create gfx rect behind each menu button text
.each(function(d){
var bbox = this.getBBox();
menu_group.insert("rect","text")
.attr("class", "menu_button_rect")
.attr("x", bbox.x -10)
.attr("y", bbox.y -5)
.attr("width", 20 + bbox.width)
.attr("height", 10 + bbox.height)
.style("fill", "#fff");
})

// create gfx rect active on top of menu button text
.each(function(d){
var bbox = this.getBBox();
menu_group.insert("rect")
.attr("class", "menu_button_active")
.attr("x", bbox.x -13)
.attr("y", bbox.y -5)
.attr("width", 26 + bbox.width)
.attr("height", 10 + bbox.height)
.attr('opacity', 0);
});

// give id to button rect
d3.selectAll(".menu_button_rect")
.data(data_menu)
.attr("id", function (d) { return d.term + "_r";  });

// give id to button active
d3.selectAll(".menu_button_active")
.data(data_menu)
.attr("id", function (d) { return d.term + "_a";  });

// ----------------------------------------------------------

// Menu "views"
d3.select("#views_r")
.style("fill", "#777");
d3.select(".gfx_diagram_1").attr('opacity', 100);
d3.select(".gfx_diagram_2").attr('opacity', 0);
d3.select(".gfx_diagram_3").attr('opacity', 0);

// Menu "subscriptions"
d3.select("#subscriptions_a")
// enter
.on("mouseenter", function () {
d3.select("#views_r").style("fill", "#fff");
d3.select("#subscriptions_r").style("fill", "#777");
d3.select(".gfx_diagram_1").attr('opacity', 0);
d3.select(".gfx_diagram_2").attr('opacity', 100);
})
// leave
.on("mouseleave", function () {
d3.select("#views_r").style("fill", "#777");
d3.select("#subscriptions_r").style("fill", "#fff");
d3.select(".gfx_diagram_1").attr('opacity', 100);
d3.select(".gfx_diagram_2").attr('opacity', 0);
});

// Menu "views"
d3.select("#uploads_a")
// enter
.on("mouseenter", function () {
d3.select("#views_r").style("fill", "#fff");
d3.select("#uploads_r").style("fill", "#777");
d3.select(".gfx_diagram_1").attr('opacity', 0);
d3.select(".gfx_diagram_3").attr('opacity', 100);
})
// leave
.on("mouseleave", function () {
d3.select("#views_r").style("fill", "#777");
d3.select("#uploads_r").style("fill", "#fff");
d3.select(".gfx_diagram_1").attr('opacity', 100);
d3.select(".gfx_diagram_3").attr('opacity', 0);
});


// ----------------------------------------------------------
// GFX ------------------------------------------------------
// ----------------------------------------------------------

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

var xScale_2 = d3.scaleLinear()
.range([0, width])
.domain([0, data_set.domain_max_2]);

var xScale_3 = d3.scaleLinear()
.range([0, width])
.domain([0, data_set.domain_max_3]);


// LAYOUT  -----------------------------------------------
// link data input to create layout
var gfx_layout = layout_group.selectAll()
.data(data_input)
.enter()
.append("g")
.attr("class", "gfx_layout");

// set gfx bars term text
gfx_layout.append("text")
.attr("class", "gfx_bar_term")
.attr("x", 20)
.attr("y", function(d) {return yScale(d.term) + 10;})
.attr("text-anchor", "start")
.text((a) => `${a.term}`);

// set layout strokes
gfx_layout.append("rect")
.attr("class", "gfx_bar_stroke")
.attr("y", function(d) {return yScale(d.term) - 20;})
.attr("height", 1)
.attr("width", 540)
.style("fill", "#000");



// DIAGRAM 1  ---------------------------------------------
// create diagram 1
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

// set gfx bars value text
gfx_bar.append("text")
.attr("class", "gfx_bar_value")
.attr("x", (d) => xScale_1(d.value_1) - 5)
.attr("y", function(d) {return 20 + yScale(d.term);})
.attr("text-anchor", "end")
.text(function(d) {return d.display_1;});


// DIAGRAM 2  ---------------------------------------------
// create diagram 2
var gfx_bar = gfx_diagram_2.selectAll()
.data(data_input)
.enter()
.append("g")
.attr("class", "gfx_bar");

// set gfx bars attributes
gfx_bar.append("rect")
.attr("class", "gfx_bar_rect")
.attr("y", function(d) {return yScale(d.term);})
.attr("height", yScale.bandwidth())
.attr("width", (d) => xScale_2(d.value_2))
.style("fill", "#fff");

// set gfx bars value text
gfx_bar.append("text")
.attr("class", "gfx_bar_value")
.attr("x", (d) => xScale_2(d.value_2) - 5)
.attr("y", function(d) {return 20 + yScale(d.term);})
.attr("text-anchor", "end")
.text(function(d) {return d.display_2;});


// DIAGRAM 3  ---------------------------------------------
// create diagram 3
var gfx_bar = gfx_diagram_3.selectAll()
.data(data_input)
.enter()
.append("g")
.attr("class", "gfx_bar");

// set gfx bars attributes
gfx_bar.append("rect")
.attr("class", "gfx_bar_rect")
.attr("y", function(d) {return yScale(d.term);})
.attr("height", yScale.bandwidth())
.attr("width", (d) => xScale_3(d.value_3))
.style("fill", "#fff");

// set gfx bars value text
gfx_bar.append("text")
.attr("class", "gfx_bar_value")
.attr("x", (d) => xScale_3(d.value_3) - 5)
.attr("y", function(d) {return 20 + yScale(d.term);})
.attr("text-anchor", "end")
.text(function(d) {return d.display_3;});












// ----------------------------------------------------------
// TEXT -----------------------------------------------------
// ----------------------------------------------------------

// create text "headline"
var text_headline = text_group.append("text")
.attr("class", "text_headline")
.attr("y", 20)
.text("Kids channels on YouTube")
.style("fill", data_set.color_text);

// create text "source"
var text_source = text_group.append("text")
.attr("class", "text_source")
.attr("x", 500)
.attr("y", 500)
.attr("text-anchor", "end")
.text("Source: Social Blade, October 16, 2018")
.style("fill", data_set.color_text);

















//
