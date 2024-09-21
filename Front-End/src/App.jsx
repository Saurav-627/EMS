import Category from "./components/Category";
import Dashboard from "./components/Dashboard";
import Employee from "./components/Employee";
import Home from "./components/Home";
import Login from "./components/Login";
import {BrowserRouter, Routes , Route} from "react-router-dom";
import Profile from "./components/Profile";
import AddCategory from "./components/AddCategory";
import AddEmployee from "./components/AddEmployee";
import EditEmployee from "./components/EditEmployee";
import AddAdmin from "./components/AddAdmin";
import EditAdmin from "./components/EditAdmin";

const App = () => {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />}>
         <Route path="/dashboard" element={<Home />}></Route>
         <Route path="/dashboard/employee" element={<Employee />}></Route>
         <Route path="/dashboard/category" element={<Category />}></Route>
         <Route path="/dashboard/profile" element={<Profile />}></Route>
         <Route path="/dashboard/add_category" element={<AddCategory />} ></Route>
         <Route path="/dashboard/add_employee" element={<AddEmployee />} ></Route>
         <Route path="/dashboard/edit_employee/:id" element={<EditEmployee />}></Route>
         <Route path="/dashboard/add_admin" element={<AddAdmin />}></Route>
         <Route path="/dashboard/edit_admin/:id" element={<EditAdmin />}></Route>
        </Route>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
