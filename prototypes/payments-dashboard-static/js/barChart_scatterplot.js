var d3 = require("./lib/d3.js");
var dataset = [
                [5, 20], [480, 90], [250, 50], [100, 33], [330, 95],
                [410, 12], [475, 44], [25, 67], [85, 21], [220, 88]
              ];

//Chart settings
var graphWidth = 440;
var graphHeight = 300;
var padding = [0, 20, 20, 0];

var xScale = d3.scale.linear()
                     .domain([0, d3.max(dataset, function(d) { return d[0]; })])
                     .range([0, graphWidth]);

var yScale = d3.scale.linear()
                     .domain([0, d3.max(dataset, function(d) { return d[1]; })])
                     .range([0, graphHeight]);

var xAxis = d3.svg.axis()
                  .scale(xScale)
                  .ticks(5)
                  .orient("top");

var yAxis = d3.svg.axis()
                  .scale(yScale)
                  .orient("left")
                  .ticks(5);

//Draw chart
var svg = d3.select(".graph__data-visualisation")
						.append("svg")
						.attr("width", graphWidth)
						.attr("height", graphHeight);

svg.selectAll("circle")
   .data(dataset)
   .enter()
   .append("circle")
   .attr("cx", function(d) {
   		return xScale(d[0]);
   })
   .attr("cy", function(d) {
   		return yScale(d[1]);
   })
   .attr("r", function(d) {
   		return 2;
   });

//Draw axes
svg.append("g")
   .attr("class", "graph__axis")
   .attr("transform", "translate(0, " + graphHeight + ")")
   .call(xAxis);

svg.append("g")
   .attr("class", "graph__axis")
   .attr("transform", "translate(" + graphWidth + ",0)")
   .call(yAxis);
