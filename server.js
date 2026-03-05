const express = require("express");
const path = require("path");

const app = express();

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// serve static files
app.use(express.static(path.join(__dirname, "public")));

let users = [];

// home route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// register user
app.post("/register", (req, res) => {
  const user = req.body;
  users.push(user);

  res.json({
    success: true,
    message: "Wiyandikishije neza"
  });
});

// admin login
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "admin123") {
    return res.json({ success: true });
  }

  res.json({
    success: false,
    message: "Login failed"
  });
});

// get all users
app.get("/users", (req, res) => {
  res.json(users);
});

// delete user
app.delete("/users/:index", (req, res) => {
  const index = req.params.index;

  if (users[index]) {
    users.splice(index, 1);
    res.json({ message: "User deleted" });
  } else {
    res.json({ message: "User not found" });
  }
});

// port for Render
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
