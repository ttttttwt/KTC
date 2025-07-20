import { createBrowserRouter, RouterProvider } from "react-router";
import MainLayout from "./pages/MainLayout";
import { routes } from "./routes";
import { useAuthStore } from "./useAuthStore";
import { filterRouteAccessible } from "./utility";

function App() {
  const { loggedInUser } = useAuthStore();
  const generateRoutes = filterRouteAccessible(routes, loggedInUser || null);

  const router = createBrowserRouter([
    {
      element: <MainLayout />,
      children: generateRoutes ,
    },
    {
      path: "*",
      element: <div>Not Found</div>,
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
