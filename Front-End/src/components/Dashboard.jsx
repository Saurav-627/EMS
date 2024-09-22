import { Link, Outlet } from "react-router-dom";
import "./Dashboard.css";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoPeopleSharp } from "react-icons/io5";
import { BiCategory } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { AiOutlineLogout } from "react-icons/ai";

const Dashboard = () => {
  return (
    <div className="w-full">
      <div className="flex flex-nowrap">
        <div className="w-1/4">
          <div className="bg-black h-screen text-slate-50 text-center flex flex-col gap-4 p-4">
            <Link to="/dashboard" className="text-2xl font-bold">
              EMS
            </Link>
            <hr />
            <ul className="flex flex-col gap-8">
              <li className=" rounded-md p-1 cursor-pointer  ">
                <Link to="/dashboard" className="flex justify-center gap-2 ">
                  <AiOutlineDashboard className="bg-none text-white text-2xl" />{" "}
                  Dashboard
                </Link>
              </li>
              <li className=" rounded-md p-1 cursor-pointer">
                <Link
                  to="/dashboard/employee"
                  className="flex justify-center gap-2 "
                >
                  <IoPeopleSharp className="bg-none text-white text-2xl" />
                  Manage Employees
                </Link>
              </li>
              <li className=" rounded-md p-1 cursor-pointer">
                <Link
                  to="/dashboard/category"
                  className="flex justify-center gap-2 "
                >
                  <BiCategory className="bg-none text-white text-2xl" />
                  Category
                </Link>
              </li>
              <li className=" rounded-md p-1 cursor-pointer">
                <Link
                  to="/dashboard/admin"
                  className="flex justify-center gap-2 "
                >
                  <CgProfile className="bg-none text-white text-2xl" />
                  Admin
                </Link>
              </li>
              <li className=" rounded-md p-1 cursor-pointer">
                <Link to="/" className="flex justify-center gap-2 ">
                  <AiOutlineLogout className="bg-none text-white text-2xl" />
                  Log Out
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="p-0 m-0 w-full">
          <div className="p-5 flex justify-between shadow-md w-full font-bold">
            <h4 className="flex-1 text-center">Employee Management System</h4>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
