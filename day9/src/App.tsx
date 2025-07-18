import {
  createBrowserRouter,
  NavLink,
  RouterProvider,
  Outlet,
} from "react-router";
import LoginPage from "./pages/LoginPage";
import MyTasksPage from "./pages/MyTasksPage";
import CreateTaskPage from "./pages/CreateTaskPage";
import UpdateTaskPage from "./pages/UpdateTaskPage";
import OurTasksPage from "./pages/OurTasksPage";
import { useNavigate } from "react-router";
import { useAuthStore } from "./useAuthStore";
import AccessDeniedPage from "./pages/AccessDeniedPage";
import {
  HiOutlineLogin,
  HiOutlineClipboardList,
  HiOutlinePlus,
  HiOutlineUsers,
  HiOutlineLogout,
  HiOutlineMenu,
} from "react-icons/hi";

const Layout = () => {
  const navigate = useNavigate();
  const { logOut } = useAuthStore();

  const handleLogout = async () => {
    await logOut();
    navigate("/");
  };

  return (
    <>
      <nav className="bg-gradient-to-r from-gray-900 to-gray-800 shadow-lg border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo/Brand */}
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-white">TaskManager</h1>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center space-x-2 ${
                      isActive
                        ? "bg-gray-700 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                    }`
                  }
                >
                  {/* Thay SVG bằng react-icon */}
                  <HiOutlineLogin className="w-4 h-4" />
                  <span>Login</span>
                </NavLink>

                <NavLink
                  to="/my-tasks"
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center space-x-2 ${
                      isActive
                        ? "bg-gray-700 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                    }`
                  }
                >
                  {/* Thay SVG bằng react-icon */}
                  <HiOutlineClipboardList className="w-4 h-4" />
                  <span>My Tasks</span>
                </NavLink>

                <NavLink
                  to="/create-task"
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center space-x-2 ${
                      isActive
                        ? "bg-gray-700 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                    }`
                  }
                >
                  {/* Thay SVG bằng react-icon */}
                  <HiOutlinePlus className="w-4 h-4" />
                  <span>Create Task</span>
                </NavLink>

                <NavLink
                  to="/our-tasks"
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center space-x-2 ${
                      isActive
                        ? "bg-gray-700 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                    }`
                  }
                >
                  {/* Thay SVG bằng react-icon */}
                  <HiOutlineUsers className="w-4 h-4" />
                  <span>Our Tasks</span>
                </NavLink>
              </div>
            </div>

            {/* Logout Button */}
            <div className="flex items-center">
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center space-x-2"
              >
                {/* Thay SVG bằng react-icon */}
                <HiOutlineLogout className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700">
                {/* Thay SVG bằng react-icon */}
                <HiOutlineMenu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
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
        element: <MyTasksPage />,
      },
      {
        path: "/create-task",
        element: <CreateTaskPage />,
      },
      {
        path: "/update-task/:id",
        element: <UpdateTaskPage />,
      },
      {
        path: "/our-tasks",
        element: <OurTasksPage />,
      },
      {
        path: "/*",
        element: <AccessDeniedPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
