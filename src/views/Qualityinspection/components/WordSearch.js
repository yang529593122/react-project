import React from "react";
import { Button, Form, TimePicker } from "antd";

const { RangePicker } = TimePicker;

const WordSearch = props => {
  const [form] = Form.useForm();

  const onFinish = fieldsValue => {
    const rangeTimeValue = fieldsValue.timedata;

    if (rangeTimeValue) {
      let dateTime = {
        startTime: rangeTimeValue[0].format("HH:mm:ss"),
        endTime: rangeTimeValue[1].format("HH:mm:ss")
      };

      props.onFilterChange(dateTime);
    }
  };

  const onReset = () => {
    form.resetFields();
    let dateTime = {
      startTime: "",
      endTime: ""
    };
    props.onFilterChange(dateTime);
  };
  return (
    <Form
      className="form-select-box view-form-box"
      form={form}
      layout="inline"
      name="form_in_modal"
      onFinish={onFinish}
    >
      <Form.Item className="formItem" label={"选择时间"} name="timedata">
        <RangePicker />
      </Form.Item>

      <Button type="primary" htmlType="submit" style={{ marginRight: "20px" }}>
        查询
      </Button>
      {props.isReset && (
        <Button onClick={onReset} type="ghost">
          重置
        </Button>
      )}
    </Form>
  );
};

export default WordSearch;
