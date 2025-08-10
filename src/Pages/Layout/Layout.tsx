
import Navbar from "../../Component/Navbar/Navbar"; // adjust path as needed
import Footer from "../../Component/Footer/Footer"; // adjust path as needed
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet /> {/* This renders the nested route (your page content) */}
      </main>
      <Footer />
    </>
  );
}

export default Layout;
