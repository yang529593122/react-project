import React, { Component } from "react";
import { connect } from "react-redux";
import { BURIED_POINT } from "./data";
import "./css/MultiSelect.less";
class MultiSelect extends Component {
  state = {};
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
  }
  componentDidMount() {
    const { data } = this.props;
    let newdata = data.map((item, index) => {
      if (index === 0) {
        return {
          text: item,
          show: true
        };
      } else {
        return {
          text: item,
          show: false
        };
      }
    });
    this.setState({
      data: newdata
    });
  }
  seleitem(item, index) {
    const { setBuriedPoint } = this.props;
    let pointArr = BURIED_POINT.filter(it => it.name === item.text);
    setBuriedPoint({ action: pointArr[0].num });
    let newarr = this.state.data;
    newarr[index].show = !newarr[index].show;
    this.setState({ data: newarr });
    this.props.seleOchang(newarr);
  }
  render() {
    const { title } = this.props;
    const { data } = this.state;
    return (
      <div className="MultiSelect">
        <div className="MultiSelect-title">{title}:</div>
        <div className="MultiSelect-list">
          {data
            ? data.map((item, index) => {
                return (
                  <div
                    className={`MultiSelect-item ${
                      item.show ? "activeColor" : null
                    }`}
                    key={index}
                    onClick={this.seleitem.bind(this, item, index)}
                  >
                    {item.text}
                  </div>
                );
              })
            : ""}
        </div>
      </div>
    );
  }
}
export default connect(
  ({ operations }) => ({ ...operations }),
  ({ operations }) => ({ ...operations })
)(MultiSelect);
