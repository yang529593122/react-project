const CONTENT_HEAD = {
  title: '课程情况',
  describe: '',
  data: [
    {
      href: '',
      title: '运营',
    },
    {
      href: '',
      title: '内容运营',
    },
  ],
};

const DETAIL_HEAD = {
  title: '课程情况',
  describe: '',
  data: [
    {
      href: '',
      title: '运营',
    },
    {
      href: '/app/operations/content',
      title: '内容运营',
    },
    {
      href: '',
      title: '详情页',
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
  ],
};

const PLATFORM_LIST = {
  title: '新增课程包装页情况',
  button: '+ 新增',
  data: [
    {
      id: 1,
      name: '公司名称',
      attribute: 'company',
      required: true,
    },
    {
      id: 2,
      name: '课程名称',
      attribute: 'ownerId',
      required: true,
    },
    {
      id: 3,
      name: '详情页链接',
      attribute: 'wxid',
      required: true,
    },
  ],
};

// 对比
const CONTRAST = {
  operation: '对比',
  data: [
    {
      id: 1,
      name: '图片对比',
      attribute: 'company',
      required: false,
    },
    {
      id: 1,
      name: '',
      attribute: '',
      required: false,
    },
  ],
};

// 搜索参数值
const SELECT_PARAMETER = {
  currentItem: {
    img1: 'https://img.kaikeba.com/webprotalimg_course_pdhxnl2.png',
    img2: 'https://res.kaikeba.com/other/123/20200428193401-23102/Fsinwmt0wVL7MHn0VYEhuFSKooqF.png',
  },
};

export { CONTENT_HEAD, SELECT_LIST, PLATFORM_LIST, DETAIL_HEAD, CONTRAST, SELECT_PARAMETER };
