import React from "react";
import { Button, Form, Select, Input } from "antd";

import "./index.css";

const { Option } = Select;

const SelectForm = props => {
  const [form] = Form.useForm();
  let dateTime = {
    startTime: "",
    endTime: ""
  };
  const onFinish = values => {
    let obj = {
      condition: { ...values, ...dateTime }
    };
    props.onFilterChange(obj);
  };

  const onReset = () => {
    form.resetFields();
    let obj = props.parameter;
    console.log(props.parameter, 8888);
    props.onFilterChange(obj);
  };
  const handleproductlinelist = value => {
    props.handleproductlinelist(value);
  };
  return (
    <Form
      className="form-select-box"
      form={form}
      layout="vertical"
      name="form_in_modal"
      onFinish={onFinish}
    >
      <Form.Item
        className="formItem form-select-item"
        name={"productlinelist"}
        label={"产品线"}
      >
        <Select
          showSearch
          placeholder="请选择产品线"
          optionFilterProp="children"
          onChange={handleproductlinelist}
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {props.productlinelist &&
            props.productlinelist.map((item, index) => {
              return (
                <Option value={item.text} key={index}>
                  {item.text}
                </Option>
              );
            })}
        </Select>
      </Form.Item>
      <Form.Item
        className="formItem form-select-item"
        name={"coursename"}
        label={"课程名称"}
      >
        <Select
          showSearch
          placeholder="请选择课程名称"
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {props.coursename &&
            props.coursename.map((item, index) => {
              return (
                <Option value={item.text} key={index}>
                  {item.text}
                </Option>
              );
            })}
        </Select>
      </Form.Item>
      <Form.Item
        className="formItem form-select-item"
        name={"groupstate"}
        label={"群状态"}
      >
        <Select
          showSearch
          placeholder="请选择群状态"
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {props.groupstate &&
            props.groupstate.map((item, index) => {
              return (
                <Option value={item.text} key={index}>
                  {item.text}
                </Option>
              );
            })}
        </Select>
      </Form.Item>
      <Form.Item
        className="formItem form-select-item"
        name={"classname"}
        label={"群名称"}
      >
        <Input placeholder="请输入群名称" />
      </Form.Item>

      <Button type="primary" htmlType="submit" className="searchBtn">
        {props.selectList.operation}
      </Button>
      {props.isReset && (
        <Button onClick={onReset} type="ghost">
          重置
        </Button>
      )}
    </Form>
  );
};

export default SelectForm;
