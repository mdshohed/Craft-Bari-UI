
import React, { useState } from "react";
// import {  Breadcrumb, Button, Layout, theme } from "antd";

import Sidebar from "./Sidebar";
// import Menu as MenuHeadless from ''
import { Link, Outlet } from "react-router-dom";

import {  Home } from "lucide-react";

const { Header, Content } = Layout;
// console.log("h", Header, Content);


const DashboardLayout: React.FC = () => {

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <div className="max-w-8xl mx-auto px-[5%]">
      <Layout style={{ minHeight: "100vh" }}>

        <Layout>
          <Sidebar collapsed={collapsed} setCollapsed={setCollapsed}></Sidebar>
          <Layout>
            <Header style={{ padding: 0, background: colorBgContainer }}> 
              <div className="flex items-center space-x-5">
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  width: 54,
                  height: 54,
                }}
              />
              <Home className="w-4"></Home>
              <Breadcrumb
                // items={[{ title: "Home" }, { title: "List" }, { title: "App" }]}
                items={[{ title: "Home" }, { title: "Dashboard" }]}
              />
                </div>
            </Header>
            <Content
              style={{
                paddingLeft: 12,
                // margin: 10,
                minHeight: 280,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              <Outlet></Outlet>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </div>
    
  );
};

export default DashboardLayout;
