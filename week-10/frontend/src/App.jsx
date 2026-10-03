
import { useEffect, useState } from "react";
import "./App.css";

const API = "http://localhost:5000";

function App() {
  const emptyForm = {
    name: "",
    email: "",
    password: "",
    gender: "",
    country: "",
    languages: []
  };

  const [form, setForm] = useState(emptyForm);
  const [students, setStudents] = useState([]);
  const [message, setMessage] = useState("");
  const [editId, setEditId] = useState("");

  async function loadStudents() {
    try {
      const response = await fetch(`${API}/students`);
      const data = await response.json();
      if (!response.ok) throw new Error("Unable to load students");
      setStudents(data);
    } catch {
      setMessage("Start the backend and MongoDB first.");
    }
  }

  useEffect(() => {
    loadStudents();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  function handleLanguage(e) {
    const { value, checked } = e.target;
    setForm({
      ...form,
      languages: checked
        ? [...form.languages, value]
        : form.languages.filter(language => language !== value)
    });
  }

  async function saveStudent(e) {
    e.preventDefault();

    try {
      const editing = Boolean(editId);
      const response = await fetch(
        editing ? `${API}/students/${editId}` : `${API}/students`,
        {
          method: editing ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form)
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Request failed");

      setMessage(data.message);
      setForm({ ...emptyForm, languages: [] });
      setEditId("");
      loadStudents();
    } catch (error) {
      setMessage(error.message);
    }
  }

  function editStudent(student) {
    setForm({
      name: student.name,
      email: student.email,
      password: student.password,
      gender: student.gender,
      country: student.country,
      languages: student.languages || []
    });
    setEditId(student._id);
    setMessage("Edit the details and click Update.");
  }

  async function deleteStudent(id) {
    if (!window.confirm("Delete this student?")) return;

    try {
      const response = await fetch(`${API}/students/${id}`, {
        method: "DELETE"
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Delete failed");
      setMessage(data.message);
      loadStudents();
    } catch (error) {
      setMessage(error.message);
    }
  }

  return (
    <main className="page">
      <section className="form-box">
        <h1>Student Registration</h1>

        <form onSubmit={saveStudent}>
          <label>Name</label>
          <input name="name" placeholder="Enter name" value={form.name}
            onChange={handleChange} required />

          <label>Email</label>
          <input type="email" name="email" placeholder="Enter email"
            value={form.email} onChange={handleChange} required />

          <label>Password</label>
          <input type="password" name="password" placeholder="Enter password"
            value={form.password} onChange={handleChange} required />

          <label>Gender</label>
          <div className="row">
            {["Male", "Female"].map(gender => (
              <label key={gender}>
                <input type="radio" name="gender" value={gender}
                  checked={form.gender === gender}
                  onChange={handleChange} required />
                {gender}
              </label>
            ))}
          </div>

          <label>Country</label>
          <select name="country" value={form.country}
            onChange={handleChange} required>
            <option value="">Select Country</option>
            <option>India</option>
            <option>USA</option>
            <option>UK</option>
            <option>Australia</option>
          </select>

          <label>Languages</label>
          <div className="row">
            {["English", "Hindi", "Telugu"].map(language => (
              <label key={language}>
                <input type="checkbox" value={language}
                  checked={form.languages.includes(language)}
                  onChange={handleLanguage} />
                {language}
              </label>
            ))}
          </div>

          <div className="button-row">
            <button type="submit">{editId ? "Update" : "Register"}</button>
            <button type="button" onClick={() => {
              setForm({ ...emptyForm, languages: [] });
              setEditId("");
              setMessage("");
            }}>Reset</button>
          </div>
        </form>

        {message && <p className="message">{message}</p>}
      </section>

      <section className="data-box">
        <h2>Registered Students</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Name</th><th>Email</th><th>Gender</th>
                <th>Country</th><th>Languages</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.length === 0 ? (
                <tr><td colSpan="6">No students registered yet.</td></tr>
              ) : students.map(student => (
                <tr key={student._id}>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.gender}</td>
                  <td>{student.country}</td>
                  <td>{(student.languages || []).join(", ")}</td>
                  <td>
                    <button type="button" onClick={() => editStudent(student)}>Edit</button>
                    <button type="button" className="delete-button"
                      onClick={() => deleteStudent(student._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

export default App;

