import React, { Component } from "react";
import { connect } from "react-redux";
import "./css/FormItem.less";
import { Button, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import SelectItem from "./SelectItem";

import ClassGroupItem from "./ClassGroupItem";
class FormItem extends Component {
  state = {};
  onChangeItem(value) {
    const { getDashboardGroup } = this.props;
    getDashboardGroup(value);
  }
  onChangeItemGroup(value) {
    const { setGroupNumber, DashboardGroup } = this.props;
    let itemdata = DashboardGroup.filter(item => item.groupNumber === value);
    let obj = {
      kgID: itemdata[0].kgID,
      value: value
    };
    setGroupNumber(obj);
  }
  addMapLine() {
    const {
      GroupNumber,
      ClassTitle,
      getCommunityRate,
      delvalue,
      classnamelist,
      setBuriedPoint
    } = this.props;
    if (!ClassTitle) {
      message.warn("请选择课程名称");
      return false;
    }
    if (!delvalue || delvalue === "请选群号") {
      message.warn("请选群号");
      return false;
    }
    let obj = {
      classnamelist: classnamelist,
      GroupNumber: GroupNumber
    };
    setBuriedPoint({ action: 20007, phone: localStorage.getItem("phone") });
    getCommunityRate(obj);
  }
  delItemLine(value) {
    const { delItemLineMap } = this.props;
    delItemLineMap(value);
  }
  render() {
    const {
      CommunityCourse,
      DashboardGroupArr,
      classnamelist,
      delvalue
    } = this.props;
    return (
      <div>
        <div className="FormItem">
          <SelectItem
            title="课程名称"
            optionList={CommunityCourse}
            onChangeItem={this.onChangeItem.bind(this)}
          />
          <SelectItem
            title="群号"
            optionList={DashboardGroupArr}
            onChangeItem={this.onChangeItemGroup.bind(this)}
            delvalue={delvalue}
          />
          <Button
            type="primary"
            shape="round"
            icon={<PlusOutlined />}
            onClick={this.addMapLine.bind(this)}
          >
            添加
          </Button>
        </div>
        <div className="FormItem_ClassGroupItem_list">
          {classnamelist.map((item, index) => (
            <ClassGroupItem
              key={index}
              itemdata={item}
              delItemLine={this.delItemLine.bind(this)}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default connect(
  ({ dashboard }) => ({ ...dashboard }),
  ({ dashboard }) => ({ ...dashboard })
)(FormItem);
