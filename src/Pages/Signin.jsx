import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

function Signin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignin = async (e) => {
    e.preventDefault();
    setError(null);

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
      return setError("Please fill all the fields.");
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/signin`,
        { email, password }
      );
      localStorage.setItem("userId", response.data.userId);
      localStorage.setItem("token", response.data.token);
      navigate("/consult");
    } catch (error) {
      console.error(error);
      setError(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-gradient-to-br from-gray-50 via-white to-green-50 py-8 px-2">
      <div className="w-full max-w-md bg-white border border-gray-200 shadow-xl rounded-2xl p-8 sm:p-10 flex flex-col gap-6">
        <h2 className="text-3xl font-spacegroteskbold text-center text-gray-900 mb-2">Sign In</h2>
        <p className="text-center text-gray-500 font-spacegroteskregular mb-2">Welcome back! Please enter your credentials to continue.</p>
        <form className="flex flex-col gap-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-2 text-center font-spacegroteskregular text-sm mb-2">{error}</div>
          )}
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-gray-700 text-sm font-spacegroteskmedium mb-1">Email</label>
            <input
              className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-gray-900 font-spacegroteskregular focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-500 transition-all placeholder:text-gray-400"
              id="email"
              type="email"
              placeholder="example@example.com"
              autoComplete="email"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-gray-700 text-sm font-spacegroteskmedium mb-1">Password</label>
            <input
              className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-gray-900 font-spacegroteskregular focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-500 transition-all placeholder:text-gray-400"
              id="password"
              type="password"
              placeholder="Enter your password"
              autoComplete="current-password"
            />
          </div>
          <button
            className={`w-full mt-2 py-2.5 rounded-lg font-spacegroteskmedium text-white shadow-md transition-all flex items-center justify-center text-base ${loading ? "bg-green-300 cursor-not-allowed" : "bg-green-600 hover:bg-green-700 active:scale-[.98]"}`}
            type="submit"
            onClick={handleSignin}
            disabled={loading}
          >
            {loading ? <ClipLoader size={22} color="#fff" /> : "Sign In"}
          </button>
          <div className="text-center text-sm text-gray-600 font-spacegroteskregular mt-2">
            Not registered?{' '}
            <Link to="/signup" className="text-green-600 hover:underline font-spacegroteskmedium">Sign up</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signin;
