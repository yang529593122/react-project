const CONTENT_HEAD = {
  title: "运营设置",
  describe: "",
  data: [
    {
      href: "",
      title: "监控设置"
    },
    {
      href: "",
      title: "运营设置"
    }
  ]
};
const CONTENT_QUALITY = {
  title: "质检设置",
  describe: "",
  data: [
    {
      href: "",
      title: "监控设置"
    },
    {
      href: "",
      title: "质检设置"
    }
  ]
};

// 新增分享链接
const PLATFORM_LIST = {
  title: "新增分享规则",
  button: "+ 新增",
  operation: "保存",
  data: [
    {
      id: 0,
      name: "公司名称",
      attribute: "company",
      required: true,
      type: "select"
    },
    {
      id: 1,
      name: "课程名称",
      attribute: "course",
      required: true,
      type: "select"
    },
    {
      id: 2,
      name: "分享链接",
      attribute: "rule",
      required: true,
      prompt: "",
      type: "textarea"
    }
  ]
};

// 新增关键词
const ADD_KEYWORDS = {
  title: "关键词设置",
  button: "+ 新增",
  operation: "保存",
  data: [
    {
      id: 0,
      name: "公司名称",
      attribute: "company",
      required: true,
      type: "select"
    },
    {
      id: 1,
      name: "课程名称",
      attribute: "course",
      required: true,
      type: "select"
    },
    {
      id: 2,
      name: "关键词设置",
      attribute: "keyword",
      required: true,
      prompt: "关键词之间以 # 进行间隔。",
      type: "textarea"
    }
  ]
};

// 编辑分享链接
const EDIT_PLATFORM_LIST = {
  title: "编辑分享规则",
  button: "编辑",
  operation: "保存",
  data: [
    {
      id: 0,
      name: "公司名称",
      attribute: "company",
      required: true,
      type: "select"
    },
    {
      id: 1,
      name: "课程名称",
      attribute: "course",
      required: true,
      type: "select"
    },
    {
      id: 2,
      name: "分享链接",
      attribute: "rule",
      required: true,
      prompt: "",
      type: "textarea"
    }
  ]
};

// 编辑关键词
const EDIT_KEYWORDS = {
  title: "关键词设置",
  button: "编辑",
  operation: "保存",
  data: [
    {
      id: 0,
      name: "公司名称",
      attribute: "company",
      required: true,
      type: "select"
    },
    {
      id: 1,
      name: "课程名称",
      attribute: "course",
      required: true,
      type: "select"
    },
    {
      id: 2,
      name: "关键词设置",
      attribute: "keyword",
      required: true,
      prompt: "关键词之间以 # 进行间隔。",
      type: "textarea"
    }
  ]
};

export {
  CONTENT_HEAD,
  CONTENT_QUALITY,
  PLATFORM_LIST,
  ADD_KEYWORDS,
  EDIT_PLATFORM_LIST,
  EDIT_KEYWORDS
};
