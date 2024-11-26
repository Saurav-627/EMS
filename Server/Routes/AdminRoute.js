import express from "express";
import conn from "../utils/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import multer from "multer";
import path from "path";

const router = express.Router();

router.post("/adminlogin", (req, res) => {
  const sql = "SELECT * from admin Where Email = ? and Password = ?";
  conn.query(sql, [req.body.email, req.body.password], (err, result) => {
    if (err) return res.json({ loginStatus: false, Error: "Query error" });
    if (result.length > 0) {
      const email = result[0].email;
      const token = jwt.sign(
        { role: "admin", email: email },
        "jwt_secret_key",
        { expiresIn: "1d" }
      );
      res.cookie("token", token);
      return res.json({ loginStatus: true });
    } else {
      return res.json({ loginStatus: false, Error: "Wrong Email or Password" });
    }
  });
});

router.get("/category", (req, res) => {
  const sql = "SELECT * FROM category";
  conn.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" });
    return res.json({ Status: true, Result: result });
  });
});

router.delete("/category/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM category WHERE id=(?) ";
  conn.query(sql, [id], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" });
    return res.json({ Status: true, Result: result });
  });
});

router.post("/add_category", (req, res) => {
  const sql = "INSERT INTO category (`Name`) VALUES (?)";
  conn.query(sql, [req.body.category], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" });
    return res.json({ Status: true });
  });
});

// image upload start

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Public/images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
});

// end image upload

router.post("/add_employee", upload.single("image"), (req, res) => {
  const sql = `INSERT INTO employee (name, email, password, address, salary, image, category_ID) VALUES (?,?,?,?,?,?,?)`;

  // changing password into hash so to do it we install bcrypt
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) return res.json({ Status: false, Error: "Query Error in hash" });
    const values = [
      req.body.name,
      req.body.email,
      hash,
      req.body.address,
      req.body.salary,
      req.file.filename,
      req.body.category_ID,
    ];

    conn.query(sql, values, (err, result) => {
      if (err) {
        console.error("SQL Error:", err);
        return res.json({
          Status: false,
          Error: "Query Error: " + err.message,
        });
      }
      return res.json({ Status: true });
    });
  });
});

router.get("/employee", (req, res) => {
  //yo query ma foreign key ko through bata category name fetch gareko
  const sql = `
        SELECT e.*, c.Name
        FROM employee e
        JOIN category c ON e.category_ID = c.ID
    `;
  conn.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" });
    return res.json({ Status: true, Result: result });
  });
});

router.get("/employee/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM employee WHERE id = ?";
  conn.query(sql, [id], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" });
    return res.json({ Status: true, Result: result });
  });
});

//updating data of employee
router.put("/edit_employee/:id", upload.single("image"), (req, res) => {
  const id = req.params.id;
  const sql = `UPDATE employee SET name = ?, email = ?, password = ?, address = ?, salary = ?, category_ID = ? WHERE id = ?`;

  // changing password into hash so to do it we install bcrypt
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) return res.json({ Status: false, Error: "Query Error in hash" });
    const values = [
      req.body.name,
      req.body.email,
      hash,
      req.body.address,
      req.body.salary,
      req.body.category_ID,
      id,
    ];

    conn.query(sql, values, (err, result) => {
      if (err) {
        console.error("SQL Error:", err);
        return res.json({
          Status: false,
          Error: "Query Error: " + err.message,
        });
      }
      return res.json({ Status: true });
    });
  });
});

router.delete("/delete_employee/:id", (req, res) => {
  const id = req.params.id;

  // Delete employee from database
  const sql = "DELETE FROM employee WHERE id = ?";
  conn.query(sql, [id], (err, result) => {
    if (err)
      return res.json({ Status: false, Error: "Query Error: " + err.message });
    return res.json({ Status: true, Result: result });
  });
});

router.get("/employee_count", (req, res) => {
  const sql = "SELECT COUNT(*) AS totalEmployee FROM employee";
  conn.query(sql, (err, result) => {
    if (err)
      return res.json({
        Status: false,
        Error: "Query Error in Count: " + err.message,
      });
    return res.json({ Status: true, totalEmployee: result[0].totalEmployee });
  });
});

router.get("/admin_count", (req, res) => {
  const sql = "SELECT COUNT(*) AS totalAdmin FROM admin";
  conn.query(sql, (err, result) => {
    if (err)
      return res.json({
        Status: false,
        Error: "Query Error in Count: " + err.message,
      });
    return res.json({ Status: true, totalAdmin: result[0].totalAdmin });
  });
});

router.get("/total_salary", (req, res) => {
  const sql = "SELECT SUM(salary) AS totalSalary FROM employee";
  conn.query(sql, (err, result) => {
    if (err)
      return res.json({
        Status: false,
        Error: "Query Error in Count: " + err.message,
      });
    return res.json({ Status: true, totalSalary: result[0].totalSalary });
  });
});

router.get("/admin", (req, res) => {
  const sql = "SELECT * from admin";
  conn.query(sql, (err, result) => {
    if (err)
      return res.json({ Status: false, Error: "Query Error" + err.message });
    return res.json({ Status: true, Result: result });
  });
});

//Add data in admin table
router.post("/add_admin", (req, res) => {
  const { Name, Email, Password } = req.body; // Destructure the request body
  const sql =
    "INSERT INTO admin (`Name`, `Email`, `Password`) VALUES (?, ?, ?)";
  conn.query(sql, [Name, Email, Password], (err, result) => {
    if (err) {
      console.error("Query Error in add admin:", err.message); // Log the error message for debugging
      return res.json({ Status: false, Error: "Query Error in add admin" });
    }
    return res.json({ Status: true });
  });
});

//delete data from admin table
router.delete("/delete_admin/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM admin WHERE ID = ?";
  conn.query(sql, [id], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" });
    return res.json({ Status: true, Result: result });
  });
});

//get data from admin table

router.get("/edit_admin/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM admin WHERE ID = ?";
  conn.query(sql, [id], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" });
    return res.json({ Status: true, Result: result });
  });
});

//updating data of admin
router.put("/edit_admin/:id", (req, res) => {
  const id = req.params.id;
  const sql = "UPDATE admin SET Name = ?, Email = ?, Password = ? WHERE ID = ?";
  conn.query(sql, [req.body.Name, req.body.Email, req.body.Password, id], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" });
    return res.json({ Status: true, Result: result });
  });
});




export { router as adminRouter };

