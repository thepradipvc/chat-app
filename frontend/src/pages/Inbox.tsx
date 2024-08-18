import Sidebar from "@/components/SideBar";
import { Outlet } from "react-router-dom";

const Inbox = () => {
  return (
    <div className="grid h-full max-h-full grid-cols-[1fr_2fr]">
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default Inbox;
