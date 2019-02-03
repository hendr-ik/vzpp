
// given data
var data_input = [ "entry 1", "entry 2", "entry 3" ]

// create p elements from data points
var container = d3.select("#canvas").selectAll("p")
.data(data_input)
.enter()
.append("p")

// fill text field with data d and i
.text(function (d,i) {
  return i + " - " + d;
});
