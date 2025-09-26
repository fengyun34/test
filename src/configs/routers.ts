import PROJECTS from '../pages/projects.jsx';
import PROJECT_DETAIL from '../pages/project-detail.jsx';
import MEMBERS from '../pages/members.jsx';
import LOGIN from '../pages/login.jsx';
import CREATE_PROJECT from '../pages/create-project.jsx';
import INDEX from '../pages/index.jsx';
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
}, {
  id: "create-project",
  component: CREATE_PROJECT
}, {
  id: "index",
  component: INDEX
}]