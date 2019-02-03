// ----------------------------------------------------------
// DATA -----------------------------------------------------
// ----------------------------------------------------------
var data_set_066 =
{
container_width: 540,
container_height: 540,
margin: 20,
center_x: 250,
center_y: 270,
centroid_extend: 2.65,
map_width: 540,
map_height: 540,
// ----------------------------------------------------------
position_headline: 25,
position_source: 500,
position_menu: 480,
// ----------------------------------------------------------
text_headline_1: "Monthly Active Users 2018",
text_headline_2: "Monthly Active Users 2013",
text_headline_switch: 0,
text_subheadline: "In millions",
text_source: "Source: Statista 2018, Company press releases 2013",
// ----------------------------------------------------------
color_bg: "#f9f4ef",
color_layout_stroke: "#f2e8df",
// pie
color_pie_1: "#796dd5",
color_pie_2: "#a399e7",
color_pie_3: "#ff8e4b",
color_pie_display: "#2e2f33",
color_pie_value: "#2e2f33",
color_pie_selected: "#da5404",
// text
color_text_headline: "#2e2f33",
color_text_source: "#e4cfbb"
};




// ----------------------------------------------------------
// STRUCTURE ------------------------------------------------
// ----------------------------------------------------------

// create container for svg content
var container_066 = d3.select("#canvas_066").append("svg")
.attr("width", data_set_066.container_width)
.attr("height", data_set_066.container_height)
.attr("class", "canvas")
//.style("border", "1px solid black")
.style("background-color", data_set_066.color_bg);
// set up margin
var margin_066 = data_set_066.margin;
var width_066 = data_set_066.container_width - 2 * margin_066;
var height_066 = data_set_066.container_height - 2 * margin_066;
// ----------------------------------------------------------
// create group for layout
var layout_group_066 = container_066.append("g")
.attr("class", "layout_group");
// ----------------------------------------------------------
// create container for scaling
var container_margin_066 = container_066.append("g")
.attr("class", "canvas_margin")
.attr("transform", `translate(${margin_066}, ${margin_066})`);
// ----------------------------------------------------------
// create group for gfx - translate the group for margin top, left
var gfx_group_066 = container_margin_066.append("g")
.attr("transform", "translate(" + data_set_066.center_x + "," + data_set_066.center_y + ")")
.attr("class", "gfx_group");
// create sub-groups for layers
var gfx_layer_0_066 = gfx_group_066.append("g")
.attr("class", "gfx_layer_0");
var gfx_layer_1_066 = gfx_group_066.append("g")
// reposition pie display and value
.attr("class", "gfx_layer_1");
// ----------------------------------------------------------
// create group for text
var text_group_066 = container_margin_066.append("g")
.attr("class", "text_group");




// ----------------------------------------------------------
// LAYOUT ---------------------------------------------------
// ----------------------------------------------------------
// set layout strokes
layout_group_066.append("rect")
.attr("class", "gfx_bar_stroke")
.attr("x", 20)
.attr("y", data_set_066.position_headline + 35)
.attr("height", 2)
.attr("width", 500)
.style("fill", data_set_066.color_layout_stroke);

layout_group_066.append("rect")
.attr("class", "gfx_bar_stroke")
.attr("x", 20)
.attr("y", data_set_066.position_source + 30)
.attr("height", 2)
.attr("width", 500)
.style("fill", data_set_066.color_layout_stroke);







// The svg
//var svg = d3.select("#canvas_066").append("svg"),
  //width = +svg.attr("width"),
  //height = +svg.attr("height");

// Map and projection
var path = d3.geoPath();
var projection = d3.geoVanDerGrinten3()
.scale(90)
.center([0,0])
.translate([-10,50]);



// Data and color scale
var data = d3.map();
var colorScale = d3.scaleThreshold()
  .domain([21, 25, 59, 72, 121])
  .range(["#f2e8df", "#ffc19c", "#ffa46f", "#ff8e4b", "#ff7625", "#da5404"])
;

// Load external data and boot
d3.queue()
  .defer(d3.json, "static/viz/066/world.geojson")
  .defer(d3.csv, "static/viz/066/world_population.csv", function(d) { data.set(d.code, +d.pop); })
  .await(ready);

function ready(error, topo) {

  // Draw the map
  gfx_layer_1_066.append("g")
    .selectAll("path")
    .data(topo.features)
    .enter()
    .append("path")
      // draw each country
      .attr("d", d3.geoPath()
        .projection(projection)
      )
      // set the color of each country
      .attr("fill", function (d) {
        d.total = data.get(d.id) || 0;
        return colorScale(d.total);
      });
    }




// ----------------------------------------------------------
// TEXT -----------------------------------------------------
// ----------------------------------------------------------


// create text "headline"
var text_headline_066 = text_group_066.append("text")
.attr("class", "text_headline")
.attr("y", data_set_066.position_headline)
.text(data_set_066.text_headline_1)
.style("fill", data_set_066.color_text_headline);
// create text "subheadline"
var text_subheadline_066 = text_group_066.append("text")
.attr("class", "text_subheadline")
.attr("x", 500)
.attr("y", data_set_066.position_headline)
.attr("text-anchor", "end")
.text(data_set_066.text_subheadline)
.style("fill", data_set_066.color_text_headline);
// create text "source"
var text_source_066 = text_group_066.append("text")
.attr("class", "text_source")
.attr("x", 500)
.attr("y", data_set_066.position_source)
.attr("text-anchor", "end")
.text(data_set_066.text_source)
.style("fill", data_set_066.color_text_source);




//
