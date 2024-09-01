import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddCategory = () => {
  const [category, setCategory] = useState();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/auth/add_category", { category })
      .then((result) => {
        if (result.data.Status) {
          navigate("/dashboard/category");
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex  justify-center w-full mt-10">
      <div className="shadow-md shadow-slate-800 p-2 rounded-md flex flex-col gap-1 justify-center w-1/3  border border-slate-300">
        <h1 className="text-center text-2xl font-bold">Add Category</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="category">
              <strong>Category:</strong>
            </label>
            <br />
            <input
              type="text"
              name="category"
              autoComplete="off"
              placeholder="Add Category"
              className="border border-slate-400 rounded-md p-1 my-1 w-full text-gray-950"
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <div className="flex justify-center m-2">
            <input
              type="submit"
              name="submit"
              value={"Add"}
              className=" rounded-md p-1  cursor-pointer bg-green-600 w-full"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
