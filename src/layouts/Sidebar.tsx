
import { selectCurrentUser } from "../redux/features/auth/authSlice";
import { useAppSelector } from "../redux/hooks";
import { adminPaths } from "../routes/admin.routes";
import { sidebarItemsGenerator } from "../utils/sidebarItemsGenerator";
import { Layout, Menu } from "antd";
import React from "react";
import { customerPaths } from "../routes/customer.routes";
import { vendorPaths } from "../routes/vendor.routes";

const { Sider } = Layout;

const userRole = {
  SUPER_ADMIN: "SUPER_ADMIN",
  ADMIN: "ADMIN",
  VENDOR: "VENDOR",
  CUSTOMER: "CUSTOMER"
};

const Sidebar = ({ collapsed, setCollapsed }: { collapsed: boolean, setCollapsed: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const user = useAppSelector(selectCurrentUser);

  let sidebarItems;

  switch (user!.role) {
    case userRole.SUPER_ADMIN:
      sidebarItems = sidebarItemsGenerator(adminPaths, "admin");
      break;
    case userRole.ADMIN:
      sidebarItems = sidebarItemsGenerator(adminPaths, "admin");
      break;
    case userRole.CUSTOMER:
      sidebarItems = sidebarItemsGenerator(customerPaths, "user");
      break;
    default:
      break;
  }

  return (
    <Sider
      onCollapse={(value) => setCollapsed(value)}
      trigger={null}
      collapsible
      collapsed={collapsed}
      breakpoint="lg"
      collapsedWidth="0"
    >
      <div className="demo-logo-vertical" />

      <Menu
        theme="light"
        mode="inline"
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        style={{ height: "100%", borderRight: 0, paddingTop: "60px"}}
        items={sidebarItems}
      />
    </Sider>
  );
};

export default Sidebar;
