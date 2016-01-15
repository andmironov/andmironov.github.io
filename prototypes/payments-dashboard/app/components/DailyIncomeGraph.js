import { VictoryLine, VictoryAxis, VictoryChart } from "victory";
let React = require("react");
let GraphMore = require("./GraphMore.js");

let graphData = [
  {x: 0, y: 0},
  {x: 0, y: 1000},
  {x: 0.1, y: 500},
  {x: 0.5, y: 1200},
  {x: 1, y: 300},
  {x: 1.3, y: 1700},
  {x: 1.6, y: 1020},
  {x: 1.6, y: 0}
];

let graphStyle = {
  data: {
    stroke: "#DCF1E3",
    strokeWidth: 0,
    fill: "#DCF1E3",
    ":hover": {stroke: "#c33b33"}
  }
};

let DailyIncomeGraph = React.createClass({

  render: function() {
    return (
      <div className="graph">
        <div className="graph__inner">
          <h2 className="graph__title">Income</h2>
          <GraphMore/>
          <div className="graph__data-visualisation">
            <VictoryChart
              width={440}
              height={300}
              domainPadding={0}
              padding={{top: 0, right: 0, bottom: 0, left: 0}}>

            <VictoryAxis
              tickCount={2}
              offsetY={0}
              offsetX={0}
              labelPadding={0}
              crossAxis={false}
              standalone={false}
              textAnchor={"start"}
              verticalAnchor={"start"}
              domain={[0, 2.8]}
              tickFormat={["Yesterday", "Today"]}
              style={{
                grid: {
                  stroke: "grey",
                  strokeDasharray: "2,5",
                  strokeWidth: 1,
                  opacity: "0.4"
                },
                axis: {stroke: "transparent"},
                ticks: {stroke: "transparent"},
                tickLabels: {
                  fontSize: "12px",
                  padding: "20px",
                  backgroundColor: "white",
                  fontFamily: "Museo Sans 300",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  fill: "#343038",
                  transform: "translate3d(0, -15px, 0)"
                },
              }}
            />

            <VictoryAxis
              dependentAxis
              tickCount={2}
              offsetY={0}
              offsetX={0}
              padding={0}
              labelPadding={0}
              standalone={false}
              crossAxis={false}
              offsetX={0}
              offsetY={0}
              domain={[0, 2034]}
              style={{
                grid: {
                  stroke: "grey",
                  strokeDasharray: "2,5",
                  strokeWidth: 1,
                  opacity: "0.4"
                },
                axis: {stroke: "transparent"},
                ticks: {stroke: "transparent"},
                tickLabels: {
                  fontSize: "12px",
                  fontFamily: "Museo Sans 300",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  fill: "#343038",
                  transform: "translate3d(40px, 0, 0)"
                }
              }}
            />

            <VictoryLine
              padding={0}
              width={440}
              height={300}
              data={graphData}
              interpolation="monotone"
              style={graphStyle} />

            </VictoryChart>
          </div>
        </div>
      </div>
    )
  }
});

module.exports = DailyIncomeGraph;
