import {
  MdDashboard,
  MdLocationOn,
  MdBusiness,
  MdPerson,
  MdHistory,
  MdSettings,
} from "react-icons/md";
import { Outlet, Link } from "react-router";

export default function OverviewPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-md w-full h-16 flex items-center justify-between px-6">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">H</span>
          </div>
          <span className="text-xl font-bold text-gray-800">H-care</span>
        </div>
      </div>

      <div className="flex ">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-lg min-h-screen">
          <nav className="px-4 space-y-2 py-3">
            <Link
              to="/"
              className="flex items-center space-x-3 text-gray-600 hover:text-indigo-600 hover:bg-gray-50 px-3 py-2 rounded-lg"
            >
              <MdDashboard className="w-5 h-5" />
              <span className="font-medium">Overview</span>
            </Link>

            <Link
              to="/map"
              className="flex items-center space-x-3 text-gray-600 hover:text-indigo-600 hover:bg-gray-50 px-3 py-2 rounded-lg"
            >
              <MdLocationOn className="w-5 h-5" />
              <span>Map</span>
            </Link>

            <Link
              to="/departments"
              className="flex items-center space-x-3 text-gray-600 hover:text-indigo-600 hover:bg-gray-50 px-3 py-2 rounded-lg"
            >
              <MdBusiness className="w-5 h-5" />
              <span>Departments</span>
            </Link>

            <Link
              to="/doctors"
              className="flex items-center space-x-3 text-gray-600 hover:text-indigo-600 hover:bg-gray-50 px-3 py-2 rounded-lg"
            >
              <MdPerson className="w-5 h-5" />
              <span>Doctors</span>
            </Link>

            <Link
              to="/history"
              className="flex items-center space-x-3 text-gray-600 hover:text-indigo-600 hover:bg-gray-50 px-3 py-2 rounded-lg"
            >
              <MdHistory className="w-5 h-5" />
              <span>History</span>
            </Link>

            <Link
              to="/settings"
              className="flex items-center space-x-3 text-gray-600 hover:text-indigo-600 hover:bg-gray-50 px-3 py-2 rounded-lg"
            >
              <MdSettings className="w-5 h-5" />
              <span>Settings</span>
            </Link>
          </nav>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
