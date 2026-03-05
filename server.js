const express = require("express");
const path = require("path");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

let users = [];

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Running at http://localhost:" + PORT);
});
