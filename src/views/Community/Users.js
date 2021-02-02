import React, { Component } from "react";
import { connect } from "react-redux";
import InsideHead from "../../components/InsideHead";
import { CONTENT_HEAD, USER_LIST_COLUMNS } from "./data";
import FormItem from "./components/FormItem";
import UserList from "./components/UserList";
import "./css/CommunityUser.less";

class Users extends Component {
  state = {};
  componentDidMount() {
    sessionStorage.setItem("startpagetime", new Date().valueOf());
    const { submitUserListForm, submitUserList } = this.props;
    submitUserListForm();
    submitUserList();
  }
  setOptionValue(value, index) {
    const { setUseListOptionValue } = this.props;
    let obj = { value, index };
    setUseListOptionValue(obj);
  }
  subForm() {
    const { submitUserList, navlist, navlistformdata } = this.props;
    let obj = navlistformdata.filter(
      item => item.courseId === navlist[0].value
    );
    obj[0].pageNum = 1;
    obj[0].pageSize = 10;
    submitUserList(obj[0]);
  }
  resetForm() {
    const { resetUserListForm, submitUserList } = this.props;
    submitUserList();
    resetUserListForm();
  }
  onchangepage(page) {
    const { submitUserList, navlist, navlistformdata } = this.props;
    let obj = navlistformdata.filter(
      item => item.courseId === navlist[0].value
    );
    if (!obj.length) {
      obj.push({
        pageNum: page.current,
        pageSize: page.pageSize
      });
    } else {
      obj[0].pageNum = page.current;
      obj[0].pageSize = page.pageSize;
    }
    submitUserList(obj[0]);
  }
  render() {
    const { navlist, UserListData } = this.props;
    return (
      <div className="community-users">
        <InsideHead contentHead={CONTENT_HEAD} />
        <div className="community-warp">
          <FormItem
            navlist={navlist}
            setOptionValue={this.setOptionValue.bind(this)}
            subForm={this.subForm.bind(this)}
            resetForm={this.resetForm.bind(this)}
          />
          <UserList
            columns={USER_LIST_COLUMNS}
            data={UserListData}
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
)(Users);
