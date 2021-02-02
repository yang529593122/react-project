const Dashboard = () => import("views/Dashboard");
const Quality = () => import("views/Dashboard/Quality");
const Routes = [
  {
    path: "/app/dashboard/analysis",
    component: Dashboard
  },
  {
    path: "/app/dashboard/quality",
    component: Quality
  }
];

export default Routes;
