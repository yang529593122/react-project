import React, { Component } from "react";
import { connect } from "react-redux";
import { Table } from "antd";
import WordSearch from "../../components/Operating/WordSearch";
import { WORD_SEARCH_OPERATION } from "./data";
import styles from "./style.module.styl";

class ViewOperation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      titleDifference: "全部话术",
      visible: false,
      imgUrl: "",
      payload: {},
      timeStorag: true,
      timeStoragData: []
    };
  }

  componentDidMount() {
    sessionStorage.setItem("startpagetime", new Date().valueOf());
    this.getRecord();
  }

  getRecord = () => {
    let url = this.props.location.search.split("="); //将参数用=分割成数组
    let strs = url[1].split("&");
    const { getcommunityRecord, getChatKeywordList } = this.props;
    const payload = {
      id: strs[0],
      operator: url[2],
      startTime: "",
      endTime: ""
    };
    this.setState({
      payload: { ...payload }
    });

    getcommunityRecord(payload);
    getChatKeywordList(payload);
    if (url[2] === "true") {
      this.setState({
        titleDifference: "运营者话术"
      });
    }
  };

  linkImg = url => {
    window.open(url);
    // this.setState({
    //   visible: true,
    //   imgUrl: url
    // });
  };

  maskImg = () => {
    const { visible } = this.state;
    if (visible) {
      return (
        <div
          className={styles.allImg}
          onClick={() => {
            this.setState({
              visible: false
            });
          }}
        >
          <img src={this.state.imgUrl} alt="img" />
        </div>
      );
    }
  };

  autoTextUrl = text => {
    var regexp = /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|\&|-)+)/g;
    let newText = text.replace(regexp, function($url) {
      return (
        "<a href='" +
        $url +
        "'  target='_blank' rel='noopener noreferrer' >" +
        $url +
        "</a>"
      );
    });
    return newText;
  };

  get filterProps() {
    const { getcommunityRecord, recordList, getChatKeywordList } = this.props;
    const { timeStorag } = this.state;
    let firstTime, lastTime;
    if (timeStorag) {
      if (recordList.length !== 0) {
        firstTime = recordList[0].time;
        lastTime = recordList[recordList.length - 1].time;
        setTimeout(() => {
          this.setState({
            timeStoragData: [firstTime, lastTime],
            timeStorag: false
          });
        });
      }
    }

    return {
      onFilterChange: query => {
        const { payload } = this.state;
        let payloadObj = {
          ...payload,
          startTime: query.startTime,
          endTime: query.endTime
        };
        getcommunityRecord(payloadObj);
        getChatKeywordList(payloadObj);
      },
      selectList: WORD_SEARCH_OPERATION,
      isReset: true,
      timeScop: this.state.timeStoragData
    };
  }

  render() {
    const { recordList, setKeywordList } = this.props;
    const { titleDifference, payload } = this.state;
    let retrieveData = [];

    if (!!setKeywordList) {
      for (let key in setKeywordList) {
        retrieveData.push({
          value: key,
          text: `${key}(${setKeywordList[key]})`
        });
      }
    }

    let columns = [
      {
        title: "时间",
        dataIndex: "time",
        width: 250,
        align: "center",
        key: "time"
      },
      {
        title: "昵称",
        dataIndex: "nickname",
        width: 180,
        align: "center",
        key: "nickname",
        render: (text, record) => {
          return (
            <span>
              {text} <b style={{ color: "#1890ff" }}>{record.memberType}</b>
            </span>
          );
        }
      },
      {
        title: "类型",
        dataIndex: "messageType",
        width: 100,
        align: "center",
        key: "messageType"
      },
      {
        title: "内容",
        dataIndex: "content",

        align: "left",
        key: "content",
        filters: retrieveData,
        onFilter: (value, record) => record.content.indexOf(value) >= 0,
        render: (text, record, index) => {
          if (text.indexOf("http") === -1) {
            return <span className={styles.textareaBox}>{text}</span>;
          } else {
            let name = /\.[^\.]+$/.exec(text);
            const species = [".jpg", ".png", ".jpeg", ".gjf", ".tiff"];
            if (text.indexOf("http") === 0) {
              if (species.indexOf(name[0]) !== -1) {
                return (
                  <span
                    className="linkImg"
                    onClick={() => {
                      this.linkImg(text);
                    }}
                  >
                    {text}
                  </span>
                );
              } else {
                return (
                  <a
                    href={text}
                    style={{ wordBreak: "break-all" }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {text}
                  </a>
                );
              }
            } else {
              return (
                <div
                  className={styles.textareaBox}
                  dangerouslySetInnerHTML={{ __html: this.autoTextUrl(text) }}
                />
              );
            }
          }
        }
      }
    ];
    // 如果是运营者话术
    if (!!payload.query && payload.query === "true") {
      const operatorsArr = [
        {
          title: "活跃人数",
          dataIndex: "memberCount",
          width: 90,
          align: "center",
          key: "memberCount"
        },
        {
          title: "对话条数",
          dataIndex: "chatCount",
          width: 90,
          align: "center",
          key: "chatCount"
        }
      ];

      columns = [...columns, ...operatorsArr];
    }

    return (
      <div className="view-box">
        {recordList && (
          <div>
            <h1 className="title">{titleDifference}</h1>

            <div className={styles.searchArea}>
              <WordSearch {...this.filterProps} />
            </div>
            <Table
              dataSource={recordList}
              bordered
              columns={columns}
              pagination={false}
            />
          </div>
        )}
        {this.maskImg()}
      </div>
    );
  }
}

export default connect(
  ({ operations }) => ({ ...operations }),
  ({ operations }) => ({ ...operations })
)(ViewOperation);
