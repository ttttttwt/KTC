import "./App.css";
import BlogPage from "./Pages/BlogPage";
import HomePage from "./Pages/Hompage";
import LoginPage from "./Pages/LoginPage";
import ProductsPage from "./Pages/ProductPage";
import CustomersPage from "./Pages/CustomerPage";
import { RouterProvider, createBrowserRouter } from "react-router";
import CategoryPage from "./Pages/CategoryPage";
import OverviewPage from "./Pages/OveriviewPage";
import DepartmentsPage from "./Pages/DepartmentsPage";
import DoctorsPage from "./Pages/DoctorsPage";
import PatientsPage from "./Pages/PatientsPage";
import HistoryPage from "./Pages/HistoryPage";
import MapPage from "./Pages/MapPage";
import SettingsPage from "./Pages/SettingsPage";

const routerPractice = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    children: [
      {
        path: "blog",
        element: <BlogPage />,
      },
      {
        path: "products",
        element: <ProductsPage />,
      },
      {
        path: "category",
        element: <CategoryPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "customers",
        element: <CustomersPage />,
      },
    ],
  },
]);

const routerHomeWork = createBrowserRouter([
  {
    path: "/",
    element: <OverviewPage />,
    children: [
      {
        path: "departments",
        element: <DepartmentsPage />,
      },
      {
        path: "doctors",
        element: <DoctorsPage />,
      },
      {
        path: "patients",
        element: <PatientsPage />,
      },
      {
        path: "history",
        element: <HistoryPage />,
      },
      {
        path: "map",
        element: <MapPage />,
      },
      {
        path: "settings",
        element: <SettingsPage />,
      }
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={routerHomeWork} />
    </>
  );
}

export default App;
