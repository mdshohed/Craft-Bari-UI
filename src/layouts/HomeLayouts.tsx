
import Footer from "@/pages/shared/Footer";
import Header from "@/pages/shared/Header";
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