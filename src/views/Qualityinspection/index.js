import React, { Component } from "react";
import { connect } from "react-redux";
import { CONTENT_HEAD, SELECT_LIST, SELECT_PARAMETER } from "./data";
import InsideHead from "../../components/InsideHead";
import styles from "./css/style.module.styl";
import Selects from "./Selects";
import List from "./list";

class Qualityinspection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectsQuery: {
        code: 0,
        message: "",
        results: {}
      },
      condition: {
        daysSort: null,
        endTime: null,
        groupNumber: null,
        productLine: "", // 产品线
        sellerCamp: "", // 营
        sellerGroup: "", // 组
        startTime: null,
        startTimeSort: "DESC",
        status: null
      }
    };
  }

  componentDidMount() {
    sessionStorage.setItem("startpagetime", new Date().valueOf());

    const { getcommunityList, getcommunityStatus } = this.props;
    const { condition } = this.state;
    getcommunityList(condition);
    getcommunityStatus();
  }
  get filterProps() {
    const {
      getcommunityList,
      inspectionStatu,
      productList,
      sellerCampList,
      sellerGroupList,
      setSellerGroupList
    } = this.props;
    return {
      onFilterChange: query => {
        getcommunityList(query.condition);
        this.setState({
          ...query
        });
      },
      selectList: SELECT_LIST,
      parameter: SELECT_PARAMETER,
      qunstatus: [
        productList,
        sellerCampList,
        sellerGroupList,
        [],
        inspectionStatu
      ],
      isReset: true,
      setSellerGroupList
    };
  }
  get listProps() {
    const { list, pagination, loading } = this.props;

    return {
      dataSource: list,
      pagination,
      loading: loading > 0,
      onChange: (page, pagination, sorter) => {
        // 升序 降序
        const sorting = {
          ascend: "ASC",
          descend: "DESC",
          undefined: null
        };
        if (sorter.order !== undefined) {
          if (sorter.columnKey === "startTime") {
            this.setState(
              {
                condition: {
                  ...this.state.condition,
                  startTimeSort: sorting[sorter.order],
                  daysSort: null
                }
              },
              () => {
                this.props.getcommunityList({
                  ...this.state.condition,
                  pageNum: page.current,
                  pageSize: page.pageSize
                });
              }
            );
          } else {
            this.setState(
              {
                condition: {
                  ...this.state.condition,
                  startTimeSort: null,
                  daysSort: sorting[sorter.order]
                }
              },
              () => {
                this.props.getcommunityList({
                  ...this.state.condition,
                  pageNum: page.current,
                  pageSize: page.pageSize
                });
              }
            );
          }
        } else {
          this.setState(
            {
              condition: {
                ...this.state.condition,
                startTimeSort: sorting[sorter.order],
                daysSort: sorting[sorter.order]
              }
            },
            () => {
              this.props.getcommunityList({
                ...this.state.condition,
                pageNum: page.current,
                pageSize: page.pageSize
              });
            }
          );
        }
      },
      onLink: aseId => {
        this.props.history.push(`/app/qualityinspection/Itemdetail/${aseId}`);
      }
    };
  }

  render() {
    return (
      <div>
        <InsideHead contentHead={CONTENT_HEAD} />
        <div>
          <Selects {...this.filterProps} />
          <List {...this.listProps} />
        </div>
      </div>
    );
  }
}

export default connect(
  ({ qualityinspection }) => ({ ...qualityinspection }),
  ({ qualityinspection }) => ({ ...qualityinspection })
)(Qualityinspection);
