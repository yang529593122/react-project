import React, { Component } from "react";
import { Form, Button, Select } from "antd";
class FormItem extends Component {
  state = {
    formdata: null
  };
  optionRender(item, index) {
    return item.data.map((it, ind) => {
      return (
        <Select.Option key={`option${index}_${ind}`} value={it}>
          {it}
        </Select.Option>
      );
    });
  }
  onCheck(value) {
    const { subForm } = this.props;
    subForm();
  }
  onChangeValue(value, index) {
    const { setOptionValue } = this.props;
    setOptionValue(value, index);
  }
  onReset() {
    const { resetForm } = this.props;
    resetForm();
  }
  render() {
    const { navlist } = this.props;
    return (
      <Form layout="inline">
        {navlist &&
          navlist.map((item, index) => {
            return (
              <Form.Item key={index} label={item.title}>
                <Select
                  style={{ width: 200 }}
                  placeholder={`请选择${item.title}`}
                  onChange={value => {
                    this.onChangeValue(value, index);
                  }}
                  value={item.value}
                >
                  {this.optionRender(item, index)}
                </Select>
              </Form.Item>
            );
          })}
        <Form.Item>
          <Button
            type="primary"
            onClick={this.onCheck.bind(this)}
            htmlType="submit"
            style={{ marginRight: 20 }}
          >
            查询
          </Button>
          <Button htmlType="button" onClick={this.onReset.bind(this)}>
            重置
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default FormItem;
