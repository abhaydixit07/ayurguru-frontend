import { useState } from 'react'
import Herbs from '../assets/Group 15105.png'
import Chat from '../assets/botchat.png';
import YT from '../assets/Group 15107.png';
import divpic1 from '../assets/divpic1.png'

function App() {

  return (
    <>
    {/* <Nav/> */}
    <div  className='grid md:grid-cols-2 sm:mx-20 mx-10 justify-between'>
        <div className='sm:mx-10'>
            <div className="sm:text-6xl text-3xl font-serif font-semibold ">
                Unlock the Power of Ancient <span className='text-[#39DB4A]'>Ayurvedic</span> Wisdom with Our ChatBot.
            </div>
            <div className='flex flex-col sm:flex-row justify-between md:justify-center md:gap-20 gap-10 mx-20 mt-10'>
                <div className="rounded-xl bg-gradient-to-br from-green-600 to-emerald-400 font-dm text-lg h-12 px-3 py-1.5 font-medium text-white shadow-md shadow-green-400/50 transition-transform duration-200 ease-in-out hover:scale-[1.03] text-center w-28">
                    <div
                        href="/consult"
                        // className="rounded-xl bg-gradient-to-br from-green-600 to-emerald-400 px-3 py-1.5 font-dm text-sm font-medium text-white shadow-md shadow-green-400/50 transition-transform duration-200 ease-in-out hover:scale-[1.03] text-center w-28"
                    >
                        Chat
                    </div>
                </div>
                <div className="rounded-xl bg-gradient-to-br from-[#A1E396]  px-3 py-1.5 font-dm text-lg font-medium  shadow-md shadow-green-400/50 transition-transform duration-200 ease-in-out hover:scale-[1.03] text-center w-28">
                    <div
                        href="#"
                        
                    >
                        Demo
                    </div>
                </div>
            </div>
            <div className='mt-10 font-serif text-lg'>
                "Discover Balance, Wellness, and Harmony with Ayurveda: Your Journey to Holistic Health Begins Here."
            </div>
        </div>

        <div>  
            <img src={Herbs} alt='Ayurvedic Herbs' className='w-[1000px]'/>
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
    <div className='sm:rounded-xl bg-gradient-to-r from-[#93FE51] to-[#A1E396] md:grid grid-cols-2 sm:m-10 my-10 p-10 sm:p-1 text-center'>
        <div className='sm:m-20'>
            <div className='sm:text-5xl text-3xl font-extrabold m-2 sm:m-10'>
                Take a Guided Tour of Our Innovative Software
            </div>
            <div className='sm:text-xl'>
            Explore Our Knowledge Hub: Dive deeper into the world of Ayurveda and our software with our collection of informative documents and resources. Whether you're a seasoned Ayurvedic practitioner or just beginning your wellness journey, our curated materials provide valuable insights, tips, and guidance.
            </div>
            <div className=" flex justify-center">
                    <div
                        href="#"
                        className='w-28 rounded-2xl bg-gradient-to-br from-[#39DB4A] font-dm text-lg h-12 px-3 py-2 font-medium text-white shadow-md shadow-green-400/50 transition-transform duration-200 ease-in-out hover:scale-[1.03] text-center m-5 sm:mt-20'
                        // className="rounded-xl bg-gradient-to-br from-green-600 to-emerald-400 px-3 py-1.5 font-dm text-sm font-medium text-white shadow-md shadow-green-400/50 transition-transform duration-200 ease-in-out hover:scale-[1.03] text-center w-28"
                    >
                        Read Docs
                    </div>
                </div>
        </div>

        <div className='flex justify-center'>
            <img src={YT} alt='YT' />
        </div>

        <div>

        </div>

    </div>


    <div>
        <div className='font-serif text-3xl sm:m-20 ml-5'>
            Ayurvdeic Insights
        </div>

        <div className='grid md:grid-cols-3 sm:m-20 gap-5 my-20'>
            <div className='flex justify-center'>
            <div className="w-80 p-4 bg-white rounded-[1.5em] shadow-md border-4 border-black transform hover:scale-105 transition-transform duration-300 ease-in-out">
                <img
                    className="w-full h-40 object-cover rounded-t-lg"
                    alt="Card Image"
                    src={divpic1}
                />
                <div className="p-4">
                    <h2 className="text-xl  font-semibold">The Ultimate Guide to Bookstagram for Beginners</h2>
                    <p className="text-gray-600">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis ante
                    sit amet tellus ornare tincidunt.
                    </p>
                    <div className="flex justify-between items-center mt-4">
                    <button className="bg-gradient-to-br from-[#39DB4A]  text-white px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400">
                    Read More
                    </button>
                    </div>
                </div>
                </div>

            </div>

            <div className='flex justify-center'>
            <div className="w-80 p-4 bg-[#A1E396] rounded-[1.5em] shadow-md border-4 border-black transform hover:scale-105 transition-transform duration-300 ease-in-out">
                <img
                    className="w-full h-40 object-cover rounded-t-lg"
                    alt="Card Image"
                    src={divpic1}
                />
                <div className="p-4">
                    <h2 className="text-xl  font-semibold">The Ultimate Guide to Bookstagram for Beginners</h2>
                    <p className="text-gray-600">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis ante
                    sit amet tellus ornare tincidunt.
                    </p>
                    <div className="flex justify-between items-center mt-4">
                    <button className="bg-white  px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400">
                    Read More
                    </button>
                    </div>
                </div>
                </div>

            </div>

            <div className='flex justify-center'>
            <div className="w-80 p-4 bg-white rounded-[1.5em] shadow-md border-4 border-black transform hover:scale-105 transition-transform duration-300 ease-in-out">
                <img
                    className="w-full h-40 object-cover rounded-t-lg"
                    alt="Card Image"
                    src={divpic1}
                />
                <div className="p-4">
                    <h2 className="text-xl  font-semibold">The Ultimate Guide to Bookstagram for Beginners</h2>
                    <p className="text-gray-600">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis ante
                    sit amet tellus ornare tincidunt.
                    </p>
                    <div className="flex justify-between items-center mt-4">
                    <button className="bg-gradient-to-br from-[#39DB4A]  text-white px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400">
                    Read More
                    </button>
                    </div>
                </div>
                </div>

            </div>

            <div className='flex justify-center'>
            <div className="w-80 p-4 bg-[#A1E396] rounded-[1.5em] shadow-md border-4 border-black transform hover:scale-105 transition-transform duration-300 ease-in-out">
                <img
                    className="w-full h-40 object-cover rounded-t-lg"
                    alt="Card Image"
                    src={divpic1}
                />
                <div className="p-4">
                    <h2 className="text-xl  font-semibold">The Ultimate Guide to Bookstagram for Beginners</h2>
                    <p className="text-gray-600">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis ante
                    sit amet tellus ornare tincidunt.
                    </p>
                    <div className="flex justify-between items-center mt-4">
                    <button className="bg-white  px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400">
                    Read More
                    </button>
                    </div>
                </div>
                </div>

            </div>

            <div className='flex justify-center'>
            <div className="w-80 p-4 bg-white rounded-[1.5em] shadow-md border-4 border-black transform hover:scale-105 transition-transform duration-300 ease-in-out">
                <img
                    className="w-full h-40 object-cover rounded-t-lg"
                    alt="Card Image"
                    src={divpic1}
                />
                <div className="p-4">
                    <h2 className="text-xl  font-semibold">The Ultimate Guide to Bookstagram for Beginners</h2>
                    <p className="text-gray-600">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis ante
                    sit amet tellus ornare tincidunt.
                    </p>
                    <div className="flex justify-between items-center mt-4">
                    <button className="bg-gradient-to-br from-[#39DB4A]  text-white px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400">
                    Read More
                    </button>
                    </div>
                </div>
                </div>

            </div>

            <div className='flex justify-center'>
            <div className="w-80 p-4 bg-[#A1E396] rounded-[1.5em] shadow-md border-4 border-black transform hover:scale-105 transition-transform duration-300 ease-in-out">
                <img
                    className="w-full h-40 object-cover rounded-t-lg"
                    alt="Card Image"
                    src={divpic1}
                />
                <div className="p-4">
                    <h2 className="text-xl  font-semibold">The Ultimate Guide to Bookstagram for Beginners</h2>
                    <p className="text-gray-600">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis ante
                    sit amet tellus ornare tincidunt.
                    </p>
                    <div className="flex justify-between items-center mt-4">
                    <button className="bg-white  px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400">
                    Read More
                    </button>
                    </div>
                </div>
                </div>

            </div>

            



        </div>
    </div>

    <div>
            <div className="container px-4 mx-auto">
                <div className="mx-auto">
                <div className="max-w-md mx-auto px-8 py-6 bg-gray-100 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    Contact Us
                    </h2>
                    <form>
                    <div className="mb-4">
                        <label className="block text-gray-800 mb-1" htmlFor="name">
                        Your Name
                        </label>
                        <input
                        className="w-full px-4 py-2 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300 transition duration-300"
                        placeholder="Enter your name"
                        type="text"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-800 mb-1" htmlFor="email">
                        Your Email
                        </label>
                        <input
                        className="w-full px-4 py-2 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300 transition duration-300"
                        placeholder="Enter your email"
                        name="email"
                        id="email"
                        type="email"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-800 mb-1" htmlFor="message">
                        Your Message
                        </label>
                        <textarea
                        className="w-full px-4 py-2 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300 transition duration-300"
                        rows={4}
                        placeholder="Enter your message"
                        name="message"
                        id="message"
                        defaultValue={""}
                        />
                    </div>
                    <button
                        className="w-full bg-[#39DB4A] text-gray-800 py-2 px-4 rounded-lg hover:bg-yellow-400 transition duration-300"
                        type="submit"
                    >
                        Send Message
                    </button>
                    </form>
                </div>
                </div>
            </div>

    </div>
      
    <footer>
        <div className="mt-16 bg-[#0C912A]">
        <div className="px-4 pt-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
            <div className="grid row-gap-10 mb-8 lg:grid-cols-6">
            <div className="grid grid-cols-2 gap-5 row-gap-8 lg:col-span-4 md:grid-cols-4">
                <div>
                <p className="font-medium tracking-wide text-gray-300">Category</p>
                <ul className="mt-2 space-y-2">
                    <li>
                    <a
                        href="/"
                        className=" transition-colors duration-300 hover:text-deep-purple-accent-200"
                    >
                        News
                    </a>
                    </li>
                    <li>
                    <a
                        href="/"
                        className=" transition-colors duration-300 hover:text-deep-purple-accent-200"
                    >
                        World
                    </a>
                    </li>
                    <li>
                    <a
                        href="/"
                        className=" transition-colors duration-300 hover:text-deep-purple-accent-200"
                    >
                        Games
                    </a>
                    </li>
                    <li>
                    <a
                        href="/"
                        className=" transition-colors duration-300 hover:text-deep-purple-accent-200"
                    >
                        References
                    </a>
                    </li>
                </ul>
                </div>
                <div>
                <p className="font-medium tracking-wide text-gray-300">Apples</p>
                <ul className="mt-2 space-y-2">
                    <li>
                    <a
                        href="/"
                        className=" transition-colors duration-300 hover:text-deep-purple-accent-200"
                    >
                        Web
                    </a>
                    </li>
                    <li>
                    <a
                        href="/"
                        className=" transition-colors duration-300 hover:text-deep-purple-accent-200"
                    >
                        eCommerce
                    </a>
                    </li>
                    <li>
                    <a
                        href="/"
                        className=" transition-colors duration-300 hover:text-deep-purple-accent-200"
                    >
                        Business
                    </a>
                    </li>
                    <li>
                    <a
                        href="/"
                        className=" transition-colors duration-300 hover:text-deep-purple-accent-200"
                    >
                        Entertainment
                    </a>
                    </li>
                    <li>
                    <a
                        href="/"
                        className=" transition-colors duration-300 hover:text-deep-purple-accent-200"
                    >
                        Portfolio
                    </a>
                    </li>
                </ul>
                </div>
                <div>
                <p className="font-medium tracking-wide text-gray-300">Cherry</p>
                <ul className="mt-2 space-y-2">
                    <li>
                    <a
                        href="/"
                        className=" transition-colors duration-300 hover:text-deep-purple-accent-200"
                    >
                        Media
                    </a>
                    </li>
                    <li>
                    <a
                        href="/"
                        className="transition-colors duration-300 hover:text-deep-purple-accent-200"
                    >
                        Brochure
                    </a>
                    </li>
                    <li>
                    <a
                        href="/"
                        className="transition-colors duration-300 hover:text-deep-purple-accent-200"
                    >
                        Nonprofit
                    </a>
                    </li>
                    <li>
                    <a
                        href="/"
                        className="transition-colors duration-300 hover:text-deep-purple-accent-200"
                    >
                        Educational
                    </a>
                    </li>
                    <li>
                    <a
                        href="/"
                        className="transition-colors duration-300 hover:text-deep-purple-accent-200"
                    >
                        Projects
                    </a>
                    </li>
                </ul>
                </div>
                <div>
                <p className="font-medium tracking-wide text-gray-300">Business</p>
                <ul className="mt-2 space-y-2">
                    <li>
                    <a
                        href="/"
                        className=" transition-colors duration-300 hover:text-deep-purple-accent-200"
                    >
                        Infopreneur
                    </a>
                    </li>
                    <li>
                    <a
                        href="/"
                        className="transition-colors duration-300 hover:text-deep-purple-accent-200"
                    >
                        Personal
                    </a>
                    </li>
                    <li>
                    <a
                        href="/"
                        className="transition-colors duration-300 hover:text-deep-purple-accent-200"
                    >
                        Wiki
                    </a>
                    </li>
                    <li>
                    <a
                        href="/"
                        className="transition-colors duration-300 hover:text-deep-purple-accent-200"
                    >
                        Forum
                    </a>
                    </li>
                </ul>
                </div>
            </div>
            <div className="md:max-w-md lg:col-span-2">
                <span className="text-white font-medium tracking-wide">
                Subscribe for updates
                </span>
                <form className="flex flex-col mt-4 md:flex-row">
                <input
                    placeholder="Email"
                    required=""
                    type="text"
                    className="flex-grow w-full h-12 px-4 mb-3 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none md:mr-2 md:mb-0 focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                />
                <button
                    type="submit"
                    className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-  focus:shadow-outline focus:outline-none"
                >
                    Subscribe
                </button>
                </form>
                <p className="mt-4 text-sm text-gray-300">
                Bacon ipsum dolor amet short ribs pig sausage prosciuto chicken spare
                ribs salami.
                </p>
            </div>
            </div>
            <div className="flex flex-col justify-between pt-5 pb-10 border-t border-gray-800 sm:flex-row">
            <p className="text-sm text-gray-200">
                © Copyright 2020 Lorem Inc. All rights reserved.
            </p>
            <div className="flex items-center mt-4 space-x-4 sm:mt-0">
                <a
                href="/"
                className="text-gray-300 transition-colors duration-300 hover:text-teal-accent-400"
                >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5">
                    <path d="M24,4.6c-0.9,0.4-1.8,0.7-2.8,0.8c1-0.6,1.8-1.6,2.2-2.7c-1,0.6-2,1-3.1,1.2c-0.9-1-2.2-1.6-3.6-1.6 c-2.7,0-4.9,2.2-4.9,4.9c0,0.4,0,0.8,0.1,1.1C7.7,8.1,4.1,6.1,1.7,3.1C1.2,3.9,1,4.7,1,5.6c0,1.7,0.9,3.2,2.2,4.1 C2.4,9.7,1.6,9.5,1,9.1c0,0,0,0,0,0.1c0,2.4,1.7,4.4,3.9,4.8c-0.4,0.1-0.8,0.2-1.3,0.2c-0.3,0-0.6,0-0.9-0.1c0.6,2,2.4,3.4,4.6,3.4 c-1.7,1.3-3.8,2.1-6.1,2.1c-0.4,0-0.8,0-1.2-0.1c2.2,1.4,4.8,2.2,7.5,2.2c9.1,0,14-7.5,14-14c0-0.2,0-0.4,0-0.6 C22.5,6.4,23.3,5.5,24,4.6z" />
                </svg>
                </a>
                <a
                href="/"
                className="text-gray-300 transition-colors duration-300 hover:text-teal-accent-400"
                >
                <svg viewBox="0 0 30 30" fill="currentColor" className="h-6">
                    <circle cx={15} cy={15} r={4} />
                    <path d="M19.999,3h-10C6.14,3,3,6.141,3,10.001v10C3,23.86,6.141,27,10.001,27h10C23.86,27,27,23.859,27,19.999v-10   C27,6.14,23.859,3,19.999,3z M15,21c-3.309,0-6-2.691-6-6s2.691-6,6-6s6,2.691,6,6S18.309,21,15,21z M22,9c-0.552,0-1-0.448-1-1   c0-0.552,0.448-1,1-1s1,0.448,1,1C23,8.552,22.552,9,22,9z" />
                </svg>
                </a>
                <a
                href="/"
                className="text-gray-300 transition-colors duration-300 hover:text-teal-accent-400"
                >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5">
                    <path d="M22,0H2C0.895,0,0,0.895,0,2v20c0,1.105,0.895,2,2,2h11v-9h-3v-4h3V8.413c0-3.1,1.893-4.788,4.659-4.788 c1.325,0,2.463,0.099,2.795,0.143v3.24l-1.918,0.001c-1.504,0-1.795,0.715-1.795,1.763V11h4.44l-1,4h-3.44v9H22c1.105,0,2-0.895,2-2 V2C24,0.895,23.105,0,22,0z" />
                </svg>
                </a>
            </div>
            </div>
        </div>
        </div>
       
    </footer>
    </>
  )
}

export default App
