import AdminDashboard from "@/pages/dashboard/admin/AdminDashboard";
import Orders from "@/pages/dashboard/admin/orders/Orders";
import Products from "@/pages/dashboard/admin/products/Products";
import Profile from "@/pages/dashboard/admin/profile/Profile";
import Users from "@/pages/dashboard/admin/users/Users";
import { Gauge, ListOrdered, ShoppingBasket, User, UserPen } from "lucide-react";


export const adminPaths = [
  {
    name: 'Dashboard',
    path: 'dashboard',
    icon: <Gauge className="w-5 h-5"/>,
    element: <AdminDashboard />,
  },
  {
    name: 'Orders',
    path: 'orders',
    icon: <ListOrdered className="w-5 h-5"/>,
    element: <Orders/>,
  },
  {
    name: 'Products',
    path: 'products',
    icon: <ShoppingBasket className="w-5 h-5"/>,
    element: <Products/>,
  },
  
  {
    name: 'Users',
    path: 'users',
    icon: <User className="w-5 h-5"/>,
    element: <Users></Users>,
  },
  {
    name: 'Profile',
    path: 'profile',
    icon: <UserPen className="w-5 h-5"/>,
    element: <Profile />,
  },
];
