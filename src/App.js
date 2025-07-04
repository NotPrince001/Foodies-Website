import React, { lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  useLocation,
} from "react-router";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Box from "./components/Box";
import About from "./components/About";
import Contact from "./components/Contact";
import Error from "./components/Error";
import Menu from "./components/Menu";
import Cart from "./components/Cart";
import ShimmerCard from "./components/ShimmerCard";
import Login from "./components/Login";
import LoginContextProvider from "./context/LoginContext.js";

// import Grocery from "./components/Grocery";

/*
Header
  - Logo
  -links
  -cart
Body
  -searchBar
  -Resturants
Footer
  -Copyright
  -links
*/
const Grocery = lazy(() => import("./components/Grocery"));

const App = () => {
  const location = useLocation();
  const hideHeaderRoutes = ["/login"];
  const shouldShowHeader = !hideHeaderRoutes.includes(location.pathname);
  return (
    <LoginContextProvider>
      <div>
        {shouldShowHeader && <Header />}
        <Outlet />
        {shouldShowHeader && <Footer />}
      </div>
    </LoginContextProvider>
  );
};

const appRoutes = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        path: "/",
        Component: Box,
      },
      {
        path: "/about",
        Component: About,
      },
      {
        path: "/contact",
        Component: Contact,
      },
      {
        path: "/cart",
        Component: Cart,
      },
      {
        path: "/grocery",
        element: (
          <Suspense fallback={<ShimmerCard />}>
            <Grocery />
          </Suspense>
        ),
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/restaurants/:resId",
        Component: Menu,
      },
    ],
    errorElement: <Error />,
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={appRoutes} />
);
