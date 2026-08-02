import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import NotFound from "@/pages/Shared/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    // element: <MainLayouts></MainLayouts>, 
    element: <App></App>,
    children: [
      {
        index: true,
        element: <App></App>
      },
      // {
      //   path: '/all-sporting-goods',
      //   element: <Products></Products>,
      // },
      // {
      //   path: '/all-sporting-goods/:id',
      //   element: <ProductView></ProductView>,
      // },
      // {
      //   path: '/manage-sporting-goods',
      //   element: <ManageProduct></ManageProduct>
      // },
      // {
      //   path: '/about-us',
      //   element: <About></About>
      // },
      // {
      //   path: '/card',
      //   element: <ShoppingCard></ShoppingCard>
      // },
      // {
      //   path: '/checkout/card',
      //   element: <Checkout></Checkout>
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