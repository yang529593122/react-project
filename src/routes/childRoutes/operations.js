const ContentOperation = () => import("views/ContentOperation");
const CommunityOperating = () => import("views/CommunityOperating");
const ActivityOperations = () => import("views/ActivityOperations");
const CommunityDetails = () => import("views/CommunityOperating/details");
const ContentDetails = () => import("views/ContentOperation/details");
const AssociateOperating = () => import("views/AssociateOperating");
const Users = () => import("views/Community/Users");
const UserInfo = () => import("views/Community/UserInfo");
const Routes = [
  {
    path: "/app/operations/content",
    component: ContentOperation
  },
  {
    path: "/app/operations/community",
    component: CommunityOperating
  },
  {
    path: "/app/operations/associate",
    component: AssociateOperating
  },
  {
    path: "/app/community/user",
    component: Users
  },
  {
    path: "/app/community/userinfo/:id",
    component: UserInfo
  },
  {
    path: "/app/operations/activity",
    component: ActivityOperations
  },
  {
    path: "/app/operations/community/details/:id",
    component: CommunityDetails
  },
  {
    path: "/app/operations/content/details/:id",
    component: ContentDetails
  }
];

export default Routes;
