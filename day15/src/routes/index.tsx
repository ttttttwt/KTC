import CreateTask from "../pages/CreateTask";
import LoginPage from "../pages/LoginPage";
import MyTask from "../pages/MyTask";
import OurTask from "../pages/OurTask";
import RoleList from "../pages/RoleList";
import UpdateTask from "../pages/UpdateTask";
import UpdateUserRole from "../pages/UpdateUserRole";
import UserList from "../pages/UserList";

export const routes = [
  {
    path: "/",
    index: true,
    name: "Login",
    showOnMenu: false,
    element: <LoginPage />,
    roles: [],
  },
  {
    path: "/my-tasks",
    name: "My Tasks",
    showOnMenu: true,
    element: <MyTask />,
    roles: ["Users"],
  },
  {
    path: "/our-tasks",
    name: "Our Tasks",
    showOnMenu: true,
    element: <OurTask />,
    roles: ["Administrators"],
  },
  {
    path: "/create-task",
    name: "Create Task",
    showOnMenu: true,
    element: <CreateTask />,
    roles: ["Users", "Managers", "Leaders"],
  },
  {
    path: "/update-task/:id",
    name: "Update Task",
    showOnMenu: false,
    element: <UpdateTask />,
    roles: ["Users", "Managers", "Leaders"],
  },
  {
    path: "/update-user-role/:id",
    name: "Update User Role",
    showOnMenu: false,
    element: <UpdateUserRole />,
    roles: ["Administrators"],
  },
  {
    path: "/user-list",
    name: "User List",
    showOnMenu: true,
    element: <UserList />,
    roles: ["Administrators"],
  },
  {
    path: "/role-list",
    name: "Role List",
    showOnMenu: true,
    element: <RoleList />,
    roles: ["Administrators"],
  },
];
