import React, { Component } from "react";
import "./css/TheRadio.less";
class TheRadio extends Component {
  state = {
    defaultIndex: 0
  };
  seleitem(item, index) {
    this.setState({ defaultIndex: index });
    this.props.seleOchang(item);
  }
  render() {
    const { title, data } = this.props;
    const { defaultIndex } = this.state;
    return (
      <div className="TheRadio">
        <div className="TheRadio-title">{title}:</div>
        <div className="TheRadio-list">
          {data
            ? data.map((item, index) => {
                return (
                  <div
                    className={`TheRadio-item ${
                      defaultIndex === index ? "activeColor" : null
                    } `}
                    onClick={this.seleitem.bind(this, item, index)}
                    key={index}
                  >
                    {item}
                  </div>
                );
              })
            : ""}
        </div>
      </div>
    );
  }
}

export default TheRadio;
