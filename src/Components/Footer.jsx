const Footer = () => {
  return (
    <footer className="w-full border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-6 sm:py-8 space-y-4 sm:space-y-0">
          <div className="flex items-center justify-center sm:justify-start">
            <img
              src="https://png.pngtree.com/png-vector/20230918/ourmid/pngtree-wooden-mortar-illustration-png-image_10118702.png"
              className="h-6 w-6 sm:h-8 sm:w-8 mr-2 sm:mr-3"
              alt="AyurGuru Logo"
            />
            <span className="font-spacegrotesksemibold text-lg sm:text-xl text-gray-900">
              AyurGuru
            </span>
          </div>

          <nav className="flex flex-wrap justify-center sm:justify-end gap-4 sm:gap-6 lg:gap-8">
            <a
              href="/"
              className="font-spacegroteskregular text-sm sm:text-base text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              Home
            </a>
            <a
              href="/blogs"
              className="font-spacegroteskregular text-sm sm:text-base text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              Blogs
            </a>
            <a
              href="/about"
              className="font-spacegroteskregular text-sm sm:text-base text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              About
            </a>
          </nav>

          <div className="text-xs sm:text-sm font-spacegroteskregular text-gray-500 text-center sm:text-left">
            © {new Date().getFullYear()} AyurGuru
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer