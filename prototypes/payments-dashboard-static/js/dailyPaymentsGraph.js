var d3 = require("./lib/d3.js");
var dataset = [
                ["2015-12-27", 7],

                ["2015-12-28", 3],
                ["2015-12-29", 4],
                ["2015-12-30", 6],
                ["2015-12-31", 12],
                ["2016-01-01", 4],
                ["2016-01-02", 11],
                ["2016-01-03", 7],

                ["2016-01-04", 12],
                ["2016-01-05", 8],
                ["2016-01-06", 12],
                ["2016-01-07", 4]
              ];

var graphContainer = ".graph--daily-payments-graph";
var graphContainerInner = graphContainer + " .graph__data-visualisation";

var interpolation = "linear";
var parseTime = d3.time.format.utc("%Y-%m-%d").parse;
var bisectDate = d3.bisector(function(d) { return parseTime(d[0]) }).left;

var beginningOfLastWeek = parseTime("2015-12-28");
var endOfLastWeek = parseTime("2016-01-03");

var beginningOfCurrentWeek = parseTime("2016-01-04");
var endOfCurrentWeek = parseTime("2016-01-10");

var graphPadding = {top: 20, right: 40, bottom: 0, left: 20};
var axesPadding = {top: 0, right: 40, bottom: 20, left: 0};

var graphTopPadding = 20;
var graphBottomPadding = 50;
var xAxisPadding = [0, 20, 20, 50];

//Chart settings
var graphWidth = 440;
var graphHeight = 300 + graphTopPadding;


var xScale = d3.time.scale.utc()
                          .domain([beginningOfCurrentWeek, endOfCurrentWeek])
                          .range([graphPadding.left, graphWidth - graphPadding.left - graphPadding.right])

var yScale = d3.scale.linear()
                     .domain([0, d3.max(dataset, function(d) { return d[1] + 10 })])
                     .range([graphHeight - graphTopPadding - graphBottomPadding, 1]);

var initialYScale = d3.scale.linear()
                      .domain([0, d3.max(dataset, function(d) { return d[1] + 10 })])
                      .range([graphHeight, graphHeight]);

var yGrid = d3.svg.axis()
                  .scale(yScale)
                  .orient("right")
                  .tickSize(graphWidth)
                  .tickFormat("")
                  .ticks(5);

var xAxis = d3.svg.axis()
                  .scale(xScale)
                  .ticks(7)
                  .tickFormat(d3.time.format.utc("%a"))
                  .orient("top");

var yAxis = d3.svg.axis()
                  .scale(yScale)
                  .orient("left")
                  .tickFormat(d3.format(".0f"))
                  .ticks(5);

var svg = d3.select(graphContainerInner)
						.append("svg")
						.attr("width", graphWidth)
						.attr("height", graphHeight);

var area = d3.svg.area()
                 .x(function(d) { return xScale(parseTime(d[0])) })
                 .y0(graphHeight)
                 .y1(function(d) { return initialYScale(d[1]) })
                 .interpolate(interpolation);

var line = d3.svg.line()
                 .x(function(d) { return xScale(parseTime(d[0])) })
                 .y(function(d) { return initialYScale(d[1]) })
                 .interpolate(interpolation);

//Draw grid
svg.append("g")
   .attr("class", "graph__grid graph__grid--y")
   .attr("clip-path", "url(#dailyPaymentsGridClip)")
   .attr("transform", "translate(0, " + 0 + ")")
   .style("text-anchor", "end")
   .call(yGrid);

//Draw area
var graphArea = svg.append("path")
                    .attr("class", "graph__area")
                    .datum(dataset)
                    .attr("transform", "translate(" + graphPadding.left + ", 0)")
                    .attr("d", area);

//Draw line
var graphLine = svg.append("path")
                    .attr("class", "graph__line")
                    .datum(dataset)
                    .attr("transform", "translate(" + graphPadding.left + ", 0)")
                    .attr("d", line);

//Add points
var circles = svg.append("g")
                 .attr("class", "graph__circles")
                 .attr("width", graphWidth)
                 .attr("height", graphHeight);

dataset.forEach(function(d, i) {
  circles.append("circle")
          .attr("class", "graph__circle")
          .attr("transform", "translate(0, -40)")
          .attr("opacity", "0")
          .datum(d)
          .attr("cx", function(d) {return (xScale(parseTime(d[0])) + graphPadding.left) })
          .attr("cy", function(d) {return yScale(d[1])})
          .transition()
          .duration(750)
          .delay(60 * i)
          .attr("transform", "translate(0, 0)")
          .attr("opacity", "1")
          .attr("r", 6);
});

//Add tooltips
var focus = svg.append("g")
     .attr("class", "graph__focus")
     .style("opacity", 0)
     .attr("transform", "translate(-10, -10)");

focus.append("circle")
    .attr("r", 6.2)
    .attr("cx", 0)
    .attr("cy", 0)

var focusRect = focus.append("rect")
     .attr("x", -20)
     .attr("y", -40)
     .attr("rx", 16)
     .attr("ry", 16)
     .attr("width", 40)
     .attr("height", 30)
     .attr("fill", "#6DCAF6");

focus.append("text")
     .attr("x", 0)
     .attr("y", -25)
     .attr("fill", "white")
     .attr("text-anchor", "middle")
     .attr("dy", ".35em");

//Add clippath for the grid
svg.append("clipPath")
   .attr("id", "dailyPaymentsGridClip")
   .append("rect")
   .attr("width", graphWidth - 70)
   .attr("height", graphHeight - 70);

var graphAxisX = svg.append("g")
  .attr("class", "graph__axis graph__axis--x")
  .attr("transform", "translate(" + graphPadding.left + ", " + (graphHeight - xAxisPadding[2]) + ")")
  .call(xAxis);

var graphAxisy = svg.append("g")
  .attr("class", "graph__axis graph__axis--y")
  .attr("transform", "translate(" + (graphWidth - xAxisPadding[1]) + ", " + (0) + ")")
  .style("text-anchor", "end")
  .call(yAxis);

//Register Events
svg.on("mouseover", function() {focus.style("opacity", 1)})
  .on("mouseout", mouseOut)
  .on("mousemove", mouseMove);

d3.selectAll(graphContainer + " .data-swither")
  .on("click", function(){
    var currentFlagClassName = "data-swither--active";
    var elems = document.querySelectorAll(graphContainer + " .data-swither.data-swither--active");
    [].forEach.call(elems, function(el) {
        el.classList.remove(currentFlagClassName);
    });
    this.classList.add(currentFlagClassName);
    var direction = this.getAttribute("data-direction");
    moveGraph(direction);
  });

//Event handlers
//Draw graph with animation
setTimeout(drawGraph, 0);
function drawGraph() {
    initialYScale.range([graphHeight - graphTopPadding - graphBottomPadding, 1]);
    graphArea.transition().duration(750).attr("d", area);
    graphLine.transition().duration(750).attr("d", line);
}


function mouseMove() {
  var m = d3.mouse(this);

  var x0 = xScale.invert(m[0]-graphPadding.left);
  var i = bisectDate(dataset, x0, 1);
  var d0 = dataset[i - 1];
  var d1 = dataset[i];
  if(!d0 || !d1) return;
  var d = x0 - parseTime(d0[0]) > parseTime(d1[0]) - x0 ? d1 : d0;

  focus.transition()
    .ease("linear")
    .duration(100)
    .attr("transform", "translate(" + (xScale(parseTime(d[0]))+graphPadding.left) + "," + yScale(d[1]) + ")");
  focus.select("text").text(d[1]);
}

function mouseOut() {
  focus.style("opacity", 0);
  return;
}


//Update graph on swither click with animation
var currentPosition = "today";
function moveGraph(direction) {
  if(direction == currentPosition) return;
  if (direction == "yesterday") {
    xScale.domain([beginningOfLastWeek, endOfLastWeek])
    currentPosition = "yesterday";
  } else {
    xScale.domain([beginningOfCurrentWeek, endOfCurrentWeek])
    currentPosition = "today";
  }

  graphAxisX.transition().duration(750).call(xAxis);
  graphArea.transition().duration(750).attr("d", area);
  graphLine.transition().duration(750).attr("d", line);

  var t = svg.transition().duration(750);
  t.selectAll(graphContainer + " .graph__circle")
   .attr("cx", function(d) {return (xScale(parseTime(d[0])) + graphPadding.left) })
   .attr("cy", function(d) {return yScale(d[1])})

  return;
}
