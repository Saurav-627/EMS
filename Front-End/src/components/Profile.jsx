import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Profile = () => {
  const [employee, setEmployee] = useState([]); // Set initial state to null
  const [category, setCategory] = useState([]);

  const { id } = useParams();

  useEffect(() => {
      axios
        .get(`http://localhost:3000/auth/employee/${id}`)
        .then((result) => {
          if (result.data.Status) {
            setEmployee(result.data.Result[0]);
          } else {
            alert(result.data.Error);
          }
        })
        .catch((err) => console.log(err));
  }, [id]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/category")
      .then((result) => {
        if (result.data.Status) {
          setCategory(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);


  return (
    <div className="flex justify-center w-full mt-4">
      <div className="shadow-sm shadow-slate-800 p-2 rounded-md flex flex-col gap-1 w-full border border-slate-300 overflow-hidden justify-center">
        <h1 className="text-center text-2xl font-bold">View Employee</h1>
        <form className="px-4 flex justify-between mt-4">
            <div className="flex justify-center w-1/2 pr-10">
              <img
                src={`http://localhost:3000/images/` + employee.image}
                alt={employee.name}
                className="w-96 h-96 rounded-full border-4 border-green-400"
              />
            </div>
          <div className="flex flex-col gap-2 w-1/2 mr-16">
            <div>
              <label htmlFor="name">
                <strong>Full Name:</strong>
              </label>
              <br />
              <input
                type="text"
                name="name"
                autoComplete="off"
                placeholder="Enter Full Name"
                className="border border-slate-400 rounded-md p-1 my-1 w-full text-gray-950"
                value={employee.name || ""}
                disabled
              />
            </div>

            <div>
              <label htmlFor="email">
                <strong>Email:</strong>
              </label>
              <br />
              <input
                type="email"
                name="email"
                autoComplete="off"
                placeholder="Enter Email"
                className="border border-slate-400 rounded-md p-1 my-1 w-full text-gray-950"
                value={employee.email || ""}
                disabled
              />
            </div>
            <div>
              <label htmlFor="address">
                <strong>Address</strong>
              </label>
              <br />
              <input
                type="text"
                name="address"
                autoComplete="off"
                placeholder="Enter Address"
                className="border border-slate-400 rounded-md p-1 my-1 w-full text-gray-950"
                value={employee.address || ""}
                disabled
              />
            </div>
            <div>
              <label htmlFor="salary">
                <strong>Salary:</strong>
              </label>
              <br />
              <input
                type="number"
                name="salary"
                autoComplete="off"
                placeholder="Salary"
                className="border border-slate-400 rounded-md p-1 my-1 w-full text-gray-950"
                value={employee.salary || ""}
                disabled
              />
            </div>
            <div>
              <label htmlFor="category">
                <strong>Category:</strong>
              </label>
              <br />
              <select
                name="category"
                id="category"
                className="border border-slate-400 rounded-md p-1 my-1 w-full text-gray-950 cursor-pointer"
                value={employee.category_ID || ""}
                disabled
              >
                {category.map((c) => {
                  return (
                    <option key={c.ID} value={c.ID}>
                      {c.Name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
