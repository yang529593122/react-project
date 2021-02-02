import React, { Component } from "react";
import { connect } from "react-redux";
import InsideHead from "../../components/InsideHead";
import { DETAIL_HEAD, CONTRAST, SELECT_PARAMETER } from "./data";
import Selects from "../../components/Operating/Select";
import List from "./detailsList";
import ImgLinkModal from "./linkModal";
import styles from "./style.module.styl";

class ContentOperation extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  get filterProps() {
    const { shareList, updateState } = this.props;
    let companyStatus = JSON.parse(sessionStorage.getItem("companyStatus"));
    return {
      onFilterChange: query => {
        updateState({ linkModalVisible: true });
      },
      selectList: CONTRAST,
      parameter: SELECT_PARAMETER,
      qunstatus: [shareList, companyStatus],
      isReset: false
    };
  }

  get listProps() {
    const { list, pagination, loading } = this.props;
    return {
      dataSource: list,
      pagination,
      loading: loading > 0,
      onChange: page => {
        this.handleRefresh({
          pageNum: page.current,
          pageSize: page.pageSize
        });
      }
    };
  }

  get linkModalProps() {
    const { linkModalVisible, updateState } = this.props;
    return {
      item: SELECT_PARAMETER,
      visible: linkModalVisible,
      width: 1200,
      footer: false,
      onCancel: () => {
        updateState({ linkModalVisible: false });
      }
    };
  }

  render() {
    const { linkModalVisible } = this.props;
    return (
      <div>
        <InsideHead contentHead={DETAIL_HEAD} />
        <div className={styles.listWrapper}>
          <h3>课程详情</h3>
          <Selects {...this.filterProps} />
          <List {...this.listProps} />
          {linkModalVisible && <ImgLinkModal {...this.linkModalProps} />}
        </div>
      </div>
    );
  }
}

export default connect(
  ({ operations }) => ({ ...operations }),
  ({ operations }) => ({ ...operations })
)(ContentOperation);
