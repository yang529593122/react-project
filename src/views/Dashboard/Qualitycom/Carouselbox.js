import React, { Component } from "react";
import { withRouter } from "react-router-dom";
// import Slider from "react-slick";
import "./Carouselbox.less";

class Carouselbox extends Component {
  gopage(item) {
    window.open(
      `/app/operations/community/details/${item.groupNumber}?form=swiper`,
      "_blank"
    );
  }
  render() {
    const { DailyData } = this.props;
    return (
      <div className="Carouselbox">
        {DailyData &&
          DailyData.map((item, index) => {
            return (
              <div
                className="Carouselbox_item"
                key={"Carouselbox_item_box" + index}
              >
                <div className="Carouselbox_item_top">
                  <span>{item.days}</span>
                  <span>{item.pointName}</span>
                </div>
                <div className="Carouselbox_item_conent">
                  {item.list.map((iteminfo, infoindex) => {
                    return (
                      <div
                        className="Carouselbox_item_conent_item"
                        key={"Carouselbox_item_conent_item" + infoindex}
                      >
                        <p>
                          <span
                            onClick={() => {
                              this.gopage(iteminfo);
                            }}
                          >
                            {iteminfo.groupNumber}
                          </span>
                          群
                        </p>
                        <p>{iteminfo.sellerCamp}</p>
                        <p>{iteminfo.sellerName}</p>
                        <p>{iteminfo.finishStatus}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
      </div>
    );
  }
}

export default withRouter(Carouselbox);
