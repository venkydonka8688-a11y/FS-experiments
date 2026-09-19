const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve files from public folder
app.use(express.static(path.join(__dirname, "public")));

// ================= HOME =================

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ================= REGISTER PAGE =================

app.get("/register", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "register.html"));
});

// ================= REGISTER USER =================

app.post("/register", (req, res) => {

    const newUser = {
        name: req.body.name,
        age: req.body.age,
        dob: req.body.dob,
        gender: req.body.gender,
        email: req.body.email,
        mobile: req.body.mobile,
        username: req.body.username,
        password: req.body.password,
        address: req.body.address
    };

    fs.readFile(
        path.join(__dirname, "users.json"),
        "utf8",
        (err, data) => {

            let users = [];

            if (!err && data.trim() !== "") {
                users = JSON.parse(data);
            }

            // Check username
            const existingUser = users.find(
                user => user.username === newUser.username
            );

            if (existingUser) {
                return res.send(`
                    <h2>Username Already Exists!</h2>
                    <a href="/register">Go Back</a>
                `);
            }

            // Add new user
            users.push(newUser);

            // Save data
            fs.writeFile(
                path.join(__dirname, "users.json"),
                JSON.stringify(users, null, 2),
                (err) => {

                    if (err) {
                        return res.send("Error saving user data.");
                    }

                    res.send(`
                        <h2>Registration Successful!</h2>
                        <p>Your account has been created successfully.</p>
                        <a href="/login">Go to Login</a>
                    `);
                }
            );
        }
    );
});

// ================= LOGIN PAGE =================

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "login.html"));
});

// ================= LOGIN USER =================

app.post("/login", (req, res) => {

    const username = req.body.username;
    const password = req.body.password;

    fs.readFile(
        path.join(__dirname, "users.json"),
        "utf8",
        (err, data) => {

            if (err) {
                return res.send("Error reading user data.");
            }

            let users = [];

            if (data.trim() !== "") {
                users = JSON.parse(data);
            }

            const user = users.find(
                user =>
                    user.username === username &&
                    user.password === password
            );

            if (user) {

                res.sendFile(
                    path.join(__dirname, "public", "dashboard.html")
                );

            } else {

                res.send(`
                    <h2>Invalid Username or Password</h2>
                    <a href="/login">Try Again</a>
                `);
            }
        }
    );
});

// ================= LOGOUT =================

app.get("/logout", (req, res) => {
    res.redirect("/login");
});

// ================= START SERVER =================

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});