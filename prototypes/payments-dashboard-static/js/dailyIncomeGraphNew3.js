var d3 = require("./lib/d3.js");


var dataset = [
                ["2015-12-31 00:02", 600],

                ["2016-01-01 00:02", 900],
                ["2016-01-01 00:03", 1900],
                ["2016-01-01 04:04", 940],
                ["2016-01-01 12:50", 1300],
                ["2016-01-01 14:00", 1100],
                ["2016-01-01 15:00", 900],
                ["2016-01-01 15:30", 400],

                ["2016-01-02 00:13", 200],
                ["2016-01-02 03:30", 1000],
                ["2016-01-02 09:50", 1100],
                ["2016-01-02 13:10", 1800],
                ["2016-01-02 18:10", 1400]
              ];

var parseTime = d3.time.format.utc("%Y-%m-%d %H:%M").parse;

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
                  .tickFormat(d3.time.format.utc("%I%p"))
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

var area = d3.svg.area()
                 .x(function(d) { return xScale(parseTime(d[0])) })
                 .y0(graphHeight)
                 .y1(function(d) { return yScale(d[1]) })
                 .interpolate("basis");

var line = d3.svg.line()
                .interpolate("basis")
                .x(function(d) { return xScale(parseTime(d[0])) })
                .y(function(d) { return yScale(d[1]) });




svg.datum(dataset);

//Add clippath for the grid
svg.append("clipPath")
   .attr("id", "gridClip")
   .append("rect")
   .attr("width", graphWidth - 70)
   .attr("height", graphHeight - 70);

//Add points
/*
var points = svg.append("g")
                .attr("class", "graph__points")
                .attr("width", graphWidth)
                .attr("height", graphHeight);

points.selectAll('circle')
        .data(dataset.filter(function(d) { return d; }))
        .enter().append('circle')
        .attr('cx', line.x())
        .attr('cy', line.y())
        .attr('r', 3)
*/

//Draw graph
svg.append("path")
   .attr("class", "graph__area")
   .attr("d", area)
   .on("mousemove", function (d, i) {
            var m = d3.mouse(this);
            console.log(m);
          });

//Draw line
/*svg.append("path")
      .attr("class", "graph__line")
      .attr("d", line);
*/
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



//Onclick events

d3.selectAll(".data-swither")
  .on("click", function(){

    var currentFlagClassName = "data-swither--active";

    var elems = document.querySelectorAll(".data-swither.data-swither--active");
    [].forEach.call(elems, function(el) {
        el.classList.remove(currentFlagClassName);
    });

    this.classList.add(currentFlagClassName);

    var direction = this.getAttribute("data-direction");
    moveGraph(direction);
  });


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

  var t = svg.transition().duration(750);
  t.select(".graph__axis--x").call(xAxis);
  t.select(".graph__area").attr("d", area);
  t.select(".graph__points").selectAll('circle')
  .attr('cx', line.x())
  .attr('cy', line.y())
  t.select(".graph__line").attr("d", line);

  return;
}
