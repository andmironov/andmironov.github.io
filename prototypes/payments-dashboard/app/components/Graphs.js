import { VictoryLine } from "victory";
let React = require("react");
let DailyIncomeGraph = require("./DailyIncomeGraph.js");
let DailyPaymentsGraph = require("./DailyPaymentsGraph.js");
let TotalIncomeGraph = require("./TotalIncomeGraph.js");

let Graphs = React.createClass({
  render: function() {
    return (
      <div>
        <DailyIncomeGraph/>
        <DailyPaymentsGraph/>
        <TotalIncomeGraph/>
      </div>
    )
  }
});

module.exports = Graphs;
