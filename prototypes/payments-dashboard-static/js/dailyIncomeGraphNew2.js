var d3 = require("./lib/d3.js");

var dataset = [
                ["12AM", 200],["4AM", 1600], ["8AM", 1100], ["4PM", 1400]
              ];


var graphTopPadding = 20;
var graphBottomPadding = 50;
var xAxisPadding = [0, 20, 20, 20];

//Chart settings
var graphWidth = 440;
var graphHeight = 300 + graphTopPadding;


var xScale = d3.scale.ordinal()
                     .domain(["12AM", "4AM", "8AM", "12PM", "4PM", "8PM" ])
                     .rangeBands([ 0, (graphWidth - (xAxisPadding[1] + xAxisPadding[3]) ) ]);

var yScale = d3.scale.linear()
                     .domain([100, d3.max(dataset, function(d) { return d[1] })])
                     .range([graphHeight - graphTopPadding - graphBottomPadding, 1]);


var yGrid = d3.svg.axis()
                  .scale(yScale)
                  .orient("right")
                  .tickSize(graphWidth)
                  .tickFormat("")
                  .ticks(3);

var xAxis = d3.svg.axis()
                  .scale(xScale)
                  .ticks(4)
                  .orient("top");

var yAxis = d3.svg.axis()
                  .scale(yScale)
                  .orient("left")
                  .tickFormat(d3.format(".0f"))
                  .ticks(3);

//Draw
var svg = d3.select(".graph--daily-income-graph .graph__data-visualisation")
						.append("svg")
						.attr("width", graphWidth)
						.attr("height", graphHeight);

var line = d3.svg.line()
                 .x(function(d) { return xScale(d[0]) })
                 .y(function(d) { return yScale(d[1]) })
                 .interpolate("bundle");

var area = d3.svg.area()
                 .x(function(d) { return xScale(d[0]) })
                 .y0(graphHeight)
                 .y1(function(d) { return yScale(d[1]) })
                 .interpolate("bundle");

svg.datum(dataset);


//Add clippath for the grid
svg.append("clipPath")
   .attr("id", "gridClip")
   .append("rect")
   .attr("width", graphWidth - 80)
   .attr("height", graphHeight - 70);

//Draw graph
svg.append("path")
   .attr("class", "graph__area")
   .attr("d", area);

svg.append("path")
   .attr("class", "graph__line")
   .attr("d", line);

//Draw grid
svg.append("g")
   .attr("class", "graph__grid graph__grid--y")
   .attr("clip-path", "url(#gridClip)")
   .attr("transform", "translate(0, " + graphTopPadding + ")")
   .style("text-anchor", "end")
   .call(yGrid);

//Draw axes
svg.append("g")
   .attr("class", "graph__axis graph__axis--x")
   .attr("transform", "translate(" + xAxisPadding[3] + ", " + (graphHeight - xAxisPadding[2]) + ")")
   .call(xAxis);

svg.append("g")
   .attr("class", "graph__axis graph__axis--y")
   .attr("transform", "translate(" + (graphWidth - xAxisPadding[1]) + ", " + (xAxisPadding[0] + graphTopPadding) + ")")
   .style("text-anchor", "end")
   .call(yAxis);
