import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners"; // Import the ClipLoader
import Herbs from "../assets/Group 15105.png";
import YT from "../assets/Group 15107.png";
import BlogCard from "../Components/BlogCard";
import Contact from "../Components/Contact";

function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true); // Loader state

  useEffect(() => {
    // Fetch the blogs from the API
    fetch("https://api.npoint.io/b1bbae5a8e2b1ea80f69")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch blogs");
        }
        return response.json();
      })
      .then((data) => {
        // Shuffle blogs and pick the first 6
        const shuffledBlogs = [...data].sort(() => Math.random() - 0.5);
        setBlogs(shuffledBlogs.slice(0, 3));
      })
      .catch((error) => console.error("Error fetching blogs:", error))
      .finally(() => setLoading(false)); // Hide loader after fetching
  }, []); // Empty dependency array ensures it runs only once after mounting

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

      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-serif text-center text-green-700 mb-8">
          Ayurveda Blogs
        </h1>
        {loading ? (
          <div className="flex justify-center items-center">
            {/* Clip Loader */}
            <ClipLoader color="#4CAF50" loading={loading} size={50} />
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
              <BlogCard
                key={blog.id}
                id={blog.id}
                title={blog.title}
                excerpt={blog.excerpt}
                author={blog.author}
                date={blog.publishedDate}
                img={blog.imageUrl}
              />
            ))}
          </div>
        )}
        {!loading && (
          <div className="text-center mt-8">
            <button
              onClick={() => (window.location.href = "/blogs")}
              className="px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800"
            >
              Read More
            </button>
          </div>
        )}
      </div>
      <Contact />
    </div>
  );
}

export default App;
