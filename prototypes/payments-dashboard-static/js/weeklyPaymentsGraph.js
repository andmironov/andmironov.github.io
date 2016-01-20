var d3 = require("./lib/d3.js");
var DOMObserver = require("./lib/DOMObserver.js");
var dataset = [
                {
                  week: "7–13 DEC",
                  data: [3, 5, 5, 2, 10, 6, 9]
                },

                {
                  week: "14–20 DEC",
                  data: [2, 4, 6, 15, 14, 8, 10]
                },

                {
                  week: "21–27 DEC",
                  data: [5, 7, 7, 8, 18, 21, 12]
                }
              ];

var max = 28;

var graphContainer = ".graph--weekly-payments-graph";
var graphContainerInner = graphContainer + " .graph__data-visualisation";

var interpolation = "basis";

var graphTopPadding = 20;
var graphBottomPadding = 60;
var graphRightPadding = 70;
var xAxisPadding = [7, 20, 20, 0];

//Chart settings
var graphWidth = 440;
var graphHeight = 380 + graphTopPadding;


var xGroupScale = d3.scale.ordinal()
                          .domain(dataset.map(function(d) { return d.week }))
                          .rangeRoundBands([0, graphWidth-graphRightPadding], .2);


var xBarScale = d3.scale.ordinal()
                        .domain([0, 1, 2, 3, 4, 5, 6])
                        .rangeRoundBands([1, xGroupScale.rangeBand()], .3);

var initialYScale = d3.scale.linear()
                     .domain([0, max])
                     .range([graphHeight, graphHeight]);

var yScale = d3.scale.linear()
                     .domain([0, max])
                     .range([graphHeight - graphBottomPadding, 0]);

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

var week = svg.selectAll(".graph__week")
              .data(dataset)
              .enter()
              .append("g")
              .attr("class", "graph__week")
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
    .attr("y", function(d){return initialYScale(d) - graphBottomPadding})
    .attr("height", function(d) { return graphHeight - initialYScale(d) })
    .attr("fill", function(d, i) { return i > 4 ? "#4496BC" : "#6DCAF6"})


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
   .attr("transform", "translate(0, " + (xAxisPadding[0] + graphTopPadding) + ")")
   .style("text-anchor", "end")
   .call(yGrid);

var observer = new DOMObserver();

observer.addElement({
  element: document.querySelector(graphContainer),
  name:"graphContainer"
});

var scrollY = observer.getScrollY();
var graphContaineroffsetTop = observer.getPropertyValue("graphContainer", "offsetTop")
var viewportHeight = observer.getViewport().height;
onScrollY();


observer.addCallbacks({
  onScrollYUpdate: onScrollY
})

var graphShown = false;
function onScrollY() {
  scrollY = observer.getScrollY()

  if(!graphContaineroffsetTop) return;
  if(graphShown) return;

  if((graphContaineroffsetTop - scrollY) < viewportHeight/2){
    initialYScale.range([graphHeight - graphBottomPadding, 0])
    week.selectAll("rect").transition().duration(750)
        .attr("y", function(d){return initialYScale(d) - graphBottomPadding})
        .attr("height", function(d) { return graphHeight - initialYScale(d) })
    graphShown = true;
  }
}
