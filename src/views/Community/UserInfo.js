import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import InsideHead from "../../components/InsideHead";
import { CONTENT_HEAD, USER_INFO_LIST_COLUMNS } from "./data";
import FormItem from "./components/FormItem";
import UserList from "./components/UserList";
import "./css/CommunityUser.less";
class UserInfo extends Component {
  state = {};
  componentDidMount() {
    sessionStorage.setItem("startpagetime", new Date().valueOf());
    const { getUserInfoData, match, getUserInfoForm } = this.props;
    let obj = {};
    obj.courseId = match.params.id;
    obj.role = null;
    obj.joinedGroupCount = null;
    getUserInfoData(obj);
    getUserInfoForm();
  }
  setOptionValue(value, index) {
    const { setUseInfoOptionValue } = this.props;
    let obj = { value, index };
    setUseInfoOptionValue(obj);
  }
  subForm() {
    const { getUserInfoData, userInfoNavData, match } = this.props;
    let obj = {};
    obj.courseId = match.params.id;
    obj.role = userInfoNavData[1].value;
    obj.joinedGroupCount = userInfoNavData[0].value;
    obj.pageNum = 1;
    obj.pageSize = 10;
    getUserInfoData(obj);
  }
  resetForm() {
    const { resetUserInfoForm, getUserInfoData, match } = this.props;
    resetUserInfoForm();
    let obj = {};
    obj.courseId = match.params.id;
    obj.role = null;
    obj.joinedGroupCount = null;
    getUserInfoData(obj);
  }
  onchangepage(page) {
    const { getUserInfoData, userInfoNavData, match } = this.props;
    let obj = {};
    obj.courseId = match.params.id;
    obj.role = userInfoNavData[1].value;
    obj.joinedGroupCount = userInfoNavData[0].value;
    obj.pageNum = page.current;
    obj.pageSize = page.pageSize;
    getUserInfoData(obj);
  }
  render() {
    const { UserInfoData, userInfoNavData } = this.props;
    return (
      <div className="community-users">
        <InsideHead contentHead={CONTENT_HEAD} />
        <div className="community-warp">
          <FormItem
            navlist={userInfoNavData}
            setOptionValue={this.setOptionValue.bind(this)}
            subForm={this.subForm.bind(this)}
            resetForm={this.resetForm.bind(this)}
          />
          <UserList
            columns={USER_INFO_LIST_COLUMNS}
            data={UserInfoData}
            changepage={this.onchangepage.bind(this)}
          />
        </div>
      </div>
    );
  }
}

export default connect(
  ({ user }) => ({ ...user }),
  ({ user }) => ({ ...user })
)(withRouter(UserInfo));
