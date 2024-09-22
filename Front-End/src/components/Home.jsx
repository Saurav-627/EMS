import { useEffect, useState } from "react";
import axios from "axios";
import { IoDocumentTextOutline, IoPeopleSharp } from "react-icons/io5";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { GrUserAdmin } from "react-icons/gr";
import { FaCheckCircle, FaHourglassHalf } from "react-icons/fa";
import { AiOutlineCloseCircle } from "react-icons/ai";

const TableBox = ({ title, value, icon, bgColorClass }) => {
  return (
    <div className="w-full h-full p-4">
      <div className="border shadow-2xl flex ">
        <div
          className={`flex items-center justify-center ${bgColorClass} w-16 text-gray-50`}
        >
          {icon}
        </div>
        <div className="pl-4">
          <h3 className="font-semibold">{title}:</h3>
          <h1 className="font-bold pt-1">{value}</h1>
        </div>
      </div>
    </div>
  );
};

const Home = () => {
  const [employeeCount, setEmployeeCount] = useState(0);
  const [adminCount, setAdminCount] = useState(0);
  const [salary, setTotalSalary] = useState(0);

  const fetchEmployeeCount = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/auth/employee_count"
      );
      setEmployeeCount(response.data.totalEmployee);
    } catch (err) {
      console.error("Error fetching data" + err);
    }
  };

  const fetchAdminCount = () => {
    axios
      .get("http://localhost:3000/auth/admin_count")
      .then((result) => {
        if (result) {
          setAdminCount(result.data.totalAdmin);
        } else {
          alert("Something is wrong");
        }
      })
      .catch((err) => console.log(err));
  };

  const fetchTotalSalary = () => {
    axios
      .get("http://localhost:3000/auth/total_salary")
      .then((result) => {
        if (result.data.Status) {
          setTotalSalary(result.data.totalSalary);
        } else {
          alert("Something went wrong");
        }
      })
      .catch((err) => console.log("Error Occurs" + err));
  };

  useEffect(() => {
    fetchEmployeeCount();
    fetchAdminCount();
    fetchTotalSalary();
  }, []);

  return (
    <div className="bg-gray-50">
      <div>
        <div className=" p-4">
          <h1 className="text-2xl font-bold ">Dashboard Overview</h1>
        </div>

        <div className="flex h-28">
          <TableBox
            icon={<IoPeopleSharp className="text-2xl" />}
            bgColorClass="bg-green-500"
            title="Total Employee"
            value={employeeCount}
          />
          <TableBox
            icon={<GrUserAdmin className="text-2xl" />}
            title="Total Admin"
            value={adminCount}
            bgColorClass="bg-yellow-600"
          />
          <TableBox
            icon={<RiMoneyRupeeCircleFill className="text-3xl" />}
            title="Monthly Pay(NPR)"
            value={salary}
            bgColorClass="bg-red-500"
          />
        </div>
      </div>
      <div className="h-full">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-center">Leave Details</h1>
        </div>
        <div className="grid grid-cols-2 h-28">
          <TableBox
            icon={<IoDocumentTextOutline className="text-2xl" />}
            bgColorClass="bg-green-700"
            title="Leave Applied"
            value={employeeCount}
          />
          <TableBox
            icon={<FaCheckCircle className="text-2xl" />}
            bgColorClass="bg-green-700"
            title="Leave Approval"
            value={employeeCount}
          />
          <TableBox
            icon={<FaHourglassHalf className="text-2xl" />}
            bgColorClass="bg-yellow-700"
            title="Leave Pending"
            value={employeeCount}
          />
          <TableBox
            icon={<AiOutlineCloseCircle className="text-2xl" />}
            bgColorClass="bg-red-500"
            title="Leave Rejected"
            value={employeeCount}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
