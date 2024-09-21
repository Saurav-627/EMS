import { useState } from "react";
import "./style.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [Values, setValues] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);

  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleEmail = (e) => {
    setValues({ ...Values, email: e.target.value });
  };
  const handlePassword = (e) => {
    setValues({ ...Values, password: e.target.value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3000/auth/adminlogin", Values)
      .then((result) => {
        if (result.data.loginStatus) {
          navigate("/dashboard");
        } else {
          setError(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex justify-center items-center w-full h-screen loginPage">
      <div className="shadow-md shadow-slate-800 p-2 rounded-md flex flex-col gap-1 justify-center w-1/3 border border-slate-300 loginForm">
        <h1 className="text-center text-2xl font-bold">Log In Page</h1>
        <div className="text-red-500">{error && error}</div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">
              <strong>Email:</strong>
            </label>
            <br />
            <input
              type="email"
              name="email"
              autoComplete="off"
              placeholder="Enter your email"
              className="border border-slate-400 rounded-md p-1 my-1 w-full text-gray-950"
              onChange={handleEmail}
            />
          </div>
          <div>
            <label htmlFor="password">
              <strong>Password:</strong>
            </label>
            <br />
            <input
              type="password"
              name="password"
              autoComplete="off"
              placeholder="Enter your password"
              className="border border-slate-400 rounded-md p-1 my-1 w-full text-gray-950"
              onChange={handlePassword}
            />
          </div>
          <div className="flex justify-center m-2">
            <input
              type="submit"
              name="submit"
              value={"Log In"}
              className=" rounded-md p-1  cursor-pointer bg-green-600 w-40"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
