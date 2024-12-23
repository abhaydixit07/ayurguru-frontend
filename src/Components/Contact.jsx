import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import EarthCanvas from "./canvas/Earth";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../lib/motion";

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
    e.preventDefault(); // Prevent default form submission behavior

    // Check if any field is empty
    if (!form.name || !form.email || !form.message) {
      alert("Please fill in all fields.");
      return;
    }

    setLoading(true); // Start loading state
    console.log(import.meta.env.VITE_AUTH_MESSAGE,`${import.meta.env.VITE_BACKEND_URL}/api/contact/submit`)
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
      setLoading(false); // Stop loading state
    }
  };

  return (
    <div
      className={`xl:mt-12 flex xl:flex-row flex-col-reverse bg-white gap-10 overflow-hidden`}
    >
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className='flex-[0.75] bg-gradient-to-r from-[#93FE51] to-[#A1E396] p-8 rounded-2xl'
      >
        <p className="sm:text-[18px] text-black text-[14px] font-spacegrotesksemibold text-secondary uppercase tracking-wider">Get in touch</p>
        <h3 className="text-black font-black md:text-[60px] sm:text-[50px] font-spacegroteskbold xs:text-[40px] text-[30px]">Contact.</h3>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className='mt-12 flex flex-col gap-8'
        >
          <label className='flex flex-col'>
            <span className='text-black font-spacegrotesksemibold mb-4'>Your Name</span>
            <input
              type='text'
              name='name'
              value={form.name}
              onChange={handleChange}
              placeholder="What's your good name?"
              className='bg-white py-4 px-6 placeholder:text-gray-500 text-black rounded-lg outline-none border-none font-spacegroteskmedium'
            />
          </label>
          <label className='flex flex-col'>
            <span className='text-black font-spacegrotesksemibold mb-4'>Your email</span>
            <input
              type='email'
              name='email'
              value={form.email}
              onChange={handleChange}
              placeholder="What's your web address?"
              className='bg-white py-4 px-6 placeholder:text-gray-500 font-spacegroteskmedium text-black rounded-lg outline-none border-none '
            />
          </label>
          <label className='flex flex-col'>
            <span className='text-black font-spacegrotesksemibold mb-4'>Your Message</span>
            <textarea
              rows={4}
              name='message'
              value={form.message}
              onChange={handleChange}
              placeholder='What you want to say?'
              className='bg-white py-4 px-6 placeholder:text-gray-500 font-spacegroteskmedium text-black rounded-lg outline-none border-none'
            />
          </label>

          <button
            type='submit'
            className='bg-gradient-to-br lg:ml-0 from-green-600 to-emerald-400 py-3 px-8 rounded-xl outline-none w-fit font-spacegrotesksemibold text-white shadow-md shadow-primary'
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className='xl:flex-1 xl:h-auto md:h-[450px] h-[300px]'
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");