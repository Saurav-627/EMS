import axios from "axios";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

const Admin = () => {
  const [admin, setAdmin] = useState([]);
  const navigate = useNavigate();

  const fetchAdmin = async () => {
    try {
      const response = await axios.get("http://localhost:3000/auth/admin");
      setAdmin(response.data.Result);
    } catch (err) {
      console.log("Error Fetching data" + err);
    }
  };

  useEffect(() => {
    fetchAdmin();
  }, []);

  const handleDeleteAdmin = (ID) => {
    axios
      .delete(`http://localhost:3000/auth/delete_admin/${ID}`)
      .then((response) => {
        if (response.data.Status) {
          // Refresh the admin data after deletion
          fetchAdmin();
        } else {
          console.error("Error deleting admin:", response.data.Error);
        }
      });
  };

  const handleAddAdmin = () => {
    navigate("/dashboard/add_admin");
  };

  const TABLE_HEAD = ["SN", "Name", "Email", "Actions"];

  return (
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
  );
};

export default Admin;
