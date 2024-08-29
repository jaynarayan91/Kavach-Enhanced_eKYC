import React from 'react';
import { Link } from 'react-router-dom';
import kycani from '../assets/Verify account.gif';
import forgotpwd from '../assets/Forgot Password.gif';
import futurescope from '../assets/Predictive Analysis.gif';

const VolunteerDashboard = () => {
    return (
        <>
            <div className='block relative transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-700 before:absolute before:bg-[#608CFE] before:origin-center before:h-[3px] before:w-[1%] hover:before:w-[10%] before:bottom-0 before:left-[50%] after:transition-[width] after:ease-in-out after:duration-700 after:absolute after:bg-[#608CFE] after:origin-center after:h-[3px] after:w-[1%] hover:after:w-[10%] after:bottom-0 after:right-[50%] pt-12'>
                <h2 className='text-center text-[35px] font-bold uppercase'>Dashboard</h2>
            </div>
            <div className='w-full pt-[2rem] pb-[4rem] px-4 bg-white p-6 justify-center'>

                <div className='max-w-[1240px] mx-auto grid md:grid-cols-3 gap-8'>
                    <div className='w-full shadow-2xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300'>
                        {/* <img className='w-20 mx-auto mt-[-3rem] bg-white' src={AddBeneficiary} alt="/" /> */}
                        <h2 className='text-2xl font-extrabold text-center pt-2'>Profile</h2>

                        <div className='text-center font-bold'>
                            <p className='py-2 border-b mx-8 mt-4'>Edit your profile
                            </p>
                        </div>
                        <div className='pb-2'>
                            <img className='h-[290px] m-auto' src={forgotpwd} alt='Forgot Password' />
                        </div>

                        <div className='w-100 text-center'>
                            <button className='bg-[#0F75BD] text-white w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3'>Change Settings</button>
                        </div>

                    </div>
                    <div className='w-full shadow-2xl bg-white flex flex-col p-4 md:my-0 my-8 rounded-lg hover:scale-105 duration-300'>
                        {/* <img className='w-20 mx-auto mt-[-3rem] bg-transparent' src={AddVolunteer} alt="/" /> */}
                        <h2 className='text-2xl font-extrabold text-center pt-2'>Start eKYC</h2>
                        <div className='text-center font-medium'>
                            <p className='py-2 border-b font-bold mx-8 mt-4'>Start your journey</p>
                        </div>
                        <div className='pb-2'>
                            <img className='h-62 m-auto' src={kycani} alt='KYC Animation' />
                        </div>
                        <Link
                            to='/form'>
                            <div className='w-100 text-center'>
                                <button className='bg-[black] text-white w-[200px] rounded-md font-bold my-6 mx-auto px-6 py-3'>Enhance eKYC</button>
                            </div>
                        </Link>
                    </div>
                    <div className='w-full shadow-2xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300'>
                        {/* <img className='w-20 mx-auto mt-[-3rem] bg-white' src={TrackVolunteer} alt="/" /> */}
                        <h2 className='text-2xl font-extrabold text-center pt-2'>Future Aspects</h2>

                        <div className='text-center font-bold'>
                            <p className='py-2 border-b mx-8 mt-4'>See whats coming next</p>
                        </div>
                        <div className='pb-2'>
                            <img className='h-62 m-auto' src={futurescope} alt='Future Scope' />
                        </div>
                        <div className='w-100 text-center'>
                            <button className='bg-[#0F75BD] text-white w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3'>Future Scope</button>
                        </div>
                    </div>
                </div>

            </div >
            <div className='w-100 text-center'>
                <Link to='/'>
                    <button class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-[#608CFE] group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white">
                        <span class="relative text-xl font-bold px-5 py-2.5 transition-all ease-in duration-200 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                            Logout
                        </span>
                    </button>
                </Link>
            </div>

        </>
    );
};

export default VolunteerDashboard;