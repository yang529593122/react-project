import React, { Component } from "react";
import { connect } from "react-redux";
import GroupItem from "./components/GroupItem";
// import AddClass from "./components/AddClass";
import "./grouping.less";
class Grouping extends Component {
  state = {
    modelShow: false,
    itemdata: null,
    addShowIcon: "",
    delShowIcon: false
  };
  componentDidMount() {
    const { getAllCourse, getOpDis, getOpgroup } = this.props;
    getAllCourse();
    getOpDis();
    getOpgroup();
  }
  handleSelect(data) {
    const { changeSeleItemShow } = this.props;

    changeSeleItemShow(data);
  }
  handleSelect2(data) {
    const { changeSeleItemShow2, list } = this.props;
    let flag = list.every(item => item.show === true);
    this.setState({
      delShowIcon: !flag
    });
    changeSeleItemShow2(data);
  }
  handleSelectClass(data) {
    this.setState({
      itemdata: data
    });
  }
  handleSwitchCourse() {
    this.setState({
      modelShow: true
    });
  }

  handleClickClose() {
    this.setState({
      modelShow: false
    });
    const { handleSearchChange } = this.props;
    handleSearchChange();
  }
  handleClickReally() {
    const { itemdata } = this.state;
    const { changeSelectClass, getOpgroup } = this.props;
    if (itemdata) {
      changeSelectClass(itemdata);
      this.setState({
        modelShow: false
      });
      localStorage.setItem("courseId", itemdata.courseId);
      localStorage.setItem("courseName", itemdata.courseName);
      getOpgroup(itemdata.courseId);
    }
  }
  getOpAddFn() {
    const { getOpAdd, courseId, OpDisData, getOpDis, getOpgroup } = this.props;
    let arrobj = OpDisData.filter(item => item.show === true);
    let objparms = {
      courseId: courseId,
      groupMd5IdList: []
    };
    arrobj.map(item => objparms.groupMd5IdList.push(item.groupMd5Id));
    getOpAdd(objparms).then(res => {
      if (res) {
        getOpDis();
        getOpgroup(courseId);
      }
    });
  }
  getOpRemoveFn() {
    const { getOpRemove, courseId, list, getOpDis, getOpgroup } = this.props;
    let arrobj = list.filter(item => item.show === true);
    let objparms = {
      courseId: courseId,
      groupMd5IdList: []
    };
    arrobj.map(item => objparms.groupMd5IdList.push(item.groupMd5Id));
    getOpRemove(objparms).then(res => {
      if (res) {
        getOpDis();
        getOpgroup(courseId);
      }
    });
  }
  handleSearch(value) {
    const { handleSearchChange } = this.props;
    handleSearchChange(value);
  }
  handleSearchWfz(value){
     const { handleSearchChangeWfz } = this.props;
     handleSearchChangeWfz(value);
    
  }
  render() {
    const { modelShow } = this.state;
    const {
      OpDisData,
      list,
      courseName,
      courseId,
      AllCourseData,
      addShowIcon,
      delShowIcon
    } = this.props;

    return (
      <div className="Grouping">
        {/* 切换 */}
        {modelShow ? (
          <div className="model_box">
            <div className="model_conent">
              <GroupItem
                title="切换课程"
                data={AllCourseData}
                GroupItemBtn={true}
                handleSelect={this.handleSelectClass.bind(this)}
                handleClickClose={this.handleClickClose.bind(this)}
                handleClickReally={this.handleClickReally.bind(this)}
                handleSearch={this.handleSearch.bind(this)}
              />
            </div>
          </div>
        ) : (
          ""
        )}

        <GroupItem
          title="未分组社群"
          data={OpDisData}
          seacrchbtn={true}
          handleSelect={this.handleSelect.bind(this)}
          handleSearch={this.handleSearchWfz.bind(this)}
        />
        <div className="fig_icon">
          <div>
            {addShowIcon ? (
              <img
                onClick={this.getOpAddFn.bind(this)}
                src="https://img.kaikeba.com/a/61205132010202xkey.svg"
                alt=""
              />
            ) : (
              <img
                src="https://img.kaikeba.com/a/03205132010202uylu.svg "
                alt=""
              />
            )}
          </div>
          <div>
            {delShowIcon ? (
              <img
                onClick={this.getOpRemoveFn.bind(this)}
                src="https://img.kaikeba.com/a/34105132010202qlsk.svg"
                alt=""
              />
            ) : (
              <img
                src="https://img.kaikeba.com/a/34205132010202duos.svg"
                alt=""
              />
            )}
          </div>
        </div>
        <GroupItem
          title={courseName}
          num={courseId}
          showbtn={true}
          data={list}
          handleSelect={this.handleSelect2.bind(this)}
          handleSwitchCourse={this.handleSwitchCourse.bind(this)}
        />
      </div>
    );
  }
}
export default connect(
  ({ monitor }) => ({
    ...monitor
  }),
  ({ monitor }) => ({ ...monitor })
)(Grouping);
