var d3 = require("./lib/d3.js");
var dataset = [
                {
                  week: "7–13 DEC",
                  data: [[0, 940], [0, 100], [0, 940], [0, 1300], [0, 1100], [0, 1300] ]
                },

                {
                  week: "14–20 DEC",
                  data: [[0, 940], [0, 100], [0, 940], [0, 1300], [0, 1100], [0, 1300] ]
                },

                {
                  week: "21–27 DEC",
                  data: [[0, 940], [0, 100], [0, 940], [0, 1300], [0, 1100], [0, 1300] ]
                }
              ];

var graphContainer = ".graph--weekly-income-graph";
var graphContainerInner = graphContainer + " .graph__data-visualisation";

var interpolation = "basis";

var graphTopPadding = 20;
var graphBottomPadding = 50;
var graphRightPadding = 50;
var xAxisPadding = [0, 20, 20, 0];

//Chart settings
var graphWidth = 440;
var graphHeight = 380 + graphTopPadding;


var xGroupScale = d3.scale.ordinal()
                          .domain(dataset.map(function(d) { return d.week }))
                          .rangeRoundBands([0, graphWidth-graphRightPadding], .1);

var xBarScale = d3.scale.ordinal()
                        .domain(dataset.map(function(d) { return d.data }))
                        .rangeRoundBands([0, xGroupScale.rangeBand()]);

var yScale = d3.scale.linear()
                     .domain([100, d3.max(dataset, function(d) {
                       return d3.max(function(i){
                         console.log(i);
                         return i[0]
                       });
                     })])
                     .range([graphHeight - graphTopPadding - graphBottomPadding, 1]);

var yGrid = d3.svg.axis()
                  .scale(yScale)
                  .orient("right")
                  .tickSize(graphWidth)
                  .tickFormat("")
                  .ticks(3);

var xAxis = d3.svg.axis()
                  .scale(xGroupScale)
                  .ticks(4)
                  .orient("top");

var yAxis = d3.svg.axis()
                  .scale(yScale)
                  .orient("left")
                  .tickFormat(d3.format(".0f"))
                  .ticks(3);


var svg = d3.select(graphContainerInner)
						.append("svg")
						.attr("width", graphWidth)
						.attr("height", graphHeight);

var week = svg.selectAll(".graph__week")
              .data(dataset)
              .enter()
              .append("g")
              .attr("class", "graph__week")
              .attr("transform", function(d) { return "translate(" + xGroupScale(d.week) + "," + graphHeight + ")"; });
/*
week.selectAll("rect")
    .data(function(d) { return d.data; })
    .enter()
    .append("rect")
    .attr("width", xBarScale.rangeBand())
    .attr("x", function(d) { return xBarScale(d.data); })
    .attr("y", function(d) { return yScale(d.value); })
    .attr("height", function(d) { return height - y(d.value); })
    .style("fill", function(d) { return color(d.name); });
*/

//Add clippath for the grid
svg.append("clipPath")
   .attr("id", "gridClip")
   .append("rect")
   .attr("width", graphWidth - 70)
   .attr("height", graphHeight - 70);

svg.append("g")
  .attr("class", "graph__axis graph__axis--x")
  .attr("transform", "translate(" + xAxisPadding[3] + ", " + (graphHeight - xAxisPadding[2]) + ")")
  .call(xAxis);

svg.append("g")
  .attr("class", "graph__axis graph__axis--y")
  .attr("transform", "translate(" + (graphWidth - xAxisPadding[1]) + ", " + (xAxisPadding[0] + graphTopPadding) + ")")
  .style("text-anchor", "end")
  .call(yAxis);

//Draw grid
svg.append("g")
   .attr("class", "graph__grid graph__grid--y")
   .attr("clip-path", "url(#gridClip)")
   .attr("transform", "translate(0, " + graphTopPadding + ")")
   .style("text-anchor", "end")
   .call(yGrid);
