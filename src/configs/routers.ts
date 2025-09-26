import PROJECTS from '../pages/projects.jsx';
import PROJECT_DETAIL from '../pages/project-detail.jsx';
import MEMBERS from '../pages/members.jsx';
import LOGIN from '../pages/login.jsx';
export const routers = [{
  id: "projects",
  component: PROJECTS
}, {
  id: "project-detail",
  component: PROJECT_DETAIL
}, {
  id: "members",
  component: MEMBERS
}, {
  id: "login",
  component: LOGIN
}]