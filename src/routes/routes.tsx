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

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayouts></HomeLayouts>, 
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
      // {
      //   path: '/manage-sporting-goods',
      //   element: <ManageProduct></ManageProduct>
      // },
      // {
      //   path: '/about-us',
      //   element: <About></About>
      // },
      // {
      //   path: '/payment/card',
      //   element: <Payment></Payment>
      // },
      // {
      //   path: '/success',
      //   element: <OrderSuccess></OrderSuccess>
      // },
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