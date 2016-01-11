import { VictoryLine } from "victory";
let React = require("react");

let Graphs = React.createClass({
  render: function() {
    return (
      <div>
        <VictoryLine
          domain={[0, 5]}
          padding={75}
          height={500}
          data={[
            {x: 0, y: 0},
            {x: 0, y: 1},
            {x: 1, y: 3},
            {x: 2, y: 2},
            {x: 3, y: 4},
            {x: 4, y: 3},
            {x: 4, y: 0}
          ]}
          interpolation="monotone"
          label="LINE"
          style={{
            data: {
              stroke: "#822722",
              strokeWidth: 0,
              fill: "red",
              ":hover": {stroke: "#c33b33"}
            }
          }}
        />
      </div>
    )
  }
});

module.exports = Graphs;
