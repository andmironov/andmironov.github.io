import { VictoryLine, VictoryAxis, VictoryChart } from "victory";
let React = require("react");
let GraphMore = require("./GraphMore.js");

let graphData = [
  {x: 0, y: 0},
  {x: 0, y: 1000},
  {x: 0.1, y: 500},
  {x: 0.5, y: 1200},
  {x: 1, y: 300},
  {x: 1.2, y: 1020},
  {x: 1.2, y: 0}
];

let xAxisStyle = {
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
      transform: "translate3d(0, -15px, 0)"
    }
}

let yAxisStyle = {
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
}

let graphStyle = {
    data: {
      stroke: "#4FB972",
      strokeWidth: 0,
      fill: "#4FB972",
      opacity: "0.21",
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
            <svg width={440} height={300}>

              <VictoryAxis
                width={440}
                height={297}

                padding={{top:0, right: 0, bottom: 40, left: 0}}
                labelPadding={0}
                domainPadding={0}

                standalone={false}
                crossAxis={true}

                offsetY={20}

                tickCount={2}
                tickFormat={["Yesterday", "Today"]}

                style={xAxisStyle}
              />

              <VictoryAxis
                dependentAxis

                width={440}
                height={300}

                padding={{top:0, right: 0, bottom: 0, left: 60}}
                labelPadding={0}
                domainPadding={0}

                standalone={false}
                crossAxis={true}

                offsetX={20}

                domain={[0, 2034]}
                tickCount={2}

                style={yAxisStyle}
              />

              <VictoryLine
                padding={0}
                domainPadding={0}
                width={440}
                height={300}
                data={graphData}
                interpolation="monotone"
                style={graphStyle} />
            </svg>
          </div>
        </div>
      </div>
    )
  }
});

module.exports = DailyIncomeGraph;
