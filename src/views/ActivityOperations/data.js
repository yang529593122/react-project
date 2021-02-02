const CONTENT_HEAD = {
  title: '活动情况',
  describe: '',
  data: [
    {
      href: '',
      title: '运营',
    },
    {
      href: '',
      title: '活动运营',
    },
  ],
};

const PLATFORM_LIST = {
  title: '新增活动',
  button: '+ 新增',
  data: [
    {
      id: 0,
      name: '公司名称',
      attribute: 'company',
      required: true,
    },
    {
      id: 1,
      name: '渠道名称',
      attribute: 'course',
      required: true,
    },
    {
      id: 2,
      name: '账号名称',
      attribute: 'ownerId',
      required: true,
    },
  ],
};

// 搜索
const SELECT_LIST = {
  operation: '查询',
  data: [
    {
      id: 1,
      name: '公司名称',
      attribute: 'company',
      required: false,
    },
    {
      id: 2,
      name: '渠道',
      attribute: 'status',
      required: false,
    },
  ],
};

// 搜索参数值
const SELECT_PARAMETER = {
  condition: {
    company: '',
    status: '0',
  },
};

export { CONTENT_HEAD, PLATFORM_LIST, SELECT_LIST, SELECT_PARAMETER };
