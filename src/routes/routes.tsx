import { createBrowserRouter } from "react-router-dom";
import NotFound from "@/pages/Shared/NotFound";
import MainLayouts from "@/layouts/MainLayouts";
import HomePage from "@/pages/Home/HomePage";
import ProductPage from "@/pages/Products/ProductPage";
import CartPage from "@/pages/Cart/CartPage";
import { ConfirmationPage } from "@/pages/Cart/ConfirmationPage";
import ProductViewPage from "@/pages/Products/ProductViewPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayouts></MainLayouts>, 
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
        path: '/checkout/cart',
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
  
]);

export default router; 