import React, { Component } from "react";
import { Chart } from "@antv/g2";
import { mapdata } from "./ssf";
class Selectitem extends Component {
  state = {};
  componentDidMount() {
    const chart = new Chart({
      container: "container",
      autoFit: true,
      height: 500,
      padding: [32, 8, 48, 48]
    });
    chart.data(mapdata);

    chart.scale({
      carat: {
        sync: true
      },
      price: {
        sync: true
      },
      clarity: {
        sync: true
      }
    });

    chart.facet("rect", {
      fields: ["cut"],
      eachView(view) {
        view
          .point()
          .position("carat*price")
          .color("clarity")
          .shape("circle")
          .style({ fillOpacity: 0.3, stroke: null })
          .size(3);
      }
    });
    chart.render();
  }
  render() {
    return (
      <div className="Selectitem">
        <div id="container"></div>
      </div>
    );
  }
}

export default Selectitem;
