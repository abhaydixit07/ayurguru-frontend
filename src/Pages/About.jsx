import { motion } from "framer-motion";
import { Star, Users, Trophy, Linkedin, Github } from "lucide-react";
import Abhay from "../assets/w3.png";
import Khagesh from "../assets/w2.png";
import Shaurya from "../assets/w1.png";

const teamMembers = [
    {
        name: "Abhay Dixit",
        img: Abhay,
        role: "Full Stack and AI Developer",
        linkedin: "https://www.linkedin.com/in/abhay-dixit-546b85254/",
        github: "https://github.com/abhaydixit07",
    },
    {
        name: "Khagesh Sharma",
        img: Khagesh,
        role: "Full Stack and DevOps Engineer",
        linkedin: "https://www.linkedin.com/in/khageshsharma",
        github: "https://github.com/khagesh2409",
    },
    {
        name: "Shaurya Gupta",
        img: Shaurya,
        role: "Frontend Developer",
        linkedin: "https://www.linkedin.com/in/shaurya--gupta",
        github: "https://github.com/CodeByShaurya",
    },
];

const About = () => {
    return (
    <div className="min-h-[100dvh] w-full">
            <section className="max-w-5xl mx-auto px-6 pt-16 pb-10 text-center">
                <h1 className="text-4xl sm:text-5xl font-spacegroteskbold text-gray-900 mb-4">
                    About <span className="text-emerald-600">AyurGuru</span>
                </h1>
                <p className="text-lg sm:text-xl text-gray-600 font-spacegroteskregular max-w-2xl mx-auto">
                    Blending ancient Ayurvedic wisdom with modern AI, we empower everyone to achieve holistic wellness—personalized, accessible, and rooted in tradition.
                </p>
            </section>

            <section className="max-w-4xl mx-auto px-6 py-8">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="bg-white rounded-2xl shadow-xl p-8 flex flex-col md:flex-row items-center gap-8"
                >
                    <div className="flex-1 text-center md:text-left">
                        <h2 className="text-2xl sm:text-3xl font-spacegrotesksemibold text-gray-900 mb-3">Our Mission</h2>
                        <p className="text-gray-700 font-spacegroteskregular text-lg mb-4">
                            We believe in the power of technology to make ancient wellness accessible to all. Our mission is to provide AI-powered, evidence-based Ayurvedic guidance tailored to your unique needs—anytime, anywhere.
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-spacegroteskmedium bg-green-50 text-green-700 border border-green-200">
                                <Star className="w-5 h-5 mr-1" /> Innovation
                            </span>
                            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-spacegroteskmedium bg-blue-50 text-blue-700 border border-blue-200">
                                <Users className="w-5 h-5 mr-1" /> Collaboration
                            </span>
                            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-spacegroteskmedium bg-orange-50 text-orange-700 border border-orange-200">
                                <Trophy className="w-5 h-5 mr-1" /> Excellence
                            </span>
                            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-spacegroteskmedium bg-orange-50 text-orange-700 border border-orange-200">
                                <Trophy className="w-5 h-5 mr-1" /> Accessibility
                            </span>
                        </div>
                    </div>
                    <div className="flex-1 flex justify-center">
                        <img
                            src="https://cayeit.com/wp-content/uploads/2024/04/cayeit-ayurveda-ai.webp"
                            alt="Ayurvedic Wellness"
                            className="rounded-xl shadow-md w-full max-w-xs object-cover"
                        />
                    </div>
                </motion.div>
            </section>

            <section className="max-w-4xl mx-auto px-6 py-8">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="bg-white rounded-2xl shadow-xl p-8 flex flex-col md:flex-row-reverse items-center gap-8"
                >
                    <div className="flex-1 text-center md:text-left">
                        <h2 className="text-2xl sm:text-3xl font-spacegrotesksemibold text-gray-900 mb-3">Our Story</h2>
                        <p className="text-gray-700 font-spacegroteskregular text-lg mb-4">
                            What began as a simple idea among friends at USICT Delhi has grown into a platform that bridges the gap between tradition and technology. Inspired by the need for accessible, personalized care, we built AyurGuru to deliver effective Ayurvedic recommendations using the latest in AI.
                        </p>
                        <div className="flex items-center gap-2 text-orange-600 font-spacegroteskmedium">
                            <Trophy className="w-5 h-5" /> Legacy of Innovation
                        </div>
                    </div>
                    <div className="flex-1 flex justify-center">
                        <img
                            src="https://igmpi.ac.in/public/images/robotic-hand-delicately-holds-white-flower_14117-1068695.jpg"
                            alt="Our Story"
                            className="rounded-xl shadow-md w-full max-w-xs object-cover"
                        />
                    </div>
                </motion.div>
            </section>

            <section className="max-w-6xl mx-auto px-6 py-12">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <h2 className="text-3xl sm:text-4xl font-spacegroteskbold text-center text-gray-900 mb-10">
                        Meet <span className="text-emerald-600">Our Team</span>
                    </h2>
                    <div className="flex flex-wrap items-center justify-center gap-8">
                        {teamMembers.map((member, idx) => (
                            <div
                                key={idx}
                                className="bg-white rounded-2xl shadow-xl w-[300px] overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl group flex flex-col items-center"
                            >
                                <div className="relative w-full h-60 overflow-hidden flex items-center justify-center bg-gray-50">
                                    <img
                                        src={member.img}
                                        alt={`${member.name} Profile`}
                                        className="object-cover w-40 h-40 rounded-full border-4 border-emerald-100 shadow group-hover:brightness-90 transition-all duration-300"
                                    />
                                </div>
                                <div className="p-6 text-center flex-1 flex flex-col justify-between">
                                    <h3 className="text-xl font-spacegrotesksemibold text-gray-900 mb-1">{member.name}</h3>
                                    <p className="text-green-700 font-spacegroteskmedium mb-2">{member.role}</p>
                                    <div className="flex justify-center space-x-4 mt-2">
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
            </section>
        </div>
    );
};

export default About;
