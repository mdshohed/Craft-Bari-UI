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
    element: <Profile />,
  },
  {
    name: 'Orders History',
    path: 'orders',
    icon: <Bike className="w-5 h-5"/>,
    element: <Orders/>,
  },
  {
    name: 'Transactions',
    path: 'transactions',
    icon: <Bike className="w-5 h-5"/>,
    element: <Orders/>,
  },
  {
    name: 'Wishlist',
    path: 'wishlist',
    icon: <Bike className="w-5 h-5"/>,
    element: <Wishlist/>,
  }
];