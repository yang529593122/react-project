// const MENUS = [
//   {
//     name: "Dashboard",
//     path: "/app/dashboard/analysis",
//     icon: "lineChart",
//     childMenu: [
//       {
//         name: "分析页",
//         path: "/app/dashboard/analysis"
//       }
//     ]
//   },
//   {
//     name: "运营",
//     path: "/app/operations",
//     icon: "tool",
//     childMenu: [
//       {
//         name: "社群运营",
//         path: "/app/operations/community"
//       }

//     ]
//   },
//   {
//     name: "监控设置",
//     path: "/app/monitor",
//     icon: "setting",
//     childMenu: [
//       {
//         name: "运营设置",
//         path: "/app/monitor/set_up"
//       },
//       {
//         name: "质检设置",
//         path: "/app/monitor/quality"
//       }
//     ]
//   }
// ];

const MENUS = [
  {
    id: 1107402,
    parentId: 0,
    children: [
      {
        id: 1107403,
        parentId: 1107402,
        children: [],
        selected: false,
        icon: "EditOutlined",
        name: "分析页",
        url: "/app/dashboard/analysis",
        content: "",
        permission: "1",
        type: 1,
        sort: 0,
        urlType: 1,
        dflt: 0,
        enabled: 1
      }
    ],
    selected: false,
    icon: "PushpinOutlined",
    name: "Dashboard",
    url: "/app/dashboard/analysis",
    content: "",
    permission: "1",
    type: 1,
    sort: 0,
    urlType: 1,
    dflt: 0,
    enabled: 1
  },
  {
    id: 1107407,
    parentId: 0,
    children: [
      {
        id: 1107408,
        parentId: 1107407,
        children: [],
        selected: false,
        icon: "UserOutlined",
        name: "社群运营",
        url: "/app/operations/community",
        content: "",
        permission: "1",
        type: 1,
        sort: 0,
        urlType: 1,
        dflt: 0,
        enabled: 1
      }
    ],
    selected: false,
    icon: "HomeOutlined",
    name: "运营",
    url: "/app/operations",
    content: "",
    permission: "1",
    type: 1,
    sort: 0,
    urlType: 1,
    dflt: 0,
    enabled: 1
  },
  {
    id: 1107409,
    parentId: 0,
    children: [
      {
        id: 1107410,
        parentId: 1107409,
        children: [],
        selected: false,
        icon: "EditOutlined",
        name: "运营设置",
        url: "/app/monitor/set_up",
        content: "",
        permission: "1",
        type: 1,
        sort: 0,
        urlType: 1,
        dflt: 0,
        enabled: 1
      },
      {
        id: 1107411,
        parentId: 1107409,
        children: [],
        selected: false,
        icon: "EditOutlined",
        name: "质检设置",
        url: "/app/monitor/quality",
        content: "",
        permission: "1",
        type: 1,
        sort: 0,
        urlType: 1,
        dflt: 0,
        enabled: 1
      }
    ],
    selected: false,
    icon: "UserOutlined",
    name: "监控设置",
    url: "/app/monitor",
    content: "",
    permission: "1",
    type: 1,
    sort: 0,
    urlType: 1,
    dflt: 0,
    enabled: 1
  },
  {
    id: 1107420,
    parentId: 0,
    children: [
      {
        id: 1107422,
        parentId: 1107420,
        children: [],
        selected: false,
        icon: "",
        name: "社群质检",
        url: "/app/Qualityinspection",
        content: "",
        permission: "1",
        type: 1,
        sort: 0,
        urlType: 1,
        dflt: 0,
        enabled: 1
      }
    ],
    selected: false,
    icon: "HomeOutlined",
    name: "质检",
    url: "/app/qualityinspection",
    content: "",
    permission: "1",
    type: 1,
    sort: 0,
    urlType: 1,
    dflt: 0,
    enabled: 1
  }
];

export default MENUS;
