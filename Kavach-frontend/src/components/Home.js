import React, { useState, useEffect } from 'react'
import Navigation from './Navigation';
import MyChatBot from './MyChatBot'
import mainPageAni from '../assets/MainPage.gif'
import { Link } from 'react-router-dom';
import Loading from './Loading';

const text = "Discover Kavach, the next-generation KYC application designed to make identity verification simple, secure, and efficient. With a seamless user experience and advanced AI technology, Kavach ensures a hassle-free KYC process, safeguarding your personal information every step of the way.";
const buttonText = "Learn More";

const Home = () => {
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

                <div className='h-[100vh] font-epilogue bg-[hsl(0,0%,98%)]'>
                    <MyChatBot />
                    <div className='flex flex-col'>
                        <Navigation />
                        <div className='lg:flex lg:mx-32 '>
                            <div className='lg:pt-[100px] lg:pr-16'>
                                <div className=" flex flex-col items-center lg:items-start">
                                    <h1 className="text-4xl font-bold text-black lg:text-6xl">Enhance Your <br /><span className='cursor-pointer text-[#608CFE]'>eKYC</span> Process</h1>
                                    <p className=" text-center lg:text-start lg:pr-11 text-base lg:text-lg my-6 text-[hsl(0,0%,41%)] font-medium">
                                        {text}
                                    </p>
                                    <div className="cursor-pointer text-white bg-[#608CFE] hover:bg-transparent hover:scale-110 hover:border hover:text-[#608CFE] hover:border-[#608CFE] transition duration:1000 py-3 px-6 rounded-xl">
                                        <Link to="/about" className="text-base font-medium">{buttonText}</Link>
                                    </div>
                                </div>
                            </div>
                            <img src={mainPageAni} alt="image-hero-desktop" className='hidden mt-[90px] lg:flex w-full h-full overflow-auto' />
                        </div>
                    </div>
                </div >
            )}
        </>
    )
}

export default Home