import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

const Employee = () => {
  const [employee, setEmployee] = useState([]);

  const navigate = useNavigate();

  // Sample data for table headers and rows
  const TABLE_HEAD = [
    "Image",
    "Name",
    "Email",
    "Address",
    "Category",
    "Salary(NPR)",
    "Actions",
  ];

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/employee")
      .then((result) => {
        if (result.data.Status) {
          setEmployee(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete("http://localhost:3000/auth/delete_employee/" + id)
      .then((result) => {
        if (result.data.Status) {
          setEmployee(employee.filter((c) => c.id !== id));
        } else {
          alert("Error Occurs"+result.data.Error);
        }
      })
      .catch((err) => console.log(err));

  };

  return (
    <>
      <div className="px-5 mt-3">
        <div className="flex justify-center font-bold ">
          <h3>Employee List</h3>
        </div>
        <Link
          to="/dashboard/add_employee"
          className="border bg-green-700 p-2 font-bold rounded-md text-slate-50"
        >
          Add Employee
        </Link>
      </div>

      {/* table parts  */}
      <div className="w-full max-h-80 overflow-y-scroll  mt-3 mb-3 bg-white shadow rounded-lg">
        <table className="w-full min-w-max table-auto text-center px-2">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-gray-200 bg-gray-50 p-4 text-sm font-medium text-gray-700"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {employee.map((data, index) => {
              return (
                <tr key={index} className="border w-full h-16">
                  <td className="flex justify-center items-center">
                    <img
                      src={`http://localhost:3000/images/` + data.image}
                      alt=""
                      className="w-14 h-14 rounded-full"
                    />
                  </td>
                  <td>{data.name}</td>
                  <td>{data.email}</td>
                  <td>{data.address}</td>
                  <td>{data.Name}</td>
                  <td>{data.salary}</td>
                  <td className="">
                    <div className="flex justify-center gap-4 text-xl">
                      <Link
                        to={`/dashboard/edit_employee/${data.id}`}
                        className="text-blue-500 hover:underline font-bold"
                      >
                        <FaEdit />
                      </Link>
                      <button
                        onClick={()=> handleDelete(data.id)}
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
    </>
  );
};

export default Employee;
