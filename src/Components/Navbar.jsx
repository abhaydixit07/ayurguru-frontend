export default function Nav() {
    // const [count, setCount] = useState(0)
  
    return (
      <>
        <div className="px-4 mx-auto max-w-7xl sm:px-6">
          <div className="relative pt-6 pb-16 sm:pb-24">
            <nav
              className="relative flex items-center justify-between sm:h-10 md:justify-center"
              aria-label="Global"
            >
              <div className="flex items-center flex-1 md:absolute md:inset-y-0 md:left-0">
                <div className="flex items-center justify-between w-full md:w-auto">
                  <a href="#">
                    <span className="sr-only">Company Name</span>
                    <img
                      className="h-20"
                      src="https://png.pngtree.com/png-vector/20230918/ourmid/pngtree-wooden-mortar-illustration-png-image_10118702.png"
                      loading="lazy"
                      // width={202}
                      // height={40}
                    />
                  </a>
                  <div className="flex items-center -mr-2 md:hidden">
                    <button
                      className="inline-flex items-center justify-center p-2 text-gray-400 bg-gray-50 rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-50"
                      type="button"
                      aria-expanded="false"
                    >
                      <span className="sr-only">Open main menu</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        aria-hidden="true"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4 6h16M4 12h16M4 18h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <div className="hidden md:flex md:space-x-10 list-none font-bold">
                <li>
                  <a
                    href="#"
                    className="text-base font-semibold text-gray-500 list-none hover:text-gray-900"
                    target=""
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="/consult"
                    className="text-base font-semibold text-gray-500 list-none hover:text-gray-900"
                    target=""
                  >
                    Consult
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-base font-semibold text-gray-500 list-none hover:text-gray-900"
                    target="_blank"
                  >
                    Blogs
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-base font-semibold text-gray-500 list-none hover:text-gray-900"
                    target="_blank"
                  >
                    Shop
                  </a>
                </li>
                <li>
                  <a
                    href="/about"
                    className="text-base font-semibold text-gray-500 list-none hover:text-gray-900"
                    target="_blank"
                  >
                    About Us
                  </a>
                </li>
              </div>
              <div className="hidden md:absolute md:flex md:items-center md:justify-end md:inset-y-0 md:right-0">
                <div className="inline-flex rounded-full shadow">
                  <div
                    href="#"
                    className="rounded-xl bg-gradient-to-br from-green-600 to-emerald-400 px-3 py-1.5 font-dm text-sm font-medium text-white shadow-md shadow-green-400/50 transition-transform duration-200 ease-in-out hover:scale-[1.03] text-center w-28"
                  >
                    Login
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </div>

      </>
    )
  }