// const page = () => {
//     return <div className="text-black">SignUp</div>
// }

// export default page;

"use client";

import React, { useState } from "react";
import "@/app/globals.css"; 
import Link from "next/link";
import axios from "axios";
import Cookies from "js-cookie";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validateForm = () => {
      const newErrors = {};

      if (!formData.name) newErrors.name = "Name is required";
      if (!formData.username) newErrors.username = "Email is required";
      if (!formData.password || formData.password.length < 8)
        newErrors.password = "Password must be at least 8 characters";
      return newErrors;
    };

    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      axios
        .post("http://127.0.0.1:8080/api/auth/register", formData)
        .then((response) => {
          if (response.data.token) {
            Cookies.set("token", response.data.token, { expires: 1 });
            alert("Signup successful!");

          } else {
            alert(
              "Signup failed! Response from API: " +
                JSON.stringify(response.data)
            );
          }
        })
        .catch((error) => {
          if (error.response) {
            console.error("Error Response Data:", error.response.data);
            console.error("Error Response Status:", error.response.status);
            console.error("Error Response Headers:", error.response.headers);
            alert(
              "Error signing up: " +
                (error.response.data.message || "An unknown error occurred.")
            );
          } else if (error.request) {
            console.error("Error Request Data:", error.request);
            alert("Error signing up: No response from server.");
          } else {
            console.error("General Error:", error.message);
            alert("Error signing up: " + error.message);
          }
        });
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm max-sm:mt-16">
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
          Register for a new account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-900"
            >
              Name
            </label>
            <div className="mt-2">
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 border-2 border-slate-100 outline-1  outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
              />

              {errors.name && (
                <p className="text-red-500 text-xs">{errors.name}</p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-900"
            >
              Email
            </label>
            <div className="mt-2">
              <input
                id="username"
                name="username"
                type="username"
                required
                value={formData.username}
                onChange={handleChange}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 border-2 border-slate-100 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
              />
              {errors.username && (
                <p className="text-red-500 text-xs">{errors.username}</p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-900"
            >
              Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                minLength={8}
                required
                value={formData.password}
                onChange={handleChange}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 border-2 border-slate-100 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
              />
              {errors.password && (
                <p className="text-red-500 text-xs">{errors.password}</p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full block p-3 bg-indigo-600 text-white rounded-md text-center hover:bg-indigo-800"
            >
              Sign up
            </button>
          </div>

        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Already a member?{" "}
          <Link
            href="/auth/signin"
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
}
