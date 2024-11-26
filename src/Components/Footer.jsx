import React from 'react'

const Footer = () => {
  return (
    <footer class="w-full mt-32 py-14 bg-slate-200">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center ">
          <div className="flex items-center justify-center">
            <img
              src="https://png.pngtree.com/png-vector/20230918/ourmid/pngtree-wooden-mortar-illustration-png-image_10118702.png"
              className="h-24"
              alt="Logo"
            />
            <p className="font-spacegrotesksemibold text-2xl">AyurGuru</p>
          </div>
          <div class="max-w-3xl mx-auto">
            <ul class="text-lg flex items-center justify-center font-spacegroteskregular flex-col gap-7 md:flex-row md:gap-12 transition-all duration-500 py-16 border-b border-gray-200">
              <li>
                <a href="/" class="text-gray-800 hover:text-gray-900">
                  Home
                </a>
              </li>
              <li>
                <a href="/consult" class=" text-gray-800 hover:text-gray-900">
                  Consult
                </a>
              </li>
              <li>
                <a href="/about" class=" text-gray-800 hover:text-gray-900">
                  About
                </a>
              </li>
              <li>
                <a href="/blogs" class=" text-gray-800 hover:text-gray-900">
                  Blogs
                </a>
              </li>
            </ul>
            <span class="text-lg font-spacegroteskregular text-gray-500 text-center block">
              ©<a href="/">AyurGuru</a> {new Date().getFullYear()}, All rights
              reserved.
            </span>
          </div>
        </div>
      </footer>
  )
}

export default Footer