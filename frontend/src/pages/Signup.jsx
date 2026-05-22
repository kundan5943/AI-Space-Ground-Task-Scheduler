import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginAndSignup.css";
const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://ai-space-ground-task-scheduler.onrender.com//aiTaskSchedular/signup",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          credentials: "include",

          body: JSON.stringify(formData),
        },
      );

      const data = await response.json();

      if (response.ok) {
        navigate("/");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">SignUp</h1>

        <p className="auth-subtitle">Welcome back to AI Task Scheduler</p>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-input-group">
            <label className="auth-label" for="nme">
              Name
            </label>
            <input
              type="text"
              name="name"
              className="auth-input"
              placeholder="Please enter your name"
              value={formData.name}
              onChange={handleChange}
              id="nme"
            />
            <label className="auth-label" for="email">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="auth-input"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              id="email"
            />
            <label className="auth-label" for="pass">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="auth-input"
              placeholder="Enter password"
              value={formData.password}
              id="pass"
              onChange={handleChange}
            />

            <button className="auth-btn">SignUp</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
