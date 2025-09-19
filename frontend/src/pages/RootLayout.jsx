import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const RootLayout = () => {
  return (
    <div className="app-container">
      <Sidebar />
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
};
export default RootLayout