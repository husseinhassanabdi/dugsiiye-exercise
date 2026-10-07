import { useState } from "react";

function App() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    agree: false,
    country: ""
  });

  const [submittedData, setSubmittedData] = useState(null);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmittedData(formData);
  }

  return (
    <div>
      <h1>Registration Form</h1>

      <form onSubmit={handleSubmit}>
        {/* Username */}
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        />

        <br /><br />

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />

        <br /><br />

        {/* Password */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />

        <br /><br />

        {/* Checkbox */}
        <label>
          <input
            type="checkbox"
            name="agree"
            checked={formData.agree}
            onChange={handleChange}
          />
          I agree to the terms
        </label>

        <br /><br />

        {/* Dropdown */}
        <select
          name="country"
          value={formData.country}
          onChange={handleChange}
        >
          <option value="">Select Country</option>
          <option value="Kenya">Kenya</option>
          <option value="Somalia">Somalia</option>
          <option value="Uganda">Uganda</option>
        </select>

        <br /><br />

        <button type="submit">Submit</button>
      </form>

      {/* Display submitted data */}
      {submittedData && (
        <div>
          <h2>Entered Data</h2>

          <p>Username: {submittedData.username}</p>
          <p>Email: {submittedData.email}</p>
          <p>Password: {submittedData.password}</p>
          <p>
            Agreed: {submittedData.agree ? "Yes" : "No"}
          </p>
          <p>Country: {submittedData.country}</p>
        </div>
      )}
    </div>
  );
}

export default App;