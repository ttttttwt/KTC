import Link from "next/dist/client/link";
import React from "react";

export default function Header() {
  return (
    <nav className="bg-blue-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex space-x-8">
            <Link
              href="/"
              className="text-white hover:text-blue-200 transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              href="/contact"
              className="text-white hover:text-blue-200 transition-colors duration-200"
            >
              Contact
            </Link>
            <Link
              href="/products"
              className="text-white hover:text-blue-200 transition-colors duration-200"
            >
              Products
            </Link>
          </div>
          <Link
            href="/login"
            className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50 transition-colors duration-200"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}
