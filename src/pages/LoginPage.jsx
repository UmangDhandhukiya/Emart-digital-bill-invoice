import React, { useState } from "react";
import axios from "axios";
import logoFb from "../assets/fb.png";
import logoGg from "../assets/google.png";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [backendError, setBackendError] = useState(""); // For backend errors
  const [loading, setLoading] = useState(false); // For loading state

  const navigate = useNavigate();

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleLogin = async () => {
    // Validate email and password
    const emailError = !email
      ? "Email is required"
      : !validateEmail(email)
      ? "Invalid email address"
      : "";

    const passwordError = !password
      ? "Password is required"
      : password.length < 6
      ? "Password must be at least 6 characters"
      : "";

    setErrors({ email: emailError, password: passwordError });

    // If validation passes, send data to the backend
    if (!emailError && !passwordError) {
      setLoading(true); // Start loading
      setBackendError(""); // Clear previous backend errors

      try {
        const response = await axios.post("http://localhost:5000/login", {
          email,
          password,
        });
        console.log("Login successful:", response.data);
        
        // Redirect all users to the home page
        navigate('/home');
      } catch (error) {
        console.error("Login failed:", error.response?.data);
        setBackendError(
          error.response?.data?.error || "Login failed. Please try again."
        ); // Show backend error
      } finally {
        setLoading(false); // Stop loading
      }
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center gap-2 h-screen bg-gray-100"
      style={{ fontFamily: "Poppins, sans-serif" }}
    >
      <h2 className="text-3xl font-bold text-center text-black-200">
        Login Now !
      </h2>

      <div className="w-full max-w-md rounded-lg overflow-hidden">
        <div className="p-6">
          {/* Email Field */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 p-2 w-full border-b border-black bg-transparent focus:ring-blue-500 focus:border-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 p-2 w-full border-b border-black bg-transparent focus:ring-blue-500 focus:border-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Backend Error Message */}
          {backendError && (
            <p className="text-red-500 text-sm mt-1 text-center">
              {backendError}
            </p>
          )}

          {/* Login Button */}
          <button
            className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 disabled:bg-green-300"
            onClick={handleLogin}
            disabled={loading} // Disable button when loading
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* Social Login Buttons */}
          <p className="mt-4 text-center text-sm text-gray-500">or</p>
          <div className="flex justify-center mt-4">
            <button className="bg-white border border-gray-300 text-blue-500 py-2 px-4 rounded-md mr-2 flex items-center">
              <img src={logoFb} alt="Facebook Logo" className="w-5 h-5 mr-2" />
              Facebook
            </button>
            <button className="bg-white border border-gray-300 text-blue-500 py-2 px-4 rounded-md flex items-center">
              <img src={logoGg} alt="Google Logo" className="w-5 h-5 mr-2" />
              Google
            </button>
          </div>

          {/* Signup Link */}
          <p className="mt-6 text-sm text-center text-gray-500">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              Create One
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;