import { DeleteOutlined, EditOutlined, FundViewOutlined } from "@ant-design/icons";
import { Button, Card, Checkbox, CheckboxProps, message, Modal, Space, Table, TableProps, Tabs } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import { useGetAllOrderQuery, useUpdateOrderMutation } from "../../../../redux/features/order/orderApi";
import SearchField from "../../../../components/UI/search/SearchField";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { IPagination } from "../../../../types/setup";
import MetaPagination from "../../../../components/Pagination/Pagination";

export default function Orders() {
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [orderList, setOrderList ] = useState([]); 
  const [productList, setProductList ] = useState([]); 
  const [orderDetails, setOrderDetails ] = useState({}); 
  const [pagination, setPagination] = useState<IPagination>({} as IPagination);
  const { data: orders, isLoading } = useGetAllOrderQuery({
    page: pagination.page || 1,
    limit: pagination.limit || 10,
    sort: ''
  });
  useEffect(()=>{
    if(orders?.meta && orders){
      setPagination(orders.meta); 
    }
  },[orders])

  const [updateOrder] = useUpdateOrderMutation();

  useEffect(()=>{
    if(orders && orders.data){
      const totalAmount = orders?.data?.map(item => {
        return item.orderProduct.reduce((acc, curr) => acc + curr.price, 0);
      });
      const totalNew = totalAmount.reduce((acc, curr) => acc + curr, 0);
      const transform = orders?.data?.map(item => {
        return {
          id: item?.id,
          email: item?.email,
          // date: item?.createdAt,
          address: item?.deliveryAddress, 
          amount: totalNew,
          isDelivered: item?.isDelivered, 
        };
      });
      
      setOrderList(transform);
    }
  },[orders])
  // const {data: orderDetails} = useGetAllOrderQuery(null);

  const handleUpdateOrder = (record: any) => {
    const orderProduct = orders?.data?.find((item: any) => item?.id == record?.id);
    setOrderDetails(orderProduct)
    setProductList( orderProduct?.orderProduct );
    setIsUpdateModalVisible(true);
  };

  const handleUpdate = async (e: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You want to confirm this order!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, confirm it!",
    });
  
    if (result.isConfirmed) {
      try {
        const res = await updateOrder({ orderId: e }).unwrap();
        console.log(res);
  
        if (res?.statusCode === 200 && res?.success) {
          message.success("Order Confirmed Successfully");
        } else {
          message.error("Order Confirmation Failed");
        }
      } catch (error) {
        message.error("An error occurred while confirming the order");
        console.error(error);
      }
    }
  };
  

  const columns: TableProps<any>["columns"] = [
    {
      title: "Order",
      dataIndex: "id",
      key: "id",
      render: (_, record) => (
        <div>
          <p className="text-start">#
            {typeof record.id === "string" ? record.id.slice(0,8) : ""}
          </p>
        </div>
      ),
    },
    
    // {
    //   title: "Date",
    //   dataIndex: "date",
    //   key: "date",
    // },
    {
      title: "Delivery Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Delivery Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Total",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Status",
      dataIndex: "isDelivered",
      key: "isDelivered",
      render: (_, record) => (
        <div>
          <p
            className={` text-center whitespace-nowrap rounded-md ${
              record.isDelivered ? "border-2 border-green-500" : "border-2 text-red-400 border-red-500"
            }`}
          >
            {record.isDelivered ? "Success" : "Pending"}
          </p>
        </div>
      ),
    },
    // {
    //   title: "Order",
    //   dataIndex: "description",
    //   key: "description",
    // },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <FundViewOutlined
            onClick={() => handleUpdateOrder(record)}
            className="text-blue-500 text-lg"
          />
          <Checkbox checked={record?.isDelivered} disabled={record?.isDelivered} onChange={()=>handleUpdate(record?.id ? record?.id: "")}>Confirm</Checkbox>
        </Space>
      ),
    },
  ];
  const columns2: TableProps<any>["columns"] = [
    {
      title: "Product",
      dataIndex: "id",
      key: "id",
      render: (_, record) => (
        <div>
          <p className="text-start">#
            {typeof record.id === "string" ? record.id.slice(0,8) : ""}
          </p>
        </div>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
    },
  ];

  

  return (
    <div>
      <div>
        <h1 className="text-lg mb-2 text-black font-semibold">Orders</h1>
      </div>

      {/* add Product part */}
      <div style={{ marginBottom: 16 }}>
        <div className="flex justify-between items-center">
          <div>
            <div>
              <SearchField></SearchField>
            </div>
          </div>
        </div>
      </div>

      <Card style={{ height: "100%" }}>
        <Tabs>
          <TabPane key="allOrder" tab="All Orders">
            <Table columns={columns} pagination={false} dataSource={orderList || []} />
            <MetaPagination setPagination={setPagination} pagination={pagination}></MetaPagination>
          </TabPane>
          <TabPane key="completed" tab="Completed">
            <Table columns={columns} dataSource={[]} />
          </TabPane>
          <TabPane key="pending" tab="Pending">
            <Table columns={columns} dataSource={[]} />
          </TabPane>
        </Tabs>
      </Card>

      <Modal
          title="Update Order"
          visible={isUpdateModalVisible}
          onCancel={() => setIsUpdateModalVisible(false)}
        >
          <Card>
            <div className="mb-4">
              <p className="font-semibold">Order Details</p>
              <p>Delivery Address: {orderDetails?.deliveryAddress}</p>
              <p>Delivery Email: {orderDetails?.email}</p>
              <p>Transaction ID: {orderDetails?.transactionId }</p>
            </div>
            <div className="flex justify-between mb-4">
              <div>
                <p className="font-semibold">Vendor Details</p>
                <p>Name: {orderDetails?.vendor?.name}</p>
                <p>Email: {orderDetails?.vendor?.email}</p>
                <p>Phone: {orderDetails?.vendor?.contactNumber}</p>
              </div>
              <div>
                <p className="font-semibold">Customer Details</p>
                <p>Name: {orderDetails?.customer?.name}</p>
                <p>Email: {orderDetails?.customer?.email}</p>
                <p>Phone: {orderDetails?.customer?.contactNumber}</p>
              </div>
            </div>
            <div> 
              <p>Product Details</p>
              <Table pagination={false} columns={columns2} dataSource={productList || [] } />
            </div>
          </Card>
        </Modal>

    </div>
  );
}
