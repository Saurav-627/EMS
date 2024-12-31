import {BrowserRouter, Routes , Route} from "react-router-dom";
import Login from "./components/Dashboard/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import Home from "./components/Dashboard/Home";
import Employee from "./components/Employee/Employee";
import Category from "./components/Category/Category";
import Admin from "./components/Admin/Admin";
import Profile from "./components/Dashboard/Profile";
import AddCategory from "./components/Category/AddCategory";
import AddEmployee from "./components/Employee/AddEmployee";
import EditEmployee from "./components/Employee/EditEmployee";
import AddAdmin from "./components/Admin/AddAdmin";
import EditAdmin from "./components/Admin/EditAdmin";


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
         <Route path='/dashboard/admin' element={<Admin /> }> </Route>
         <Route path="/dashboard/profile" element={<Profile />}></Route>
         <Route path="/dashboard/add_category" element={<AddCategory />} ></Route>
         <Route path="/dashboard/add_employee" element={<AddEmployee />} ></Route>
         <Route path="/dashboard/edit_employee/:id" element={<EditEmployee />}></Route>
         <Route path="/dashboard/add_admin" element={<AddAdmin />}></Route>
         <Route path="/dashboard/edit_admin/:id" element={<EditAdmin />}></Route>
         <Route path="/dashboard/profile/:id" element={<Profile />}></Route>
        </Route>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
