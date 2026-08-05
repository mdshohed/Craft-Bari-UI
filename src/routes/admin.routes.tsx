import { Bike, Gauge, ListOrdered, Undo2, UserCog, UserPen } from "lucide-react";


export const adminPaths = [
  {
    name: 'Dashboard',
    path: 'dashboard',
    icon: <Gauge className="w-5 h-5"/>,
    element: <AdminDashboard />,
  },
  {
    name: 'Products',
    path: 'products',
    icon: <Undo2 className="w-5 h-5"/>,
    element: <Products/>,
  },

  // {
  //   name: 'Reviews',
  //   path: 'reviews',
  //   icon: <Bike className="w-5 h-5"/>,
  //   element: <Reviews/>,
  // },
  {
    name: 'Orders',
    path: 'orders',
    icon: <ListOrdered className="w-5 h-5"/>,
    element: <Orders/>,
  },
  {
    name: 'Transactions',
    path: 'transactions',
    icon: <Bike className="w-5 h-5"/>,
    element: <Transactions/>,
  },
  {
    name: 'Users',
    path: 'users',
    icon: <UserCog className="w-5 h-5"/>,
    element: <Users></Users>,
  },
  // {
  //   name: 'Invoices',
  //   path: 'invoices',
  //   icon: <Bike className="w-5 h-5"/>,
  //   element: <Invoices/>,
  // },
  {
    name: 'Profile',
    path: 'profile',
    icon: <UserPen className="w-5 h-5"/>,
    element: <UserProfile />,
  },
];
