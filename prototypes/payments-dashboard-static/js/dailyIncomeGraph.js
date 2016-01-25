var d3 = require("./lib/d3.js");
var dataset = [
                ["2015-12-31 02:02", 1000],
                ["2016-01-01 03:44", 900],
                ["2016-01-01 07:03", 1200],
                ["2016-01-01 10:04", 940],
                ["2016-01-01 12:50", 1300],
                ["2016-01-01 14:00", 1100],
                ["2016-01-01 15:00", 1300],
                ["2016-01-01 15:30", 900],

                ["2016-01-02 02:03", 400],
                ["2016-01-02 03:30", 1000],
                ["2016-01-02 09:50", 1100],
                ["2016-01-02 13:10", 900],
                ["2016-01-02 18:10", 1400]
              ];

var graphContainer = ".graph--daily-income-graph";
var graphContainerInner = graphContainer + " .graph__data-visualisation";

var interpolation = "linear";
var parseTime = d3.time.format.utc("%Y-%m-%d %H:%M").parse;
var bisectDate = d3.bisector(function(d) { return parseTime(d[0]) }).left;

var yesterdayMidnight = parseTime("2016-01-01 00:00");
var yesterdayBeforeMidnight = parseTime("2016-01-01 23:59");

var todayMidnight = parseTime("2016-01-02 00:00");
var todayBeforeMidnight = parseTime("2016-01-02 23:59");

var graphTopPadding = 20;
var graphBottomPadding = 50;
var xAxisPadding = [0, 20, 20, 50];

//Chart settings
var graphWidth = 440;
var graphHeight = 300 + graphTopPadding;


var xScale = d3.time.scale.utc()
                          .domain([todayMidnight, todayBeforeMidnight])
                          .range([0, graphWidth ])

var initialYScale = d3.scale.linear()
                      .domain([100, d3.max(dataset, function(d) { return d[1] + 300 })])
                      .range([graphHeight, graphHeight]);

var tooltipYScale = d3.scale.linear()
                      .domain([100, d3.max(dataset, function(d) { return d[1] + 300 })])
                      .range([0, 0]);

var yScale = d3.scale.linear()
                     .domain([100, d3.max(dataset, function(d) { return d[1] + 300 })])
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
                  .tickFormat(d3.time.format.utc("%I%p"))
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


var area = d3.svg.area()
                 .x(function(d) { return xScale(parseTime(d[0])) })
                 .y0(graphHeight)
                 .y1(function(d) { return initialYScale(d[1]) })
                 .interpolate(interpolation);

var line = d3.svg.line()
                .x(function(d) { return xScale(parseTime(d[0])) })
                .y(function(d) { return initialYScale(d[1]) })
                .interpolate(interpolation);

//Add clippath for the grid
svg.append("clipPath")
   .attr("id", "dailyIncomeGridClip")
   .append("rect")
   .attr("width", graphWidth - 70)
   .attr("height", graphHeight - 70);

var graphAxisX = svg.append("g")
  .attr("class", "graph__axis graph__axis--x")
  .attr("transform", "translate(" + xAxisPadding[3] + ", " + (graphHeight - xAxisPadding[2]) + ")")
  .call(xAxis);

var graphAxisY =  svg.append("g")
  .attr("class", "graph__axis graph__axis--y")
  .attr("transform", "translate(" + (graphWidth - xAxisPadding[1]) + ", 0)")
  .style("text-anchor", "end")
  .call(yAxis);

//Draw grid
svg.append("g")
   .attr("class", "graph__grid graph__grid--y")
   .attr("clip-path", "url(#dailyIncomeGridClip)")
   .attr("transform", "translate(0, 0)")
   .style("text-anchor", "end")
   .call(yGrid);

//Draw area
var graphArea = svg.append("path")
   .attr("class", "graph__area")
   .datum(dataset)
   .attr("d", area);

//Draw line
var graphLine = svg.append("path")
   .attr("class", "graph__line")
   .datum(dataset)
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
          .attr("cx", function(d) {return xScale(parseTime(d[0])) })
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
     .attr("x", -30)
     .attr("y", -40)
     .attr("rx", 16)
     .attr("ry", 16)
     .attr("width", 60)
     .attr("height", 30)
     .attr("fill", "#4FB972");

focus.append("text")
     .attr("x", 0)
     .attr("y", -25)
     .attr("fill", "white")
     .attr("text-anchor", "middle")
     .attr("class", "graph__focus-text")
     .attr("dy", ".35em");

var focusText = document.querySelector(".graph__focus-text");

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
 function mouseMove() {
   var m = d3.mouse(this);

   var x0 = xScale.invert(m[0]);
   var i = bisectDate(dataset, x0, 1);
   var d0 = dataset[i - 1];
   var d1 = dataset[i];
   if(!d0 || !d1) return;
   var d = x0 - parseTime(d0[0]) > parseTime(d1[0]) - x0 ? d1 : d0;

   focus.transition()
     .ease("linear")
     .duration(100)
     .attr("transform", "translate(" + xScale(parseTime(d[0])) + "," + yScale(d[1]) + ")");

   focusText.textContent = "$" + d[1];
 }

 function mouseOut() {
   focus.style("opacity", 0);
   return;
 }

//Draw graph with animation
setTimeout(drawGraph, 0);
function drawGraph() {
    initialYScale.range([graphHeight - graphTopPadding - graphBottomPadding, 1]);
    var t = svg.transition().duration(750);
    t.select(".graph__area").attr("d", area);
    t.select(".graph__line").attr("d", line);
}

//Update graph on swither click with animation
var currentPosition = "today";
function moveGraph(direction) {
  if(direction == currentPosition) return;

  if (direction == "yesterday") {
    xScale.domain([yesterdayMidnight, yesterdayBeforeMidnight])
    currentPosition = "yesterday";
  } else {
    xScale.domain([todayMidnight, todayBeforeMidnight])
    currentPosition = "today";
  }

  graphAxisX.transition().duration(750).call(xAxis);
  graphArea.transition().duration(750).attr("d", area);
  graphLine.transition().duration(750).attr("d", line);

  var t = svg.transition().duration(750);
  t.selectAll(".graph__circle")
   .attr("cx", function(d) {return xScale(parseTime(d[0]))})
   .attr("cy", function(d) {return yScale(d[1])})

  return;
}
