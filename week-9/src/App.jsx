
import { useState } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    course: "",
    password: "",
  });

  const [submitted, setSubmitted] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setSubmitted(false);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="container">
      <div className="form-box">

        <h1>Student Registration</h1>

        <p className="subtitle">
          College Student Registration Portal
        </p>

        <form onSubmit={handleSubmit}>

          {/* Full Name */}
          <label htmlFor="name">Full Name</label>

          <input
            id="name"
            type="text"
            name="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          {/* Email */}
          <label htmlFor="email">Email</label>

          <input
            id="email"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          {/* Phone */}
          <label htmlFor="phone">Phone Number</label>

          <input
            id="phone"
            type="tel"
            name="phone"
            placeholder="Enter phone number"
            value={formData.phone}
            onChange={handleChange}
            pattern="[0-9]{10}"
            maxLength="10"
            required
          />

          {/* Date of Birth */}
          <label htmlFor="dob">Date of Birth</label>

          <input
            id="dob"
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
          />

          {/* Gender */}
          <label>Gender</label>

          <div className="gender">

            <label>
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={formData.gender === "Male"}
                onChange={handleChange}
                required
              />
              Male
            </label>

            <label>
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={formData.gender === "Female"}
                onChange={handleChange}
              />
              Female
            </label>

          </div>

          {/* Course */}
          <label htmlFor="course">Course</label>

          <select
            id="course"
            name="course"
            value={formData.course}
            onChange={handleChange}
            required
          >
            <option value="">Select Course</option>

            <option value="CSE">
              Computer Science Engineering
            </option>

            <option value="AI & ML">
              Artificial Intelligence & Machine Learning
            </option>

            <option value="ECE">
              Electronics and Communication Engineering
            </option>

            <option value="EEE">
              Electrical and Electronics Engineering
            </option>
          </select>

          {/* Password */}
          <label htmlFor="password">Password</label>

          <input
            id="password"
            type="password"
            name="password"
            placeholder="Create a password"
            value={formData.password}
            onChange={handleChange}
            minLength="6"
            required
          />

          {/* Terms and Conditions */}
          <div className="terms">

            <input
              id="terms"
              type="checkbox"
              required
            />

            <label htmlFor="terms">
              I agree to the terms and conditions
            </label>

          </div>

          {/* Register Button */}
          <button type="submit">
            Register
          </button>

        </form>

        {/* Success Message */}
        {submitted && (
          <div className="success">
            Registration Successful! 🎉
          </div>
        )}

      </div>
    </div>
  );
}

export default App;

