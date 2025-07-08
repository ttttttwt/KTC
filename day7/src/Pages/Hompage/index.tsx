import { FaShoppingCart } from "react-icons/fa";
import { Link, Outlet } from "react-router";

export default function HomePage() {
  return (
    <>
      {/* // header */}
      <div className="flex justify-end items-center p-4 gap-3 bg-orange-500 text-white">
        <h1 className="flex-1 text-2xl">Mangezines</h1>
        <ul className="flex space-x-4 gap-2 text-lg">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/blog">Blog</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
          <li>
            <Link to="/category">Category</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/customers">Customers</Link>
          </li>
        </ul>
        <button className="bg-white text-orange-500 p-2 flex items-center gap-2 rounded hover:bg-orange-100 transition-colors">
          <FaShoppingCart size={16} /> <span>Cart</span>
        </button>
      </div>
      {/* // main content */}
      <>
        <Outlet />
      </>
    </>
  );
}
