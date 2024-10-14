import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Herbs from "../assets/Group 15105.png";
import YT from "../assets/Group 15107.png";
import divpic1 from "../assets/divpic1.png";
import Contact from "../Components/Contact";

function App() {
  const [isLogged, setIsLogged] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLogged(true);
    }
  }, []);
  return (
    <div>
      <div className="flex items-center justify-center">
        <div className="w-[90%] flex items-center justify-center">
          <div className="sm:mx-10">
            <div className="lg:text-6xl md:text-4xl text-3xl font-spacegrotesksemibold lg:text-left md:text-left text-center">
              Unlock the Power of Ancient{" "}
              <span className="text-[#39DB4A]">Ayurvedic</span> Wisdom
              {/* with Our ChatBot */}
            </div>
            <div className="mt-4 font-spacegroteskregular lg:text-xl md:text-xl text-lg lg:text-left md:text-left text-center">
              "Discover Balance, Wellness, and Harmony with Ayurveda: <br />
              Your Journey to Holistic Health Begins Here."
            </div>
            <div className="flex lg:justify-start items-center justify-center">
              <div className="flex lg:flex-row md:flex-row flex-col mt-8 lg:gap-8 md:gap-8 gap-4 w-[80%] cursor-pointer">
                {isLogged ? (
                  <Link
                    to="/consult"
                    className="rounded-xl flex items-center justify-center w-full bg-gradient-to-br from-green-600 to-emerald-400 font-dm text-lg h-14 px-3 font-medium text-white shadow-md shadow-green-400/50 transition-transform duration-200 ease-in-out hover:scale-[1.03] text-center"
                  >
                    Get Started
                  </Link>
                ) : (
                  <Link
                    to="/signup"
                    className="rounded-xl flex items-center justify-center w-full bg-gradient-to-br from-green-600 to-emerald-400 font-dm text-lg h-14 px-3 font-spacegroteskmedium text-white shadow-md shadow-green-400/50 transition-transform duration-200 ease-in-out hover:scale-[1.03] text-center"
                  >
                    Get Started
                  </Link>
                )}
                <div className="rounded-xl flex items-center justify-center h-14 bg-gradient-to-br w-full cursor-pointer from-[#A1E396] px-3 text-lg font-spacegroteskmedium shadow-md shadow-green-400/50 transition-transform duration-200 ease-in-out hover:scale-[1.03] text-center">
                  <div href="#">Demo</div>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:block md:block hidden">
            <img src={Herbs} alt="Ayurvedic Herbs" className="w-[1100px]" />
          </div>
        </div>
      </div>

      {/* <div>
        <div className='grid grid-cols-3 gap-10'>
            <div className='rounded-xl bg-[#A1E396] text-7xl'>
                TAILORED RECOMMENDATIONS
            </div>
            <div>
                <img src={Chat} alt='chat with the bot' className='rounded-xl'/>

            </div>
            <div className='rounded-xl bg-[#A1E396] text-7xl'>
                Continous Learning
            </div>

            <div className='rounded-xl bg-[#A1E396] text-7xl'>
                Deep-rooted in Authentic Texts
            </div>

        </div>
    </div> */}
      <div className="lg:mt-32 md:mt-32 mt-48">
        <div className="sm:rounded-xl flex lg:flex-row md:flex-row flex-col items-center justify-center gap-20 bg-gradient-to-r from-[#93FE51] to-[#A1E396] lg:m-10 lg:p-10 md:m-4 md:p-4">
          <div className="lg:w-[50%] md:w-[50%] flex flex-col gap-8 p-10 lg:p-0 md:p-0 text-center lg:text-left md:text-left">
            <div className="text-2xl md:text-3xl lg:text-3xl font-spacegrotesksemibold lg:m-10 lg:ml-0 md:m-4 ml-0">
              Take a Guided Tour of Our Innovative Software
            </div>
            <div className="sm:text-xl font-spacegroteskregular">
              Explore Our Knowledge Hub: Dive deeper into the world of Ayurveda
              and our software with our collection of informative documents and
              resources. Whether you're a seasoned Ayurvedic practitioner or
              just beginning your wellness journey, our curated materials
              provide valuable insights, tips, and guidance.
            </div>
            <div className="lg:hidden md:hidden flex items-center justify-center">
              {/* <img src={YT} alt="YT" /> */}
              <iframe
                width="200"
                height="200"
                src="https://www.youtube.com/embed/TCGh0IcYf3g"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
            <div className="flex lg:items-start lg:justify-start md:items-start md:justify-start items-center justify-center">
              <div
                href="#"
                className="w-[200px] cursor-pointer rounded-2xl bg-gradient-to-br lg:ml-0 from-green-600 to-emerald-400 font-spacegrotesksemibold text-lg h-12 py-2 font-medium text-white shadow-md shadow-green-400/50 transition-transform duration-200 ease-in-out hover:scale-[1.03] text-center lg:m-10 md:m-4"
              >
                Read Docs
              </div>
            </div>
          </div>
          <div className="lg:flex md:flex md:flex-col lg:justify-center md:justify-center hidden">
            {/* <img src={YT} alt="YT" /> */}
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/TCGh0IcYf3g"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
        </div>
      </div>
      <div className="mt-32">
        <div className="font-spacegrotesksemibold lg:text-4xl md:text-3xl text-2xl text-center">
          Ayurvedic Insights
        </div>
        <div className="flex flex-wrap p-4 items-center justify-center gap-10 lg:mt-10 md:mt-8 mt-8">
          <div class="max-w-sm border border-gray-200 rounded-lg bg-gradient-to-br from-[#A1E396] shadow-lg shadow-green-400/50">
            <a href="#">
              <img class="rounded-t-lg" src={divpic1} alt="" />
            </a>
            <div class="p-5">
              <a href="#">
                <h5 class="mb-2 text-xl font-spacegrotesksemibold">
                  The Ultimate Guide to Bookstagram for Beginners
                </h5>
              </a>
              <p class="mb-3 font-spacegroteskregular">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                quis ante sit amet tellus ornare tincidunt.
              </p>
              <a
                href="#"
                class="inline-flex items-center px-3 py-2 text-sm text-center bg-gradient-to-br from-green-600 to-emerald-400 font-spacegrotesksemibold text-white rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300"
              >
                Read more
                <svg
                  class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </a>
            </div>
          </div>
          <div class="max-w-sm border border-gray-200 rounded-lg bg-gradient-to-br from-[#A1E396] shadow-lg shadow-green-400/50">
            <a href="#">
              <img class="rounded-t-lg" src={divpic1} alt="" />
            </a>
            <div class="p-5">
              <a href="#">
                <h5 class="mb-2 text-xl font-spacegrotesksemibold">
                  The Ultimate Guide to Bookstagram for Beginners
                </h5>
              </a>
              <p class="mb-3 font-spacegroteskregular">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                quis ante sit amet tellus ornare tincidunt.
              </p>
              <a
                href="#"
                class="inline-flex items-center px-3 py-2 text-sm text-center bg-gradient-to-br from-green-600 to-emerald-400 font-spacegrotesksemibold text-white rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300"
              >
                Read more
                <svg
                  class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </a>
            </div>
          </div>
          <div class="max-w-sm border border-gray-200 rounded-lg bg-gradient-to-br from-[#A1E396] shadow-lg shadow-green-400/50">
            <a href="#">
              <img class="rounded-t-lg" src={divpic1} alt="" />
            </a>
            <div class="p-5">
              <a href="#">
                <h5 class="mb-2 text-xl font-spacegrotesksemibold">
                  The Ultimate Guide to Bookstagram for Beginners
                </h5>
              </a>
              <p class="mb-3 font-spacegroteskregular">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                quis ante sit amet tellus ornare tincidunt.
              </p>
              <a
                href="#"
                class="inline-flex items-center px-3 py-2 text-sm text-center bg-gradient-to-br from-green-600 to-emerald-400 font-spacegrotesksemibold text-white rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300"
              >
                Read more
                <svg
                  class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </a>
            </div>
          </div>
          <div class="max-w-sm border border-gray-200 rounded-lg bg-gradient-to-br from-[#A1E396] shadow-lg shadow-green-400/50">
            <a href="#">
              <img class="rounded-t-lg" src={divpic1} alt="" />
            </a>
            <div class="p-5">
              <a href="#">
                <h5 class="mb-2 text-xl font-spacegrotesksemibold">
                  The Ultimate Guide to Bookstagram for Beginners
                </h5>
              </a>
              <p class="mb-3 font-spacegroteskregular">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                quis ante sit amet tellus ornare tincidunt.
              </p>
              <a
                href="#"
                class="inline-flex items-center px-3 py-2 text-sm text-center bg-gradient-to-br from-green-600 to-emerald-400 font-spacegrotesksemibold text-white rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300"
              >
                Read more
                <svg
                  class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </a>
            </div>
          </div>

          <div class="max-w-sm border border-gray-200 rounded-lg bg-gradient-to-br from-[#A1E396] shadow-lg shadow-green-400/50">
            <a href="#">
              <img class="rounded-t-lg" src={divpic1} alt="" />
            </a>
            <div class="p-5">
              <a href="#">
                <h5 class="mb-2 text-xl font-spacegrotesksemibold">
                  The Ultimate Guide to Bookstagram for Beginners
                </h5>
              </a>
              <p class="mb-3 font-spacegroteskregular">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                quis ante sit amet tellus ornare tincidunt.
              </p>
              <a
                href="#"
                class="inline-flex items-center px-3 py-2 text-sm text-center bg-gradient-to-br from-green-600 to-emerald-400 font-spacegrotesksemibold text-white rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300"
              >
                Read more
                <svg
                  class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </a>
            </div>
          </div>

          <div class="max-w-sm border border-gray-200 rounded-lg bg-gradient-to-br from-[#A1E396] shadow-lg shadow-green-400/50">
            <a href="#">
              <img class="rounded-t-lg" src={divpic1} alt="" />
            </a>
            <div class="p-5">
              <a href="#">
                <h5 class="mb-2 text-xl font-spacegrotesksemibold">
                  The Ultimate Guide to Bookstagram for Beginners
                </h5>
              </a>
              <p class="mb-3 font-spacegroteskregular">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                quis ante sit amet tellus ornare tincidunt.
              </p>
              <a
                href="#"
                class="inline-flex items-center px-3 py-2 text-sm text-center bg-gradient-to-br from-green-600 to-emerald-400 font-spacegrotesksemibold text-white rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300"
              >
                Read more
                <svg
                  class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
      <Contact />

      {/* <div className="mt-20">
        <div className="container px-4 mx-auto">
          <div className="mx-auto">
            <div className="max-w-md mx-auto px-8 py-6 bg-gray-100 rounded-lg shadow-lg">
              <h2 className="text-2xl text-center lg:text-left md:text-left font-spacegrotesksemibold text-gray-800 mb-4">
                Contact Us
              </h2>
              <form>
                <div className="mb-4">
                  <label
                    className="block font-spacegroteskregular text-gray-800 mb-1"
                    htmlFor="name"
                  >
                    Your Name
                  </label>
                  <input
                    className="w-full px-4 py-2 font-spacegroteskregular bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300 transition duration-300"
                    placeholder="Enter your name"
                    type="text"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block font-spacegroteskregular text-gray-800 mb-1"
                    htmlFor="email"
                  >
                    Your Email
                  </label>
                  <input
                    className="w-full px-4 font-spacegroteskregular py-2 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300 transition duration-300"
                    placeholder="Enter your email"
                    name="email"
                    id="email"
                    type="email"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block font-spacegroteskregular text-gray-800 mb-1"
                    htmlFor="message"
                  >
                    Your Message
                  </label>
                  <textarea
                    className="w-full px-4 font-spacegroteskregular py-2 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300 transition duration-300"
                    rows={4}
                    placeholder="Enter your message"
                    name="message"
                    id="message"
                    defaultValue={""}
                  />
                </div>
                <button
                  className="w-full font-spacegroteskregular bg-[#39DB4A] text-gray-800 py-2 px-4 rounded-lg hover:bg-green-400 transition duration-300"
                  type="submit"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div> */}

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
                <a href="#" class="text-gray-800 hover:text-gray-900">
                  Home
                </a>
              </li>
              <li>
                <a href="#" class=" text-gray-800 hover:text-gray-900">
                  Products
                </a>
              </li>
              <li>
                <a href="#" class=" text-gray-800 hover:text-gray-900">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" class=" text-gray-800 hover:text-gray-900">
                  Blogs
                </a>
              </li>
            </ul>
            <span class="text-lg font-spacegroteskregular text-gray-500 text-center block">
              ©<a href="https://pagedone.io/">AyurGuru</a> 2024, All rights
              reserved.
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
