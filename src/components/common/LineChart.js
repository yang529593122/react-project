import React, { Component } from "react";
// import ReactDOM from "react-dom"
import { Chart } from "@antv/g2";
class LineChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chart: null
    };
  }
  componentDidMount() {
    const { mapData, cishu } = this.props;
    const chart = new Chart({
      container: this.props.id,
      autoFit: true,
      height: 600,
      padding: [50, 160, 100, 160]
    });
    this.beiginmap(chart, mapData, cishu);
    this.setState({ chart });
  }
  beiginmap(chart, mapData, cishu) {
    chart.data(mapData);
    let temperature = {};
    if (!cishu) {
      temperature.min = 0;
      temperature.max = 1;
    } else {
      temperature.nice = true;
    }
    chart.scale({
      day: {
        range: [0, 1]
      },
      temperature: temperature
    });
    chart.tooltip({
      showCrosshairs: true,
      shared: true
    });
    chart.axis("temperature", {
      label: {
        formatter: val => {
          let str = cishu ? val : val * 100 + "%";
          return str;
        }
      }
    });
    chart
      .line()
      .position("day*temperature")
      .color("city")
      .shape("smooth")
      .tooltip("day*temperature*city", function(day, value, type) {
        let str = cishu ? value : parseInt(value * 100) + "%";
        return {
          title: type,
          name: day,
          value: str
        };
      });
    chart
      .point()
      .position("day*temperature")
      .color("city")
      .shape("circle");
    chart.render();
  }
  componentWillUpdate(newProps) {
    const { mapData, cishu } = newProps;
    const { chart } = this.state;
    if (chart) {
      chart.clear();
      this.beiginmap(chart, mapData, cishu);
    }
  }
  render() {
    return <div id={this.props.id}></div>;
  }
}
export default LineChart;
