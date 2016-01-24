var d3 = require("./lib/d3.js");
var DOMObserver = require("./lib/DOMObserver.js");

var dataset = [
                ["2015-01-01", 350],
                ["2015-01-02", 350],
                ["2015-01-03", 280],
                ["2015-01-04", 450],
                ["2015-01-05", 424],
                ["2015-01-06", 590],
                ["2015-01-07", 230],
                ["2015-01-08", 663],
                ["2015-01-09", 890],
                ["2015-01-10", 1350],
                ["2015-01-11", 1604],
                ["2015-01-12", 1900],
                ["2015-01-13", 450],
                ["2015-01-14", 1200],
                ["2015-01-15", 1550],
                ["2015-01-16", 620],
                ["2015-01-17", 706],
                ["2015-01-18", 433],
                ["2015-01-19", 1200],
                ["2015-01-20", 560],
                ["2015-01-21", 1040],
                ["2015-01-22", 250],
                ["2015-01-23", 788],
                ["2015-01-24", 1747],
                ["2015-01-25", 990],
                ["2015-01-26", 810],
                ["2015-01-27", 290],
                ["2015-01-28", 1200],
                ["2015-01-29", 440],
                ["2015-01-30", 460],
                ["2015-01-31", 1280],

                ["2015-02-01", 350],
                ["2015-02-02", 350],
                ["2015-02-03", 280],
                ["2015-02-04", 450],
                ["2015-02-05", 424],
                ["2015-02-06", 590],
                ["2015-02-07", 230],
                ["2015-02-08", 663],
                ["2015-02-09", 890],
                ["2015-02-10", 1350],
                ["2015-02-11", 1604],
                ["2015-02-12", 900],
                ["2015-02-13", 160],
                ["2015-02-14", 900],
                ["2015-02-15", 1500],
                ["2015-02-16", 200],
                ["2015-02-17", 1700],
                ["2015-02-18", 400],
                ["2015-02-19", 1200],
                ["2015-02-20", 805],
                ["2015-02-21", 1160],
                ["2015-02-22", 200],
                ["2015-02-23", 880],
                ["2015-02-24", 270],
                ["2015-02-25", 910],
                ["2015-02-26", 580],
                ["2015-02-27", 990],
                ["2015-02-28", 330],

                ["2015-03-01", 1300],
                ["2015-03-02", 1350],
                ["2015-03-03", 980],
                ["2015-03-04", 460],
                ["2015-03-05", 524],
                ["2015-03-06", 1290],
                ["2015-03-07", 1230],
                ["2015-03-08", 663],
                ["2015-03-09", 390],
                ["2015-03-10", 1350],
                ["2015-03-11", 1604],
                ["2015-03-12", 2900],
                ["2015-03-13", 2100],
                ["2015-03-14", 1200],
                ["2015-03-15", 1500],
                ["2015-03-16", 200],
                ["2015-03-17", 1700],
                ["2015-03-18", 400],
                ["2015-03-19", 1130],
                ["2015-03-20", 660],
                ["2015-03-21", 704],
                ["2015-03-22", 200],
                ["2015-03-23", 1200],
                ["2015-03-24", 2200],
                ["2015-03-25", 4400],
                ["2015-03-26", 1800],
                ["2015-03-27", 1090],
                ["2015-03-28", 1707],
                ["2015-03-29", 1460],
                ["2015-03-30", 1780],
                ["2015-03-31", 1560],

                ["2015-04-01", 3350],
                ["2015-04-02", 2360],
                ["2015-04-03", 2180],
                ["2015-04-04", 2450],
                ["2015-04-05", 2424],
                ["2015-04-06", 1590],
                ["2015-04-07", 1230],
                ["2015-04-08", 3663],
                ["2015-04-09", 1890],
                ["2015-04-10", 650],
                ["2015-04-11", 1704],
                ["2015-04-12", 2240],
                ["2015-04-13", 1150],
                ["2015-04-14", 1090],
                ["2015-04-15", 2540],
                ["2015-04-16", 2080],
                ["2015-04-17", 770],
                ["2015-04-18", 1460],
                ["2015-04-19", 1500],
                ["2015-04-20", 2260],
                ["2015-04-21", 3090],
                ["2015-04-22", 2266],
                ["2015-04-23", 2150],
                ["2015-04-24", 1200],
                ["2015-04-25", 3760],
                ["2015-04-26", 1350],
                ["2015-04-27", 2560],
                ["2015-04-28", 1288],
                ["2015-04-29", 2386],
                ["2015-04-30", 370],

                ["2015-05-01", 1750],
                ["2015-05-02", 2350],
                ["2015-05-03", 1280],
                ["2015-05-04", 450],
                ["2015-05-05", 424],
                ["2015-05-06", 590],
                ["2015-05-07", 230],
                ["2015-05-08", 663],
                ["2015-05-09", 890],
                ["2015-05-10", 1350],
                ["2015-05-11", 1604],
                ["2015-05-12", 2900],
                ["2015-05-13", 1090],
                ["2015-05-14", 400],
                ["2015-05-15", 1500],
                ["2015-05-16", 200],
                ["2015-05-17", 1700],
                ["2015-05-18", 400],
                ["2015-05-19", 1200],
                ["2015-05-20", 1200],
                ["2015-05-21", 1200],
                ["2015-05-22", 200],
                ["2015-05-23", 3800],
                ["2015-05-24", 4200],
                ["2015-05-25", 1200],
                ["2015-05-26", 800],
                ["2015-05-27", 1200],
                ["2015-05-28", 3500],
                ["2015-05-29", 2050],
                ["2015-05-30", 3600],
                ["2015-05-31", 900],

                ["2015-06-01", 350],
                ["2015-06-02", 350],
                ["2015-06-03", 280],
                ["2015-06-04", 450],
                ["2015-06-05", 424],
                ["2015-06-06", 590],
                ["2015-06-07", 230],
                ["2015-06-08", 663],
                ["2015-06-09", 890],
                ["2015-06-10", 1350],
                ["2015-06-11", 3604],
                ["2015-06-12", 2900],
                ["2015-06-13", 2100],
                ["2015-06-14", 900],
                ["2015-06-15", 1500],
                ["2015-06-16", 200],
                ["2015-06-17", 1700],
                ["2015-06-18", 400],
                ["2015-06-19", 2600],
                ["2015-06-20", 900],
                ["2015-06-21", 1200],
                ["2015-06-22", 200],
                ["2015-06-23", 1150],
                ["2015-06-24", 420],
                ["2015-06-25", 2500],
                ["2015-06-26", 1800],
                ["2015-06-27", 990],
                ["2015-06-28", 3190],
                ["2015-06-29", 2750],
                ["2015-06-30", 2130],

                ["2015-07-01", 350],
                ["2015-07-02", 350],
                ["2015-07-03", 280],
                ["2015-07-04", 1450],
                ["2015-07-05", 424],
                ["2015-07-06", 590],
                ["2015-07-07", 230],
                ["2015-07-08", 2663],
                ["2015-07-09", 890],
                ["2015-07-10", 1350],
                ["2015-07-11", 1604],
                ["2015-07-12", 2900],
                ["2015-07-13", 2100],
                ["2015-07-14", 3940],
                ["2015-07-15", 1500],
                ["2015-07-16", 200],
                ["2015-07-17", 1700],
                ["2015-07-18", 400],
                ["2015-07-19", 3600],
                ["2015-07-20", 1350],
                ["2015-07-21", 640],
                ["2015-07-22", 3200],
                ["2015-07-23", 2930],
                ["2015-07-24", 890],
                ["2015-07-25", 2100],
                ["2015-07-26", 3300],
                ["2015-07-27", 1820],
                ["2015-07-28", 4410],
                ["2015-07-29", 2450],
                ["2015-07-30", 845],
                ["2015-07-31", 2140],

                ["2015-08-01", 3330],
                ["2015-08-02", 2604],
                ["2015-08-03", 4510],
                ["2015-08-04", 1150],
                ["2015-08-05", 924],
                ["2015-08-06", 1590],
                ["2015-08-08", 230],
                ["2015-08-08", 663],
                ["2015-08-09", 890],
                ["2015-08-10", 1350],
                ["2015-08-11", 4007],
                ["2015-08-12", 1650],
                ["2015-08-13", 1550],
                ["2015-08-14", 2555],
                ["2015-08-15", 1500],
                ["2015-08-16", 1400],
                ["2015-08-17", 1940],
                ["2015-08-18", 2440],
                ["2015-08-19", 990],
                ["2015-08-20", 3320],
                ["2015-08-21", 4880],
                ["2015-08-22", 1110],
                ["2015-08-23", 2550],
                ["2015-08-24", 5100],
                ["2015-08-25", 4450],
                ["2015-08-26", 3840],
                ["2015-08-27", 2190],
                ["2015-08-28", 2606],
                ["2015-08-29", 3312],
                ["2015-08-30", 990],
                ["2015-08-31", 2420],
              ];


var graphContainer = ".graph--total-income-graph";
var graphContainerInner = graphContainer + " .graph__data-visualisation";

var interpolation = "linear";
var parseTime = d3.time.format.utc("%Y-%m-%d").parse;
var bisectDate = d3.bisector(function(d) { return parseTime(d[0]) }).left;
var currentTickFormat = "%b";

//default domain
var beginningOfDefaultPeriod = parseTime("2015-01-20");
var endOfDefaultPeriod = parseTime("2015-09-15");

//previous 6 months
var beginningOf6monthsPeriod = parseTime("2015-05-01");
var endOf6monthsPeriod = parseTime("2015-09-15");

//previous 3 months
var beginningOf3monthsPeriod = parseTime("2015-07-01");
var endOf3monthsPeriod = parseTime("2015-09-15");

var graphPadding = {top: 20, right: 40, bottom: 0, left: 20};
var axesPadding = {top: 0, right: 40, bottom: 20, left: 0};
var totalGraphShown = false;

var graphTopPadding = 20;
var graphBottomPadding = 50;
var xAxisPadding = [0, 20, 20, 50];

//Chart settings
var graphWidth = 910;
var graphHeight = 300 + graphTopPadding;

var peaks = dataset.filter(function(d){if(parseTime(d[0]) >= beginningOf3monthsPeriod) return d})

var xScale = d3.time.scale.utc()
                          .domain([beginningOfDefaultPeriod, endOfDefaultPeriod])
                          .range([graphPadding.left, graphWidth - graphPadding.left - graphPadding.right])

var yScale = d3.scale.linear()
                     .domain([0, d3.max(dataset, function(d) { return d[1] + 1000 })])
                     .range([graphHeight - graphTopPadding - graphBottomPadding, 1]);

var initialYScale = d3.scale.linear()
                      .domain([0, d3.max(dataset, function(d) { return d[1] + 1000 })])
                      .range([graphHeight, graphHeight]);

var yGrid = d3.svg.axis()
                  .scale(yScale)
                  .orient("right")
                  .tickSize(graphWidth)
                  .tickFormat("")
                  .ticks(6);

var xAxis = d3.svg.axis()
                  .scale(xScale)
                  .ticks(6)
                  .orient("top");

var yAxis = d3.svg.axis()
                  .scale(yScale)
                  .orient("left")
                  .tickFormat(d3.format(".0f"))
                  .ticks(6);

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
   .attr("clip-path", "url(#totalPaymentsGridClip)")
   .attr("transform", "translate(0, " + 0 + ")")
   .style("text-anchor", "end")
   .call(yGrid);

//Add hoverline
var hoverLineGroup = svg.append("g")
					              .attr("class", "graph__hover-line");

var hoverLine = hoverLineGroup.append("line")
                         		  .attr("x1", -1)
                              .attr("x2", -1)
                              .attr("y1", 40)
                              .attr("y2", graphHeight - graphPadding.bottom)
                              .style("opacity", 0);
//Draw area
var graphArea = svg.append("path")
                   .attr("class", "graph__area")
                   .datum(dataset)
                   .attr("transform", "translate(" + 0 + ", 0)")
                   .attr("d", area);

//Draw line
var graphLine = svg.append("path")
                   .attr("class", "graph__line")
                   .datum(dataset)
                   .attr("transform", "translate(" + 0 + ", 0)")
                   .attr("d", line);

//Add tooltips
var focus = svg.append("g")
               .attr("class", "graph__focus")
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
      .attr("dy", ".35em");

var circle = svg.append("circle")
                .attr("class", "graph__circle graph__circle--moving")
                .attr("transform", "translate(10, 10)")
                .attr("style", "opacity:0")
                .attr("r", 6);

//Add clippath for the grid
svg.append("clipPath")
   .attr("id", "totalPaymentsGridClip")
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
svg.on("mouseover", mouseover)
   .on("mouseout", mouseOut)
   .on("mousemove", mouseMove);

//Draw graph with animation
function drawGraph() {
    if(totalGraphShown) return;
    initialYScale.range([graphHeight - graphTopPadding - graphBottomPadding, 1]);
    graphArea.transition().duration(750).attr("d", area);
    graphLine.transition().duration(750).attr("d", line);
    totalGraphShown = true;
}

function mouseover() {
  showtoolTip();
}

function mouseMove() {
  var m = d3.mouse(this);
  var x0 = xScale.invert(m[0]);
  var i = bisectDate(dataset, x0, 1);

  var d0 = dataset[i - 1];
  var d1 = dataset[i];
  var d;

  if (!d0) { d = d1 }
  if (!d1) { d = d0 }

  if (d0 && d1) {
    var d = x0 - parseTime(d0[0]) > parseTime(d1[0]) - x0 ? d1 : d0;
  }

  focus.transition()
       .ease("linear")
       .duration(100)
       .attr("transform", "translate(" + xScale(parseTime(d[0])) + "," + 40 + ")");

  circle.transition()
       .ease("linear")
       .duration(100)
       .attr("transform", "translate(" + xScale(parseTime(d[0])) + "," + yScale(d[1]) + ")");

  focus.select("text")
       .text("$"+ d[1]);

  hoverLine.transition()
           .ease("linear")
           .duration(100)
           .attr("transform", "translate(" + (xScale(parseTime(d[0])) + 1) + "," + 0 + ")");

}

function mouseOut() {
  hidetoolTip();
}

function showtoolTip() {
  d3.select(graphContainer + " .graph__focus").classed({"graph__focus--shown": true});
  hoverLine.style("opacity", .4);
  circle.style("opacity", 1);
}

function hidetoolTip() {
  d3.select(graphContainer + " .graph__focus").classed({"graph__focus--shown": false});
  hoverLine.style("opacity", 0);
  circle.style("opacity", 0);
}

//Update graph on swither click with animation
var currentPosition = "total";
function moveGraph(direction) {
  if(direction == currentPosition) return;

  switch(direction) {
    case "total":
      xScale.domain([beginningOfDefaultPeriod, endOfDefaultPeriod])
      currentPosition = "total";
    break;

    case "3months":
      xScale.domain([beginningOf3monthsPeriod, endOf3monthsPeriod])
      currentPosition = "3months";
    break;

    case "6months":
      xScale.domain([beginningOf6monthsPeriod, endOf6monthsPeriod])
      currentPosition = "6months";
    break;
  }
  graphAxisX.transition().duration(750).call(xAxis);
  graphArea.transition().duration(750).attr("d", area);
  graphLine.transition().duration(750).attr("d", line);
  return;
}

//Add observer
var observer = new DOMObserver();

observer.addElement({
  element: document.querySelector(graphContainer),
  name:"graphContainer"
});

var scrollY = observer.getScrollY();
var graphContainerHeight = observer.getPropertyValue("graphContainer", "height")
var graphContainerOffsetTop = observer.getPropertyValue("graphContainer", "offsetTop")
var viewportHeight = observer.getViewport().height;

onScrollY();

observer.addCallbacks({
  onScrollYUpdate: onScrollY
});

function onScrollY() {
  scrollY = observer.getScrollY();
  if((graphContainerOffsetTop - scrollY) <  (viewportHeight - (graphContainerHeight/2))) drawGraph();
}
