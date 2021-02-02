import React, { Component } from "react";
import { connect } from "react-redux";
import {
  CONTENT_HEAD,
  SELECT_LIST,
  PLATFORM_LIST,
  SELECT_PARAMETER
} from "./data";
import InsideHead from "../../components/InsideHead";
import styles from "./style.module.styl";
import Modal from "../../components/Operating/Modal";
import Selects from "../../components/Operating/Select";
import List from "./list";

class ActivityOperations extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    sessionStorage.setItem("startpagetime", new Date().valueOf());
    this.getCommunityStatus();
  }

  getCommunityStatus = () => {
    const obj = {
      condition: {
        company: "",
        status: 0
      }
    };
    const {
      getcommunityCompany,
      getcommunityStatus,
      getcommunityList
    } = this.props;
    getcommunityCompany();
    getcommunityStatus();
    getcommunityList(obj);
  };

  get filterProps() {
    const { getcommunityList, shareList } = this.props;
    let companyStatus = JSON.parse(sessionStorage.getItem("companyStatus"));
    return {
      onFilterChange: query => {
        getcommunityList(query);
      },
      selectList: SELECT_LIST,
      parameter: SELECT_PARAMETER,
      qunstatus: [shareList, companyStatus],
      isReset: true
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
      onDel: aseId => {
        alert(aseId);
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
  ({ operations, loading }) => ({ ...operations }),
  ({ operations }) => ({ ...operations })
)(ActivityOperations);
