import UserDashboard from "@/pages/dashboard/customer/CustomerDashboard";
import CustomerOrder from "@/pages/dashboard/customer/customerOrder/CustomerOrder";
import CustomerProfile from "@/pages/dashboard/customer/customerProfile/CustomerProfile";
import CustomerWishlist from "@/pages/dashboard/customer/customerWishlist/CustomerWishlist";
import { Bike, Gauge, UserPen } from "lucide-react";

export const customerPaths = [
  {
    name: 'Dashboard',
    path: 'dashboard',
    icon: <Gauge  className="w-5 h-5"/>,
    element: <UserDashboard />,
  },
  {
    name: 'Profile',
    path: 'profile',
    icon: <UserPen className="w-5 h-5"/>,
    element: <CustomerProfile />,
  },
  {
    name: 'Orders History',
    path: 'orders',
    icon: <Bike className="w-5 h-5"/>,
    element: <CustomerOrder/>,
  },
  {
    name: 'Wishlist',
    path: 'wishlist',
    icon: <Bike className="w-5 h-5"/>,
    element: <CustomerWishlist/>,
  }
];