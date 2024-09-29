import React from "react";
import ABhay from '../assets/Abhay.jpg';
import Khagesh from "../assets/Khagesh.png";

const About1 = () => {
    return (
        <div className="2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4">
            <div className="flex flex-col lg:flex-row justify-between gap-8">
                <div className="w-full lg:w-5/12 flex flex-col justify-center">
                    <h1 className="text-3xl lg:text-4xl font-bold leading-9 text-gray-800 pb-4">About Us</h1>
                    <p className="font-normal text-base leading-6 text-gray-600 ">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum.In the first place we have granted to God, and by this our present charter confirmed for us and our heirs forever that the English Church shall be free, and shall have her rights entire, and her liberties inviolate; and we will that it be thus observed; which is apparent from</p>
                </div>
                <div className="w-full lg:w-8/12 ">
                    <img className="w-full h-full" src="https://media.post.rvohealth.io/wp-content/uploads/2024/02/Ayurvedic-header.jpg" alt="A group of People" />
                </div>
            </div>

            <div className="flex lg:flex-row flex-col justify-between gap-8 pt-12">
                <div className="w-full lg:w-5/12 flex flex-col justify-center">
                    <h1 className="text-3xl lg:text-4xl font-bold leading-9 text-gray-800 pb-4">Our Story</h1>
                    <p className="font-normal text-base leading-6 text-gray-600 ">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum.In the first place we have granted to God, and by this our present charter confirmed for us and our heirs forever that the English Church shall be free, and shall have her rights entire, and her liberties inviolate; and we will that it be thus observed; which is apparent from</p>
                </div>
                <div className="w-full lg:w-8/12 lg:pt-8">
                    <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:gap-4 shadow-lg rounded-md">
                        <div className="p-4 pb-6 flex justify-center flex-col items-center">
                            <img className="md:block hidden" src={ABhay} alt="Alexa featured Img" />
                            {/* <img className="md:hidden block" src="https://i.ibb.co/zHjXqg4/Rectangle-118.png" alt="Alexa featured Img" /> */}
                            <p className="font-medium text-xl leading-5 text-gray-800 mt-4">Abhay</p>
                        </div>
                        <div className="p-4 pb-6 flex justify-center flex-col items-center">
                            <img className="md:block hidden" src={Khagesh} alt="Olivia featured Img" />
                            {/* <img className="md:hidden block" src="https://i.ibb.co/NrWKJ1M/Rectangle-119.png" alt="Olivia featured Img" /> */}
                            <p className="font-medium text-xl leading-5 text-gray-800 mt-4">Khagesh</p>
                        </div>
                        <div className="p-4 pb-6 flex justify-center flex-col items-center">
                            <img className="md:block hidden" src="https://media.licdn.com/dms/image/v2/D5635AQE0cl_YLRZtkA/profile-framedphoto-shrink_200_200/profile-framedphoto-shrink_200_200/0/1727464891759?e=1728118800&v=beta&t=g9ZcaclpE4Mn9amGm6QDDa1iDk13pmJYzpfujGbQRuk" alt="Liam featued Img" />
                            {/* <img className="md:hidden block" src="https://media.licdn.com/dms/image/v2/D5635AQE0cl_YLRZtkA/profile-framedphoto-shrink_200_200/profile-framedphoto-shrink_200_200/0/1727464891759?e=1728118800&v=beta&t=g9ZcaclpE4Mn9amGm6QDDa1iDk13pmJYzpfujGbQRuk" alt="Liam featued Img" /> */}
                            <p className="font-medium text-xl leading-5 text-gray-800 mt-4">Shaurya</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About1;