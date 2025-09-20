import { useRef, useState } from "react";
import { motion } from "framer-motion";
import EarthCanvas from "./canvas/Earth";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../lib/motion";

const noAnimation = {
  hidden: { opacity: 1 },
  show: { opacity: 1 },
};

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      alert("Please fill in all fields.");
      return;
    }

    setLoading(true);
    console.log(import.meta.env.VITE_AUTH_MESSAGE, `${import.meta.env.VITE_BACKEND_URL}/api/contact/submit`)
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/contact/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": import.meta.env.VITE_AUTH_MESSAGE,
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        alert('Submitted');
        setForm({
          name: "",
          email: "",
          message: "",
        });
      } else {
        console.error("Error submitting the form:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12 sm:py-16 md:py-1">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-spacegrotesksemibold text-green-700 mb-4">
            Get In Touch With Us!
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 font-spacegroteskregular max-w-2xl mx-auto">
            Ready to start your wellness journey? We're here to guide you every step of the way.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-start lg:items-center">
          <div className="relative order-2 lg:order-1 block md:hidden">
            <div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl">
              <div className="mb-6 sm:mb-8">
                <h3 className="text-2xl sm:text-3xl font-spacegrotesksemibold text-gray-900 mb-2">
                  Start Your Journey
                </h3>
                <p className="text-gray-600 font-spacegroteskregular text-sm sm:text-base">
                  Share your wellness goals and let our experts create a personalized Ayurvedic plan for you.
                </p>
              </div>

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <label className="block text-sm font-spacegroteskmedium text-gray-700 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="What's your good name?"
                      className="w-full bg-white border border-gray-200 rounded-xl py-3 sm:py-4 px-4 sm:px-6 text-gray-900 placeholder-gray-500 font-spacegroteskregular focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-spacegroteskmedium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      className="w-full bg-white border border-gray-200 rounded-xl py-3 sm:py-4 px-4 sm:px-6 text-gray-900 placeholder-gray-500 font-spacegroteskregular focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-spacegroteskmedium text-gray-700 mb-2">
                      Your Message
                    </label>
                    <textarea
                      rows={4}
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us about your wellness goals and how we can help you..."
                      className="w-full bg-white border border-gray-200 rounded-xl py-3 sm:py-4 px-4 sm:px-6 text-gray-900 placeholder-gray-500 font-spacegroteskregular focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 resize-none text-sm sm:text-base"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-spacegroteskmedium py-3 sm:py-4 px-6 sm:px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-sm sm:text-base"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-4 w-4 sm:h-5 sm:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending Message...
                    </span>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </form>
            </div>
          </div>

          <motion.div
            variants={slideIn("left", "tween", 0.2, 1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="relative order-2 lg:order-1 hidden md:block"
          >
            <div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl">
              <div className="mb-6 sm:mb-8">
                <h3 className="text-2xl sm:text-3xl font-spacegrotesksemibold text-gray-900 mb-2">
                  Start Your Journey
                </h3>
                <p className="text-gray-600 font-spacegroteskregular text-sm sm:text-base">
                  Share your wellness goals and let our experts create a personalized Ayurvedic plan for you.
                </p>
              </div>

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <label className="block text-sm font-spacegroteskmedium text-gray-700 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="What's your good name?"
                      className="w-full bg-white border border-gray-200 rounded-xl py-3 sm:py-4 px-4 sm:px-6 text-gray-900 placeholder-gray-500 font-spacegroteskregular focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-spacegroteskmedium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      className="w-full bg-white border border-gray-200 rounded-xl py-3 sm:py-4 px-4 sm:px-6 text-gray-900 placeholder-gray-500 font-spacegroteskregular focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-spacegroteskmedium text-gray-700 mb-2">
                      Your Message
                    </label>
                    <textarea
                      rows={4}
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us about your wellness goals and how we can help you..."
                      className="w-full bg-white border border-gray-200 rounded-xl py-3 sm:py-4 px-4 sm:px-6 text-gray-900 placeholder-gray-500 font-spacegroteskregular focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 resize-none text-sm sm:text-base"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-spacegroteskmedium py-3 sm:py-4 px-6 sm:px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-sm sm:text-base"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-4 w-4 sm:h-5 sm:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending Message...
                    </span>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </form>
            </div>
          </motion.div>

          <div className="relative order-1 lg:order-2 block md:hidden">
            <div className="relative bg-gradient-to-br from-green-900/20 to-emerald-900/20 backdrop-blur-sm border border-white/20 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-emerald-50/30"></div>

              <div className="relative z-10 h-[300px] sm:h-[400px] md:h-[450px] lg:h-[500px] xl:h-[600px]">
                <EarthCanvas />
              </div>

              <div className="absolute bottom-4 sm:bottom-6 lg:bottom-8 left-4 sm:left-6 lg:left-8 right-4 sm:right-6 lg:right-8 z-20">
                <div className="bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/30">
                  <h4 className="text-base sm:text-lg font-spacegrotesksemibold text-gray-900 mb-1 sm:mb-2">
                    Global Wellness Community
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600 font-spacegroteskregular">
                    Join thousands of people worldwide who have transformed their lives through Ayurveda
                  </p>
                </div>
              </div>
            </div>
          </div>

          <motion.div
            variants={slideIn("right", "tween", 0.2, 1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="relative order-1 lg:order-2 hidden md:block"
          >
            <div className="relative bg-gradient-to-br from-green-900/20 to-emerald-900/20 backdrop-blur-sm border border-white/20 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-emerald-50/30"></div>

              <div className="relative z-10 h-[300px] sm:h-[400px] md:h-[450px] lg:h-[500px] xl:h-[600px]">
                <EarthCanvas />
              </div>

              <div className="absolute bottom-4 sm:bottom-6 lg:bottom-8 left-4 sm:left-6 lg:left-8 right-4 sm:right-6 lg:right-8 z-20">
                <div className="bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/30">
                  <h4 className="text-base sm:text-lg font-spacegrotesksemibold text-gray-900 mb-1 sm:mb-2">
                    Global Wellness Community
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600 font-spacegroteskregular">
                    Join thousands of people worldwide who have transformed their lives through Ayurveda
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");