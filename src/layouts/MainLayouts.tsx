
import Footer from "@/pages/Shared/Footer";
import Header from "@/pages/Shared/Header";
import { Outlet } from "react-router-dom";


const MainLayouts = () => {
  return (
    <div >
      <Header></Header>
        <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default MainLayouts;