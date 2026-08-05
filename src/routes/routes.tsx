import { createBrowserRouter } from "react-router-dom";
import NotFound from "@/pages/shared/NotFound";
import HomeLayouts from "@/layouts/HomeLayouts";
import HomePage from "@/pages/home/HomePage";
import ProductPage from "@/pages/products/ProductPage";
import CartPage from "@/pages/cart/CartPage";
import { ConfirmationPage } from "@/pages/cart/ConfirmationPage";
import ProductViewPage from "@/pages/products/ProductViewPage";
import { routeGenerator } from "@/utils/routesGenerator";
import App from "@/App";
import { adminPaths } from "./admin.routes";
import { customerPaths } from "./customer.routes";
import ErrorPage from "@/pages/shared/ErrorPage";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayouts></HomeLayouts>, 
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage></HomePage>
      },
      {
        path: '/products',
        element: <ProductPage></ProductPage>
      },
      {
        path: '/product/:id',
        element: <ProductViewPage></ProductViewPage>
      },
      {
        path: '/cart',
        element: <CartPage></CartPage>
      },
      {
        path: '/checkout/success',
        element: <ConfirmationPage></ConfirmationPage>
      },
       {
        path: "/login",
        element: <Login></Login>
      },
      {
        path: "/register",
        element: <Register></Register>
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ]
  },
  {
    path: "/admin",
    element: <App></App>,
    children: routeGenerator(adminPaths),
  },
  {
    path: "/user",
    element: <App></App>,
    children: routeGenerator(customerPaths)
  },
  
]);

export default router; 