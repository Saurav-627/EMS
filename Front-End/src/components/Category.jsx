import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";

const Category = () => {
  const [category, setCategory] = useState([]);

  //READ OPERATION
  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/category")
      .then((result) => {
        if (result.data.Status) {
          setCategory(result.data.Result);
        } else {
          alert(result.data.err);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  //DELETE OPERATION
  const handleDelete = (ID) => {
    // const updateDate = category.filter((c) => c.ID !== ID);
    // setCategory(updateDate);
    axios
      .delete(`http://localhost:3000/auth/category/${ID}`)
      .then((result) => {
        if (result.data.Status) {
          // setCategory(category.filter((c) => c.id !== id));
          setCategory(category.filter((c) => c.ID !== ID));
        } else {
          alert(result.data.err);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="px-5 mt-3">
      <div className="flex justify-center font-bold ">
        <h3>Category List</h3>
      </div>
      <Link
        to="/dashboard/add_category"
        className="border bg-green-700 p-1 rounded-md text-slate-50"
      >
        Add Category
      </Link>

      <div className="w-full max-h-80 overflow-y-scroll shadow mt-3 mb-3 border">
        <table className="w-full min-w-max table-auto text-left border-collapse border border-gray-200  overflow-scroll rounded-lg">
          <thead className="border">
            <tr>
              <th className=" border-gray-500 bg-slate-50 p-4 text-sm font-bold text-gray-700">
                Name
              </th>
            </tr>
          </thead>
          <tbody>
            {/* {category.map((curElem) => {
              console.log(curElem.id);
              
              return (
                <tr key={curElem.id}>
                  <td>{curElem.name}</td>
                </tr>
              );
            })} */}
            {category.map((c, ID) => {
              return (
                <tr key={ID} className="flex justify-between">
                  <td className="border border-gray-500 p-4 text-sm text-gray-700 capitalize font-medium w-full">
                    {c.Name}
                  </td>
                  <td className="flex justify-center items-center ">
                    <button
                      className="text-3xl text-red-700"
                      onClick={() => handleDelete(c.ID)}
                    >
                      <MdDeleteForever />
                    </button>
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

export default Category;
