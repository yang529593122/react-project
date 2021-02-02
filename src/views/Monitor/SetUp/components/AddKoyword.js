import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Input, Select, Button } from "antd";
import "./AddKoyword.less";
const { Option } = Select;
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 }
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 }
};
class AddKoyword extends Component {
  state = {};
  onFinish(data) {
    const { addKeywordsform } = this.props;
    addKeywordsform(data);
  }
  componentDidMount() {
    const { getSelectParams } = this.props;
    getSelectParams();
  }
  selectProLine(val) {
    const { setCourseNameList } = this.props;
    setCourseNameList(val);
  }
  showformword() {
    const { setshowformword } = this.props;
    setshowformword(false);
  }
  render() {
    const { SelectParams, courseNameList } = this.props;
    return (
      <div className="AddKoyword">
        <div className="AddKoyword_conent">
          <Form
            name="nest-messages"
            className="AddKoyword-form"
            {...formItemLayout}
            onFinish={this.onFinish.bind(this)}
            onValuesChange={this.onValuesChange}
          >
            <Form.Item name="productLine" label="产品线">
              <Select
                placeholder="请选择产品线"
                onChange={this.selectProLine.bind(this)}
              >
                {SelectParams &&
                  SelectParams.map((item, index) => {
                    return (
                      <Option key={index} value={item.productLine}>
                        {item.productLine}
                      </Option>
                    );
                  })}
              </Select>
            </Form.Item>
            <Form.Item name="courseName" label="课程名称">
              <Select placeholder="请选择课程名称">
                {courseNameList &&
                  courseNameList.map((item, index) => {
                    return (
                      <Option key={index} value={item}>
                        {item}
                      </Option>
                    );
                  })}
              </Select>
            </Form.Item>
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
)(AddKoyword);
