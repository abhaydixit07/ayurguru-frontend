import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

function Signup() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);
    const email = document.getElementById("email").value.trim();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    if (!email || !username || !password) {
      return setError("All fields are required.");
    }
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/signup`,
        { email, username, password }
      );
      localStorage.setItem("userId", response.data.userId);
      navigate("/signin");
    } catch (error) {
      console.error(error);
      if (error.response) {
        if (error.response.status === 400) {
          setError(error.response.data.error || "Invalid signup details (email and username should be unique).");
        } else if (error.response.status === 500) {
          setError("A server error occurred. Please try again later.");
        } else {
          setError("An unexpected error occurred. Please try again.");
        }
      } else {
        setError("Unable to connect to the server. Please check your internet connection.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full h-screen items-center justify-center bg-gray-100">
      <div className="lg:w-[600px] md:w-[500px] w-[300px] bg-white shadow-lg rounded-md p-6">
        <h2 className="text-3xl font-bold mb-6 text-center text-green-500">
          Create Your Account
        </h2>
        <form>
          {error && (
            <div className="text-red-600 text-center mb-4">{error}</div>
          )}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500"
              id="email"
              type="email"
              placeholder="example@example.com"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500"
              id="username"
              type="text"
              placeholder="Choose a username"
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
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500"
              id="password"
              type="password"
              placeholder="Choose a password"
            />
          </div>
          <div className="flex flex-col items-center justify-between gap-4">
            <button
              className={`${loading ? "bg-green-300 cursor-not-allowed" : "bg-green-500 hover:bg-green-700"
                } text-white font-bold py-2 px-4 rounded w-full shadow-lg flex items-center justify-center`}
              type="submit"
              onClick={handleSignup}
              disabled={loading}
            >
              {loading ? (
                <ClipLoader size={24} color="#ffffff" />
              ) : (
                "Sign Up"
              )}
            </button>
            <p className="text-sm text-gray-600">
              Already registered?{" "}
              <Link
                to="/signin"
                className="text-green-500 hover:text-green-700"
              >
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
