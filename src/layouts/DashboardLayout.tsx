
import React, { useState } from "react";
import {  Breadcrumb, Button, Layout, theme } from "antd";

import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

import {  Home, LogOut, MenuIcon } from "lucide-react";
import { toast } from "sonner";
import { useAppDispatch } from "@/redux/hooks";
import { logout } from "@/redux/features/auth/authSlice";

const { Header, Content } = Layout;
// console.log("h", Header, Content);


const DashboardLayout: React.FC = () => {
  const dispatch = useAppDispatch();
  const handleLogout = async() => {
    const toastId = toast.loading("Loading...");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    dispatch(logout()); 
    toast.success("LogOut", { id: toastId, duration: 500, position: 'bottom-right' });
  };

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
            {/* <Header style={{ padding: 0, background: colorBgContainer }}> 
              <div className="flex items-center space-x-5">
              <Button
                type="text"
                icon={collapsed ? <MenuIcon /> : <MenuIcon />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  width: 54,
                  height: 54,
                }}
              />
              <Home className="w-4"></Home>
              <Breadcrumb
                items={[{ title: "Home" }, { title: "Dashboard" }]}
              />
                </div>
                <button
                // onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-2 w-full text-sm text-rust hover:bg-rust/5 rounded-md transition"
              >
                <LogOutIcon />
                Logout
              </button>
            </Header> */}
            <Header
              style={{ padding: "0 16px", background: colorBgContainer }}
              className="flex items-center justify-between"
            >
              {/* Left Side */}
              <div className="flex items-center gap-4">
                <Button
                  type="text"
                  icon={<MenuIcon />}
                  onClick={() => setCollapsed(!collapsed)}
                  style={{
                    width: 54,
                    height: 54,
                  }}
                />
                <Home className="w-4 h-4" />
                <Breadcrumb
                  items={[{ title: "Home" }, { title: "Dashboard" }]}
                />
              </div>
              {/* Right Side */}
              <button
                className="
                  flex items-center gap-1
                  px-2 py-0 h-10
                  rounded-xl
                  from-blue-500 to-blue-500
                
                  font-semibold
                  shadow-md
                  hover:from-blue-500 hover:to-blue-700
                  transition-all duration-300
                "
                onClick={handleLogout}
              >
                <LogOut size={20} />
                Logout
              </button>
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
