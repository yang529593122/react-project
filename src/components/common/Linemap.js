import React, { Component } from "react";
import { Chart } from "@antv/g2";
class Linemap extends Component {
  state = {
    chart: null
  };
  componentDidMount() {
    const { id, mapData } = this.props;

    const chart = new Chart({
      container: id,
      autoFit: true,
      height: 500
    });

    chart.data(mapData);
    chart.scale({
      day: {
        range: [0, 1]
      },
      temperature: {
        nice: true
      }
    });

    chart.tooltip({
      showCrosshairs: true,
      shared: true
    });

    chart.axis("temperature", {
      label: {
        formatter: val => {
          return val + "%";
        }
      }
    });

    chart
      .line()
      .position("day*temperature")
      .color("city")
      .shape("smooth");

    chart
      .point()
      .position("day*temperature")
      .color("city")
      .shape("circle");
    chart.render();
    this.setState({ chart });
  }
  componentWillUpdate(newProps, newState) {
    const { mapData } = newProps;
    const { chart } = this.state;
    chart !== null && chart.changeData(mapData);
  }
  render() {
    return <div id={this.props.id}></div>;
  }
}

export default Linemap;
