import React, { Component } from "react";
import { Select } from "antd";
const { Option } = Select;
class SelectItem extends Component {
  state = {};
  onChange(value) {
    const { onChangeItem } = this.props;
    onChangeItem(value);
  }
  render() {
    const { title, optionList, delvalue } = this.props;
    return (
      <div className="list_item">
        <div className="list_item_title">{title}</div>
        <div className="list_item_conent">
          <Select
            placeholder={`请选择${title}`}
            style={{ width: 160 }}
            onChange={this.onChange.bind(this)}
            value={delvalue}
          >
            {optionList
              ? optionList.map((item, index) => {
                  return (
                    <Option key={`option_${index}`} value={item}>
                      {item}
                    </Option>
                  );
                })
              : ""}
          </Select>
        </div>
      </div>
    );
  }
}

export default SelectItem;
