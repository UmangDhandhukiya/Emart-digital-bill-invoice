import React, { useState } from "react";
import axios from "axios";

const RegistrationPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    verifyPassword: "",
  });
  const [backendError, setBackendError] = useState(""); // For backend errors
  const [loading, setLoading] = useState(false); // For loading state

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleRegister = async () => {
    let valid = true;
    let emailError = "";
    let passwordError = "";
    let verifyPasswordError = "";

    // Validate email
    if (!email) {
      emailError = "Email is required";
      valid = false;
    } else if (!validateEmail(email)) {
      emailError = "Invalid email address";
      valid = false;
    }

    // Validate password
    if (!password) {
      passwordError = "Password is required";
      valid = false;
    } else if (password.length < 6) {
      passwordError = "Password must be at least 6 characters";
      valid = false;
    }

    // Validate confirm password
    if (!verifyPassword) {
      verifyPasswordError = "Please verify your password";
      valid = false;
    } else if (verifyPassword !== password) {
      verifyPasswordError = "Passwords do not match";
      valid = false;
    }

    // Update errors state
    setErrors({
      email: emailError,
      password: passwordError,
      verifyPassword: verifyPasswordError,
    });

    // If validation passes, send data to the backend
    if (valid) {
      setLoading(true); // Start loading
      setBackendError(""); // Clear previous backend errors

      try {
        const response = await axios.post("http://localhost:5000/register", {
          email,
          password,
          confirmPassword: verifyPassword,
        });
        console.log("Registration successful:", response.data);
        alert("Registration successful!"); // Show success message
      } catch (error) {
        console.error("Registration failed:", error.response?.data);
        setBackendError(
          error.response?.data?.error || "Registration failed. Please try again."
        ); // Show backend error
      } finally {
        setLoading(false); // Stop loading
      }
    }
  };

  return (
    <div
      className="flex items-center justify-center h-screen w-screen bg-gray-100 px-4"
      style={{ fontFamily: "Poppins, sans-serif" }}
    >
      <div className="w-full p-2 rounded-lg">
        <h2 className="text-3xl mb-7 font-bold text-center text-black-200">
          Register
        </h2>

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

        {/* Verify Password Field */}
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Verify password:
          </label>
          <input
            type="password"
            id="verify-password"
            className="mt-1 p-2 w-full border-b border-black bg-transparent focus:ring-blue-500 focus:border-blue-500"
            value={verifyPassword}
            onChange={(e) => setVerifyPassword(e.target.value)}
          />
          {errors.verifyPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.verifyPassword}</p>
          )}
        </div>

        {/* Backend Error Message */}
        {backendError && (
          <p className="text-red-500 text-sm mt-1 text-center">{backendError}</p>
        )}

        {/* Register Button */}
        <div className="mt-4">
          <button
            type="button"
            className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 disabled:bg-green-300"
            onClick={handleRegister}
            disabled={loading} // Disable button when loading
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </div>

        {/* Terms and Conditions */}
        <p className="mt-7 text-sm text-center text-gray-600">
          By creating an account, you are agreeing to our{" "}
          <a href="#" className="text-green-500">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-green-500">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default RegistrationPage;