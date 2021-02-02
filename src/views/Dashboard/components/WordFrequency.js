import React, { Component } from "react";
import "./css/WordFrequency.less";
import WordItem from "./WordItem";
class WordFrequency extends Component {
  state = {
    arr: [
      { id: 1, title: "天亮了", value: 123123123 },
      { id: 2, title: "天黑了", value: 123123123 },
      { id: 3, title: "下班了", value: 123123123 },
      { id: 4, title: "上班了", value: 123123123 },
      { id: 5, title: "加班了", value: 123123123 },
      { id: 6, title: "回家了", value: 123123123 },
      { id: 7, title: "坐车了", value: 123123123 },
      { id: 8, title: "好累啊", value: 123123123 },
      { id: 9, title: "太难了", value: 123123123 },
      { id: 10, title: "好难啊", value: 123123123 },
      { id: 11, title: "好困啊", value: 123123123 },
      { id: 12, title: "回家吧", value: 123123123 },
      { id: 13, title: "没电了", value: 123123123 },
      { id: 14, title: "充电了", value: 123123123 },
      { id: 15, title: "别看了", value: 123123123 }
    ]
  };
  componentDidMount() {}
  render() {
    const { arr } = this.state;
    return (
      <div className="WordFrequency">
        {arr.map((item, index) => (
          <WordItem key={index} index={index} data={item} />
        ))}
      </div>
    );
  }
}

export default WordFrequency;
