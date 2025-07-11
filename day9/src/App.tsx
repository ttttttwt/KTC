import {
  createBrowserRouter,
  NavLink,
  RouterProvider,
  Outlet,
} from "react-router";
import LoginPage from "./pages/LoginPage";
import AccessDeniedPage from "./pages/AccessDeniedPage";
import MyTasksPage from "./pages/MyTasksPage";
import CreateTaskPage from "./pages/CreateTaskPage";
import UpdateTaskPage from "./pages/UpdateTaskPage";
import OurTasksPage from "./pages/OurTasksPage";
import React from "react";
import { useNavigate } from "react-router";

const Layout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user_id");
    navigate("/");
  };

  return (
    <>
      <nav className="bg-gray-800 text-white p-4 bg">
        <ul className="flex space-x-4 justify-between">
          <li>
            <NavLink
              style={({ isActive }) =>
                isActive ? { fontWeight: "bold" } : undefined
              }
              to="/"
            >
              Login
            </NavLink>
          </li>
          <li>
            <NavLink
              style={({ isActive }) =>
                isActive ? { fontWeight: "bold" } : undefined
              }
              to="/my-tasks"
            >
              My Tasks
            </NavLink>
          </li>
          <li>
            <NavLink
              style={({ isActive }) =>
                isActive ? { fontWeight: "bold" } : undefined
              }
              to="/create-task"
            >
              Create Task
            </NavLink>
          </li>
          <li>
            <NavLink
              style={({ isActive }) =>
                isActive ? { fontWeight: "bold" } : undefined
              }
              to="/our-tasks"
            >
              Our Tasks
            </NavLink>
          </li>
          <li>
            <a href="/" onClick={handleLogout}>
              logout
            </a>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
};

// Component bảo vệ route
const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const isLoggedIn = !!localStorage.getItem("access_token");
  if (!isLoggedIn) {
    return <AccessDeniedPage />;
  }
  return <>{children}</>;
};

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <LoginPage />,
      },
      {
        path: "/my-tasks",
        element: (
          <RequireAuth>
            <MyTasksPage />
          </RequireAuth>
        ),
      },
      {
        path: "/create-task",
        element: (
          <RequireAuth>
            <CreateTaskPage />
          </RequireAuth>
        ),
      },
      {
        path: "/update-task/:id",
        element: (
          <RequireAuth>
            <UpdateTaskPage />
          </RequireAuth>
        ),
      },
      {
        path: "/our-tasks",
        element: (
          <RequireAuth>
            <OurTasksPage />
          </RequireAuth>
        ),
      },
    ],
  },
  {
    path: "/*",
    element: <AccessDeniedPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
