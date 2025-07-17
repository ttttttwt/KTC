"use client";

import "./globals.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { deleteCookie } from "@/utils/cookies";
import {
  AiOutlineLogin,
  AiOutlineUnorderedList,
  AiOutlinePlusCircle,
  AiOutlineTeam,
  AiOutlineLogout,
  AiOutlineMenu,
} from "react-icons/ai";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  const handleLogout = () => {
    // Clear user data from cookies
    deleteCookie("user_id");
    deleteCookie("access_token");
    deleteCookie("refresh_token");

    // Redirect to login page
    router.push("/");
  };

  return (
    <html lang="en">
      <body>
        <header>
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
                    <Link
                      href="/"
                      className="px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center space-x-2 text-gray-300 hover:bg-gray-700 hover:text-white"
                    >
                      <AiOutlineLogin className="w-4 h-4" />
                      <span>Login</span>
                    </Link>

                    <Link
                      href="/my-tasks"
                      className="px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center space-x-2 text-gray-300 hover:bg-gray-700 hover:text-white"
                    >
                      <AiOutlineUnorderedList className="w-4 h-4" />
                      <span>My Tasks</span>
                    </Link>

                    <Link
                      href="/my-tasks/create-task"
                      className="px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center space-x-2 text-gray-300 hover:bg-gray-700 hover:text-white"
                    >
                      <AiOutlinePlusCircle className="w-4 h-4" />
                      <span>Create Task</span>
                    </Link>

                    <Link
                      href="/our-tasks"
                      className="px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center space-x-2 text-gray-300 hover:bg-gray-700 hover:text-white"
                    >
                      <AiOutlineTeam className="w-4 h-4" />
                      <span>Our Tasks</span>
                    </Link>
                  </div>
                </div>

                {/* Logout Button */}
                <div className="flex items-center">
                  <button
                    onClick={handleLogout}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center space-x-2"
                  >
                    <AiOutlineLogout className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>

                {/* Mobile menu button */}
                <div className="md:hidden">
                  <button className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700">
                    <AiOutlineMenu className="h-6 w-6" />
                  </button>
                </div>
              </div>
            </div>
          </nav>
        </header>
        <div>{children}</div>
      </body>
    </html>
  );
}
