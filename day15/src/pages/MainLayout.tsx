import { Link, Outlet, useNavigate } from "react-router";
import { routes } from "../routes";
import { useAuthStore } from "../useAuthStore";
import { filterMenuRoutes} from "../utility";

export default function MainLayout() {
  const { logOut, loggedInUser } = useAuthStore();
  const navigate = useNavigate();

  const userRoutesMenu = filterMenuRoutes(routes, loggedInUser || null);

  const handleLogout = () => {
    logOut();
    navigate("/");
  };
  return (
    <>
      <div className="flex h-screen">
        {/* Sidebar */}
        <nav className="w-64 bg-gray-800 text-white flex flex-col p-4">
          <div className="mb-8 text-2xl font-bold">DashBoard</div>
          <ul className="flex-1 space-y-4">
            {userRoutesMenu.map((route) => {
              return (
                <Link key={route.path} to={route.path}>
                  <span className="block px-4 py-2 rounded hover:bg-gray-700">
                    {route.name}
                  </span>
                </Link>
              );
            })}
          </ul>
          <div className="mt-auto">
            <button
              className="w-full py-2 px-4 bg-blue-600 rounded hover:bg-blue-700"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </nav>
        {/* Main Content */}
        <main className="flex-1 bg-gray-100 p-8">
          <Outlet />
        </main>
      </div>
    </>
  );
}
