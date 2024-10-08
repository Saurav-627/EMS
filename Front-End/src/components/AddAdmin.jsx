import axios from "axios";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AddAdmin = () => {
  const [admin, setAdmin] = useState({
    Name: "",
    Email: "",
    Password: "",
  });
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3000/auth/add_admin", admin)
      .then((result) => {
        if (result.data.Status) {
          navigate("/dashboard/admin");
        } else {
          console.error("Error adding admin:", result.data.Error);
        }
      })
      .catch((error) => {
        console.error("Error during the request:", error);
      });
  };

  return (
    <div className="flex justify-center w-full mt-4">
      <div className="shadow-md shadow-slate-800 p-2 rounded-md flex flex-col gap-1 justify-center w-1/2 border border-slate-300">
        <h1 className="text-center text-2xl font-bold">Add Admin</h1>
        <form className="max-h-96 px-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">
              <strong>Name:</strong>
            </label>
            <br />
            <input
              type="text"
              name="Name"
              autoComplete="off"
              placeholder="Enter Full Name"
              className="border border-slate-400 rounded-md p-1 my-1 w-full text-gray-950"
              onChange={(e) => setAdmin({ ...admin, Name: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="email">
              <strong>Email:</strong>
            </label>
            <br />
            <input
              type="email"
              name="Email"
              autoComplete="off"
              placeholder="Enter Email"
              className="border border-slate-400 rounded-md p-1 my-1 w-full text-gray-950"
              onChange={(e) => setAdmin({ ...admin, Email: e.target.value })}
            />
          </div>

          <div className="relative">
            <label htmlFor="password">
              <strong>Password:</strong>
            </label>
            <br />
            <input
              type={showPassword ? "text" : "password"}
              name="Password"
              autoComplete="off"
              placeholder="Enter Password"
              className="border border-slate-400 rounded-md p-1 my-1 w-full text-gray-950 pr-10"
              onChange={(e) => setAdmin({ ...admin, Password: e.target.value })}
            />
            <span
              onClick={togglePasswordVisibility}
              className="absolute right-2 top-8 cursor-pointer text-center"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <div className="flex justify-center m-2">
            <input
              type="submit"
              name="submit"
              value={"Add Admin"}
              className="rounded-md p-1 cursor-pointer bg-green-600 w-full text-white font-bold"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAdmin;
