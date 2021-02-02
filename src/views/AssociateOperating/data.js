const CONTENT_HEAD = {
  title: "竞品社群运营列表",
  describe: "",
  data: [
    {
      href: "",
      title: "运营"
    },
    {
      href: "",
      title: "竞品社群"
    }
  ]
};

const CONTENT_HEAD_DETAILS = {
  title: "社群详情页",
  describe: "表单用于展示社群的详细信息",
  data: [
    {
      href: "",
      title: "运营"
    },
    {
      href: "/app/operations/community",
      title: "社群运营"
    },
    {
      href: "",
      title: "社群详情页"
    }
  ]
};

const PLATFORM_LIST = {
  title: "新增社群",
  button: "+ 新增社群",
  data: [
    {
      id: 0,
      name: "公司名称",
      attribute: "company",
      required: true
    },
    {
      id: 1,
      name: "课程名称",
      attribute: "course",
      required: true
    },
    {
      id: 2,
      name: "加群微信号",
      attribute: "wxid",
      required: true
    },
    {
      id: 3,
      name: "群主微信号",
      attribute: "ownerId",
      required: true
    }
  ]
};

// 搜索
const SELECT_LIST = {
  operation: "查询",
  data: [
    {
      id: 1,
      name: "公司名称",
      attribute: "company",
      required: false,
      state: "select"
    },
    {
      id: 2,
      name: "群状态",
      attribute: "status",
      required: false,
      state: "select"
    },
    {
      id: 3,
      name: "微信群名称",
      attribute: "groupNumber",
      required: false,
      state: "input"
    }
  ]
};

// 搜索
const WORD_SEARCH_OPERATION = {
  operation: "查询",
  data: [
    {
      id: 1,
      name: "选择时间",
      attribute: "range-time-picker",
      required: false
    }
    // {
    //   id: 2,
    //   name: '群状态',
    //   attribute: 'status',
    //   required: false,
    // },
  ]
};

// 重置搜索参数值
const SELECT_PARAMETER = {
  condition: {
    company: "",
    status: null,
    groupNumber: ""
  }
};

const PROMPT_1 = {
  title: "活跃度",
  data: [
    "1、展示本时间段内的用户活跃度",
    "2、用户活跃度=本时间段内活跃人数/当天21:00的社群总人数"
  ]
};

const PROMPT_2 = {
  title: "回复占比",
  data: [
    "1、展示本时间段内的学员回复占比",
    "2、学员回复占比=本时间段内学员回复数/本时间段内总对话数"
  ]
};

export {
  CONTENT_HEAD,
  PLATFORM_LIST,
  CONTENT_HEAD_DETAILS,
  SELECT_LIST,
  SELECT_PARAMETER,
  WORD_SEARCH_OPERATION,
  PROMPT_1,
  PROMPT_2
};
