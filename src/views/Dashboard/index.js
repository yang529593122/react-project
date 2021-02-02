import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col } from "antd";
import TitleItem from "./components/TitleItem";
import SheTable from "./components/SheTable";
import FormItem from "./components/FormItem";
import Linemap from "../../components/common/Linemap";
import "./css/index.less";
class CommunityAnalysis extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    sessionStorage.setItem("startpagetime", new Date().valueOf());
    const {
      getConversationCount,
      getCommunityCount,
      getCommunityCourse
    } = this.props;
    if (localStorage.getItem("businessId")) {
      getConversationCount();
      getCommunityCount();
      getCommunityCourse();
    }
  }
  componentWillUnmount() {
    const { pagetime } = this.props;
    pagetime.setPageTime({
      duration: new Date().valueOf() - sessionStorage.getItem("startpagetime"),
      action: 10001
    });
    const { updateState } = this.props;
    updateState({
      activeRatearr: [],
      replyRatearr: [],
      delvalue: null,
      classnamelist: []
    });
  }
  render() {
    const {
      ConversationCountData,
      CommunityCourse,
      activeRatearr,
      replyRatearr,
      classnamelist
    } = this.props;
    return (
      <div className="analysis-box">
        <Row>
          <Col span={24} className="analysis-top-chart">
            <TitleItem title="对话数据" />
            <div className="num_box">
              <div className="num_box_item">
                <span>总量(条)</span>
                {ConversationCountData && ConversationCountData.countTotal ? (
                  <span>{ConversationCountData.countTotal}</span>
                ) : (
                  0
                )}
              </div>
              <div className="num_box_item">
                <span>昨日(条)</span>
                {ConversationCountData &&
                ConversationCountData.countYesterday ? (
                  <span>{ConversationCountData.countYesterday}</span>
                ) : (
                  0
                )}
              </div>
            </div>
          </Col>
          <Col span={24} className="analysis-top-chart">
            <TitleItem title="社群数量" />
            <div className="analysis-table">
              <SheTable />
            </div>
          </Col>
          {/* <Col span={24} className="analysis-top-chart">
            <div className="wordchart_list">
              <div className="wordchart_list-item">
                <TitleItem title="课程词云" />
                <WordCloud />
              </div>
              <div className="wordchart_list-item">
                <TitleItem title="词频排名" />
                <WordFrequency />
              </div>
            </div>
          </Col> */}
          <Col
            span={24}
            className="analysis-top-chart analysis-top-chart-nomargin"
          >
            <FormItem
              CommunityCourse={CommunityCourse}
              classnamelist={classnamelist}
            />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <div className="analysis-title-box">
              <TitleItem title="用户活跃度" />
            </div>
            <div className="analysis-chart-div">
              {activeRatearr.length ? (
                <Linemap id="one" mapData={activeRatearr}></Linemap>
              ) : (
                "暂无数据"
              )}
            </div>
          </Col>
          <Col span={12} className="analysis-chart">
            <div className="analysis-title-box">
              <TitleItem title="学员回复占比" />
            </div>
            <div className="analysis-chart-div">
              {replyRatearr.length ? (
                <Linemap id="two" mapData={replyRatearr}></Linemap>
              ) : (
                "暂无数据"
              )}
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default connect(
  ({ dashboard, pagetime }) => ({ ...dashboard, pagetime }),
  ({ dashboard, pagetime }) => ({ ...dashboard, pagetime })
)(CommunityAnalysis);
