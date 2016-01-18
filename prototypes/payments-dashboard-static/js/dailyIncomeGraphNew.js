var d3 = require("./lib/d3.js");

var dataset = [
                [-3, 200],[0.5, 1500], [0.8, 1100], [1.2, 1400], [1.4, 500],
                [1.5, 1370], [1.7, 1300], [1.9, 900], [2.2, 1500]
              ];

//Chart settings
var graphWidth = 440;
var graphHeight = 320;
var padding = [30, 30, 30, 30];


var xScale = d3.scale.linear()
                     .domain([0,d3.max(dataset,function(d){return d[0] + 1})])
                     .range([padding[3], graphWidth - (padding[1] + padding[3])]);

var yScale = d3.scale.linear()
                     .domain([10, d3.max(dataset, function(d) { return d[1] + 500; })])
                     .range([graphHeight-padding[0], 1]);

var xGrid = d3.svg.axis()
                  .scale(xScale)
                  .ticks(4)
                  .tickSize(graphHeight)
                  .tickFormat("")
                  .orient("bottom");

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

//Add clippath for the graph
svg.append("clipPath")
   .attr("id", "graphClip")
   .append("rect")
   .attr("width", graphWidth-60)
   .attr("height", graphHeight);

//Add clippath for the grid
svg.append("clipPath")
   .attr("id", "gridClip")
   .append("rect")
   .attr("width", graphWidth - 80)
   .attr("height", graphHeight - 70);

//Draw graph
svg.append("path")
   .attr("class", "graph__area")
   .attr("clip-path", "url(#graphClip)")
   .attr("d", area);

svg.append("path")
   .attr("class", "graph__line")
   .attr("clip-path", "url(#graphClip)")
   .attr("d", line);

//Draw grid
svg.append("g")
   .attr("class", "graph__grid graph__grid--x")
   .attr("clip-path", "url(#gridClip)")
   .attr("transform", "translate(" + (padding[3]) + ", " + padding[0] + ")")
   .call(xGrid);

svg.append("g")
   .attr("class", "graph__grid graph__grid--y")
   .attr("clip-path", "url(#gridClip)")
   .attr("transform", "translate(" + (padding[3]) + ", " + (padding[0]) + ")")
   .style("text-anchor", "end")
   .call(yGrid);

//Draw axes
svg.append("g")
   .attr("class", "graph__axis graph__axis--x")
   .attr("transform", "translate(" + (padding[3]) + ", " + (graphHeight - 15) + ")")
   .call(xAxis);

svg.append("g")
   .attr("class", "graph__axis graph__axis--y")
   .attr("transform", "translate(" + (graphWidth - padding[1]) + ", " + padding[0] + ")")
   .style("text-anchor", "end")
   .call(yAxis);
