import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  Rate,
  Row,
  Space,
  Table,
  Upload,
} from "antd";
import Swal from "sweetalert2";
import type { TableProps } from "antd";

import {
  DeleteOutlined,
  FundViewOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { toast } from "sonner";
import TextArea from "antd/es/input/TextArea";
import SearchField from "../../../../components/UI/search/SearchField";
import { imageUpload } from "../../../../utils/uploadImage";
import { useDeleteProductMutation, useGetAllProductQuery, useUpdateProductMutation } from "../../../../redux/features/products/productsApi";
import { PRODUCT_TYPE } from "../../../../types/product";
import { IPagination } from "../../../../types/setup";
import MetaPagination from "../../../../components/Pagination/Pagination";

const Products: React.FC = () => {
  const [pagination, setPagination] = useState<IPagination>({} as IPagination);
  const { data: Product, isLoading } = useGetAllProductQuery({
    page: pagination.page || 1,
    limit: pagination.limit || 10,
    sort: ''
  });
  useEffect(()=>{
    if(Product?.meta && Product){
      setPagination(Product.meta); 
    }
  },[Product])
  const [deleteProduct] = useDeleteProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [form] = Form.useForm();
  const [updateFrom] = Form.useForm();
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<PRODUCT_TYPE.Products>({} as PRODUCT_TYPE.Products);
  const [isReviewView, setIsReviewView] = useState(false);
  const [ reviews, setReviews ] = useState([]);

  const handleDeleteProduct = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
    if (result.isConfirmed) {
      const toastId = toast.loading("Updated Loading...");
      try {
        await deleteProduct(id);
        toast.success("Deleted Successfully!", {
          id: toastId,
          duration: 2000,
        });
      } catch (err) {
        toast.error("Something went wrong", { id: toastId });
      }
    }
  };
;

  // const handleAddProduct = async () => {
  //   try {
  //     const values = await form.validateFields(); 
  //     console.log("Form values:", values);

  //     const toastId = toast.loading("Loading...");

  //     const img = values.upload[0].originFileObj as File;
  //     const image_url = await imageUpload(img);

  //     const payload = {
  //       name: values.name,
  //       brand: values.brand,
  //       model: values.model,
  //       cc: parseFloat(values.cc),
  //       pricePerHour: parseFloat(values.pricePerHour),
  //       year: parseFloat(values.year),
  //       description: values.description,
  //       image: image_url,
  //     };
  //     console.log("Image file:", img);

  //     const res = await addProduct(payload).unwrap();
  //     console.log("API Response:", res);
  //     if (res?.statusCode === 200 && res?.success) {
  //       toast.success("Product Added Successfully!", {
  //         id: toastId,
  //         duration: 1500,
  //       });
  //     } else {
  //       toast.error("Product Added Error!", { duration: 1000 });
  //     }
  //     setIsAddVisible(false)
  //     form.resetFields();
  //     // Modal.destroyAll();
  //   } catch (errorInfo) {
  //     console.log("Form validation or API call failed:", errorInfo);
  //     toast.error("Something went wrong!", { duration: 1000 });
  //   }
  // };

  const handleUpdateProduct = (record: PRODUCT_TYPE.Products) => {
    setCurrentProduct(record);
    updateFrom.setFieldsValue(record);
    setIsUpdateModalVisible(true);
  };

  const handleUpdateSubmit = async () => {
    const toastId = toast.loading("Updated Loading...");

    try {
      const values = await updateFrom.validateFields();
      const img = values.upload[0].originFileObj as File;
      const image_url = await imageUpload(img);
      const payload = {
        name: values.name,
        brand: values.brand,
        model: values.model,
        cc: parseFloat(values.cc),
        pricePerHour: parseFloat(values.pricePerHour),
        year: parseFloat(values.year),
        description: values.description,
        image: image_url,
      };

      // payload.image = image_url;

      const res = await updateProduct({
        id: currentProduct?.id,
        updatedProduct: payload,
      }).unwrap();
      console.log("API Response:", res);
      if (res?.statusCode === 200 && res?.success) {
        toast.success("Product Updated Successfully!", {
          id: toastId,
          duration: 1500,
        });
      } else {
        toast.error("Product Updated Error!", { duration: 1000 });
      }
      setIsUpdateModalVisible(false);
      form.resetFields();
    } catch (error) {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  
  const handleViewReview = (record: any) =>{
    setReviews(record?.review)
    setIsReviewView(true);
    // console.log(record);
    
  }

  const columns: TableProps<PRODUCT_TYPE.Products>["columns"] = [
    
    {
      title: "Product",
      dataIndex: "name",
      key: "name",
      render: (_, render) => (
        <div className="flex justify-start items-center">
          <img
            className="w-8 h-8 rounded-full me-3"
            src={render.images}
            alt=""
          />
          <div>
            <p className="text-md font-bold">{render.name}</p>
            <p>
              {render.description.length > 15
                ? `${render.description.substring(0, 15)}...`
                : render.description}
            </p>{" "}
          </div>
        </div>
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Price",
      dataIndex: "salePrice",
      key: "salePrice",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Stock",
      dataIndex: "inStock",
      key: "inStock",
      render: (_, record) => (
        <div
        >
          <p
            className={`text-white w-10 text-center  rounded-md ${
              record.inStock ? "bg-green-500" : "bg-gray-500"
            }`}
          >
            {record.inStock ? "Yes" : "No"}
          </p>
        </div>
      ),
    },
    {
      title: "Discounts",
      dataIndex: "discounts",
      key: "discounts",
    },
    {
      title: "Review",
      dataIndex: "review",
      key: "review",
      render: (_, record) => (
        <Space size="middle">
          <FundViewOutlined
            onClick={() => handleViewReview(record )}
            className="text-blue-500 text-lg"
          />
        </Space>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          {/* <EditOutlined
            onClick={() => handleUpdateProduct(record)}
            className="text-blue-500 text-lg"
          /> */}
          <DeleteOutlined
            onClick={() => handleDeleteProduct(record?.id ? record?.id : "")}
            className="text-red-500 hover:text-red-600 text-lg"
          />
        </Space>
      ),
    },
  ];
  const columns2: TableProps<any>["columns"] = [
    {
      title: "User",
      dataIndex: "user",
      key: "user",
      render: (_, render) => (
        <div className="flex justify-start items-center">
          <p className="text-md font-semibold">#{render?.userId.slice(0,8)}</p>
        </div>
      ),
    },
    {
      title: "rating",
      dataIndex: "rating",
      key: "rating",
      render: (_, render) => (
        <div className="flex justify-start items-center">
          <Rate allowHalf defaultValue={_}></Rate>
        </div>
      ),
    },
    {
      title: "comment",
      dataIndex: "comment",
      key: "comment",
    },
  ];

  return (
    <div className="mt-5 overflow-x-auto">
      <div>
        <h1 className="text-lg mb-2 text-black font-semibold">Products</h1>
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

      {/* table part  */}
      <Table<PRODUCT_TYPE.Products>
        columns={columns}
        dataSource={Product?.data}
        loading={isLoading}
        pagination={false}
      />
     <MetaPagination setPagination={setPagination} pagination={pagination}></MetaPagination>
      {/* updated modal */}

      <Modal
        title="Update Product"
        visible={isUpdateModalVisible}
        onCancel={() => setIsUpdateModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsUpdateModalVisible(false)}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleUpdateSubmit}>
            Update
          </Button>,
        ]}
      >
        <Form form={updateFrom} layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Product Name"
                rules={[
                  {
                    required: true,
                    message: "Please enter the Product Name",
                  },
                ]}
              >
                <Input placeholder="Enter product name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="brand"
                label="Brand name"
                rules={[
                  {
                    required: true,
                    message: "Please enter the Brand Name",
                  },
                ]}
              >
                <Input placeholder="Enter Brand Name" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="model"
                label="Model Name"
                rules={[
                  {
                    required: true,
                    message: "Please enter the model",
                  },
                ]}
              >
                <Input placeholder="Enter Model" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="cc"
                label="Engine Capacity(CC)"
                rules={[
                  {
                    required: true,
                    message: "Please enter the Engine Capacity",
                  },
                ]}
              >
                <Input
                  type="number"
                  min={0}
                  placeholder="Enter Engine Capacity"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="pricePerHour"
                label="Price Per Hour"
                rules={[
                  {
                    required: true,
                    message: "Please enter the Price Per Hour",
                  },
                ]}
              >
                <Input
                  type="number"
                  min={0}
                  placeholder="Enter Price Per Hour"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="year"
                label="year"
                rules={[
                  {
                    required: true,
                    message: "Please enter the Year",
                  },
                ]}
              >
                <Input type="number" min={0} placeholder="Enter Year" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            name="description"
            label="description"
            rules={[
              {
                required: true,
                message: "Please enter the description",
              },
            ]}
          >
            <TextArea
              autoSize={{ minRows: 2, maxRows: 3 }}
              placeholder="Enter description"
            />
          </Form.Item>

          <Form.Item
            name="upload"
            label="Upload Product Image"
            valuePropName="fileList"
            getValueFromEvent={(e) => e?.fileList}
          >
            <Upload
              listType="picture"
              maxCount={1}
              beforeUpload={() => false}
              // onChange={handleUploadChange}
            >
              <Button icon={<UploadOutlined />}>Select Image</Button>
            </Upload>
          </Form.Item>
          {/* </Row> */}
        </Form>
      </Modal>

      <Modal
        title="Product Review"
        visible={isReviewView}
        onCancel={() => setIsReviewView(false)}
      >
        <Table pagination={false} columns={columns2} dataSource={reviews || [] } />
      </Modal> 
    </div>
  );
};

export default Products;
