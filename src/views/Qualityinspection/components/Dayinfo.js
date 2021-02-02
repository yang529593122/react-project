import React, { Component } from "react";
import { connect } from "react-redux";
import { Table, BackTop, Select } from "antd";
import { ALL_WORDS } from "./data";
import WordSearch from "./WordSearch";
import InsideHead from "../../../components/InsideHead";

const { Option } = Select;

class Dayinfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      titleDifference: "全部话术",
      visible: false,
      imgUrl: "",
      payload: {},
      timeStorag: true,
      timeStoragData: [],
      md5: ""
    };
  }

  componentDidMount() {
    this.getRecord();
  }

  getRecord = () => {
    let url = this.props.location.search.split("="); //将参数用=分割成数组
    let strs = url[1].split("&");
    const { getcommunityRecord } = this.props;
    const payload = {
      kgId: strs[0],
      convertDate: url[2]
    };
    this.setState({
      payload: { ...payload }
    });

    getcommunityRecord(payload); // 查询话术
    this.setState({
      md5: strs[0]
    });
  };

  linkImg = url => {
    this.setState({
      visible: true,
      imgUrl: url
    });
  };

  maskImg = () => {
    const { visible } = this.state;
    if (visible) {
      return (
        <div
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
      return "<a href='" + $url + "' target='_blank'>" + $url + "</a>";
    });
    return newText;
  };

  get filterProps() {
    const { getcommunityRecord } = this.props;
    return {
      onFilterChange: query => {
        const { payload } = this.state;
        let payloadObj = {
          ...payload,
          startTime: query.startTime,
          endTime: query.endTime
        };
        getcommunityRecord(payloadObj); // 查询话术
      },

      isReset: true
    };
  }

  render() {
    const { recordList, troubleType } = this.props;
    let columns = [
      {
        title: "时间",
        dataIndex: "chatTime",
        width: 150,
        align: "center",
        key: "chatTime"
      },
      {
        title: "昵称",
        dataIndex: "nickname",
        width: 80,
        align: "center",
        key: "nickname"
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
        width: 250,
        align: "left",
        key: "content",
        onFilter: (value, record) => record.content.indexOf(value) >= 0,
        render: (text, record, index) => {
          if (text.indexOf("http") === -1) {
            return <span>{text}</span>;
          } else {
            let name = /\.[^\.]+$/.exec(text);
            const species = [".jpg", ".png", ".jpeg", ".gjf", ".tiff"];
            if (text.indexOf("http") === 0) {
              if (species.indexOf(name[0]) !== -1) {
                return (
                  <span
                    className="link-img"
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
                  >
                    {text}
                  </a>
                );
              }
            } else {
              return (
                <div
                  dangerouslySetInnerHTML={{ __html: this.autoTextUrl(text) }}
                />
              );
            }
          }
        }
      },
      {
        title: "纠错",
        dataIndex: "trouble",
        width: 190,
        align: "center",
        key: "trouble",
        render: (text, record) => {
          const { md5 } = this.state;
          const { getChatKeywordList } = this.props;
          return (
            <Select
              className="details-list-select-box"
              defaultValue={text}
              style={style}
              onChange={val =>
                handleChange(val, md5, record, getChatKeywordList)
              }
            >
              {troubleType.map((item, index) => {
                return (
                  <Option value={item.value} key={index}>
                    {item.text}
                  </Option>
                );
              })}
            </Select>
          );
        }
      }
    ];

    function handleChange(value, md5, record, getUrl) {
      const query = {
        chatTime: record.chatTime,
        kgId: md5,
        trouble: value
      };
      getUrl(query);
    }

    const style = {
      height: 34,
      width: 190,
      lineHeight: 34,
      borderRadius: 4,
      color: "#3B4859",
      textAlign: "center",
      fontSize: 14
    };

    return (
      <div>
        {recordList && (
          <div>
            <InsideHead contentHead={ALL_WORDS} />
            <div
              style={{ marginTop: "20px", padding: "20px", background: "#fff" }}
            >
              <WordSearch {...this.filterProps} />
            </div>
            <div style={{ padding: "20px", background: "#fff" }}>
              <Table
                className="list-box"
                dataSource={recordList}
                bordered
                columns={columns}
                rowKey={(record, index) => index}
                pagination={false}
                scroll={{ x: 1200 }}
              />
              <BackTop>
                <div style={style}>UP</div>
              </BackTop>
            </div>
          </div>
        )}
        {this.maskImg()}
      </div>
    );
  }
}

export default connect(
  ({ qualityinspection }) => ({ ...qualityinspection }),
  ({ qualityinspection }) => ({ ...qualityinspection })
)(Dayinfo);
