import React, { useState } from "react";
import { Button, Col, Form, Input, Modal, Row, Select, Space, Switch, Table, Upload } from "antd";
import type { TableProps } from "antd";
import {
  useGetAllUserQuery,
  useUpdateUserMutation,
} from "../../../../redux/features/user/userApi";
import { toast } from "sonner";
import { timeDiff } from "../../../../utils/common";
import SearchField from "../../../../components/UI/search/SearchField";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { TUser } from "../../../../types/user";
import TextArea from "antd/es/input/TextArea";
import MetaPagination from "../../../../components/Pagination/Pagination";
import { IPagination } from "../../../../types/setup";

const usersActiveStatus = [
  {label: 'ACTIVE', value: true},
  {label: 'INACTIVE', value: false},
];

const UserRole = [
  {label: 'SUPER_ADMIN', value: true},
  {label: 'ADMIN', value: false},
  {label: 'VENDOR', value: false},
  {label: 'CUSTOMER', value: false},
];

const Users: React.FC = () => {
  const [pagination, setPagination] = useState<IPagination>({} as IPagination);
  const { data: user, isLoading } = useGetAllUserQuery({
    page: pagination.page || 1,
    limit: pagination.limit || 10
  });
  const [updateUser] = useUpdateUserMutation();
  const [currentUser, setCurrentUser] = useState<TUser>({} as TUser);
  const [isAddVisible, setIsAddVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);

  const [form] = Form.useForm();

  const handleUpdateUser = (record: TUser) => {
    setCurrentUser(record);
    form.setFieldsValue(record);
    setIsAddVisible(true);
    setIsUpdateModalVisible(true);
    usersActiveStatus.map(item=> item.label===record.status);
    UserRole.map(item=> item.label===record.role);

  };

  const handleSubmit = async () => {
    
    const toastId = toast.loading("Updated Loading...");

    if(isUpdateModalVisible){
      const payload = {
        role: currentUser.role === "admin" ? "user" : "admin",
      };
      const id = currentUser?.id;
      try {
        const res = await updateUser({ id: id, data: payload });
        form.resetFields(); 
        toast.success("Updated Successfully!", { id: toastId, duration: 1000 });
      } catch (err) {
        toast.error("Something went wrong", { id: toastId });
      }
    }
    else{
       const payload = {
        role: currentUser.role === "admin" ? "user" : "admin",
      };
      const id = currentUser?.id;
      try {
        const res = await updateUser({ id: id, data: payload });
        form.resetFields(); 
        toast.success("Updated Successfully!", { id: toastId, duration: 1000 });
      } catch (err) {
        toast.error("Something went wrong", { id: toastId });
      }
    }
  };

  const handleDeleteUser = async ( data: TUser) => {

    const toastId = toast.loading("Updated Loading...");
    const payload = {
      isActive: data.isActive === true ? false : true,
    };
    try {
      await updateUser({ id: data.id, data: payload });
      toast.success("Updated Successfully!", { id: toastId, duration: 2000 });
    } catch (err) {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  const columns: TableProps<TUser>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role Type",
      dataIndex: "role",
      key: "role",
      render: (role) => (
        <Space size="middle">
          {/* <div
            className={`${
              role == "admin" ? "bg-red-500" : "bg-green-500"
            } text-white px-3 pb-0.5 rounded-xl `}
          >
            {role}
          </div> */}
          <div>{role}</div>
        </Space>
      ),
    },

    {
      title: "Phone",
      dataIndex: "contactNumber",
      key: "contactNumber",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Member Since",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => {
        // const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        return timeDiff(createdAt);
      },
    },
    {
      title: "Active Status",
      dataIndex: "action",
      key: "action",
      render: (_, record) => {
        return (
          <Space size="middle">
            {/* <Switch
              defaultChecked={record?.isActive}
              onChange={() => handleChangeActive(record)}
            /> */}
            <div>{record.status}</div>
          </Space>
        );
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => {
        return (
          <Space size="middle">
          <EditOutlined
            onClick={() => handleUpdateUser(record)}
            className="text-blue-500 text-lg"
          />
          <DeleteOutlined
            onClick={() => handleDeleteUser(record)}
            className="text-red-500 hover:text-red-600 text-lg"
          />
        </Space>
          // <Space size="middle">
          //   <button
          //     className={`text-white flex justify-center items-center hover:text-gray-200 rounded-md ${
          //       record.role === "admin" ? "bg-red-500 " : "bg-green-500"
          //     } px-2 py-1`}
          //     onClick={() => handleUpdateUser(record)}
          //   >
          //     {record.role === "admin" ? "Demote To User" : "Promote to Admin"}
          //   </button>
          // </Space>
        );
      },
    },
  ];

  const handleFormCancel = () => {
    setIsAddVisible(false);
    setIsUpdateModalVisible(false); 
    form.resetFields();
  }

  return (
    <div className="overflow-x-auto">
      <div className="">
        <h1 className="text-lg text-black font-semibold mb-2">Users</h1>
      </div>
      <div style={{ marginBottom: 16 }}>
        <div className="flex justify-between items-center">
          <div>
            <div>
              <SearchField></SearchField>
            </div>
          </div>
          <div className="me-4 sm:me-10">
            <Button
              type="primary"
              onClick={() => setIsAddVisible(true)}
            >
              Add User
            </Button>
          </div>
        </div>
      </div>
      <Table<TUser>
        columns={columns}
        dataSource={user?.data}
        loading={isLoading}
        pagination={false}
      />
      <MetaPagination pagination={pagination} setPagination={setPagination}></MetaPagination>

      <Modal
        title={isUpdateModalVisible ? "Update User" : "Add User"}
        visible={isAddVisible}
        onCancel={ handleFormCancel}
        footer={[
          <Button key="cancel" onClick={handleFormCancel}>
            Cancel
          </Button>,
          
          <Button key="submit" type="primary" onClick={ handleSubmit }>
            {isUpdateModalVisible ? "Update" : "Add"}
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Full Name"
                rules={[
                  {
                    required: true,
                    message: "Full Name",
                  },
                ]}
              >
                <Input placeholder="Full Name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  {
                    required: true,
                    message: "Please enter the Email",
                  },
                ]}
              >
                <Input placeholder="Email" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="role"
                label="Role Type"
                rules={[
                  {
                    required: true,
                    message: "Please set a role",
                  },
                ]}
              >
                {/* <Input placeholder="Role Type" /> */}
                <Select options={UserRole} placeholder="Role Type"></Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="contactNumber"
                label="Phone"
                rules={[
                  {
                    required: true,
                    message: "Phone Number",
                  },
                ]}
              >
                <Input
                  type="text"
                  min={0}
                  placeholder="Number"
                />
              </Form.Item>
            </Col>
          </Row>
          {
            isUpdateModalVisible && 
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="status"
                  label="User Status"
                  rules={[
                    {
                      required: true,
                      message: "Please add Status",
                    },
                  ]}
                >
                  <Select options={usersActiveStatus} placeholder="User Status">

                  </Select>
                  {/* <Input placeholder="User Status" /> */}
                </Form.Item>
              </Col>
            </Row>
          }
          
          <Form.Item
            name="address"
            label="address"
            rules={[
              {
                required: true,
                message: "address",
              },
            ]}
          >
            <TextArea
              autoSize={{ minRows: 2, maxRows: 3 }}
              placeholder="Address"
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Users;
