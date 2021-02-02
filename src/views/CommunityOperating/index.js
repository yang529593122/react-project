import React, { Component } from "react";
import { connect } from "react-redux";
import { CONTENT_HEAD, SELECT_LIST } from "./data";
import InsideHead from "../../components/InsideHead";
import styles from "./style.module.styl";
import Selects from "../../components/Operating/Select";
import List from "./list";

class CommunityOperating extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    sessionStorage.setItem("startpagetime", new Date().valueOf());
    const { productline, getcommunityList, getcommunitystatus } = this.props;
    productline();
    getcommunityList();
    getcommunitystatus();
  }
  componentWillUnmount() {
    const { pagetime } = this.props;
    pagetime.setPageTime({
      duration: new Date().valueOf() - sessionStorage.getItem("startpagetime"),
      action: 10002
    });
  }
  get filterProps() {
    const {
      getcommunityList,
      gethandleproductlinelist,
      productlinelistData,
      groupstate,
      productlinechange,
      coursename,
      productlinelist
    } = this.props;
    return {
      onFilterChange: query => {
        let parms = {};
        if (query) {
          const { condition } = query;
          parms.courseName = condition.coursename;
          parms.groupName = condition.classname;
          parms.pageNum = 1;
          parms.pageSize = 20;
          parms.productLine = condition.productlinelist;
          parms.status = condition.groupstate;
          this.setState({
            ...query
          });
        } else {
          let obj = {
            classname: "",
            coursename: "",
            endTime: "",
            productlinelist: "",
            startTime: ""
          };
          this.setState({
            condition: obj
          });
          parms.pageNum = 1;
          parms.pageSize = 20;
        }

        getcommunityList(parms);
      },
      onlinkageChange: value => {
        productlinechange(value);
      },
      handleproductlinelist: value => {
        gethandleproductlinelist(value);
      },
      productlinelistData,
      productlinelist,
      coursename,
      groupstate: groupstate,
      selectList: SELECT_LIST,
      isReset: true
    };
  }
  get listProps() {
    const { list, pagination, loading, getcommunityList } = this.props;
    return {
      dataSource: list,
      pagination,
      loading: loading > 0,
      onChange: page => {
        const { condition } = this.state;
        if (condition) {
          getcommunityList({
            courseName: condition.coursename,
            groupName: condition.classname,
            pageNum: page.current,
            pageSize: page.pageSize,
            productLine: condition.productlinelist,
            status: condition.groupstate
          });
        } else {
          getcommunityList({
            pageNum: page.current,
            pageSize: page.pageSize
          });
        }
      },
      onLink: aseId => {
        localStorage.setItem("itemGyoupData", JSON.stringify(aseId));
        this.props.history.push(
          `/app/operations/community/details/${aseId.kgId}`
        );
      }
    };
  }
  render() {
    return (
      <div>
        <InsideHead contentHead={CONTENT_HEAD} />
        <div className={styles.listWrapper}>
          <Selects {...this.filterProps} />
          <List {...this.listProps} />
        </div>
      </div>
    );
  }
}

export default connect(
  ({ operations, pagetime }) => ({
    ...operations,
    pagetime
  }),
  ({ operations, pagetime }) => ({ ...operations, pagetime })
)(CommunityOperating);
