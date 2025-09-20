import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLogged(true);
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setIsLogged(false);
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`w-full z-50 transition-all duration-300 ${scrolled ? 'py-1' : 'py-2'
      }`}>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl min-w-3xl mx-auto relative">
          <div className={`${scrolled
            ? 'bg-white shadow-md border-gray-200/60'
            : 'bg-white shadow-md border-gray-200/40'
            } rounded-2xl border transition-all duration-300 px-4 py-2`}>
            <div className="flex items-center justify-between h-12">

              <Link to="/" className="flex items-center space-x-2 group">
                <div className="relative">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-105">
                    <img
                      src="https://png.pngtree.com/png-vector/20230918/ourmid/pngtree-wooden-mortar-illustration-png-image_10118702.png"
                      alt="AyurGuru Logo"
                      className="w-9 h-9 object-contain"
                    />
                  </div>
                </div>
                <div>
                  <span className="text-lg font-spacegrotesksemibold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                    AyurGuru
                  </span>
                </div>
              </Link>

              <div className="hidden md:flex items-center space-x-6">
                {[
                  { path: "/", label: "Home" },
                  { path: "/blogs", label: "Blogs" },
                  { path: "/about", label: "About" }
                ].map(({ path, label }) => (
                  <Link
                    key={path}
                    to={path}
                    className={`relative font-spacegroteskmedium transition-all duration-300 py-1 px-1 text-sm ${isActive(path)
                      ? "text-green-600"
                      : "text-gray-700 hover:text-green-600"
                      } group`}
                  >
                    {label}
                    <span className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-green-600 to-emerald-500 transition-all duration-300 ${isActive(path) ? "w-full" : "w-0 group-hover:w-full"
                      }`}></span>
                  </Link>
                ))}
              </div>

              <div className="hidden md:flex items-center space-x-2">
                {isLogged ? (
                  <>
                    <Link
                      to="/consult"
                      className="relative px-3 py-1.5 text-sm font-medium text-green-700 hover:text-green-800 transition-all duration-300 rounded-lg hover:bg-green-50 group"
                    >
                      <span className="relative z-10">Consult</span>
                      <div className="absolute inset-0 bg-green-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="relative px-3 py-1.5 bg-gradient-to-r from-red-600 to-red-500 text-white text-sm font-medium rounded-lg hover:from-red-700 hover:to-red-600 transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105 active:scale-95"
                    >
                      <span className="relative z-10">Logout</span>
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/signin"
                      className="px-3 py-1.5 text-sm font-spacegroteskmedium text-gray-700 hover:text-gray-900 transition-all duration-300 rounded-lg hover:bg-gray-50"
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      className="relative px-4 py-1.5 bg-gradient-to-r from-gray-900 to-gray-800 text-white text-sm font-spacegroteskmedium rounded-lg hover:from-gray-800 hover:to-gray-700 transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105 active:scale-95 overflow-hidden group"
                    >
                      <span className="relative z-10">Sign Up</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </Link>
                  </>
                )}
              </div>

              <button
                onClick={toggleMenu}
                className="md:hidden relative p-2.5 text-gray-700 hover:text-gray-900 transition-all duration-300 rounded-xl hover:bg-gray-50 group"
              >
                <div className="w-6 h-6 relative flex items-center justify-center">
                  <span className={`absolute block h-0.5 w-6 bg-current transition-all duration-300 ${isMenuOpen ? 'rotate-45 w-5' : '-rotate-0 -translate-y-2'
                    }`}></span>
                  <span className={`absolute block h-0.5 w-6 bg-current transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''
                    }`}></span>
                  <span className={`absolute block h-0.5 w-6 bg-current transition-all duration-300 ${isMenuOpen ? '-rotate-45' : 'rotate-0 translate-y-2'
                    }`}></span>
                </div>
              </button>
            </div>

            <div className={`md:hidden absolute top-full left-0 right-0 mt-2 z-50 transition-all duration-300 ease-in-out ${isMenuOpen
              ? 'opacity-100 visible translate-y-0'
              : 'opacity-0 invisible -translate-y-2'
              }`}>
              <div className="bg-white rounded-2xl border border-gray-200 shadow-lg mx-4 overflow-hidden">
                <div className="flex flex-col">
                  {[
                    { path: "/", label: "Home" },
                    { path: "/blogs", label: "Blogs" },
                    { path: "/about", label: "About" }
                  ].map(({ path, label }) => (
                    <Link
                      key={path}
                      to={path}
                      className={`relative font-medium transition-all duration-300 py-3 px-4 ${isActive(path)
                        ? "text-green-600 bg-green-50"
                        : "text-gray-700 hover:text-green-600 hover:bg-green-50"
                        } group`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {label}
                    </Link>
                  ))}

                  {isLogged ? (
                    <>
                      <Link
                        to="/consult"
                        className={`relative font-medium transition-all duration-300 py-3 px-4 ${isActive("/consult")
                          ? "text-green-600 bg-green-50"
                          : "text-gray-700 hover:text-green-600 hover:bg-green-50"
                          } group`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Consult
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsMenuOpen(false);
                        }}
                        className="relative font-medium transition-all duration-300 py-3 px-4 text-red-600 hover:text-red-700 hover:bg-red-50 text-left"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/signin"
                        className={`relative font-medium transition-all duration-300 py-3 px-4 ${isActive("/signin")
                          ? "text-green-600 bg-green-50"
                          : "text-gray-700 hover:text-green-600 hover:bg-green-50"
                          } group`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Login
                      </Link>
                      <Link
                        to="/signup"
                        className={`relative font-medium transition-all duration-300 py-3 px-4 ${isActive("/signup")
                          ? "text-green-600 bg-green-50"
                          : "text-gray-700 hover:text-green-600 hover:bg-green-50"
                          } group`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Sign Up
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}