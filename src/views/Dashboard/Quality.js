import React, { Component } from "react";
import { connect } from "react-redux";
import { CONTENT_HEAD, PLATFORM_LIST } from "./data";
import InsideHead from "../../components/InsideHead";
import TitleItem from "./Qualitycom/TitleItem";
import Tablebox from "./Qualitycom/Tablebox";
import Carouselbox from "./Qualitycom/Carouselbox";
import "./index.less";
class Quality extends Component {
  componentDidMount() {
    const { getAnalyzeTableData, getAnalyzeDailyData } = this.props;
    getAnalyzeTableData();
    getAnalyzeDailyData();
  }
  render() {
    const { analyzeTableData, DailyData } = this.props;
    return (
      <div className="Dashboard">
        <InsideHead contentHead={CONTENT_HEAD} />
        <div className="Dashboard_table">
          <div className="Dashboard_table_left">
            <TitleItem title="未质检社群" />
            <Tablebox analyzeTableData={analyzeTableData} />
          </div>
          <div className="Dashboard_table_right">
            <TitleItem title="每日日报" />
            <Carouselbox DailyData={DailyData} />
          </div>
        </div>
      </div>
    );
  }
}
export default connect(
  ({ quality }) => ({ ...quality }),
  ({ quality }) => ({ ...quality })
)(Quality);
