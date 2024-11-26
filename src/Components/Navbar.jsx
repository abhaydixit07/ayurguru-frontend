import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Track the current route

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLogged(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setIsLogged(false);
    navigate("/");
  };

  // Helper function to check if a route is active
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white w-full z-20 top-0 start-0 mb-5">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center justify-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src="https://png.pngtree.com/png-vector/20230918/ourmid/pngtree-wooden-mortar-illustration-png-image_10118702.png"
            className="sm:h-20 h-14"
            alt="Logo"
          />
          <span className="self-center lg:block md:block hidden sm:text-2xl font-spacegrotesksemibold whitespace-nowrap">
            AyurGuru
          </span>
        </Link>

        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="navbar-sticky"
            aria-expanded="false"
            onClick={toggleMenu}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>

          {/* Desktop Buttons */}
          <div className="hidden md:flex space-x-4">
            {isLogged ? (
              <>
                <Link
                  to="/consult"
                  className={`inline-flex items-center px-4 py-2 text-sm font-spacegroteskmedium text-white rounded-lg ${
                    isActive("/consult")
                      ? "bg-blue-800"
                      : "bg-blue-700 hover:bg-blue-800"
                  }`}
                >
                  Consult
                </Link>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center px-4 py-2 text-sm font-spacegroteskmedium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-white"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/signup">
                <button
                  type="button"
                  className="rounded-xl bg-gradient-to-br from-green-600 to-emerald-400 font-dm sm:text-lg h-12 px-3 py-1.5 font-spacegroteskmedium text-white shadow-md shadow-green-400/50 transition-transform duration-200 ease-in-out hover:scale-[1.03] text-center sm:w-28"
                >
                  Signup
                </button>
              </Link>
            )}
          </div>
        </div>

        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } items-center justify-between w-full md:flex md:w-auto md:order-1`}
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
            <li>
              <Link
                to="/"
                className={`block text-xl py-2 px-3 font-spacegroteskregular rounded ${
                  isActive("/")
                    ? "text-emerald-500"
                    : "text-gray-900 md:hover:text-emerald-400 hover:bg-gray-100 md:hover:bg-transparent"
                }`}
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
            <Link
                to="/blogs"
                className={`block text-xl py-2 px-3 font-spacegroteskregular rounded ${
                  isActive("/blogs")
                    ? "text-emerald-500"
                    : "text-gray-900 md:hover:text-emerald-400 hover:bg-gray-100 md:hover:bg-transparent"
                }`}
              >
                Blogs
              </Link>
             
            </li>
            <li>
            <Link
                to="/about"
                className={`block text-xl py-2 px-3 font-spacegroteskregular rounded ${
                  isActive("/about")
                    ? "text-emerald-500"
                    : "text-gray-900 md:hover:text-emerald-400 hover:bg-gray-100 md:hover:bg-transparent"
                }`}
              >
                About
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
