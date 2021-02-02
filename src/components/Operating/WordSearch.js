import React from "react";
import { Button, Form, DatePicker } from "antd";
import moment from "moment";
import "./index.css";

const { RangePicker } = DatePicker;

const WordSearch = props => {
  const [form] = Form.useForm();
  const formItemLayout = {
    // labelCol: { span: 4 },
    wrapperCol: { span: 40, offset: 0 }
  };

  const onFinish = fieldsValue => {
    const rangeTimeValue = fieldsValue["range-time-picker"];
    if (!!rangeTimeValue) {
      const values = {
        ...fieldsValue,
        "range-time-picker": [
          rangeTimeValue[0].format("YYYY-MM-DD HH:mm:ss"),
          rangeTimeValue[1].format("YYYY-MM-DD HH:mm:ss")
        ]
      };
      let dateTime = {
        startTime: values["range-time-picker"][0],
        endTime: values["range-time-picker"][1]
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

  function disabledDate(current) {
    const { timeScop } = props;
    return (
      current < moment(timeScop[0]).add(-1, "day") ||
      current > moment(timeScop[1]).add(+1, "day")
    );
  }

  return (
    <Form
      className="form-select-box view-form-box"
      form={form}
      layout="vertical"
      name="form_in_modal"
      onFinish={onFinish}
    >
      {props.selectList.data.map((detail, i) => {
        return (
          <Form.Item
            className="formItem"
            {...formItemLayout}
            name={detail.attribute}
            // name="range-time-picker"
            label={detail.name}
            key={`detail-${i}`}
            rules={[
              {
                required: detail.required,
                message: `${detail.name}不能为空`
              }
            ]}
          >
            <RangePicker
              disabledDate={disabledDate}
              showTime={{
                hideDisabledOptions: true,
                defaultValue: [
                  moment("00:00:00", "HH:mm:ss"),
                  moment("23:59:59", "HH:mm:ss")
                ]
              }}
            />
          </Form.Item>
        );
      })}

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

export default WordSearch;
