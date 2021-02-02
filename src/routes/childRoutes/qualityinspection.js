const Qualityinspection = () => import("views/Qualityinspection");
const Itemdetail = () =>
  import("views/Qualityinspection/components/Itemdetail");
const Dayinfo = () => import("views/Qualityinspection/components/Dayinfo");
const Routes = [
  {
    path: "/app/qualityinspection",
    component: Qualityinspection
  },
  {
    path: "/app/qualityinspection/Itemdetail/:id",
    component: Itemdetail
  },
  {
    path: "/app/qualityinspection/dayinfo",
    component: Dayinfo
  }
];

export default Routes;
