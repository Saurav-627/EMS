  import express from "express";
  import conn from "../utils/db.js";
  import jwt from "jsonwebtoken";

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

  router.get('/category' , (req , res) => {
      const sql = "SELECT * FROM category";
      conn.query(sql,(err,result) => {
          if(err) return res.json({Status : false, Error : "Query Error"})
          return res.json({Status: true , Result : result})
      })
  })

  router.delete('/category/:id' ,(req , res) => {
    const {id} = req.params;
    const sql = "DELETE FROM category WHERE id=(?) ";
    conn.query(sql,[id], (err,result) => {
      if(err) return res.json({Status: false , Error : "Query Error"})
        return res.json({Status:true, Result : result})
    })
  })


  router.post("/add_category", (req, res) => {
    const sql = "INSERT INTO category (`Name`) VALUES (?)";
    conn.query(sql, [req.body.category], (err, result) => {
      if (err) return res.json({ Status: false, Error: "Query Error" });
      return res.json({ Status: true });
    });
  });

  export { router as adminRouter };
