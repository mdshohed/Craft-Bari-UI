
import React, {  useEffect, useState } from "react";
import {
  Card,
  Form,
  Input,
  Button,
  Row,
  Col,
  message,
  Tabs,
  Select,
} from "antd";
import TabPane from "antd/es/tabs/TabPane";
import { useGetProfileQuery, useUpdateProfileMutation } from "../../../../redux/features/user/userApi";
import { timeDiff } from "@/utils/common";

const Profile: React.FC = () => {
  const { data: profile } = useGetProfileQuery(null);
  const [updateProfile] = useUpdateProfileMutation();
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  // const [imagePreviews, setImagePreviews] = useState<string[] | []>([]);
  const [imagePreviews, setImagePreviews] = useState<string>('');

  const [personalForm] = Form.useForm();
  const [passwordForm] = Form.useForm();

  const [isEditable, setIsEditable] = useState(false);

  const handleImageChange = (e: any) => {
    const file = e.target.files![0];
    setImageFiles(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // const handleImageChange = ({ fileList }: any) => {
  //   const file = fileList[0]?.originFileObj || null;
  //   if (file) {
  //     setImageFiles(file);
  //     const reader = new FileReader();
  //     reader.onload = () => setImagePreviews(reader.result as string);
  //     reader.readAsDataURL(file);
  //   }
  // };
  
  useEffect(() => {
    if(profile && profile?.data){
      personalForm.setFieldsValue(profile?.data);
    }
  }, [profile]);

  const handleEditToggle = () => {
    setIsEditable((prev) => !prev);
  };

  const handleSubmit = async (values: any) => {
    const hide = message.loading('processing...');
    const formData = new FormData();
    let profileData = {...values};
    formData.append("data", JSON.stringify(profileData));

    if (imageFiles && imageFiles instanceof File) {
      formData.append("file", imageFiles); 
    } else {
      console.warn("imageFile is not a valid File");
    }
    try {     
      await updateProfile( formData );
      message.success('Updated successfully!');
      hide(); 
      setIsEditable(false);
    } catch (error) {
      message.error('Failed to update primary info');
    }
  };

  // const submitPasswordForm = async (values: any) => {
    // console.log('Detailed Info Submitted:', values);
    // try {
    //   await updateRegistration(String(studentId), {detailsInfo: values});
    //   message.success('Detailed info updated successfully');
    //   setIsEditable(false);
    // } catch (error) {
    //   message.error('Failed to update detailed Info')
    // }
  // };

  return (
    <div>
      <div className="flex justify-between items-center py-4 px-2">
        <h1 className="text-lg text-black font-semibold">Manage Profile</h1>
        <Button
          key="edit"
          type={isEditable ? "default" : "primary"}
          onClick={handleEditToggle}
        >
          {isEditable ? "Cancel Edit" : "Edit"}
        </Button>
      </div>

      <Row gutter={16} align="top">
        <Col xs={24} md={8}>
          <Card title="Profile Information" style={{ height: "auto" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <div
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                  backgroundColor: "#f0f0f0",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: "10px",
                  fontSize: "24px",
                  fontWeight: "bold",
                  color: "#aaa",
                }}
              >
                { 
                profile?.data?.profilePhoto ? 
                  <img src={profile?.data?.profilePhoto}></img>
                : 
                  (<div>P</div>)
                }
              </div>

              {/* <Upload>
                <Button icon={<UploadOutlined />}>Change Picture</Button>
              </Upload> */}
            </div>
            <Card>
              <p className="text-[14px] text-center">Registered: {timeDiff(profile?.data?.createdAt)}</p>
              <p className="text-[16px] text-center">{profile?.data?.name}</p>
              <p className="text-[16px] text-center">{profile?.data?.email}</p>
              <p className="text-[16px] text-center">{profile?.data?.contactNumber}</p>
            </Card>
          </Card>
        </Col>

        <Col xs={24} md={16}>
          <Card  style={{ height: "100%" }}>
            <Tabs>
              <TabPane key="personalInfo" tab="Personal Information">
                <Form
                  form={personalForm}
                  layout="vertical"
                  onFinish={handleSubmit}
                >
                  {/* <div style={{ border: '1px solid #d9d9d9', borderRadius: '8px', padding: '16px', marginBottom: '16px' }}> */}

                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item name="name" label="Full Name">
                        <Input
                          placeholder="Enter name"
                          disabled={!isEditable}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item name="email" label="Email Address">
                        <Input
                          placeholder="Enter Email Address"
                          disabled={true}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item name="gender" label="Gender">
                        <Select
                          disabled={!isEditable}
                          options={[
                            { value: "MALE", label: "Male" },
                            { value: "FEMALE", label: "Female" },
                          ]}
                          placeholder="Select Gender"
                        />
                      </Form.Item>
                    </Col>

                    <Col span={12}>
                      <Form.Item name="contactNumber" label="Mobile No">
                        <Input
                          placeholder="Enter Mobile No"
                          disabled={!isEditable}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <Form.Item name="address" label="Address">
                        <Input.TextArea
                          placeholder="Address..."
                          disabled={!isEditable}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Col span={8}>
                    <Form.Item name="images" label="Upload Image" valuePropName="normFile">
                      {/* <Upload
                        disabled={!isEditable}
                        listType="picture-card"
                        className="avatar-uploader"
                        accept="image/*"
                        onChange={handleImageChange}
                        maxCount={1}
                        beforeUpload={()=>false}
                      >
                        <div>
                          {<PlusOutlined />}
                          <div style={{ marginTop: 8 }}>Upload</div>
                        </div>
                      </Upload> */}
                      
                      <div className="flex flex-wrap gap-2 py-2">
                        <div className="min-w-fit flex-1">
                          <label
                            className="flex h-14 w-full cursor-pointer items-center justify-center rounded-xl border-2 border-default-200 text-default-500 shadow-sm transition-all duration-100 hover:border-default-400"
                            htmlFor="image"
                          >
                            Upload image
                          </label>
                          <input
                            disabled={!isEditable}
                            multiple
                            className="hidden"
                            id="image"
                            type="file"
                            onChange={(e) => handleImageChange(e)}
                          />
                        </div>
                      </div>

                      <div className="relative size-32 rounded-xl border-2 border-dashed border-default-300 p-2">
                        <img
                          alt="item"
                          className="h-full w-full object-cover object-center rounded-md"
                          src={imagePreviews}
                        />
                      </div>

                      {/* {imagePreviews.length > 0 && (
                        <div className="flex gap-5 my-5 flex-wrap">
                          {imagePreviews.map((imageDataUrl) => (
                            <div
                              key={imageDataUrl}
                              className="relative size-48 rounded-xl border-2 border-dashed border-default-300 p-2"
                            >
                              <img
                                alt="item"
                                className="h-full w-full object-cover object-center rounded-md"
                                src={imageDataUrl}
                              />
                            </div>
                          ))}
                        </div>
                      )} */}

                    </Form.Item>
                  </Col>
                  {/* </div> */}
                  <Button disabled={!isEditable} type="primary" htmlType="submit">
                    Save Change
                  </Button>
                </Form>
              </TabPane>
              <TabPane key="password" tab="Password">
                <Form
                  form={passwordForm}
                  layout="vertical"
                  // onFinish={submitPasswordForm}
                >
                  <Row gutter={16}>
                    <Col span={24}>
                      <Form.Item name="password" label="Current Password">
                        <Input
                          placeholder="Current Password"
                          disabled={!isEditable}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item name="newPassword" label="New Password">
                        <Input
                          placeholder="New Password"
                          disabled={!isEditable}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="confirmNewPassword"
                        label="Confirm New Password"
                      >
                        <Input
                          placeholder="Retype Password"
                          disabled={!isEditable}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Button disabled={!isEditable} type="primary" htmlType="submit">
                    Change Password
                  </Button>
                </Form>
              </TabPane>
            </Tabs>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Profile;
