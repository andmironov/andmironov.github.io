var d3 = require("./lib/d3.js");
var DOMObserver = require("./lib/DOMObserver.js");

var dataset = [

                ["2014-12", 350],
                ["2015-01", 350],
                ["2015-02", 280],
                ["2015-03", 450],
                ["2015-04", 424],
                ["2015-05", 590],
                ["2015-06", 230],
                ["2015-07", 663],
                ["2015-08", 890],
                ["2015-09", 1350],
                ["2015-10", 1604],
                ["2015-11", 2900],
                ["2015-12", 2100],
                ["2016-01", 1200]
              ];

var graphContainer = ".graph--total-income-graph";
var graphContainerInner = graphContainer + " .graph__data-visualisation";

var interpolation = "linear";
var parseTime = d3.time.format.utc("%Y-%m").parse;
var bisectDate = d3.bisector(function(d) { return parseTime(d[0]) }).left;

var beginningOfLastWeek = parseTime("2015-12-28");
var endOfLastWeek = parseTime("2016-01-03");

//default domain
var beginningOfDefaultPeriod = parseTime("2015-01");
var endOfDefaultPeriod = parseTime("2016-04");
var currentTickFormat = "%b";

//previous 6 months
var beginningOf6monthsPeriod = parseTime("2015-08");
var endOf6monthsPeriod = parseTime("2016-04");
var currentTickFormat = "%b";

//previous 3 months
var beginningOf3monthsPeriod = parseTime("2015-11");
var endOf3monthsPeriod = parseTime("2016-02");
var currentTickFormat = "%b";

var graphPadding = {top: 20, right: 40, bottom: 0, left: 20};
var axesPadding = {top: 0, right: 40, bottom: 20, left: 0};

var graphTopPadding = 20;
var graphBottomPadding = 50;
var xAxisPadding = [0, 20, 20, 50];

//Chart settings
var graphWidth = 910;
var graphHeight = 300 + graphTopPadding;


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
                  .ticks(5);

var xAxis = d3.svg.axis()
                  .scale(xScale)
                  .ticks(5)
                  .tickFormat(d3.time.format.utc(currentTickFormat))
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
function addPoints() {
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
}

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
      .attr("dy", ".35em");

function addTooltips() {
  //Register Events
  svg.on("mouseover", function() {focus.style("opacity", 1)})
     .on("mouseout", mouseOut)
     .on("mousemove", mouseMove);
}

//Add clippath for the grid
svg.append("clipPath")
   .attr("id", "totalPaymentsGridClip")
   .append("rect")
   .attr("width", graphWidth - 70)
   .attr("height", graphHeight - 70);


// Hover line
var hoverLineGroup = svg.append("g")
					              .attr("class", "graph__hover-line");

var hoverLine = hoverLineGroup.append("line")
                          		.attr("x1", -1)
                              .attr("x2", -1)
                          		.attr("y1", graphTopPadding)
                              .attr("y2", (graphHeight))
                              .style("opacity", 0);

var graphAxisX = svg.append("g")
  .attr("class", "graph__axis graph__axis--x")
  .attr("transform", "translate(" + graphPadding.left + ", " + (graphHeight - xAxisPadding[2]) + ")")
  .call(xAxis);

var graphAxisy = svg.append("g")
  .attr("class", "graph__axis graph__axis--y")
  .attr("transform", "translate(" + (graphWidth - xAxisPadding[1]) + ", " + (0) + ")")
  .style("text-anchor", "end")
  .call(yAxis);

//Draw grid
svg.append("g")
   .attr("class", "graph__grid graph__grid--y")
   .attr("clip-path", "url(#totalPaymentsGridClip)")
   .attr("transform", "translate(0, " + 0 + ")")
   .style("text-anchor", "end")
   .call(yGrid);

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
//setTimeout(drawGraph, 0);
function drawGraph() {
    initialYScale.range([graphHeight - graphTopPadding - graphBottomPadding, 1]);
    graphArea.transition().duration(750).attr("d", area);
    graphLine.transition().duration(750).attr("d", line);
}


function mouseMove() {
  var m = d3.mouse(this);

  hoverLine.attr("x1", m[0])
           .attr("x2", m[0])
           .style("opacity", .4)

  var x0 = xScale.invert(m[0]);
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
  hoverLine.style("opacity", 0);
  focus.style("opacity", 0);
  return;
}

//Update graph on swither click with animation
var currentPosition = "total";
function moveGraph(direction) {
  if(direction == currentPosition) return;

  switch(direction) {
    case "total":
      xScale.domain([beginningOfDefaultPeriod, endOfDefaultPeriod])
      currentPosition = "total";
      console.log("total");
    break;

    case "3months":
      xScale.domain([beginningOf3monthsPeriod, endOf3monthsPeriod])
      currentPosition = "3months";
      console.log("3months");
    break;

    case "6months":
      xScale.domain([beginningOf6monthsPeriod, endOf6monthsPeriod])
      currentPosition = "6months";
      console.log("6months");
    break;
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

var graphShown = false;

function onScrollY() {
  scrollY = observer.getScrollY()
  if(!graphContainerOffsetTop) return;
  if(graphShown) return;
  if((graphContainerOffsetTop - scrollY) <  (viewportHeight - (graphContainerHeight/2))) {
    drawGraph();
    addPoints();
    addTooltips();
    graphShown = true;
  }
}
