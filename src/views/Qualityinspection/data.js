const CONTENT_HEAD = {
  title: "社群质检列表",

  describe: "",
  data: [
    {
      href: "",
      title: "质检管理"
    },
    {
      href: "",
      title: "社群质检"
    }
  ]
};

const CONTENT_HEAD_DETAIL = {
  title: "社群详情页",
  describe: "",
  data: [
    {
      href: "",
      title: "质检管理"
    },
    {
      href: "/app/Qualityinspection",
      title: "社群质检"
    },
    {
      href: "",
      title: "社群详情页"
    }
  ]
};

const PLATFORM_LIST = {
  title: "编辑",
  button: "编辑",
  data: [
    {
      id: 0,
      name: "公司名称",
      attribute: "company",
      required: true,
      state: "select"
    },
    {
      id: 1,
      name: "产品线",
      attribute: "course",
      required: true,
      state: "select"
    },
    {
      id: 2,
      name: "运营者微信号",
      attribute: "wxid",
      required: false,
      state: "input"
    }
  ]
};

// 搜索
const SELECT_LIST = {
  operation: "查询",
  data: [
    {
      id: 1,
      name: "产品线 ",
      attribute: "product",
      required: false,
      state: "select"
    },

    {
      id: 2,
      name: "营",
      attribute: "sellerCamp",
      required: false,
      state: "select"
    },
    {
      id: 3,
      name: "组",
      attribute: "sellerGroup",
      required: false,
      state: "select"
    },
    {
      id: 4,
      name: "群号搜索",
      attribute: "groupNumber",
      required: false,
      state: "input"
    },

    {
      id: 6,
      name: "质检状态",
      attribute: "status",
      required: false,
      state: "select"
    },
    {
      id: 7,
      name: "开群时间",
      attribute: "startTime",
      required: false,
      state: "date"
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
    daysSort: null,
    endTime: null,
    groupNumber: null,
    productLine: "",
    sellerCamp: "",
    sellerGroup: "",
    startTime: null,
    startTimeSort: "DESC",
    status: null
  }
};

const ALL_WORDS = {
  title: "话术",
  describe: "",
  data: [
    {
      href: "app/operations/community",
      title: "质检管理"
    },
    {
      href: "app/operations/community",
      title: "社群质检"
    },
    {
      href: "/app/operations/community",
      title: "社群详情页"
    },
    {
      href: "",
      title: "话术"
    }
  ]
};

const COMPANY_NAME = [
  {
    value: "DAG",
    text: "DAG"
  }
];

export {
  CONTENT_HEAD,
  PLATFORM_LIST,
  CONTENT_HEAD_DETAIL,
  SELECT_LIST,
  SELECT_PARAMETER,
  WORD_SEARCH_OPERATION,
  ALL_WORDS,
  COMPANY_NAME
};
