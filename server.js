const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

let users = []; 
app.post("/register", (req, res) => {
  users.push(req.body);
  res.json({ message: "Wiyandikishije neza" });
});
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "admin123") {
    return res.json({ success: true });
  }

  res.json({ success: false, message: "Login failed" });
});
app.get("/users", (req, res) => {
  res.json(users);
});
app.listen(3000, () => {
  console.log("Running at http://localhost:3000");
});
