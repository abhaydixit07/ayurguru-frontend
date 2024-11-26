import React from "react";
import { motion } from "framer-motion";
import { Star, Users, Trophy, Linkedin, Github } from "lucide-react";
import Abhay from "../assets/w3.png";
import Khagesh from "../assets/w2.png";
import Shaurya from "../assets/w1.png";

const About1 = () => {
    const teamMembers = [
        {
            name: "Abhay Dixit",
            img: Abhay,
            role: "Full Stack and AI Developer",
            // description: "Visionary leader driving innovation and strategic growth.",
            linkedin: "https://www.linkedin.com/in/abhay-dixit-546b85254/",
            github: "https://github.com/abhaydixit07",
        },
        {
            name: "Khagesh Sharma",
            img: Khagesh,
            role: "Full Stack and DevOps Engineer",
            // description: "Technical mastermind transforming complex challenges.",
            linkedin: "https://www.linkedin.com/in/khageshsharma",
            github: "https://github.com/khagesh2409",
        },
        {
            name: "Shaurya Gupta",
            img: Shaurya,
            role: "Frontend Developer",
            // description: "Innovation catalyst with a passion for user-centric design.",
            linkedin: "https://www.linkedin.com/in/shaurya--gupta",
            github: "https://github.com/CodeByShaurya",
        },
    ];

    return (
        <>
        <div className="bg-gradient-to-br from-gray-50 via-white to-blue-50 min-h-screen">
            <div className="container mx-auto px-6 py-16 space-y-16">
                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col lg:flex-row items-center gap-12 bg-white shadow-xl rounded-2xl overflow-hidden"
                >
                    <div className="lg:w-1/2 p-12 space-y-6">
                        <h1 className="text-5xl font-black text-gray-900 leading-tight">
                            About <span className="text-emerald-600">Us</span>
                        </h1>
                        <p className="text-xl text-gray-600 leading-relaxed">
                        We are three developers from USICT Delhi, united by our shared passion for technology, innovation, and wellness. Together, we’ve harnessed the power of AI to create a platform where modern solutions meet the timeless wisdom of Ayurveda.
                        </p>
                        <div className="flex space-x-4">
                            <div className="flex items-center space-x-2 text-blue-600">
                                <Star className="w-6 h-6" />
                                <span className="font-semibold">Innovative</span>
                            </div>
                            <div className="flex items-center space-x-2 text-green-600">
                                <Users className="w-6 h-6" />
                                <span className="font-semibold">Collaborative</span>
                            </div>
                        </div>
                    </div>
                    <div className="lg:w-1/2 h-96 overflow-hidden">
                        <img
                            src="./Missing SemiColon.jpg"
                            alt="Team Collaboration"
                            className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300"
                        />
                    </div>
                </motion.div>

                {/* Story Section */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex flex-col lg:flex-row items-center gap-12 bg-white shadow-xl rounded-2xl overflow-hidden"
                >
                    <div className="lg:w-1/2 h-96 overflow-hidden">
                        <img
                            src="https://media.post.rvohealth.io/wp-content/uploads/2024/02/Ayurvedic-header.jpg"
                            // src="https://i.ibb.co/ZYW3VTp/brown-brick-wall.jpg"
                            alt="Our Story"
                            className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300"
                        />
                    </div>
                    <div className="lg:w-1/2 p-12 space-y-6">
                        <h2 className="text-5xl font-black text-gray-900 leading-tight">
                            Our <span className="text-emerald-600">Story</span>
                        </h2>
                        <p className="text-xl text-gray-600 leading-relaxed">
                        What began as a simple idea among friends has evolved into a groundbreaking initiative. Inspired by the need for accessible, personalized care, we developed a platform that provides effective Ayurvedic treatments using AI-powered recommendations. Our journey is fueled by curiosity, a dedication to innovation, and a profound respect for India's rich Ayurvedic heritage.
                        </p>
                        <div className="flex items-center space-x-2 text-orange-600">
                            <Trophy className="w-6 h-6" />
                            <span className="font-semibold">Legacy of Innovation</span>
                        </div>
                    </div>
                </motion.div>

                {/* Team Section */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-center space-y-12"
                >
                    <h2 className="text-5xl font-black text-gray-900">
                        Meet <span className="text-emerald-600">Our Team</span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {teamMembers.map((member, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl group"
                            >
                                <div className="relative">
                                    <img
                                        src={member.img}
                                        alt={`${member.name} Profile`}
                                        className="w-full h-90 object-cover group-hover:brightness-75 transition-all duration-300"
                                    />
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                                </div>
                                <div className="p-6 text-center">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{member.name}</h3>
                                    <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                                    <p className="text-gray-600 mb-4">{member.description}</p>
                                    <div className="flex justify-center space-x-4">
                                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                                            <Linkedin className="w-6 h-6 text-blue-600 hover:text-blue-800 transition-colors" />
                                        </a>
                                        <a href={member.github} target="_blank" rel="noopener noreferrer">
                                            <Github className="w-6 h-6 text-gray-900 hover:text-black transition-colors" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
        
      </>
    );
};

export default About1;
