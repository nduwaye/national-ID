
// Handle registration
const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = Object.fromEntries(new FormData(registerForm));

    const res = await fetch("/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });

    const data = await res.json();
    document.getElementById("msg").innerText = data.message;
    registerForm.reset();
  });
}

// Handle login
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = Object.fromEntries(new FormData(loginForm));

    const res = await fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });

    const data = await res.json();

    if (data.success) {
      window.location.href = "admin.html";
    } else {
      document.getElementById("msg").innerText = data.message;
    }
  });
}

// Load users for admin
if (window.location.pathname.includes("admin.html")) {
  fetch("/users")
    .then(res => res.json())
    .then(users => {
      const list = document.getElementById("userList");
      users.forEach(user => {
        const li = document.createElement("li");
        li.textContent = `${user.names} - ${user.phone} - ${user.email}`;
        list.appendChild(li);
      });
    });
}

