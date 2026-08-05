import { useGetAllOrderQuery } from "@/redux/features/orders/orderApi";
import { useGetAllProductsQuery } from "@/redux/features/products/productApi";
import { useGetAllUserQuery } from "@/redux/features/user/userApi";
import { Card } from "antd";

const AdminDashboard = () => {
  const { data: users } = useGetAllUserQuery(null);
  const { data: products } = useGetAllProductsQuery({params: {limit:10, page: 1}});
  const { data: orders } = useGetAllOrderQuery(null);
  const items = [
    { value: users?.data.length, bgColor: '#dbe0f9', title:'Total Users' }, 
    { value: products?.data.length, bgColor: '#ffd4e6', title:'Available Product' }, 
    { value: orders?.data.length, bgColor: '#d9effa', title:'New Orders' },
  ];
  return (
    <>
      <div className="bg-teal-100	 p-2 rounded-lg text-lg text-center mt-2">
        Welcome to Admin Dashboard
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-5">
        {items.map((item) => (
          <div>
            <Card className={`text-center h-32 bg-[${item.bgColor}]`}>
              <p className="text-[16px] font-medium">{item.title}</p>
              <p className="text-2xl md:text-3xl font-bold">{item.value}</p>
            </Card>
          </div>
        ))}
      </div>
    </>
  );
};

export default AdminDashboard;
