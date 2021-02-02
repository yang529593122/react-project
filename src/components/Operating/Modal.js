import React, { useState } from "react";
import { connect } from "react-redux";
import { Button, Modal, Form, Input } from "antd";
import "./index.css";

const CollectionCreateForm = ({
  platformList,
  visible,
  onCreate,
  onCancel
}) => {
  const [form] = Form.useForm();
  const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 16 }
  };
  return (
    <Modal
      visible={visible}
      title={platformList.title}
      okText="确定"
      className="Add-modals"
      cancelText="取消"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            form.resetFields();
            onCreate(values);
          })
          .catch(info => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          modifier: "public"
        }}
      >
        {platformList.data.map(detail => {
          return (
            <Form.Item
              className="formItem"
              {...formItemLayout}
              name={detail.attribute}
              key={`detail${detail.id}`}
              label={detail.name}
              rules={[
                {
                  required: detail.required,
                  message: `${detail.name}不能为空`
                }
              ]}
            >
              <Input maxLength={20} placeholder={`请填写${detail.name}`} />
            </Form.Item>
          );
        })}
      </Form>
    </Modal>
  );
};

const CollectionsPage = prop => {
  const [visible, setVisible] = useState(false);

  const onCreate = values => {
    prop.create(values);
    setVisible(false);
  };

  let platformList = prop.platformList;

  return (
    <div>
      <Button
        type="primary"
        className="mb16"
        onClick={() => {
          setVisible(true);
        }}
      >
        {platformList.button}
      </Button>
      <CollectionCreateForm
        platformList={platformList}
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </div>
  );
};

export default connect(
  ({ operations, loading }) => ({ ...operations }),
  ({ operations }) => ({ ...operations })
)(CollectionsPage);
