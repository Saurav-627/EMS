import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

const TableBox = ({ title, value }) => {
  return (
    <div className="w-full h-full flex justify-center mx-2">
      <div className="border shadow-2xl mt-3 flex justify-center">
        <div className="font-bold p-5 text-center">
          <h3>{title}:</h3>
          <br />
          <h1>{value}</h1>
        </div>
      </div>
    </div>
  );
};

const Home = () => {
  const [employeeCount, setEmployeeCount] = useState(0);
  const [adminCount, setAdminCount] = useState(0);
  const [salary, setTotalSalary] = useState(0);
  const [admin, setAdmin] = useState([]);
  const navigate = useNavigate();

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

  const fetchAdmin = async () => {
    try {
      const response = await axios.get("http://localhost:3000/auth/admin");
      setAdmin(response.data.Result);
    } catch (err) {
      console.log("Error Fetching data" + err);
    }
  };

  const handleDeleteAdmin = (ID) => {
    axios
      .delete(`http://localhost:3000/auth/delete_admin/${ID}`)
      .then((response) => {
        if (response.data.Status) {
          // Refresh the admin data after deletion
          fetchAdminCount();
          fetchAdmin();
        } else {
          console.error("Error deleting admin:", response.data.Error);
        }
      });
  };

  useEffect(() => {
    fetchEmployeeCount();
    fetchAdminCount();
    fetchTotalSalary();
    fetchAdmin();
  }, []);

  const handleAddAdmin = () => {
    navigate("/dashboard/add_admin");
  };

  const TABLE_HEAD = ["SN", "Name", "Email", "Actions"];

  return (
    <div>
      <div className="flex h-28">
        <TableBox title="Total Employee" value={employeeCount} />
        <TableBox title="Total Admin" value={adminCount} />
        <TableBox title="Total Salary" value={salary} />
      </div>
      <div>
        <div className="w-full max-h-96 overflow-y-scroll mb-3 shadow rounded-lg">
          <div className="flex justify-between items-center px-4 mt-4">
            <h1 className="text-center text-black inline my-4 font-bold text-2xl">
              List of Admin
            </h1>
            <button
              onClick={() => handleAddAdmin()}
              className=" bg-green-700 p-2  font-bold rounded-md text-slate-50"
            >
              Add Admin
            </button>
          </div>
          <table className="w-full min-w-max table-auto text-center px-2">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-b border-gray-200 bg-gray-50 p-4 text-sm font-bold text-gray-700"
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {admin.map((data, index) => {
                return (
                  <tr key={index} className="border w-full h-16">
                    <td>{index + 1}</td>
                    <td>{data.Name}</td>
                    <td>{data.Email}</td>
                    <td className="">
                      <div className="flex justify-center gap-4 text-xl">
                        <Link
                          to={`/dashboard/edit_admin/${data.ID}`}
                          className="text-blue-500 hover:underline font-bold"
                        >
                          <FaEdit />
                        </Link>

                        <button
                          onClick={() => handleDeleteAdmin(data.ID)}
                          className="text-red-500 hover:underline font-bold text-2xl"
                        >
                          <MdDeleteForever />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
