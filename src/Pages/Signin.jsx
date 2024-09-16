import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signin() {
  const navigate = useNavigate();
  const handleSignin = async (e) => {
    e.preventDefault();
    if (
      !document.getElementById("email").value ||
      !document.getElementById("password").value
    ) {
      return alert("Please fill all the fields");
    }
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/signin",
        {
          email,
          password,
        }
      );
      localStorage.setItem("userId", response.data.userId);
      localStorage.setItem("token", response.data.token);
      navigate("/consult");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="flex w-[100%] h-[100vh] items-center justify-center">
      <div className="lg:w-[600px] md:w-[500px] w-[300px] mx-auto p-4 pt-6 md:p-6 lg:p-12">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign in</h2>
        <form>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="example@example.com"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Choose a password"
            />
          </div>
          <div className="flex flex-col items-center justify-between gap-4">
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-[100%] shadow-lg"
              type="submit"
              onClick={handleSignin}
            >
              Sign in
            </button>
            <p className="text-sm text-gray-600">
              If not already registered,{" "}
              <Link
                to="/signup"
                className="text-green-500 hover:text-green-700"
              >
                sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signin;