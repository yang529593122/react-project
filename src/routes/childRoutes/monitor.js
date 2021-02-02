const ContentMonitorSetUp = () => import("views/Monitor/SetUp");
const ContentMonitorQuality = () => import("views/Monitor/Quality");

const Routes = [
  {
    path: "/app/monitor/set_up",
    component: ContentMonitorSetUp
  },
  {
    path: "/app/monitor/quality",
    component: ContentMonitorQuality
  }
];

export default Routes;
