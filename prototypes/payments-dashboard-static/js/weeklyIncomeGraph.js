var d3 = require("./lib/d3.js");
var DOMObserver = require("./lib/DOMObserver.js");

var dataset = [
                {
                  week: "7–13 DEC",
                  data: [2200, 1400, 1600, 1250, 980, 2200, 1450]
                },

                {
                  week: "14–20 DEC",
                    data: [2500, 1400, 1600, 1250, 980, 2200, 1450]
                },

                {
                  week: "21–27 DEC",
                    data: [2400, 1400, 1600, 1250, 980, 2200, 1450]
                }
              ];

var max = 3400;

var graphContainer = ".graph--weekly-income-graph";
var graphContainerInner = graphContainer + " .graph__data-visualisation";

var interpolation = "basis";
var bisect = d3.bisector(function(d) { return d[0] }).left;

var graphPadding = {top: 0, right: 70, bottom: 60, left: 0};
var axesPadding = {top: 0, right: 20, bottom: 20, left: 0};

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
    .attr("fill", function(d, i) { return i > 4 ? "#3F9E5F" : "#65C284"});


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

//Draw grid
svg.append("g")
   .attr("class", "graph__grid graph__grid--y")
   .attr("clip-path", "url(#weeklyIncomeGridClip)")
   .attr("transform", "translate(0, " + (-graphPadding.bottom) + ")")
   .style("text-anchor", "end")
   .call(yGrid);

//Register Events
svg.on("mouseover", function() {focus.style("opacity", 1)})
   .on("mouseout", mouseOut)
   .on("mousemove", mouseMove);

 function mouseMove() {


   var m = d3.mouse(this);
   console.log(m[0]);

  // var xPosition,
  //      parentXPosition,
	//		yPosition = parseInt(d3.select(this).attr("y") );

  //    xPosition = parseFloat(d3.select(this).attr("x"));
  //    parentXPosition = parseFloat(d3.select(this.parentNode).attr("x"));
  // console.log(parentXPosition);

   //var range = xBarScale.range();
   //var i = d3.bisectLeft(range, m[0]);
   //var d0 = dataset[0].data;
   //if(d0[i-1]) console.log(d0[i-1]);


    /*
   var d0 = dataset[i - 1];
   var d1 = dataset[i];
   if(!d0 || !d1) return;
   var d = x0 - d0[0] > d1[0] - x0 ? d1 : d0;
*/
   focus.transition()
     .ease("linear")
     .duration(100)
     .attr("transform", "translate(" + (m[0]) + "," + 40 + ")");

   focus.select("text").text("");

 }

 function mouseOut() {
   focus.style("opacity", 0);
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
    initialYScale.range([graphHeight , 0]);
    week.selectAll("rect").transition().duration(750)
        .attr("y", function(d){ return initialYScale(d) - graphPadding.bottom })
        .attr("height", function(d) {return graphHeight - initialYScale(d)})
    graphShown = true;
  }
}
