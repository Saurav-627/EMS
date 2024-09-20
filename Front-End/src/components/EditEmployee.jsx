import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditEmployee = () => {
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    salary: "",
    category_ID: "",
    image: null
  });
  const [category, setCategory] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const navigate = useNavigate();
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

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create FormData object
    const formData = new FormData();
    formData.append("name", employee.name);
    formData.append("email", employee.email);
    formData.append("password", employee.password);
    formData.append("address", employee.address);
    formData.append("salary", employee.salary);
    formData.append("category_ID", employee.category_ID);

    // Append file if exists

    axios
      .put(`http://localhost:3000/auth/edit_employee/${id}`, formData)
      .then((result) => {
        if (result.data.Status) {
          navigate("/dashboard/employee");
        } else {
          console.log("Something went Wrong" + result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex  justify-center w-full mt-4">
      <div className="shadow-md shadow-slate-800 p-2 rounded-md flex flex-col gap-1 w-1/2  border border-slate-300 overflow-hidden justify-center">
        <h1 className="text-center text-2xl font-bold">Edit Employee</h1>
        <form
          onSubmit={handleSubmit}
          className=" overflow-y-scroll px-4"
          style={{maxHeight:"29rem"}}
        >
          <div className="flex justify-center">
            <img src={`http://localhost:3000/images/`+employee.image} alt={employee.name}  className="w-48 h-44 rounded-full border-4 border-green-400" />
          </div>
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
              onChange={(e) =>
                setEmployee({ ...employee, name: e.target.value })
              }
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
              onChange={(e) =>
                setEmployee({ ...employee, email: e.target.value })
              }
            />
          </div>
          <div className="relative">
            <label htmlFor="password">
              <strong>Password:</strong>
            </label>
            <br />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              autoComplete="off"
              placeholder="Enter Password"
              className="border border-slate-400 rounded-md p-1 my-1 w-full text-gray-950 pr-10"
              value={employee.password || ""}
              onChange={(e) =>
                setEmployee({ ...employee, password: e.target.value })
              }
            />
            <span
              onClick={togglePasswordVisibility}
              className="absolute right-2 top-8 cursor-pointer text-center"
            >
              {showPassword ? '👁️' : '🙈'}
            </span>
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
              onChange={(e) =>
                setEmployee({ ...employee, address: e.target.value })
              }
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
              onChange={(e) =>
                setEmployee({ ...employee, salary: e.target.value })
              }
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
              onChange={(e) =>
                setEmployee({ ...employee, category_ID: e.target.value })
              }
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
          <div className="flex justify-center m-2">
            <input
              type="submit"
              name="submit"
              value={"Update Employee"}
              className=" rounded-md p-1  cursor-pointer bg-green-600 w-full text-white font-bold"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEmployee;
