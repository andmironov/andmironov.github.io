var d3 = require("./lib/d3.js");
var d3tip = require("./lib/d3tip.js");
var dataset = [
                ["2015-12-31 00:02", 600],
                ["2016-01-01 03:44", 900],
                ["2016-01-01 06:03", 100],
                ["2016-01-01 10:04", 940],
                ["2016-01-01 12:50", 1300],
                ["2016-01-01 14:00", 1100],
                ["2016-01-01 15:00", 1300],
                ["2016-01-01 15:30", 400],

                ["2016-01-02 00:13", 200],
                ["2016-01-02 03:30", 1000],
                ["2016-01-02 09:50", 1100],
                ["2016-01-02 13:10", 900],
                ["2016-01-02 18:10", 1400]
              ];
var graphContainer = ".graph--daily-payments-graph";
var graphContainerInner = graphContainer + " .graph__data-visualisation";

var interpolation = "basis";
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
                     .domain([100, d3.max(dataset, function(d) { return d[1] + 100 })])
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
var svg = d3.select(graphContainerInner)
						.append("svg")
						.attr("width", graphWidth)
						.attr("height", graphHeight);

//Create circles
var circles = svg.append("g")
                 .attr("class", "graph__circles")
                 .attr("width", graphWidth)
                 .attr("height", graphHeight);

dataset.forEach(function(d, i) {
  circles.append("circle")
          .attr("class", "graph__circle")
          .attr("transform", "translate(0, 40)")
          .attr("opacity", "0")
          .datum(d)
          .attr("cx", function(d) {return xScale(parseTime(d[0]))})
          .attr("cy", function(d) {return yScale(d[1])})
          .transition()
          .duration(750)
          .delay(50 * i)
          .attr("transform", "translate(0, 10)")
          .attr("opacity", "1")
          .attr("r", 6);
});

//Create tooltips
var tip = d3tip.tip()
  .attr('class', 'graph__tooltip')
  .offset([-10, 0])
  .html(function(d) {
    return "<strong>Frequency:</strong> <span style='color:red'>" + d[0] + "</span>";
  });
svg.call(tip);

/*

var tooltips = svg.append("g")
                 .attr("class", "graph__tooltips")
                 .attr("width", graphWidth)
                 .attr("height", graphHeight);

tooltips.selectAll("text")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("class", "graph__tooltip")
        .attr("x", function(d) {
        		return ( xScale(parseTime(d[0])) - 40 );
        })
        .attr("y", function(d) {
        		return ( yScale(d[1]) - 30);
        })
        .attr("width", 80)
        .attr("height", 30)
        .attr("rx", 16)
        .attr("ry", 16)
        .fill("red", 10)
        .attr("opacity", 0)
        .append("text")
        .text(function(d) {
			   		return d[1];
			   })
        .attr("dy", "0em")
        .attr("text-anchor", "middle")
*/


//Add clippath for the grid
svg.append("clipPath")
   .attr("id", "gridClip")
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

//Draw axes
svg.on("mousemove", function (d, i) {
       var m = d3.mouse(this);
       hoverLine.attr("x1", m['0'])
                .attr("x2", m['0'])
                .style("opacity", .4)
   })

svg.on("mouseout", function() { hoverLine.style("opacity", 0)});

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
