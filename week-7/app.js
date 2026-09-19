const express = require("express");
const fs = require("fs");
const os = require("os");

const app = express();
const PORT = 3000;

// Read student data from JSON file
const data = fs.readFileSync("students.json", "utf-8");
const students = JSON.parse(data);

// GET all students
app.get("/students", (req, res) => {
    res.json(students);
});

// GET student by ID
app.get("/students/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const student = students.find(s => s.id === id);

    if (student) {
        res.json(student);
    } else {
        res.status(404).send("Student not found");
    }
});

// Search students by course
app.get("/search", (req, res) => {
    const course = req.query.course;

    const result = students.filter(
        s => s.course.toLowerCase() === course.toLowerCase()
    );

    res.json(result);
});

// Display system information
app.get("/system", (req, res) => {
    res.json({
        platform: os.platform(),
        architecture: os.arch(),
        hostname: os.hostname(),
        memory: os.totalmem()
    });
});

// Display DNS hostname
app.get("/dns", (req, res) => {
    res.send("DNS Hostname: " + os.hostname());
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});