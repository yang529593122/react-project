import React from "react";
// 搜索
const SELECT_LIST = {
  operation: "添加",
  data: [
    {
      id: 1,
      name: "公司名称",
      attribute: "companyName",
      required: false,
      state: "select"
    },
    {
      id: 2,
      name: "群ID",
      attribute: "company",
      required: false,
      state: "select"
    }
  ]
};

// 重置搜索参数值
const SELECT_PARAMETER = {
  condition: {
    companyName: "",
    company: null
  }
};

const PROMPT_1 = {
  title: "用户活跃度",
  data: [
    "1、平均基准线：取在监测的风变编程所有社群每天用户活跃度的平均值",
    "2、用户活跃度=当天活跃人数/当天21:00社群总人数"
  ]
};

const PROMPT_2 = {
  title: "学员回复占比",
  data: [
    "1、平均基准线：取在监测的风变编程所有社群学员回复占比的平均值",
    "2、学员回复占比=当天学员回复堆书数/当天总对话数"
  ]
};

const PROMPT_3 = {
  title: "分享率",
  data: [
    "1、平均基准线：取在监测的风变编程所有社群每天分享率的平均值",
    "2、分享率=当天分享人数/当天21:00社群总人数"
  ]
};
const CONTENT_HEAD = {
  title: "社群分析",
  describe: "",
  data: [
    {
      href: "",
      title: "Dashboard"
    },
    {
      href: "",
      title: "分析模块"
    }
  ]
};

const TABLEB_COLUMNS = [
  {
    title: "课程",
    dataIndex: "courseName",
    align: "center"
  },
  {
    title: "总计",
    dataIndex: "total",
    align: "center",
    render: (text, record, index) => {
      return (
        <span className="table_font_style">
          <b>{text.split("/")[0]}</b>
          <b>/{text.split("/")[1]}</b>
        </span>
      );
    }
  },
  {
    title: "DAY1",
    dataIndex: "day1",
    align: "center",
    render: (text, record, index) => {
      return (
        <span className="table_font_style">
          <b>{text.split("/")[0]}</b>
          <b>/{text.split("/")[1]}</b>
        </span>
      );
    }
  },
  {
    title: "DAY2",
    dataIndex: "day2",
    align: "center",
    render: (text, record, index) => {
      return (
        <span className="table_font_style">
          <b>{text.split("/")[0]}</b>
          <b>/{text.split("/")[1]}</b>
        </span>
      );
    }
  },
  {
    title: "DAY3",
    dataIndex: "day3",
    align: "center",
    render: (text, record, index) => {
      return (
        <span className="table_font_style">
          <b>{text.split("/")[0]}</b>
          <b>/{text.split("/")[1]}</b>
        </span>
      );
    }
  },
  {
    title: "DAY4",
    dataIndex: "day4",
    align: "center",
    render: (text, record, index) => {
      return (
        <span className="table_font_style">
          <b>{text.split("/")[0]}</b>
          <b>/{text.split("/")[1]}</b>
        </span>
      );
    }
  },
  {
    title: "DAY5",
    dataIndex: "day5",
    align: "center",
    render: (text, record, index) => {
      return (
        <span className="table_font_style">
          <b>{text.split("/")[0]}</b>
          <b>/{text.split("/")[1]}</b>
        </span>
      );
    }
  },
  {
    title: "DAY6",
    dataIndex: "day6",
    align: "center",
    render: (text, record, index) => {
      return (
        <span className="table_font_style">
          <b>{text.split("/")[0]}</b>
          <b>/{text.split("/")[1]}</b>
        </span>
      );
    }
  }
];

export {
  SELECT_LIST,
  SELECT_PARAMETER,
  PROMPT_1,
  PROMPT_2,
  PROMPT_3,
  CONTENT_HEAD,
  TABLEB_COLUMNS
};
