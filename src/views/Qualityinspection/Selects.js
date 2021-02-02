import React from "react";
import { Button, Form, Select, DatePicker, Input } from "antd";
import "./css/Selects.less";
const { Option } = Select;
const { RangePicker } = DatePicker;

const SelectForm = props => {
  const [form] = Form.useForm();

  const onFinish = values => {
    const rangeValue = values.startTime;
    let value = {};
    if (rangeValue) {
      value = {
        ...values,
        startTime: [
          rangeValue[0].format("YYYY-MM-DD"),
          rangeValue[1].format("YYYY-MM-DD")
        ]
      };
    } else {
      value = {
        ...values,
        startTime: ["", ""]
      };
    }

    let obj = {
      condition: {
        daysSort: null,
        endTime: value.startTime[1],
        groupNumber: value.groupNumber,
        productLine: value.product, // 产品线
        sellerCamp: value.sellerCamp, // 营
        sellerGroup: value.sellerGroup, // 组
        startTime: value.startTime[0],
        startTimeSort: "DESC",
        status: value.status
      }
    };
    props.onFilterChange(obj);
  };

  function seleChange(i, value) {
    if (i === 1) {
      const { setSellerGroupList } = props;
      setSellerGroupList(value);
    }
  }
  const onReset = () => {
    form.resetFields();
    let obj = props.parameter;
    props.onFilterChange(obj);
  };

  const qunstatus = i => {
    if (props.qunstatus && props.qunstatus[i]) {
      return props.qunstatus[i].map((item, index) => {
        return (
          <Option value={item.value} key={index}>
            {item.text}
          </Option>
        );
      });
    }
  };

  // formItem 里的内容组件
  const formItemContent = (detail, i) => {
    if (detail.state === "select") {
      return (
        <Select
          placeholder={`请选择${detail.name}`}
          name={detail.attribute}
          style={{ width: 190 }}
          onChange={value => {
            seleChange(i, value);
          }}
        >
          {qunstatus(i)}
        </Select>
      );
    } else if (detail.state === "date") {
      return <RangePicker />;
    } else if (detail.state === "input") {
      return (
        <Input placeholder={`请输入${detail.name}`} style={{ width: 190 }} />
      );
    }
  };
  return (
    <Form
      className="form-select-header"
      form={form}
      layout="horizontal"
      name="form_in_modal"
      onFinish={onFinish}
      style={{
        background: "#fff",
        margin: "20px 0 0 0 "
      }}
    >
      {props.selectList.data.map((detail, i) => {
        return (
          <Form.Item
            className="item-select"
            name={detail.attribute}
            key={`detail-${i}`}
            label={detail.name}
            rules={[
              {
                required: detail.required,
                message: `${detail.name}不能为空`
              }
            ]}
          >
            {formItemContent(detail, i)}
          </Form.Item>
        );
      })}
      <div className="btns-list">
        <Button type="primary" htmlType="submit">
          {props.selectList.operation}
        </Button>
        {props.isReset && (
          <Button onClick={onReset} type="ghost">
            重置
          </Button>
        )}
      </div>
    </Form>
  );
};

export default SelectForm;
