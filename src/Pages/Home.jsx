import { useEffect, useState } from "react";
import "../App.css";
import Contact from "../Components/Contact";
import FeatureSection from "../Components/FeatureSection";
import Nav from "../Components/Navbar";

function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.npoint.io/b1bbae5a8e2b1ea80f69")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch blogs");
        }
        return response.json();
      })
      .then((data) => {
        const shuffledBlogs = [...data].sort(() => Math.random() - 0.5);
        setBlogs(shuffledBlogs.slice(0, 3));
      })
      .catch((error) => console.error("Error fetching blogs:", error))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLogged(true);
    }
  }, []);

  return (
    <div>
      <div>
        <Nav />
        <div className="overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-96 h-96 bg-gradient-to-r from-green-200 via-emerald-200 to-teal-200 rounded-full opacity-40 blur-3xl animate-floating" />
          </div>
          <div className="flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 pb-8 md:pb-16 lg:pb-20 relative z-10">
            <div className="max-w-7xl mx-auto w-full">
              <div className="text-center mb-8">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/70 backdrop-blur-sm border border-green-200 text-sm font-spacegroteskmedium text-green-700 shadow-sm">
                  <span className="">🌿</span>
                  Trusted by wellness seekers worldwide
                  <span className="">🌿</span>
                </div>
              </div>

              <div className="text-center mb-16">
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-spacegrotesksemibold text-gray-900 leading-tight mb-6">
                  Unlock the Power of{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">
                    Ancient Wisdom
                  </span>
                </h1>

                <p className="text-lg sm:text-xl lg:text-3xl font-spacegroteskregular text-gray-600 max-w-4xl mx-auto mb-10 leading-relaxed">
                  Your AI-Powered Ayurvedic Consultant<br className="block" />
                  Get instant, personalized wellness guidance powered by thousands of years of Ayurvedic wisdom.
                </p>

                <div className="mb-10 animate-fade-in-up delay-400">
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
                    <button
                      onClick={() => (window.location.href = isLogged ? "/consult" : "/consult")}
                      className="group relative w-full sm:w-auto px-8 py-3 bg-gray-900 text-white font-medium text-base rounded-lg hover:bg-gray-800 transition-all duration-200 shadow-lg hover:shadow-xl overflow-hidden"
                    >
                      <span className="relative z-10 flex items-center justify-center">
                        Get Started
                        <svg
                          className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-0.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </span>
                    </button>

                    <button
                      onClick={() => (window.location.href = "/about")}
                      className="group w-full sm:w-auto px-8 py-3 bg-white text-gray-700 font-medium text-base rounded-lg hover:bg-gray-50 transition-all duration-200 border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md"
                    >
                      <span className="flex items-center justify-center">
                        Learn More
                        <svg
                          className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-0.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden bg-gradient-to-r from-green-600 via-emerald-500 to-green-600 py-2">
        <div className="flex animate-scroll">
          <div className="flex items-center whitespace-nowrap text-sm md:text-lg">
            <span className="text-white font-spacegrotesksemibold mx-8">
              🌿 AyurGuru - Ancient Wisdom, Modern Solutions
            </span>
            <span className="text-white font-spacegrotesksemibold mx-8">
              ✨ Discover Your Path to Wellness
            </span>
            <span className="text-white font-spacegrotesksemibold mx-8">
              🍃 Personalized Ayurvedic Consultations
            </span>
            <span className="text-white font-spacegrotesksemibold mx-8">
              💚 Trusted by alot of Happy Users
            </span>
            <span className="text-white font-spacegrotesksemibold mx-8">
              🌱 Natural Healing for Mind, Body & Soul
            </span>
            <span className="text-white font-spacegrotesksemibold mx-8">
              ⭐ Experience the Power of Ayurveda
            </span>
          </div>
          <div className="flex items-center whitespace-nowrap text-sm md:text-lg">
            <span className="text-white font-spacegrotesksemibold mx-8">
              🌿 AyurGuru - Ancient Wisdom, Modern Solutions
            </span>
            <span className="text-white font-spacegrotesksemibold mx-8">
              ✨ Discover Your Path to Wellness
            </span>
            <span className="text-white font-spacegrotesksemibold mx-8">
              🍃 Personalized Ayurvedic Consultations
            </span>
            <span className="text-white font-spacegrotesksemibold mx-8">
              💚 Trusted by alot of Happy Users
            </span>
            <span className="text-white font-spacegrotesksemibold mx-8">
              🌱 Natural Healing for Mind, Body & Soul
            </span>
            <span className="text-white font-spacegrotesksemibold mx-8">
              ⭐ Experience the Power of Ayurveda
            </span>
          </div>
        </div>

        <div className="absolute left-0 top-0 bottom-0 w-3 md:w-20 bg-gradient-to-r from-green-50 via-green-50/80 to-transparent pointer-events-none z-10"></div>

        <div className="absolute right-0 top-0 bottom-0 w-3 md:w-20 bg-gradient-to-l from-green-50 via-green-50/80 to-transparent pointer-events-none z-10"></div>
      </div>

      <div className="text-2xl md:text-3xl lg:text-5xl mt-20 font-spacegrotesksemibold text-center text-green-700 flex flex-col justify-items-center">
        <p>Features our Platform Offers</p>
      </div>
      <FeatureSection />
      <Contact />
    </div>
  );
}

export default App;
