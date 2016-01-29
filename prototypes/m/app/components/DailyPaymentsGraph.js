import { VictoryLine } from "victory";
let React = require("react");
let GraphMore = require("./GraphMore.js");

let graphData = [
  {x: 0, y: 0},
  {x: 0, y: 1},
  {x: 1, y: 3},
  {x: 2, y: 2},
  {x: 3, y: 4},
  {x: 4, y: 3},
  {x: 4, y: 0}
];

let graphStyle = {
  data: {
    stroke: "#822722",
    strokeWidth: 0,
    fill: "red",
    ":hover": {stroke: "#c33b33"}
  }
};

let DailyPaymentsGraph = React.createClass({

  render: function() {
    return (
      <div className="graph">
        <div className="graph__inner">
          <h2 className="graph__title">Payments</h2>
          <GraphMore/>
          <div className="graph__data-visualisation">

          </div>
        </div>
      </div>
    )
  }
});

module.exports = DailyPaymentsGraph;
