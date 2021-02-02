import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Input, Select, Button, message } from "antd";
import "./AddKoyword.less";
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 }
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 }
};
class EditKeyWords extends Component {
  state = {};
  onFinish(data) {
    const { itemData, editKeystring } = this.props;
    if (!data.keywords) {
      message.warning("设置关键词内容不能为空！");
      return false;
    }
    let obj = {
      courseId: itemData.courseId,
      courseName: itemData.courseName,
      keywords: data.keywords,
      productLine: itemData.productLine
    };
    editKeystring(obj);
  }
  showformword() {
    const { setKeywordshow } = this.props;
    setKeywordshow(false);
  }
  render() {
    const { itemData } = this.props;
    return (
      <div className="AddKoyword">
        <div className="AddKoyword_conent">
          <Form
            initialValues={{
              keywords: itemData.keywords
            }}
            name="nest-messages"
            className="AddKoyword-form"
            {...formItemLayout}
            onFinish={this.onFinish.bind(this)}
          >
            <Form.Item label="关键词设置">
              <Form.Item name="keywords">
                <Input.TextArea />
              </Form.Item>
              <p>关键词之间以 # 进行间隔</p>
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Button
                style={{ margin: "0 20px" }}
                onClick={this.showformword.bind(this)}
              >
                取消
              </Button>
              <Button type="primary" htmlType="submit">
                提交
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}
export default connect(
  ({ keywords }) => ({ ...keywords }),
  ({ keywords }) => ({ ...keywords })
)(EditKeyWords);
