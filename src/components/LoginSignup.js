import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./LoginSignUp.css";

const LoginSignup = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    role: "VISITOR", // Default role
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const handleRoleChange = (e) => {
  //   setFormData({ ...formData, role: e.target.value });
  // };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get("http://localhost:8080/user");
      const users = response.data;

      const user = users.find(
        (u) => u.email === formData.email && u.password === formData.password
      );
      localStorage.setItem("user",JSON.stringify(user));

      if (user) {
        switch (user.role) {
          case "ADMIN":
            navigate("/admin");
            break;
          case "ARTIST":
            navigate("/artist");
            break;
          case "VISITOR":
            navigate("/home");
            break;
          default:
            setError("Invalid role.");
        }
      } else {
        setError("Invalid email or password.");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred while logging in. Please try again.");
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/user", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        role: formData.role, // Ensure role is sent to the backend
      });

      const createdUser = response.data;

      if (formData.role === "ARTIST") {
        navigate("/artist");
      } else {
        navigate("/home");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred during registration. Please try again.");
    }
  };

  const switchTabs = (tab) => {
    setIsLogin(tab === "login");
    setError("");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Your Company"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          {isLogin
            ? "Sign in to your Art-Flake account"
            : "Create a new account"}
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="flex justify-center mb-4">
            <button
              onClick={() => switchTabs("login")}
              className={`${
                isLogin ? "text-indigo-600 border-b-2 border-indigo-600" : ""
              } mr-4 pb-2`}
            >
              Login
            </button>
            <button
              onClick={() => switchTabs("register")}
              className={`${
                !isLogin ? "text-indigo-600 border-b-2 border-indigo-600" : ""
              } pb-2`}
            >
              Register
            </button>
          </div>

          {isLogin ? (
            <form className="loginForm" onSubmit={handleLoginSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-6"
                >
                  Sign in
                </button>
              </div>
            </form>
          ) : (
            <form className="signUpForm" onSubmit={handleRegisterSubmit}>
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Username
                </label>
                <div className="mt-1">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Role
                </label>
                <div className="mt-1">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="role"
                      value="ARTIST"
                      checked={formData.role === "ARTIST"}
                      onChange={handleChange}
                      className="form-radio text-indigo-600"
                    />
                    <span className="ml-2">Artist</span>
                  </label>
                  <label className="inline-flex items-center ml-6">
                    <input
                      type="radio"
                      name="role"
                      value="VISITOR"
                      checked={formData.role === "VISITOR"}
                      onChange={handleChange}
                      className="form-radio text-indigo-600"
                    />
                    <span className="ml-2">Visitor</span>
                  </label>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-6"
                >
                  Register
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
