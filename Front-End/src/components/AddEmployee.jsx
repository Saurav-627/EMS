import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    category_ID: "",
    image: "",
    salary: "",
  });

  const [category, setCategory] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  //READ OPERATION
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
    if (employee.image) {
      formData.append("image", employee.image);
    }

    axios
      .post("http://localhost:3000/auth/add_employee", formData)
      .then((result) => {
        if (result.data.Status) {
          console.log(result);
          navigate("/dashboard/employee");
        } else {
          console.log("Something went Wrong" + result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex  justify-center w-full mt-4">
      <div className="shadow-md shadow-slate-800 p-2 rounded-md flex flex-col gap-1 justify-center w-1/2  border border-slate-300 ">
        <h1 className="text-center text-2xl font-bold">Add Employee</h1>
        <form
          className="max-h-96 overflow-y-scroll px-4"
          onSubmit={handleSubmit}
        >
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
              onChange={(e) =>
                setEmployee({ ...employee, password: e.target.value })
              }
            />
            <span
              onClick={togglePasswordVisibility}
              className="absolute right-2 top-8 cursor-pointer text-center"
            >
              {showPassword ? "👁️" : "🙈"}
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
              onChange={(e) =>
                setEmployee({ ...employee, category_ID: e.target.value })
              }
            >
              {category.map((c) => {
                return (
                  <option key={c.ID} value={c.ID} defaultValue={c.ID}>
                    {c.Name}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <label htmlFor="image">
              <strong>Select Image:</strong>
            </label>
            <br />
            <input
              type="file"
              name="image"
              autoComplete="off"
              placeholder="Add image"
              className="border border-slate-400 rounded-md p-1 my-1 w-full text-gray-950 cursor-pointer"
              onChange={(e) =>
                setEmployee({ ...employee, image: e.target.files[0] })
              }
            />
          </div>
          <div className="flex justify-center m-2">
            <input
              type="submit"
              name="submit"
              value={"Add Employee"}
              className=" rounded-md p-1  cursor-pointer bg-green-600 w-full text-white font-bold"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
