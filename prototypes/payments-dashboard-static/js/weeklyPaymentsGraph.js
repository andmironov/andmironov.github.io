var d3 = require("./lib/d3.js");
var DOMObserver = require("./lib/DOMObserver.js");
var dataset = [
                {
                  week: "7–13 DEC",
                  data: [3, 5, 5, 2, 10, 6, 9]
                },

                {
                  week: "14–20 DEC",
                  data: [2, 4, 20, 15, 14, 8, 10]
                },

                {
                  week: "21–27 DEC",
                  data: [5, 7, 7, 8, 18, 21, 10]
                }
              ];
var max = 32;

var graphContainer = ".graph--weekly-payments-graph";
var graphContainerInner = graphContainer + " .graph__data-visualisation";

var interpolation = "basis";

var graphPadding = {top: 0, right: 70, bottom: 60, left: 0};
var axesPadding = {top: 0, right: 20, bottom: 20, left: 0};

var weeklyIncomegraphShown = false;

//Chart settings
var graphWidth = 440;
var graphHeight = 400;

var xGroupScale = d3.scale.ordinal()
                          .domain(dataset.map(function(d) { return d.week }))
                          .rangeRoundBands([0, graphWidth - graphPadding.right], .2);

var xBarScale = d3.scale.ordinal()
                        .domain(d3.range(7))
                        .rangeRoundBands([0, xGroupScale.rangeBand()], .3);

var initialYScale = d3.scale.linear()
                     .domain([0, max])
                     .range([0, 0]);

var yScale = d3.scale.linear()
                     .domain([0, max])
                     .range([graphHeight , 0]);

var yGrid = d3.svg.axis()
                  .scale(yScale)
                  .orient("right")
                  .tickSize(graphWidth)
                  .tickFormat("")
                  .ticks(5);

var xAxis = d3.svg.axis()
                  .scale(xGroupScale)
                  .ticks(3)
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

//Draw grid
svg.append("g")
   .attr("class", "graph__grid graph__grid--y")
   .attr("clip-path", "url(#weeklyIncomeGridClip)")
   .attr("transform", "translate(0, " + (-graphPadding.bottom) + ")")
   .style("text-anchor", "end")
   .call(yGrid);

//Add tooltip
var hoverLineGroup = svg.append("g")
					              .attr("class", "graph__hover-line");

var hoverLine = hoverLineGroup.append("line")
                         		  .attr("x1", -1)
                               .attr("x2", -1)
                         		  .attr("y1", 40)
                               .attr("y2", graphHeight - graphPadding.bottom)
                               .style("opacity", 0);

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

var week = svg.selectAll(".graph__week")
              .data(dataset)
              .enter()
              .append("g")
              .attr("class", "graph__week")
              .attr("x", function(d, i) { return xGroupScale(d.week) })
              .attr("transform", function(d) { return "translate(" + xGroupScale(d.week) + "," + "0" + ")"; });

week.selectAll("rect")
    .data(function(d) { return d.data })
    .enter()
    .append("rect")
    .attr("width", xBarScale.rangeBand())
    .attr("class", "graph__bar")
    .attr("rx", 4)
    .attr("ry", 4)
    .attr("x", function(d, i) { return xBarScale(i) })
    .attr("y", graphHeight - graphPadding.bottom)
    .attr("height", function(d) { return initialYScale(d) })
    .attr("fill", function(d, i) { return i > 4 ? "#4496BC" : "#6DCAF6"});

//Add clippath for the grid
svg.append("clipPath")
   .attr("id", "weeklyIncomeGridClip")
   .append("rect")
   .attr("width", graphWidth - 70)
   .attr("height", graphHeight );

svg.append("g")
  .attr("class", "graph__axis graph__axis--x")
  .attr("transform", "translate(0, " + (graphHeight - axesPadding.bottom) + ")")
  .call(xAxis);

svg.append("g")
  .attr("class", "graph__axis graph__axis--y")
  .attr("transform", "translate(" + (graphWidth - axesPadding.right) + ", " + (-graphPadding.bottom) + ")")
  .style("text-anchor", "end")
  .call(yAxis);

//Register Events
var groupRange = xGroupScale.range();
var groupRangeBand = xGroupScale.rangeBand();

var barRange = xBarScale.range();
var barRangeBand = xBarScale.rangeBand();

//Get bar positions
var bars = [];
groupRange.forEach(function(groupRangeItem, groupRangeItemIndex) {
  bars[groupRangeItemIndex] = barRange.map(function(barRangeItem, barRangeItemIndex) {
    item = [];
    item[0] = barRangeItem + groupRangeItem + barRangeBand/2 ;
    item[1] = dataset[groupRangeItemIndex].data[barRangeItemIndex];
    return item;
  });
});

var flatternedBars = d3.merge(bars);
var barPositions = flatternedBars.map(function(item){return item[0]})
var barData = flatternedBars.map(function(item){return item[1]})

svg.on("mouseover", mouseover)
   .on("mouseout", mouseOut)
   .on("mousemove", mouseMove);

function mouseover() {
  var m = d3.mouse(this);

  //Show hoverline and tooltip only if user hovers on graph
  if(m[0] > groupRange[0] && m[0] < (groupRange[groupRange.length - 1] + groupRangeBand)) showtoolTip();
}

function mouseMove() {
  var m = d3.mouse(this);

  //Hide tooltip if user hovers not on graph
  if(m[0] < groupRange[0] || m[0] > (groupRange[groupRange.length - 1] + groupRangeBand)) hidetoolTip();

  //Find which bar is hovered
  var i = d3.bisect(barPositions, m[0]);

  var d0 = barData[i - 1];
  var d1 = barData[i];
  var d;
  if (!d0) { d = barData[i]; p = barPositions[i]; }
  if (!d1) { d = barData[i - 1]; p = barPositions[i - 1]; }

  if (d0 && d1) {
    if(Math.abs(barPositions[i - 1] - m[0]) > Math.abs(barPositions[i] - m[0])){
      d = barData[i];
      p = barPositions[i];
    } else {
      d = barData[i - 1];
      p = barPositions[i - 1];
    }
  }

  updateTooltip(p, d);
}

function mouseOut() {
  hidetoolTip();
}

function showtoolTip() {
  focus.style("opacity", 1);
  hoverLine.style("opacity", .4);
}

function hidetoolTip() {
  focus.style("opacity", 0);
  hoverLine.style("opacity", 0);
}

 function updateTooltip(xPosition, text) {
   hoverLine.transition()
            .ease("linear")
            .duration(100)
            .attr("transform", "translate(" + (xPosition + 1) + ", 0)");

   focus.transition()
        .ease("linear")
        .duration(100)
        .attr("transform", "translate(" + (xPosition) + ",40)");

   focus.select("text").text(text);
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
  scrollY = observer.getScrollY()
  if((graphContainerOffsetTop - scrollY) < (viewportHeight - (graphContainerHeight/2))) drawGraph();
}

function drawGraph() {
  if(weeklyIncomegraphShown) return;
  initialYScale.range([graphHeight , 0]);
  week.selectAll("rect").transition().duration(750)
      .attr("y", function(d){ return initialYScale(d) - graphPadding.bottom })
      .attr("height", function(d) {return graphHeight - initialYScale(d)})
  weeklyIncomegraphShown = true;
}
