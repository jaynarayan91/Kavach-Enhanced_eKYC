import React, { useEffect, useState } from "react";
import aboutPhoto from '../assets/aboutphoto.png'
import Navigation from "./Navigation";
import MyChatBot from "./MyChatBot";
import Loading from "./Loading";

export const About = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);
    return (
        <>
            {(loading) ? (
                <Loading />
            ) : (
                <>
                    <MyChatBot />
                    <Navigation />
                    <section
                        className="relative rounded-[15px] p-[50px] pt-[20px] z-[1]"
                        id="about"
                    >
                        <div className="block relative transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-700 before:absolute before:bg-[#608CFE] before:origin-center before:h-[3px] before:w-[1%] hover:before:w-[10%] before:bottom-0 before:left-[50%] after:transition-[width] after:ease-in-out after:duration-700 after:absolute after:bg-[#608CFE] after:origin-center after:h-[3px] after:w-[1%] hover:after:w-[10%] after:bottom-0 after:right-[50%]">
                            <h2 className="text-center text-[35px] font-bold">
                                About Us
                            </h2>
                        </div>
                        <div className='block px-[40px] mb-[50px]'>

                            <div className="items-center lg:items-start">
                                <span className="group transition-all duration-300 ease-in-out">
                                    <h4 className="pb-[4px] bg-left-bottom bg-gradient-to-r from-[#608CFE] to-[#608CFE] bg-[length:20%_3px] bg-no-repeat group-hover:bg-[length:100%_3px] transition-all duration-500 ease-out inline-block text-3xl font-bold ">Our Mission</h4>
                                </span>
                                <p className="lg:text-justify lg:pr-11 text-base lg:text-lg my-6 text-[hsl(0,0%,41%)] font-medium">
                                    At Kavach, our mission is to revolutionize the KYC process by providing a seamless, secure, and efficient solution for identity verification. We are committed to leveraging advanced AI technology to deliver an intuitive user experience while ensuring the highest level of security and accuracy. Our goal is to protect your personal information and prevent fraud, giving you peace of mind and enabling businesses to operate with confidence.
                                </p>
                                <span className="group transition-all duration-300 ease-in-out">
                                    <h4 className="pb-[4px] bg-left-bottom bg-gradient-to-r from-[#608CFE] to-[#608CFE] bg-[length:20%_3px] bg-no-repeat group-hover:bg-[length:100%_3px] transition-all duration-500 ease-out inline-block text-3xl font-bold ">Our Vision</h4>
                                </span>
                                <p className="lg:text-justify lg:pr-11 text-base lg:text-lg my-6 text-[hsl(0,0%,41%)] font-medium">
                                    Our vision at Kavach is to become the leading KYC solution, trusted globally for its innovation, security, and reliability. We aim to set the standard in identity verification by continually advancing our technology and processes, ensuring a seamless and secure experience for all users. By fostering trust and confidence, we aspire to empower businesses and individuals alike, creating a safer and more efficient digital world.
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-row items-center px-[40px]">
                            <img
                                src={aboutPhoto}
                                alt="About Us"
                                style={{
                                    height: "500px"
                                }}
                            />
                            <ul className="text-[var(--color-text)] pl-[80px] flex flex-col gap-[30px] ">
                                <li className="flex flex-row h-[200px] items-center rounded-[20px] list-none p-[20px] bg-[#608CFE] bg-no-repeat bg-0%_100% hover:bg-100%_100% transition duration-400 hover:scale-105 duration-300">
                                    <div className="ml-4">
                                        <h3 className="text-[20px] font-semibold">Innovative Technology</h3>
                                        <p className="text-[20px]">
                                            Kavach leverages state-of-the-art AI technologies, including facial recognition, image processing, and OCR, to provide accurate and efficient KYC verification.
                                        </p>
                                    </div>
                                </li>
                                <li className="flex flex-row h-[200px] items-center rounded-[20px] list-none p-[20px] bg-[#608CFE] bg-no-repeat bg-0%_100% hover:bg-100%_100% transition duration-400 hover:scale-105 duration-300">
                                    <div className="ml-4">
                                        <h3 className="text-[20px] font-semibold">User-Centric Design</h3>
                                        <p className="text-[20px]">
                                            Our platform is designed with the user in mind, offering a simple and intuitive interface that guides you through every step of the KYC process with ease.
                                        </p>
                                    </div>
                                </li>
                            </ul>
                            <ul className="text-[var(--color-text)] pl-[30px] flex flex-col gap-[30px] ">
                                <li className="flex flex-row h-[200px] items-center rounded-[20px] list-none p-[20px] bg-[#608CFE] bg-no-repeat bg-0%_100% hover:bg-100%_100% transition duration-400 hover:scale-105 duration-300">
                                    <div className="ml-4">
                                        <h3 className="text-[20px] font-semibold">Robust Security</h3>
                                        <p className="text-[20px]">
                                            Security is at the core of Kavach. We employ stringent measures to protect your personal and sensitive information, ensuring a secure KYC process from start to finish.
                                        </p>
                                    </div>
                                </li>
                                <li className="flex flex-row h-[200px] items-center rounded-[20px] list-none p-[20px] bg-[#608CFE] bg-no-repeat bg-0%_100% hover:bg-100%_100% transition duration-400 hover:scale-105 duration-300">
                                    <div className="ml-4">
                                        <h3 className="text-[20px] font-semibold">Reliable and Efficient</h3>
                                        <p className="text-[20px]">
                                            By automating the verification process, Kavach reduces human errors and speeds up KYC completion, allowing you to access services quickly and with confidence.
                                        </p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </section>
                </>
            )}
        </>
    );
};
