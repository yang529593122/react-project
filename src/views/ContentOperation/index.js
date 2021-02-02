import React, { Component } from "react";
import { connect } from "react-redux";
import InsideHead from "../../components/InsideHead";
import { CONTENT_HEAD, SELECT_LIST, PLATFORM_LIST } from "./data";
import Selects from "../../components/Operating/Select";
import Modal from "../../components/Operating/Modal";
import List from "./list";
import styles from "./style.module.styl";

class ContentOperation extends Component {
  componentDidMount() {
    sessionStorage.setItem("startpagetime", new Date().valueOf());
  }
  constructor(props) {
    super(props);
    this.state = {};
  }

  get filterProps() {
    const { getcommunityList, shareList } = this.props;
    let companyStatus = JSON.parse(sessionStorage.getItem("companyStatus"));
    return {
      onFilterChange: query => {
        getcommunityList(query);
      },
      selectList: SELECT_LIST,
      qunstatus: [shareList, companyStatus]
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
      },
      onLink: aseId => {
        this.props.history.push(`/app/operations/content/details/${aseId}`);
      }
    };
  }

  render() {
    return (
      <div>
        <InsideHead contentHead={CONTENT_HEAD} />
        <div className={styles.listWrapper}>
          <h3>表单列表</h3>
          <Selects {...this.filterProps} />
          <Modal platformList={PLATFORM_LIST} />
          <List {...this.listProps} />
        </div>
      </div>
    );
  }
}

export default connect(
  ({ operations }) => ({ ...operations }),
  ({ operations }) => ({ ...operations })
)(ContentOperation);
